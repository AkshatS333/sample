const request = require('request')

const forecast= (lat,lon) =>{

    const url = 'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=' + lat + '&longitude=' + lon + '&localityLanguage=en'

    request({url:url, json: true} , (error,respnse) =>{
        console.log(respnse.body)
    } )


}


forecast('@@','@@' )