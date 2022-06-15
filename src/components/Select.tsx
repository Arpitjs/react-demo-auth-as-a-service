import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { PermissionType } from "../interfaces";

interface SelectProps {
  type: string;
  currentPermission: PermissionType;
  policies: {
    name: string;
    kind: string;
    permissionid: string;
  };
  permissions: PermissionType[];
  handleChange: (e: SelectChangeEvent) => void;
}

const SelectComp = ({
  type,
  currentPermission,
  policies,
  permissions,
  handleChange,
}: SelectProps) => {
  const check = () =>
    type === "edit" && currentPermission
      ? "Permission: " + currentPermission.Action
      : "Permission";
  return (
    <div>
      <Box>
        <FormControl style={{ minWidth: "360px" }}>
          <InputLabel id="demo-simple-select-label">{check()}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={policies.permissionid ? policies.permissionid : ""}
            label={check()}
            onChange={handleChange}
            style={{ width: "435px" }}
          >
            {permissions && permissions.length ? (
              permissions.map((p: PermissionType) => (
                <MenuItem value={p.ID} key={p.ID}>
                  {p.Action}
                </MenuItem>
              ))
            ) : (
              <MenuItem>No Permissions Found.</MenuItem>
            )}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default SelectComp;
