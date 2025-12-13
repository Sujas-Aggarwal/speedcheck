import chalk from "chalk";

export function prettyPrint(result) {
  console.log("");
  console.log(chalk.green("Speed Check"));
  console.log("------------------------");
  console.log(`Ping     : ${chalk.cyan(result.ping)} ms`);
  console.log(`Download : ${chalk.cyan(result.download)} Mbps`);
  console.log(`Upload   : ${chalk.cyan(result.upload)} Mbps`);
  console.log(
    `Server   : ${result.server.name} (${result.server.location})`
  );
  console.log("");
}
