import process from 'node:process';
import { RalphLoopOptions, RalphLoopState, Plan, PlanIngestor, TaskQueue, ResultCollector, IterationController, TaskResult, NotepadInterface } from './ralph_loop_utils.ts';
import { Notepad } from './notepad.ts';

/**
 * RalphLoop is a self-referential planning loop that repeatedly consumes the current plan,
 * queues tasks, collects results, and emits a completion signal.
 */
// Minimal mock implementations for scaffolding
class MockPlanIngestor implements PlanIngestor {
  async ingest(): Promise<Plan> {
    // Returns a minimal plan for scaffolding
    return { tasks: ['scaffold-task'] } as Plan;
  }
}

class MockTaskQueue implements TaskQueue {
  async queue(plan: Plan): Promise<string[]> {
    return plan.tasks ?? [];
  }
}

class MockResultCollector implements ResultCollector {
  async collect(tasks: string[]): Promise<TaskResult[]> {
    // Simple synthetic results to simulate delegation outcomes
    return tasks.map(t => ({
      taskId: t,
      status: 'completed',
      output: `done:${t}`
    }));
  }
}

class MockIterationController implements IterationController {
  async shouldStop(state: RalphLoopState, _plan: Plan): Promise<boolean> {
    // Stop after one iteration for the scaffold
    return state.iteration >= 1;
  }
}

export class RalphLoop {
  private options: RalphLoopOptions;
  private state: RalphLoopState;
  private ingestor: PlanIngestor;
  private queue: TaskQueue;
  private collector: ResultCollector;
  private controller: IterationController;
  private notepad: NotepadInterface;

  constructor(
    options: Partial<RalphLoopOptions> = {},
    ingestor: PlanIngestor,
    queue: TaskQueue,
    collector: ResultCollector,
    controller: IterationController,
    notepad: NotepadInterface
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
    };
    this.ingestor = ingestor;
    this.queue = queue;
    this.collector = collector;
    this.controller = controller;
    this.notepad = notepad;
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

    // Final completion emission hook
    console.log(`<promise>${this.options.completionPromise}</promise>`);
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

  // Use mock implementations for the scaffold
  const ingestor: PlanIngestor = new MockPlanIngestor();
  const queue: TaskQueue = new MockTaskQueue();
  const collector: ResultCollector = new MockResultCollector();
  const controller: IterationController = new MockIterationController();
  const notepad: NotepadInterface = new Notepad();

  const loop = new RalphLoop(options, ingestor, queue, collector, controller, notepad);
  loop.run(taskDescription).catch(err => {
    console.error(err);
    process.exit(1);
  });
}
