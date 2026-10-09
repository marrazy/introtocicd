import { fizzbuzz } from "./fizzbuzz.js";
const PROMPT = "Enter a number (0 to quit): ";
// Grab an element by id, or fail loudly if index.html is missing it.
function el(id) {
    const node = document.getElementById(id);
    if (!node)
        throw new Error(`Missing element #${id}`);
    return node;
}
const terminal = el("terminal");
const screen = el("screen");
const form = el("input-line");
const input = el("input");
const prompt = el("prompt");
const runButton = el("run");
let running = false;
// Add one line of output, like print() does.
function print(text) {
    const line = document.createElement("div");
    line.textContent = text;
    screen.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
}
// Start (or restart) the script.
function start() {
    running = true;
    screen.replaceChildren();
    runButton.hidden = true;
    form.hidden = false;
    prompt.textContent = PROMPT;
    input.value = "";
    input.focus();
}
// The script has exited: hide the input, offer the Run button.
function exit() {
    running = false;
    form.hidden = true;
    runButton.hidden = false;
    runButton.focus();
}
// Python's int() would crash on "abc". Here we say so and ask again.
function parseWholeNumber(text) {
    if (!/^[+-]?\d+$/.test(text.trim()))
        return null;
    const n = Number(text);
    return Number.isSafeInteger(n) ? n : null;
}
form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!running)
        return;
    const raw = input.value;
    input.value = "";
    print(PROMPT + raw); // echo what was typed, like a real terminal
    const n = parseWholeNumber(raw);
    if (n === null) {
        print("Please enter a whole number.");
    }
    else if (n === 0) {
        print("Goodbye!");
        exit();
    }
    else {
        print(fizzbuzz(n));
    }
});
runButton.addEventListener("click", start);
// Clicking the black area focuses the input, unless you're selecting text.
terminal.addEventListener("click", () => {
    if (running && !window.getSelection()?.toString())
        input.focus();
});
start();
