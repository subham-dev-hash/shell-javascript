const readline = require("readline");
const { spawnSync } = require('child_process')


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "$ ",
});

const builtins = ["type", "exit", "echo"];

function checkBuiltin(str) {
  return builtins.includes(str);
}

function handleExit() {
  rl.close();
}

function handleEcho(command) {
  console.log(command.slice(5));
  rl.prompt();
}

function handleType(command) {
  const cmd = command.slice(5);
  let executable = searchExecutable(cmd)
  let builtin = checkBuiltin(cmd)
  if (executable || builtin) {
    console.log(`${cmd} is ${builtin ? 'a shell builtin' : executable}`)
  } else {
    console.log(`${cmd}: not found`);
  }
  rl.prompt();
}

function searchExecutable(command) {

  // Check if a file with the command name exists.
  // Check if the file has execute permissions.
  // If the file exists and has execute permissions, print <command> is <full_path> and stop.
  // If the file exists but lacks execute permissions, skip it and continue to the next directory.

  const res = spawnSync('which', [command])
  if (res.status === 0) return res.stdout.toString().replace(/(\r\n|\n|\r)/gm, '')
}

function handleUnknown(command) {
  console.error(`${command}: command not found`);
  rl.prompt();
}

function handleCommand(command) {
  if (command === "exit") {
    return handleExit();
  }

  if (command.startsWith("echo")) {
    return handleEcho(command);
  }

  if (command.startsWith("type")) {
    return handleType(command);
  }

  handleUnknown(command);
}

rl.prompt();

rl.on("line", handleCommand);