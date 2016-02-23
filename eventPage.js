var count = 0;

//TODO: bug
// When reloading the extension, it auto refreshes the extension page
chrome.tabs.onUpdated.addListener(function(tabId , info) {
  if (info.status == "complete") {
    if (count < 3) {
      chrome.tabs.reload(null, null, null);
      count++;
    }
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  alert("Ad found! Stopping refresh!");
  if (request.foundAd == "yes") count = 10;
});
