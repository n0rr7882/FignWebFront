function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = (e) => {
            $('#upload-image').css('background-image', `url('${e.target.result}')`);
        };
        reader.readAsDataURL(input.files[0]);
    }
}
