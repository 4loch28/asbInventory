function tylerClicked() {
  document.location.href = "/tyler"
}
function lochlinClicked() {
  document.location.href = "/lochlin"
}
function benClicked() {
  document.location.href = "/ben"
}
function reedClicked() {
  document.location.href = "/reed"
}
function back() {
  document.location.href = "/";
}

$(document).ready(function(){
  $("#backButton").click(back);
  $("#tylerButton").click(tylerClicked);
  $("#lochlinButton").click(lochlinClicked);
  $("#benButton").click(benClicked);
  $("#reedButton").click(reedClicked);
})