var task = require('./task');

var userTask = task();

userTask.task = "Clean my room.";

console.log("User's task is: " + userTask.task);

