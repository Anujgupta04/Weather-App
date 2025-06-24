async function getWeather() {
  const location = document.getElementById('locationInput').value;
  const resultDiv = document.getElementById('weatherResult');
  
  if (!location) {
    alert("Please enter a location");
    return;
  }

  const apiKey = "dbc7c1be87c1471ba3a140306251105";
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}&aqi=yes`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Location not found");
    
    const data = await response.json();
    const temp = data.current.temp_c;
    const condition = data.current.condition.text;
    const icon = data.current.condition.icon;
    const city = data.location.name;
    const country = data.location.country;

    resultDiv.innerHTML = `
      <h2>${city}, ${country}</h2>
      <img src="https:${icon}" alt="${condition}" />
      <p style="font-size: 1.5rem;"><strong>${temp}°C</strong></p>
      <p>${condition}</p>
    `;
    resultDiv.classList.remove("hidden");
  } catch (error) {
    resultDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    resultDiv.classList.remove("hidden");
  }
}
