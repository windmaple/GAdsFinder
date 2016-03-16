var found = false;
var searchStr = "";
var options = {
  ignoreCache: true,
  userAgent: null,
  injectedScript: null,
  preprocessingScript: null
};

chrome.devtools.network.onRequestFinished.addListener(function (request) {
  if(request.request.url.indexOf("google") != -1 &&
      (request.response.status == "400" || request.response.status == "408")) {
    chrome.devtools.inspectedWindow.reload(options);
  }
  else {
    // Sellside
    for(var i=0; i<request.response.headers.length; i++) {
      if(searchStr && request.response.headers[i].value.indexOf(searchStr) != -1 && found == false) {
        found = true;
        chrome.runtime.sendMessage({foundStr: "yes"}, null);
        break;
      }
    }

    // // Buyside: for DBM ads and 3rd party DSPs
    // if(searchStr && found == false && request.request.url.indexOf("adclick.g.doubleclick.net") != -1) {
    //   // TODO: We need to make sure there is a valid response
    //   //if(request.response.headers[j].value.indexOf("ca-pub-") != -1)
    //   clickMagicURL = 'https://clickmagic.corp.google.com/jsapi?url=' + request.request.url.match("adclick\.g\.doubleclick\.net.*$");
    //   //clickURL = "http://adclick.g.doubleclick.net/aclk%3Fsa%3DL%26ai%3DCd3b3Yg3kVsebJcG18AXVj4a4CrCkhOwGyN_Rk_oBwI23ARABIABgndHUgbAFggEXY2EtcHViLTQzNzI0MzgyMjE5MDIyMDiIAQHIAQmpAvLvZiMFqoQ-qAMBqgRHT9DDGjEMyKlYDSxe_vzvuxctDUQjsuVMEf5Il1WzcjbwOVr0r-C0DsDfNhK5AVQqywOcK4B5XRq1NmMPRATvBYZ6dGnaGS2ABozQ05fciMbysAGgBiHYBwA%26num%3D1%26sig%3DAOD64_0ZDFwBZmscAQzOOsY20eizT-4oNw%26client%3Dca-pub-4372438221902208%26adurl%3Dhttp%3A%2F%2Fad.agrantsem.com%2FAdServer%2FTt%3Fcus%3D14968%26eid%3D1%26src%3DADX%26mid%3D14968_0fbf540bbd7c0c27%26site%3Dwww.anonymouswebsite.com%26width%3D300%26height%3D250%26vs%3D1%26bkid%3D3796019115%26region%3D2000%26bt%3DA%26svs%3D%26tp%3D3%26dt%3DD%26isapp%3D0%26pf%3DM%26reqid%3D1603122036503347541DBF13DD9E8CBF%26p%3D14968-1-fa15e57cdc71e6d561b3f6f74c4931b1%26d%3Dhttp%253a%252f%252fwww.chinag2p.com%252f%253fag_mid%253d14968-1-fa15e57cdc71e6d561b3f6f74c4931b1";
    //   var clickMagicRequest = new XMLHttpRequest();
    //   clickMagicRequest.open('GET', clickMagicURL, false);
    //   alert(clickMagicURL);
    //   clickMagicRequest.send(null);
    //   alert(clickMagicRequest.responseText);
    //   responseTextinJSON = clickMagicRequest.responseText.replace(/^\)\]\}\'/i,"");
    //   var clickMagicResponse = JSON.parse(responseTextinJSON);
    //   alert(clickMagicResponse.decoded_query[0].advertiser_info.customer_id) ;
    //   if(clickMagicResponse.decoded_query[0].advertiser_info.customer_id = searchStr) {
    //      found = true;
    //      chrome.runtime.sendMessage({foundStr: "yes"}, null);
    //   }
    // }


    // Buyside: for Adwords ads
    // Adwords is very hard; clickstring seems to come out of nowhere

  }
});


function initRefresh() {
  var searchStrForm = document.getElementById('searchStrForm');
  searchStr = searchStrForm[0].value;
  if(Number(searchStrForm[1].value)>=1 && Number(searchStrForm[1].value) <= 1000) {
    chrome.runtime.sendMessage({NTries: Number(searchStrForm[1].value), tabId: chrome.devtools.inspectedWindow.tabId});
    chrome.devtools.inspectedWindow.reload(options);
  }
  else alert('Please input a number between 1 and 1000!')

  //document.getElementById('count').innerHTML = 1;
}

// This is very weird code (found in chrome-preprocess).
// Somehow straight 'onClick' of button doesn't work.
function listen() {
  var startButton = document.getElementById('startButton');
  startButton.addEventListener('click', initRefresh);
}

window.addEventListener('load', listen);
