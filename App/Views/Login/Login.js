(function () {
    "use strict";

    // The Office initialize function must be run each time a new page is loaded.
    Office.initialize = function (reason) {
        $(document).ready(function () {

            console.log("passou aqui...");

            $("#button-signin").click(function (a) {
                window.location.assign(window.location.origin + "/App/Views/EmailSync/EmailSync.html");
            });

        });
    };
})();