export interface Assignment {
    id: string;
    title: string;
    dueDate: string;
  }
  
  export interface Enrollment {
    id: string;
    enrolledAt: string;
  }
  
  export interface Course {
    id: string;
    title: string;
    code: string;
    description: string;
    // assignments: Assignment[];
    // enrollment: Enrollment[];
  }