export interface Student {
  id?: number;
  firstName: string;
  lastName: string;
  birthDate: string; // ISO date string yyyy-mm-dd
  groupNumber: number | string;
}