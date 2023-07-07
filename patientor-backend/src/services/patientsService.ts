import patientData from '../../data/patients';
import { PatientEntry, PatientEntryWithoutSsn } from '../types';

const patients: PatientEntry[] = patientData;
const getPatients = () => {
  return patients;
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
export default {
  getPatients,
  getPatientsWithoutSsn
};
