export type loginAuth = {
  token: string;
  expiresAt: Date;
  isFirstLogin: boolean;
  personId: number;
  personName: string;
  role: number;
};
