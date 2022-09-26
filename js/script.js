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