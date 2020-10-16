function sendVerifyToken() {
    $.ajax({
        url: '/api/send-verify-token',
        method: 'post',
        headers: {
            'csrf-token': $('meta[name="_csrf"]').attr('content'),
        },
        data: {
            email: $('#input-email-verify').val(),
        },
        success: function (data) {
            if (!_.get(data, 'success')) {
                $('#email-error').text(_.get(data, 'error.email.msg'));
            } else {
                $('#email-error').text('');
            }
        },
    });
}

function verifyHandle() {
    $.ajax({
        url: '/api/verify-email',
        method: 'post',
        headers: {
            'csrf-token': $('meta[name="_csrf"]').attr('content'),
        },
        data: {
            email: $('#input-email-verify').val(),
            code: $('#input-code-token').val(),
        },
        success: function (data) {
            if (!_.get(data, 'success')) {
                $('#email-error').text(_.get(data, 'error.email.msg'));
                $('#code-token-error').text(_.get(data, 'error.code.msg'));
            } else {
                window.location.href = '/';

                $('#email-error').text('');
                $('#code-token-error').text('');
            }
        },
    });
}
