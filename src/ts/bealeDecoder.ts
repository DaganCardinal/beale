export { }

function decode(message: string, key: string) {
    let messageArr = message.split(", ");
    let keyArr = key.split(" ");
    let output = "";

    messageArr.forEach((letterPosition: string) => {
        var x = keyArr[parseInt(letterPosition) - 1];
        if (x) {
            output += ` ${x.charAt(0).toLowerCase()}`;
        } else {
            output += ` ${letterPosition}`;
        }
    });
    return output;
}

let bealeOne = document.getElementById("bealeOneText")?.textContent!;
let bealeTwo = document.getElementById("bealeTwoText")?.textContent!;
let bealeThree = document.getElementById("bealeThreeText")?.textContent!;
let resultOne = "";
let resultTwo = "";
let resultThree = "";
const button = document.getElementById(
    "checkTextButton"
)! as HTMLButtonElement;

interface CheckboxStatuses {
    [key: string]: boolean;
}

const results = document.querySelector("#results")! as HTMLDivElement;
button.addEventListener("click", () => {
    const allCheckboxes = document.querySelectorAll(
        "input[type=checkbox]"
    ) as NodeListOf<HTMLInputElement>;
    const checkboxStatuses = {} as CheckboxStatuses;

    allCheckboxes.forEach((checkbox) => {
        checkboxStatuses[checkbox.id] = checkbox.checked;
    });

    let checkText = document.getElementById(
        "checkText"
    ) as HTMLTextAreaElement;
    let text: any;
    text = checkText.value;

    if (checkboxStatuses.lineBreaks) {
        text = text.replace(/\n+/g, " ");
    }
    if (checkboxStatuses.hyphenatedItems) {
        text = text.replace(/(?<=[a-zA-Z](\-)(?=[a-zA-Z]))/g, " ");
    }
    if (checkboxStatuses.doubleQuotationMarks) {
        text = text.replace(/\"/g, "");
    }
    if (checkboxStatuses.singleQuotationMarks) {
        text = text.replace(/\'/g, "");
    }
    if (checkboxStatuses.doubleDash) {
        text = text.replaceAll("--", " ");
    }

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