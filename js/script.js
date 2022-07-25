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
let searchPokemon = 1; // variável global que recebe um valor para sempre iniciar a aplicação exibindo um pokemon

const fetchPokeAPI = async (pokemon) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  const APIResponse = await fetch(url)
    .then((response) => response.json())
    .catch((err) => console.log(err));
  return (APIResponse);
  // função responsável por fazer o Fetch na PokeAPI, recebendo como parâmetro o
  // valor que será adicionado ao fim da URL para realizar a busca e converter
  // od dados recebidos em json
};

const showRenderData = (pokeData) => {
  pokeImg.src = pokeData["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];
  pokeName.innerHTML = pokeData.name;
  pokeNumber.innerHTML = pokeData.id;
  searchPokemon = pokeData.id;
  frstAttck.innerHTML = pokeData["moves"]["0"]["move"]["name"];
  scndAttck.innerHTML = pokeData["moves"]["1"]["move"]["name"];
  pokeType.innerHTML = pokeData["types"]["0"]["type"]["name"];
  spinnerContainer.style.display = "none";
  pokeImg.style.display = "block";
  // função responsável por receber os dados da API uma vez convertidos para json
  // e exibi-los na tela, recebendo como parâmetro o retorno na API
};

const resetRenderData = () => {
  spinnerContainer.style.display = "block";
  pokeImg.style.display = "none";
  pokeImg.src = "";
  pokeName.innerHTML = "";
  pokeNumber.innerHTML = "";
  frstAttck.innerHTML = "";
  scndAttck.innerHTML = "";
  pokeType.innerHTML = "";
};

const validateData = (responseData) => {
  if (responseData) {
    showRenderData(responseData);
  } else {
    alert("Pokemon não encontrado.");
    resetRenderData();
  };
};

const renderPokemon = async (pokemon) => {
  spinnerContainer.style.display = "block";
  pokeImg.style.display = "none";
  const responseFetch = await fetchPokeAPI(pokemon);
  validateData(responseFetch);
};

const handleSubmit = (event) => {
  event.preventDefault();
  const formattedInput = pokeInput.value.toLowerCase().trim();
  renderPokemon(formattedInput);
  pokeInput.value = "";
  searchPokemon = formattedInput
};

const previusPokemon = () => {
  if (searchPokemon === 1) {
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
