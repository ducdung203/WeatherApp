import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { Container } from "@mui/system";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "e604c129fdc14275072423b0bca0c7f9"; //API Key

  const getWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError("");
    setWeatherData(null);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
    } catch (err) {
      setError("Không tìm thấy thành phố này");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          textAlign: "center",
          marginTop: 4,
          padding: 4,
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography variant="h3" sx={{ marginBottom: 2, color: "#1976d2" }}>
          Weather App
        </Typography>
        <TextField
          label="Nhập tên thành phố"
          variant="outlined"
          fullWidth
          value={city}
          onChange={(e) => setCity(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={getWeather}
          sx={{ marginBottom: 2, width: "100%" }}
        >
          Tìm kiếm
        </Button>

        {loading && (
          <Box sx={{ marginTop: 2 }}>
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Typography sx={{ color: "red", fontWeight: "bold", marginTop: 2 }}>
            {error}
          </Typography>
        )}

        {weatherData && (
          <Box
            sx={{
              backgroundColor: "#f5f5f5",
              padding: 3,
              borderRadius: 2,
              boxShadow: 1,
              marginTop: 3,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333" }}>
              {weatherData.name}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              Nhiệt độ: {weatherData.main.temp}°C
            </Typography>
            <Typography variant="body1">
              Độ ẩm: {weatherData.main.humidity}%
            </Typography>
            <Typography variant="body1">
              Tốc độ gió: {weatherData.wind.speed} m/s
            </Typography>
            <Typography
              variant="body1"
              sx={{ textTransform: "capitalize", marginTop: 1 }}
            >
              {weatherData.weather[0].description}
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Weather;
