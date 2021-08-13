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

    document.querySelector("div#container").addEventListener("drop", (e) => {
        e.stopPropagation();
        e.preventDefault();
        var file = e.dataTransfer.files[0];
        console.log(file);
        if (file.type.startsWith("text/") || file.type.startsWith("application/")) {
            var type = file.type;
            type = type.split("/");
            if (type[1] == "javascript") {
                monaco.editor.setModelLanguage(editorCodeBlock.getModel(), "javascript");
                document.getElementById("lang").value = 0;
            }
            else if (type[1] == "html") {
                monaco.editor.setModelLanguage(editorCodeBlock.getModel(), "html");
                document.getElementById("lang").value = 1;
            }
            else if (type[1] == "json") {
                monaco.editor.setModelLanguage(editorCodeBlock.getModel(), "json");
                document.getElementById("lang").value = 2;
            }
            else {
                monaco.editor.setModelLanguage(editorCodeBlock.getModel(), "plaintext");
                document.getElementById("lang").value = 3;
            }
            const reader = new FileReader();
            reader.addEventListener('load', (event) => {
                editorCodeBlock.setValue(event.target.result);
            });
            reader.readAsText(file);

            if (editorCodeBlock.getModel().getLanguageIdentifier().language == "javascript" || editorCodeBlock.getModel().getLanguageIdentifier().language == "html") {
                $("#run").removeClass("hide")
            }
            else {
                $("#run").addClass("hide");
            }
            console.log(type[0] + ": " + type[1]);
        });
}