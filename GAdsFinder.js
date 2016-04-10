var view_counts = 1;
var windowObj;
var pubURL;

chrome.devtools.panels.create(
  'adsFinder',
  null, // No icon path
  'panel/refreshForAd.html',
  function(panel){
    panel.onShown.addListener(function tmp(panel_window){
      windowObj = panel_window;
    });
  }
);


chrome.devtools.network.onNavigated.addListener(
  function(entries) {
    if (windowObj.document.getElementById('count').innerHTML == 0) {
      view_counts = 2;
      windowObj.document.getElementById('count').innerHTML = 1;
    }
    else {
      windowObj.document.getElementById('count').innerHTML = view_counts;
      view_counts++;
    }
  }
);
