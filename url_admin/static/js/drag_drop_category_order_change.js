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

function CategoryDragStarted(evt) {
  source = evt.target;
  evt.dataTransfer.setData("text/plain", evt.target.title);
  evt.dataTransfer.effectAllowed = "move";
}

function CategoryDraggingOver(evt) {
  evt.preventDefault();
  evt.dataTransfer.dropEffect = "move";
  evt.target.nextElementSibling.classList.add('dragging_over');
}

function CategoryDropped(evt) {
  evt.preventDefault();
  evt.stopPropagation();

  $(evt.target).after('<div class="category_order_arrow_div" title="' + evt.dataTransfer.getData("text/plain") + '" draggable="true" ondragstart="CategoryDragStarted(event)" ondragover="CategoryDraggingOver(event)" ondrop="CategoryDropped(event)">↑↓</div>')
  source.remove();

  var target = evt.target.parentNode;

  var ele = target.getElementsByClassName("category_order_arrow_div");
  var category_pk_array = [];
  var category_order_array = [];
    for(var i = 0; i < ele.length; i++){
        category_pk = target.getElementsByClassName("category_order_arrow_div")[i].title;
        category_pk_array.push(category_pk);
        category_order_array.push(i);
    }

    fd = new FormData();
    fd.set('category_pk_array', category_pk_array);
    fd.set('category_order_array', category_order_array);
    const csrftoken = getCookie('csrftoken');

    $.ajax({
          url: "http://127.0.0.1:8000/category_display_order/",
          type: 'POST',
          headers: {'X-CSRFToken': csrftoken},
          data: fd,
          processData: false,
          contentType: false,
        })
        .done((response => {
                location.reload();
        }))
        .fail(function( jqXHR, textStatus, errorThrown ) {
        });

}
