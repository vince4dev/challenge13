// ---=== VARIABLES ===---
const cursor = document.getElementById("cursor");
const cursorValue = document.getElementById("cursor-value");
const btnGenerate = document.querySelector(".btn__generate");
const checkUppercase = document.getElementById("check-upp");
const checkLowercase = document.getElementById("check-low");
const checkNumber = document.getElementById("check-num");
const checkSymbols = document.getElementById("check-sym");
const passwordValue = document.getElementById("password-value");
const copyButton = document.getElementById("btn-copy");
const msgCopied = document.querySelector(".copied");
const strengthText = document.getElementById("strength-text");

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

// ---=== CREATE PASSWORD ===---
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
  } else {
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
    const score = updateStrength(newPassword);

    // * Update UI
    updateUI(score);
  }
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

// ---=== STRENGHT ===---
const bars = [
  document.getElementById("bar1"),
  document.getElementById("bar2"),
  document.getElementById("bar3"),
  document.getElementById("bar4"),
];

function updateStrength(password) {
  let score = 0;
  const len = password.length;

  // * Length (max 40 points)
  score += Math.min(len * 2, 40);

  // * Uppercase
  if (/[A-Z]/.test(password)) score += 10;

  // * Lowercase
  if (/[a-z]/.test(password)) score += 10;
  // * Numbers
  if (/[0-9]/.test(password)) score += 10;
  // * Symbols
  if (/[-!@#$%^&*()_+=\[\]{}|;:,.<>?]/.test(password)) score += 10;

  // * Length bonus
  if (len > 12) score += 10;
  if (len > 16) score += 10;

  console.log("len: ", score);

  return Math.min(score, 100);
}

function getLevel(score) {
  if (score <= 20) return { level: 0, label: "TOO WEAK!", color: "#F64A4A" };
  if (score <= 40) return { level: 1, label: "WEAK", color: "#FB7C58" };
  if (score <= 70) return { level: 2, label: "MEDIUM", color: "#F8CD65" };
  return { level: 3, label: "STRONG", color: "#A4FFAF" };
}

function updateUI(score) {
  const { level, label, color } = getLevel(score);
  strengthText.textContent = label;
  strengthText.style.color = color;

  bars.forEach((bar, i) => {
    bar.style.backgroundColor = i <= level ? color : "transparent";
    bar.style.borderColor = i <= level ? color : "#E6E5EA";
  });
}

// ---=== COPY TO CIPBOARD ===---
copyButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (!passwordValue.value) return;

  navigator.clipboard
    .writeText(passwordValue.value)
    .then(() => showCopySuccess())
    .catch((error) => console.log("Could not copy: ", error));
});

function showCopySuccess() {
  msgCopied.classList.add("active");

  setTimeout(() => {
    msgCopied.classList.remove("active");
  }, 1500);
}

// window.addEventListener("DOMContentLoaded", createPassword);
