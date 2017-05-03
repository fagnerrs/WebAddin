var Routes = (function () {

    var self = {};

    self.login = function (userName, password) {
        return "https://localhost:3000/login/" + userName + "/" + password;
        //return "/login/" + userName + "/" + password;
    }

    self.emailSync = function (messageId) {
        return "https://localhost:3000" + "/grantsemail/message/ " + messageId;
        //return  "/grantsemail/message/ " + messageInfo.itemId;
    }

    return self;

})();