export interface PolicyType {
  ID: string;
  Name: string;
  Kind: string;
}

export interface PermissionType {
  ID: string;
  Resource: string;
  Action: string;
  Policies?: PolicyType[];
}

export interface RoleType {
  ID: string;
  Name: string;
  Policies?: PolicyType[];
}

export interface errorInterface {
  error: boolean;
  helperText: string;
  name: string;
}
