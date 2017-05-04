var Utils = (function () {

    var self = {};

    self.centralizeElement = function (elementId) {
        var height = window.innerHeight;
        var width = window.innerWidth;
        var element = document.getElementById(elementId);

        var top = (height / 2) - (element.clientHeight / 2);
        var left = (width / 2) - (element.clientWidth / 2);

        element.style.top = top + "px";
        element.style.left = left + "px";
    };

    return self;
})();