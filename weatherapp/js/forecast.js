$(document).ready(function() {


	$("#submitForecast").click(function() {
		getForecast();
	});

});

function getForecast() {
	var city = $("#city").val();
	var days = $("#days").val();

	if(city != '' && days != '') {

		$.ajax({
			url: "http://api.openweathermap.org/data/2.5/forecast/daily?q="+ city +"&units=metric&cnt=" + days + "&APPID=b5246f37b9656b9f177c519ad3a129d4",
			type: "GET",
			dataType: "jsonp",
			success: function(data) {
				var table = '';
				var thead = '';
				var header = '<h2 id="forecastHeader">Weather forecast for '+ data.city.name +', '+ data.city.country +'</h2>';
				var thead = '<tr><th scope="col">Icon</th><th scope="col">Weather</th><th scope="col">Details</th><th scope="col">Morning Temp</th><th scope="col">Night Temp</th><th scope="col">Min Temp</th><th scope="col">Max Temp</th><th scope="col">Pressure</th><th scope="col">Humidity</th><th scope="col">Wind Speed</th></tr>';

				for (var i = 0; i < data.list.length; i++) {

					table += "<tr>";

					table += "<td data-label='Icon'><img src='http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png'></td>";
					table += "<td data-label='Weather'>" + data.list[i].weather[0].main + "</td>";
					table += "<td data-label='Details'>" + data.list[i].weather[0].description + "</td>";
					table += "<td data-label='Morning Temperature'>" + data.list[i].temp.morn + "&deg;C</td>";
					table += "<td data-label='Night Temperature'>" + data.list[i].temp.night + "&deg;C</td>";
					table += "<td data-label='Min Temperature'>" + data.list[i].temp.min + "&deg;C</td>";
					table += "<td data-label='Max Temperature'>" + data.list[i].temp.max + "&deg;C</td>";
					table += "<td data-label='Pressure'>" + data.list[i].pressure + "hpa</td>";
					table += "<td data-label='Humidity'>" + data.list[i].humidity + "%</td>";
					table += "<td data-label='Wind Sped'>" + data.list[i].speed + "m/s</td>";
					// table += "<td data-label='Wind Direction'>" + data.list[i].deg + "&deg;</td>";


					table += "</tr>";
				}

				$("#forecastWeather").html(table);
				$("#thead").html(thead);
				$("#forecastHead").html(header);
				$("#city").val('');
				$("#days").val('');
			}
		});

	} else {
		$("#error").html("<div class='alert alert-danger' id='errorCity'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>City and Num days fields <strong>cannot</strong> be empty</div>");
	}
}
