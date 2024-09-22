export type RegisterUserProps = {
  email: string;
  password: string;
};

export type SignInResponse = {
  email: string;
  otpSecret?: string;
  qrCode?: string;
};
