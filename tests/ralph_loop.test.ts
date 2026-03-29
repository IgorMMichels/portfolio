import { describe, it, expect, vi } from 'vitest';
import { RalphLoop } from '../src/ralph/ralph_loop.ts';
import { PlanIngestor, TaskQueue, ResultCollector, IterationController, RalphLoopState, Plan, TaskResult } from '../src/ralph/ralph_loop_utils.ts';

describe('RalphLoop', () => {
  it('should initialize with default options', () => {
    const ingestor: PlanIngestor = { ingest: async () => ({ tasks: [] }) };
    const queue: TaskQueue = { queue: async () => [] };
    const collector: ResultCollector = { collect: async () => [] };
    const controller: IterationController = { shouldStop: async () => true };

    const loop = new RalphLoop({}, ingestor, queue, collector, controller);
    const state = loop.getState();

    expect(state.iteration).toBe(0);
    expect(state.isComplete).toBe(false);
  });

  it('should run for at least one iteration and emit completion signal', async () => {
    const ingestor: PlanIngestor = { ingest: vi.fn().mockResolvedValue({ tasks: ['task1'] }) };
    const queue: TaskQueue = { queue: vi.fn().mockResolvedValue(['task1']) };
    const collector: ResultCollector = { 
      collect: vi.fn().mockResolvedValue([{ taskId: 'task1', status: 'completed', output: 'done' } as TaskResult]) 
    };
    const controller: IterationController = { 
      shouldStop: vi.fn().mockImplementation((state: RalphLoopState) => state.iteration >= 1) 
    };

    const loop = new RalphLoop({ completionPromise: 'FINISHED' }, ingestor, queue, collector, controller);
    
    const consoleSpy = vi.spyOn(console, 'log');
    await loop.run('test task');

    expect(ingestor.ingest).toHaveBeenCalled();
    expect(queue.queue).toHaveBeenCalled();
    expect(collector.collect).toHaveBeenCalled();
    expect(controller.shouldStop).toHaveBeenCalled();
    
    const state = loop.getState();
    expect(state.iteration).toBe(1);
    expect(state.isComplete).toBe(true);
    
    expect(consoleSpy).toHaveBeenCalledWith('<promise>FINISHED</promise>');
    consoleSpy.mockRestore();
  });

  it('should respect max iterations', async () => {
    const ingestor: PlanIngestor = { ingest: async () => ({ tasks: [] }) };
    const queue: TaskQueue = { queue: async () => [] };
    const collector: ResultCollector = { collect: async () => [] };
    const controller: IterationController = { shouldStop: async () => false };

    const loop = new RalphLoop({ maxIterations: 3 }, ingestor, queue, collector, controller);
    await loop.run('test task');

    const state = loop.getState();
    expect(state.iteration).toBe(3);
    expect(state.isComplete).toBe(false);
  });
});
