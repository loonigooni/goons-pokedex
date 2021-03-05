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
    let pokemon = results.map((data) => ({
        name: data.name,
        id: data.id,
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
      <img class="card-img" src="${pokemen.image}"/>
      <h2 class="card-title">${pokemen.id}. ${pokemen.name}</h2>
      <p class="card-subtitle">Type: ${pokemen.type}</p>
    </li>
  `).join('');
  pokedex.innerHTML = pokeCard;
}
 
fetchPokemon();