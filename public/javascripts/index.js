(() => {
    const fileInput = document.getElementById('fileInput');
    const fileName = document.getElementById('filename');
    const fileSize = document.getElementById('filesize');
    const uploadBtn = document.getElementById('upload');
    const deleteBtns = document.querySelectorAll('.delete_button');
    const removeFileBtns = document.querySelectorAll('[id^="delete------"]');
    const closePopupBtns = document.querySelectorAll('[id^="close------"');

    console.log(removeFileBtns)
    console.log(closePopupBtns)



    const reloadPage = () => document.location.reload(true);
    const showPopup = element => element.classList.add('show');
    const hidePopup = element => element.classList.remove('show');
    const findId = R.compose(R.drop(1), R.split('------'), R.prop('id'));

    const removeFile = element => () => console.log(element);

    const sendFileToBackend = (file) => {
        const formData = new FormData();
        formData.append('file', file);
        $.ajax({
            url: 'http://localhost:3000/file',
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: reloadPage,
            error: console.error,
        });
    };

    const deleteFileFromServer = (filename) => {
        $.ajax({
            url: 'http://localhost:3000/file',
            method: 'DELETE',
            data: { filename },
            processData: false,
            contentType: false,
            success: reloadPage,
            error: console.error,
        });
    };

    for (let i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].addEventListener('click', function() {
            showPopup(this.firstChild);
            setTimeout(() => hidePopup(this.firstChild), 5000)
        })
    }

    for (let i = 0; i < removeFileBtns.length; i++) {
        removeFileBtns[i].addEventListener('click', function () {
            deleteFileFromServer(findId(this));
        })
    }

    fileInput.addEventListener('change', event => {
        const fileObject = R.path(['target', 'files', 0])(event);
        fileName.innerText = fileObject.name;
        fileSize.innerText = `${fileObject.size} bytes`;
    });

    uploadBtn.addEventListener('click', event => {
        if (!fileInput.files[0]) return;
        sendFileToBackend(fileInput.files[0])
    });



})();