import {GetGeoJson} from './GetGeoJson.js';


export function heatMap(){



  var map = new mapboxgl.Map({
    container: 'map2',
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: 0,
    center: [28.979530, 41.015137],
    zoom: 8,
    antialias: true,
    attributionControl: false
  })

      map.on('load', function () {
      
        map.loadImage(
          'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
          (error, image) => {
            if (error) throw error;
            map.addImage('custom-marker', image);
    
            for (var i = 0; i < newStations.length; i++) {
    
              map.addLayer({
                "id": "points" + i,
                "type": "symbol",
    
    
                "source": {
                  "type": "geojson",
                  "data": {
                    "type": "FeatureCollection",
                    "features": [{
                      "type": "Feature",
                      "properties": { "field": newStations[i], "name": newStations[i].Name },
                      "geometry": {
                        "type": "Point",
                        "coordinates": [newStations[i].Lng, newStations[i].Lat]
                      },
                      'properties': {
                        
                        'description':            `
                                   <h2> ${newStations[i].Name}</h2>
                                 <ul>
                                  <small>
                                       <li class =mapboxgl-popup-content >İstasyon Adress: ${newStations[i].Adress}</li>
                                       <li class =mapboxgl-popup-content >İstasyon Adress: </li>
                            
                                     </small>
                               </ul>
            
                        
                         `
                        
                      }
                    }]
                  }
                },
                'layout': {
                  'icon-image': 'custom-marker',
                  'icon-allow-overlap': true,
                  'icon-size': 1,
                  'text-field': ['get', 'title'],
                  'text-font': [
                    'Open Sans Semibold',
                    'Arial Unicode MS Bold'
                  ],
                  'text-offset': [0, 1.25],
                  'text-anchor': 'top',
                  
    
                }
              });
              var popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false
             });
              map.on('click', "points"+ i, (e) => {
                // Copy coordinates array.
                const coordinates = e.features[0].geometry.coordinates.slice();
                const description = e.features[0].properties.description;
                 
                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
                 
                new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(map);
                });
      
      
      
      
              map.on('mouseenter', 'points'+ i , () => {
                map.getCanvas().style.cursor = 'pointer';
               });
      
              map.on('mouseleave', 'points'+ i , () => {
                map.getCanvas().style.cursor = '';
             });

             
            }// for each of the closed stations
    
          });
              
        
      }) 


  
}
    




    


    
    







