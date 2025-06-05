// Credit: Mateusz Rybczonec
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 5*60;
const ALERT_THRESHOLD = 3*60;

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

function calculateTimeFraction(timeLeft, TIME_LIMIT) {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

class Countdown {
  constructor(el, TIME_LIMIT){
    this.el = el
    this.TIME_LIMIT = TIME_LIMIT
    this.timePassed = 0
    this.timeLeft = this.TIME_LIMIT;
    let timerInterval = null;
    let remainingPathColor = COLOR_CODES.info.color;

    this.el.innerHTML = `
    <div class="base-timer">
      <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="base-timer__circle">
          <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
          <path
            id="base-timer-path-remaining"
            stroke-dasharray="283"
            class="base-timer__path-remaining ${remainingPathColor}"
            d="
              M 50, 50
              m -45, 0
              a 45,45 0 1,0 90,0
              a 45,45 0 1,0 -90,0
            "
          ></path>
        </g>
      </svg>
      <span id="base-timer-label" class="base-timer__label">${formatTime(
        this.timeLeft
      )}</span>
    </div>
    `

    // Countdown.startTimer(this.el, this.TIME_LIMIT)
  }

  startTime(){
    Countdown.startTimer(this.el, this.TIME_LIMIT)
  }

  stopTime(){
    new Countdown(this.el, 5)
  }

  static startTimer(el, TIME_LIMIT, timePassed = 0) {
    // console.log(el.getAttribute('id'))
    let intName = el.getAttribute('id')
    // console.log(TIME_LIMIT)
    let timeLeft = TIME_LIMIT
    intName = setInterval(() => {
      timePassed = timePassed += 1
      timeLeft = TIME_LIMIT - timePassed;
      el.querySelector(".base-timer").querySelector("#base-timer-label").innerHTML = formatTime(
        timeLeft
      );
      this.setCircleDasharray(el, timeLeft, TIME_LIMIT);
      this.setRemainingPathColor(el, timeLeft);
  
      if (timeLeft === 0) {
        clearInterval(intName);
      }
    }, 1000);
  }

  static formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
  
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
  
    return `${minutes}:${seconds}`;
  }
  
  static setRemainingPathColor(el, timeLeft) {
    el = el.querySelector(".base-timer").querySelector("svg").querySelector("g").querySelector("path")
    const { alert, warning, info } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
      el
        .classList.remove(warning.color);
      el
        .classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
      el
        .classList.remove(info.color);
        el
        .classList.add(warning.color);
    }
  }
  

  
  static setCircleDasharray(el, timeLeft, TIME_LIMIT) {
    el = el.querySelector(".base-timer").querySelector("svg").querySelector("g").querySelector("path")
    console.log(el)
    const circleDasharray = `${(
      calculateTimeFraction(timeLeft, TIME_LIMIT) * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    el
      .setAttribute("stroke-dasharray", circleDasharray);
  }
}




let el
el = document.getElementById('countdown1')
let countdown1 = new Countdown(el, 5*60)
document.getElementById("start").addEventListener('click', () => {
  countdown1.startTime()
  countdown2.startTime()
  countdown3.startTime()
  countdown4.startTime()
})

el = document.getElementById('countdown2')
const countdown2 = new Countdown(el, 8*60)

el = document.getElementById('countdown3')
const countdown3 = new Countdown(el, 15*60)

el = document.getElementById('countdown4')
const countdown4 = new Countdown(el, 20*60)


