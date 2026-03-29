import process from 'node:process';
import { RalphLoopOptions, RalphLoopState, Plan, PlanIngestor, TaskQueue, ResultCollector, IterationController } from './ralph_loop_utils.ts';
import * as fs from 'fs/promises';
import * as path from 'path';

/**
 * RalphLoop is a self-referential planning loop that repeatedly consumes the current plan,
 * queues tasks, collects results, and emits a completion signal.
 */
// Minimal in-process implementations for scaffolding
class FSPlanIngestor implements PlanIngestor {
  async ingest(): Promise<Plan> {
    // Look for a plan file in .sisyphus/plans; prefer a dedicated 'ralph-loop' plan if present
    const plansDir = path.resolve('.sisyphus', 'plans');
    let planPath: string | null = null;
    try {
      const files = await fs.readdir(plansDir);
      // Prefer a file named 'ralph-loop.md' if present, otherwise take the first .md file
      const named = files.find(f => f.toLowerCase() === 'ralph-loop.md');
      if (named) planPath = path.join(plansDir, named);
      else {
        const md = files.find(f => f.endsWith('.md'));
        if (md) planPath = path.join(plansDir, md);
      }
    } catch {
      // no plans directory or unreadable; fall back to an empty plan
      planPath = null;
    }

    if (!planPath) {
      return { tasks: [] } as Plan;
    }

    const content = await fs.readFile(planPath, 'utf8');
    const lines = content.split(/\r?\n/);
    // Extract top-level tasks that are marked as incomplete or completed
    const tasks = lines
      .filter(l => /^- \[[ x]\]\s+/.test(l))
      .map(l => l.replace(/^- \[[ x]\]\s+/, '').trim())
      .filter(Boolean);
    return { tasks } as Plan;
  }
}

class SimpleTaskQueue implements TaskQueue {
  async queue(plan: Plan): Promise<string[]> {
    return plan.tasks ?? [];
  }
}

class SimpleResultCollector implements ResultCollector {
  async collect(tasks: string[]): Promise<string[]> {
    // Simple synthetic results to simulate delegation outcomes
    return tasks.map(t => `done:${t}`);
  }
}

class SimpleIterationController implements IterationController {
  async shouldStop(state: RalphLoopState, plan: Plan): Promise<boolean> {
    if (!plan || !plan.tasks) return true;
    const total = plan.tasks.length;
    const completed = state.results.length;
    if (total > 0 && completed >= total) return true;
    return false;
  }
}

export class RalphLoop {
  private options: RalphLoopOptions;
  private state: RalphLoopState;
  private ingestor: PlanIngestor;
  private queue: TaskQueue;
  private collector: ResultCollector;
  private controller: IterationController;

  constructor(
    options: Partial<RalphLoopOptions> = {},
    ingestor: PlanIngestor,
    queue: TaskQueue,
    collector: ResultCollector,
    controller: IterationController
  ) {
    this.options = {
      completionPromise: options.completionPromise ?? 'DONE',
      maxIterations: options.maxIterations ?? 100,
      strategy: options.strategy ?? 'continue',
    };
    this.state = {
      iteration: 0,
      isComplete: false,
      tasks: [],
      results: [],
      planName: undefined,
      currentIndex: 0,
    };
    this.ingestor = ingestor;
    this.queue = queue;
    this.collector = collector;
    this.controller = controller;
  }

  /**
   * Runs the Ralph Loop until completion or max iterations.
   */
  public async run(taskDescription: string): Promise<void> {
    console.log(`Starting Ralph Loop: ${taskDescription}`);

    if (this.options.strategy === 'reset') {
      this.state.iteration = 0;
      this.state.isComplete = false;
    }

    while (this.state.iteration < this.options.maxIterations && !this.state.isComplete) {
      this.state.iteration++;
      console.log(`Iteration ${this.state.iteration}/${this.options.maxIterations}`);

      // 1. Plan Ingestion
      const plan = await this.ingestor.ingest();
      // store plan name if available
      // (Plan type allows dynamic properties; store for debugging)
      (this.state as any).planName = (plan as any).name ?? (plan as any).planName ?? 'ralph-loop';

      // 2. Task Queuing
      const tasks = await this.queue.queue(plan);
      this.state.tasks.push(...tasks);

      // 3. Result Collection
      const results = await this.collector.collect(tasks);
      this.state.results.push(...results);

      // 4. Iteration Control
      this.state.isComplete = await this.controller.shouldStop(this.state, plan);

      if (this.state.isComplete) {
        console.log(`Task completed at iteration ${this.state.iteration}.`);
        break;
      }
    }

    console.log(`<promise>${this.options.completionPromise}</promise>`);

    // Persist final state proactively
    try {
      const statePath = path.resolve('.sisyphus', 'ralph_loop', 'state.json');
      await fs.writeFile(statePath, JSON.stringify(this.state, null, 2), 'utf8').catch(() => {});
    } catch {
      // ignore persistence errors in this scaffolding
    }
  }

  public getState(): RalphLoopState {
    return { ...this.state };
  }
}

// CLI Entry Point
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const taskDescription = args.find(arg => !arg.startsWith('--')) || 'implement it';
  
  const options: Partial<RalphLoopOptions> = {};
  
  for (const arg of args) {
    if (arg.startsWith('--completion-promise=')) {
      options.completionPromise = arg.split('=')[1];
    } else if (arg.startsWith('--max-iterations=')) {
      options.maxIterations = parseInt(arg.split('=')[1], 10);
    } else if (arg.startsWith('--strategy=')) {
      const strategy = arg.split('=')[1];
      if (strategy === 'reset' || strategy === 'continue') {
        options.strategy = strategy as 'reset' | 'continue';
      }
    }
  }

  // Minimal implementations for the scaffold
  const ingestor: PlanIngestor = new FSPlanIngestor();
  const queue: TaskQueue = new SimpleTaskQueue();
  const collector: ResultCollector = new SimpleResultCollector();
  const controller: IterationController = new SimpleIterationController();

  const loop = new RalphLoop(options, ingestor, queue, collector, controller);
  loop.run(taskDescription).catch(err => {
    console.error(err);
    process.exit(1);
  });
}
