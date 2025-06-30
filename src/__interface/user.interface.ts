import { Role } from "./role.interface";

export interface User {
  id: string;
  name: string;
  email: string;
  salary: number;
  role: Role;
}
