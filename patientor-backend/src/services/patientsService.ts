import patientData from '../../data/patients';
import {
  Gender,
  NewPatientEntry,
  Patient,
  PatientEntry,
  PatientEntryWithoutSsn,
} from '../types';
import { v1 as uuid } from 'uuid';

const patients: PatientEntry[] = patientData;

const getPatients = () => {
  return patients;
};

const getPatientById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  if (patient) {
    const gender = patient.gender as Gender;
    return {
      ...patient,
      gender: gender,
      entries: [],
    };
  }
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

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};
export default {
  getPatients,
  getPatientsWithoutSsn,
  addPatient,
  getPatientById,
};
