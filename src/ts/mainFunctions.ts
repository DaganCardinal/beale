// // //
// Decoder function
// // //
export function decode(message: string, key: string): string {
    message = message.replace(/\n+/g, " ");
    let messageArr: number[]
    if (message.includes(",")) {
        messageArr = message.split(", ").map(Number);
    } else {
        messageArr = message.split(" ").map(Number);
    }
    let keyArr = key.split(" ");
    let output = "";

    let validity = checkValidKeyMessageLength(messageArr, keyArr);

    if (!validity.isValid) {
        return `Key is not long enough to decode message. Key length is ${validity.keyLength} and the highest value in the message is ${validity.maxValue}`
    }

    messageArr.forEach((letterPosition: number) => {
        var x = keyArr[letterPosition - 1];
        if (x) {
            output += ` ${x.charAt(0).toLowerCase()}`;
        } else {
            output += ` ${letterPosition}`;
        }
    });
    return output;
}

// // //
// Encoder function
// // //
export function encode(message: string, key: string): string {
    let messageArr = message.split('');
    let keyArr = key.split(' ');
    let output = '';
    let startNum: number = 0;

    messageArr.forEach((word: string, index: number) => {
        if (index % 2 === 0) {
            // Uses random number starting point to add complexity to the cipher, divides by 2 to ensure the starting point is not too high
            startNum = getRandomNum(0, keyArr.length) / 2;
        }

        let letterPosition = keyArr.findIndex((letter: string, i: number) => letter.charAt(0) === word.charAt(0) && i > startNum)

        if (letterPosition != -1) {

            output += ` ${letterPosition + 1}`;

        } else {
            // If the letter is not found after the random starting point, try from the beginning instead
            let newLetterPosition = keyArr.findIndex((letter: string, i: number) => letter.charAt(0) === word.charAt(0))

            if (newLetterPosition != -1) {

                output += ` ${newLetterPosition + 1}`;

            } else {

                return `Letter <b>${word.charAt(0)}</b> not found in key`

            }
        }
    })
    return output;
}

// // //
// Other functions
// // //

interface CheckboxStatuses {
    [key: string]: boolean;
}

// Pulls all checkboxes from the page and assigns their names and statuses to an object
export function getCheckboxValues(): CheckboxStatuses {
    const allCheckboxes = document.querySelectorAll(
        "input[type=checkbox]"
    ) as NodeListOf<HTMLInputElement>;
    const checkboxStatuses = {} as CheckboxStatuses;

    allCheckboxes.forEach((checkbox) => {
        checkboxStatuses[checkbox.id] = checkbox.checked;
    });
    return checkboxStatuses
}

// Gets a random number, for use in encoder function
function getRandomNum(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Checks if the highest value in the message is higher than the length of the key
function checkValidKeyMessageLength(encodedMessage: number[], key: string[]) {
    let maxValue = Math.max(...encodedMessage)
    let isValid: boolean;
    let keyLength = key.length

    if (maxValue > keyLength) {
        isValid = false
    } else {
        isValid = true
    }

    return { isValid, keyLength, maxValue }
}