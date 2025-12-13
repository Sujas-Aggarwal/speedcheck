import ora from "ora";
import {
  pingTest,
  uploadTest,
  downloadTest
} from "./src/core/speedtest.js";

async function runTest(label, fn) {
  const spinner = ora(label).start();

  try {
    await fn();
    spinner.succeed(`${label} Passed`);
  } catch (err) {
    spinner.fail(`${label} Failed`);
    console.error(err.message);
  }
}

async function main() {
  await runTest("Testing Ping Test Function", pingTest);
  await runTest("Testing Upload Test Function", uploadTest);
  await runTest("Testing Download Test Function", downloadTest);
}

main();