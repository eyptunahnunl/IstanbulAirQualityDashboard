import { GetLiveQuery } from './Getresult.js';
import { DisplayResult } from './DisplayResult.js';

mapboxgl.accessToken = 'pk.eyJ1IjoiZXlwdHVuYWhudW5sIiwiYSI6ImNsZm1hdDc1YzA5cTIzc25yaW1hMHhtYnUifQ.sGlePmA1cORpq49bE_MPGQ';

async function getStations(url) {

  var map = new mapboxgl.Map({
    container: 'map1',
    style: 'mapbox://styles/eyptunahnunl/cl6677go1000c14o87ff5eo2a',
    zoom: 0,
    center: [28.979530, 41.015137],
    zoom: 8,
    antialias: true,
    attributionControl: false
  })



  const response = await fetch(url)
  const stations = await response.json()


  const newStations= stations.map( station => {
    return {
      Id: station.Id,
      Name: station.Name,
      Adress: station.Adress,
      Lng: ((((((JSON.stringify(station.Location)).slice(8, -2)))).substring(0, 6)).trim()),
      Lat: ((((((JSON.stringify(station.Location)).slice(8, -2)))).substring(18, 25)).trim())
    }
  })


  newStations.forEach(element => {
    const el = document.createElement('div');
    el.className = 'marker';
    el.id = "station-marker";
    const marker = new mapboxgl.Marker(el)
      .setLngLat([element.Lng, element.Lat])
      .setPopup(
        new mapboxgl.Popup({ offset : 25})
          .setHTML(
            `
            <h2> ${element.Name}</h2>
            <ul>
                <small>
                <li class =mapboxgl-popup-content >İstasyon Adress: ${element.Adress}</li>
                
                </small>
            </ul>

            
             `

          )
      ).addTo(map)


    





       marker.getElement().addEventListener('click', (e) => {


        if (e) {
          const stationId = element.Id
          let adress = document.getElementById('stationAdress')
          adress.innerHTML = element.Name
          GetLiveQuery(stationId)
            .then(DisplayResult)

        }

      }) 


    
    
  });


} 



 
export default getStations;
