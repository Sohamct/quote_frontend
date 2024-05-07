import React, { useEffect } from 'react';
import { RandomQuote } from './RandomQuote';
import { Search } from './Search';
import { addPosts as fetchPosts } from './api'; // Renamed addPosts import to avoid conflict

export const Home = () => {
  const handleFetchPosts = async () => {
    const url = 'http://localhost:5500/api';

    try {
      const data = await fetch('https://api.quotable.io/quotes');
      const res = await data.json();
      const quotes = [];

      res.results.forEach(quote => {
        const {content, author} = quote;
        quotes.push({content, author});
      });
        console.log(quotes);
      const response = await fetch(`${url}/quote/uploadQuotes`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify(quotes),
      });
      const data2 = await response.json();
      console.log(data2);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <div>
      <button hidden={true} onClick={handleFetchPosts}>
        FetchPosts
      </button>
      <Search/>
      <RandomQuote/>
    </div>
  );
};

