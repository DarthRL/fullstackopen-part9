import { useEffect, useState } from 'react';
import { NonSensitiveDiaryEntry } from './types';
import { createDiary, getAllDiaries } from './services/diaryService';
import axios from 'axios';

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data);
    });
  }, []);

  const [date, setDate] = useState<string>('');
  const [visibility, setVisibility] = useState<string>('');
  const [weather, setWeather] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const [error, setError] = useState<string>('');

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createDiary({ date, visibility, weather, comment })
      .then(data => {
        setDiaries(diaries.concat(data));
        setDate('');
        setVisibility('');
        setWeather('');
        setComment('');
      })
      .catch(error => {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            setError(error.response.data.replace('Something went wrong.', ''));
            setTimeout(() => {
              setError('');
            }, 5000);
          } else console.log(error);
        } else {
          console.log(error);
        }
      });
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <p style={{ color: 'red' }}>{error}</p>
      <form onSubmit={diaryCreation}>
        <div>
          <label>date</label>
          <input
            value={date}
            onChange={event => setDate(event.target.value)}
          ></input>
        </div>
        <div>
          <label>visibility</label>
          <input
            value={visibility}
            onChange={event => setVisibility(event.target.value)}
          ></input>
        </div>
        <div>
          <label>weather</label>
          <input
            value={weather}
            onChange={event => setWeather(event.target.value)}
          ></input>
        </div>
        <div>
          <label>comment</label>
          <input
            value={comment}
            onChange={event => setComment(event.target.value)}
          ></input>
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Diary entries</h2>
      {diaries.map((d, i) => (
        <div key={i}>
          <h3>{d.date}</h3>
          <div>visibility: {d.visibility}</div>
          <div>weather: {d.weather}</div>
        </div>
      ))}
    </div>
  );
};

export default App;
