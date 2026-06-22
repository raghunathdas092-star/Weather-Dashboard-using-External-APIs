async function getWeather() {

    const city = document.getElementById("city").value;

    try {

        const response = await fetch(
            `/weather?city=${city}`
        );

        const data = await response.json();

        document.getElementById("result").innerHTML = `
            <h2>${data.name}</h2>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Weather: ${data.weather[0].description}</p>
        `;

    } catch (error) {

        document.getElementById("result").innerHTML =
        "Something went wrong";

    }
}