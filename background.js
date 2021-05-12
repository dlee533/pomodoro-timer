var info = null;
var currentState = "";


function startTimer() {
  currentState = "work";
  createAlarm(true);
  console.log("start timer")
}

chrome.alarms.onAlarm.addListener(function(alarm) {
  console.log(currentState + " has ended after " + info[currentState]);
  if (currentState == "work") {
    if (info["count"]%info["numCycle"]==0) {
      currentState = "lrest";
    } else {
      currentState = "srest";
    }
  } else {
    info["count"]++;
    currentState = "work";
  }
  createAlarm();
});

function createAlarm(initial = false) {
  chrome.alarms.create(currentState, {
    delayInMinutes: info[currentState]
  });

  // call getCurrentTab and alert
  if (initial == false) chrome.tabs.create({url:"popup.html"});
}


function stopTimer() {
  chrome.alarms.clearAll()
  console.log("stopped timer");
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch(request.request) {
    case "start":
      info = request.info
      startTimer();
      break;
    case "get_state":
      sendResponse(currentState);
      console.log("sent response: " + currentState);
      break;
    default:
      stopTimer();
  }
  return true;
});
