// RANGE
const cursor = document.getElementById("cursor");
const cursorValue = document.getElementById("cursor-value");

cursor.addEventListener("input", () => {
  cursorValue.textContent = cursor.value;
});
