var StorageLibrary = (function () {

    // Stores the settings using local storage (Web Storage that doesn't expire).
    // See https://msdn.microsoft.com/en-us/library/bg142799(v=vs.85).aspx information about localStorage.
    function saveToLocalStorage(key, value) {

        localStorage.setItem(key, value);
    }

    function getFromLocalStorage(key) {

        var value = localStorage.getItem(key);
        return value;
    }

    function removeFromLocalStorage(key) {
        var retval = localStorage.removeItem(key);
    }

    return {
        saveToLocalStorage: saveToLocalStorage,
        getFromLocalStorage: getFromLocalStorage,
        removeFromLocalStorage: removeFromLocalStorage
    };
})();