document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const fileInput = document.getElementById('fileInput');
    const errorElement = document.getElementById('error');
    
    if (fileInput.files.length === 0) {
        errorElement.textContent = 'Please upload a file.';
        errorElement.classList.remove('hidden');
        return;
    }

    const file = fileInput.files[0];
    if (file.type !== 'text/plain') {
        errorElement.textContent = 'Please upload a valid text file.';
        errorElement.classList.remove('hidden');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const textContent = e.target.result;
        const jsonData = JSON.stringify({ content: textContent }, null, 2);

        // Open a new window with the JSON data
        const newWindow = window.open('', '_blank');
        newWindow.document.write('<html><head><title>JSON Output</title></head><body>');
        newWindow.document.write('<h1>Text File Content in JSON</h1>');
        newWindow.document.write('<pre>' + jsonData + '</pre>');
        newWindow.document.write('</body></html>');
        newWindow.document.close();
    };
    
    reader.readAsText(file);
});