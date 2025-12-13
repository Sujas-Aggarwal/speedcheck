import chalk from "chalk";
import { runSpeedTest } from "../core/speedtest.js";
import { sleep } from "../utils/sleep.js";

export default async function runWatch(options) {
  const interval = Number(options.interval) * 1000;

  console.log(chalk.yellow("Continuous speed check (Ctrl+C to stop)\n"));

  while (true) {
    try {
      const r = await runSpeedTest();

      console.log(
        `${new Date().toLocaleTimeString()} | ` +
        `↓ ${r.download} Mbps | ↑ ${r.upload} Mbps | ` +
        `Ping ${r.ping} ms`
      );
    } catch (err) {
      console.error("Error:", err.message);
    }

    await sleep(interval);
  }
}
