import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import "../App.css";

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }} style={{ marginBottom: "20px" }}>
      <AppBar position="static" elevation={0} style={{ background: "#FFFFFF" }}>
        <Toolbar>
          <div style={{ padding: "5px 0px" }}>
            <img
              src={process.env.PUBLIC_URL + "/logo_vyaguta.png"}
              alt="logo"
              width="40px"
              height="40px"
            />
          </div>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            style={{
              color: "#333333",
              paddingLeft: "20px",
              fontSize: "30px",
              fontWeight: "lighter",
            }}
          >
            Vyaguta Authorization as a Service
          </Typography>
          <hr />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
