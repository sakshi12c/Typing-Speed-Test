Features

60-second typing test with countdown timer
Real-time WPM (Words Per Minute) calculation
Live accuracy tracking and error counting
Visual feedback (green for correct, red for incorrect characters)
Random paragraph selection from 10 different texts
Detailed results breakdown after test completion
Responsive design for all devices
Submit test early or let timer expire

Files

TypingSpeed.html - Main page with test interface and results screen
TypingSpeed.js - Test logic, timer, WPM calculation, and scoring
TypingSpeed.css - Styling, animations, and responsive layout

How to Use

Open TypingSpeed.html in a web browser
Click "Start Test" to begin
Type the displayed paragraph as accurately and quickly as possible
Watch real-time stats (WPM, Errors, Accuracy) update as you type
Test ends automatically after 60 seconds or click "Submit Test" to finish early
Review your detailed results
Click "Try Again" to take another test

Results Breakdown
After completing the test, you'll see:

Words Per Minute (WPM) - Your typing speed
Total Words Typed - Number of words you completed
Accuracy - Percentage of correctly typed characters
Correct Characters - Number of correctly typed characters
Total Errors - Number of typing mistakes
Time Spent - Actual time used
Correct Words - Number of perfectly typed words

Customization
Change Test Duration
Edit in TypingSpeed.js:
javascriptlet testDuration = 60;  // Change to desired seconds
Add More Paragraphs
Edit the paragraphs array in TypingSpeed.js:
javascriptconst paragraphs = [
    "Your custom paragraph here...",
    // Add more paragraphs
];
Modify Colors
Edit in TypingSpeed.css:
css.paragraph span.correct {
    background-color: #d4edda;  /* Correct character color */
}

.paragraph span.incorrect {
    background-color: #f8d7da;  /* Incorrect character color */
}
Installation

Download all three files
Place them in the same folder
Open TypingSpeed.html in any browser

Browser Compatibility
Works on Chrome, Firefox, Safari, Edge, and Opera.
