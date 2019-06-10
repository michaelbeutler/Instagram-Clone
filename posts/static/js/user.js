class User {
    constructor(id, username, avatar, url) {
        this.id = id;
        this.username = username;
        this.avatar = avatar;
        this.url = url;
    }

    follow() {
        var target = this;
        var commentInput = document.getElementById('commentInput' + this.id);
        $.ajax({
            url: "/account/follow/" + target.id,
            type: "POST",
            dataType: "json",
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (responseData) {
                alert();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.error('Unable to follow this user: ' + xhr.status + ' ' + thrownError);
            }
        });
    }
}