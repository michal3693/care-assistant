import { RoleEnum } from './role.enum';

export interface User {
  id: string;
  email: string;
  role: RoleEnum;
}
