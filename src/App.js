import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import Tours from './Tours';
const url = 'https://course-api.netlify.app/api/react-tours-project';

function App() {
  // setting up state with hooks
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const fetchTours = async () => {
    setLoading(true);

    try {
      const response = await fetch(url);
      const tourData = await response.json();
      setLoading(false);
      setTours(tourData);
    } catch (error) {
      setLoading(false)
      console.log(error)
    }   
  };

  // running the fetchTours just once
  useEffect(() => { fetchTours()}, []);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    )
  }

  // default
  return (
    <main>
      <Tours tours={tours} />
    </main>
  );
}

export default App;
