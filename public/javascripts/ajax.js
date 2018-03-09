const reloadPage = () => document.location.reload(true);

const setCookies = (data, textStatus, xhr) => {
    console.log('data', data)
    console.log('xhr', xhr)
    console.log('textStatus', textStatus)
    debugger
};

const setAuthHeader = (username, password) =>
    (xhr) => {
        xhr.setRequestHeader('Authorization', `Basic ${btoa(username + ':' + password)}`);
    }

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
        xhrFields: { withCredentials: true },
        beforeSend: setAuthHeader(username, password),
        success: setCookies,
        error: errorLogin
    });
};
