const form = document.querySelector('form');

// add event listener onto form and submit button
const formEvent = form.addEventListener('submit', event => {
    // prevent page reload
    event.preventDefault();
    // get the value from input
    const url = document.querySelector('#url').value;
    // pass input to method that does api call
    getUrl(url);
});

async function getUrl(url) {
    // make api call
    const senddata = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`)
    // convert results to json and into object we can get into
    const stringify = await senddata.json();
    // return the  new shortened url for UI
    return stringify.result.full_short_link
    
}