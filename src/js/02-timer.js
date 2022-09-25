// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import { convertMs } from './convert-ms';
import { Notify } from 'notiflix';

const dataStartBtn = document.querySelector('button[data-start]');
const calendarElement = document.querySelector('input#datetime-picker');
const componentTimer = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

const timer = {
  selectedDate: null,
  intervalId: null,
  start() {
    render(this.selectedDate);
    this.intervalId = setInterval(() => {
        if(deltaTime(this.selectedDate) <= 0) {
            clearInterval(this.intervalId);
            return;
        }
        render(this.selectedDate);
    }, 1000);
  },
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const [date] = selectedDates;
    if (new Date() > date) {
    //   alert('Please choose a date in the future');
    Notify.warning('Please choose a date in the future');
      return;
    }
    dataStartBtn.disabled = false;
    timer.selectedDate = date;
  },
};

flatpickr(calendarElement, options);

dataStartBtn.addEventListener('click', onClickStartBtn);

function onClickStartBtn(event) {
    timer.start();
    event.currentTarget.disabled = true;
    calendarElement.disabled = true;
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function deltaTime(endDate) {
  return endDate - new Date();
}

function render(selectedDate) {
    const time = convertMs(deltaTime(selectedDate));
    componentTimer.days.textContent = addLeadingZero(time.days);
    componentTimer.hours.textContent = addLeadingZero(time.hours);
    componentTimer.minutes.textContent = addLeadingZero(time.minutes);
    componentTimer.seconds.textContent = addLeadingZero(time.seconds);
}