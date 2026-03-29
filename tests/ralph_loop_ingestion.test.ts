import { describe, it, expect, vi } from 'vitest';
import { FSPlanIngestor } from '../src/ralph/fs_plan_ingestor.ts';
import * as fs from 'node:fs/promises';

vi.mock('node:fs/promises');

describe('FSPlanIngestor', () => {
  it('should ingest a plan from a file', async () => {
    const mockPlan = { tasks: ['task1', 'task2'] };
    const readFileSpy = vi.spyOn(fs, 'readFile').mockResolvedValue(JSON.stringify(mockPlan));

    const ingestor = new FSPlanIngestor('test-plan.json');
    const plan = await ingestor.ingest();

    expect(plan).toEqual(mockPlan);
    expect(readFileSpy).toHaveBeenCalledWith('test-plan.json', 'utf-8');
    readFileSpy.mockRestore();
  });

  it('should return a scaffold plan if file reading fails', async () => {
    const readFileSpy = vi.spyOn(fs, 'readFile').mockRejectedValue(new Error('File not found'));

    const ingestor = new FSPlanIngestor('missing-plan.json');
    const plan = await ingestor.ingest();

    expect(plan).toEqual({ tasks: ['scaffold-task'] });
    readFileSpy.mockRestore();
  });
});
