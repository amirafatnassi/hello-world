document.querySelector(".control-buttons span").onclick = function () {
  let yourName = prompt("What's your name ?");
  if (yourName === null || yourName === "") {
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }
  document.querySelector(".control-buttons").remove();
};

//effect duration
let duration = 1000;
//select blocks container
let blocksContainer = document.querySelector(".memory-game-blocks");

//create array from game blocks
let blocks = Array.from(blocksContainer.children);

//create range of keys
//let orderRange = [...Array(blocks.length).keys()];
let orderRange = Array.from(blocks.length).keys();


//add order css propert to game blocks
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
});
