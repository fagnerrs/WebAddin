var UrlServices = (function () {

    var self = {};

    self.login = function (userName, password) {
        return "https://localhost:3000/login/" + userName + "/" + password;
        //return "/login/" + userName + "/" + password;
    }

    self.getOrganizations = function (messageId) {
        return "https://localhost:3000" + "/organization/message/" + messageId;
        //return  "/grantsemail/message/ " + messageInfo.itemId;
    }

    self.emailUpload = function (organizationId) {
        return "https://localhost:3000" + "/organization/" + organizationId + "/email";
    }

    return self;

})();