// Grab DOM Elements
const form = document.querySelector('#search-form')
const featuredImageDiv = document.querySelector('#featured_image')
const mainImage = document.querySelector('#main_image')
const planetNav = document.querySelector('#planet-list')
const grid = document.querySelector('#grid')
const gridContainer = document.querySelector('.container')

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
        let items = data.collection.items
        getRandomImage(items)
        renderGridImages(items)

    })
}

// selects a random image from the fetch based on the keyword user inputs in the search
function getRandomImage(items) {
    // let items = data.collection.items
    let randomItem = (Math.floor(Math.random(items) * 50))
    let chosenItem = items[randomItem]
    // console.log(chosenItem)
    renderImageDetails(chosenItem)   
}

// renders a random image from the fetch in the "featured image" placement
function renderImageDetails(chosenItem) {
    mainImage.src = chosenItem.links[0].href
    featuredImageDiv.appendChild(mainImage)
}

// renders 5 images from the fetch in the grid  
function renderGridImages(items) {
    let slicedItems = items.slice(0, 5)
    slicedItems.forEach(item => {
        let img = document.createElement('img')
        img.className = "grid_image"
        img.src = item.links[0].href

        let h4 = document.createElement('h4')
        h4.textContent = "Photo of jupiter"
        h4.className = "container"

        let p = document.createElement('p')
        p.textContent = "Description of jupiter"
        p.className = "container"
       
        
        // console.log(items[i].links[0].href)
        grid.appendChild(img, h4, p)
    })
}
