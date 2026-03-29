/**
 * Options for the Ralph Loop.
 */
export interface RalphLoopOptions {
  completionPromise: string;
  maxIterations: number;
  strategy: 'reset' | 'continue';
}

/**
 * Result of a single task execution.
 */
export interface TaskResult {
  taskId: string;
  status: 'completed' | 'failed';
  output: string;
}

/**
 * State of the Ralph Loop.
 */
export interface RalphLoopState {
  iteration: number;
  isComplete: boolean;
  tasks: string[];
  results: TaskResult[];
  planName?: string;
  currentIndex?: number;
}

/**
 * Plan structure.
 */
export interface Plan {
  tasks: string[];
  [key: string]: any;
}

/**
 * Interface for plan ingestion.
 */
export interface PlanIngestor {
  ingest(): Promise<Plan>;
}

/**
 * Interface for task queuing.
 */
export interface TaskQueue {
  queue(plan: Plan): Promise<string[]>;
}

/**
 * Interface for result collection.
 */
export interface ResultCollector {
  collect(tasks: string[]): Promise<TaskResult[]>;
}

/**
 * Interface for iteration control.
 */
export interface IterationController {
  shouldStop(state: RalphLoopState, plan: Plan): Promise<boolean>;
}

/**
 * Interface for notepad logging.
 */
export interface NotepadInterface {
  logLearning(path: string, content: string): void;
  logIssue(path: string, content: string): void;
  logProblem(path: string, content: string): void;
}
