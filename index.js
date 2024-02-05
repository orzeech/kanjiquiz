let inputValues = [];

function inputValue(event) {
  if (event.keyCode === 13) {
    let inputText = document.getElementById("input").value.trim();
    let inputArray = inputText.split("");
    inputArray.forEach((char) => {
      inputValues.push(char);
    });
  }
}

let previousCharacter = "";

function getRandomNonWhitespaceChar(text) {
  let nonWhitespaceChars = text;
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
    return "";
  }
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
    let randomLetter = getRandomNonWhitespaceChar(inputValues.join(""));
    document.getElementById("result").innerText = randomLetter;
  }
}

function oButton() {
  if (inputValues.length > 0) {
    let resultElement = document.getElementById("result");
    if (resultElement.innerText === "") {
      let randomLetter = getRandomNonWhitespaceChar(inputValues.join(""));
      resultElement.innerText = randomLetter;
    } else {
      let displayedLetter = resultElement.innerText;
      let index = inputValues.indexOf(displayedLetter);
      if (index !== -1) {
        inputValues.splice(index, 1);
        document.getElementById("input").value = inputValues.join("");
      }
      let randomLetter = getRandomNonWhitespaceChar(inputValues.join(""));
      resultElement.innerText = randomLetter;
    }
  }
}
