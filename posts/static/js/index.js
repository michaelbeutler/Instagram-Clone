$(document).ready(function () {
    loadStartpageContent();
    loadProfile(function (responseData) {
        console.log(responseData);
        $('.footer-nav-profile-avatar').attr("src", responseData.data.avatar);
        $('.index-sidepanel-username').text(responseData.data.username);
        $('.index-sidepanel-avatar').attr("src", responseData.data.avatar);
    });
})

function loadProfile(callback) {
    $.ajax({
        url: "get_profile/",
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        success: function (responseData) {
            callback(responseData);
        }
    });
}