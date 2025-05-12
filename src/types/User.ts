export interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
    website?: string;
    company?: {
      name: string;
    };
    role?: UserRole;
    age?: number; 
  }
  
  export interface NewUserForm {
    name: string;
    email: string;
    age: number;
    role: UserRole;
  }
  
  export enum UserRole {
    Admin = "Admin",
    Editor = "Editor",
    Viewer = "Viewer",
  }