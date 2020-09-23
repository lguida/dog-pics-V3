function getDogImage(breed) {
    console.log(breed);
    console.log(`https://dog.ceo/api/breed/${breed}/images/random`)
    urlToFetch = `https://dog.ceo/api/breed/${breed}/images/random`
    fetch(urlToFetch)
      //.catch (function(response){
      //  if (!response.ok){
      //    alert('No such breed. Try entering another.')
      //  }
      //})
      .then(response => response.json())
      .then((responseJson)=> {
        if (responseJson.status === "error" && responseJson.code === 404){
          throw Error(responseJson.message)
        }
        else{
          displayResults(responseJson)
        }
      })
      //.catch(response.code= => alert('No such breed. Try entering another.'))
      .catch(error => alert('Something went wrong. Maybe try a different breed'));
  }
  
  function displayResults(responseJson) {
    console.log(responseJson);
    //replace the existing image with the new one
    $('.results-img').replaceWith(
      `<img src="${responseJson.message}" class="results-img">`
    )
    //display the results section
    $('.results').removeClass('hidden');
    
  }
  
  function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const breedToFind = $(event.currentTarget).find('#photo-num').val(); 
      getDogImage(breedToFind);
    });
  }
  
  $(function() {
    console.log('App loaded! Waiting for submit!');
    watchForm();
  });