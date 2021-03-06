let pokedex = document.getElementById('pokedex');

function fetchPokemon() {   
 
  let promises = [];
  for (let i = 1; i <= 898; i++) {   
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url)
    .then((res) => res.json()));
  }
  Promise.all(promises)
    .then( results => {
      console.log(results);
    let pokemon = results.map((data) => ({
        name: data.species.name,
        id: data.id,
        hp: data.stats[0].base_stat,
        image: data.sprites['front_default'],
        type: data.types.map(type => type.type.name).join(", ")
      }));
      displayPokemon(pokemon);
    });
};

function displayPokemon(pokemon) {
  console.log(pokemon);
  let pokeCard = pokemon.map( pokemen => `
    <li class="card">
      <h2 class="card-title">${pokemen.id}. ${pokemen.name}</h2>
      <h2 class="card-hp">HP ${pokemen.hp}</h2><br />
      <img class="card-img" src="${pokemen.image}"/>
      <p class="card-subtitle">Type: ${pokemen.type}</p>
    </li>
  `).join('');
  pokedex.innerHTML = pokeCard;
}

function highlightCard() {
  $('#form').submit(event => {
    event.preventDefault();
    let searchResult = $('input[type="text"]').val()
  });
}

 
fetchPokemon();