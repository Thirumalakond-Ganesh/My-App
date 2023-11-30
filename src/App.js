import React, { useState, useEffect } from 'react';
import './App.css';

const NewsComponent = () => {
  const [news, setNews] = useState([]);
  const [country, setCountry] = useState('us');
  const [selectedCountry, setSelectedCountry] = useState('');

  const fetchNews = async (selectedCountry) => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${selectedCountry}&apiKey=c34340cce5cd4063b991eb43ca4d31cb`
      );
      const data = await response.json();
      setNews(data.articles);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    if (selectedCountry) {
      fetchNews(selectedCountry);
    }
  }, [selectedCountry]);

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSelectedCountry(country);
  };

  return (
    <div className="news-container">
      <h2>Top Headlines</h2>
      <form onSubmit={handleSubmit}>
        <select className="country-select" value={country} onChange={handleCountryChange}>
          <option value="us">US</option>
          <option value="in">India</option>
          <option value="ch">China</option>
          <option value="jp">Japan</option>
          {/* Add more options for other countries if needed */}
        </select>
        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
      <ul className="news-list">
        {news.map((article, index) => (
          <li key={index} className="news-item">
            <h2>{article.source.name}</h2>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsComponent;
