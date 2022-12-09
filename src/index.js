// IMPORTANT REMINDER: Don't forget to run: `json-server --watch db.json`

// Grab DOM Elements
const form = document.querySelector('#search-form')
const featuredImageDiv = document.querySelector('#featured_image')
const mainImage = document.querySelector('#main_image')
const mainTitle = document.querySelector('#featured-title')
const mainExplain = document.querySelector('#featured-explain')
const mainSource = document.querySelector('#featured-source')
const planetNav = document.querySelector('#planet-list')
const planetIcons = document.querySelectorAll('.planet-list-image')
const grid = document.querySelector('#grid')
const gridImages = document.querySelector('grid_image')
const pError = document.querySelector('#error-message')
const imageError = document.querySelector('#error-image')
const apodButton = document.querySelector('#apod-button')
const areciboButton = document.querySelector('#arecibo-button')
const apodDiv = document.querySelector('#apod-div')

// Global variables
let currentApod = {}

// Event Listeners
form.addEventListener('submit', handleSubmit)
apodButton.addEventListener('click', handleClick)


// Fetches planet icon images and details from db.json file 
fetch('http://localhost:3000/planets')
    .then(resp => resp.json())
    .then(planets => renderImageIcons(planets))

// Fetches arecibo obvservatory image and details from db.json file
fetch('http://localhost:3000/observatories')
    .then(resp => resp.json())
    .then(observatories => renderObservatory(observatories))

// Renders planet icons to the nav 
function renderImageIcons(planets) {
    planets.forEach(planet => {
        // console.log(planet)
        let img = document.createElement('img')
        img.src = planet['image-icon'] 
        img.className = "planet-list-image"
        planetNav.appendChild(img)
        img.addEventListener('click', () => renderImageIconDetails(planet))
    })
}

// When user clicks on planet icon, renders planet image to the "featured image" div and corresponding details to the "column left" div
function renderImageIconDetails(planet) {
    // console.log(planet)
    mainTitle.textContent = planet.title
    mainImage.src = planet.image 
    mainExplain.textContent = planet.description 
    mainSource.href = planet.wiki
    mainSource.textContent = "Taken from this Wikipedia source"
}

// Fetches astronomy picture of the day from NASA APOD API
fetch('https://api.nasa.gov/planetary/apod?api_key=XjBC4L80dCM7UOyBSupD3sYfCDTWcuAN5LIeb1dv')
    .then(resp => resp.json())
    .then(apod => {
        // console.log(apod)
        // console.log(apod.title)
        // console.log(apod.explanation)
        // console.log(apod.url)
        renderAPOD(apod)
        currentApod = apod
    })

// Renders astronomy picture of the day to the "featured image" div and corresponding details to the "column left" div
function renderAPOD(apod) {
    let apodTitle = apod.title
    let apodImage = apod.url
    let apodExplain = apod.explanation
    
    mainTitle.textContent = apodTitle
    mainImage.src = apodImage
    mainExplain.textContent = apodExplain
}

// Handles the form submission based on user search term input and then fetches related images from NASA API
function handleSubmit(e) {
    e.preventDefault()
    let value = encodeURI(e.target.search_value.value)


    fetch(`https://images-api.nasa.gov/search?q=${value}&media_type=image`)
    .then(resp => {
        if (resp.ok) {
            return resp.json()
        } else {
            throw(resp.statusText)
        }
    })
    .then(data => {
        // console.log(data)
        // console.log(data.collection.items)
        let items = data.collection.items
        // getRandomImage(items)
        // console.log(data)
        grid.style.display = "block" // makes grid div reappear
        renderGridImages(items)
        
    })
    .catch(err => {
        // console.log(err)
        renderError()
    })
    
    form.reset()
}

// Renders an image from the search or "grid" div in the "featured image" div. Renders corresponding image details in the "column left" div
function renderImageDetails(chosenItem) {
    // clears out any existing error message/image from prior search
    pError.textContent = ""
    imageError.src = ""
    imageError.style.display = "none"

    // variables for image title and image description 
    let chosenItemTitle = chosenItem.data[0].title
    let chosenItemDescription = chosenItem.data[0].description

    // if the image description is the same as the title, remove the description to only show the title, else provide the description
    if (chosenItemTitle === chosenItemDescription) {
        mainExplain.textContent = ''
    } else {
        mainExplain.textContent = chosenItemDescription
    }
    mainTitle.textContent = chosenItemTitle
    mainImage.src = chosenItem.links[0].href

    // clears out the source from previous details that were displayed
    mainSource.textContent = ""
    mainSource.href = ""

    featuredImageDiv.appendChild(mainImage)
}

// Renders 5 images from the NASA API fetch in the "grid" div
function renderGridImages(items) {
    // clears out grid images from prior search
    grid.innerHTML = ""

    // grabs the 20th-25th images from the search result and renders those 5 images in the "grid" div
    renderImageDetails(items[20])
    let slicedItems = items.slice(20, 25)
    slicedItems.forEach(item => {
        // console.log(item.data[0].description)
        let img = document.createElement('img')
        img.className = "grid_image"
        img.src = item.links[0].href

        grid.appendChild(img)
        img.addEventListener('mouseover', () => handleHover(item))
    })
}

// When user clicks on "apod-button", return to displaying the apod image and details   
function handleClick() {
    // clears out any existing error message/image from prior search and hides grid display 
    pError.textContent = ""
    imageError.src = ""
    imageError.style.display = "none"
    grid.style.display = "none" 

    renderAPOD(currentApod)
}

// Takes the observatories data from db.json fetch, adds an event listener to the "arecibo-button", and passes observatory data to the handleAreciboClick function
function renderObservatory(observatories) {
    areciboButton.addEventListener('click', () => handleAreciboClick(observatories))
}

// When user clicks on "arecibo-button", render arecibo observatory image and details
function handleAreciboClick(observatories) {
    // clears out any existing error message/image from prior search and hides grid display 
    pError.textContent = ""
    imageError.src = ""
    imageError.style.display = "none"
    grid.style.display = "none"

    // renders arecibo observatory image and details
    mainTitle.textContent = observatories[0].title
    mainExplain.textContent = observatories[0].description
    mainImage.src = observatories[0].image
    mainSource.textContent = observatories[0].wiki
}

// When user hovers over an image in the "grid" div, render that image to the "featured image" div and corresponding details to the "column left" div
function handleHover(item) {
    // console.log(item)
    renderImageDetails(item)
}

// Shows the user an error if they try to search for something that is unavailable or has a typo 
function renderError() {
    imageError.src = "./assets/images/gotg.gif"
    imageError.style = "display:block"
    // console.log(imageError.src)
    pError.textContent = `Please check your spelling or try another search query.`
    
    // removes the title, details, and source from the prior search and hides the grid div
    mainTitle.textContent = ""
    mainExplain.textContent = ""
    mainSource.textContent = ""
    grid.style.display = "none"
}

// Forces page to start at the very top on reload or refresh
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }

// Opens featured image in a new window on double click
function swipe() {
    let openImage = document.querySelector("#main_image")
    let url=openImage.getAttribute('src');
    window.open(url,'Image','width=openImage.stylewidth,height=openImage.style.height,resizable=1');
}


