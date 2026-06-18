window.addEventListener('message', (event) => {
  if (event.source !== window) return;
  if (!event.data || event.data.action !== 'OPEN_SHIPPING_URL') return;

  const bookingNo = typeof event.data.bookingNo === 'string' ? event.data.bookingNo.trim() : '';

  if (!bookingNo) return;

  function showBanner(message, color) {
    const existing = document.getElementById('__st_banner__');
    if (existing) existing.remove();
    const b = document.createElement('div');
    b.id = '__st_banner__';
    b.style.cssText = [
      'position:fixed', 'top:0', 'left:0', 'right:0', 'z-index:2147483647',
      'background:' + color, 'color:#fff', 'font:600 13px/1 sans-serif',
      'padding:10px 16px', 'text-align:center', 'letter-spacing:.3px',
      'box-shadow:0 2px 8px rgba(0,0,0,.25)', 'cursor:pointer'
    ].join(';');
    b.textContent = message + '  ✕';
    b.onclick = () => b.remove();
    document.body.appendChild(b);
    setTimeout(() => b?.remove(), 6000);
  }

  function sendToBackground(retryCount) {
    try {
      chrome.runtime.sendMessage({ action: 'OPEN_SHIPPING_URL', bookingNo }, (response) => {
        if (chrome.runtime.lastError) {
          if (retryCount > 0) {
            setTimeout(() => sendToBackground(retryCount - 1), 300);
          } else {
            showBanner('⚠️ Shipping Tracker: could not reach extension. Reload the extension and refresh this page.', '#b45309');
          }
          return;
        }
        if (response?.success) {
          console.log('[ShippingTracker] Opened tab:', response.tabId);
        } else {
          console.warn('[ShippingTracker] Error:', response?.error);
        }
      });
    } catch {
      // Extension was reloaded while this page was open — auto-reload to reconnect
      showBanner('🔄 Extension was reloaded. Refreshing page to reconnect...', '#dc2626');
      setTimeout(() => window.location.reload(), 1500);
    }
  }

  sendToBackground(2);
});

console.log('[ShippingTracker] Content script ready.');
