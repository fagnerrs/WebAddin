var UrlServices = (function () {

    var self = {};

    //var origin = "https://localhost:3000"; // Local
    var origin = window.location.origin; // Prod


    self.login = function (userName, password) {
        return origin + "/login/" + userName + "/" + password;
    }

    self.getOrganizations = function (messageId) {
        return origin + "/organization/message?id=" + messageId;
    }

    self.emailUpload = function (organizationId) {
        return origin + "/organization/" + organizationId + "/email";
    }

    return self;

})();