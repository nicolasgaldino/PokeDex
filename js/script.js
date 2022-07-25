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
  // os dados recebidos em json
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
  // nesta função acessei as propriedades do objeto que retorna da API com [""]
  // ao invés de apenas usar o '.' porque algumas dessas propriedades têm caracteres
  // especiais e só consegui acessá-las desta forma [""]
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
  renderPokemon(1);
  // função simples que não recebe nenhum parâmetro e é ativada apenas para limpar
  // os elementos da tela caso reterne o erro 404 da API, ou limpar o input de 
  // busca após encontrar o pokemon desejado e aplicar o valor 1 p a função renderPokemon
  // assim quando o retorno da API for 404, a aplicação exibirá ao usuário o primeiro
  // pokemon, ao invés da tela vazia sem dados
};

const validateData = (responseData) => {
  if (responseData) {
    showRenderData(responseData);
  } else {
    alert("Pokemon não encontrado.");
    resetRenderData();
  };
  // função que recebe como parâmetro o retorno da API e realiza uma simples
  // validação do retorno alertando ao usuário caso não encontre o pokemon 
  // solicitado ou exibindo os dados caso o encontre
};

const renderPokemon = async (pokemon) => {
  spinnerContainer.style.display = "block";
  pokeImg.style.display = "none";
  const responseFetch = await fetchPokeAPI(pokemon);
  validateData(responseFetch);
  // função responsável por exibir todos os dados na tela recebe como parâmetro
  // os dados vindos da API após já terem sido tratados e corrigidos nas funções
  // anteriores, assim exibindo-os corretamente e tendo apenas uma responsabilidade
};

const formattedInput = () => {
  const formattedInput = pokeInput.value.toLowerCase().trim();
  renderPokemon(formattedInput);
  pokeInput.value = "";
  searchPokemon = formattedInput
};

const handleSubmit = (event) => {
  event.preventDefault();
  formattedInput();
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
