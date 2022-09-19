function getTimeRemaining(endtime) {
  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  return {
    total,
    minutes,
    seconds,
  };
}

function initializeClock(id, endtime) {
  const clock = document.getElementById(id);
  const minutesSpan = clock.querySelector(".minutes");
  const secondsSpan = clock.querySelector(".seconds");

updateClock(){
   const t=getTimeRemaining(endtime);
    minutesSpan.innerHTML=('0'+t.minutes).slice(-2);
    secondsSpan.innerHTML=('0'+t.seconds).slice(-2);
    if (t.total<=0){
        clearInterval(timeinterval); /* if the total time is equal to or less than 0 reset the clock */
    }
}
updateClock();
const timeinterval=setInterval(updateClock, 1000); /* update the clock every second 1000=1second */
}

const deadline= new Date(Date.parse(new Date())+3*60*1000);
initializeClock('clockdiv',deadline);
/* set the countdown timer to 3 minutes and initialise the clock */
