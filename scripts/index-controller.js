var indexController = {
    data: {
        config:null
    },
    uiElements: {
        downloadButton: null,
        spinner: null
    },
    init: function(config) {
        this.data.config = config;
        this.uiElements.downloadButton = $('#btn-download-resume');

        this.wireupEvents();
    },
    getContentDispositionFileName: function(disposition, defaultFileName) {
        var filename = defaultFileName;
        if(disposition && disposition.indexOf('attachment') !== -1) {
            var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            var matches = filenameRegex.exec(disposition);
            if (matches != null && matches[1]) { 
              filename = matches[1].replace(/['"]/g, '');
            }
        }
        return filename;
    },
    wireupEvents: function(){

        var that = this;

        this.uiElements.downloadButton.click(function (e) {
            var button = $(this);
            button.attr("disabled", true);
            document.body.style.cursor = 'wait';

            var requestUrl = that.data.config.apiBaseUrl + '?cmd=requestDownload';

            $.ajax({
                url: requestUrl,
                type: 'POST',
                data: null,
                xhr:function() {
                    var xhr = new XMLHttpRequest();
                    xhr.responseType= 'blob'
                    return xhr;
                },
            }).done(function (response, status, xhr) {
                
                console.log(status);

                var contentType = xhr.getResponseHeader('Content-Type');
                var contentDisposition = xhr.getResponseHeader('Content-Disposition');

                var fileName = that.getContentDispositionFileName(contentDisposition, 'Resume.doc');

                var blob = new Blob([response], { type: contentType });
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = fileName;

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                document.body.style.cursor = 'default';
                button.attr("disabled", false);

            }).fail(function (response) {
                
                button.attr("disabled", false);
                document.body.style.cursor = 'default';
            })
        });
    }
};