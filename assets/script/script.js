var APIKey = "fe5ad2223752857f0f6a6bde0a598393";
var city = document.getElementById('city');
var formEl = document.querySelector('#button_search');
var city_namedisplay;
var now = moment().format('MM/DD/YYYY');
var fiveDayForecastObj =new Array();
//   var fiveDayForecastObj = {

//     firstDay :[], 
//     secondDay :[],
//     thirdDay:[],
//     fourthDay:[],
//     fifthDay:[]
//   } 
let weather_report = new Object();


function getCityweather(){

   // console.log(unixFormat);
  document.getElementById('city_weather').innerHTML='';
  appendCityList(city.value);
var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city.value + "&appid=" + APIKey;

fetch(apiUrl)
.then(function(response){
    if(!response.ok){

        throw response.json();
    }
    return response.json();
})
.then(function(data){

console.log(data);
if(!data){

    console.log('No results found!');
}
else{
   

   var uvApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+data.coord.lat+ "&lon=" +data.coord.lon+"&appid=" + APIKey;
  // var uvApiUrl ='https://api.openweathermap.org/data/2.5/onecall?lat=60.99&lon=30.9&appid=fe5ad2223752857f0f6a6bde0a598393';
    fetch(uvApiUrl).then(function(response){
if(!response.ok){
throw response.json();

    }
    return response.json();
    })
.then(function(uv_data){
    console.log('uvi URL' + JSON.stringify(uv_data));
    if(!uv_data){
        console.log('No results found!');
    }
    else{

       
appendUVI(uv_data.current.uvi)

    }


    })
    const weather_report = { temp :data.main.temp,
                           wind: data.wind.speed,humidity:data.main.humidity};
    weather_report.temp =kelvinToCelcius(data.main.temp);
    weather_report.wind=data.wind.speed;
    weather_report.humidity=data.main.humidity +'%';


                         var   city_name = data.name;
 city_namedisplay = document.createElement('h3');
city_namedisplay.innerHTML = city_name + '(' + now + ')';
var imgEl = document.createElement('img');
imgEl.src ='https://openweathermap.org/img/wn/'+ data.weather[0].icon+'.png';
document.getElementById('city_weather').append(city_namedisplay);
city_namedisplay.append(imgEl);
createspan_function(weather_report);
}
})
.catch(function(error){
    console.error(error);
});

fiveDayForecast();
}
function createspan_function(city_weather){
for(const property in city_weather){
var spanEl = document.createElement('span');
spanEl.id= property;
spanEl.innerHTML='</br>'+ `${property}: ${city_weather[property]}`;
city_namedisplay.append(spanEl);
}



}
function appendUVI(uvi)
{
console.log("uvi"+uvi);
    var uviEl =document.createElement('span');
    uviEl.id='UV_index';
    uviEl.innerHTML='<br/> UV Index :';
    city_namedisplay.append(uviEl);
  
    if(uvi<=2 && uvi>=0){
        var spanEl = document.createElement('span');
        spanEl.innerHTML = uvi;
        spanEl.setAttribute('style','background-color:green');
        uviEl.append(spanEl);
            }
    
    else if(uvi<=5 && uvi>=3) {
        var spanEl = document.createElement('span');
        spanEl.innerHTML = uvi;
        spanEl.setAttribute('style','background-color:yellow');
        uviEl.append(spanEl);
    }
    else if(uvi<=7 && uvi>=6){
        var spanEl = document.createElement('span');
        spanEl.innerHTML = uvi;
        spanEl.setAttribute('style','background-color:orange');
        uviEl.append(spanEl);
    }
    else if(uvi<=10 && uvi>=8){
        var spanEl = document.createElement('span');
        spanEl.innerHTML = uvi;
        spanEl.setAttribute('style','background-color:red');
        uviEl.append(spanEl);
    }
else{
    var spanEl = document.createElement('span');
    spanEl.innerHTML = uvi;
    spanEl.setAttribute('style','background-color:violet');
    uviEl.append(spanEl);
}
    
    city_namedisplay.append(uviEl);
    
}



