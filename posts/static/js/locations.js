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

function requestLocationList(callback) {
    $.ajax({
        url: "../get_locations/",
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        success: function (responseData) {
            callback(responseData.data.locations);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.error("Unable to gather post's from server: " + xhr.status + ' ' + thrownError);
        }
    });
}

function fillLocationSelection(list) {
    $(list).each(function (i, l) {
        $('#locationSelection').append(`<span class="badge badge-light p-1 mr-1" onclick="$('#locationInput').val('` + l.id + `'); $('.badge-light').each(function(i,e){$(e).removeClass('active');}); $(this).addClass('active');">` + l.name + `</span>`);
    });
}