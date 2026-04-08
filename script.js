let alarmTime = null;

// Function to change the theme by swapping body classes
function changeTheme() {
    const theme = document.getElementById('themeSelector').value;
    // Clear existing theme classes
    document.body.className = '';
    // Apply the new theme class
    document.body.classList.add(theme);
}

// Function to handle clock updates, greeting, and alarm checks
function updateClock() {
    const now = new Date();
    const selectedZone = document.getElementById('timezoneSelector').value;
    
    // 1. Update Greeting
    const hours = now.getHours();
    let greet = "Good Evening";
    if (hours < 12) greet = "Good Morning";
    else if (hours < 18) greet = "Good Afternoon";
    document.getElementById('greeting').textContent = greet;

    // 2. Update Clock Display
    let options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    if (selectedZone !== "local") options.timeZone = selectedZone;
    document.getElementById('clock').textContent = now.toLocaleTimeString('en-US', options);

    // 3. Check Alarm
    if (alarmTime) {
        // Formats time to HH:MM to match the input value
        const current = now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0');
        if (current === alarmTime) {
            alert("⏰ ALARM! Your scheduled alert is going off.");
            alarmTime = null; // Clear alarm after it fires
            document.getElementById('alarm-status').textContent = "";
        }
    }
}

// Function to set the alarm from the input field
function setAlarm() {
    const input = document.getElementById('alarmTime').value;
    if (input) {
        alarmTime = input;
        document.getElementById('alarm-status').textContent = `Alarm set for: ${alarmTime}`;
    } else {
        alert("Please select a time first!");
    }
}

// Function to toggle Fullscreen mode
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

// Start the clock loop
setInterval(updateClock, 1000);
updateClock(); // Run immediately so there's no 1-second delay