formEl.addEventListener('click',getCityweather);
function fiveDayForecast()
{
var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+city.value+'&appid='+ APIKey;
//var forecastUrl='https://api.openweathermap.org/data/2.5/forecast?q=houston&appid=fe5ad2223752857f0f6a6bde0a598393'
//var forecastUrl='https://api.openweathermap.org/data/2.5/forecast/daily?q=houston&cnt=5&appid=fe5ad2223752857f0f6a6bde0a598393';
console.log(forecastUrl);

fetch(forecastUrl).then(function(response){
        if(!response.ok){
        throw response.json();
        
            }
            return response.json();
            })
        .then(function(forecast_data){
            if(!forecast_data){
                console.log('No results found!');
            }
            else{
        console.log('length'+ forecast_data.list.length)
        console.log(forecast_data)
        // for(var j=0;j<forecast_data.list.length ;j++){
            
            // var dateEl =moment.unix(forecast_data.list[4].dt).format('MM-DD-YYYY');
           
            // var tempEl =forecast_data.list[j].main.temp;
            // var wind =forecast_data.list[j].wind.speed;
            // var humidity = forecast_data.list[j].main.humidity;
        //     console.log(dateEl +'/n');
        // }
        var index =0;
        var arrayindex=0;
        for(var i=0;i<40 ;i++){
        if(index <40){
            console.log("start index "+ index );
console.log('###############');
console.log(" strat arrayindex"+arrayindex );
      //  forecast_data.list[index].dt_txt;
        var dateEl =moment( forecast_data.list[index].dt_txt).format('MM/DD/YYYY');
           var icon=forecast_data.list[index].weather[0].icon;
        var tempEl =forecast_data.list[index].main.temp;
        var wind =forecast_data.list[index].wind.speed;
        var humidity = forecast_data.list[index].main.humidity +'%';



fiveDayForecastObj[arrayindex] = new Array(arrayindex,dateEl,tempEl,wind,humidity,icon);
index+=8;
arrayindex++;

        }
// fiveDayForecastObj.temp =tempEl;
// fiveDayForecastObj.wind=wind;
// fiveDayForecastObj.humidity=humidity;

            }

            console.log(JSON.stringify(fiveDayForecastObj));
            buildFiveDayForecast();
            }
        
        
            })
city.value='';
}
function buildFiveDayForecast(){
$('#fiveDayDiv').removeClass('toggle_div');
$('#fiveDayDiv').empty();
    for(var k=0 ; k<5 ;k++)
    {
        fiveDayForecastObj[k];
        var divEl = document.createElement('div');
        divEl .classList.add('col-2');
        divEl .classList.add('border');
         divEl .classList.add('p-3');
        
        $('#fiveDayDiv').append(divEl);
        var h3El = document.createElement('h4');
        h3El.innerHTML =fiveDayForecastObj[k][1];
       
        divEl.append(h3El);
        var spanEl = document.createElement('span');
        spanEl.innerHTML='<img src="https://openweathermap.org/img/wn/' +fiveDayForecastObj[k][5]+'.png"'+'<br/>  temp : ' + kelvinToCelcius(fiveDayForecastObj[k][2])+ '</br>' + 'wind :' + fiveDayForecastObj[k][3] +

                            '<br/> Humidity :' + fiveDayForecastObj[k][4] ;
                            divEl.append(spanEl);
                            

    }
}
    
function kelvinToCelcius(kelvin){
    const celsius = kelvin - 273;
    let fahrenheit = Math.floor(celsius * (9/5) + 32);

   
 return fahrenheit +"\u00B0F";
}
function appendCityList(append_city){

  var liEl = document.createElement('li') ;
  liEl.id= append_city;
  liEl.innerHTML=append_city;
  //liEl.onclick=getCityweather();
  document.getElementById('city_ul').append(liEl);
 

}