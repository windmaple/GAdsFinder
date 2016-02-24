var found = false;
var searchStr = "";

chrome.devtools.network.onRequestFinished.addListener(function (request) {
  for(var i=0; i<request.response.headers.length; i++) {
    if(request.response.headers[i].value.indexOf(searchStr) != -1 && found == false) {
      found = true;
      chrome.runtime.sendMessage({foundStr: "yes"}, null);
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
