import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import {
  errorInterface,
  PermissionType,
  PolicyType,
  RoleType,
} from "../interfaces";

interface InputProps {
  type: string;
  isEdit: PolicyType | PermissionType | RoleType;
  errorX: errorInterface;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  operation: string;
  _name: string;
}

const Input = ({
  type,
  isEdit,
  errorX,
  handleInputChange,
  operation,
  _name,
}: InputProps) => {
  return (
    <div style={{ margin: "20px 0px" }}>
      <InputLabel
        id="demo-simple-select-label"
        style={{ marginBottom: "10px" }}
      >
        {operation}
      </InputLabel>
      <TextField
        id="outlined-basic"
        variant="filled"
        name={_name}
        color="success"
        defaultValue={type === "edit" ? isEdit : ""}
        error={errorX.name === _name && errorX.error}
        helperText={errorX.name === _name && errorX.helperText}
        onChange={handleInputChange}
        fullWidth
      />
    </div>
  );
};

export default Input;
