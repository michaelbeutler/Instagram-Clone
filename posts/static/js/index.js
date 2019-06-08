$(document).ready(function () {
    // set current user
    requestCurrentUser(function (data) {
        setCurrentUser(generateUserFromJSON(data));
    });

    $('.insert-current-user-username').text(getCurrentUser().username);
    $('.insert-current-user-avatar').attr("src", getCurrentUser().avatar);

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

    $('#navLikeContainer').attr('data-content',`
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
});