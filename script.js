const form = document.querySelector('form');
const error = document.getElementById('error-message');
        error.style.display = "none";

let resultSet = 0;

function counter() {
    resultSet = resultSet + 1;
    return resultSet
}
// add event listener onto form and submit button
const formEvent = form.addEventListener('submit', event => {
    // prevent page reload
    event.preventDefault();
    // get the value from input
    const url = document.querySelector('#url').value;

    if(url.trim().length == 0){
        const error = document.getElementById('error-message');
        const errorborder = document.getElementById('url');
        errorborder.style.border = "1px solid red";
        error.style.display = "block";
    }
    else {
        const error = document.getElementById('error-message');
        error.style.display = "none";
        const errorborder = document.getElementById('url');
        errorborder.style.border = "0";
        // pass input to method that does api call
        const index = counter();
        addUrlCard(url, index);
        getUrl(url, index);
    }

});

function addUrlCard (url, index) {
    // create a new div element
    const newDiv = document.createElement("div");
    const tag = document.createElement("p");
    const shortUrl = document.createElement("p");
    const button = document.createElement("button");
    
    // and give it some content
    const newContent = document.createTextNode(url);
    const newUrl = document.createTextNode('One sec...');
    const buttonTxt = document.createTextNode('Copy');
  
    // add the text node to the newly created div
    tag.appendChild(newContent);
    shortUrl.appendChild(newUrl);
    button.appendChild(buttonTxt);
    newDiv.appendChild(tag);
    newDiv.appendChild(shortUrl);
    newDiv.appendChild(button);

    newDiv.classList.add("card-" + index);
    newDiv.classList.add("w-100");
    newDiv.classList.add("d-flex");
    newDiv.classList.add("align-items-center");
    newDiv.style.padding = "1rem";
    newDiv.style.marginTop = "1rem";
    newDiv.style.backgroundColor = "white";
    newDiv.style.border = "0";
    newDiv.style.borderRadius = "5px";
    newDiv.style.padding = "1rem 2.5rem";
    button.classList.add("btn");
    button.classList.add("font-normal");
    button.style.backgroundColor = "hsl(180, 66%, 49%)";
    button.style.color = "white";
    shortUrl.id="fill-in-url-" + index;
    tag.style.width = "55%";
    tag.classList.add("mb-0");
    tag.classList.add("font-normal");
    tag.style.textAlign = "left";
    shortUrl.style.width = "35%";
    shortUrl.style.color = "black";
    shortUrl.classList.add("mb-0");
    shortUrl.classList.add("font-normal");
    button.style.width = "10%";
    button.style.float = "right";
    button.id ="copy-button-" + index;
    button.disabled = true;
    form.reset();
    //button.addEventListener("mouseenter", function( event ) { button.style.backgroundColor = "hsl(255, 11%, 22%)";});
    //button.addEventListener("mouseleave", function( event ) { button.style.backgroundColor = "hsl(180, 66%, 49%)";});
  
    // add the newly created element and its content into the DOM
    const currentDiv = document.getElementById("url-cards");
    currentDiv.parentNode.insertBefore(newDiv, currentDiv);
  }

async function getUrl(url, index) {
    // make api call
    const senddata = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`)
    // convert results to json and into object we can get into
    const stringify = await senddata.json();
    // return the  new shortened url for UI
    const shortened = document.getElementById('fill-in-url-' + index);
    shortened.style.color = "hsl(180, 66%, 49%)";
    shortened.innerHTML = stringify.result.full_short_link;
    const button = document.getElementById('copy-button-' + index);
    button.disabled = false;

    button.addEventListener("click", function( event ) { 
        navigator.clipboard.writeText(stringify.result.full_short_link);
        console.log(stringify.result.full_short_link);
        //button.removeEventListener("mouseenter", function(){});
        //button.removeEventListener("mouseleave", function(){});
        button.innerHTML = 'Copied!';
    });
    button.style.backgroundColor = "hsl(180, 66%, 49%)";

    return stringify.result.full_short_link
    
}