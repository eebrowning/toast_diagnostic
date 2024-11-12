// utils/logger.js
// Function to log events with a timestamp
export function logEvent(message) {
    const now = new Date();
    const timestamp = now.toISOString(); // Format: YYYY-MM-DDTHH:mm:ss.sssZ
    console.log(`[${timestamp}] ${message}`);
  }
  
  // Function to log the date range used for order fetching
  export function logDateRange(start, end, timeString) {
    logEvent(`Fetching orders from ${start} to ${end}, time: ${timeString}`);
  }
