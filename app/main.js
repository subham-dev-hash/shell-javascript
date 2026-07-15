const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "$ ",
});

// TODO: Uncomment the code below to pass the first stage
rl.prompt();

rl.on("line", (command) => {

  if (command === 'exit') {
    rl.close();
    return;
  } else if (command.startsWith("echo")) {
    console.log(command.slice(5))
    rl.prompt();
  } else if (command.startsWith("type")) {
    let isBuiltin = checkBuiltin(command.slice(5));
    if(isBuiltin){
      console.log(`${command.slice(5)} is a shell builtin`)
    }else{
      console.log(`${command.slice(5)}: not found`)
    }
    rl.prompt()
  }
  else {
    console.error(`${command}: command not found`);
    rl.prompt();
  }
});

function checkBuiltin(str) {
  const builtins = ["type", "exit", "echo"]
  for (let el of builtins) {
    if (el === str) return true
  }
  return false
}

// REPL -> Read Eval Print Loop