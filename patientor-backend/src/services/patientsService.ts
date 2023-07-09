import patientData from '../../data/patients';
import {
  NewPatient,
  Patient,
  PatientEntryWithoutSsn,
} from '../types';
import { v1 as uuid } from 'uuid';

const patients: Patient[] = patientData;

const getPatients = () => {
  return patients;
};

const getPatientById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

const getPatientsWithoutSsn = (): PatientEntryWithoutSsn[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry,
  };

  patients.push(newPatient);
  return newPatient;
};
export default {
  getPatients,
  getPatientsWithoutSsn,
  addPatient,
  getPatientById,
};
