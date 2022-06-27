function link_copy(event) {
    let url = event.target.parentNode.previousElementSibling.value;
    let input = document.createElement('input');
    input.value = url;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    input.remove();

    event.target.previousElementSibling.classList.remove('none');
    setTimeout(function(){
        event.target.previousElementSibling.classList.add('none');
    },500);
}

