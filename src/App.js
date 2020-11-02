import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import Tours from './Tours';
const url = 'https://course-api.netlify.app/api/react-tours-project';

function App() {
  // setting up state with hooks
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id)
    setTours(newTours)
  }

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

  // loading data
  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    )
  }

  // if no tours left
  if (tours.length === 0) {
    return (
      <main>
        <div className='title'>
          <h2>no tours left</h2>
          <button className='btn' onClick={() => fetchTours()} title="Refresh">
            refresh
          </button>
        </div>
      </main>
    )
  }

  // default
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;
