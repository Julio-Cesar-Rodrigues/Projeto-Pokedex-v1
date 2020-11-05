const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}` //puxa as infos dos pokemons da api
    
const generatePokemonPromises = () => 
        Array(151).fill().map((_,index) =>  //faz um array com os 151 pokemons
            fetch(getPokemonUrl(index + 1)) //faz a contagem ate dar os 151
                .then(response => response.json())
        );
    
const generateHTML = pokemons =>  pokemons.reduce((accumulator,  {name, id, types}) => {
        const elementTypes = types.map(typeInfo => typeInfo.type.name); //recebe os elementos necessarios para mostrar as infos

        accumulator += ` 
        <li class="card  ${elementTypes[0]}"> 
            <h2 class="card-title">${id}. ${name}</h2>
            <img class="card-image" alt="${name}"  
            src="https://pokeres.bastionbot.org/images/pokemon/${id}.png"/>
            <p class="card-subtitle">
            ${elementTypes.join(' | ')}</p>
        </li>`;
        return accumulator;
    },'');

const insertPokemonsIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]');
    ul.innerHTML = pokemons;
}

const pokemonPromises = generatePokemonPromises();

Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemonsIntoPage);
