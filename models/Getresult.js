function pad(n) {
	
    if (n < 10){ 
    return '0'+n

    }
    
    else {
        return n
    }
}

var today = new Date();
	
var date = pad(today.getDate())+'.'+pad(today.getMonth()+1)+'.'+pad(today.getFullYear());

var timeHour=today.getHours()



export async function GetLiveQuery(stationId){

    let query = `https://api.ibb.gov.tr/havakalitesi/OpenDataPortalHandler/GetAQIByStationId?StationId=${stationId}&StartDate=${date}%20${(pad(timeHour - 1))}:00:00&EndDate=${date}%20${(pad(timeHour - 1))}:00:00`
    

    const response = await fetch(query)

    const data=await response.json()    
    
    let realTime= document.getElementById('measurement')

    realTime.innerHTML= date +" "+ (pad(timeHour - 1)) +'.00'


    
    return data

}


