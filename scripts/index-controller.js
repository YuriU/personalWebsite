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
        this.uiElements.downloadButton.click(function (e) {
            var button = $(this);
            button.attr("disabled", true);
            
        });
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
    }
};