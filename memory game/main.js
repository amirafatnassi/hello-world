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
shuffle(orderRange);

//add order css propert to game blocks
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
});

//shuffle function
function shuffle(array) {
  //settings vars
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    //get random number
    random = Math.floor(Math.random() * current);
    //decrease length by 1
    current--;
    //1- save current element in stash
    temp = array[current];
    //2- current element = random element
    array[current] = array[random];
    //3- random element = get element from stash
    array[random] = temp;
  }
  return array;
}
