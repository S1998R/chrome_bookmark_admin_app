function bookmark_delete_check(){

   if(window.confirm('このブックマークを本当に削除しますか？')){ // 確認ダイアログを表示
      return true; // 送信を実行

   }
   else{ // 「キャンセル」時の処理

      return false; // 送信を中止

   }

}