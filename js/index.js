function load() {
    $("svg.fa-play").mousedown(function () {
        execute();
    });
    $("svg.fa-save").mousedown(function () {
        save();
    });
    $("svg.fa-upload").mousedown(function () {
        $("#file").click();
    });

    $('#body').on(
        'drop',
        function (e) {
            if (e.originalEvent.dataTransfer && e.originalEvent.dataTransfer.files.length) {
                e.preventDefault();
                e.stopPropagation();
                console.log(e);
            }
        }
    );
}