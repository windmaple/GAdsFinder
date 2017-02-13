var count = 0;
var NTries = 0;
var workingTabId = -1000;  // ramdom tab ID
var done = false;

chrome.tabs.onUpdated.addListener(function(tabId , info) {
  // TODO: timeout request will not be 'complete', thus causing stallling
  setTimeout(function() {
    if (workingTabId == tabId && info.status == "complete" && NTries != 0) {
      if (count < NTries) {
        chrome.tabs.reload(workingTabId, null, null);
        count++;
      }
      else if (!done) {
        alert("Search string NOT found after " + (count+1) + " tries! Giving up :(");
        done = true;
        count = 0;
      }
    }
  }, 2000);
});

// TODO: no idea why this doesn't work; worth exploring some other day
//
// chrome.webNavigation.onErrorOccurred.addListener(function(details) {
//   chrome.tabs.reload(workingTabId, null, null);
// });

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.foundStr == "yes") {
    alert("Search string found after " + (count+1) + " tries! Stopping refresh!");
    count = NTries;
    done = true;
  }
  if (request.NTries && request.tabId) {
    NTries = request.NTries-1;      // -1 due to initRefresh()
    workingTabId = request.tabId;
    count = 0;
    done = false;
  }
  if (request.stop) {
    alert('Reset!');
    count = NTries;
    done = true;
  }
});
