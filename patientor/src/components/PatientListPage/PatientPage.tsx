import { Diagnosis, Patient } from '../../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { useParams } from 'react-router-dom';
import { SyntheticEvent, useEffect, useState } from 'react';
import patientService from '../../services/patients';
import EntryBlock from './EntryBlock';
import {
  Alert,
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

interface Props {
  diagnoses: Diagnosis[];
}

const genderIcon = {
  male: <MaleIcon />,
  female: <FemaleIcon />,
  other: null,
};

const healthCheckRatingIcons = [
  <FavoriteIcon style={{ color: 'green' }} />,
  <FavoriteIcon style={{ color: 'yellow' }} />,
  <FavoriteIcon style={{ color: 'orange' }} />,
  <FavoriteIcon style={{ color: 'red' }} />,
];

const PatientPage = ({ diagnoses }: Props) => {
  const [patient, setPatient] = useState<Patient | null>();
  const id = useParams().id;
  useEffect(() => {
    patientService.getById(id as string).then((data) => setPatient(data));
  }, [id]);

  const [error, setError] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>(
    dayjs(new Date()).format('YYYY-MM-DD')
  );
  const [specialist, setSpecialist] = useState<string>('');
  const [healthCheckRating, setHealthCeckRating] = useState<string>('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [dischargeDate, setDischargeDate] = useState<string>(
    dayjs(new Date()).format('YYYY-MM-DD')
  );
  const [dischargeCriteria, setDischargeCriteria] = useState<string>('');
  const [startDate, setStartDate] = useState<string>(
    dayjs(new Date()).format('YYYY-MM-DD')
  );
  const [endDate, setEndDate] = useState<string>(
    dayjs(new Date()).format('YYYY-MM-DD')
  );
  const [employerName, setEmployerName] = useState<string>('');

  if (!patient) return <div>Loading</div>;

  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    let newEntry;
    switch (type) {
      case 'HealthCheck':
        newEntry = {
          description,
          date,
          specialist,
          healthCheckRating: parseInt(healthCheckRating),
          diagnosisCodes,
          type: type,
        };
        break;
      case 'Hospital':
        newEntry = {
          description,
          date,
          specialist,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
          diagnosisCodes,
          type: type,
        };
        break;
      case 'OccupationalHealthcare':
        newEntry = {
          description,
          date,
          specialist,
          employerName,
          sickLeave: {
            startDate,
            endDate,
          },
          diagnosisCodes,
          type: type,
        };
        break;
      default:
        return;
    }
    try {
      const newPatient = await patientService.createEntry(patient.id, newEntry);
      setPatient(newPatient);
      setDescription('');
      setDate('');
      setSpecialist('');
      setHealthCeckRating('');
      setDiagnosisCodes([]);
      setDischargeDate('');
      setDischargeCriteria('');
      setEmployerName('');
      setStartDate('');
      setEndDate('');
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
      {error && <Alert severity="error">{error}</Alert>}

      <Box sx={{ marginY: 2, p: 2, border: '1px dashed' }}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="type-label">Adding Entry Type</InputLabel>
          <Select
            labelId="type-label"
            id="type"
            value={type}
            onChange={(event) => setType(event.target.value)}
            autoWidth
            label="Type"
          >
            <MenuItem value="HealthCheck">HealthCheck</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="OccupationalHealthcare">
              OccupationalHealthcare
            </MenuItem>
          </Select>
        </FormControl>
        {type === 'HealthCheck' && (
          <form onSubmit={addEntry}>
            <h3>New HealthCheck entry</h3>
            <TextField
              required
              fullWidth
              margin="normal"
              id="description"
              label="Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />{' '}
            <DatePicker
              sx={{ marginY: 2 }}
              label="Date *"
              value={dayjs(date)}
              onChange={(value) => {
                if (value) setDate(dayjs(value.toDate()).format('YYYY-MM-DD'));
              }}
            />
            <TextField
              required
              fullWidth
              margin="normal"
              id="specialist"
              label="Specialist"
              value={specialist}
              onChange={(event) => setSpecialist(event.target.value)}
            />
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="healthcheck-rating-label">
                Healthcheck rating
              </InputLabel>
              <Select
                labelId="healthcheck-rating-label"
                id="healthcheck-rating"
                value={healthCheckRating}
                onChange={(event) => setHealthCeckRating(event.target.value)}
                autoWidth
                label="Healthcheck Rating"
              >
                <MenuItem value={0}>{healthCheckRatingIcons[0]}</MenuItem>
                <MenuItem value={1}>{healthCheckRatingIcons[1]}</MenuItem>
                <MenuItem value={2}>{healthCheckRatingIcons[2]}</MenuItem>
                <MenuItem value={3}>{healthCheckRatingIcons[3]}</MenuItem>
              </Select>
            </FormControl>
            <div>
              <FormControl sx={{ marginY: 2, width: 300 }}>
                <InputLabel id="diagnosis-codes-label">Chip</InputLabel>
                <Select
                  labelId="diagnosis-codes-label"
                  id="diagnosis-codes"
                  multiple
                  value={diagnosisCodes}
                  onChange={(event) => {
                    setDiagnosisCodes(event.target.value as string[]);
                  }}
                  input={
                    <OutlinedInput id="select-diagnosis-codes" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 48 * 4.5 + 8,
                        width: 250,
                      },
                    },
                  }}
                >
                  {diagnoses.map((d) => (
                    <MenuItem key={d.code} value={d.code}>
                      {d.code}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <Button sx={{ marginY: 2 }} variant="contained" type="submit">
              ADD
            </Button>
          </form>
        )}
        {type === 'Hospital' && (
          <form onSubmit={addEntry}>
            <h3>New HealthCheck entry</h3>
            <TextField
              required
              fullWidth
              margin="normal"
              id="description"
              label="Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />{' '}
            <DatePicker
              sx={{ marginY: 2 }}
              label="Date *"
              value={dayjs(date)}
              onChange={(value) => {
                if (value) setDate(dayjs(value.toDate()).format('YYYY-MM-DD'));
              }}
            />
            <TextField
              required
              fullWidth
              margin="normal"
              id="specialist"
              label="Specialist"
              value={specialist}
              onChange={(event) => setSpecialist(event.target.value)}
            />
            <DatePicker
              sx={{ marginY: 2 }}
              label="Discharge date *"
              value={dayjs(dischargeDate)}
              onChange={(value) => {
                if (value)
                  setDischargeDate(dayjs(value.toDate()).format('YYYY-MM-DD'));
              }}
            />
            <TextField
              required
              fullWidth
              multiline
              margin="normal"
              id="discharge-criteria"
              label="Discharge Criteria"
              value={dischargeCriteria}
              onChange={(event) => setDischargeCriteria(event.target.value)}
            />
            <div>
              <FormControl sx={{ marginY: 2, width: 300 }}>
                <InputLabel id="diagnosis-codes-label">Chip</InputLabel>
                <Select
                  labelId="diagnosis-codes-label"
                  id="diagnosis-codes"
                  multiple
                  value={diagnosisCodes}
                  onChange={(event) => {
                    setDiagnosisCodes(event.target.value as string[]);
                  }}
                  input={
                    <OutlinedInput id="select-diagnosis-codes" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 48 * 4.5 + 8,
                        width: 250,
                      },
                    },
                  }}
                >
                  {diagnoses.map((d) => (
                    <MenuItem key={d.code} value={d.code}>
                      {d.code}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <Button sx={{ marginY: 2 }} variant="contained" type="submit">
              ADD
            </Button>
          </form>
        )}
        {type === 'OccupationalHealthcare' && (
          <form onSubmit={addEntry}>
            <h3>New HealthCheck entry</h3>
            <TextField
              required
              fullWidth
              margin="normal"
              id="description"
              label="Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />{' '}
            <DatePicker
              sx={{ marginY: 2 }}
              label="Date *"
              value={dayjs(date)}
              onChange={(value) => {
                if (value) setDate(dayjs(value.toDate()).format('YYYY-MM-DD'));
              }}
            />
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
              id="employer-name"
              label="Employer name"
              value={employerName}
              onChange={(event) => setEmployerName(event.target.value)}
            />
            <DatePicker
              sx={{ marginY: 2 }}
              label="Sick leave start"
              value={dayjs(startDate)}
              onChange={(value) => {
                if (value)
                  setStartDate(dayjs(value.toDate()).format('YYYY-MM-DD'));
              }}
            />
            <DatePicker
              sx={{ marginY: 2 }}
              label="Sick leave end"
              value={dayjs(endDate)}
              onChange={(value) => {
                if (value)
                  setEndDate(dayjs(value.toDate()).format('YYYY-MM-DD'));
              }}
            />
            <div>
              <FormControl sx={{ marginY: 2, width: 300 }}>
                <InputLabel id="diagnosis-codes-label">Chip</InputLabel>
                <Select
                  labelId="diagnosis-codes-label"
                  id="diagnosis-codes"
                  multiple
                  value={diagnosisCodes}
                  onChange={(event) => {
                    setDiagnosisCodes(event.target.value as string[]);
                  }}
                  input={
                    <OutlinedInput id="select-diagnosis-codes" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 48 * 4.5 + 8,
                        width: 250,
                      },
                    },
                  }}
                >
                  {diagnoses.map((d) => (
                    <MenuItem key={d.code} value={d.code}>
                      {d.code}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <Button sx={{ marginY: 2 }} variant="contained" type="submit">
              ADD
            </Button>
          </form>
        )}
      </Box>
      <h3>entries</h3>
      {patient.entries.map((e) => (
        <EntryBlock key={e.id} entry={e} diagnoses={diagnoses} />
      ))}
    </div>
  );
};

export default PatientPage;
