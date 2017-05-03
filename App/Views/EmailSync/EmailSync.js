(function () {
    "use strict";

    Office.initialize = function (reason) {

        var myInfo = Office.context.mailbox.userProfile;
        var messageInfo = Office.cast.item.toItemRead(Office.context.mailbox.item);

        $("#user-name").html(myInfo.displayName);
        $("#user-address").html("San Francisco, CA, USA");
        $("#user-organization").html("ABC Organizarion");

        var serchBoxControl;
        var SearchBoxElements = document.querySelectorAll(".ms-SearchBox");
        for (var i = 0; i < SearchBoxElements.length; i++) {
            serchBoxControl = new fabric['SearchBox'](SearchBoxElements[i]);
        }

        var token = StorageLibrary.getFromLocalStorage(myInfo.emailAddress);
        var isAuthenticated = (token !== null && token !== "");

        if (!isAuthenticated) {
            window.location.assign(window.location.origin + "/App/Views/Login/Login.html");
            return;
        }

        $(document).ready(function () {
            $("#logout").click(function () {
                StorageLibrary.removeFromLocalStorage(myInfo.emailAddress);
                window.location.assign(window.location.origin + "/App/Views/Login/Login.html");
            });

            var url = UrlServices.getOrganizations(encodeURIComponent(messageInfo.itemId));

            $.getJSON(url, {})
                .done(function (json) {
                    if (json.success === true) {
                        fillEmailsList(json.data);
                        hideSpinner();
                    }
                })
                .fail(function (jqxhr, textStatus, error) {
                    var err = textStatus + ", " + error;
                    console.log("Request Failed: " + err);
                    hideSpinner();
                });
        });

        function fillEmailsList(data) {

            var newElement;
            var containerOrganizations = $("#org-container");

            data.forEach(function (grant) {

                newElement = $(document.createElement('div'));
                newElement.append("<button id=\"title\" name=\"org-name\" class=\"accordion ms-font-m-plus\">" + grant.description + "</button>" +
                    "<div class=\"panel\">" +
                    "<ul id=\"items\" class=\"ms-List\" style=\"padding:0px;\">" +
                    "</ul>" +
                    "</div>");

                var index = 0;
                grant.organizations.forEach(function (organization) {
                    index++;
                    var orgItem = "<li class=\"ms-ListItem ms-ListItem--image\" style=\"padding-left:5px; padding-top:0px;\">" +
                        " <div class=\"ms-Grid\"> " +
                        " <div class=\"ms-Grid-row\"> " +
                        " <span id=\"itemtitle\" class=\"ms-font-xl\">" + organization.description + "</span> " +
                        " </div> " +
                        " <div class=\"ms-Grid-row\"> " +
                        " <span id=\"itemaddress\" class=\"ms-font-m\" style=\"padding:0px;" + (organization.address ? "" : "display:none") + "\">" + organization.address + "</span> " +
                        " </div> " +
                        " <div class=\"ms-Grid-row\"> " +
                        " <span id=\"itemphone\" class=\"ms-font-m\" style=\"padding:0px;" + (organization.phone ? "" : "display:none") + "\">" + organization.phone + "</span> " +
                        " </div> " +
                        " </div> " +
                        " <div class=\"ms-ListItem-actions\"> " +
                        "  <div class=\"ms-ListItem-action\"> " +
                        " <i name=\"btn-uploadEmail\" id=\"m" + organization.id + "\" class=\"ms-Icon ms-Icon--Mail\"></i> " +
                        " </div> " +
                        " <div class=\"ms-ListItem-action\"> " +
                        " <i name=\"btn-watchThread\" id=\"t" + organization.id + "\" class=\"ms-Icon ms-Icon--BulletedList\"></i> " +
                        " </div> " +
                        " </div> " +
                        " </li>";

                    if (grant.organizations.length > index) {
                        orgItem += "<hr/>";
                    }

                    $(newElement).find("#items").append(orgItem);
                });

                containerOrganizations.append(newElement);
            });

            containerOrganizations.find("button[name='org-name']").each(setAccorionItem);
            containerOrganizations.find("i[name='btn-uploadEmail']").on("click", uploadEmail);
            containerOrganizations.find("i[name='btn-watchThread']").on("click", watchThread);
        }

        function hideSpinner() {
            $("#spinner").css("display", "none");
            $("#content").css("display", "inline");
        }

        function setAccorionItem(index, accordion) {
            accordion.onclick = function () {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            }
        }

        function uploadEmail(event) {

            getEmailInfoAsync(function (emailModel) {

                var url = UrlServices.emailUpload(event.target.id.substring(1, event.target.id.length));

                $.post(url, emailModel)
                    .done(function (json) {
                        if (json.success === true) {
                            console.log("sent");
                        }
                    })
                    .fail(function (jqxhr, textStatus, error) {
                        var err = textStatus + ", " + error;
                        console.log("Request Failed: " + err);
                    });
            });
        }

        function getEmailInfoAsync(callFunc) {

            var selectedEmail = Office.cast.item.toItemRead(Office.context.mailbox.item);
            var emailModel = new EmailModel();

            if (selectedEmail.itemType === Office.MailboxEnums.ItemType.Message) {

                selectedEmail.body.getAsync("text", function callback(result) {

                    emailModel.body = result.value;
                    emailModel.title = selectedEmail.subject;
                    emailModel.attached_files = [];
                    emailModel.from = selectedEmail.sender.emailAddress;

                    emailModel.to = [];
                    for (var i = 0; i < selectedEmail.to.length; i++) {
                        emailModel.to.push(selectedEmail.to[i].emailAddress)
                    }

                    emailModel.cc = [];
                    for (var i = 0; i < selectedEmail.cc.length; i++) {
                        emailModel.cc.push(selectedEmail.cc[i].emailAddress)
                    }

                    emailModel.bcc = [];
                    if (selectedEmail.bcc) {
                        for (var i = 0; i < selectedEmail.bcc.length; i++) {
                            emailModel.bcc.push(selectedEmail.bcc[i].emailAddress)
                        }
                    }

                    emailModel.message_id = selectedEmail.itemId;
                    emailModel.conversation_id = selectedEmail.conversationId;

                    callFunc(emailModel);
                });
            }
        }

        function watchThread() {
            console.log("button watch thread touched...");
        }
    };

})();