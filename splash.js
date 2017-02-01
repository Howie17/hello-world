var fs = require('fs');

/*
var authenticateUser = function (){

}

var createUser = function() {
    fs.writeFileSync("./users/" + this.valueofinputbox + ".json", 
}
*/

$('register').click(function(){
    var newUserName = $('newusername').value;
    var newUserPassword = $('newuserpassword').value;
    fs.writeFileSync("./users/" + newUserName + ".json", "function () {password: " + newUserPassword + "}");
    alert("User Saved");
});