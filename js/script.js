/*-------- global variables ------------------------------------------------- */
const pokemonName = document.querySelector('.pokemonName')
const pokemonNumber = document.querySelector('.pokemonNumber')
const pokemonImage = document.querySelector('.pokemon')
const pokemonNot = document.querySelector('.pokemonNot')
const form = document.querySelector('.form')
const search = document.querySelector('.search')
const btnPrev = document.querySelector('.btn-prev')
const btnNext = document.querySelector('.btn-next')

let searchPokemon = 1

/*-------- consuming the API ------------------------------------------------- */
const fetchPokemon = async pokemon => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  )
  if (APIResponse.status === 200) {
    const data = await APIResponse.json()
    return data
  }
}

/*-------- rendering the pokemons ------------------------------------------------- */
const renderPokemon = async pokemon => {
  pokemonName.innerHTML = 'Loading...'
  pokemonNumber.innerHTML = ''
  const data = await fetchPokemon(pokemon)
  if (data) {
    pokemonImage.style.display = 'block'
    pokemonName.style.color = '#3a444d'
    pokemonNumber.innerHTML = data.id
    pokemonName.innerHTML = ` - ${data.name} `
    pokemonImage.src =
      data['sprites']['versions']['generation-v']['black-white']['animated'][
        'front_default'
      ]
    search.value = ''
    searchPokemon = data.id
  } else {
    pokemonName.innerHTML = 'Not found :c'
    pokemonName.style.color = '#ff0000'
    pokemonNumber.innerHTML = ''
    pokemonImage.style.display = 'none'
    search.value = ''
  }
}

renderPokemon(searchPokemon)

/*-------- interaction events ------------------------------------------------- */
form.addEventListener('submit', event => {
  event.preventDefault()
  renderPokemon(search.value.toLowerCase())
})

btnPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon--
    renderPokemon(searchPokemon)
  }
})

btnNext.addEventListener('click', () => {
  searchPokemon++
  renderPokemon(searchPokemon)
})
