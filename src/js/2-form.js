const form = document.querySelector('form');

const keyLink = 'feedback-form-state';

form.addEventListener('input', event => {
  const email = event.currentTarget.elements.email.value.trim();
  const message = event.currentTarget.elements.message.value.trim();

  const userData = { email, message };

  saveToLS(keyLink, userData);
});

function init(key) {
  const data = loadFromLS(key);
  form.elements.email.value = data?.email || '';
  form.elements.message.value = data?.message || '';
}

init(keyLink);

function loadFromLS(key) {
  const data = localStorage.getItem(key);
  try {
    return JSON.parse(data);
  } catch {
    return data;
  }
}

function saveToLS(key, value) {
  const json = JSON.stringify(value);
  localStorage.setItem(key, json);
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const { email, message } = event.target.elements;
  if (!email.value.trim() || !message.value.trim()) {
    return alert('form fields must be filled');
  }
  const userData = { email, message };
  console.log(userData);
  event.target.reset();

  localStorage.removeItem(keyLink);
});