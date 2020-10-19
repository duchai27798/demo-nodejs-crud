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

                let timeLeft = 60;

                $('#btn-send-verify-token').addClass('disabled-half');
                $('#btn-send-verify-token').text(`${timeLeft}s`);

                const countdown = setInterval(function () {
                    timeLeft--;

                    if (timeLeft < 0) {
                        $('#btn-send-verify-token').text('Send');
                        $('#btn-send-verify-token').removeClass('disabled-half');
                        clearInterval(countdown);
                        return;
                    }

                    $('#btn-send-verify-token').text(`${timeLeft}s`);
                }, 1000)
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
