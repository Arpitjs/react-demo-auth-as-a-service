export interface PolicyType {
  ID: string;
  Name: string;
  Kind: string;
  PermissionId: string;
}

export interface PermissionType {
  ID: string;
  Resource: string;
  Action: string;
  Policies?: PolicyType[];
}

export interface errorInterface {
  error: boolean;
  helperText: string;
  name: string;
}
