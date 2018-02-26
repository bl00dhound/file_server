(() => {
    const fileInput = document.getElementById('fileInput');
    const fileName = document.getElementById('filename');
    const fileSize = document.getElementById('filesize');
    const uploadBtn = document.getElementById('upload');
    const deleteBtns = document.querySelectorAll('.delete_button');
    const removeFileBtns = document.querySelectorAll('[id^="delete------"]');
    const closePopupBtns = document.querySelectorAll('[id^="close------"]');

    const showPopup = element => element.classList.add('show');
    const hidePopup = element => element.classList.remove('show');
    const findId = R.compose(R.head, R.drop(1), R.split('------'), R.prop('id'));

    for (let i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].addEventListener('click', function(event) {
            showPopup(this.firstChild);
            setTimeout(() => hidePopup(this.firstChild), 5000);
            event.stopPropagation();
        })
    }

    for (let i = 0; i < closePopupBtns.length; i++) {
        closePopupBtns[i].addEventListener('click', function(event) {
            const parent = document.getElementById(findId(this));
            hidePopup(parent.firstChild);
            event.stopPropagation();
        })
    }

    for (let i = 0; i < removeFileBtns.length; i++) {
        removeFileBtns[i].addEventListener('click', function (event) {
            deleteFileFromServer(findId(this));
            event.stopPropagation();
        })
    }

    fileInput.addEventListener('change', event => {
        const fileObject = R.path(['target', 'files', 0])(event);
        fileName.innerText = fileObject.name;
        fileSize.innerText = `${fileObject.size} bytes`;
    });

    uploadBtn.addEventListener('click', () => {
        if (!fileInput.files[0]) return;
        sendFileToBackend(fileInput.files[0])
    });

})();