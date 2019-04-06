window.addEventListener('DOMContentLoaded', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    let temperatureSpan = document.querySelector(".temperature span");


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;


            const proxy = "http://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/b056c9ab86cb084bf1de6cf0e4ac510f/${lat},${long}`;

            fetch(api)
                .then(weatherData => {
                    return weatherData.json();
                }).then(info => {
                    console.log(info);
                    const { temperature, summary, icon } = info.currently;
                    const { data } = info.daily;
                    console.log(data)

                    //Set DOM elements from the api 

                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = info.timezone.split('/')[1].replace(/_/g, " ");

                    // Set Icons 
                    setIcons(icon, document.getElementById("icon1"));
                    let celsius = (temperature - 32) * (5 / 9)

                    // Change temp to C-F )
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C"
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent = "F"
                            temperatureDegree.textContent = temperature;
                        }
                    })
                    
                    let i = 2;
                    for (let j = 1; j < 6; j++) {
                        setIcons(data[j].icon, document.getElementById("icon" + i.toString()));
                        switch (j) {
                            case 1:
                                document.querySelector(".day-one h2").textContent = 
                                    Math.floor(data[j].temperatureHigh);
                                document.querySelector(".day-one span").textContent = 
                                    timeConverter(data[j].time);
                            case 2:
                                document.querySelector(".day-two h2").textContent = 
                                    Math.floor(data[j].temperatureHigh);
                                document.querySelector(".day-two span").textContent = 
                                    timeConverter(data[j].time);
                            case 3:
                                document.querySelector(".day-three h2").textContent = 
                                        Math.floor(data[j].temperatureHigh);
                                document.querySelector(".day-three span").textContent = 
                                        timeConverter(data[j].time);
                            case 4: 
                                document.querySelector(".day-four h2").textContent = 
                                        Math.floor(data[j].temperatureHigh);
                                document.querySelector(".day-four span").textContent = 
                                        timeConverter(data[j].time);
                            case 5:
                                document.querySelector(".day-five h2").textContent = 
                                        Math.floor(data[j].temperatureHigh);
                                document.querySelector(".day-five span").textContent = 
                                        timeConverter(data[j].time);
                            default:
                                break;
                        }
                        i++;
                    }




                })
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

    function timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var month = months[a.getMonth()];
        var date = a.getDate();
        var time = month + ' ' + date + ' ';
        return time;
      }
      console.log(timeConverter(0));
});