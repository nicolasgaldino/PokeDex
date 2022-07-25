const pokeName = document.querySelector(".pokeName");
const pokeNumber = document.querySelector(".pokeNumber");
const pokeImg = document.querySelector(".pokeImg");
const frstAttck = document.querySelector(".frstAttck");
const scndAttck = document.querySelector(".scndAttck");
const pokeType = document.querySelector(".pokeType");
const pokeForm = document.querySelector(".pokeForm")
const pokeInput = document.querySelector(".pokeInput");
const prevBtn = document.querySelector(".prevBtn");
const nextBtn = document.querySelector(".nextBtn");
const spinnerContainer = document.querySelector(".spinnerContainer");
let searchPokemon = 1;

const fetchPokeAPI = async (pokemon) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  const APIResponse = await fetch(url)
    .then((response) => response.json())
    .catch((err) => console.log(err));
  return (APIResponse);
};

const renderPokemon = async (pokemon) => {
  spinnerContainer.style.display = "block";
  pokeImg.style.display = "none";
  const responseFetch = await fetchPokeAPI(pokemon);
  if(responseFetch) {
    pokeImg.src = responseFetch["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];
    pokeName.innerHTML = responseFetch.name;
    pokeNumber.innerHTML = responseFetch.id;
    searchPokemon = responseFetch.id;
    frstAttck.innerHTML = responseFetch["moves"]["0"]["move"]["name"];
    scndAttck.innerHTML = responseFetch["moves"]["1"]["move"]["name"];
    pokeType.innerHTML = responseFetch["types"]["0"]["type"]["name"];
    spinnerContainer.style.display = "none";
    pokeImg.style.display = "block";
  } else {
    spinnerContainer.style.display = "block";
    pokeImg.style.display = "none";
    alert("Pokemon não encontrado.");
    pokeImg.src = "";
    pokeName.innerHTML = "";
    pokeNumber.innerHTML = "";
    frstAttck.innerHTML = "";
    scndAttck.innerHTML = "";
    pokeType.innerHTML = "";
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  const formattedInput = pokeInput.value.toLowerCase().trim();
  renderPokemon(formattedInput);
  pokeInput.value = "";
  searchPokemon = formattedInput
};

const previusPokemon = () => {
  if(searchPokemon === 1) {
    searchPokemon++;
  } else {
    --searchPokemon;
    renderPokemon(searchPokemon)
  };
};

const nextPokemon = () => {
  searchPokemon++;
  renderPokemon(searchPokemon)
};

prevBtn.addEventListener("click", previusPokemon);

nextBtn.addEventListener("click", nextPokemon);

pokeForm.addEventListener("submit", handleSubmit);

renderPokemon(searchPokemon);
