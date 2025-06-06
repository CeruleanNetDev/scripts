(function () {
  const consentKey = 'cookie-consent';
  const consentDays = 14; // 保持日数
  const cssCustom = false; // ← trueにするとスタイルを付けない

  const consentData = localStorage.getItem(consentKey);

  if (consentData) {
    const saved = new Date(JSON.parse(consentData).date);
    const now = new Date();
    const diffDays = Math.floor((now - saved) / (1000 * 60 * 60 * 24));
    if (diffDays < consentDays) return;
  }

  // バナー要素作成
  const banner = document.createElement('div');
  banner.id = 'cookie-banner';

  // JSでスタイルを追加（cssCustomがfalseの場合のみ）
  if (!cssCustom) {
    banner.style.cssText = `
      position: fixed; bottom: 0; left: 0; right: 0; background: #333; color: #fff;
      padding: 1em; display: flex; justify-content: center; align-items: center;
      z-index: 1000; width:100%;
    `;
  }

  banner.innerHTML = `
    <span>このサイトではCookieを使用しています。</span>
    <button id="accept-cookie" style="${cssCustom ? '' : 'margin-left:1em;'}">同意する</button>
  `;

  document.body.appendChild(banner);

  document.getElementById('accept-cookie').addEventListener('click', function () {
    localStorage.setItem(consentKey, JSON.stringify({ accepted: true, date: new Date() }));
    banner.remove();
  });
})();
