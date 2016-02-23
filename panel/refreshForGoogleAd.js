
var found = false;

chrome.devtools.network.onRequestFinished.addListener(function (request) {
  for(var i=0; i<request.response.headers.length; i++) {
//    alert(request.response.headers[i].value);
    if(request.response.headers[i].value.indexOf("client=ca-pub-") != -1 && found == false) {
      //alert("found; stopping refreshing");
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

chrome.devtools.inspectedWindow.reload(options);
