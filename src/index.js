// Grab DOM Elements
const form = document.querySelector('#search-form')
const featuredImageDiv = document.querySelector('#featured_image')
const mainImage = document.querySelector('#main_image')
const mainTitle = document.querySelector('#featured-title')
const mainExplain = document.querySelector('#featured-explain')
const planetNav = document.querySelector('#planet-list')
const grid = document.querySelector('#grid')
const gridContainer = document.querySelector('.container')

// Event Listeners
form.addEventListener('submit', handleSubmit)

// https://api.nasa.gov/ --> scroll down to APOD ('Astronomy Pic Of the Day'), same as HEROKU's. Generates random image of the day. Jandro 12/5/22 evening
fetch('https://api.nasa.gov/planetary/apod?api_key=XjBC4L80dCM7UOyBSupD3sYfCDTWcuAN5LIeb1dv')
    .then(resp => resp.json())
    .then(apod => {
        // console.log(apod)
        // console.log(apod.title)
        // console.log(apod.explanation)
        // console.log(apod.url)
        renderAPOD(apod)
    })

function renderAPOD(apod) {
    let apodTitle = apod.title
    let apodImage = apod.url
    let apodExplain = apod.explanation
    
    mainTitle.textContent = apodTitle
    mainImage.src = apodImage
    mainExplain.textContent = apodExplain
    
}

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
    console.log(chosenItem) // sometimes shows as "undefined" but causes no errors
    renderImageDetails(chosenItem)   
}

// renders a random image from the fetch in the "featured image" placement
function renderImageDetails(chosenItem) {
    mainTitle.textContent = chosenItem.data[0].title
    mainImage.src = chosenItem.links[0].href
    mainExplain.textContent = chosenItem.data[0].description
    // sometimes the title and description are the same, maybe we can set it so that if they are the same we only show the title

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
