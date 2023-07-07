import { isNotNumber } from './utils';

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = parseFloat((weight / (height / 100) ** 2).toFixed(1));
  switch (true) {
    case bmi < 16:
      return 'Underweight (Severe thinness)';
      break;
    case bmi < 17:
      return 'Underweight (Moderate thinness)';
      break;
    case bmi < 18.5:
      return 'Underweight (Mild thinness)';
      break;
    case bmi < 25:
      return 'Normal (healthy weight)';
      break;
    case bmi < 30:
      return 'Overweight (Pre-obese)';
      break;
    case bmi < 35:
      return 'Obese (Class I)';
      break;
    case bmi < 40:
      return 'Obese (Class II)';
      break;
    default:
      return 'Obese (Class III)';
      break;
  }
};

const parseArguments = (args: String[]): number[] => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNotNumber && !isNotNumber) {
    return [Number(args[2]), Number(args[3])];
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const [height, weight] = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Error: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
