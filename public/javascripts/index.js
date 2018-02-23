(() => {
    const fileInput = document.getElementById('fileInput');
    const fileName = document.getElementById('filename');
    const fileSize = document.getElementById('filesize');
    const uploadBtn = document.getElementById('upload');
    const deleteBtns = document.querySelectorAll('.delete_button');


    const reloadPage = () => document.location.reload(true);

    const sendFileToBackend = (file) => {
        const formData = new FormData();
        formData.append('file', file);
        $.ajax({
            url: 'http://localhost:3000/file',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: reloadPage,
            error: console.error,
        });
    };


    for (let i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].addEventListener('click', function(event) {
            console.log(this.id)
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