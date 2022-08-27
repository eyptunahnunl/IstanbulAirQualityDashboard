export const DisplayResult = (data) => {
    const brandProduct = 'rgba(0,181,233,0.8)'
    const brandService = 'rgba(0,173,95,0.8)'

    var elements = 10
    var dataAQI = [data[0].AQI.PM10, data[0].AQI.SO2, data[0].AQI.O3, data[0].AQI.NO2, data[0].AQI.CO];
    var dataConcentration = [data[0].Concentration.PM10, data[0].Concentration.SO2, data[0].Concentration.O3, data[0].Concentration.NO2, data[0].Concentration.CO];

    var lineChart = document.getElementById("recent-rep-chart");
    if (lineChart) {
        lineChart.height = 350;
        var myChart = new Chart(lineChart, {
            type: 'line',
            data: {
                labels: ['PM10', 'SO2', 'O3', 'NO2', 'CO'],
                datasets: [
                    {
                        
                        backgroundColor: brandService,
                        borderColor: 'transparent',
                        pointHoverBackgroundColor: '#fff',
                        borderWidth: 0,
                        data: dataAQI

                    },
                    {
                        label: 'Concentration',
                        backgroundColor: brandProduct,
                        borderColor: 'transparent',
                        pointHoverBackgroundColor: '#fff',
                        borderWidth: 0,
                        data: dataConcentration

                    }
                ]
            },
            options: {
                maintainAspectRatio: true,
                legend: {
                    display: false
                },
                responsive: true,
                scales: {
                    xAxes: [{
                        gridLines: {
                            drawOnChartArea: false,
                            color: '#f2f2f2'
                        },
                        ticks: {
                            fontFamily: "Poppins",
                            fontSize: 12
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            maxTicksLimit: 1,
                            stepSize: 50,
                            max: 150,
                            fontFamily: "Poppins",
                            fontSize: 12
                        },
                        gridLines: {
                            display: true,
                            color: '#f2f2f2'

                        }
                    }]
                },
                elements: {
                    point: {
                        radius: 0,
                        hitRadius: 1 ,
                        hoverRadius: 10,
                        hoverBorderWidth: 1
                    }
                }


            }
        }); myChart.update()
    }
    
     //ConteminantParameter

    const conteminantParameter= document.getElementById("Contaminant-parameter");
    conteminantParameter.innerHTML = data[0].AQI.ContaminantParameter;



    const image = document.getElementById("index-icon");
    const stateValue=document.getElementById("state-value");

    const AQIIndex= data[0].AQI.AQIIndex
    const AQIState= data[0].AQI.State


    // Card 2 
    const cardIndex= document.getElementById("Aqi-index-value");
    cardIndex.innerHTML="AQI - "+data[0].AQI.AQIIndex


    var ctx = document.getElementById("widgetChart4");
    if (ctx) {
      ctx.height = 100;
      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['PM10', 'SO2', 'O3', 'NO2', 'CO'],
          datasets: [
            {
              
              data: dataAQI,
              borderColor: "transparent",
              borderWidth: "0",
              backgroundColor: "rgba(255,255,255,.3)"
             
            }
          ]
        },
        options: {
          maintainAspectRatio: true,
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: false,
              categoryPercentage: 1,
              barPercentage: 0.65
            }],
            yAxes: [{
              display: false
            }]
          }
        }
      });
    }

    //Card 3
    const indexText= document.getElementById("index-text");
   




    if(AQIIndex >0 && AQIIndex <=500 ){
        if(AQIIndex >= 300){
            image.innerHTML = `<i class="bi bi-emoji-expressionless"></i>`
            stateValue.innerHTML = AQIState

        }else if(AQIIndex >=200){
            image.innerHTML = `<i class="bi bi-emoji-expressionless"></i>`
        }else if(AQIIndex >=150){
            image.innerHTML = `<i class="bi bi-emoji-expressionless"></i>`
        }else if(AQIIndex >=100){
            image.innerHTML = `<i class="bi bi-emoji-neutral"></i>`
        }else if(AQIIndex >=50){
            image.innerHTML = `<i class="fa fa-frown-o" aria-hidden="true"></i>`
            indexText.innerHTML="Moderate"
            stateValue.innerHTML="Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution."
        }else if(AQIIndex >0){
            image.innerHTML = `<i class="fa fa-smile-o"></i>`
            indexText.innerHTML="Good"
            stateValue.innerHTML = "Air quality is satisfactory, and air pollution poses little or no risk."
        }

    }else {
        console.log("değer 0 olabilir")

    }

    const pmConcentration=document.getElementById("tbody")
    pmConcentration.innerHTML=`<tr>
                                    <th scope="row" class="text-left">PM10 </th>
                                    <td>${data[0].Concentration.PM10}</td>
                                    <td>${data[0].AQI.PM10}</td>

                             </tr>
                             <tr>
                                <th scope="row">S0₂</th>
                                <td>${data[0].Concentration.SO2}</td>
                                <td>${data[0].AQI.SO2}</td>

                            </tr>
                            <tr>
                                <th scope="row">03</th>
                                <td>${data[0].Concentration.O3}</td>
                                <td>${data[0].AQI.O3}</td>
                            </tr>
                            <tr>
                                <th scope="row">NO₂­</th>
                                <td>${data[0].Concentration.NO2}</td>
                                <td>${data[0].AQI.NO2}</td>
                            </tr>
                            <tr>
                                <th scope="row">CO</th>
                                <td>${data[0].Concentration.CO}</td>
                                <td>${data[0].AQI.CO}</td>
                            </tr>`








     










		
	
} 

