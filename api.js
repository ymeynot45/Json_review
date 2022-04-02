const cats = () => {
  const img = document.querySelector('img')
  fetch('https://api.giphy.com/v1/gifs/translate?api_key=bb2006d9d3454578be1a99cfad65913d&s=cat', {mode: 'cors'})
    .then(function(response) {
      return response.json()
    })
    .then(function(response) {
      img.src = response.data.images.original.url
    })
    .catch(e => {
      console.log(e)
    })
}

async function bats() {

  // let promise = new Promise((resolve, reject) => {
  //   setTimeout(() => resolve("done!"), 1000)
  // });

  // let result = await promise; // wait until the promise resolves (*)

  // alert(result); // "done!"

  class HttpError extends Error {
    constructor(response) {
      super(`${response.status} for ${response.url}`);
      this.name = 'HttpError';
      this.response = response;
    }
  }
  
  async function loadJson(url) {
    let response = await fetch(url)
    if (response.status == 200) {
      return response.json()
    } else {
        throw new HttpError(response)
      }
    }
  }
  
  // Ask for a user name until github returns a valid user
  async function demoGithubUser() {
    let user
    while(true) {
    let name = prompt("Enter a name?", "ymeynot45");
  
    return loadJson(`https://api.github.com/users/${name}`)
      (user => {
        alert(`Full name: ${user.name}.`);
        return user;
      })
      .catch(err => {
        if (err instanceof HttpError && err.response.status == 404) {
          alert("No such user, please reenter.");
          return demoGithubUser();
        } else {
          throw err;
        }
      });
  }
  
  demoGithubUser();
}

bats();


window.onload=function() {
  let myButton = document.getElementById("catbutton");
  myButton.addEventListener('click', cats);
}