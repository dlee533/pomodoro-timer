// var work = document.getElementById("work");
// var srest = document.getElementById("srest");
// var lrest = document.getElementById("lrest");
// var cycle = document.getElementById("cycle");
// var start = document.getElementById("start");
// var currentState = "work"
// var numCycle = 0
//
// function startTimer(work, srest, lrest, cycle) {
//   numCycle++;
//   chrome.alarms.create(currentState, {
//     delayInMinutes: parseInt(work.value)
//   });
// }
//
// if (start) {
//   start.addEventListener("click", function() {
//     work.disabled = "disabled";
//     srest.disabled = "disabled";
//     lrest.disabled = "disabled";
//     cycle.disabled = "disabled";
//     alert("alarm started for " + work.value + " minute(s)")
//     startTimer(work, srest, lrest, cycle);
//   })
// } else {
//   alert("no start button found");
// }
//
// chrome.alarms.onAlarm.addListener(function() {
//   alert(currentState + " has ended");
//   if (currentState == "work" && numCycle%parseInt(cycle.value)==0) {
//     if (numCycle%parseInt(cycle.value)==0) {
//       currentState = "long rest";
//       chrome.alarms.create(currentState, {
//         delayInMinutes: parseInt(parseInt(lrest.value))
//       });
//     } else {
//       currentState = "short rest";
//       chrome.alarms.create(currentState, {
//         delayInMinutes: parseInt(parseInt(srest.value))
//       });
//     }
//   } else {
//     numCycle++;
//     currentState = "work";
//     chrome.alarms.create(currentState, {
//       delayInMinutes: parseInt(work.value)
//     });
//   }
// })
