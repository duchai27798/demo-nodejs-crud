const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
let imageFile = null;

/* After select files then validate file */
$('#input-file').change(function (e) {
    if (_.get(e, 'target.files')) {
        const fileImg = _.first(_.get(e, 'target.files'));

        if (_.get(fileImg, 'size') > 1024 * 1024) {
            alert("File can't greater than 1Mb");
            return false;
        }

        if (!validImageTypes.includes(_.get(fileImg, 'type'))) {
            alert('Only Upload Image file');
            return false;
        }

        imageFile = fileImg;
        renderPreview(fileImg);
    }
});

function renderPreview(file) {
    const previewImg = $('#preview-img');
    previewImg.empty();

    const container = document.createElement('div');
    const btnRemove = document.createElement('div');
    const icon = document.createElement('i');
    const img = document.createElement('img');

    container.classList = 'preview-img-item mt-3';
    btnRemove.classList = 'btn-remove';
    icon.classList = 'far fa-trash-alt size-36 text-danger';

    btnRemove.onclick = () => removeItemImgPreview(file['filename']);

    const reader = new FileReader();

    reader.onload = function (e) {
        img.src = e.target.result;
        img.classList = 'w-100';
    };

    reader.readAsDataURL(file);

    container.append(img);
    btnRemove.append(icon);
    container.append(btnRemove);
    previewImg.append(container);
}

function removeItemImgPreview(filename) {
    // fileList = _.filter(fileList, (file) => file['filename'] !== filename);
    // renderPreview(fileList);
}
