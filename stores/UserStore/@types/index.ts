export interface UserState {
  username: string | null;
  setUsername: (username: string | null) => void;
  role: string | null;
  setRole: (role: string | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  personId: number | null;
  setPersonId: (personId: number | null) => void;
  statusId: number | null;
  setStatusId: (statusId: number | null) => void;
}
