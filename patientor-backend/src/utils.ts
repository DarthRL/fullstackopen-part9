import diagnosesService from './services/diagnosesService';
import {
  Diagnosis,
  Gender,
  HealthCheckRating,
  NewEntry,
  NewPatient,
} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};
const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};
const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date');
  }
  return date;
};
const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};
const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};
const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object &&
    'entries' in object
  ) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: [],
    };
    return newPatient;
  }
  throw new Error('Incorrect data: some fields are missing');
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }
  return description;
};
const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};
const parseDiagnosisCodes = (
  diagnoiscodes: unknown
): Array<Diagnosis['code']> => {
  if (!diagnoiscodes || !Array.isArray(diagnoiscodes)) {
    throw new Error('Incorrect or missing diagnoiscodes');
  }
  const diagnoses = diagnosesService.getDiagnoses();
  diagnoiscodes.forEach((code) => {
    if (!code || !isString(code) || !diagnoses.some((d) => d.code === code)) {
      throw new Error(`Incorrect diagnoiscode ${code}`);
    }
  });
  return diagnoiscodes as Array<Diagnosis['code']>;
};
const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (
    !(typeof healthCheckRating === 'number') ||
    !isHealthCheckRating(healthCheckRating)
  ) {
    throw new Error('Incorrect or missing healthcheck rating');
  }
  return healthCheckRating;
};
const parseDischarge = (
  discharge: unknown
): { date: string; criteria: string } => {
  if (!discharge || typeof discharge !== 'object') {
    throw new Error('Incorrect or missing discharge info');
  }
  if (
    !('date' in discharge) ||
    !('criteria' in discharge) ||
    !discharge.date ||
    !isString(discharge.date) ||
    !isDate(discharge.date) ||
    !discharge.criteria ||
    !isString(discharge.criteria)
  )
    throw new Error('Incorrect or missing discharge info');
  return discharge as { date: string; criteria: string };
};
const parseSickLeave = (
  sickLeave: unknown
): { startDate: string; endDate: string } => {
  if (!sickLeave || typeof sickLeave !== 'object') {
    throw new Error('Incorrect or missing sick leave info');
  }
  if (
    !('startDate' in sickLeave) ||
    !('endDate' in sickLeave) ||
    !sickLeave.startDate ||
    !isString(sickLeave.startDate) ||
    !isDate(sickLeave.startDate) ||
    !sickLeave.endDate ||
    !isString(sickLeave.endDate) ||
    !isDate(sickLeave.endDate)
  )
    throw new Error('Incorrect or missing sick leave info');
  return sickLeave as { startDate: string; endDate: string };
};
const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employer name');
  }
  return employerName;
};

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if (!('type' in object)) {
    throw new Error('Missing type');
  }
  switch (object.type) {
    case 'HealthCheck':
      if (
        'description' in object &&
        'date' in object &&
        'specialist' in object &&
        'healthCheckRating' in object
      ) {
        const newEntry: NewEntry = {
          description: parseDescription(object.description),
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist),
          type: object.type,
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        };
        if ('diagnosisCodes' in object) {
          newEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
        }
        return newEntry;
      }
      throw new Error('Incorrect data: some fields are missing');
    case 'Hospital':
      if (
        'description' in object &&
        'date' in object &&
        'specialist' in object &&
        'discharge' in object
      ) {
        const newEntry: NewEntry = {
          description: parseDescription(object.description),
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist),
          type: object.type,
          discharge: parseDischarge(object.discharge),
        };
        if ('diagnosisCodes' in object) {
          newEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
        }
        return newEntry;
      }
      throw new Error('Incorrect data: some fields are missing');
    case 'OccupationalHealthcare':
      if (
        'description' in object &&
        'date' in object &&
        'specialist' in object &&
        'employerName' in object &&
        'sickLeave' in object
      ) {
        const newEntry: NewEntry = {
          description: parseDescription(object.description),
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist),
          type: object.type,
          employerName: parseEmployerName(object.employerName),
        };
        if ('diagnosisCodes' in object) {
          newEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
        }
        if ('sickLeave' in object) {
          newEntry.sickLeave = parseSickLeave(object.sickLeave);
        }
        return newEntry;
      }
      throw new Error('Incorrect data: some fields are missing');
    default:
      throw new Error('Incorrect type');
  }
};
