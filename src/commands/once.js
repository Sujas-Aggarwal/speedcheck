import ora from "ora";
import { runSpeedTest } from "../core/speedtest.js";
import { prettyPrint } from "../utils/format.js";

export default async function runOnce(options) {
  const spinner = ora("Running speed test...").start();

  try {
    const result = await runSpeedTest();

    spinner.stop();

    if (options.json) {
      console.log(JSON.stringify(result, null, 2));
    } else {
      prettyPrint(result);
    }
  } catch (err) {
    spinner.fail("Speed test failed");
    console.error(err.message);
    process.exit(1);
  }
}
