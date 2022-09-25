import { Notify } from 'notiflix';

const formSubmit = document.querySelector('.form');
formSubmit.addEventListener('submit', createObj);

function createObj(event) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const time = {
    delay: +formData.get('delay'),
    step: +formData.get('step'),
    amount: +formData.get('amount'),
  };

  for (let position = 1; position <= time.amount; position++) {
    createPromise(position, time.delay + time.step * (position - 1))
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
