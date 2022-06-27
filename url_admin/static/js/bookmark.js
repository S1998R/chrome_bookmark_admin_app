// お気に入りのツリーを全て取得
chrome.bookmarks.getTree(function(bookmark) {

  // [その他のブックマーク]フォルダを取得する
  var root = bookmark[0]['children'];

  // [その他のブックマーク]フォルダのブックマークをbodyに追加する
  root = document.getElementById("bookmark");

  // 取得したツリーのrootが空っぽなので、そのchildrenを渡す
  bookmark = bookmark[0]['children'];

  for (var i in bookmark) {
    if (bookmark[i]['children'] != null && bookmark[i]['children'].length > 0) {
      // 取得したブックマークをよしなにする
    }
  }
  }
  )