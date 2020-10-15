$('#user-editor-dialog').on('show.bs.modal', function (e) {
    /* get data id */
    const id = $(e.relatedTarget).attr('data-id');

    /* clear data on form */
    $('#name-error').text('');
    $('#email-error').text('');
    imageFile = null
    $('#preview-img').empty();

    /* if id is existed then load data into form */
    if (id) {
        $('#user-editor-dialog-label').html('Update User');

        $.ajax({
            url: `/api/users/${id}`,
            method: 'get',
            data: {
                _csrf: $('meta[name="_csrf"]').attr('content'),
            },
            success: function (data) {
                /* load data into input */
                $('#input-name').val(data['full_name']);
                $('#input-email').val(data['email']);
                $('#input-id').val(data['_id']);
                $('#input-src-img').val(data['src_img'].split('/').pop());

                /* disable email input when open dialog for update data */
                $('#input-email').addClass('disabled-half');
            },
        });
    } else {
        /* reset form when open dialog for create new */
        $('#user-editor-dialog-label').html('Create User');
        $('#input-name').val('');
        $('#input-email').val('');
        $('#input-id').val('');
        $('#input-src-img').val('');
        $('#input-email').removeClass('disabled-half');
    }
});

/* submit user data */
$('#user-editor-form').submit((e) => {
    e.preventDefault();

    const formData = {};

    /* get data from form */
    $.each($('#user-editor-form').serializeArray(), function (i, field) {
        formData[field.name] = field.value;
    });

    if (imageFile) {
        const imageData = new FormData();
        const imageF = new File([imageFile], formData.src_img || 'new', { type: imageFile.type });
        imageData.append('image', imageF);

        console.log(imageF);

        $.ajax({
            url: '/api/files/upload',
            method: 'post',
            data: imageData,
            processData: false,
            contentType: false,
            headers: {
                'csrf-token': $('meta[name="_csrf"]').attr('content'),
            },
            success: function (data) {
                formData['src_img'] = data['filename'];
                uploadInfo(formData);
            },
            error: function (err) {
                console.log(err);
            }
        });
    } else {
        uploadInfo(formData);
    }
});

function uploadInfo(formData) {
    let action = 'update';

    /* remove _id when create because it is null */
    if (!formData['_id']) {
        action = 'create';
        delete formData._id;
    }

    /* call ajax save data */
    $.ajax({
        url: `/api/users/${action}`,
        method: 'post',
        data: formData,
        headers: {
            'csrf-token': $('meta[name="_csrf"]').attr('content'),
        },
        success: function (data) {
            if (data['success']) {
                /* reload and close user editor dialog */
                loadData(limit, currentPage);
                $('#user-editor-dialog').modal('hide');
            } else {
                /* show error validation */
                $('#name-error').text(data['error']['full_name']['msg'] || '');
                $('#email-error').text(data['error']['email']['msg'] || '');
            }
        },
    });
}