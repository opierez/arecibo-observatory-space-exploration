// Grab DOM Elements
const form = document.querySelector('#search-form')
const featuredImageDiv = document.querySelector('#featured_image')
const mainImage = document.querySelector('#main_image')

// Event Listeners
form.addEventListener('submit', handleSubmit)

// Allows the user to input a search term in the form and then fetch related images from NASA API
function handleSubmit(e) {
    e.preventDefault()
    let value = encodeURI(e.target.search_value.value)


    fetch(`https://images-api.nasa.gov/search?q=${value}&media_type=image`)
    .then(resp => resp.json())
    .then(data => {
        // console.log(data)
        // console.log(data.collection.items)
        getRandomImage(data)

    })
}

// selects a random image from the fetch 
function getRandomImage(data) {
    let items = data.collection.items
    let randomItem = (Math.floor(Math.random(items) * 50))
    let chosenItem = items[randomItem]
    console.log(chosenItem)
    renderImageDetails(chosenItem)
   
}

function renderImageDetails(chosenItem) {
    mainImage.src = chosenItem.links[0].href
    featuredImageDiv.appendChild(mainImage)
}