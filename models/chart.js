// Kullanıcıdan alınan başlangıç ve bitiş tarihleri aralığında API'ye istek gönderir ve veri döndürür, grafiğe yansıtır.

// Veri tıklama fonksiyonu ile gelicek ve grafiğe yerleşecek.
// Dashboard sayfası içerisinde oluşan tüm grafikler bu fonksiyon altında oluşturulacak.


async function getChartData() {

    startDate = document.getElementById('startDate').value;
    endDate = document.getElementById("endDate").value;
    Station = document.getElementById("Stations").value;




    let query =
        `https://api.ibb.gov.tr/havakalitesi/OpenDataPortalHandler/GetAQIByStationId?StationId=${Station}
&StartDate=${startDate.slice(8, 10)}.${startDate.slice(5, 7)}.${startDate.slice(0, 4)}
%20${startDate.slice(11, 13)}:00:00
&EndDate=${endDate.slice(8, 10)}.${endDate.slice(5, 7)}.${endDate.slice(0, 4)}
%20${endDate.slice(11, 13)}:00:00`;

    const response = await fetch(query);
    const data = await response.json();


   function findAverage(prop= "", type){
    let sum = 0 ;

    for(let i = 0; i < data.length; i++) {
      {
        sum += data[i][prop][type]
      }
    }

    return sum / data.length
   }



   const concentrationNewData = data.map(value => {

   
    return { 
      
      PM10 : findAverage('Concentration','PM10'),
      SO2 : findAverage('Concentration','SO2'),
      NO2 : findAverage('Concentration','NO2'),
      O3 : findAverage('Concentration','O3'),

    }
  });


  const AQIvalue= data.map(index => {
    
    return { 
      PM10: findAverage('AQI','PM10'),
      SO2 : findAverage('AQI','SO2'),
      NO2 :findAverage('AQI','NO2'),
      O3 :findAverage('AQI','O3'),
      AQI : findAverage('AQI','AQIIndex'),

    }
  })


  console.log(AQIvalue[0])

    ///CHARTSS 

    try {

      // single bar chart
      var ctx = document.getElementById("singelBarChart");
      if (ctx) {
        ctx.height = 150;
        var myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ["PM10", "SO2", "O3", "NO2", "CO"],
            datasets: [
              {
                label: "Concentration",
                data: [concentrationNewData[0].PM10, concentrationNewData[0].SO2,concentrationNewData[0].O3, concentrationNewData[0].NO2, concentrationNewData[0].CO],
                borderColor: "rgba(0, 123, 255, 0.9)",
                borderWidth: "0",
                backgroundColor: "rgba(0, 123, 255, 0.5)"
              }
            ]
          },
          options: {
            legend: {
              position: 'top',
              labels: {
                fontFamily: 'Poppins'
              }
  
            },
            scales: {
              xAxes: [{
                ticks: {
                  fontFamily: "Poppins"
  
                }
              }],
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                  fontFamily: "Poppins"
                }
              }]
            },


            elements: {
              point: {
                  radius: 0,
                  hitRadius: 0 ,
                  hoverRadius:0,
                  hoverBorderWidth: 0
              }
            }
          }
        });
      }
  
    } catch (error) {
      console.log(error);
    }




    try {

      //pie chart
      var ctx = document.getElementById("pieChart");
      if (ctx) {
        ctx.height = 150;
        var myChart = new Chart(ctx, {
          type: 'pie',
          data: {
            datasets: [{
              data: [AQIvalue[0].PM10, AQIvalue[0].SO2,AQIvalue[0].O3, AQIvalue[0].NO2, AQIvalue[0].AQI, AQIvalue[0].CO ],
              backgroundColor: [
                "#95d5b2",
                "#1b4332",
                "#2d6a4f",
                "#40916c",
                "#52b788",
                "#74c69d"
              ],
              hoverBackgroundColor: [
                "#95d5b2",
                "#1b4332",
                "#2d6a4f",
                "#40916c",
                "#52b788",
                "#74c69d"
              ]
  
            }],
            labels: [
              "PM10",
              "SO2",
              "O3",
              "NO2",
              "AQI",
              "CO",
            ]
          },
          options: {
            legend: {
              position: 'top',
              labels: {
                fontFamily: 'Poppins'
              }
  
            },
            responsive: true
          }
        });
      }
  
  
    } catch (error) {
      console.log(error);
    }



    //Table

    const pmConcentration=document.getElementById("api-data-table")

    for(let i = 0; i < data.length; i++) {
      //console.log

    }



    pmConcentration.innerHTML=
    
                            `<tr>
                                    <th scope="row" class="text-left">PM10 </th>
                                    <td>${concentrationNewData[0].PM10}</td>
                                    <td>${AQIvalue[0].PM10}</td>

                            </tr>
                            <tr>
                                <th scope="row">S0₂</th>
                                <td>${concentrationNewData[0].SO2}</td>
                                <td>${AQIvalue[0].SO2}</td>

                            </tr>
                            <tr>
                                <th scope="row">03</th>
                                <td>${concentrationNewData[0].O3}</td>
                                <td>${AQIvalue[0].O3}</td>
                            </tr>
                            <tr>
                                <th scope="row">NO₂­</th>
                                <td>${concentrationNewData[0].NO2}</td>
                                <td>${AQIvalue[0].NO2}</td>
                            </tr>
                            <tr>
                                <th scope="row">CO</th>
                                <td>${concentrationNewData[0].CO}</td>
                                <td>${AQIvalue[0].CO}</td>
                            </tr>`





    















    


 
    


}


