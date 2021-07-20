# Weather Dashboard
## Project Description
 Created a weather dashboard app  to retrieve weather data for cities.This app will run in the browser and feature dynamically updated HTML and CSS powered by jQuery.
  The  page looks like below when city is entered.
  

![landing Page image](/assets/images/landingPage.png)

## Technologies Used
  HTML
  JavaScript
  Moment.js
  Jquery
  Bootstrap


## Functionality used to achieve the acceptance criteria
1. After  user hits the webpage, he can enter city name and click search button. This will populate weather information about that entered city.

2. The dashboard has cityname and date and the cloud image displayed.

3. This is acheived by using fetch()
 The API used here is  "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;"

 4. The city name is the user input city.

 5. The fetch returns co-ordinates of the city which is given as a query parameter to get the 5 day dashboard weather data.

 6. The API  used to achieve  is "https://api.openweathermap.org/data/2.5/onecall?lat="+data.coord.lat+ "&lon=" +data.coord.lon+"&appid=" + APIKey;  

 7. The response is stored as a 2d array.

 8. The array will store corresponding cities date,humidity,temp,wind,icon.

 9. This value is appended to the html to make it visible in the web page.

 10. The user entered city names is stored in an array.

 11. The array is checked before appending the city as a element in the web page.

 12. The localStorage stores the cities as an object and it is parsed while displaying it on the web page as an element.

## Installation
On GitHub, navigate to the main page of the repository.
  To clone the repository using HTTPS, under "Clone with HTTPS", click . To clone the repository using an SSH key, including a certificate issued by your organization's SSH certificate authority, click Use SSH, then click clipboard image . To clone a repository using GitHub CLI, click Use GitHub CLI, then click clipboard image .

  open Git Bash
  
  Change the current working directory to the location where you want the cloned directory.
  
  Type git clone, and then paste the SSH  you copied earlier.

$ git clone git@github.com:sangeethaNR/weatherDashboard.git
Press Enter to create your local clone.

$ git clone git@github.com:sangeethaNR/weatherDashboard.git
> Cloning into `Spoon-Knife`...
> remote: Counting objects: 10, done.
> remote: Compressing objects: 100% (8/8), done.
> remove: Total 10 (delta 1), reused 10 (delta 1)
> Unpacking objects: 100% (10/10), done.

 You installed the project to your local!!!
 
  Link to the deployed application https://github.com/sangeethaNR/weatherDashboard
  
  Landing Page  http://sangeethanr.github.io/weatherDashboard/

  
  ## Credits
  github.com
  google.com
  w3Schools.com




