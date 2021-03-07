//find the <ol> in the html and set to pokedex
let pokedex = document.getElementById('pokedex');

function fetchPokemon() {   

  let promises = [];
  //loop through all 898 pokemon and push into promise array
  for (let i = 1; i <= 898; i++) {   
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push
    (fetch(url)
      .then((res) => res.json()));
  }
  //load all pokemon simultaneously
  Promise.all(promises)
    .then( results => {
      console.log(results);
      //only collect data wanted displayed
      let pokemon = results.map((data) => ({
        name: data.species.name,
        id: data.id,
        hp: data.stats[0].base_stat,
        image: data.sprites['front_default'],
        type: data.types.map(type => type.type.name).join(", "),
        height: data.height /10,
        weight: data.weight /10,
      }));
      displayPokemon(pokemon);
    });
};

function displayPokemon(pokemon) {
  console.log(pokemon);
  //adding <br /> makes css easier
  let pokeCard = pokemon.map( pokemen => `
    <li class="card" id="${pokemen.name}">
      <h2 class="card-title">${pokemen.id}. ${pokemen.name}</h2>
      <h2 class="card-hp">HP ${pokemen.hp}</h2><br />
      <img class="card-img" src="${pokemen.image}"/><br />
      <p class="card-subtitle">Type: ${pokemen.type}</p>
      <p class="card-subtitle-r"> ${pokemen.height}m | ${pokemen.weight}kg</p>
    </li>
  `).join('');
  //returns as a string and place in innerHTML 
  pokedex.innerHTML = pokeCard;
}

//search does not work yet
function searchPokemon(pokemon) {
  $('#form').submit(event => {
    event.preventDefault();
    let searchResult = $('input[type="text"]').val();
  });
}

 
fetchPokemon();