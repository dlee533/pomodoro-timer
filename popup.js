var work = document.getElementById("work");
var srest = document.getElementById("srest");
var lrest = document.getElementById("lrest");
var cycle = document.getElementById("cycle");
var button = document.getElementById("button");


chrome.storage.local.get("pomodoro", function(result) {
  if (result.pomodoro) {
    console.log("pomodoro: " + result.pomodoro);
    freezeFields(result);
    chrome.runtime.sendMessage({request: "get_state"}, function(response) {
      console.log(response + " received");
      document.getElementById("state").innerHTML = response;
    });
  } else {
    resetFields();
  }
});

function freezeFields(result) {
  work.value = result.pomodoro.work;
  srest.value = result.pomodoro.srest;
  lrest.value = result.pomodoro.lrest;
  cycle.value = result.pomodoro.numCycle;
  button.value = "stop";
  work.disabled = "disabled";
  srest.disabled = "disabled";
  lrest.disabled = "disabled";
  cycle.disabled = "disabled";
}

function resetFields() {
  chrome.storage.local.clear();
  work.value = 25;
  srest.value = 5;
  lrest.value = 15;
  cycle.value = 5;
  button.value = "start";
  work.removeAttribute("disabled");
  srest.removeAttribute("disabled");
  lrest.removeAttribute("disabled");
  cycle.removeAttribute("disabled");
}

button.addEventListener("click", function() {
  if (button.value == "start") {
    info = {work: parseInt(work.value),
            srest: parseInt(srest.value),
            lrest: parseInt(lrest.value),
            numCycle: parseInt(cycle.value),
            count: 0,
          };
    chrome.storage.local.set({'pomodoro': info}, function() {
      freezeFields({"pomodoro": info});
      chrome.runtime.sendMessage({info: info, request: "start"});
    });
  } else {
    resetFields();
    chrome.runtime.sendMessage({request: "stop"});
  }
})
