function delete_check(){

   if(window.confirm('本当に削除しますか？')){ // 確認ダイアログを表示
      return true; // 送信を実行

   }
   else{ // 「キャンセル」時の処理

      return false; // 送信を中止

   }

}