import axios from 'axios';
import { NonSensitiveDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3001/api/diaries';

export const getAllDiaries = () => {
  return axios
    .get<NonSensitiveDiaryEntry[]>(baseUrl)
    .then(response => response.data);
};

export const createDiary = (newDiaryEntry: {
  date: string;
  visibility: string;
  weather: string;
  comment: string;
}) => {
  return axios
    .post<NonSensitiveDiaryEntry>(
      'http://localhost:3001/api/diaries',
      newDiaryEntry
    )
    .then(response => response.data);
};
