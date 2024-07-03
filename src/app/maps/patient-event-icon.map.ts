import { PatientEventsEnum } from '../models/patient-events.enum';

export const patientEventIconMap = new Map<PatientEventsEnum, string[]>([
  [PatientEventsEnum.SOS, ['help-buoy-outline']],
  [PatientEventsEnum.Drink, ['water-outline']],
  [PatientEventsEnum.Eat, ['restaurant-outline']],
  [PatientEventsEnum.Toilet, ['man-outline', 'woman-outline']],
]);
