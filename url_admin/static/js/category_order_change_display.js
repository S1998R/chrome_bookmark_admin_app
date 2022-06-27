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


function category_order_change_display(){
    document.getElementById('category_order_arrows_wrap').classList.toggle('opacity_z-index');
Ï
    var class_name = document.getElementById('category_order_arrows_wrap').className;

    if (class_name == 'category_order_arrows_wrap opacity_z-index'){

        const csrftoken = getCookie('csrftoken');

        $.ajax({
              url: "http://127.0.0.1:8000/category_order_session_change/",
              type: 'POST',
              headers: {'X-CSRFToken': csrftoken},
              processData: false,
              contentType: false,
            })
            .done((response => {
        }))
        .fail(function( jqXHR, textStatus, errorThrown ) {
        });

        }

}