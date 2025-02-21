export interface RegisterFormProps {
    onSubmit: (username: string, email: string, password: string, role: string) => void;
  }
export interface User {
    id:number,
    username: string;
    email: string;
    role: string;
  }