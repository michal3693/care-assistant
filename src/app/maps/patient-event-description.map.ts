import { PatientEventsEnum } from '../models/patient-events.enum';

export const patientEventDescriptionMap = new Map<PatientEventsEnum, string>([
  [PatientEventsEnum.SOS, 'Pacjent potrzebuje pilnej pomocy!'],
  [PatientEventsEnum.Drink, 'Pacjent jest spragniony'],
  [PatientEventsEnum.Eat, 'Pacjent jest głodny'],
  [PatientEventsEnum.Toilet, 'Pacjent potrzebuje skorzystać z toalety'],
]);
