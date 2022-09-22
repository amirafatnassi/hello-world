//select elements
let countSpan = document.querySelector(".count span");
let bulletsSpanContainer = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit-button");
let bullets = document.querySelector(".bullets");
let resultsContainer = document.querySelector(".results");
let countdownElement = document.querySelector(".countdown");

// set options
let currentIndex = 0;
let rightAnswers = 0;
let countdownInterval;

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
      let qCount = questionsObject.length;

      //create bullets & set questions count
      createBullets(qCount);

      //add question data
      addQuestiondata(questionsObject[currentIndex], qCount);

      //start countdown
      countdown(5, qCount);

      //click on submit
      submitButton.onclick = () => {
        //get right answer
        let theRightAnswer = questionsObject[currentIndex].right_answer;

        //increase index
        currentIndex++;

        //check the answer
        checkAnswer(theRightAnswer, qCount);

        //remove previous question
        quizArea.innerHTML = "";
        answersArea.innerHTML = "";

        //add questions data
        addQuestiondata(questionsObject[currentIndex], qCount);

        //handle bullets class
        handleBullets();

        //start countdown
        clearInterval(countdownInterval);
        countdown(5,qCount);

        //show results
        showResults(qCount);
      };
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

function addQuestiondata(obj, count) {
  if (currentIndex < count) {
    //create H2 Question title
    let questionTitle = document.createElement("h2");
    //create question text
    let questionText = document.createTextNode(obj.title);
    //append text to h2
    questionTitle.appendChild(questionText);

    //append the h2 to quiz area
    quizArea.appendChild(questionTitle);

    //create answers
    for (let i = 1; i <= 4; i++) {
      //create main answer div
      let mainDiv = document.createElement("div");
      // add class to main div
      mainDiv.className = "answers";

      //create radio input
      let radioInput = document.createElement("input");
      //add type + name +id+ data-attribute
      radioInput.name = "question";
      radioInput.type = "radio";
      radioInput.id = `answer_${i}`;
      radioInput.dataset.answer = obj[`answer_${i}`];

      //make first option selected
      if (i === 1) {
        radioInput.checked = true;
      }

      //create label
      let theLabel = document.createElement("label");
      //add for attribute
      theLabel.htmlFor = `answer_${i}`;
      //create label text
      let theLabelText = document.createTextNode(obj[`answer_${i}`]);
      //add the text to label
      theLabel.appendChild(theLabelText);
      // add input + label to main div
      mainDiv.appendChild(radioInput);
      mainDiv.appendChild(theLabel);
      //append all divs to answers area
      answersArea.appendChild(mainDiv);
    }
  }
}

function checkAnswer(rAnswer, count) {
  let answers = document.getElementsByName("question");
  let theChoosenAnswer;
  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      theChoosenAnswer = answers[i].dataset.answer;
    }
  }
  if (rAnswer === theChoosenAnswer) {
    rightAnswers++;
  }
}

function handleBullets() {
  let bulletsSpans = document.querySelectorAll(".bullets .spans span");
  let arrayOfSpans = Array.from(bulletsSpans);
  arrayOfSpans.forEach((span, index) => {
    if (currentIndex === index) {
      span.className = "on";
    }
  });
}

function showResults(count) {
  let theResults;
  if (currentIndex === count) {
    quizArea.remove();
    answersArea.remove();
    submitButton.remove();
    bullets.remove();

    if (rightAnswers > count / 2 && rightAnswers < count) {
      theResults = `<span class="good">Good</span>, ${rightAnswers} from ${count} Is Good.`;
    } else if (rightAnswers === count) {
      theResults = `<span class="perfect">All answers good</span>, ${rightAnswers} from ${count} Is Good.`;
    } else {
      theResults = `<span class="bad">Bad</span>, ${rightAnswers} from ${count}.`;
    }
    resultsContainer.innerHTML = theResults;
    resultsContainer.style.padding = "10px";
    resultsContainer.style.backggroundColor = "white";
    resultsContainer.style.marginTop = "10px";
  }
}

function countdown(duration, count) {
  if (currentIndex < count) {
    let minutes, seconds;
    countdownInterval = setInterval(function () {
      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);

      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      countdownElement.innerHTML = `${minutes}:${seconds}`;
      if (--duration < 0) {
        clearInterval(countdownInterval);
        submitButton.click();
      }
    }, 1000);
  }
}
