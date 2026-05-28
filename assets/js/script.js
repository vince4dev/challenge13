// ---=== CURSOR (RANGE) ===---
const cursor = document.getElementById("cursor");
const cursorValue = document.getElementById("cursor-value");

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
