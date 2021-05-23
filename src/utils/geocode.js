const axios = require('axios')

const access_token= 'pk.eyJ1Ijoic2FhcmFuc2gyOCIsImEiOiJja291OTRqZmowaXhzMnBsbDc0YWljY3VrIn0.ewy2PhUFPp9dIsymSfjBow'
const limit = 1

const gecode = (address,callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?`

    axios.get(url, {
        params: {
            access_token,
            limit,
        }
    }).then(({status, data:geo_data}) => {
        if (status == 200){
            if(geo_data.features.length > 0) {
                callback(undefined, {
                    lat: geo_data.features[0].center[1],
                    long: geo_data.features[0].center[0],
                    location: geo_data.features[0].place_name,
                })
            } else {
                callback("Location not Found!")
            }            
        } else {
            callback("API Error!")
        }   
    }).catch((e) => {
       callback("User Error!")
    })
}

module.exports = gecode
