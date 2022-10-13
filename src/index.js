import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import GifService from './js/gif-service';

// Business Logic
function getGif(searchResult)  {
    let promise = GifService.getGif(searchResult);
    promise.then(function(gifDataArray) {
      printElements(gifDataArray);
    }, function(errorArray) {
      printError(errorArray);
    });
}

//UI Logic
function printElements(gifData)  {
  console.log("You hit 200");
  console.log(gifData[0].url);
  document.getElementById('gifResult').setAttribute("src", gifData[0].url);
  document.getElementById("searchResultOutPut").innerText = `Your Results for: ${gifData[1]}`;
}

function printError(error)  {
   document.getElementById("searchResultOutPut").innerText = `There was an error finding the GIF you want for ${error[2]}: ${error[0].status} ${error[0].statusText} ${error[1].message}`;
}

function handleSubmission(event){
  event.preventDefault();
  const searchResult = document.getElementById("searchResult").value;
  document.getElementById('searchResult').value = null;
  getGif(searchResult);
}

window.addEventListener("load", function(){
  document.querySelector('form#search').addEventListener("submit",handleSubmission);
});
