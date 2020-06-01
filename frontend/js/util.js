const baseUrl = "http://localhost:4000/";
const apiUrl = baseUrl + 'api/';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getCurrentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '-' + mm + '-' + yyyy;
    return today;
}

function matches(obj, source, keylist=false) {
    if (keylist) {
        return keylist.every(key => obj.hasOwnProperty(key) && obj[key] === source[key]);
    } else {
        return Object.keys(source).every(key => obj.hasOwnProperty(key) && String(obj[key]) === String(source[key]));
    }
}

function searchArrayOfObjects(array, what, key) {
    return array.filter(element => String(element[key]).toLowerCase().includes(what));
}

function searchArrayForTags(array, what, key='tags') {
    return array.filter(element => element[key].includes(what));
}

function removeDuplicatesFromArray(array) {
    return Array.from(new Set(array));
}

