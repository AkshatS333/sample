console.log('The js file is loaded')


// fetch('http://localhost:3000/weather?address=Jaipur').then((response) =>{
//     response.json().then((data)=>{
//         if(data.error){
//            return  console.log(data.error)
//         }

//         console.log(data.forecast.temperature)
//         console.log(data.forecast.wind_speed)
//         console.log(data.location)
//     })
// })


// to select the form element
const weatherForm = document.querySelector('form')

// now to get the value entered in input
const search = document.querySelector('input')

const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')


// Code involving event listener to collect info when the user submits the form 
// addEventListener needs 2 pa
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location + '').then((response) => {


        response.json().then((data) => {
            if (data.error) {
                //    return  console.log(data.error)
                messageOne.textContent = data.error;

            }

            messageOne.textContent = data.location;

            messageTwo.textContent = 'The current temperature is ' + data.forecast.temperature + '°C and the wind speed is ' + data.forecast.wind_speed + ' m/s .'

            // console.log(data.forecast.temperature)
            // console.log(data.forecast.wind_speed)
            // console.log(data.location)
        })
    })


})