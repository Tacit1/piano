// Create an audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to play a note
function playNote(frequency) {
    const oscillator = audioContext.createOscillator();
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = 'sine'; // You can change this to 'square', 'sawtooth', or 'triangle'
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5); // Stop after 0.5 seconds
}

// Map note names to frequencies (in Hz)
const notes = {
    "C4": 261.63,
    "C#4": 277.18,
    "D4": 293.66,
    "D#4": 311.13,
    "E4": 329.63,
    "F4": 349.23,
    "F#4": 369.99,
    "G4": 392.00,
    "G#4": 415.30,
    "A4": 440.00,
    "A#4": 466.16,
    "B4": 493.88
};

// Map keyboard keys to piano keys
const keyMap = {
    "a": "C4",
    "w": "C#4",
    "s": "D4",
    "e": "D#4",
    "d": "E4",
    "f": "F4",
    "t": "F#4",
    "g": "G4",
    "y": "G#4",
    "h": "A4",
    "u": "A#4",
    "j": "B4"
};

// Add click event listeners to keys
document.querySelectorAll('.key').forEach(key => {
    key.addEventListener('click', () => {
        const note = key.getAttribute('data-note');
        playNote(notes[note]);
        highlightKey(key);
    });
});

// Add keyboard event listeners
document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if (keyMap[key]) {
        const note = keyMap[key];
        playNote(notes[note]);
        const pianoKey = document.querySelector(`.key[data-note="${note}"]`);
        highlightKey(pianoKey);
    }
});

// Function to highlight the key
function highlightKey(key) {
    key.classList.add('active');
    setTimeout(() => {
        key.classList.remove('active');
    }, 200); // Remove highlight after 200ms
}