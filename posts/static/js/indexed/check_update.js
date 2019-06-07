$(document).ready(function () {
    $.ajax({
        url: "update_needed/",
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        success: function (responseData) {
            if (responseData.data.update) {
                db.delete().then(function () { window.location.reload() });
            }
        }
    });
})
