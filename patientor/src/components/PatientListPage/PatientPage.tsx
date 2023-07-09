import { Patient } from '../../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import patientService from '../../services/patients';

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>();
  const id = useParams().id;
  useEffect(() => {
    patientService.getById(id as string).then(data => setPatient(data))
  }, [id]);

  if (!patient) return <div>Loading</div>;
  let icon;
  switch (patient.gender) {
    case 'male':
      icon = <MaleIcon />;
      break;
    case 'female':
      icon = <FemaleIcon />;
      break;
    default:
      break;
  }
  return (
    <div>
      <h2>
        {patient.name} {icon}
      </h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
    </div>
  );
};

export default PatientPage;
