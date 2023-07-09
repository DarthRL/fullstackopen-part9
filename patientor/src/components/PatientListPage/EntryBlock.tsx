import { Diagnosis, Entry } from '../../types';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import WorkIcon from '@mui/icons-material/Work';
import { Box, Card, CardContent } from '@mui/material';

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const icons = ['💚', '💛', '🧡', '❤️'];

const EntryBlock = ({ entry, diagnoses }: Props) => {
  switch (entry.type) {
    case 'Hospital':
      return (
        <Box m={2}>
          <Card>
            <CardContent>
              <p>
                {entry.date} <LocalHospitalIcon />
              </p>
              <p>
                <i>{entry.description}</i>
              </p>
              {!entry.diagnosisCodes ? null : (
                <ul>
                  {entry.diagnosisCodes.map((code) => (
                    <li key={code}>
                      {code} {diagnoses.find((d) => d.code === code)?.name}
                    </li>
                  ))}
                </ul>
              )}
              {!entry.discharge ? null : (
                <p>
                  discharge {entry.discharge.date} {entry.discharge.criteria}
                </p>
              )}
              <p>diagnose by {entry.specialist}</p>
            </CardContent>
          </Card>
        </Box>
      );
    case 'HealthCheck':
      return (
        <Box m={2}>
          <Card>
            <CardContent>
              <p>
                {entry.date} <MedicalInformationIcon />
              </p>
              <p>
                <i>{entry.description}</i>
              </p>
              <p>{icons[entry.healthCheckRating]}</p>
              {!entry.diagnosisCodes ? null : (
                <ul>
                  {entry.diagnosisCodes.map((code) => (
                    <li key={code}>
                      {code} {diagnoses.find((d) => d.code === code)?.name}
                    </li>
                  ))}
                </ul>
              )}
              <p>diagnose by {entry.specialist}</p>
            </CardContent>
          </Card>
        </Box>
      );
    case 'OccupationalHealthcare':
      return (
        <Box m={2}>
          <Card>
            <CardContent>
              <p>
                {entry.date} <WorkIcon /> <i>{entry.employerName}</i>
              </p>
              <p>
                <i>{entry.description}</i>
              </p>
              {!entry.diagnosisCodes ? null : (
                <ul>
                  {entry.diagnosisCodes.map((code) => (
                    <li key={code}>
                      {code} {diagnoses.find((d) => d.code === code)?.name}
                    </li>
                  ))}
                </ul>
              )}
              {!entry.sickLeave ? null : (
                <p>
                  Sick leave from {entry.sickLeave.startDate} to{' '}
                  {entry.sickLeave.endDate}
                </p>
              )}
              <p>diagnose by {entry.specialist}</p>
            </CardContent>
          </Card>
        </Box>
      );
    default:
      return null;
  }
};

export default EntryBlock;
