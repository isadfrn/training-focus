const body = document.querySelector('#theme');

const themeSwitcherButton = document.querySelector('.theme__switcher__btn');

const timerDisplay = document.querySelector('.timer__display');
const minuteDisplay = document.querySelector('.timer__display--minute');
const secondDisplay = document.querySelector('.timer__display--second');

const playButton = document.querySelector('.timer__cotroller__btn--start');
const stopButton = document.querySelector('.timer__cotroller__btn--stop');
const plusButton = document.querySelector('.timer__cotroller__btn--plus');
const minusButton = document.querySelector('.timer__cotroller__btn--minus');

const soundNatureButton = document.querySelector('.sound__controller__btn--nature');
const soundRainButton = document.querySelector('.sound__controller__btn--rain');
const soundStoreButton = document.querySelector('.sound__controller__btn--store');
const soundFireButton = document.querySelector('.sound__controller__btn--fire');

const themeSwitcherButtonImage = document.querySelector('.theme__switcher__btn__img');

const timerControllerButtonStartImage = document.querySelector(
  '.timer__cotroller__btn__start__img',
);
const timerControllerButtonStopImage = document.querySelector('.timer__cotroller__btn__stop__img');
const timerControllerButtonPlusImage = document.querySelector('.timer__cotroller__btn__plus__img');
const timerControllerButtonMinusImage = document.querySelector(
  '.timer__cotroller__btn__minus__img',
);

const soundControllerButtonNatureImage = document.querySelector(
  '.sound__controller__btn__nature__img',
);
const soundControllerButtonRainImage = document.querySelector('.sound__controller__btn__rain__img');
const soundControllerButtonStoreImage = document.querySelector(
  '.sound__controller__btn__store__img',
);
const soundControllerButtonFireImage = document.querySelector('.sound__controller__btn__fire__img');

const soundNatureAudio = new Audio(
  'https://github.com/isadfrn/training-focus/blob/main/assets/audio/nature.mp3?raw=true',
);
const soundRainAudio = new Audio(
  'https://github.com/isadfrn/training-focus/blob/main/assets/audio/rain.mp3?raw=true',
);
const soundStoreAudio = new Audio(
  'https://github.com/isadfrn/training-focus/blob/main/assets/audio/store.mp3?raw=true',
);
const soundFireAudio = new Audio(
  'https://github.com/isadfrn/training-focus/blob/main/assets/audio/fire.mp3?raw=true',
);
const soundAlarmAudio = new Audio(
  'https://github.com/isadfrn/training-focus/blob/main/assets/audio/alarm.mp3?raw=true',
);

const audioList = [soundNatureAudio, soundRainAudio, soundStoreAudio, soundFireAudio];

let minute = Number(minuteDisplay.textContent);
let second = Number(secondDisplay.textContent);

let isStoped = true;
let isPlaying = false;
let soundIsPlaying = false;
let isDecreasing = false;

function addLeadingZero(number, length) {
  return String(number).padStart(length, '0');
}

function pauseAllAudioList(list) {
  list.map((audio) => {
    audio.pause();
  });
}

function playAudio(sound) {
  if (minute === 0 && second === 0 && isStoped) {
    return;
  }
  if (soundIsPlaying) {
    soundIsPlaying = false;
    sound.pause();
  } else {
    soundIsPlaying = true;
    pauseAllAudioList(audioList);
    sound.play();
    sound.loop = true;
  }
}

function setImagesAccordingToTheme(theme) {
  themeSwitcherButtonImage.src = `assets/img/${theme}/${theme}.svg`;
  timerControllerButtonStartImage.src = `assets/img/${theme}/play.svg`;
  timerControllerButtonStopImage.src = `assets/img/${theme}/stop.svg`;
  timerControllerButtonPlusImage.src = `assets/img/${theme}/plus.svg`;
  timerControllerButtonMinusImage.src = `assets/img/${theme}/minus.svg`;
  soundControllerButtonNatureImage.src = `assets/img/${theme}/nature.svg`;
  soundControllerButtonRainImage.src = `assets/img/${theme}/rain.svg`;
  soundControllerButtonStoreImage.src = `assets/img/${theme}/store.svg`;
  soundControllerButtonFireImage.src = `assets/img/${theme}/fire.svg`;
}

function increaseMinute() {
  if (!isPlaying) {
    minute++;
    minuteDisplay.textContent = addLeadingZero(minute, 2);
  }
}

function decreaseMinute() {
  if (!isPlaying && minute > 0) {
    minute--;
    minuteDisplay.textContent = addLeadingZero(minute, 2);
  }
}

function decreaseSecond() {
  if (second === 0) {
    second = 60;
  }

  if (second === 60 && minute > 0) {
    minute--;
    minuteDisplay.textContent = addLeadingZero(minute, 2);
  }

  second--;
  secondDisplay.textContent = addLeadingZero(second, 2);

  if (minute === 0 && second === 0) {
    clearInterval(isDecreasing);
    isStoped = true;
    soundAlarmAudio.play();
    pauseAllAudioList(audioList);
  }
}

playButton.addEventListener('click', () => {
  if (isPlaying || (minute === 0 && second === 0)) {
    return;
  }
  isPlaying = true;
  isStoped = false;
  isDecreasing = setInterval(decreaseSecond, 1000);
});

stopButton.addEventListener('click', () => {
  clearInterval(isDecreasing);
  pauseAllAudioList(audioList);
  isPlaying = false;
  isStoped = true;
});

themeSwitcherButton.addEventListener('click', () => {
  if (body.className.includes('light__theme')) {
    body.classList.remove('light__theme');
    body.classList.add('dark__theme');
    setImagesAccordingToTheme('dark');
  } else {
    body.classList.remove('dark__theme');
    body.classList.add('light__theme');
    setImagesAccordingToTheme('light');
  }
});

plusButton.addEventListener('click', () => {
  increaseMinute();
});

minusButton.addEventListener('click', () => {
  decreaseMinute();
});

soundNatureButton.addEventListener('click', () => {
  playAudio(soundNatureAudio);
});

soundRainButton.addEventListener('click', () => {
  playAudio(soundRainAudio);
});

soundStoreButton.addEventListener('click', () => {
  playAudio(soundStoreAudio);
});

soundFireButton.addEventListener('click', () => {
  playAudio(soundFireAudio);
});
