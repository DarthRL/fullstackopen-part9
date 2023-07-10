import express from 'express';
import patientsService from '../services/patientsService';
import { toNewEntry, toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getPatientsWithoutSsn());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get('/:id', (req, res) => {
  res.send(patientsService.getPatientById(req.params.id));
});

router.put('/:id', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const returnedPatient = patientsService.addEntry(req.params.id, newEntry);
    res.json(returnedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
