import React, { useEffect, useState } from 'react'

export const Search = () => {
    const [inputText, setInputText] = useState('');
    const [searchedQuotes, setsearchedQuotes] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const fetchQuotes = async () => {
            try {
                const response = await fetch(`http://localhost:5500/api/quote/getQuoteFromAuthor?authorName=${encodeURIComponent(inputText)}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'GET',
                });
                if (response.ok) {
                    const data = await response.json();

                    if (response.status === 200) {
                        setErrorMessage(null);
                        setsearchedQuotes(data);
                    }
                } else {
                    if (response.status === 400) {
                        setErrorMessage("No quotes found with this authorname");
                        setsearchedQuotes(null);
                    } 
                    if (response.status === 500) {
                        setErrorMessage("Internel server error");
                        setsearchedQuotes(null);
                    }
                    console.error('Failed to fetch quotes:', response.status);
                }
            } catch (error) {
                setErrorMessage(error);
                setsearchedQuotes(null);
                console.error('Error fetching quotes:', error);
            }
        };

        if (inputText.trim() !== '') {
            fetchQuotes();
        } else {
            setsearchedQuotes([]);
        }
    }, [inputText]);
    return (
        <div className={`container mt-7 ${searchedQuotes && searchedQuotes.length > 0 ? 'dark-background' : ''}`}>
            <div className="row">
                <div className="col">
                    <input id="authorNameInput" type="text" className="form-control" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Search the quote with authorname..." />
                </div>
            </div>
            {errorMessage && <div className="row mt-3"><div className="col"><p className="text-danger">{errorMessage}</p></div></div>}
            <div className="container mt-3">
                <div id="quoteResults" className="row">
                    {searchedQuotes && searchedQuotes.map((quote, index) => (
                        <div key={index} className={`col-md-4 mb-3 card-container`}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{quote.author}</h5>
                                    <p className="card-text">{quote.quoteText}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
    
}    