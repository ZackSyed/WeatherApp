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
                }).then(data => {
                    console.log(data);
                    const { temperature, summary, icon } = data.currently;

                    //Set DOM elements from the api 

                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone.split('/')[1].replace(/_/g, " ");

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
                })
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});