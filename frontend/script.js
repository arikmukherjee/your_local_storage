document.getElementById('uploadButton').addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file to upload.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.filePath) {
            displayUploadedFile(data.filePath);
        } else {
            alert('File upload failed.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while uploading the file.');
    });
});

function displayUploadedFile(filePath) {
    const fileList = document.getElementById('fileList');
    const fileItem = document.createElement('div');
    fileItem.innerHTML = `<a href="${filePath}" target="_blank">${filePath}</a>`;
    fileList.appendChild(fileItem);
}