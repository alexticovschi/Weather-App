$(document).ready(function() {

	$("#submitCity").click(function() {
		return getWeather();
	});

});

function getWeather() {
	var city = $("#cityCurrent").val();

	if(city != '') {

		$.ajax({
			url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric' + '&APPID=b5246f37b9656b9f177c519ad3a129d4',
			type: "GET",
			dataType: "jsonp",
			success: function(data) {
				var widget = showResults(data);

				$("#showWeather").html(widget);
				$("#cityCurrent").val('');

			}

		});

	} else {
		$("#error").html("<div class='alert alert-danger' id='errorCity'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>City field <strong>cannot</strong> be empty</div>");
	}
}


function showResults(data) {
	return '<h1 style="font-weight:bold; font-size:24px; padding-top:30px; padding-bottom: 3px;" class="text-center">Current Weather for '+ data.name +', '+data.sys.country+'</h1>'+
		   "<h4 style='padding-top:30px; margin-bottom: -10px;'><strong>Details</strong>: <img src='http://openweathermap.org/img/w/"+ data.weather[0].icon +".png'> "+ data.weather[0].main +"</h4>" +
		   "<h4><strong>Description</strong>: "+ data.weather[0].description +"</h4>" +
		   "<h4><strong>Temperature</strong>: "+ data.main.temp +"&deg;C</h4>"+
		   "<h4><strong>Pressure</strong>: "+ data.main.pressure +" hpa</h4>"+
		   "<h4><strong>Humidity</strong>: "+ data.main.humidity +"%</h4>" +
		   "<h4><strong>Min Temperature</strong>: "+ data.main.temp_min +"&deg;C</h4>" +
		   "<h4><strong>Max Temperature</strong>: "+ data.main.temp_max +"&deg;C</h4>" +
		   "<h4><strong>Wind Speed</strong>: "+ data.wind.speed +"m/s</h4>" +
		   "<h4 style='padding-bottom:60px;'><strong>Wind Direction</strong>: "+ data.wind.deg +"&deg;</h4>";
}
