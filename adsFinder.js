var view_counts = 1;
var windowObj;
var pubURL;

chrome.devtools.panels.create(
  'adsFinder',
  null, // No icon path
  'panel/refreshForAd.html',
  function(panel){
    panel.onShown.addListener(function tmp(panel_window){
      panel.onShown.removeListner(tmp);
      windowObj = panel_window;
    });
  }
);



chrome.devtools.network.onRequestFinished.addListener(
  function(entries) {
    if (!pubURL) {
      pubURL = entries.request.url;
    }
    else if(entries.request.url == pubURL){
      view_counts++;
      windowObj.document.getElementById('count').innerHTML = view_counts;
    }
  }
);
