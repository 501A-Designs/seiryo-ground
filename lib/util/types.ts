export type Size = "s" | "m" | "l";
export type Cost = "g" | "c" | "e";

export type PlacePaymentType = {
  [key: string]: boolean;
};

export type User = {
  displayName: string;
  photoURL: string;
  email: string;
  metadata: {
    createdAt: string;
    creationTime: string;
    lastLoginAt: string;
    lastSignInTime: string;
  };
};
