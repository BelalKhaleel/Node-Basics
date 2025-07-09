/**
 * Starts the application
 * This is the function that is run when the app starts
 *
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name) {
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", onDataReceived);
  console.log(`Welcome to ${name}'s application!`);
  console.log("--------------------");
}

/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 *
 * For example, if the user entered
 * ```
 * node tasks.js batata
 * ```
 *
 * The text received would be "batata"
 * This function  then directs to other functions
 *
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  text = text.trim().split(" ");
  const command = text[0];
  const name = text[1];
  const task = text.slice(1).join(" ").trim();
  switch (command) {
    case "quit" || "exit":
      quit();
      break;
    case "exit":
      quit();
      break;
    case "hello":
      hello(name);
      break;
    case "help":
      help();
      break;
    case "list":
      list();
      break;
    case "add":
      add(task);
      break;
    case "remove":
      remove(name);
      break;
    default:
      unknownCommand(command);
      break;
  }
}

/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c) {
  console.log('unknown command: "' + c.trim() + '"');
}

/**
 * Says hello
 *
 * @returns {void}
 */
function hello(name) {
  if (name) {
    console.log(`hello ${name}!`);
  } else {
    console.log("hello!");
  }
}

/**
 * Exits the application
 *
 * @returns {void}
 */
function quit() {
  console.log("Quitting now, goodbye!");
  process.exit();
}

const commands = ["add", "exit", "hello", "help", "list", "quit", "remove"];

/**
 * Lists all the possible commands
 *
 * @returns {void}
 */
function help() {
  console.log("\n");
  console.log("Available commands:");
  commands.forEach((command) => console.log(command));
  console.log("\n");
}

const tasks = ["buy batattexttexttexttexta", "do the exercises"];
/**
 * Lists all tasks
 *
 * @returns {void}
 */
function list() {
  tasks.forEach((task, index) => console.log(`${index + 1} - [ ] ${task}`));
}

/**
 * Add a task
 *
 * @returns {void}
 */
function add(task) {
  if (!task) {
    console.log("Error: no task provided");
    return;
  }
  tasks.push(task);
  list();
}

/**
 * Remove a task
 *
 * @returns {void}
 */
function remove(num) {
  num = parseInt(num);
  if (num) {
    tasks.splice(num - 1, 1);
  } else {
    tasks.pop();
  }
  list();
}
// The following line starts the application
startApp("Belal Khaleel");
