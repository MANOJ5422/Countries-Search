import React, { useState, useEffect } from "react";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  // Fetch all countries data from the API
  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch("https://countries-search-data-prod-812920491762.asia-south1.run.app/countries");
      const data = await response.json();
      setCountries(data);
      setFilteredCountries(data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  // Filter countries based on search term
  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchValue)
    );
    setFilteredCountries(filtered);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
      <input
        type="text"
        placeholder="Search for countries..."
        value={searchTerm}
        onChange={handleSearch}
        style={{
          width: "50%",
          padding: "10px",
          marginBottom: "20px",
          
          
        }}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {filteredCountries.map((country) => (
          <div
            key={country.cca3}
            className="countryCard"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "130px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              
            }}
          >
            <img
              src={country.png}
              alt={`${country.name.common} flag`}
              style={{ width: "100px", height: "100px", borderRadius: "4px" }}
            />
            <p style={{ marginTop: "10px", textAlign: "center" }}>
              {country.common}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countries;