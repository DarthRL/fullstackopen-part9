import { isNotNumber } from "./utils";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: "bad" | "not too bad but could be better" | "good";
  target: number;
  average: number;
}

const calculateExercises = (hours: number[], target: number): Result => {
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
      ratingDescription = "bad" as const;
      break;
    case average < target:
      rating = 2 as const;
      ratingDescription = "not too bad but could be better" as const;
      break;
    default:
      rating = 3 as const;
      ratingDescription = "good" as const;
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

const parseExerciseArguments = (args: String[]): [number[], number] => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const full = args.slice(2);
  full.forEach((a) => {
    if (isNotNumber(a)) {
      throw new Error("Provided values were not numbers!");
    }
  });
  return [full.slice(1).map((a) => Number(a)), Number(full[0])];
};

try {
  const [hours, target] = parseExerciseArguments(process.argv);
  console.log(calculateExercises(hours, target));
} catch (error: unknown) {
  let errorMessage = "Error: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
