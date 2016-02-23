chrome.devtools.network.onRequestFinished.addListener(function (request) {
  for(var i=0; i<request.response.headers.length; i++) {
    //    alert(request.response.headers[i].value);
    if(request.response.headers[i].value.indexOf(searchStr) != -1 && found == false) {
      //alert("found; stopping refreshing");
      //alert(request.response.headers[i].value.indexOf(searchStr));
      found = true;
      chrome.runtime.sendMessage({foundAd: "yes"}, null);
    }
  }
});

var options = {
  ignoreCache: true,
  userAgent: null,
  injectedScript: null,
  preprocessingScript: null
};

function initRefresh() {
  found = false;
  searchStr = "";
  var x = document.getElementById('simpleForm');
  searchStr = x[0].value;
  chrome.runtime.sendMessage({NTries: Number(x[1].value)});
  chrome.devtools.inspectedWindow.reload(options);
}

// This is very weird code (found in chrome-preprocess).
// Somehow straight 'onClick' of button doesn't work.
function listen() {
  var startButton = document.getElementById('simpleButton');
  startButton.addEventListener('click', initRefresh);
}

window.addEventListener('load', listen);
