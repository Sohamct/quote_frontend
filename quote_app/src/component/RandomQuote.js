import React, { useState, useEffect } from 'react'

export const RandomQuote = () => {
    const [quote, setQuote] = useState('');

    useEffect(() => {
        const fetchQuoteOfTheDay = async () => {
            try {
                const response = await fetch('http://localhost:5500/api/quote/quoteOfTheDay');
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setQuote(data.quoteOfTheDay);
                } else {
                    console.error('Failed to fetch quote of the day:', response.status);
                }
            } catch (error) {
                console.error('Error fetching quote of the day:', error);
            }
        };

        fetchQuoteOfTheDay();
    }, []);

    return (
        <div>
            <h2>Quote of the Day</h2>
            {quote && (
                <div>
                    <p>{quote.quoteText}</p>
                    <p>- {quote.author}</p>
                </div>
            )}
        </div>
    );
}
