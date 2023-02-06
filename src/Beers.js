import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Beers() {
    const [beers, setBeers] = React.useState(null);
    const [visibility, setVisibility] = useState({});

    const toggleVisibility = (id) => {
        setVisibility({
          ...visibility,
          [id]: !visibility[id],
        });
    };
  
    useEffect(() => {
      axios.get('https://api.punkapi.com/v2/beers')
          .then((data) => {
            const allData = data.data;
            console.log(allData)
            setBeers(allData)
            // Initialize the visibility state for each item
            const initialVisibility = {};
            allData.forEach((item) => {
                initialVisibility[item.id] = true;
            })
            setVisibility(initialVisibility);
          })
    }, []);
  
    if (!beers) {
        return <div>Loading...</div>;
    }

    return(
        <ul>
            {beers.map((item) => (
                <li key={item.id}>
                    <button onClick={() => toggleVisibility(item.id)}>
                        {visibility[item.id] ? "Hide" : "Show"}
                    </button>
                        {visibility[item.id] && 
                            <div>
                                <p>{item.description}</p>
                                <p>{Object.entries(item.food_pairing).map(([k, value]) => (
                                    <div key={item.id}>{k}: {value}</div>
                                ))}</p>
                            </div>
                    }
                </li>
            ))}
        </ul>
    )
  }

export { Beers };