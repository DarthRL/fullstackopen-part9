import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { isNotNumber } from './utils';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'parameters missing' });
  }
  try {
    if (!Array.isArray(daily_exercises) || isNotNumber(target)) {
      return res.status(400).json({ error: 'malformatted parameters' });
    }
    if (daily_exercises.some((a) => isNotNumber(a))) {
      return res.status(400).json({ error: 'malformatted parameters' });
    }
    return res.send(
      calculateExercises(
        daily_exercises.map((a) => Number(a)),
        Number(target)
        )
        );
      } catch (error) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
