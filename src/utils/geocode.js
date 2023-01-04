const request=require('request')

const geoCode= (address,callback) =>{

    const url = 'https://us1.locationiq.com/v1/search?key=pk.26b39da94433e49bf80909820a5f830b&q=' + encodeURIComponent(address) +'&format=json'

    request({ url: url , json:true}, (error,{body})=>{

        // this is generalized program, so user can use error in any way and not just console.log
        if (error) {
            // providing error and data == undefined
            callback('Unable to connect to the location services', undefined)
        }

        else if(body.error){
            callback('Unable to find location', undefined)
        }
        else{
            callback(undefined,{
                latitude: body[0].lat,
                longitude: body[0].lon,
                place: body[0].display_name
            })
        }
    })
}


module.exports=geoCode