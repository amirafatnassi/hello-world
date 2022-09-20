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
      let questionObject = JSON.parse(this.responseText);
      console.log(questionObject);
    }
  };
  myRequest.open("GET", "questions.json", true);
  myRequest.send();
}
getQuestions();
