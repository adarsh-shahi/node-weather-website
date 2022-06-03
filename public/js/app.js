


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const dataMessage = document.querySelector('#data')
const errorMessage = document.querySelector('#error')


weatherForm.addEventListener('submit', (e) => {
    errorMessage.textContent = ''
    dataMessage.textContent = 'Loading.....'
    e.preventDefault()
   
    const location = search.value
    fetch('/weather?address='+location).then((response) => {
    dataMessage.textContent = ''

    response.json().then((data) => {
        if(data.error) errorMessage.textContent = data.error
        else {
            const response = `Location: ${data.location} Temperature ${data.temperature}, feelslike ${data.feelslike}, forecast ${data.forecast}`
            dataMessage.textContent = response
        }
    })
})
})

