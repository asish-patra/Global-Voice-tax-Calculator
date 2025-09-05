/* ===== Voice Calculator App ===== */

// Elements
const micBtn = document.getElementById("micBtn");
const resultBox = document.getElementById("result");
const translationBox = document.getElementById("translation");

// Check if browser supports Speech Recognition
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!window.SpeechRecognition) {
    alert("Your browser does not support Speech Recognition. Please use Chrome.");
}

const recognition = new SpeechRecognition();
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// Start voice input
micBtn.addEventListener("click", () => {
    resultBox.innerText = "Listening...";
    recognition.start();
});

// On voice result
recognition.addEventListener("result", (event) => {
    const transcript = event.results[0][0].transcript;
    resultBox.innerText = `You said: ${transcript}`;
    
    // Perform calculation if numbers detected
    const calcResult = performCalculation(transcript);
    if (calcResult !== null) {
        resultBox.innerText += `\nResult: ${calcResult}`;
    }

    // Mock translation (replace with API call)
    translateText(transcript, "es"); // Translate to Spanish
});

// Simple calculator logic
function performCalculation(input) {
    try {
        const mathExpr = input.replace(/plus/gi, "+")
                              .replace(/minus/gi, "-")
                              .replace(/times|multiply|multiplied by/gi, "*")
                              .replace(/divided by|over/gi, "/");
        if (/[\d+\-*/]/.test(mathExpr)) {
            return eval(mathExpr);
        }
    } catch (err) {
        console.error("Calculation error:", err);
    }
    return null;
}

// Mock translation function
function translateText(text, targetLang) {
    // This is a placeholder; replace with Google Translate API
    const mockTranslations = {
        "Hello": "Hola",
        "How are you": "Cómo estás"
    };
    translationBox.innerText = `Translation (${targetLang}): ${mockTranslations[text] || "..."}`;
}
