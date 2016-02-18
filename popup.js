// document.addEventListener('DOMContentLoaded', function () {
//   refreshForAds();
// });
//

chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    if (request.source.indexOf("client=ca-pub-") != -1) {
      alert("Found!")
      console.log(request.source);
    }
  }
});


function refreshForAds(n) {
  var message = document.querySelector('#message');

  for (var i = 0; i < n; i++) {
    alert("running");
    chrome.tabs.reload(null, null,
      function() {
        chrome.tabs.executeScript(null, {
          file: "getPagesSource.js"
        }, function() {
          // If you try and inject into an extensions page or the webstore/NTP you'll get an error
          if (chrome.runtime.lastError) {
            alert("Something is wrong when injecting the page content");
            //message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
          }
        })
      }
    );
  }
}


function onWindowLoad() {
  refreshForAds(3);
}


window.onload = onWindowLoad;
