import data from './data.js'
let $container = document.getElementById('container')
let $selectContainer = document.getElementById('select-container')
let $search = document.getElementById("search")
const crearPokemones = (array, container) => {
    container.innerHTML = "" // para limpiar el contenedor cada vez que ejecutamos la función
    array.forEach(pokemon=>{ 
        /* name✅, hp, defense✅, attack✅, type[0] */

        let card = document.createElement('div')
        card.className = `pokemon-card ${pokemon.name.toLowerCase()}` 
        card.innerHTML = `

        <h4>Nombre: ${pokemon.name}</h4>
        <p>Tipo: ${pokemon.type[0]}</p>

        <img src="${pokemon.img}" alt="${pokemon.name}"/>

        <div class="flex between">
        <p>Vida: ${pokemon.hp}%</p>
        <p>Ataque: ${pokemon.attack}</p>
        <p>Defensa: ${pokemon.defense}</p>
        </div>

        `
        container.appendChild(card)
    })
    if(array.length == 0){
        console.log(array.length)
        container.innerHTML = `
        <p>no se encontraron resultados :(</p>
        `
        console.log(container)
    }
}

crearPokemones(data, $container)

const filtrarSearch = (array, value) => { 
/* array es la lista de pokes, value lo que pone el usuario  */
let filteredArray = array.filter(pokemon => pokemon.name.toLowerCase().includes(value.toLowerCase().trim())) 
//trim saca los espacios de antes y despues de que empiecen los caracteres 
return filteredArray

}
const generarTipos = (array) => {
    let arrayTipos = array.map(pokemon=> pokemon.type[0])
    let tiposFiltrados = [...new Set(arrayTipos)]
    return tiposFiltrados
} //vamos a devolver/retornar un array con los tipos que existen de los pokemones

let tipos = generarTipos(data)

const pintarSelect = (array, container) => {

    let select = document.createElement('select')
    let option = document.createElement('option')

    option.setAttribute('value', "") /* seteamos el valor de "selecciona tu poke" en string vacio */
    option.textContent = "selecciona tu poke"
    select.appendChild(option)

    array.forEach(tipo=>{
        let option = document.createElement('option')
        option.setAttribute('value', tipo.toLowerCase())
        option.textContent = tipo
        select.appendChild(option)
    }) 

    container.appendChild(select)

}

pintarSelect(tipos, $selectContainer)
let $select = document.getElementsByTagName("select")[0];

const filtrarSelect = (array, value) => {
let filteredArray = array.filter(pokemon => pokemon.type[0].toLowerCase().includes(value.toLowerCase()))

return filteredArray
}

const filtroCruzado = (array) => {
    let nuevoArray = filtrarSelect(array, $select.value)
    nuevoArray = filtrarSearch(nuevoArray, $search.value)
    return nuevoArray
}

$search.addEventListener(/* evento */ 'keyup',  /* funcion */ (e)=>{
    let nuevoArray = filtroCruzado(data)
    crearPokemones(nuevoArray, $container)

})

$selectContainer.addEventListener('change', (e)=>{
    let nuevoArray = filtroCruzado(data)
    crearPokemones(nuevoArray, $container)
})
