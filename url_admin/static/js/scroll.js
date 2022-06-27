window.onscroll = function() {
    var body = window.document.body;
    var html = window.document.documentElement;
    var scrollTop = body.scrollTop || html.scrollTop;
    var body_scroll_px_forms = document.getElementsByName("body_scroll_px");
    for (var i = 0; i < body_scroll_px_forms.length; i++) {
    body_scroll_px_forms[i].value = scrollTop;  //name="body_scroll_px"のinputのvalueに自動的にスクロールが何pxか表示されるよう指定
    }
}

$(document).ready(function(){
    var scroll_position = document.getElementById("scroll_position").title;
    window.scrollTo(0,scroll_position);
    });
