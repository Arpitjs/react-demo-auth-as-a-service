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
import { toast } from "react-toastify";
import client from "../utils/authClient";
import { PolicyType, RoleType } from "../interfaces";
import { imgStyle } from "../utils/reusable_styles";
import { setRoleX } from "../redux/roleReducer";

interface rowType {
  row: RoleType;
  role: any;
  setRoles: any;
}

function Row(props: rowType) {
  const { row, role, setRoles }: rowType = props;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleNavigate(r: RoleType) {
    navigate(`/edit-role/${r.ID}`);
    dispatch(setRoleX(r));
  }

  async function handleDelete(r: RoleType) {
    await role.delete(r.ID);
    setRoles(await role.getAll());
    toast.warning("Role deleted!");
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
        <TableCell>{row.Name}</TableCell>
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

export default function ViewRole() {
  const { role } = client;
  const [roles, setRoles] = useState<RoleType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const allRoles = await role.getAllRolesWithPolicies();
      setRoles(allRoles);
    })();
  }, []);

  return (
    <>
      <Button
        variant="outlined"
        style={{ marginBottom: "20px" }}
        onClick={() => navigate("/create-role")}
      >
        Create Role
      </Button>
      {roles && roles.length ? (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Role ID</TableCell>
                <TableCell>Role Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map((p: RoleType) => (
                <Row key={p.ID} row={p} role={role} setRoles={setRoles} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div>
          <img src="fixing.png" alt="no roles" style={imgStyle} />
          <p style={{ textAlign: "center" }}>
            No Roles found. Create one yourself...
          </p>
        </div>
      )}
    </>
  );
}
