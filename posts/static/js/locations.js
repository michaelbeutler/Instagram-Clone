const locations = [];

function findLocationById(id) {
    locationObj = false;
    $(locations).each(function (i, l) {
        if (l.id == id) {
            locationObj = l;
        }
    });
    return locationObj;
}