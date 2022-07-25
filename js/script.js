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

const showPokeImg = (apiReturn) => {
  if (apiReturn) {
    spinnerContainer.style.display = "none";
    pokeImg.style.display = "block";
  };
};

const showLoader = (apiReturn) => {
  if (apiReturn) {
    spinnerContainer.style.display = "block";
    pokeImg.style.display = "none";
  };
};
// showPokeImg showLoader funções criadas exibir o gif do pokemon, ou o spinner
//enquanto os dados da API não chegam ambas recebem como parâmetro os dados da API

const showRenderData = (pokeData) => {
  pokeImg.src = pokeData["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];
  pokeName.innerHTML = pokeData.name;
  pokeNumber.innerHTML = pokeData.id;
  searchPokemon = pokeData.id; // a variável searchPokemon recebe o id do pokemon para que mesmo com o usuário buscando o pokemon pelo nome as funções previusPokemon e nextPokemon tenham um valor numérico para efetuar seus cálculos caso sejam ativadas
  frstAttck.innerHTML = pokeData["moves"]["0"]["move"]["name"];
  scndAttck.innerHTML = pokeData["moves"]["1"]["move"]["name"];
  pokeType.innerHTML = pokeData["types"]["0"]["type"]["name"];
  showPokeImg(pokeData);
  // função responsável por receber os dados da API uma vez convertidos para json
  // e exibi-los na tela, recebendo como parâmetro o retorno na API
  // nesta função acessei as propriedades do objeto que retorna da API com [""]
  // ao invés de apenas usar o '.' porque algumas dessas propriedades têm caracteres
  // especiais e só consegui acessá-las desta forma [""]
};

const resetRenderData = () => {
  alert("Pokemon não encontrado.");
  renderPokemon(1);
  pokeImg.src = "";
  pokeName.innerHTML = "";
  pokeNumber.innerHTML = "";
  frstAttck.innerHTML = "";
  scndAttck.innerHTML = "";
  pokeType.innerHTML = "";
  pokeInput.value = "";
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
    resetRenderData();
    showLoader(responseData);
  };
  // função que recebe como parâmetro o retorno da API e realiza uma simples
  // validação do retorno alertando ao usuário caso não encontre o pokemon 
  // solicitado ou exibindo os dados caso o encontre
};

const renderPokemon = async (pokemon) => {
  showLoader(pokemon);
  const responseFetch = await fetchPokeAPI(pokemon);
  validateData(responseFetch);
  // função responsável por exibir todos os dados na tela recebe como parâmetro
  // os dados vindos da API após já terem sido tratados e corrigidos nas funções
  // anteriores, assim exibindo-os corretamente e tendo apenas uma responsabilidade
};

const formattedInput = () => {
  const inputFormatted = pokeInput.value.toLowerCase().trim(); // variável que transforma os dados do input em minúsculos e remove qualquer espaço em branco, seja no início ou no final
  renderPokemon(inputFormatted);
  pokeInput.value = "";
  searchPokemon = inputFormatted
  // função responsável por pegar os dados inseridos no input, formatá-los
  // e pass-alos para a função fetchPokeAPI como o parâmetro a ser inserido
  // no final da URL e executar a busca após a busca ela limpa o input
  // aplica o valor da busca a variável searchPokemon, deixando-o disponível
  // para realizar outras ações em outras funções
};

const handleSubmit = (event) => {
  event.preventDefault();
  formattedInput();
  // função que recebe os dados tratados inserido no input e aciona a função
  // fetchPokeAPI dando início a todo o código
};

const previusPokemon = () => {
  if (searchPokemon === 1) {
    searchPokemon++;
  } else {
    --searchPokemon;
    renderPokemon(searchPokemon)
  };
  // função aciona ao clicar no botão 'Anterio', para voltar um pokemon o pokemon
  // em exibição no momento com uma simples verificação para o caso do pokemon atual
  // nunca ficar igual a 0, ou seja, quebrar a aplicação porque dessa forma não iria
  // encontrar o pokemon com id ou nome 0 na API
};

const nextPokemon = () => {
  searchPokemon++;
  renderPokemon(searchPokemon)
  // função que avançar para o próximo pokemon
};

prevBtn.addEventListener("click", previusPokemon);

nextBtn.addEventListener("click", nextPokemon);

pokeForm.addEventListener("submit", handleSubmit);

renderPokemon(searchPokemon);
