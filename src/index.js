import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// Business Logic
process.env.API_KEY;
function getGif (searchResult){
    let request = new XMLHttpRequest();
    console.log(searchResult);
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${searchResult}&limit=1&offset=0&rating=pg&lang=en`;

  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    let data = response.data;
    if (this.status === 200) {
      data.map(function(image)  {
         console.log(image.images.downsized.url);
       });
      printElements(response,searchResult);
    } else{
     printError(this.response,searchResult);
    }
});
  
request.open("GET",url,true);
request.send();
}

//UI Logic

function printElements(apiResponse,searchResult){
  document.getElementById('gifResult').setAttribute("src",apiResponse.data[Math.floor(Math.random())].images.downsized.url);
  document.getElementById("searchResultOutPut").innerText = `searchResult: ${searchResult}`;
}

function printError(request, apiResponse, searchResult)  {
   document.getElementById("searchResultOutPut").innerText = `There was an error finding the GIF you want for ${searchResult}: ${request.status} ${request.statusText} ${apiResponse.message}`;
}

function handleSubmission(event){
  event.preventDefault();
  const searchResult = document.getElementById("searchResult").value;
  console.log(searchResult);
  document.getElementById('searchResult').value = null;
  console.log(searchResult);
  getGif(searchResult);
}

window.addEventListener("load", function(){
  document.querySelector('form#search').addEventListener("submit",handleSubmission);
});
