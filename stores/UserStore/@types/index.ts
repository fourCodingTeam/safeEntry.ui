export interface UserState {
  username: string | null;
  setUsername: (username: string | null) => void;
  role: string | null;
  setRole: (role: string | null) => void;
}
