let inputValues = [];
const WELCOME_MESSAGE = "はじめましょ！";
const FINISH_MESSAGE = "おめでとう！＾＾";

document.getElementById("result").innerText = WELCOME_MESSAGE;

function inputValue() {
  let inputText = document.getElementById("input").value.trim();
  let inputArray = inputText.split(isModeSingle() ? "" : "\n");
  inputValues = inputArray;
}

function isModeSingle() {
  return document.getElementById("single").checked;
}

document.getElementById("input").addEventListener("input", inputValue);

let previousCharacter = "";

function getRandomNonWhitespaceChar() {
  let nonWhitespaceChars = inputValues.join("");
  if (nonWhitespaceChars.length > 0) {
    let filteredChars = nonWhitespaceChars.replace(previousCharacter, "");
    if (filteredChars.length > 0) {
      let randomIndex = Math.floor(Math.random() * filteredChars.length);
      let randomChar = filteredChars.charAt(randomIndex);
      previousCharacter = randomChar;
      return randomChar;
    } else {
      return nonWhitespaceChars.charAt(0);
    }
  } else {
    return FINISH_MESSAGE;
  }
}

let previousIndex = -1;

function getRandomLine() {
  if (inputValues.length === 0){
    return FINISH_MESSAGE;
  }
  if (inputValues.length === 1) {
    return inputValues[0];
  }
  let randomIndex = Math.floor(Math.random() * inputValues.length);
  if (randomIndex === previousIndex) {
    randomIndex = previousIndex === 0 ? 1 : previousIndex - 1;
  }
  previousIndex = randomIndex;
  return inputValues[randomIndex];
}

function updateTextField() {
  let displayedLetter = document.getElementById("result").innerText;
  let inputElement = document.getElementById("input");
  let index = inputValues.indexOf(displayedLetter);
  if (index !== -1) {
    inputValues.splice(index, 1);
    inputElement.value = inputValues.join("");
  }
}

function xButton() {
  if (inputValues.length > 0) {
    document.getElementById("result").innerText = isModeSingle()
      ? getRandomNonWhitespaceChar()
      : getRandomLine();
  }
}

function oButton() {
  if (inputValues.length > 0) {
    let resultElement = document.getElementById("result");
    if (resultElement.innerText === WELCOME_MESSAGE) {
      resultElement.innerText = isModeSingle()
        ? getRandomNonWhitespaceChar()
        : getRandomLine();
    } else {
      if (isModeSingle()) {
        let displayedLetter = resultElement.innerText;
        let index = inputValues.indexOf(displayedLetter);
        if (index !== -1) {
          inputValues.splice(index, 1);
          document.getElementById("input").value = inputValues.join("");
        }
        resultElement.innerText = getRandomNonWhitespaceChar();
      } else {
        inputValues.splice(previousIndex, 1);
        previousIndex = -1;
        document.getElementById("input").value = inputValues.join("\n");
        resultElement.innerText = getRandomLine();
      }
    }
  }
}

inputValue();
