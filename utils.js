export function setItem(key, value) {
  localStorage.setItem(key, value);
}

export function getItem(key) {
  return JSON.parse(localStorage.getItem(key));
}
