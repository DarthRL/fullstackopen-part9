import { Diagnosis, Patient } from '../../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import patientService from '../../services/patients';

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
  const [patient, setPatient] = useState<Patient | null>();
  const id = useParams().id;
  useEffect(() => {
    patientService.getById(id as string).then((data) => setPatient(data));
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
      <h3>entries</h3>
      {patient.entries.map((e) => (
        <div key={e.id}>
          <div>
            {e.date} <i>{e.description}</i>
          </div>
          {!e.diagnosisCodes ? null : (
            <ul>
              {e.diagnosisCodes.map((code) => (
                <li key={code}>
                  {code} {diagnoses.find((d) => d.code === code)?.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default PatientPage;
