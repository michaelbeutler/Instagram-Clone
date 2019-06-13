class Post {
    constructor(id, caption, image, user, likes, liked, comments, allowComment, locationObj, date) {
        this.id = id;
        this.caption = caption;
        this.image = image;
        this.user = user;
        this.likes = likes;
        this.liked = liked;
        this.comments = comments;
        this.allowComment = allowComment;
        this.locationObj = locationObj;
        this.date = date;
    }

    get html() {

        var liked = 'sprite-like-before';
        if (this.liked) {
            liked = 'sprite-like-after';
        }

        var html = `
        <article class="post card">
            <header class="post-header">
                <div class="row">
                    <div class="col-md-1 col-2 col-sm-2 align-self-center"><img src="${this.user.avatar}" alt=""
                            class="d-block post-header-avatar rounded-circle"></div>
                    <div class="col-5 align-self-center" style="padding-left: 0px;">
                        <div class="row">
                            <div class="col"><a class="d-block profile-url ml-2" href="${this.user.url}">${this.user.username}</a>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col"><small><a class="d-block location-url ml-2" href="${this.locationObj.url}">${this.locationObj.name}</a></small></div>
                        </div>
                    </div>
                    <div class="col-md-6 col-5 col-sm-5"></div>
                </div>
            </header>
            <img src="${this.image}" alt="" class="post-image" data-id="${this.id}" style="object-fit: cover;" decoding="auto" sizes="614px">
            <footer class="post-footer">
                <div class="row">
                    <div class="col"><span class="d-inline-block btn-like ${liked}" id="likeButton${this.id}" onclick="findPostById(${this.id}).like(${getCurrentUserId()})"></span>
                    <span data-id="${this.id}" class="d-inline-block sprite-comment ml-2"></span></div>
                </div>
                <div class="row" id="likeContainer${this.id}">
                    ${this.getLikeHtml()}
                </div>
                <div class="row">
                    <div class="col"><a class="profile-url" href="${this.user.url}">${this.user.username}</a>
                    ${parseCaption(this.caption)}
                    </div>
                </div>
                <div class="row" id="commentContainer${this.id}">
                    ${this.getCommentHtml()}                
                </div>
                <div class="row">
                    <div class="col">
                        <a class="text-muted"><small>${this.date}</small></a>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-10 col-9">
                            <textarea id="commentInput${this.id}" data-id="${this.id}" class="d-inline-block form-group form-control-sm textarea-comment"
                            placeholder="Kommentar hinzufügen ..." autocomplete="off" autocorrect="off"></textarea>
                    </div>
                    <div class="col-md-2 col-3"><button id="commentButton${this.id}" class="d-inline-block btn" onclick="findPostById(${this.id}).comment(${getCurrentUserId()})" disabled="true">Posten</button></div>
                </div>
            </footer>
        </article>
        <br class="post-seperator">
        `;
        return html;
    }

    getLikeHtml() {
        var like_html = '';
        if (this.likes.length > 0) {
            switch (this.likes.length) {
                case 1:
                    like_html = `
                        <div class="col"><a href="#">Gefällt </a>
                            <a class="profile-url" href="${this.likes[0].user.url}">${this.likes[0].user.username}</a>
                        </div>
                        `
                    break;

                default:
                    if (this.likes.length > 1) {
                        like_html = `
                        <div class="col"><a href="#">Gefällt </a>
                            <a class="profile-url" href="${this.likes[0].user.url}">${this.likes[0].user.username}</a> und
                            <a class="profile-url" href="likes">${(this.likes.length - 1)} weiteren Personen</a>
                        </div>
                        `
                    }
                    break;
            }

        } else if (this.liked) {
            like_html = `
                <div class="col"><a href="#">Gef�llt </a>
                    <a class="profile-url" href="#">dir</a>
                    und keiner anderen Person.
                </div>
            `;
        }
        return like_html;
    }

    getCommentHtml() {
        var comment_html = '';
        if (this.comments.length > 0) {
            switch (this.comments.length) {
                case 1:
                    comment_html = `
                                <div class="col">
                                <a class="profile-url" href="${this.comments[0].user.url}">${this.comments[0].user.username}</a> ${parseCaption(this.comments[0].comment)}
                                <br>
                                </div>
                            `
                    break;

                case 2:
                    comment_html = `
                                <div class="col">
                                <a class="profile-url" href="${this.comments[0].user.url}">${this.comments[0].user.username}</a> ${parseCaption(this.comments[0].comment)}
                                <br>
                                <a class="profile-url" href="${this.comments[1].user.url}">${this.comments[1].user.username}</a> ${parseCaption(this.comments[1].comment)}
                                <br>
                                </div>
                            `
                    break;

                default:
                    if (post.comments.length > 2) {
                        comment_html = `
                            <div class="col">
                            <a class="profile-url" href="${this.comments[0].user.url}">${this.comments[0].user.username}</a> ${parseCaption(this.comments[0].comment)}
                            <br>
                            <a class="profile-url" href="${this.comments[1].user.url}">${this.comments[1].user.username}</a> ${parseCaption(this.comments[1].comment)}
                            <br>
                            <a href="#" class="text-muted"><small>Alle ${this.comments.length} Kommentare ansehen</small></a>
                            </div>
                        `
                    }
                    break;
            }

        }
        return comment_html;
    }

    likeUpdate() {
        var likeContainer = document.getElementById('likeContainer' + this.id);
        likeContainer.innerHTML = this.getLikeHtml();

        var likeButton = document.getElementById('likeButton' + this.id);
        if (this.liked) {
            likeButton.classList.add('sprite-like-after');
            likeButton.classList.remove('sprite-like-before');
        } else {
            likeButton.classList.add('sprite-like-before');
            likeButton.classList.remove('sprite-like-after');
        }
    }

    like(userId) {
        var post = this;
        var user = findUserById(userId);
        if (this.liked) {
            $.ajax({
                url: "unlike/" + post.id,
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                success: function (responseData) {
                    post.likes = post.likes.filter(function (obj) {
                        return obj.user !== user;
                    });
                    post.liked = false;
                    post.likeUpdate();
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.error('Unable to unlike this post: ' + xhr.status + ' ' + thrownError);
                }
            });

        } else {
            $.ajax({
                url: "like/" + post.id,
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                success: function (responseData) {
                    post.likes.unshift(new Like(user, post));
                    post.liked = true;
                    post.likeUpdate();
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.error('Unable to like this post: ' + xhr.status + ' ' + thrownError);
                }
            });
        }
    }

    comment(userId) {
        var post = this;
        var user = findUserById(userId);
        var commentInput = document.getElementById('commentInput' + this.id);
        $.ajax({
            url: "comment/" + post.id,
            type: "POST",
            dataType: "json",
            data: {
                text: commentInput.value
            },
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (responseData) {
                post.comments.unshift(new Comment(user, post, commentInput.value));
                console.log(commentInput.value);
                commentInput.value = '';
                post.commentUpdate();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.error('Unable to comment this post: ' + xhr.status + ' ' + thrownError);
            }
        });
    }

    commentUpdate() {
        var commentContainer = document.getElementById('commentContainer' + this.id);
        commentContainer.innerHTML = this.getCommentHtml();
    }
}

class Like {
    constructor(user, post) {
        this.user = user;
        this.post = post;
    }
}
class Comment {
    constructor(user, post, comment) {
        this.user = user;
        this.post = post;
        this.comment = comment;
    }
}
function parseCaption(string) {
    return parseHashTags(parseTag(string));
}

function parseHashTags(string) {
    return string.replace(/([#])\w+/g, `<a class="hashtag" onclick="openHashtag('$&')">$&</a> `);
}

function parseTag(string) {
    return string.replace(/([@])\w+([a-z]|[0-9]|[.]|[-]|[_])\w+/g, `<a class="tag" onclick="openUserTag('$&')">$&</a> `);
}

function openHashtag(hashtag) {
    if (hashtag.substring(0, 1) == '#') {
        hashtag = hashtag.slice(1);
    }
    window.location.href = 'hashtag/' + slugify(hashtag);
}

function openUserTag(usertag) {
    if (usertag.substring(0, 1) == '@') {
        usertag = usertag.slice(1);
    }
    window.location.href = '/accounts/' + slugify(usertag);
}

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}