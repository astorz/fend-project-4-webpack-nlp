function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText) // added Client reference as described in 4.2

    // console.log("::: Form Submitted :::")

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
        document.getElementById('results').innerHTML = res.score_tag;
    })
}

export { handleSubmit }
