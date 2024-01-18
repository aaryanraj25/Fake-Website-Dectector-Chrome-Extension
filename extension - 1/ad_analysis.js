document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('analyzeAdButton').addEventListener('click', analyzeAdContent);
});

function analyzeAdContent() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "start_ad_analysis", "url": activeTab.url});
    });
}
