import { PatientEventsEnum } from '../models/patient-events.enum';

export const patientEventTitleMap = new Map<PatientEventsEnum, string>([
  [PatientEventsEnum.SOS, 'SOS'],
  [PatientEventsEnum.Drink, 'Picie'],
  [PatientEventsEnum.Eat, 'Jedzenie'],
  [PatientEventsEnum.Toilet, 'Toaleta'],
]);
