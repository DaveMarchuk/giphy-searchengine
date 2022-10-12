import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import GifService from './js/gif-service';

// Business Logic
function getGif (searchResult)  {
    let promise = GifService.getGif(searchResult);
    promise.then(function(gifDataArray) {
      printElements(gifDataArray);
    }, function(errorArray) {
      printError(errorArray);
    });
}

//UI Logic
function printElements(data)  {
  data.map(function(image)  {
    document.getElementById('gifResult').setAttribute("src",image.images.downsized.url);
    document.getElementById("searchResultOutPut").innerText = `searchResult: ${image.images.downsized.url}}`;
  });
}

function printError(error)  {
   document.getElementById("searchResultOutPut").innerText = `There was an error finding the GIF you want for ${error[2]}: ${error[0].status} ${error[0].statusText} ${error[1].message}`;
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
