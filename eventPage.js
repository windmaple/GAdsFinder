var count = 0;
var NTries = 0;
var done = false;

chrome.tabs.onUpdated.addListener(function(tabId , info) {
  if (info.status == "complete" && NTries != 0) {
    if (count < NTries) {
      chrome.tabs.reload(null, null, null);
      count++;
    }
    else if (!done) {
      alert("Search string NOT found after " + count + " tries! Giving up :(");
      done = true;
      count = 0;
    }
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.foundStr == "yes") {
    alert("Search string found after " + (count+1) + " tries! Stopping refresh!");
    count = NTries;
    done = true;
  }
  if (request.NTries) {
    NTries = request.NTries;
    count = 0;
    done = false;
  }
});
