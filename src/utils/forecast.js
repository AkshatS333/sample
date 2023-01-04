const request=require('request')

const forecast = (lat, lon,callback) => {

    const url = 'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=' + lat + '&longitude=' + lon + '&localityLanguage=en'

    request({ url, json: true }, (error, response) => {

        if (error) {
            // providing error and data == undefined
            callback('Unable to connect to the location services', undefined)
        }

        // this api does not show error
        else if (response.body.error) {
            callback('Unable to find location', undefined)
        }
        else {
            var citys = response.body.city
            
            

            request({
                url: 'https://api.api-ninjas.com/v1/weather?city=' + citys,
                headers: {
                    'X-Api-Key': 'hJyr+ae7PvvRV2XJRiSwXw==zDWUsBk9C5dNIg4Z'
                } ,
                json: true

            } , (error,{body})=>{
                

                callback(undefined, {
                    place: citys,
                    temperature: body.temp,
                    wind_speed: body.wind_speed
                })

            })
        }
    })
}


module.exports=forecast