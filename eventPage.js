var count = 1;
var NTries = 0;
//var done = false;

chrome.tabs.onUpdated.addListener(function(tabId , info) {

  if (info.status == "complete") {
    if (count < NTries) {
      chrome.tabs.reload(null, null, null);
      count++;
      alert(count);
    }
    // else if (!done)
    //   alert("not found");
    //   count = 0;
    //   done = true;
    // }
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.foundAd == "yes") {
    count = NTries;
    alert("Ad found! Stopping refresh!");
  }
  if (request.NTries) {
    NTries = request.NTries;
    count = 0;
    // done = false;
  }
});
