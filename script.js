
const API_KEY = 'uSR7jXO8pVq0fq2dk2uUzOsS23y8GJ4J';

function loadHolidays() {
  const country = document.getElementById('country').value.trim().toUpperCase();
  const year = document.getElementById('year').value.trim();
  const output = document.getElementById('output');

  if (!country || !year) {
    output.innerHTML = '⚠️ Please enter both country code and year.';
    return;
  }

  output.innerHTML = '🔄 Loading holidays...';

  const apiUrl = `https://calendarific.com/api/v2/holidays?api_key=${API_KEY}&country=${country}&year=${year}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.meta.code !== 200) {
        output.innerHTML = `❌ API Error: ${data.meta.error_type || data.meta.code}`;
        return;
      }

      const holidays = data.response.holidays;

      if (!holidays || holidays.length === 0) {
        output.innerHTML = '📭 No holidays found for that country and year.';
        return;
      }

      
      output.innerHTML = `<h3>🎉 Holiday in ${country} - ${year}</h3>`;
      holidays.forEach(holiday => {
        output.innerHTML += `
          <div class="holiday">
            <strong>${holiday.name}</strong> – ${holiday.date.iso}<br />
            <small>${holiday.description || 'No description available.'}</small><br />
            <em>Type: ${holiday.type.join(', ')}</em>
            <hr />
          </div>
        `;
      });
    })
    .catch(error => {
      console.error('Fetch error:', error);
      output.innerHTML = '⚠️ Failed to fetch holidays. Please check your API key or try again later.';
    });
}
