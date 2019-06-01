$(document).ready(function(){
    $('.textarea-comment').keydown(function(){
        if ($(this).val().length > 0) {
            $(this).parent().parent().find('.btn').prop('disabled', false);
        } else {
            $(this).parent().parent().find('.btn').prop('disabled', true);
        }
    });
})