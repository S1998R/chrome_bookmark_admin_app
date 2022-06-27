// csrf用のトークンを作成
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}



function select_category(){
    category_array = []
    var select = document.getElementById('category_select');
    var opts = select.options;

    var category_name_div_div = document.getElementsByClassName('category_name_div_div');
    // カテゴリを非表示にする
    for (var i=0; i < category_name_div_div.length; i++){
        category_name_div_div[i].classList.add('none');
    }
    // カテゴリを表示する
    for (var i=0; i < opts.length; i++){
        if(opts[i].selected){
            document.getElementById(opts[i].value).classList.remove('none');

            var selected_category_name = opts[i].value;

            category_array.push(selected_category_name)

        }
    }

    fd = new FormData();
    fd.set('category_array', category_array);
    const csrftoken = getCookie('csrftoken');

    $.ajax({
          url: "http://127.0.0.1:8000/category_display/",
          type: 'POST',
          headers: {'X-CSRFToken': csrftoken},
          data: fd,
          processData: false,
          contentType: false,
        })
        .done((response => {

        }))
        .fail(function( jqXHR, textStatus, errorThrown ) {
        });

}