(function () {
  const consentKey = 'cookie-consent';
  const config = window.cookieConsentConfig || {};

  const expireDays = config.expireDays || 14;
  const message = config.message || 'このサイトではCookieを使用しています。';
  const buttonText = config.buttonText || '同意する';
  const cssCustom = config.cssCustom || false;

  const consentData = localStorage.getItem(consentKey);
  if (consentData) {
    const saved = new Date(JSON.parse(consentData).date);
    const now = new Date();
    const diffDays = Math.floor((now - saved) / (1000 * 60 * 60 * 24));
    if (diffDays < expireDays) return;
  }

  const banner = document.createElement('div');
  banner.id = 'cookie-banner';

  if (!cssCustom) {
    banner.style.cssText = `
      position: fixed; bottom: 0; left: 0; right: 0; background: #333; color: #fff;
      padding: 1em; display: flex; justify-content: center; align-items: center;
      z-index: 99999; width:100%;
    `;
  }

  banner.innerHTML = `
    <span>${message}</span>
    <button id="accept-cookie" ${cssCustom ? '' : 'style="margin-left:1em;"'}>${buttonText}</button>
  `;

  document.body.appendChild(banner);

  document.getElementById('accept-cookie').addEventListener('click', function () {
    localStorage.setItem(consentKey, JSON.stringify({ accepted: true, date: new Date() }));
    banner.remove();
  });
})();
