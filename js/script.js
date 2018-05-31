/*
lav med JS steder at putte den info man får ind, vha create new elements jquery

url encode
*/


console.log($.getJSON("https://wind-bow.gomix.me/twitch-api/users/OgamingSC2?callback=?"));
console.log($.getJSON("https://wind-bow.gomix.me/twitch-api/streams/freecodecamp?callback=?"));
console.log($.getJSON("https://wind-bow.gomix.me/twitch-api/channels/OgamingSC2?callback=?"));


$(document).ready(function(){
	kanalInfo();

	
});
//mulige streamers
var kanaler = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb"];

//loop for at undgå asynkrom informations indhentning
function kanalInfo(){
	kanaler.forEach(function(kanal){
		//sammensætte url til at finde de enkelte streamers, via console.log kan man se at variablerne type og name
		function lavUrl(type, name){
			return "https://wind-bow.gomix.me/twitch-api/" + type + "/" + name + "?callback=?";
		};
		
		
		//få game status data fra de enkelte streamere
		
		$.getJSON(lavUrl("streams", kanal), function(data){
			
			var game, status;
				if (data.stream === null){
					game = "Offline";
					status = "Offline";
				}
				else if (data.stream === undefined){
					game = "Account doesn't exist";
					status = "Offline";
				}
				else {
					game = data.stream.game;
					status ="Online";
				};
			
		
			$.getJSON(lavUrl("channels", kanal), function(data) {
				var name;
					if (name === null){
						name = "Account does not exits"
					}
					else {name = data.display_name};
			
			//varible til at få logo - lav om så den går igennem channels og ikke streams
				var logo; 
					if (data.logo){
						if(data.logo === null){
							logo = "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F";
						}
						else {logo = data.logo}
					}
				
				//indsæt ind i index.html
				var streamerElement =
				$("<div>")
					.appendTo("#streamer_boks")
					.addClass("streamer_Element");
				
				//indsæt logo til streamerElement
				$("<img>")
					.attr("src", logo)
					.appendTo(streamerElement)
					.addClass("logo col-xs-10 col-sm-8 row align-items-center");

				//navn og status på streamer - lav om så den går igennem channels og ikke streams
				$("<div>")
					.text(name + " - " + status)
					.appendTo(streamerElement)
					.addClass("user_name");
				//hvilket spil der bliver spillet 
				$("<div>")
					.text(game)
					.appendTo(streamerElement)
					.addClass("game");
				//linket hver enkel streamer link til streamer nanvnet
				$(".user_name")
					.wrap("<a href='" + data.url + "'></a>");

				//knapper til at sortere
				$("#all").on("click", function(){
						$(streamerElement).removeClass("hidden");
					})
					
				$("#online").on("click", function(){
						if (status === "Offline"){
							$(streamerElement).addClass("hidden")
						}
						else {$(streamerElement).removeClass("hidden")}
					})

				$("#offline").on("click", function(){
						if (status === "Online"){
							$(streamerElement).addClass("hidden")
						}
						else {$(streamerElement).removeClass("hidden")}
					})

			})

		})
	
	})
};





