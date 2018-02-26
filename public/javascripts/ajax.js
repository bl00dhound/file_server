const reloadPage = () => document.location.reload(true);

const setCookies = cookies => {
    console.log('Cookies', cookies)
};

const errorLogin = error => {
    console.log('Error', error)
};

const sendFileToBackend = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    $.ajax({
        url: 'http://localhost:3000/files',
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
        url: 'http://localhost:3000/files',
        method: 'DELETE',
        data: { filename },
        success: reloadPage,
        error: console.error,
    });
};

const sendAutorizationForm = (username, password) => {
    $.ajax({
        url: 'http://localhost:3000/login',
        method: 'POST',
        data: { username, password },
        success: setCookies,
        error: errorLogin
    });
};
