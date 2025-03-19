
export interface Achievement {
  name: string;
  year: number;
}

export interface Student {
  id: number;
  name: string;
  surname: string;
  photo: string;
  graduation_status: string;
  honors: string;
  achievements: Achievement[];
  facebook: string;
  gender?: string; // Adding optional gender field
}
