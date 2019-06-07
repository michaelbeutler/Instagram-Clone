class Post {
    constructor(id, caption, image, user, likes, liked, comments, comment, location, date) {
        this.id = id;
        this.caption = caption;
        this.image = image;
        this.user = user;
        this.likes = likes;
        this.liked = liked;
        this.comments = comments;
        this.comment = comment;
        this.location = location;
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
                    <div class="col-1 align-self-center"><img src="${this.user.avatar}" alt=""
                            class="d-block post-header-avatar rounded-circle"></div>
                    <div class="col-5 align-self-center" style="padding-left: 0px;">
                        <div class="row">
                            <div class="col"><a class="d-block profile-url ml-2" href="${this.user.url}">${this.user.username}</a>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col"><small><a class="d-block location-url ml-2" href="${this.location.url}">${this.location.name}</a></small></div>
                        </div>
                    </div>
                    <div class="col-6"></div>
                </div>
            </header>
            <img src="${this.image}" alt="" class="post-image">
            <footer class="post-footer">
                <div class="row">
                    <div class="col"><span data-id="${this.id}" class="d-inline-block btn-like ${liked}"></span><span
                            class="d-inline-block sprite-comment ml-2"></span></div>
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
                    <div class="col-10"><textarea class="d-inline-block form-group form-control-sm textarea-comment"
                            placeholder="Kommentar hinzuf�gen ..." autocomplete="off" autocorrect="off"></textarea></div>
                    <div class="col-2"><button class="d-inline-block btn" disabled="">Posten</button></div>
                </div>
            </footer>
        </article>
        <br>
        `;
        return html;
    }

    getLikeHtml() {
        var like_html;
        if (this.likes.length > 0) {
            switch (this.likes.length) {
                case 1:
                    like_html = `
                        <div class="col"><a href="#">Gef�llt </a>
                            <a class="profile-url" href="${this.likes[0].user.url}">${this.likes[0].user.username}</a>
                        </div>
                        `
                    break;

                case 2:
                    like_html = `
                        <div class="col"><a href="#">Gef�llt </a>
                            <a class="profile-url" href="${this.likes[0].user.url}">${this.likes[0].user.username}</a> und 
                            <a class="profile-url" href="${this.likes[1].user.url}">${this.likes[1].user.username}</a>
                        </div>
                        `
                    break;

                default:
                    if (this.likes.length > 2) {
                        like_html = `
                        <div class="col"><a href="#">Gef�llt </a>
                            <a class="profile-url" href="${this.likes[0].user.url}">${this.likes[0].user.username}</a>
                            <a class="profile-url" href="${this.likes[1].user.url}">${this.likes[1].user.username}</a> und 
                            <a class="profile-url" href="likes">${(this.likes.length - 2)}</a> weiteren Personen
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
        var comment_html;
        if (this.comments.length > 0) {
            switch (this.comments.length) {
                case 1:
                    comment_html = `
                                <a class="profile-url" href="${this.comments[0].user.url}">${this.comments[0].user.username}</a> ${parseCaption(this.comments[0].comment)}
                                <br>
                            `
                    break;

                case 2:
                    comment_html = `
                                <a class="profile-url" href="${this.comments[0].user.url}">${this.comments[0].user.username}</a> ${parseCaption(this.comments[0].comment)}
                                <br>
                                <a class="profile-url" href="${this.comments[1].user.url}">${this.comments[1].user.username}</a> ${parseCaption(this.comments[1].comment)}
                                <br>
                            `
                    break;

                case post.comments.length > 2:
                    comment_html = `
                                <a class="profile-url" href="${this.comments[0].user.url}">${this.comments[0].user.username}</a> ${parseCaption(this.comments[0].comment)}
                                <br>
                                <a class="profile-url" href="${this.comments[1].user.url}">${this.comments[1].user.username}</a> ${parseCaption(this.comments[1].comment)}
                                <br>
                                <a class="profile-url" href="${this.comments[2].user.url}">${this.comments[2].user.username}</a> ${parseCaption(this.comments[2].comment)}
                                <br>
                                <a href="#" class="text-muted"><small>Alle ${this.comments.length} Kommentare ansehen</small></a>
                            `
                    break;

                default:
                    break;
            }

        }
        return comment_html;
    }

    likeUpdate() {
        var likeContainer = document.getElementById('likeContainer' + this.id);
        likeContainer.innerHTML = this.getLikeHtml();
    }

    like() {
        if (this.liked) {
            // remove like
            this.likes = this.likes.filter(function(el) { return el.user != u1; });
            this.liked = false;
        } else {
            this.likes.push(new Like(u1, this));
            this.liked = true;
        }
        
        this.likeUpdate();
    }

    commentUpdate() {
        var commentContainer = document.getElementById('commentContainer' + this.id);
        commentContainer.innerHTML = this.getCommentHtml();
    }
}
class User {
    constructor(id, username, avatar, url) {
        this.id = id;
        this.username = username;
        this.avatar = avatar;
        this.url = url;
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
class Location {
    constructor(name, url) {
        this.name = name;
        this.url = url;
    }
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