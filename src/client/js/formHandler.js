function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
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
        console.log(res);
        // document.getElementById('results').innerHTML = `Polarity is ${polarity(res.score_tag)}`;
        document.getElementById('results').innerHTML = res.subjectivity;
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
