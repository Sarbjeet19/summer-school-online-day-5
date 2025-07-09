const API_KEY = 'd139c45b985393725e8648b22d8ca046'; 

document.getElementById('getWeather').addEventListener('click', () => {
  const weatherInfo = document.getElementById('weatherInfo');
  const error = document.getElementById('error');
  const loading = document.getElementById('loading');
  weatherInfo.classList.add('hidden');
  error.textContent = '';
  loading.style.display = 'block';

  if (!navigator.geolocation) {
    error.textContent = 'Geolocation not supported';
    loading.style.display = 'none';
    return;
  }

  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      fetchWeather(latitude, longitude);
    },
    () => {
      error.textContent = 'Location access denied';
      loading.style.display = 'none';
    }
  );
});

function fetchWeather(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const city = data.name;
      const tempC = data.main.temp.toFixed(1);
      const tempF = ((tempC * 9/5) + 32).toFixed(1);
      const condition = data.weather[0].description;
      const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

      document.getElementById('city').textContent = city;
      document.getElementById('tempC').textContent = tempC;
      document.getElementById('tempF').textContent = tempF;
      document.getElementById('condition').textContent = condition;
      document.getElementById('icon').src = iconUrl;

      document.getElementById('loading').style.display = 'none';

      // Small delay to give retro typing feel
      setTimeout(() => {
        document.getElementById('weatherInfo').classList.remove('hidden');
      }, 300);
    })
    .catch(() => {
      document.getElementById('error').textContent = 'Failed to fetch weather';
      document.getElementById('loading').style.display = 'none';
    });
}
