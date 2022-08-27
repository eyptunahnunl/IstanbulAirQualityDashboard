export async function GetGeoJson(){
  const stationData = await (
    await fetch("https://api.ibb.gov.tr/havakalitesi/OpenDataPortalHandler/GetAQIStations?StationId=377e1216-bcc7-42c0-aad8-4d5b3d602b78")).json();

  const newStations = stationData.map(station => {
    return {
      Id: station.Id,
      Name: station.Name,
      Adress: station.Adress,
      LatLng:  JSON.parse(station.Location.replace("POINT ", "").replace(" ", ",").replace("(", "[").replace(")", "]")),
      
    }
  });



  let geojson = { 
    "type": "FeatureCollection",
    "features": []
  };

  for (var i = 0; i < stationData.length; i++) {
    const GetAQIByStation = await (
      await fetch(`https://api.ibb.gov.tr/havakalitesi/OpenDataPortalHandler/GetAQIByStationId?StationId=${newStations[i].Id}&StartDate=01.01.2022%2000:00:00&EndDate=16.08.2022%2000:00:00`)).json();

    let newByStation = GetAQIByStation.map(station => {
      if (station.AQI != null && station.Concentration != null) {
        geojson.features.push({
          Name: newStations[i].Name,
          latlng: newStations[i].LatLng,
          
          AQI: {
            PM10: station.AQI.PM10,
            SO2: station.AQI.SO2,
            O3: station.AQI.O3,
            NO2: station.AQI.NO2,
            AQIIndex: station.AQI.AQIIndex,

          },
          Concentration: {
            PM10:station.Concentration.PM10,
            SO2:station.Concentration.SO2,
            O3: station.Concentration.O3,
            NO2: station.Concentration.NO2,
            CO: station.Concentration.CO,
          }
        })
      }
    })
  }




  function average(name, properties = "", type) {
    let filterName = geojson.features.filter(station => station.Name === name)

    let sum = 0;

    for (let i = 0; i < filterName.length; i++) {

      {
        sum += filterName[i][properties][type]

      }
    }

    return sum / filterName.length
  }


  let secondGeoJson = {
    "type": "FeatureCollection",
    "features": []
  };

  for (var i = 0; i < stationData.length; i++) {
    secondGeoJson.features.push(
      {
      
      
        "type": "Feature",
        "properties": {
          "Name": newStations[i].Name,
          "AQIIndex": average(newStations[i].Name, 'AQI', 'AQIIndex'),
          "AQI_NO2": average(newStations[i].Name, 'AQI', 'NO2'),
          "AQI_PM10":average(newStations[i].Name, 'AQI', 'PM10'),
          "AQI_O3": average(newStations[i].Name, 'AQI', 'O3'),
          "AQI_SO2": average(newStations[i].Name, 'AQI', 'SO2'),
          "AQI_CO": average(newStations[i].Name, 'AQI', 'CO'),
          "Con_PM10": average(newStations[i].Name, 'Concentration', 'PM10'),
          "Con_SO2": average(newStations[i].Name, 'Concentration', 'SO2'),
          "Con_O3": average(newStations[i].Name, 'Concentration', 'O3'),
          "Con_NO2": average(newStations[i].Name, 'Concentration', 'NO2'),
          "Con_CO": average(newStations[i].Name, 'Concentration', 'CO'),
        },
        "geometry": {
          "type": "Point",
          "coordinates": newStations[i].LatLng
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
      
    })
  }  

  function downloadTextFile(text, name) {
    const a = document.createElement('a');
    const type = name.split(".").pop();
    a.href = URL.createObjectURL( new Blob([text], { type:`text/${type === "txt" ? "plain" : type}` }) );
    a.download = name;
    a.click();
  }


  //return secondGeoJson
  
  downloadTextFile(JSON.stringify(secondGeoJson), 'myObj.json');
}
    




    


    
    







