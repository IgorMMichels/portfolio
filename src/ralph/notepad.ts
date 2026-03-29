import { NotepadInterface } from './ralph_loop_utils.ts';

/**
 * Notepad provides a small API for logging findings during the Ralph Loop.
 * In this skeleton, these are no-ops.
 */
export class Notepad implements NotepadInterface {
  /**
   * Logs a learning to the specified path.
   */
  public logLearning(_path: string, _content: string): void {
    // No-op in skeleton
  }

  /**
   * Logs an issue to the specified path.
   */
  public logIssue(_path: string, _content: string): void {
    // No-op in skeleton
  }

  /**
   * Logs a problem to the specified path.
   */
  public logProblem(_path: string, _content: string): void {
    // No-op in skeleton
  }
}
