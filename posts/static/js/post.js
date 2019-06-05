const requestURI = '';

function loadPost(id, callback) {
    $.ajax({
        url: "get_posts/",
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        success: function (responseData) {
            callback(responseData);
        }
    });
}

function drawPost(responseData) {
    $(responseData.data.posts).each(function (i, post) {
        var html = '<br>';
        html += '<article class="post card">';
        html += '<header class="post-header">';
        html += '<div class="row">';
        html += '<div class="col-1 align-self-center">';
        html += '<img src="' + post.user.avatar + '" alt="" class="d-block post-header-avatar rounded-circle" href="#">';
        html += '</div>';
        html += '<div class="col-5 align-self-center" style="padding-left: 0px;">';
        html += '<div class="row">';
        html += '<div class="col"><a class="d-block profile-url ml-2" href="' + post.user.url + '">' + post.user.username + '</a></div>';
        html += '</div>';
        html += '<div class="row">';
        html += '<div class="col"><small><a class="d-block location-url ml-2">' + post.location + '</a></small></div>';
        html += '</div>';
        html += '</div>';
        html += '<div class="col-6"></div>';
        html += '</div>';
        html += '</header>';
        html += '<img src="' + post.image + '" alt="" class="post-image">';
        html += '<footer class="post-footer">';
        html += '<div class="row">';
        html += '<div class="col">';

        if (post.liked) {
            html += '<span class="d-inline-block btn-like sprite-like-after"></span>';
        } else {
            html += '<span class="d-inline-block btn-like sprite-like-before"></span>';
        }

        html += '<span class="d-inline-block sprite-comment ml-2"></span>';
        html += '</div>';
        html += '</div>';
        html += '<div class="row">';
        html += '<a href="#">';
        if (post.likes.length < 3) {
            html += '<div class="col">Gefällt ';
            $(post.likes).each(function (i, like) {
                html += '<a class="profile-url" href="' + like.user.url + '">' + like.user.username + '</a> ';
            });
            html += '</div>';
        } else {
            html += '<div class="col">Gefällt ';
            html += '<a class="profile-url" href="' + post.likes[0].user.url + '">' + post.likes[0].user.username + '</a> ';
            html += '<a class="profile-url" href="' + post.likes[1].user.url + '">' + post.likes[1].user.username + '</a> ';
            html += '<a class="profile-url" href="' + post.likes[2].user.url + '">' + post.likes[2].user.username + '</a> ';
            html += 'und <b>' + (post.likes.length - 3) + ' weiteren</b>';
            html += '</div>';
        }
        html += '</a>';
        html += '</div>';

        if (post.comment) {
            html += '<div class="row">';
            html += '<div class="col">';

            html += '<a class="profile-url" href="' + post.user.url + '">' + post.user.username + '</a> ' + parseTag(parseHashTags(post.caption));
            if (post.comments.length > 3) {
                html += '<br><a href="#" class="text-muted"><small>Alle ' + post.comments.length + ' Kommentare ansehen</small></a>';
            }
            html += '</div>';
            html += '</div>';

            if (post.comments.length > 0) {
                html += '<div class="row">';
                html += '<div class="col">';

                $(post.comments).each(function (i, comment) {
                    if (i < 3) {
                        html += '<a class="profile-url" href="' + comment.user.url + '">' + comment.user.username + '</a> ' + parseTag(parseHashTags(comment.comment));
                        if (i < post.comments.length) {
                            html += '<br>';
                        }
                    }
                });

                html += '</div>';
                html += '</div>';
            }

            html += '<a class="text-muted"><small>' + post.date + '</small></a>';
            html += '<hr>';
            html += '<div class="row">';
            html += '<div class="col-10">';
            html += '<textarea class="d-inline-block form-group form-control-sm textarea-comment" placeholder="Kommentar hinzufügen ..." autocomplete="off" autocorrect="off"></textarea>';
            html += '</div>';
            html += '<div class="col-2"><button class="d-inline-block btn" disabled>Posten</button></div>';
            html += '</div>';
        } else {
            html += '<br><a href="#" class="text-muted"><small>Kommentare deaktiviert</small></a><br>';
            html += '<a href="#" class="text-muted"><small>' + post.date + '</small></a><br>';
        }

        html += '</footer>';
        html += '</article>';


        // append
        $('.post-container').append(html);

        // set eventlisteners
        $('.btn-like').on('click', function () {
            if ($(this).hasClass('sprite-like-before')) {
                $(this).addClass('sprite-like-after');
                $(this).removeClass('sprite-like-before');
                return;
            } else {
                console.log(1);
                $(this).removeClass('sprite-like-after');
                $(this).addClass('sprite-like-before');
                return;
            }
        });
        $('.post-image').dblclick(function () {
            $(this).parent().find('.sprite-like-before').addClass('sprite-like-after');
            $(this).parent().find('.sprite-like-before').removeClass('sprite-like-before');
        });
        $('.textarea-comment').keydown(function () {
            if ($(this).val().length > 0) {
                $(this).parent().parent().find('.btn').prop('disabled', false);
            } else {
                $(this).parent().parent().find('.btn').prop('disabled', true);
            }
        });
        $('.textarea-comment').change(function () {
            if ($(this).val().length > 0) {
                $(this).parent().parent().find('.btn').prop('disabled', false);
            } else {
                $(this).parent().parent().find('.btn').prop('disabled', true);
            }
        });
    });
}

function parseHashTags(string) {
    return string.replace(/([#])\w+/g, '<a class="hashtag" href="hashtag/$&">$&</a> ');
}

function parseTag(string) {
    return string.replace(/([@])\w+/g, '<a class="tag" href="accounts/$&">$&</a> ').substring(1);
}