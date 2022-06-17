import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { PolicyType } from "../interfaces";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface SelectProps {
  policies: PolicyType[];
  selected: string[];
  handleChange: (e: SelectChangeEvent<string[]>) => void;
}

export default function SelectComponent2({
  policies,
  selected,
  handleChange,
}: SelectProps) {
  const theme = useTheme();

  const toRender = (selected: any) => {
    return (
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
        {selected.map((value: any) => {
          const matchedPolicy = policies.find((p: any) => p.ID === value);
          return (
            <Chip key={value} label={matchedPolicy && matchedPolicy.Name} />
          );
        })}
      </Box>
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Policies</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selected}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Policies" />}
          renderValue={toRender}
          MenuProps={MenuProps}
        >
          {policies && policies.length ? (
            policies.map((p: any) => (
              <MenuItem
                key={p.ID}
                value={p.ID}
                style={getStyles(p, selected, theme)}
              >
                {p.Name}
              </MenuItem>
            ))
          ) : (
            <MenuItem>no policies to pick from.</MenuItem>
          )}
        </Select>
      </FormControl>
    </div>
  );
}
