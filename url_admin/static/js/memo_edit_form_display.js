function memo_edit_form_display(event){
    id = event.target.parentNode.title;
    form_id = id + '_form';
    document.getElementById(form_id).classList.toggle('none');
}