export { }
import { getCheckboxValues, decode, formatTextWithStandardOptions } from "./mainFunctions";

let bealeOne = document.getElementById("bealeOneText")?.textContent!;
let bealeTwo = document.getElementById("bealeTwoText")?.textContent!;
let bealeThree = document.getElementById("bealeThreeText")?.textContent!;
let resultOne = "";
let resultTwo = "";
let resultThree = "";
const button = document.getElementById(
    "checkTextButton"
)! as HTMLButtonElement;

const results = document.querySelector("#results")! as HTMLDivElement;
button.addEventListener("click", () => {

    let checkboxStatuses = getCheckboxValues();

    let checkText = document.getElementById(
        "checkText"
    ) as HTMLTextAreaElement;
    let text: any;
    text = checkText.value;
    text = text.replace(/\n+/g, " ");

    text = formatTextWithStandardOptions(checkboxStatuses, text);

    if (checkboxStatuses.cipherOneCheckbox) {
        resultOne = decode(bealeOne, text);
    }

    if (checkboxStatuses.cipherTwoCheckbox) {
        resultTwo = decode(bealeTwo, text);
    }

    if (checkboxStatuses.cipherThreeCheckbox) {
        resultThree = decode(bealeThree, text);
    }

    let addToDom = ``;
    if (resultOne) {
        addToDom += `
                <div class="mb-4" id="bealeOneResults">
                    <h2 class="text-2xl">Cipher One</h2>
                    <p class="my-2">${resultOne}</p>
                </div>
            `;
    }
    if (resultTwo) {
        addToDom += `
                <div class="mb-4" id="bealeTwoResults">
                    <h2 class="text-2xl">Cipher Two</h2>
                    <p class="my-2">${resultTwo}</p>
                </div>
            `;
    }
    if (resultThree) {
        addToDom += `
                <div class="my-4" id="bealeThreeResults">
                    <h2 class="text-2xl">Cipher Three</h2>
                    <p class="my-2">${resultThree}</p>
                </div>
            `;
    }
    results.innerHTML = addToDom;
});