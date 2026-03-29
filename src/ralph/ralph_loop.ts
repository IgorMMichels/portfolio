import process from 'node:process';
import { RalphEngine, RalphOptions } from './ralph_engine.ts';

async function main() {
  const args = process.argv.slice(2);
  const taskDescription = args.find(arg => !arg.startsWith('--')) || 'implement it';
  
  const options: Partial<RalphOptions> = {};
  
  for (const arg of args) {
    if (arg.startsWith('--completion-promise=')) {
      options.completionPromise = arg.split('=')[1];
    } else if (arg.startsWith('--max-iterations=')) {
      options.maxIterations = parseInt(arg.split('=')[1], 10);
    } else if (arg.startsWith('--strategy=')) {
      const strategy = arg.split('=')[1];
      if (strategy === 'reset' || strategy === 'continue') {
        options.strategy = strategy;
      }
    }
  }

  const engine = new RalphEngine(options);
  await engine.run(taskDescription);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
