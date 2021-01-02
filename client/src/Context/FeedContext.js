import React, { useState, createContext } from 'react';

export const FeedContext = createContext();

const FeedContextProvider = (props) => {

    const [feedData, setFeedData] = useState([]);

    return (
        <FeedContext.Provider value={{ feedData, setFeedData }}>
            {props.children}
        </FeedContext.Provider>
    );
}

export default FeedContextProvider;