export { }
import { encode, getCheckboxValues, copyToClipboard } from "./mainFunctions";

const messageBox: HTMLInputElement = document.querySelector('#message')!;
const keyBox: HTMLInputElement = document.querySelector('#key')!;

const button = document.querySelector('#encodeButton')!;
const results = document.querySelector('#encodedMessage')! as HTMLParagraphElement;
const copyButton = document.querySelector('#copyToClipboard')!;

button.addEventListener('click', () => {

    let message = messageBox.value;
    let key = keyBox.value;
    key = key.toLowerCase();
    message = message.toLowerCase();
    message = message.replaceAll(" ", "")
    // Replace new line characters with spaces
    key = key.replace(/\n+/g, " ")
    message = message.replace(/\n+/g, " ")
    // Remove quotation marks
    key = key.replaceAll('"', '')
    key = key.replaceAll("'", '')
    message = message.replaceAll('"', '')
    message = message.replaceAll("'", '')

    const encodedMessage = encode(message, key);

    results.innerText = encodedMessage
})

copyButton.addEventListener('click', () => {
    let encodedMessage = document.querySelector('#encodedMessage')! as HTMLParagraphElement;
    let copied = copyToClipboard(encodedMessage)

})