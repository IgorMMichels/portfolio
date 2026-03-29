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

## Interfaces

The loop is built around several key interfaces defined in `src/ralph/ralph_loop_utils.ts`:

- `PlanIngestor`: Responsible for reading the plan.
- `TaskQueue`: Responsible for identifying tasks to be executed.
- `ResultCollector`: Responsible for executing tasks and collecting `TaskResult` objects.
- `IterationController`: Responsible for determining if the loop should terminate.

## Extension

To extend the Ralph Loop, you can implement these interfaces with actual logic (e.g., file I/O, API calls, etc.) and inject them into the `RalphLoop` constructor.

## Usage

```bash
ts-node src/ralph/ralph_loop.ts "task description" --completion-promise=FINISHED --max-iterations=50 --strategy=continue
```

## Testing

Run the unit tests to verify the loop's behavior:

```bash
npx vitest tests/ralph_loop.test.ts
```
