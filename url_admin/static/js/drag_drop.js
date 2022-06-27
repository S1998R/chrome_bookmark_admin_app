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

function dragStarted(evt) {
  source = evt.target;
  evt.dataTransfer.setData("text/html", evt.target.innerHTML);
  evt.dataTransfer.effectAllowed = "move";
}

function draggingOver(evt) {
  evt.preventDefault();
  evt.dataTransfer.dropEffect = "move";
}

function dropped(evt) {
  evt.preventDefault();
  evt.stopPropagation();
  node_name = String(evt.target.nodeName);
  if (node_name=='LI') {
    $(evt.target).after('<li class="url_li" draggable="true" ondragstart="dragStarted(event)" ondragover="draggingOver(event)" ondrop="dropped(event)">' +  evt.dataTransfer.getData("text/html") + '</li>')
      source.remove();

    if (evt.target.parentNode == null){
        return
    }


    var page_title = evt.target.nextElementSibling.querySelector('.page_title').innerHTML;
    var url = $(evt.target.nextElementSibling.querySelector('a')).attr('href');
    var category_pk = evt.target.parentNode.previousElementSibling.querySelector('.category_pk').title;

    fd = new FormData();
    fd.set('page_title', page_title);
    fd.set('url', url);
    fd.set('category_pk', category_pk);
    const csrftoken = getCookie('csrftoken');

    $.ajax({
          url: "http://127.0.0.1:8000/category_save/",
          type: 'POST',
          headers: {'X-CSRFToken': csrftoken},
          data: fd,
          processData: false,
          contentType: false,
        })
        .done((response => {
            if (response.category_count) {
             document.getElementById(String(response.category_pk)).parentNode.querySelector('.bookmark_count').innerHTML = response.category_count;
            }

            if (response.previous_category_pk){
             document.getElementById(String(response.previous_category_pk)).parentNode.querySelector('.bookmark_count').innerHTML = response.previous_category_count;
            }

            window.location.reload();

        }))
        .fail(function( jqXHR, textStatus, errorThrown ) {
        });

  }else if(node_name=='A') {
    return;
  }else if(node_name==='DIV'){
    $(evt.target.parentNode.parentNode).after('<li class="url_li" draggable="true" ondragstart="dragStarted(event)" ondragover="draggingOver(event)" ondrop="dropped(event)">' +  evt.dataTransfer.getData("text/html") + '</li>')
    source.remove();

    if (evt.target.parentNode.parentNode.nextElementSibling==null){
        return;
    }

    else if (evt.target.parentNode.parentNode.previousElementSibling==null) {
        // エラーを出さず、受け流すためのelse if
    }

    else if (evt.target.parentNode.parentNode.previousElementSibling.id=='not_category_name'){
        return;  // 未分類内での要素の入れ替え、未分類への追加はreturnして受け付けない
    }

    var page_title = evt.target.parentNode.parentNode.nextElementSibling.querySelector('.page_title').innerHTML;
    var url = $(evt.target.parentNode.parentNode.nextElementSibling.querySelector('a')).attr('href');
    var category_pk = evt.target.parentNode.parentNode.parentNode.previousElementSibling.querySelector('.category_pk').title;
    fd = new FormData();
    fd.set('page_title', page_title);
    fd.set('url', url);
    fd.set('category_pk', category_pk);
    const csrftoken = getCookie('csrftoken');

    $.ajax({
          url: "http://127.0.0.1:8000/category_save/",
          type: 'POST',
          headers: {'X-CSRFToken': csrftoken},
          data: fd,
          processData: false,
          contentType: false,
        })
        .done((response => {

        if (response.category_count) {
             document.getElementById(String(response.category_pk)).parentNode.querySelector('.bookmark_count').innerHTML = response.category_count;
            }

        if (response.previous_category_pk){
             document.getElementById(String(response.previous_category_pk)).parentNode.querySelector('.bookmark_count').innerHTML = response.previous_category_count;
        }

        window.location.reload();

        }))
        .fail(function( jqXHR, textStatus, errorThrown ) {
        });

  }else if(node_name=='IMG'){
    return;
  }else {
    return;
  }

}


function dropped2(evt) {
  evt.preventDefault();
  evt.stopPropagation();
  source.remove();
  $(evt.target).append('<li class="url_li" draggable="true" ondragstart="dragStarted(event)" ondragover="draggingOver(event)" ondrop="dropped(event)">' +  evt.dataTransfer.getData("text/html") + '</li>');
    var page_title = evt.target.lastElementChild.querySelector('.page_title').innerHTML;
    var url = $(evt.target.lastElementChild.querySelector('a')).attr('href');
    var category_pk = evt.target.previousElementSibling.querySelector('.category_pk').title;

    fd = new FormData();
    fd.set('page_title', page_title);
    fd.set('url', url);
    fd.set('category_pk', category_pk);
    const csrftoken = getCookie('csrftoken');

    $.ajax({
          url: "http://127.0.0.1:8000/category_save/",
          type: 'POST',
          headers: {'X-CSRFToken': csrftoken},
          data: fd,
          processData: false,
          contentType: false,
        })
        .done((response => {

        if (response.category_count) {
             document.getElementById(String(response.category_pk)).parentNode.querySelector('.bookmark_count').innerHTML = response.category_count;
        }

        if (response.previous_category_pk){
             document.getElementById(String(response.previous_category_pk)).parentNode.querySelector('.bookmark_count').innerHTML = response.previous_category_count;
        }

        window.location.reload();

        }))
        .fail(function( jqXHR, textStatus, errorThrown ) {
        });
}