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
const gridContainer = document.querySelector('.container')
const gridImages = document.querySelector('grid_image')
const mercuryIcon = document.querySelector('#mercury')
const pError = document.querySelector('#error-message')
const imageError = document.querySelector('#error-image')
const headerText = document.querySelector("#header-row > h1")

// Event Listeners
form.addEventListener('submit', handleSubmit)

function showHide() {
    grid.style.display = "block" 
}

// fetches planet icon images and details from db.json file 
fetch('http://localhost:3000/planets')
    .then(resp => resp.json())
    .then(planets => renderImageIcons(planets))

// renders planet icons to the nav 
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

// when user hovers over planet icon, renders planet details to the "featured image" div
function renderImageIconDetails(planet) {
    // console.log(planet)
    mainTitle.textContent = planet.title
    mainImage.src = planet.image 
    mainExplain.textContent = planet.description 
    mainSource.href = planet.wiki
    mainSource.textContent = "Taken from this Wikipedia source"
}

// https://api.nasa.gov/ --> scroll down to APOD ('Astronomy Pic Of the Day'), same as HEROKU's. Generates random image of the day
// fetches astronomy picture of the day 
fetch('https://api.nasa.gov/planetary/apod?api_key=XjBC4L80dCM7UOyBSupD3sYfCDTWcuAN5LIeb1dv')
    .then(resp => resp.json())
    .then(apod => {
        // console.log(apod)
        // console.log(apod.title)
        // console.log(apod.explanation)
        // console.log(apod.url)
        renderAPOD(apod)
    })

// renders astronomy picture of the day and corresponding details to the "featured image" div
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
        showHide()
        renderGridImages(items)
        
    })
    .catch(err => {
        // console.log(err)
        renderError()
    })
    
    form.reset()
}

// selects a random image from the fetch based on the keyword user inputs in the search
// function getRandomImage(items) {
//     // let items = data.collection.items
//     let randomItem = (Math.floor(Math.random(items) * 50))
//     let chosenItem = items[randomItem]
//     // console.log(chosenItem) // sometimes shows as "undefined" but causes no errors
//     renderImageDetails(chosenItem)   
// }

// renders an image from the fetch or "grid" div in the "featured image" div
function renderImageDetails(chosenItem) {
    pError.textContent = ""
    imageError.src = ""
    imageError.style = "display:none"
    let chosenItemTitle = chosenItem.data[0].title
    let chosenItemDescription = chosenItem.data[0].description

    if (chosenItemTitle === chosenItemDescription) {
        mainExplain.textContent = ''
    } else {
        mainExplain.textContent = chosenItemDescription
    }

    mainTitle.textContent = chosenItemTitle
    mainImage.src = chosenItem.links[0].href
    mainSource.textContent = ""
    mainSource.href = ""

    featuredImageDiv.appendChild(mainImage)
}

// renders 5 images from the fetch in the "grid" div
function renderGridImages(items) {
    grid.innerHTML = ""
    // Here is where we want to make the display of the card property visible
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

// When user clicks on an image in the "grid" div, render that image and it's respective details in the "featured image" div
function handleHover(item) {
    // console.log(item)
    renderImageDetails(item)
}

// Shows the user an error if they try to search for something that is unvailable or has a typo 
function renderError() {
    imageError.src = "./assets/images/gotg.gif"
    imageError.style = "display:block"
    // console.log(imageError.src)
    pError.textContent = `Please check your spelling or try another search query.`
    mainTitle.textContent = ""
    mainExplain.textContent = ""
    grid.style.display = "none"
    mainSource.textContent = ""
}

// forces page to start at the very top on reload or refresh
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }

// Opens mainImage pic in a new window on double click
function swipe() {
    let openImage = document.querySelector("#main_image")
    let url=openImage.getAttribute('src');
    window.open(url,'Image','width=openImage.stylewidth,height=openImage.style.height,resizable=1');
}

// Don't forget to run: `json-server --watch db.json`