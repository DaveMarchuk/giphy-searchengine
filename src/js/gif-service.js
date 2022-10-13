export default class GifService {
  static getGif(searchResult) {
    return new Promise(function(resolve,reject) {
      let request = new XMLHttpRequest();
      const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${searchResult}&limit=5&offset=0&rating=pg&lang=en`;
      request.addEventListener("loadend", function()  {
        const response = JSON.parse(this.responseText);
        if  (this.status === 200) {
          resolve([response, searchResult]);
        } else  {
          reject([this, response, searchResult]);
        }
      });
      request.open("GET", url, true);
      request.send();
    });
  }
}
