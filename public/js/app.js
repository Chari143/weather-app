
console.log('HimaBindhu')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })



// fetch('http://localhost:3000/weather?address=proddatur').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.weather)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const message1 = document.getElementById('par1')
const message2 = document.querySelector('#par2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //it stops reload we we press search
    const location = searchElement.value
    message1.textContent = 'Loading...'
    message2.textContent = ''
    // console.log(location)
    // fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    fetch('/weather?address='+location).then((response) => {  // for heroku

    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
            message1.textContent = data.error
        } else {
            console.log(data.weather)
            message1.textContent = 'result:'
            message2.textContent = data.weather
        }
    })
})

})