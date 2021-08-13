var editorsettings = { window: { title: "Editor", file: "untitled", isSaved: false, theme: 0, themes: [vs, vsdark, hcblack] } };

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

    document.getElementById("container").addEventListener("drop", (e) => {
        e.stopPropagation();
        e.preventDefault();
        var file = e.dataTransfer.files[0];
        console.log(file);
        updateWindow();
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
        }
    }, false);

    function handleDragOver(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy';
        $("#container").addClass("dragover");
        $(".dragtext").addClass("dragtext--over");
        $(".dragtext--over").removeClass("dragtext");
    }

    function resetdrag() {
        $("#container").removeClass("dragover");
        $(".dragtext").removeClass("dragtext--over");
        $(".dragtext--over").addClass("dragtext");
    }

    document.getElementById("container").addEventListener('dragover', handleDragOver, false);
    var container = document.getElementById("container");
    container.addEventListener("dragleave", resetdrag);
    container.addEventListener("dragend", resetdrag);
    container.addEventListener("drop", resetdrag);

    function updateWindow() {
        document.title = editorsettings.window.title + " - " + editorsettings.window.file + (editorsettings.window.isSaved ? "" : "*");
    }
}