import React, { useEffect, useState } from 'react';
import './Home.css'; // Import the CSS for custom styling

function Home() {
  const [data, setData] = useState([]); // Full food data
  const [cuisine, setCuisine] = useState([]); // Unique cuisines
  const [orientation, setOrientation] = useState([]); // Unique dietary choices
  const [selectedCuisine, setSelectedCuisine] = useState(''); // Selected cuisine
  const [selectedOrientation, setSelectedOrientation] = useState(''); // Selected dietary choice

  // Fetch data from the API
  useEffect(() => {
    fetch('https://backend-for-fitness-app.vercel.app/api/data')
      .then(response => response.json())
      .then(datas => {
        setData(datas); // Set all food data
        setCuisine([...new Set(datas.map(item => item.cuisine))]); // Extract unique cuisines
        setOrientation([...new Set(datas.map(item => item.category))]); // Extract unique dietary choices
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Handle selection changes
  const handleCuisineChange = (event) => {
    setSelectedCuisine(event.target.value);
  };

  const handleOrientationChange = (event) => {
    setSelectedOrientation(event.target.value);
  };

  return (
    <div className="home-container">
      <h1 className="title">Food Selection</h1>
      <div className="filters">
        {/* Dietary Choice Dropdown */}
        <div className="dropdown">
          <label htmlFor="dietary-choice">Dietary Choice:</label>
          <select
            id="dietary-choice"
            value={selectedOrientation}
            onChange={handleOrientationChange}
          >
            <option value="">-- Select Dietary Choice --</option>
            {orientation.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Cuisine Dropdown */}
        <div className="dropdown">
          <label htmlFor="cuisine-choice">Cuisine:</label>
          <select
            id="cuisine-choice"
            value={selectedCuisine}
            onChange={handleCuisineChange}
          >
            <option value="">-- Select Cuisine --</option>
            {cuisine.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filtered Food Items */}
      <div className="food-list">
        {data.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <>
            {data
              .filter(
                item =>
                  (!selectedCuisine || item.cuisine === selectedCuisine) && // Match cuisine
                  (!selectedOrientation || item.category === selectedOrientation) // Match dietary choice
              )
              .map((item, index) => (
                <div key={index} className="food-card">
                  <h3>{item.name}</h3>
                  <p><strong>Cuisine:</strong> {item.cuisine}</p>
                  <p><strong>calories:</strong> {item.calories} kcal</p>
                  <p><strong>Category:</strong> {item.category}</p>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
