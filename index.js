/**
 * Elements
 */

const daysTextEl = document.querySelector('.daysText')
const daysNumberEl = document.querySelector('.daysNumber')
const timerEl = document.querySelector('.timer')
const navEl = document.querySelector('nav')

/**
 * Dates
 */

const today = new Date()
const thisYear = today.getFullYear()

const days = [
  [new Date(thisYear, 11, 25), 'Christmas'],
  [new Date(thisYear, 0, 1), "New Year's Day"],
  [new Date(thisYear, 9, 9), "Mommy's Birthday"],
  [new Date(thisYear, 11, 16), "Daddy's Birthday"],
  [new Date(thisYear, 2, 8), "Paxton's Birthday"],
  [new Date(thisYear, 11, 10), "Paisley's Birthday"],
  [new Date(thisYear, 8, 29), "Porter's Birthday"]
]

// Build Buttons
days.forEach(([date, text]) => {
  const btn = document.createElement('button')
  btn.classList.add('link')
  btn.textContent = text
  btn.addEventListener('click', () => {
    data = [date, text]
  })

  navEl.appendChild(btn)
})

function setTime() {
  let [targetDate, text] = data
  const now = new Date()
  const isToday =
    now.getDate() == targetDate.getDate() &&
    now.getMonth() == targetDate.getMonth()

  if (isToday) {
    daysNumberEl.innerText = `It's today!`
    daysTextEl.innerText = ''
    timerEl.innerText = ''
  } else {
    let diff = targetDate.getTime() - now.getTime()
    if (diff < 0) {
      targetDate.setFullYear(thisYear + 1)
      diff = targetDate.getTime() - Date.now()
    }
    const daysLeft = Math.ceil(diff / 1000 / 60 / 60 / 24)
    const hoursLeft = targetDate.getHours() - now.getHours()
    const minutesLeft = targetDate.getMinutes() - now.getMinutes()
    const secondsLeft = targetDate.getSeconds() - now.getSeconds()
    const msLeft = targetDate.getMilliseconds() - now.getMilliseconds()
    const ms = parseInt((msLeft < 0 ? 999 + msLeft : msLeft) / 10, 10)
    const hours = hoursLeft < 0 ? 23 + hoursLeft : hoursLeft
    const minutes = minutesLeft < 0 ? 59 + minutesLeft : minutesLeft
    const seconds = secondsLeft < 0 ? 59 + secondsLeft : secondsLeft
    const countdown = `${hours}h ${pad(minutes)}m ${pad(seconds)}.${pad(ms)}s`

    daysNumberEl.innerText = `${daysLeft} days`
    daysTextEl.innerText = `until ${text}`
    timerEl.innerText = countdown
  }
}

function pad(num) {
  return num < 10 ? '0' + num : num
}

/**
 * Do it
 */

let data = days[0]

setInterval(setTime, 77)
