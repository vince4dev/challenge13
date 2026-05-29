// ---=== VARIABLES ===---
const cursor = document.getElementById("cursor");
const cursorValue = document.getElementById("cursor-value");
const btnGenerate = document.querySelector(".btn__generate");
const checkUppercase = document.getElementById("check-upp");
const checkLowercase = document.getElementById("check-low");
const checkNumber = document.getElementById("check-num");
const checkSymbols = document.getElementById("check-sym");
const passwordValue = document.getElementById("password-value");
const copyButton = document.getElementById("copy-button");

// ---=== CHARACTERS SETS ===---
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numberCharacters = "0123456789";
const symbolCharacters = "!@#$%^&*()-_=+[]{}|;:,.<>?/";

// ---=== CURSOR (RANGE) ===---
// * Cursor Value
cursor.addEventListener("input", () => {
  cursorValue.textContent = cursor.value;
});
// * Color range track
function updateCursor() {
  const percent =
    ((cursor.value - cursor.min) / (cursor.max - cursor.min)) * 100;
  // on met la variable CSS sur l’élément <input>
  cursor.style.setProperty("--cursor-percentage", percent + "%");
}
cursor.addEventListener("input", updateCursor);
// initialisation
updateCursor();

// ---=== LISTENERS ===---
btnGenerate.addEventListener("click", createPassword);

// ---=== FUNCTIONS ===---
function createPassword() {
  // * Variables
  const length = Number(cursor.value);
  const includeUpp = checkUppercase.checked;
  const includeLow = checkLowercase.checked;
  const includeNum = checkNumber.checked;
  const includeSym = checkSymbols.checked;

  // * 1 - Warning message if no checkbox is checked
  if (!includeUpp && !includeLow && !includeNum && !includeSym) {
    alert("Please select at least one type of character");
  }

  const newPassword = createRandomPassword(
    length,
    includeUpp,
    includeLow,
    includeNum,
    includeSym,
  );
  // * 2 - Create the random password
  passwordValue.value = newPassword;

  // * 3 - Update the Srenght section
  updateStrength(newPassword);
}

function createRandomPassword(
  length,
  includeUpp,
  includeLow,
  includeNum,
  includeSym,
) {
  let allCharacters = "";
  if (includeUpp) allCharacters += uppercaseLetters;
  if (includeLow) allCharacters += lowercaseLetters;
  if (includeNum) allCharacters += numberCharacters;
  if (includeSym) allCharacters += symbolCharacters;

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allCharacters.length);
    password += allCharacters[randomIndex];
  }

  return password;
}

function updateStrength(password) {
  const passwordLength = password.length;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbols = /[!@#$%^&*()-_=+[\]{}|;:,.<>?]/.test(password);

  let strengthScore = 0;
  strengthScore += Math.min(passwordLength * 2, 40);

  if (hasUppercase) strengthScore += 15;
  if (hasLowercase) strengthScore += 15;
  if (hasNumber) strengthScore += 15;
  if (hasSymbols) strengthScore += 15;

  // * enforce minimum score for very short password
  if (passwordLength < 8) {
    strengthScore = Math.min(strengthScore, 40);
  }
}
