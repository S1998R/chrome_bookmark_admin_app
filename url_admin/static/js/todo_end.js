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

function todo_end(content){
    fd = new FormData();
    fd.set('pk', content.title);
    const csrftoken = getCookie('csrftoken');

    $.ajax({
          url: "http://127.0.0.1:8000/todo_end/",
          type: 'POST',
          data: fd,
          headers: {'X-CSRFToken': csrftoken},
          processData: false,
          contentType: false,
        })
        .done((response => {
                    location.reload();
    }))
    .fail(function( jqXHR, textStatus, errorThrown ) {
    });
}