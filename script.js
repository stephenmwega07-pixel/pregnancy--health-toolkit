// Due Date Calculator Function
function calculateDueDate() {
    const lmpInput = document.getElementById('lmp').value;
    if (!lmpInput) {
        alert("Please select the first day of your last menstrual period.");
        return;
    }
    
    const lmpDate = new Date(lmpInput);
    // Add 280 days (40 weeks) to LMP
    const dueDate = new Date(lmpDate.setDate(lmpDate.getDate() + 280));
    
    document.getElementById('result').innerText = `Estimated Due Date: ${dueDate.toDateString()}`;
}document.getElementById('calc-weeks-btn').addEventListener('click', function() {
    const lmpValue = document.getElementById('lmp-input').value;
    
    if (!lmpValue) {
        document.getElementById('weeks-result').textContent = "Please select a valid date.";
        return;
    }

    const lmpDate = new Date(lmpValue);
    const today = new Date();
    
    // Calculate difference in days
    const diffTime = today - lmpDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
        document.getElementById('weeks-result').textContent = "The LMP date cannot be in the future.";
        return;
    }

    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;

    document.getElementById('weeks-result').textContent = 
        `Current Progress: ${weeks} weeks and ${days} days pregnant.`;
// --- Kick Counter Logic ---
let kickCount = 0;
let kickTimerInterval = null;
let secondsElapsed = 0;

const startKickBtn = document.getElementById('start-kick-btn');
const countKickBtn = document.getElementById('count-kick-btn');
const resetKickBtn = document.getElementById('reset-kick-btn');
const kickCountDisplay = document.getElementById('kick-count');
const kickTimerDisplay = document.getElementById('kick-timer');
const kickStatusMsg = document.getElementById('kick-status-msg');

function formatTimer(seconds) {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}

startKickBtn.addEventListener('click', function() {
    kickCount = 0;
    secondsElapsed = 0;
    kickCountDisplay.textContent = kickCount;
    kickTimerDisplay.textContent = formatTimer(secondsElapsed);
    kickStatusMsg.textContent = "Session started. Tap 'Count Kick' every time you feel a movement!";
    
    startKickBtn.disabled = true;
    countKickBtn.disabled = false;

    clearInterval(kickTimerInterval);
    kickTimerInterval = setInterval(() => {
        secondsElapsed++;
        kickTimerDisplay.textContent = formatTimer(secondsElapsed);
    }, 1000);
});

countKickBtn.addEventListener('click', function() {
    if (kickCount < 10) {
        kickCount++;
        kickCountDisplay.textContent = kickCount;
    }

    if (kickCount === 10) {
        clearInterval(kickTimerInterval);
        countKickBtn.disabled = true;
        startKickBtn.disabled = false;
        kickStatusMsg.textContent = `Target reached! 10 kicks recorded in ${formatTimer(secondsElapsed)}.`;
    }
});

resetKickBtn.addEventListener('click', function() {
    clearInterval(kickTimerInterval);
    kickCount = 0;
    secondsElapsed = 0;
    kickCountDisplay.textContent = '0';
    kickTimerDisplay.textContent = '00:00';
    kickStatusMsg.textContent = 'Counter reset.';
    startKickBtn.disabled = false;
    countKickBtn.disabled = true;
