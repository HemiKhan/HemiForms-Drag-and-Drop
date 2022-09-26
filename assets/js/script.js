window.onload = function () {

    Formio.builder(document.getElementById('builder'), {}).then(function (builder) {
       
        Formio.createForm(document.getElementById('formio'), builder.form).then(function (instance) {

            builder.on('change', function (schema) {
                if (schema.components) {
                    instance.resetValue();
                    instance.form = schema;
                }
                var json = document.getElementById('json');
                json.innerHTML = '';
                document.getElementById("json").textContent += JSON.stringify(schema, null, 4);
            });
            $(".builder-group-button").click(function () {
                $(this).parent().parent().parent().find(".collapse").toggleClass("show");
                $(this).parent().parent().parent().siblings(".form-builder-panel").find(".collapse").removeClass("show");
            });
        });
    });
};

function showtoaster() {
    new ClipboardJS('#copyjson');
    toastr.success('Success', 'Json Schema Is Copied..!');
}

$("#getform").click(function () {
    $(".builderContainer").hide();
    $(".formContainer").show();
    $(".btnformContainer").hide();
    $(".btnbuilderContainer").removeClass("d-none").addClass("d-block");

    var data = document.getElementById("json").textContent;
    var jsonObj = JSON.parse(data);
    var componentObj = jsonObj.components;
    var componentObj1 = componentObj[0].columns;
    Formio.createForm(document.getElementById('MyForm'), { components: componentObj });
});

$("#getbuilder").click(function () {
    $(".builderContainer").show();
    $(".formContainer").hide();
    $(".btnformContainer").show();
    $(".btnbuilderContainer").removeClass("d-block").addClass("d-none");
});      

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
   element.style.display = 'none';
   document.body.appendChild(element);
   element.click();
   document.body.removeChild(element);
}

document.getElementById("jsonDownload").addEventListener("click", function(){
   var text = document.getElementById("json").textContent;
   var filename = "JsonData.json";
   download(filename, text);
}, false);