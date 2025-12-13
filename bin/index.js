#!/usr/bin/env node

import { Command } from "commander";
import runOnce from "../src/commands/once.js";
import runWatch from "../src/commands/watch.js";

const program = new Command();

program
  .name("speedcheck")
  .description("Check your internet speed from the terminal")
  .version("1.0.0")
  .addHelpText(
    "after",
    `
Examples:
  $ speedcheck
  $ speedcheck once
  $ speedcheck once --json
  $ speedcheck watch --interval 2
`
);

program
.action(async () => {
await runOnce({});
});


program
  .command("once")
  .description("Run a single speed test")
  .option("--json", "Output result as JSON")
  .action(runOnce);

program
  .command("watch")
  .description("Continuously check speed")
  .option("-i, --interval <seconds>", "Interval in seconds", "1")
  .action(runWatch);

program
  .command("help")
  .description("Display help information")
  .action(() => {
    program.help();
  });

program.parse();

if (!process.argv.slice(2).length) {
  // handled by default action
}