import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import { SelectChangeEvent } from "@mui/material";
import { PolicyType } from "../interfaces";

interface RadioButtonProps {
  type: string;
  isEdit: PolicyType;
  handleRadio: (e: SelectChangeEvent) => void;
}

const RadioButton = ({ type, isEdit, handleRadio }: RadioButtonProps) => {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Kind</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        defaultValue={type === "edit" ? isEdit["Kind"] : ""}
        onChange={handleRadio}
      >
        <FormControlLabel value="ALLOW" control={<Radio />} label="ALLOW" />
        <FormControlLabel value="DENY" control={<Radio />} label="DENY" />
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButton;
