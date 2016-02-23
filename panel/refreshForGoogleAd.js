
var found = false;

chrome.devtools.network.onRequestFinished.addListener(function (request) {
  for(var i=0; i<request.response.headers.length; i++) {
//    alert(request.response.headers[i].value);
    if(request.response.headers[i].value.indexOf("client=ca-pub-") != -1 && found == false) {
      alert("found; stopping refreshing");
      found = true;
    }
  }
});

var options = {
  ignoreCache: true,
  userAgent: null,
  injectedScript: null,
  preprocessingScript: null
};

for(var i=0; i<10; i++) {
  if(!found)
    chrome.devtools.inspectedWindow.reload(options);
}

