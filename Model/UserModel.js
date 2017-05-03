'use strict';

var userModel = function UserModel(user_name, email, password, is_active) {

    this.user_name = user_name;
    this.email = email;
    this.password = password;
    this.is_active = is_active;

    this.getUsers = function () {

        var user1 = new UserModel("John Shimidth", "john@fluxx.io", "123456", true);
        var user2 = new UserModel("Fagner Oliveira", "fagner@fagnerunivocity.onmicrosoft.com", "123456", true);
        var user3 = new UserModel("Donez Marcus", "donezm@fluxx.io", "123456", true);

        return [user1, user2, user3];
    }
}

module.exports = userModel;