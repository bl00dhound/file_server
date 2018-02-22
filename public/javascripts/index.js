(() => {
    const fileInput = document.getElementById('fileInput');
    const fileName = document.getElementById('filename');
    const fileSize = document.getElementById('filesize');
    const uploadBtn = document.getElementById('upload');

    console.log($.find('#fileInput'));

    const sendFileToBackend = (file) => {
        const formData = new FormData();
        formData.append('file', file);
        $.ajax({
            url: 'http://localhost:3000/file',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: data => {
                console.log(data, 'success');
            },
            error: err => {
                console.error(err)
            }
        });
    };


    fileInput.addEventListener('change', event => {
        const fileObject = R.path(['target', 'files', 0])(event);
        fileName.innerText = fileObject.name;
        fileSize.innerText = `${fileObject.size} bytes`;
    })

    uploadBtn.addEventListener('click', event => {
        console.log(fileInput.files[0]);
        sendFileToBackend(fileInput.files[0])
    })



})();