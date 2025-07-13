function calculateAttendance() {
    const elements = {
        totalClasses: document.getElementById('totalClasses'),
        attendedClasses: document.getElementById('attendedClasses'),
        targetPercentage: document.getElementById('targetPercentage'),
        result: document.getElementById('result'),
        error: document.getElementById('error'),
        progressCircle: document.getElementById('progressCircle'),
        progressText: document.getElementById('progressText')
    };

    // Reset displays
    elements.result.style.display = 'none';
    elements.error.style.display = 'none';
    elements.progressCircle.style.strokeDashoffset = 314;
    elements.progressText.textContent = '0%';

    // Get input values
    const totalClasses = parseInt(elements.totalClasses.value);
    const attendedClasses = parseInt(elements.attendedClasses.value);
    const targetPercentage = parseFloat(elements.targetPercentage.value);

    // Validate inputs
    if (isNaN(totalClasses) || isNaN(attendedClasses) || isNaN(targetPercentage)) {
        elements.error.textContent = 'Please fill in all fields.';
        elements.error.style.display = 'block';
        return;
    }
    if (totalClasses < 0 || attendedClasses < 0 || targetPercentage < 0) {
        elements.error.textContent = 'Inputs cannot be negative.';
        elements.error.style.display = 'block';
        return;
    }
    if (attendedClasses > totalClasses) {
        elements.error.textContent = 'Attended classes cannot exceed total classes.';
        elements.error.style.display = 'block';
        return;
    }
    if (targetPercentage > 100) {
        elements.error.textContent = 'Target percentage cannot exceed 100%.';
        elements.error.style.display = 'block';
        return;
    }

    // Calculate current percentage
    const currentPercentage = (attendedClasses / totalClasses) * 100;
    let resultText = `Current Attendance: ${currentPercentage.toFixed(1)}%`;

    // Calculate additional classes needed
    if (currentPercentage < targetPercentage) {
        const additionalClasses = Math.ceil(
            (targetPercentage * totalClasses - 100 * attendedClasses) / (100 - targetPercentage)
        );
        if (additionalClasses >= 0) {
            resultText += `<br>Attend ${additionalClasses} more class${additionalClasses === 1 ? '' : 'es'} to reach ${targetPercentage}%!`;
        } else {
            elements.error.textContent = 'Target is not achievable.';
            elements.error.style.display = 'block';
            return;
        }
    } else {
        resultText += `<br>You've hit or passed ${targetPercentage}%! 🎉`;
    }

    // Update result and progress ring
    elements.result.innerHTML = resultText;
    elements.result.style.display = 'block';
    elements.progressText.textContent = `${currentPercentage.toFixed(1)}%`;
    elements.progressCircle.style.strokeDashoffset = 314 - (314 * currentPercentage / 100);
}

function shareCalculator() {
    const result = document.getElementById('result').textContent;
    if (navigator.share && result) {
        navigator.share({
            title: 'My Attendance Goal',
            text: `Check out my attendance: ${result}`,
            url: window.location.href
        }).catch(console.error);
    } else {
        alert('Sharing not supported. Copy the link to share!');
    }
}