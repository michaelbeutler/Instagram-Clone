class User {
    constructor(id, username, avatar, url) {
        this.id = id;
        this.username = username;
        this.avatar = avatar;
        this.url = url;
    }

    follow() {
        var target = this;
        $.ajax({
            url: "/accounts/follow/" + target.id,
            type: "POST",
            dataType: "json",
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (responseData) {
                $('#followBtn').removeClass('btn-primary');
                $('#followBtn').addClass('btn-secondary');
                $('#followBtn').text('Abonniert');
                location.reload();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.error('Unable to follow this user: ' + xhr.status + ' ' + thrownError);
            }
        });
    }

    unfollow() {
        var target = this;
        $.ajax({
            url: "/accounts/unfollow/" + target.id,
            type: "POST",
            dataType: "json",
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (responseData) {
                $('#followBtn').removeClass('btn-secondary');
                $('#followBtn').addClass('btn-primary');
                $('#followBtn').text('Folgen');
                location.reload();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.error('Unable to unfollow this user: ' + xhr.status + ' ' + thrownError);
            }
        });
    }
}