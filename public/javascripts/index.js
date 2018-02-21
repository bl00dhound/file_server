(() => {
    const fileInput = document.getElementById('file');
    const fileName = document.getElementById('filename');
    const fileSize = document.getElementById('filesize');



    fileInput.addEventListener('change', event => {
        const fileObject = R.path(['target', 'files', 0])(event);
        fileName.innerText = fileObject.name;
        fileSize.innerText = `${fileObject.size} bytes`;
    })


})();