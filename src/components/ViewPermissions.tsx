import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState, useEffect } from "react";
import { EditOutlined, DeleteOutlined } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { setPermission } from "../redux/permissionReducer";
import { toast } from "react-toastify";
import client from "../utils/authClient";
import { PermissionType, PolicyType } from "../interfaces";
import { imgStyle } from "../utils/reusable_styles";

function Row(props: {
  row: PermissionType;
  permission: any;
  setPermissions: any;
}) {
  const { row, permission, setPermissions } = props;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleNavigate(p: PermissionType) {
    navigate(`/edit-permission/${p.ID}`);
    dispatch(setPermission(p));
  }

  async function handleDelete(p: PermissionType) {
    await permission.delete(p.ID);
    setPermissions(await permission.getAll());
    toast.warning("Permission deleted!");
  }

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.ID}</TableCell>
        <TableCell>{row.Action}</TableCell>
        <TableCell>{row.Resource}</TableCell>
        <TableCell>
          <DeleteOutlined
            style={{ marginRight: "30px" }}
            className="pointer"
            onClick={() => handleDelete(row)}
          />
          <EditOutlined
            className="pointer"
            onClick={() => handleNavigate(row)}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Policies
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Kind</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.Policies &&
                    row.Policies.map((pol: PolicyType) => (
                      <TableRow key={pol.ID}>
                        <TableCell>{pol.Name}</TableCell>
                        <TableCell>{pol.Kind}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function ViewPermission() {
  const { permission } = client;
  const [permissions, setPermissions] = useState<any>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const allPermissions = await permission.getAllPermissionsWithPolicy();
      setPermissions(allPermissions);
    })();
  }, []);

  return (
    <>
      <Button
        variant="outlined"
        style={{ marginBottom: "20px" }}
        onClick={() => navigate("/create-permission")}
      >
        Create Permission
      </Button>
      {permissions && permissions.length ? (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Permission ID</TableCell>
                <TableCell>Permission Action</TableCell>
                <TableCell>Permission Resource</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {permissions.map((p: PermissionType) => (
                <Row
                  key={p.ID}
                  row={p}
                  permission={permission}
                  setPermissions={setPermissions}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div>
          <img src="fixing.png" alt="no permissions" style={imgStyle} />
          <p style={{ textAlign: "center" }}>
            No Permissions found. Create one yourself...
          </p>
        </div>
      )}
    </>
  );
}
