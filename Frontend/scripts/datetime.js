function updateDateTime() {
    const now = new Date();
    const options = {
        weekday: 'short', // e.g., "Sun"
        year: 'numeric',  // e.g., "2025"
        month: 'short',   // e.g., "Mar"
        day: 'numeric',   // e.g., "23"
        hour: '2-digit',  // e.g., "12"
        minute: '2-digit', // e.g., "02"
        second: '2-digit', // e.g., "45"
        hour12: true      // 12-hour format with AM/PM
    };
    const dateTimeString = now.toLocaleString('en-US', options);
    document.getElementById('datetime').innerHTML = dateTimeString;
}

// Update immediately and then every second
updateDateTime();
setInterval(updateDateTime, 1000);