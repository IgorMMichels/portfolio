# Ralph Loop

The Ralph Loop is a self-referential planning loop that repeatedly consumes the current plan, queues tasks, collects results, and emits a completion signal.

## Contract

The Ralph Loop follows a simple iteration cycle:
1. **Plan Ingestion**: Read the current plan from the environment.
2. **Task Queuing**: Identify and queue tasks based on the plan.
3. **Result Collection**: Collect results from completed tasks.
4. **Iteration Control**: Decide whether to continue or stop based on the plan and iteration limits.
5. **Completion Signal**: Emit a completion signal via `<promise>{{COMPLETION_PROMISE}}</promise>` when the plan is complete.

## Parameters

- `--completion-promise`: The string to emit when the loop completes (default: `DONE`).
- `--max-iterations`: The maximum number of iterations to run (default: `100`).
- `--strategy`: The strategy to use when starting the loop (`reset` or `continue`).

## Extension

To extend the Ralph Loop, you can:
- Implement custom `PlanIngestor` to support different plan formats.
- Implement custom `TaskQueue` to handle different types of tasks.
- Implement custom `ResultCollector` to process task results.
- Implement custom `IterationController` to change the loop's behavior.

## Usage

```bash
ts-node src/ralph/ralph_loop.ts "task description" --completion-promise=FINISHED --max-iterations=50 --strategy=continue
```
