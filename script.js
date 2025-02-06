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

// Add click event listeners to keys
document.querySelectorAll('.key').forEach(key => {
    key.addEventListener('click', () => {
        const note = key.getAttribute('data-note');
        playNote(notes[note]);
    });
});