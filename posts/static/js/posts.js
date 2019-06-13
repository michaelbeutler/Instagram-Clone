var posts = [];

function generatePostsFromJSON(json, callback) {
    var cu = 0, cl = 0, cp = 0;
    $(json).each(function (i, p) {
        if (findUserById(p.user.id) === false) {
            users.unshift(new User(p.user.id, p.user.username, p.user.avatar, p.user.url));
            cu++;
        }
        if (findLocationById(p.location.id) === false) {
            locations.unshift(new Location(p.location.id, p.location.name, p.location.url));
            cl++;
        }
        if (findPostById(p.id) === false) {
            posts.unshift(new Post(p.id, p.caption, p.image, findUserById(p.user.id), [], p.liked, [], p.allowComment, findLocationById(p.location.id), p.date));
            cp++;
        }
        var post = findPostById(p.id);
        $(p.likes).each(function (i, l) {
            if (findUserById(l.user.id) === false) {
                users.unshift(new User(l.user.id, l.user.username, l.user.avatar, l.user.url));
                cu++;
            }
            post.likes.unshift(new Like(findUserById(l.user.id), post));
        });
        $(p.comments).each(function (i, c) {
            if (findUserById(c.user.id) === false) {
                users.unshift(new User(c.user.id, c.user.username, c.user.avatar, c.user.url));
                cu++;
            }
            post.comments.unshift(new Comment(findUserById(c.user.id), post, c.comment));
        });
    });
    console.log("created " + cu + " users");
    console.log("created " + cl + " locations");
    console.log("created " + cp + " posts");
    callback();
}

function displayPosts(element) {
    $(posts).each(function (i, p) {
        $(element).append(p.html);
        console.log("generated post " + p.id);
    });
    setPostEventListeners();
    return true;
}

function setPostEventListeners() {
    $('.post-image').dblclick(function () {
        findPostById($(this).data("id")).like(getCurrentUserId());
    });
    $('.textarea-comment').change(function () {
        if ($(this).val().length == 0) {
            $(this).parent().parent().find('button').attr('disabled', true);
        } else {
            $(this).parent().parent().find('button').attr('disabled', false);
        }
    });
    $('.textarea-comment').keyup(function () {
        if ($(this).val().length == 0) {
            $(this).parent().parent().find('button').attr('disabled', true);
        } else {
            $(this).parent().parent().find('button').attr('disabled', false);
        }
    });
    $('.textarea-comment').on('keypress', function (e) {
        if (e.which == 13) {
            if ($(this).val().length > 0) {
                findPostById($(this).data('id')).comment(getCurrentUserId());
            }
        }
    });
    $('.textarea-comment').keyup(function () {
        var v = $(this).val();
        if (v.substr(v.length - 1, v.length) == '@') {
            showUserTagSuggestion(this);
        }
    });
    $('.sprite-comment').click(function () {
        $('#commentInput' + $(this).data('id')).focus();
    });
}

function showUserTagSuggestion(element) {
    $(element).val($(element).val() + 'michi.beutler');
    
}

function requestPostList(callback) {
    $.ajax({
        url: "get_posts/",
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        success: function (responseData) {
            callback(responseData.data.posts);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.error("Unable to gather post's from server: " + xhr.status + ' ' + thrownError);
        }
    });
}

function findPostById(id) {
    post = false;
    $(posts).each(function (i, p) {
        if (p.id == id) {
            post = p;
        }
    });
    return post;
}