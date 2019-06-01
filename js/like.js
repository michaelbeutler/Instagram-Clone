$(document).ready(function(){
    $('.sprite-like-before').on('click', function(){
        $(this).toggleClass('sprite-like-after');
    });
    $('.post-image').dblclick(function(){
        $(this).parent().find('.sprite-like-before').addClass('sprite-like-after');
    });
})