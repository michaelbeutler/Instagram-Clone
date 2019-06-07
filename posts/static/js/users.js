const users = [];
var currentUser = false;

function generateUserFromJSON(json) {
    return new User(json.id, json.username, json.avatar, json.url);
}

function requestCurrentUser(callback) {
    $.ajax({
        url: "get_current_user/",
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        success: function (responseData) {
            callback(responseData.data.user);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.error("Unable to gather current user from server: " + xhr.status + ' ' + thrownError);
        }
    });
}

function getCurrentUserId() {
    return currentUser.id;
}

function getCurrentUser() {
    return currentUser;
}

function findUserById(id) {
    user = false;
    $(users).each(function (i, u) {
        if (u.id == id) {
            user = u;
        }
    });
    return user;
}

function setCurrentUser(user) {
    if (findUserById(user.id) === false) {
        users.unshift(user);
    }
    currentUser = findUserById(user.id);
}