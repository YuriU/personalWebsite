downloadResume = function() {
    var client = new XMLHttpRequest();
    client.open('POST', 'https://api.yuriiulianets.dev/webSiteBackend/?cmd=requestDownload', true);
    client.responseType = 'blob';

    client.onload = function() {
        if(client.status === 200) {
            var contentType = client.getResponseHeader('Content-Type');
            var contentDisposition = client.getResponseHeader('Content-Disposition');
            var fileName = getContentDispositionFileName(contentDisposition);

            var blob = new Blob([client.response], { type: contentType });
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    client.send('');
}

getContentDispositionFileName = function(disposition) {
    var filename = 'Resume.doc';
    if(disposition && disposition.indexOf('attachment') !== -1) {
        var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        var matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1]) { 
          filename = matches[1].replace(/['"]/g, '');
        }
    }
    return filename;
}