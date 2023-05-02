export type Size = "s" | "m" | "l";
export type Category = "g" | "b" | "r" | "p";
export type Cost = "無料" | "現金" | "クレジットカード" | "電子マネー";

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
