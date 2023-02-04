import './App.css';
import axios from 'axios';
import React from 'react';

const baseURL = 'https://api.punkapi.com/v2/beers';

function App() {
  const [beer, setBeer] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setBeer(response.data);
    });
  }, []);

  if (!beer) return null;

    return (
      <div className="App">
        <header className="App-header">
          <div>
            {beer.map(function(arr, i) {
              return <li>{arr.name}</li>;
            })}
          </div>
        </header>
      </div>
    );
}

export default App;
