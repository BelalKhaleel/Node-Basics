
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
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
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
  if (text === 'quit\n' || text === 'exit\n') {
    quit();
  }
  else if(text === 'hello\n' || text.split(" ")[0] === "hello"){
    hello(text);
  }
  else if(text === 'help\n'){
    help();
  }
  else if(text === 'list\n'){
    list();
  }
  else if(text.startsWith('add')){
    add(text);
  }
  else if(text.startsWith('remove')){
    removeTask(text);
  }
  else{
    unknownCommand(text);
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello
 *
 * @returns {void}
 */
function hello(text){
  if (text === "hello\n"){
    console.log("hello!");
    return
  }
  text = text.replace('\n', '').trim();
  var info = text.split(' ');
  if (info[0] === 'hello'){
    var data = info.slice(1).join(" ");
    console.log(`hello ${data}!`)
  }
}


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}

// The following line starts the application
startApp("Belal Khaleel")

//command "help" displays all possible commands//

function help () {
  let commandList = ["hello", "help", "exit", "quit"]
  console.log("\nThe commands are: \n")
  commandList.forEach((e) => {
  console.log(e)})
}

//lists all tasks//
let taskslist = ["task1", "task2", "task3"];
function list(text) {
  for (let i = 0; i < taskslist.length; i++) {
    console.log(`${i + 1} - [ ] ${taskslist[i]}`);
  }
}

//adds task to list//
function add(obj) {
  obj = obj.trim().split(" ")[1]
  if (obj == undefined) {
    console.log("error")
  }
  else {
    taskslist.push(obj)
  }
}

//removing tasks from the list//
function removeTask(obj) {
  obj = obj.replace('\n', '').trim();
  if (obj === "remove\n") {
    taskslist.pop();
    return
  }
  var command = obj.split(' ');
  if (command[0] === 'remove'){
    var a = command.slice(1).join(' ');
    if (a > taskslist.length) {
      console.log("This task doesn't exist");
    }
  else {
    taskslist.slice(`${a[0] - 1}`, 1);
  }
}
}