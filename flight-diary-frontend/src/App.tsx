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
            type="date"
            value={date}
            onChange={event => setDate(event.target.value)}
          ></input>
        </div>
        <div>
          <label>visibility&nbsp;&nbsp;&nbsp;</label>
          &nbsp;&nbsp;&nbsp;great<input type="radio" name="visibility" onChange={() => setVisibility('great')}/>
          &nbsp;&nbsp;&nbsp;good<input type="radio" name="visibility" onChange={() => setVisibility('good')}/>
          &nbsp;&nbsp;&nbsp;ok<input type="radio" name="visibility" onChange={() => setVisibility('ok')}/>
          &nbsp;&nbsp;&nbsp;poor<input type="radio" name="visibility" onChange={() => setVisibility('poor')}/>
        </div>
        <div>
          <label>weather&nbsp;&nbsp;&nbsp;</label>
          &nbsp;&nbsp;&nbsp;sunny<input type="radio" name='weather' onChange={() => setWeather('sunny')}/>
          &nbsp;&nbsp;&nbsp;rainy<input type="radio" name='weather' onChange={() => setWeather('rainy')}/>
          &nbsp;&nbsp;&nbsp;cloudy<input type="radio" name='weather' onChange={() => setWeather('cloudy')}/>
          &nbsp;&nbsp;&nbsp;stormy<input type="radio" name='weather' onChange={() => setWeather('stormy')}/>
          &nbsp;&nbsp;&nbsp;windy<input type="radio" name='weather' onChange={() => setWeather('windy')}/>
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
