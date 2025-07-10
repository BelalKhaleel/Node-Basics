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
  let task = "";
  if (command === "edit" && !isNaN(name)) {
    task = text.slice(2).join(" ").trim();
  } else {
    task = text.slice(1).join(" ").trim();
  }
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
    case "edit":
      edit(name, task);
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

const commands = ["add", "edit", "exit", "hello", "help", "list", "quit", "remove"];

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

const tasks = [
  {
    task: "buy batattexttexttexttexta",
    done: false,
  }, 
  {
    task: "do the exercises",
    done: false,
  }
]
/**
 * Lists all tasks
 *
 * @returns {void}
 */
function list() {
  tasks.forEach((taskObj, index) => {
    if(taskObj.done) {
      console.log(`${index + 1} - [✓] ${taskObj.task}`);
    } else {
      console.log(`${index + 1} - [ ] ${taskObj.task}`);
    }
  });
}

/**
 * Add a task
 *
 * @returns {void}
 */
function add(taskName) {
  if (!taskName) {
    console.log("Error: no task provided");
    return;
  }
  tasks.push({ task: taskName, done: false });
  list();
}

/**
 * Remove a task
 *
 * @returns {void}
 */
function remove(num) {
  if (!num) {
    tasks.pop();
    list();
    return;
  } else if (typeof num === 'number') {
    num = parseInt(num);
  } else if (typeof num === 'float') {
    num = parseFloat(num);
  }
  if (!tasks[num - 1]) {
    console.log("Error: please enter a valid task number");
    return;
  }
  if (num) {
    tasks.splice(num - 1, 1);
  }
  list();
}

/**
 * Edit a task
 * 
 * @returns {void}
 */
function edit(taskNumber, taskName) {
  if (!taskNumber || !taskName) {
    console.log("Error: please specify which task to edit and the new content.");
    return;
  }
  if (!isNaN(taskNumber)) {
    tasks.splice((taskNumber - 1), 1, { task: taskName, done: false });
  } else {
    tasks.splice(tasks.length - 1, 1, { task: taskName, done: false });
  } 
  list();
} 
// The following line starts the application
startApp("Belal Khaleel");
