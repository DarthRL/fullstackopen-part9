import patientData from '../../data/patients';
import {
  NewEntry,
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

const addPatient = (newPatient: NewPatient): Patient => {
  const newPatientWithId = {
    id: uuid(),
    ...newPatient,
  };

  patients.push(newPatientWithId);
  return newPatientWithId;
};

const addEntry = (
  patientId: string,
  newEntry: NewEntry
): Patient | undefined => {
  const newEntryWithId = {
    id: uuid(),
    ...newEntry,
  };
  const patient = patients.find((p) => p.id === patientId);
  if (patient) patient.entries.push(newEntryWithId);
  return patient;
};

export default {
  getPatients,
  getPatientsWithoutSsn,
  addPatient,
  getPatientById,
  addEntry,
};
