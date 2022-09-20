//select elements
let countSpan = document.querySelector(".count span");
let bulletsSpanContainer = document.querySelector(".bullets .spans");

function getQuestions() {
  let myRequest = new XMLHttpRequest();
  myRequest.onreadystatechange = function () {
    //request status code
    //O: request not initialized
    //1: server connection established
    //2: request received
    //3: processing request
    //4: request is finished and response is ready
    //response status code
    //404: not found
    //200: response ok
    if (this.readyState === 4 && this.status === 200) {
      let questionsObject = JSON.parse(this.responseText);
      let questionsCount = questionsObject.length;

      //create bullets & set questions count
      createBullets(questionsCount);
    }
  };
  myRequest.open("GET", "questions.json", true);
  myRequest.send();
}
getQuestions();

function createBullets(num) {
  countSpan.innerHTML = num;

  //create spans
  for (let i = 0; i < num; i++) {
    //create span
    let theBullet = document.createElement("span");

    //check if its first span
    if (i === 0) {
      theBullet.className = "on";
    }

    //apend bullets to main bullet container
    bulletsSpanContainer.appendChild(theBullet);
  }
}
