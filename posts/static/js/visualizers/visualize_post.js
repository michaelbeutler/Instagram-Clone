var postContainer = document.getElementById('post-container');

function constructPosts(json) {
    $(json.data.posts).each(function (i, post) {
        console.log(post);
        constructPost(post);
        $('.post-image').dblclick(function () {
            $(this).parent().find('.sprite-like-before').addClass('sprite-like-after');
            $(this).parent().find('.sprite-like-before').removeClass('sprite-like-before');
            like($(this).parent().find('.sprite-like-after').data('id'), function () { });
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

function constructPost(post) {
    console.log(post);
    function constructLike(post) {
        html = '';
        if (post.likes.length > 0) {
            switch (post.likes.length) {
                case 1:
                    html = `
                        <div class="col"><a href="#">Gefällt </a>
                            <a class="profile-url" href="${post.likes[0].user.url}">${post.likes[0].user.username}</a>
                        </div>
                        `
                    break;

                case 2:
                    html = `
                        <div class="col"><a href="#">Gefällt </a>
                            <a class="profile-url" href="${post.likes[0].user.url}">${post.likes[0].user.username}</a> und 
                            <a class="profile-url" href="${post.likes[1].user.url}">${post.likes[1].user.username}</a>
                        </div>
                        `
                    break;

                case post.likes.length > 2:
                    html = `
                        <div class="col"><a href="#">Gefällt </a>
                            <a class="profile-url" href="${post.likes[0].user.url}">${post.likes[0].user.username}</a> und 
                            <a class="profile-url" href="likes">${(post.likes.length - 2)}</a> weiteren Personen
                        </div>
                        `
                    break;

                default:
                    break;
            }

        } else if (post.liked) {
            html = `
                <div class="col"><a href="#">Gefällt </a>
                    <a class="profile-url" href="#">dir</a>
                    und keiner anderen Person.
                </div>
            `;
        }
        return html;
    }

    function constructComment(post) {
        html = '';
        if (post.comments.length > 0) {
            switch (post.comments.length) {
                case 1:
                    html = `
                            <a class="profile-url" href="${post.comments[0].user.url}">${post.comments[0].user.username}</a> ${parseCaption(post.comments[0].comment)}
                            <br>
                        `
                    break;

                case 2:
                    html = `
                            <a class="profile-url" href="${post.comments[0].user.url}">${post.comments[0].user.username}</a> ${parseCaption(post.comments[0].comment)}
                            <br>
                            <a class="profile-url" href="${post.comments[1].user.url}">${post.comments[1].user.username}</a> ${parseCaption(post.comments[1].comment)}
                            <br>
                        `
                    break;

                case post.comments.length > 2:
                    html = `
                            <a class="profile-url" href="${post.comments[0].user.url}">${post.comments[0].user.username}</a> ${parseCaption(post.comments[0].comment)}
                            <br>
                            <a class="profile-url" href="${post.comments[1].user.url}">${post.comments[1].user.username}</a> ${parseCaption(post.comments[1].comment)}
                            <br>
                            <a class="profile-url" href="${post.comments[2].user.url}">${post.comments[2].user.username}</a> ${parseCaption(post.comments[2].comment)}
                            <br>
                            <a href="#" class="text-muted"><small>Alle ${post.comments.length} Kommentare ansehen</small></a>
                        `
                    break;

                default:
                    break;
            }

        }
        return html;
    }

    var liked = 'sprite-like-before';
    if (post.liked) {
        liked = 'sprite-like-after';
    }

    postContainer.innerHTML += `
    <article class="post card">
        <header class="post-header">
            <div class="row">
                <div class="col-1 align-self-center"><img src="${post.user.avatar}" alt=""
                        class="d-block post-header-avatar rounded-circle"></div>
                <div class="col-5 align-self-center" style="padding-left: 0px;">
                    <div class="row">
                        <div class="col"><a class="d-block profile-url ml-2" href="${post.user.url}">${post.user.username}</a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col"><small><a class="d-block location-url ml-2" href="${post.location.url}">${post.location.name}</a></small></div>
                    </div>
                </div>
                <div class="col-6"></div>
            </div>
        </header>
        <img src="${post.image}" alt="" class="post-image">
        <footer class="post-footer">
            <div class="row">
                <div class="col"><span data-id="${post.id}" class="d-inline-block btn-like ${liked}"></span><span
                        class="d-inline-block sprite-comment ml-2"></span></div>
            </div>
            <div class="row">
                ${constructLike(post)}
            </div>
            <div class="row">
                <div class="col"><a class="profile-url" href="${post.user.url}">${post.user.username}</a>
                ${parseCaption(post.caption)}
                </div>
            </div>
            <div class="row">
                <div class="col">
                ${constructComment(post)}
                <a class="text-muted"><small>${post.date}</small></a>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-10"><textarea class="d-inline-block form-group form-control-sm textarea-comment"
                        placeholder="Kommentar hinzufügen ..." autocomplete="off" autocorrect="off"></textarea></div>
                <div class="col-2"><button class="d-inline-block btn" disabled="">Posten</button></div>
            </div>
        </footer>
    </article>
    <br>
    `;
    // set eventlisteners
    $('.btn-like').on('click', function () {
        if ($(this).hasClass('sprite-like-before')) {
            $(this).addClass('sprite-like-after');
            $(this).removeClass('sprite-like-before');
            like($(this).data('id'), function () { location.reload(false); });
            return;
        } else {
            console.log($(this).data('id'));
            $(this).removeClass('sprite-like-after');
            $(this).addClass('sprite-like-before');
            unlike($(this).data('id'), function () { location.reload(false); });
            return;
        }
    });
}

function parseCaption(string) {
    return parseHashTags(parseTag(string));
}

function parseHashTags(string) {
    return string.replace(/([#])\w+/g, '<a class="hashtag" href="hashtag/$&">$&</a> ');
}

function parseTag(string) {
    return string.replace(/([@])\w+([a-z]|[0-9]|[.]|[-]|[_])\w+/g, '<a class="tag" href="accounts/$&">$&</a> ');
}