$(document).ready(function () {
    // set current user
    requestCurrentUser(function (data) {
        setCurrentUser(generateUserFromJSON(data));
        //$('.insert-current-user-username').text(getCurrentUser().username);
        $('.insert-current-user-username').each(function (i, e) {
            $(e).text(getCurrentUser().username);
        });
        $('.insert-current-user-avatar').each(function (i, e) {
            $(e).attr("src", getCurrentUser().avatar);
        });
        //$('.insert-current-user-avatar').attr("src", getCurrentUser().avatar);

        // create needed objects
        requestPostList(function (data) {
            generatePostsFromJSON(data, function () {
                // display them
                displayPosts($('#postContainer'));
            })
        });

        $(function () {
            $('[data-toggle="popover"]').popover()
        })

        $('#navLikeContainer').attr('data-content', `
            <div class="container-fluid" width='500'>
            <div class="row">
                <div class="col">
                    Test
                </div>
                <div class="col">
                    Test
                </div>
            </div>
            </div>
        `);

        $.ajax({
            url: "accounts/get_latest_users/",
            type: "GET",
            dataType: "json",
            contentType: "application/json",
            success: function (responseData) {
                $('.rec-container').append('Vorschläge<hr>');
                $(responseData.data.users).each(function (i, u) {
                    if (findUserById(u.id) === false) {
                        console.log("added user");
                        users.unshift(new User(u.id, u.username, u.avatar, u.url));
                        $('.rec-container').append('<img src="' + u.avatar + '" class="post-header-avatar rounded-circle mr-3" style="max-height: 20px; max-width: 20px;" /><a class="profile-url" href="' + u.url + '">' + u.username + '</a><br>')
                    }
                });
                $('.rec-container').append('<hr>');
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.error("Unable to gather current user from server: " + xhr.status + ' ' + thrownError);
            }
        });
    });

});