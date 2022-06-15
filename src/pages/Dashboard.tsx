import { Box } from "@chakra-ui/react";
import React from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ButtonAppBar from "../Nav";
import ViewPermission from "../components/ViewPermissions";
import ViewPolicy from "../components/ViewPolicy";
import ViewRole from "../components/ViewRole";

export default function Dashboard() {
  const [value, setValue] = React.useState("1");

  const handleChange2 = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <ButtonAppBar />
      <Box
        sx={{ width: "100%", typography: "body1" }}
        style={{ marginBottom: "20px" }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange2} aria-label="lab API tabs example">
              <Tab label="Policies" value="1" />
              <Tab label="Permissions" value="2" />
              <Tab label="Roles" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <ViewPolicy />
          </TabPanel>
          <TabPanel value="2">
            <ViewPermission />
          </TabPanel>
          <TabPanel value="3">
            <ViewRole />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}
