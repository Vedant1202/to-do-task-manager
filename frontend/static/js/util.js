const baseUrl = 'http://localhost:4000/';
const apiUrl = `${baseUrl}api/`;

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getCurrentDate() {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    today = `${dd}-${mm}-${yyyy}`;
    return today;
}

function matches(obj, source, keylist = false) {
    if (keylist) {
        return keylist.every((key) => obj.hasOwnProperty(key) && obj[key] === source[key]);
    }
    return Object.keys(source).every((key) => obj.hasOwnProperty(key) && String(obj[key]) === String(source[key]));
}

function searchArrayOfObjects(array, what, key) {
    return array.filter((element) => String(element[key]).toLowerCase().includes(what));
}

function searchArrayForTags(array, what, key = 'tags') {
    return array.filter((element) => element[key].includes(what));
}

function removeDuplicatesFromArray(array) {
    return Array.from(new Set(array));
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Navigation functions
const Nav = /** @class */ (function () {
    function Nav() {}
    Nav.assign = function (url) {
        window.location.assign(url);
    };
    Nav.replace = function (url) {
        window.location.replace(url);
    };
    Nav.back = function () {
        window.history.back();
    };
    Nav.open = function (url) {
        window.open(url, '_blank', 'location=no');
    };
    Nav.close = function () {
        window.close();
    };
    return Nav;
})();

// Cache storage Functions
function setData(cname, cvalue) {
    window.localStorage.setItem(cname, JSON.stringify(cvalue));
}

function getData(cname) {
    return JSON.parse(JSON.parse(window.localStorage.getItem(cname)));
}

function checkData(cname) {
    const user = getData(cname);
    if (user != null) {
        return true;
    }
    return false;
}

function deleteData(cname) {
    window.localStorage.removeItem(cname);
}
