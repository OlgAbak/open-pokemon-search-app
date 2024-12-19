let searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const allValidPokemon = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon';
const pokemonGenProp = document.getElementById('pokemon-gen-prop');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const pokemonWeight = document.getElementById('weight');
const pokemonHeight = document.getElementById('height');
let pokemonTypes = document.getElementById('types');
let statsHp = document.getElementById('stats-hp');
let statsAttack = document.getElementById('stats-attack'); 
let statsDefense = document.getElementById('stats-defense');
let statsSpAttack = document.getElementById('stats-special-attack');
let statsSpDefense = document.getElementById('stats-special-defense');
let statsSpeed = document.getElementById('stats-speed');
const pokemonBtnColorArr = 
     [{
          type: 'normal',
          color: '#AFB7C2',
        },

        {
          type: 'fighting',
          color: '#FF8247',
        },

        {
          type: 'flying',
          color: '#52B1FF',
        },

        {
          type: 'poison',
          color: '#A334D9',
        },

        {
          type: 'ground',
          color: '#692216',
        },

        {
          type: 'rock',
          color: '#736554',
        },

        {
          type: 'bug',
          color: '#8DA14E',
        },

        {
          type: 'ghost',
          color: '#570A24',
        },

        {
          type: 'steel',
          color: '#4D9FF0',
        },

        {
          type: 'fire',
          color: '#FF3622',
        },

        {
          type: 'water',
          color: '#4976FF',
        },

        {
          type: 'grass',
          color: '#2FAB2B',
        },

        {
          type: 'electric',
          color: '#FFB917',
        },

        {
          type: 'psychic',
          color: '#CF5F7E',
        },

        {
          type: 'ice',
          color: '#5CDCE6',
        },

        {
          type: 'dragon',
          color: '#2F4CDE',
        },

        {
          type: 'dark',
          color: '#57360F',
        },

        {
          type: 'fairy',
          color: '#E828F0',
        },

        {
          type: 'stellar',
          color: '#37C796',
        },

        {
          type: 'unknown',
          color: '#52AB7B',
        }
      ]

const pokemonSearch = async() => {
  let resultArr = [];
  let searchTerm = searchInput.value;
  
  try {
    
    const res = await fetch(allValidPokemon);
    const data = await res.json();
    const{results} = data;
    resultArr = results;
    
    let pokemonNameSearch = resultArr.find(result => result.name === searchTerm.toLowerCase());

    let pokemonIdSearch = resultArr.find(result => result.id === Number(searchTerm));
  
    let pokemonObj = {};
    let pokemonUrl = {};
    let pokemonDataObj = {};
    
    if  (pokemonNameSearch || pokemonIdSearch) {

      pokemonObj = pokemonIdSearch || pokemonNameSearch;
      const{url} = pokemonObj;
      pokemonUrl = url;
      fetch(pokemonUrl).then((res) => res.json()).then((data) => {
        
        pokemonDataObj = data;
        displayPokemonData(pokemonDataObj);
        
      })
    } else {
      alert('Pokémon not found');
    } 
  
  }

 catch(err) {
      console.log(err);
  }

};

const displayPokemonData = (pokemonDataObj) => {
    
    const{height, id, name, sprites, stats, types, weight} = pokemonDataObj;
    const{front_default} = sprites;
    let pokemonStatsArr = stats;
    let pokemonTypesArr = types;
    

    pokemonName.innerHTML = `${name.toUpperCase()}`;
    pokemonId.innerHTML = `#${id}`;
    pokemonWeight.innerHTML = `Weight: ${weight}`;
    pokemonHeight.innerHTML = `Height: ${height}`; 

    createElement(front_default);
    changeImage(front_default);
    pokemonType(pokemonTypesArr);
    pokemonDataStats(pokemonStatsArr);
};   

const createElement = (front_default) => {
    front_default = '';
    let img = document.createElement('img');
    
    img.id = 'sprite';
    img.src = `${front_default}`;
    pokemonGenProp.appendChild(img);
    
};

const changeImage = (front_default) => {
  
  let imgChanged = document.getElementById('sprite');
  imgChanged.src = `${front_default}`;
  
};
      
const pokemonType = (pokemonTypesArr) => 
    { 
    
pokemonTypes.innerHTML = '';

    for (let i = 0; i < pokemonBtnColorArr.length; i++) {
            let pokemonNameBtnType = pokemonBtnColorArr[i].type.toUpperCase();
            let pokemonNameBtnColor = pokemonBtnColorArr[i].color;
            
      for (let j = 0; j < pokemonTypesArr.length; j++) {
        let pokemonNameSlot = pokemonTypesArr[j].slot;
        let pokemonName = pokemonTypesArr[j].type.name.toUpperCase();
        
        if (pokemonNameSlot < 2 && pokemonName === pokemonNameBtnType) {
          
          pokemonTypes.innerHTML+=   
        `
       <button id='pokemon-type-btn-1' type='button'>
        ${pokemonName}
        </button>
        <style> 
      button#pokemon-type-btn-1 {background-color: ${pokemonNameBtnColor};}
        </style>`;} 
        
        else {
          
        if (pokemonNameSlot === 2 && pokemonName === pokemonNameBtnType) {
          
          pokemonTypes.innerHTML += 
        `<button id='pokemon-type-btn-2' type='button'>
        ${pokemonName}
        </button>
        <style> 
      button#pokemon-type-btn-2 {background-color: ${pokemonNameBtnColor};}
        </style> `;}
    }
    }
  }
};

const pokemonDataStats = (pokemonStatsArr) => {

  statsHp.textContent = `${pokemonStatsArr[0].base_stat}`;

   statsAttack.textContent = `  ${pokemonStatsArr[1].base_stat}`;

    statsDefense.textContent = `${pokemonStatsArr[2].base_stat}`;

    statsSpAttack.textContent = `  
    ${pokemonStatsArr[3].base_stat}`;

    statsSpDefense.textContent = `
    ${pokemonStatsArr[4].base_stat}`;

    statsSpeed.textContent = `${pokemonStatsArr[5].base_stat}`;

  };

searchButton.addEventListener('click', pokemonSearch);