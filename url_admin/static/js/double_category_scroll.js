// 簡単な実装（同じ大きさのエレメントにしか利用できない）
// エレメントを取得
const s1 = document.getElementById("category_order_arrows_wrap");
const s2 = document.getElementById("category_select");
// エレメントがスクロールされたときの関数。
category_order_arrows_wrap.addEventListener("scroll", () => {
  category_select.scrollTop = category_order_arrows_wrap.scrollTop;
});

category_select.addEventListener("scroll", () => {
  category_order_arrows_wrap.scrollTop = category_select.scrollTop;
});