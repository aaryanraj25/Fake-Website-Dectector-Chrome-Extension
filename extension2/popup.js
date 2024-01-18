function transfer() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tab = tabs[0];
    const original_url = tab.url;
    $('#site').text(original_url);

    const xhr = new XMLHttpRequest();
    const markup = `url=${encodeURIComponent(original_url)}&html=${encodeURIComponent(document.documentElement.innerHTML)}`;
    xhr.open('POST', 'http://localhost:8000', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = () => {
      const responseDiv = xhr.responseText === 'SAFE' ? '#div1' : '#div2';
      $(responseDiv).text(xhr.responseText);
    };
    xhr.onerror = () => {
      // Handle network errors
      console.error('Network error');
    };
    xhr.send(markup);
  });
}

$(document).ready(function () {
  $('button').click(function () {
    transfer();
  });
});

// Function to handle customer care number verification
