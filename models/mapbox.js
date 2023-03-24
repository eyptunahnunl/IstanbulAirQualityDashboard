import { GetGeoJson } from './GetGeoJson.js';


mapboxgl.accessToken = 'pk.eyJ1IjoiZXlwdHVuYWhudW5sIiwiYSI6ImNsZm1hdDc1YzA5cTIzc25yaW1hMHhtYnUifQ.sGlePmA1cORpq49bE_MPGQ';

var map = new mapboxgl.Map({
    container: 'map2',
    style: 'mapbox://styles/eyptunahnunl/cl6677go1000c14o87ff5eo2a',
    zoom: 0,
    center: [28.979530, 41.015137],
    zoom: 8,
    antialias: true,
    attributionControl: false
})






//console.log(geojson);

map.on('load', () => {


    map.addSource('stationvalue-data', {
        type: 'geojson',
        data: 'models/AQIvalue.geojson',
        cluster: false,


    });


    map.addLayer({
        'id': 'stationvalue-data',
        'type': 'circle',
        'source': 'stationvalue-data',

        'paint': {
            'circle-radius': [
                '-', ['number', ['get', 'AQIIndex']]
            ],
            'circle-opacity': 0.8,
            'circle-color': [
                'interpolate', ['linear'],
                ['get', 'AQIIndex'],
                0,
                '#00FF00',
                25,
                '#008000',
                50,
                '#FFFF00',
                75,
                '#FFD700',
                100,
                '#FF8C00',

               

            ]
        },




    });

    map.addLayer({
        'id': 'stationvalue-labels',
        'type': 'symbol',
        'source': 'stationvalue-data',
        'layout': {

            'text-field': [
                'format',
                ['upcase', ['get', 'Name']],
                '\n',
                'AQI:',
                {},
                ['to-string', ['round', ['get', 'AQIIndex']]]
            ],


            'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
            'text-size': 12
        },
        'paint': {
            'text-color': 'rgba(0,0,0,0.5)'
        }
    });
    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    map.on('mouseenter', 'stationvalue-data', (e) => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = 
            `
            <h4> 
            --- ${e.features[0].properties.Name} ---   
            </h4>
            <h5>
            Concentrations
            </h5>
            PM10  : ${Math.round(e.features[0].properties.Con_PM10)}
            </br>
            SO2 : ${Math.round(e.features[0].properties.Con_SO2)}
            </br>
            O3: ${Math.round(e.features[0].properties.Con_O3)}
            </br>
            NO2: ${Math.round(e.features[0].properties.Con_NO2)}
            </br>
            

            
            ` ;
        
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(description).addTo(map);
    });

    map.on('mouseleave', 'stationvalue-data', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });















});