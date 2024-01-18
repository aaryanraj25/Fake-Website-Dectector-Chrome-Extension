// background.js

chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
    // Only run safety checks on main frame navigation, not iframes
    if (details.frameId === 0) {
      checkSiteSafety(details.url, details.tabId);
    }
  });
  
  function checkSiteSafety(url, tabId) {
    const params = 'url=' + encodeURIComponent(url);
    
    fetch('http://localhost:8000', {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      body: params
    })
    .then(response => response.text())
    .then(responseText => {
      if (responseText === 'SAFE') {
        console.log('Site is safe:', url);
        // Optionally, you can communicate with the popup to display the result
      } else {
        console.log('Site may not be safe:', url);
        chrome.tabs.executeScript(tabId, {
          code: `alert("This site may not be safe: ${url}");`
        });
      }
    })
    .catch(error => {
      console.error('Error checking site safety:', error);
      // Handle the error. Perhaps display an error message in your popup.
    });
  }
  
  // If you need to communicate with the popup, you would set up message passing here.
  