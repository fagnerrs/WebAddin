(function () {
    "use strict";

    Office.initialize = function (reason) {

        var myInfo = Office.context.mailbox.userProfile;
        var token = StorageLibrary.getFromLocalStorage(myInfo.emailAddress);

        if (token != null && token != "") {
            window.location.assign(window.location.origin + "/App/Views/EmailSync/EmailSync.html");
        }
        else {
            $(document).ready(function () {

                $("#spinner").css("display", "none");
                $("#content").css("display", "inline");

                $("#button-signin").click(function () {

                    var userName = $("#userName").val();
                    var password = $("#password").val();

                    var url = UrlServices.login(encodeURIComponent(userName), encodeURIComponent(password));

                    $.getJSON(url, {})
                        .done(function (json) {
                            if (json.success == true) {
                                StorageLibrary.saveToLocalStorage(myInfo.emailAddress, json.access_token);
                                window.location.assign(window.location.origin + "/App/Views/EmailSync/EmailSync.html");
                            }
                        })
                        .fail(function (jqxhr, textStatus, error) {
                            var err = textStatus + ", " + error;
                            console.log("Request Failed: " + err);
                        });
                });
            });
        }
    };

})();