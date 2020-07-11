window.addEventListener("load", function(ev) {
    var forms = document.getElementsByClassName("needs-validation");
    //
    Array.prototype.filter.call(forms, function(form) {
        form.addEventListener("submit", (event) => {
            if (form.checkValidity() == false) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add("was-validated")
        }, false);
    });
}, false);