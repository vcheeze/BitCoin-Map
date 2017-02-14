// global variables used to eventually present the relevant information to the user
var myCountry, myRate, myCurrency;


// mapping the currency to the selected country
function getCurrency(countryCode, countryName) {
	myCountry = countryName;

	var currencyURL = "https://restcountries.eu/rest/v1/all";
	
	$.ajax({
		url: currencyURL,
		type: 'GET',
		dataType: 'json',
		error: function(err) {
			console.log("Oops...can't get the currency info.");
			console.log(err);
		},
		context: countryCode,
		success: function(d) {
			// console.log(d);
			var country = countryCode.valueOf();

			$.each(d, function(i, v) {
				if (v.alpha2Code.search(new RegExp(country, "i")) != -1) {
					console.log("We are searching...");
					var currencyCode = v.currencies[0];
					// console.log(currencyCode);
					getRate(currencyCode);
				}
			});
		}
	});
}


// Get the exchange rate of the specified currency
function getRate(currencyCode) {
	myCurrency = currencyCode;

	var bitcoinURL = "http://api.coindesk.com/v1/bpi/currentprice/";
	var currency = currencyCode;

	// If the currency is USD --> this if statement is needed because the API returns something different
	if (currencyCode == "USD") {
		$.ajax({
			url: bitcoinURL + currency + ".json",
			type: 'GET',
			dataType: 'json',
			error: function(err) {
				console.log("Oops...something went wrong.");
				console.log(err);
			},
			success: function(d) {
				console.log("Hooray!! Getting bitcoin data...");
				// console.log(d);
				var returnedData = d.bpi;
				var thisCurrency = returnedData[Object.keys(returnedData)[0]];
				var thisRate = thisCurrency.rate_float;
				// console.log(thisCurrency);
				// console.log(thisRate);
				drawCircles(thisRate);
			}
		});
	}
	else {
		$.ajax({
			url: bitcoinURL + currency + ".json",
			type: 'GET',
			dataType: 'json',
			error: function(err) {
				console.log("Oops...something went wrong.");
				console.log(err);
			},
			success: function(d) {
				console.log("Hooray!! Getting bitcoin data...");
				// console.log(d);
				var returnedData = d.bpi;
				var thisCurrency = returnedData[Object.keys(returnedData)[1]];
				var thisRate = thisCurrency.rate_float;
				// console.log(thisCurrency);
				// console.log(thisRate);
				drawCircles(thisRate);
			}
		});
	}
}



// displaying the information
function drawCircles(rate) {
	myRate = Math.round((rate + 0.00001) * 100) / 100;

	var width = (document.documentElement.clientWidth)*0.9,
		height = (document.documentElement.clientHeight)*0.9;
	var svg = d3.select("svg");
	var cCircle, bCircle, infoBox, country;
	var circleRadius = (Math.sqrt(rate/Math.PI))/2;
	// console.log(circleRadius);

	// normal case
	cCircle = d3.select('#cCircle')
				.attr("cx", width/2)
				.attr("cy", height/2)
				.attr("r", circleRadius)
				.style("fill", "#800080")
				.style("fill-opacity", "0.4");

	bCircle = d3.select('#bCircle')
				.attr("cx", width/2)
				.attr("cy", height/2)
				.attr("r", 3.5)
				.style("fill", "#f9d624");

	infoBox = d3.select('#info')
				.text("1 BitCoin" + '\n' + "=" + '\n' + myRate + " " + myCurrency)
				.attr("x", width/2)
				.attr("y", (height/2) - 15)
				.attr("text-anchor", "middle")
				.style("font-family", "'Mitr', sans-serif");

	country = d3.select('#countryName')
				.text(myCountry)
				.attr("x", width/2)
				.attr("y", (height/2) - 40)
				.attr("text-anchor", "middle")
				.style("font-family", "'Mitr', sans-serif");
	// if the rate is too large
	if (circleRadius > Math.min(width, height)) {
		cCircle = d3.select('#cCircle')
				    .attr("cx", width/2)
				    .attr("cy", height/2)
				    .attr("r", circleRadius/10)
				    .style("fill", "#800080")
				    .style("fill-opacity", "0.4");

		bCircle = d3.select('#bCircle')
					.attr("cx", width/2)
					.attr("cy", height/2)
					.attr("r", 3.5)
					.style("fill", "#f9d624");

		infoBox = d3.select('#info')
					.text("1 BitCoin" + '\n' + "=" + '\n' + myRate + " " + myCurrency)
					.attr("x", width/2)
					.attr("y", (height/2) - 15)
					.attr("text-anchor", "middle")
					.style("font-family", "'Mitr', sans-serif");

		country = d3.select('#countryName')
					.text(myCountry)
					.attr("x", width/2)
					.attr("y", (height/2) - 40)
					.attr("text-anchor", "middle")
					.style("font-family", "'Mitr', sans-serif");
	}
	// if the rate is too small
	else if (circleRadius < 3.5) {
		cCircle = d3.select('#cCircle')
				    .attr("cx", width/2)
				    .attr("cy", height/2)
				    .attr("r", circleRadius*10)
				    .style("fill", "#800080")
				    .style("fill-opacity", "0.4");

		bCircle = d3.select('#bCircle')
					.attr("cx", width/2)
					.attr("cy", height/2)
					.attr("r", 3.5)
					.style("fill", "#f9d624");

		infoBox = d3.select('#info')
					.text("1 BitCoin" + '\n' + "=" + '\n' + myRate + " " + myCurrency)
					.attr("x", width/2)
					.attr("y", (height/2) - 15)
					.attr("text-anchor", "middle")
					.style("font-family", "'Mitr', sans-serif");

		country = d3.select('#countryName')
					.text(myCountry)
					.attr("x", width/2)
					.attr("y", (height/2) - 40)
					.attr("text-anchor", "middle")
					.style("font-family", "'Mitr', sans-serif");
	}
}




// Loading Animations
$(document).ready(function() {
    setTimeout(function(){
        $('body').addClass('loaded');
    }, 3000);
});