function load() {
    $("svg.fa-play").mousedown(function () {
        execute();
    });
    $("svg.fa-save").mousedown(function () {
        save();
    });
    $("svg.fa-upload").mousedown(function () {
        document.getElementById("#file").click();
    });
}