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

                setLoading(false);

                $("#button-signin").click(function () {

                    $("#span-message").css("display", "none");

                    var userName = $("#userName").val();
                    var password = $("#password").val();

                    if (!userName || !password) {
                        setErrorMessage("The username and password you entered don't match");
                        return;
                    }

                    var url = UrlServices.login(encodeURIComponent(userName), encodeURIComponent(password));

                    setLoading(true);

                    $.getJSON(url, {})
                        .done(function (json) {
                            if (json.success == true) {
                                StorageLibrary.saveToLocalStorage(myInfo.emailAddress, json.access_token);
                                window.location.assign(window.location.origin + "/App/Views/EmailSync/EmailSync.html");
                            }
                            else {
                                setErrorMessage("The username and password you entered don't match");
                            }
                        })
                        .fail(function (jqxhr, textStatus, error) {
                            setErrorMessage("Request Failed: " + (textStatus + ", " + error));
                        })
                        .always(function () {
                            setLoading(false);
                        });
                });
            });
        }
    };

    function setErrorMessage(message) {
        $("#span-message").css("display", "inline");
        $("#span-message").html(message);
    }

    function setLoading(isBusy) {
        if (isBusy) {
            $("#spinner").css("display", "inline");
            $("#content").css("display", "none");
        }
        else {
            $("#spinner").css("display", "none");
            $("#content").css("display", "inline");
        }
    }

})();