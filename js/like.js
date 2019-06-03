$(document).ready(function () {
    $('.btn-like').on('click', function () {
        if ($(this).hasClass('sprite-like-before')) {
            $(this).addClass('sprite-like-after');
            $(this).removeClass('sprite-like-before');
        } else {
            $(this).addClass('sprite-like-before');
            $(this).removeClass('sprite-like-after');
        }
    });
    $('.post-image').dblclick(function () {
        $(this).parent().find('.sprite-like-before').addClass('sprite-like-after');
        $(this).parent().find('.sprite-like-before').removeClass('sprite-like-before');
    });
    function like(id) {
        $.ajax({
            url: "json/post.json",
            type: "GET",
            dataType: "json",
            contentType: "application/json",
            success: function (responseData) {
                callback(responseData);
            }
        });
    }
    function unlike(id) {
        $.ajax({
            url: "json/post.json",
            type: "GET",
            dataType: "json",
            contentType: "application/json",
            success: function (responseData) {
                callback(responseData);
            }
        });
    }
})