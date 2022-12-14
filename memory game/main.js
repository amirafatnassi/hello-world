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
let orderRange = Array.from(Array(blocks.length).keys());
shuffle(orderRange);

//add order css propert to game blocks
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];

  //add click event
  block.addEventListener("click", function () {
    //trigger fllipBlock function
    flipBlock(block);
  });
});

//flip block function
function flipBlock(selectedBlock) {
  // add class is-flipped
  selectedBlock.classList.add("is-flipped");
  //collect all flipped cards
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );
  //if there is 2 selected blocks
  if (allFlippedBlocks.length === 2) {
    //stop clicking function
    stopClicking();
    //check matched block function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

//stop clicking gunction
function stopClicking() {
  //add class no clicking on main container
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    //remove class no clicking after the duration
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

//check matched blocks
function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");
  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");
    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");

    document.getElementById('success').play();
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
    document.getElementById('fail').play();

  }
}

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
