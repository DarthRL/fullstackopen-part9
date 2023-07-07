interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: 'bad' | 'not too bad but could be better' | 'good';
  target: number;
  average: number;
}

export const calculateExercises = (hours: number[], target: number): Result => {
  console.log(hours);
  console.log(target);
  const periodLength = hours.length;
  const trainingDays = hours.filter((n) => n !== 0).length;
  const average = hours.reduce((a, b) => a + b) / periodLength;
  const success = average >= target;
  let rating, ratingDescription;
  switch (true) {
    case average < target / 2:
      rating = 1 as const;
      ratingDescription = 'bad' as const;
      break;
    case average < target:
      rating = 2 as const;
      ratingDescription = 'not too bad but could be better' as const;
      break;
    default:
      rating = 3 as const;
      ratingDescription = 'good' as const;
      break;
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};
