import * as fs from 'node:fs/promises';
import { Plan, PlanIngestor } from './ralph_loop_utils.ts';

/**
 * FSPlanIngestor reads a plan from the filesystem.
 */
export class FSPlanIngestor implements PlanIngestor {
  private planPath: string;

  constructor(planPath: string) {
    this.planPath = planPath;
  }

  /**
   * Ingests the plan from the filesystem.
   * If the file does not exist, it returns a minimal plan.
   */
  async ingest(): Promise<Plan> {
    try {
      const content = await fs.readFile(this.planPath, 'utf-8');
      // For now, we assume it's a JSON file. 
      // In a real implementation, this might parse a markdown plan.
      return JSON.parse(content) as Plan;
    } catch (error) {
      // If file doesn't exist or is invalid, return a minimal scaffold plan
      return { tasks: ['scaffold-task'] } as Plan;
    }
  }
}
