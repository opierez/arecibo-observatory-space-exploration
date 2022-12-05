const form = document.querySelector('#travel-form')
form.addEventListener('submit', handleSubmit)


function handleSubmit(e) {
    e.preventDefault()
    let value = e.target.travel_destination.value

    fetch(`https://images-api.nasa.gov/search?q=${value}&media_type=image`)
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        console.log(data.collection.items)
    })
}

