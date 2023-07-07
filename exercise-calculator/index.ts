import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { isNotNumber } from './utils';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = req.query;
    if (isNotNumber(height) || isNotNumber(weight)) {
      return res.status(400).json({ error: 'malformatted parameters' });
    }
    return res.send({
      weight,
      height,
      bmi: calculateBmi(Number(height), Number(weight)),
    });
  } catch (error) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
