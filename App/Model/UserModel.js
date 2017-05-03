'use strict';

var userModel = (function UserModel() {

    var self = {}

    self.user_name = "";
    self.email = "";
    self.password = "";
    self.is_active = true;
    self.token = "";

    self.isAuthenticated = function () {
        var token = StorageLibrary.getFromLocalStorage(this.email);
        return (token != null && token != "");
    }

    return self;
})();


