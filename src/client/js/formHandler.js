function handleSubmit(event) {
    event.preventDefault()

    document.getElementById('results-section').style.display = 'none';
    // check what text was put into the form field
    let formText = document.getElementById('name').value;
    if (formText=="") {
        alert("No URL provided");
        return;
    }
    Client.checkForName(formText) // added Client reference as described in 4.2

    // fetch('http://localhost:8081/test')
    fetch('http://localhost:8081/sentiment', {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({formText: formText})
    })
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('results-polarity').innerHTML = `Polarity: ${polarity(res.score_tag)}`;
        document.getElementById('results-irony').innerHTML = `Irony: ${res.irony}`;
        document.getElementById('results-subjectivity').innerHTML = `Subjectivity: ${res.subjectivity}`;
        document.getElementById('results-confidence').innerHTML = `Confidence: ${res.confidence}%`;
        document.getElementById('results-section').style.display = 'inline';
        console.log(res); // remove later
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
