// Grab DOM Elements
const form = document.querySelector('#search-form')
const featuredImageDiv = document.querySelector('#featured_image')
const mainImage = document.querySelector('#main_image')
const mainTitle = document.querySelector('#featured-title')
const mainExplain = document.querySelector('#featured-explain')

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
        getRandomImage(data)
    })
}

// selects a random image from the fetch 
function getRandomImage(data) {
    let items = data.collection.items
    let randomItem = (Math.floor(Math.random(items) * 50))
    let chosenItem = items[randomItem]
    console.log(chosenItem) // sometimes shows as "undefined" but causes no errors
    renderImageDetails(chosenItem)
}

function renderImageDetails(chosenItem) {
    mainTitle.textContent = chosenItem.data[0].title // added by Jandro 12/5/22 evening
    mainImage.src = chosenItem.links[0].href
    mainExplain.textContent = chosenItem.data[0].description // added by Jandro 12/5/22 evening
    // sometimes the title and description are the same, maybe we can set it so that if they are the same we only show the title

    featuredImageDiv.appendChild(mainImage)
}