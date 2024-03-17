const logAllText = (className) => {
    let allText = '';
    const allElements = document.querySelectorAll(`.${className} *`);
    allElements.forEach(element => {
        if (element.textContent.trim() !== '') {
            const elementInfo = `${element.textContent.trim()}`;
            if (element.tagName === 'BUTTON') {
                const rect = element.getBoundingClientRect();
                const positionInfo = describePosition(rect);
                allText += `${elementInfo}\n${positionInfo}\n\n`;
            } else {
                allText += `${elementInfo}\n`;
            }
        }
    });
    return allText;
};

const describePosition = (rect) => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const buttonX = rect.left + rect.width / 2;
    const buttonY = rect.top + rect.height / 2;

    let positionInfo = "Position: ";
    if (buttonX < viewportWidth / 3) {
        positionInfo += "to the left";
    } else if (buttonX > (2 * viewportWidth) / 3) {
        positionInfo += "to the right";
    } else {
        positionInfo += "in the center";
    }

    if (buttonY < viewportHeight / 3) {
        positionInfo += " and above";
    } else if (buttonY > (2 * viewportHeight) / 3) {
        positionInfo += " and below";
    } else {
        positionInfo += " and in the middle";
    }

    return positionInfo;
};

const handleSpeak = (className) => {
    const allText = logAllText(className);
    console.log(allText)
    if (allText !== '' && window.speechSynthesis) {
        var utter = new window.SpeechSynthesisUtterance(allText);
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utter);
    } else {
        console.error("Speech synthesis is not supported in this browser.");
    }
};

const Speak = (text) => {
    if (text !== '' && window.speechSynthesis) {
        var utter = new window.SpeechSynthesisUtterance(text);
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utter);
    } else {
        console.error("Speech synthesis is not supported in this browser or the provided text is empty.");
    }
};

export { handleSpeak, Speak };
