$.ajax({
    url: `/api/current-user`,
    method: 'get',
    success: function (data) {
        if (_.get(data, 'src_img')) {
            $('#account-avatar').attr('src', _.get(data, 'src_img'));
        }
    },
});
