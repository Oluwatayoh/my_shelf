export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}


export const initialState: User = {
  uid: '',
  email: '',
  displayName: '',
  photoURL: '',
  emailVerified: false
 };
