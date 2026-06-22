const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");

dotenv.config();

const app = express();

app.use(express.static("public"));

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5,
    message: "Too many requests. Try again later."
});

app.use("/weather", limiter);

app.get("/weather", async (req, res) => {

    const city = req.query.city;

    if (!city) {
        return res.status(400).json({
            error: "City name required"
        });
    }

    try {

        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`
        );

        res.json(response.data);

    } catch (error) {

        res.status(500).json({
            error: "Weather data not found"
        });

    }

});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});