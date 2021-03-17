//find the <ol> in the html and set to pokedex
let pokedex = document.getElementById("pokedex");
var loading = true;

function fetchPokemon() {
  let promises = [];
  let maxPokemon = 494;
  //loop through all 898 pokemon and push into promise array
  for (let i = 1; i <= maxPokemon; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          // console.log("Success:", data);
          return data;
        })
        .catch((error) => {
          console.error("Error:", error);
        })
    );
  }
  //load all pokemon simultaneously
  Promise.all(promises).then((results) => {
    // console.log("results", results);

    let pokeList = [];
    let pokeName = [];

    results.map(function (data) {
      if (!data) {
        console.log("no result");
      } else {
        let pokemon = {
          name: data.species.name,
          id: data.id,
          hp: data.stats[0].base_stat,
          image: data.sprites["front_default"],
          type: data.types.map((type) => type.type.name).join(", "),
          height: data.height / 10,
          weight: data.weight / 10,
        };
        pokeList.push(pokemon);
        pokeName.push(pokemon.name);

        // console.log(pokeName);
        // console.log("pokeList", pokeList);
        autoCompletePokemon(pokeName);
        displayPokemon(pokeList);
      }
    });
    loading = false;
    loader();
    console.log('hello', loading);
  });
}

function displayPokemon(pokemon) {
  // console.log(pokemon);
  //adding <br /> makes css easier
  let pokeCard = pokemon
    .map(
      (pokemen) => `
    <li class="card" id="${pokemen.name}">
      <h2 class="card-title">${pokemen.id}. ${pokemen.name}</h2>
      <h2 class="card-hp">HP ${pokemen.hp}</h2><br />
      <img class="card-img" src="${pokemen.image}"/><br />
      <p class="card-subtitle">Type: ${pokemen.type}</p>
      <p class="card-subtitle-r"> ${pokemen.height}m | ${pokemen.weight}kg</p>
    </li>
  `
    )
    .join("");
  //returns as a string and place in innerHTML
  pokedex.innerHTML = pokeCard;
}

function loader() {
  if (loading) {
    $('.loader').show()
  }
  else {
    $('.loader').hide()
  }
  console.log(loading);
}

//search does not work yet
function searchPokemon() {
  $("#form").submit((event) => {
    event.preventDefault();
    let searchResult = $('input[type="text"]').val();
    console.log(searchResult)
    $('html, body').animate({scrollTop:$(`#${searchResult}`).offset().top}, 'slow');
    $('.card').removeClass('highlight');
    $(`#${searchResult}`).addClass('highlight');
    
  });
}

function autoCompletePokemon(list) {
  $('#search').autocomplete({
    source: list
  });

}
loader();
fetchPokemon();
searchPokemon();