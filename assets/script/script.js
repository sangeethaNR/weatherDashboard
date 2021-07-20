var APIKey = "fe5ad2223752857f0f6a6bde0a598393";
var city = document.getElementById('city');
var formEl = document.getElementById('form_weather');
var weatherInfo = new Array();
var fiveDayForecastObj = new Array() ;
var cityDataObj  = new Object();
var cityList = new Array();
var flag= 0;
var localFlag=0;
var uvi='';

// function called on when documentis ready

$(document).ready(function(){
    // get localStorage cityName

  var cityLocal=  JSON.parse(localStorage.getItem('cityName'));
 
  
  if(cityLocal !== null)
  {
      for(var i=0;i<cityLocal.length;i++ ){
      
          cityList.push(cityLocal[i]);
          //function to add cityName to the page
          
        appendCityElement(cityLocal[i]); 
  
      }
  }
})

//click function called when search button is hit 

formEl.addEventListener('submit',function(event){
event.stopPropagation();
event.preventDefault();

getCityweather(city.value);

});

//function to get the weather details after the search button click 
function getCityweather(cityName){

   // checks for empty value
    if(!cityName){

        alert('please enter a valid city');
        return;
      }
      
    
      var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
     
      $('#city').val('');
fetch(apiUrl)
.then(function(response){
    if(!response.ok){
alert('city not found');
flag =1;
        throw response.json();
    }
    return response.json();
})
.then(function(data){

if(!data){

    console.log('No results found!');
}
else{

flag=0;
   var uvApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+data.coord.lat+ "&lon=" +data.coord.lon+"&appid=" + APIKey;
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
    
         
    uvi= uv_data.current.uvi;
flag=0;
// storing value in 2d array which stores all the city weather data in array
     for(let j = 0;j < 6 ;j++){
        fiveDayForecastObj[j]=new Array();

        // convert utc to en-us format 
            var dateObj = new Date(uv_data.daily[j].dt * 1000);
           
             var dateEl = dateObj.toLocaleDateString('en-US');

            var icon=uv_data.daily[j].weather[0].icon;
            var tempEl =uv_data.daily[j].temp.day;
             
        var wind =uv_data.daily[j].wind_speed + 'MPH';
        var humidity = uv_data.daily[j].humidity +'%';
        var uvIndex = uv_data.daily[j].uvi;
        fiveDayForecastObj[j] = new Array(j,dateEl,tempEl,wind,humidity,icon,uvIndex);

       
        cityDataObj = {cityName : cityName, value: fiveDayForecastObj};
        
          }
          // calling this function to dispaly the result in the webpage

          displayWeather(cityDataObj);
          
        }
    
    
        })

     
    $('#city_weather ,#fiveDayDiv,#day1,#day2,#day3,#day4,#day5').show();

}
});

if(flag == 0)
{ if((cityList.length == 0) || !cityList.includes(cityName) )
{
    cityList.push(cityName);
    // set cityname in localstorage as object

    localStorage.setItem("cityName" ,JSON.stringify(cityList));
 appendCityElement(cityName);

}
}

}
// Display 5-day forecast weather 

function displayWeather(obj){
$('#cityName').html(obj.cityName + '('+obj.value[0][1] +')' + '<img src="https://openweathermap.org/img/wn/'+ obj.value[0][5]+'.png">');
$('#cityWeatherData').html('Temp:'+ '\t' + kelvinToCelcius(obj.value[0][2])+ '<br>' + 'Wind:' + '\t'+ obj.value[0][3]+ '<br> Humidity:'+ '\t' + obj.value[0][4] + 
                            '<br> UV Index:' + '\t'+'<span id=' + obj.value[0][6]+ '>'+obj.value[0][6] +'</span>' );
                                
for(let i=1 ;i<=5 ;i++){

    $('#date'+i).html(obj.value[i][1]);
    $('#img'+i).attr("src","https://openweathermap.org/img/wn/" + obj.value[i][5]+'.png');  

    $('#temp'+i).text('Temp:' + '\t'+ kelvinToCelcius(obj.value[i][2]));
    $('#wind'+i).text('Wind:'+ '\t'+ obj.value[i][3]);
    $('#humidity'+i).text('Humidity:'+ '\t'+ obj.value[i][4]);

}
bgColorForUV();
}
   // convert kelvintoCelcius 
function kelvinToCelcius(kelvin){
    const celsius = kelvin - 273;
    let fahrenheit = Math.floor(celsius * (9/5) + 32);
  
  return fahrenheit +"\u00B0F";
}

//function to append city as a element in webpage

function appendCityElement(cityElement){

var spanEl = document.createElement('span');
spanEl.id=cityElement;
spanEl.setAttribute('style','display:block');
spanEl.className= "mt-3 btn  btn-secondary btn-lg btn-block";
spanEl.innerHTML=cityElement +'<br>';
$('#form_weather').append(spanEl);


}
$(document).click(function(event) {
    var text = $(event.target).text();
   
    if(cityList.includes(text)){

        getCityweather(text);
    }
});

// set background color based on uv number
function bgColorForUV()
{

    console.log($('#cityWeatherData').children('span').eq(0).html()); 
  var uvEl =   ($('#cityWeatherData').children('span').eq(0).html()); 
    if(uvEl<=2 && uvEl>=0){
        $('#cityWeatherData').children('span').eq(0).css('background-color','green');
      
            }
    
    else if(uvEl<=5 && uvEl>=3) {
        $('#cityWeatherData').children('span').eq(0).css('background-color','yellow');
    }
    else if(uvEl<=7 && uvEl>=6){
        $('#cityWeatherData').children('span').eq(0).css('background-color','orange');
    }
    else if(uvEl<=10 && uvEl>=8){
        $('#cityWeatherData').children('span').eq(0).css('background-color','red');
    }
else{
    $('#cityWeatherData').children('span').eq(0).css('background-color','violet');
}
}