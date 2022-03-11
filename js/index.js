var editorsettings = { window: { title: "Editor", file: "untitled", isSaved: false, theme: 0, themes: [vs, vsdark, hcblack] } };

function updateWindow() {
    document.title = editorsettings.window.title + " - " + editorsettings.window.file + (editorsettings.window.isSaved ? "" : "*");
}

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
    
    //Registering snippets for HTML
    monaco.languages.registerCompletionItemProvider('html', {
	    provideCompletionItems: function (model, position) {
		    // find out if we are completing a property in the 'dependencies' object.
		    var textUntilPosition = model.getValueInRange({
			    startLineNumber: 1,
			    startColumn: 1,
			    endLineNumber: position.lineNumber,
			    endColumn: position.column
		    });
		    var word = model.getWordUntilPosition(position);
		    var range = {
			    startLineNumber: position.lineNumber,
			    endLineNumber: position.lineNumber,
			    startColumn: word.startColumn,
			    endColumn: word.endColumn
		    };
		    return {
			    suggestions: [
                    {label: 'h1', kind: monaco.languages.CompletionItemKind.Function, documentation: 'Insert an h1-tag', range: range, insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, insertText: '<h1>${1:}</h1>'},
                    {label: 'h2', kind: monaco.languages.CompletionItemKind.Function, documentation: 'Insert an h2-tag', range: range, insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, insertText: '<h2>${1:}</h2>'},
                    {label: 'h3', kind: monaco.languages.CompletionItemKind.Function, documentation: 'Insert an h3-tag', range: range, insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, insertText: '<h3>${1:}</h3>'},
                    {label: '!', kind: monaco.languages.CompletionItemKind.Function, documentation: 'Insert a basic document<br /><code>&lt;!DOCTYPE html&gt;\n&lt;html lang="en"&gt;\n&lt;head&gt;\n    &lt;meta charset="UTF-8"&gt;\n    &lt;meta http-equiv="X-UA-Compatible" content="IE=edge"&gt;\n    &lt;meta name="viewport" content="width=${1:device-width}, initial-scale=${2:1.0}"&gt;\n    &lt;title&gt;${3:Document}&lt;/title&gt;\n&lt;/head&gt;\n&lt;body&gt;\n    ${4: }\n&lt;/body&gt;\n&lt;/html&gt;</code>', range: range, insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, insertText: '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta http-equiv="X-UA-Compatible" content="IE=edge">\n    <meta name="viewport" content="width=${1:device-width}, initial-scale=${2:1.0}">\n    <title>${3:Document}</title>\n</head>\n<body>\n    ${4: }\n</body>\n</html>'},
                ]
		    };
	    }
    });
}

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
