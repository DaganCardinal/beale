export { }
import { encode, getCheckboxValues } from "./mainFunctions";

const messageBox: HTMLInputElement = document.querySelector('#message')!;
const keyBox: HTMLInputElement = document.querySelector('#key')!;

const button = document.querySelector('#encodeButton')!;

const results = document.querySelector('#results')!;

button.addEventListener('click', () => {

    let message = messageBox.value;
    let key = keyBox.value;
    key = key.toLowerCase();
    message = message.toLowerCase();
    message = message.replaceAll(" ", "")
    key = key.replace(/\n+/g, " ")
    message = message.replace(/\n+/g, " ")

    const encodedMessage = encode(message, key);

    results.innerHTML = `
    <h2 class="text-xl font-semibold tracking-wide">Results</h2>
    <p>${encodedMessage}</p>`;
})