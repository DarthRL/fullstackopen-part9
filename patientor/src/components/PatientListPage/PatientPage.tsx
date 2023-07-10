import { Diagnosis, Patient } from '../../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { useParams } from 'react-router-dom';
import { SyntheticEvent, useEffect, useState } from 'react';
import patientService from '../../services/patients';
import EntryBlock from './EntryBlock';
import { Alert, Box, Button, TextField } from '@mui/material';
import axios from 'axios';

interface Props {
  diagnoses: Diagnosis[];
}

const genderIcon = {
  male: <MaleIcon />,
  female: <FemaleIcon />,
  other: null,
};

const PatientPage = ({ diagnoses }: Props) => {
  const [patient, setPatient] = useState<Patient | null>();
  const id = useParams().id;
  useEffect(() => {
    patientService.getById(id as string).then((data) => setPatient(data));
  }, [id]);

  const [error, setError] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [healthCheckRating, setHealthCeckRating] = useState<string>('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  if (!patient) return <div>Loading</div>;

  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    const newEntry = {
      description,
      date,
      specialist,
      healthCheckRating: parseInt(healthCheckRating),
      diagnosisCodes,
      type: 'HealthCheck' as const,
    };
    try {
      const newPatient = await patientService.createEntry(patient.id, newEntry);
      setPatient(newPatient);
      setDescription('');
      setDate('');
      setSpecialist('');
      setHealthCeckRating('');
      setDiagnosisCodes([]);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(error.response.data.replace('Something went wrong.', ''));
          setTimeout(() => {
            setError('');
          }, 5000);
        } else console.log(error);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <h2>
        {patient.name} {genderIcon[patient.gender]}
      </h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      {error && <Alert severity="error" >{error}</Alert>}
      <Box sx={{ marginY: 2, p: 2, border: '1px dashed' }}>
        <h3>New HealthCheck entry</h3>
        <form onSubmit={addEntry}>
          <TextField
            required
            fullWidth
            margin="normal"
            id="description"
            label="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />{' '}
          <TextField
            required
            fullWidth
            margin="normal"
            id="date"
            label="Date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />{' '}
          <TextField
            required
            fullWidth
            margin="normal"
            id="specialist"
            label="Specialist"
            value={specialist}
            onChange={(event) => setSpecialist(event.target.value)}
          />
          <TextField
            required
            fullWidth
            margin="normal"
            id="healthCheckRating"
            label="Healthcheck Rating"
            value={healthCheckRating}
            onChange={(event) => setHealthCeckRating(event.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            id="diagnosisCodes"
            label="Diagnosis codes"
            value={diagnosisCodes.join(', ')}
            onChange={(event) =>
              setDiagnosisCodes(event.target.value.split(', '))
            }
          />
          <Button sx={{ marginY: 2 }} variant="contained" type="submit">
            ADD
          </Button>
        </form>
      </Box>
      <h3>entries</h3>
      {patient.entries.map((e) => (
        <EntryBlock key={e.id} entry={e} diagnoses={diagnoses} />
      ))}
    </div>
  );
};

export default PatientPage;
