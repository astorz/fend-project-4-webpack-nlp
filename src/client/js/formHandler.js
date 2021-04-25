function handleSubmit(event) {
    event.preventDefault()

    document.getElementById('results-section').style.display = 'none';

    let formText = document.getElementById('name').value;
    if (formText=="") {
        alert("No URL provided");
        return;
    }
    if (!Client.validURL(formText)) {
        alert("Not a valid URL!");
        return;
    }

    fetch('http://localhost:8081/sentiment', {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({formText: formText})
    })
    .then(res => res.json())
    .then(function(res) {
        if (res.status.code=='212') {
            alert("Sorry, we cannot analyze this article at this time. Please supply another URL");
            return;
        }
        document.getElementById('results-polarity').innerHTML = `Polarity: ${polarity(res.score_tag)}`;
        document.getElementById('results-irony').innerHTML = `Irony: ${res.irony}`;
        document.getElementById('results-subjectivity').innerHTML = `Subjectivity: ${res.subjectivity}`;
        document.getElementById('results-confidence').innerHTML = `Confidence: ${res.confidence}%`;
        document.getElementById('results-section').style.display = 'inline';
    })
};

function polarity(score_tag) {
    const polarities = {
        "P+": "strong positive", 
        "P": "positive",
        "NEU": "neutral",
        "N": "negative",
        "N+": "strong negative",
        "NONE": "without sentiment"
    };
    return polarities[score_tag];
};

export { handleSubmit }
export { polarity } 
// Do I need to export helper functions? I.e., polarity?
