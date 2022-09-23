document.querySelector(".control-buttons span").onclick = function () {
  let yourName = prompt("What's your name ?");
  if (yourName === null || yourName === "") {
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }
  document.querySelector(".control-buttons").remove();
};

let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);
let orderRange=[...Array(blocks.length).keys()];