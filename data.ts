export const companyName = "Falore Autos";
export const appTitle = "Falore CRM";
export const appDescription = "Falore Autos inventory management system";
export const companyRegion = "Lagos";
export const companyCountry = "Nigeria";
export const companyStreetAddress = "Adjacent azkol Oil, langbasa road, Ajah";
export const companyAddress = `${companyStreetAddress}, ${companyRegion}, ${companyCountry}`;
export const companyPhoneNumber = "+2349090060060";
export const companyEmail = "faloreautocare@gmail.com";

export type Permissions = {
  [key: string]: string[] | boolean;
};

export interface Group {
  name: string;
  description: string;
  permissions: Permissions;
}

export const permissions = [
  {
    scope: "user",
    actions: ["create", "read", "update", "delete"],
  },
  {
    scope: "customer",
    actions: ["create", "read", "update", "delete"],
  },
  {
    scope: "product",
    actions: ["create", "read", "update", "delete"],
  },
  {
    scope: "order",
    actions: ["create", "read", "update", "delete"],
  },
  {
    scope: "payment",
    actions: ["create", "read", "update", "delete"],
  },
  {
    scope: "permission",
    actions: ["read", "update"],
  },
  {
    scope: "log",
    actions: ["read"],
  },
];

export const groupPermissions: {
  [key: string]: Permissions;
} = {
  Admin: {
    user: true,
    customer: true,
    product: true,
    order: true,
    payment: true,
    permission: true,
    log: true,
  },
  Owner: {
    user: true,
    customer: true,
    product: true,
    order: true,
    payment: true,
    permission: true,
    log: true,
  },
  Mechanic: {
    user: false,
    customer: ["read"],
    product: ["read"],
    order: ["read"],
    payment: ["read"],
    permission: false,
    log: false,
  },
  Teller: {
    user: ["read"],
    customer: true,
    product: true,
    order: true,
    payment: true,
    permission: false,
    log: false,
  },
};

export const groups: Group[] = [
  {
    name: "Owner",
    description:
      "Owners use the CRM to monitor overall business performance, analyze trends in service demand, and identify opportunities for growth or improvement.",
    permissions: groupPermissions.Owner,
  },
  {
    name: "Admin",
    description:
      "The admin is responsible for overseeing and managing the entire CRM system.",
    permissions: groupPermissions.Admin,
  },
  {
    name: "Mechanic",
    description: "The mechanic is responsible for managing the workshop.",
    permissions: groupPermissions.Mechanic,
  },
  {
    name: "Teller",
    description:
      "The teller is responsible for processing payments, managing customer accounts, and generating invoices.",
    permissions: groupPermissions.Teller,
  },
];
