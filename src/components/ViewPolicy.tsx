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
import { PermissionType, PolicyType } from "../interfaces";
import { imgStyle } from "../utils/reusable_styles";
import { setPolicy } from "../redux/policyReducer";
import Chip from "@mui/material/Chip";

function Row(props: { row: PolicyType; policy: any; setPolicies: any }) {
  const { row, policy, setPolicies } = props;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleNavigate(p: PolicyType) {
    navigate(`/edit-policy/${p.ID}`);
    dispatch(setPolicy(p));
  }

  async function handleDelete(p: PolicyType) {
    await policy.delete(p.ID);
    setPolicies(await policy.getAll());
    toast.warning("Policy deleted!");
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
          <Chip
            label={row.Kind}
            variant="outlined"
            color={row.Kind === "ALLOW" ? "success" : "error"}
          />
        </TableCell>
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
                    <TableCell>Resource</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.Permissions &&
                    row.Permissions.map((perm: PermissionType) => (
                      <TableRow key={perm.ID}>
                        <TableCell>{perm.Resource}</TableCell>
                        <TableCell>{perm.Action}</TableCell>
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

export default function ViewPolicy() {
  const { policy } = client;
  const [policies, setPolicies] = useState<any>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const allPolicies = await policy.getAllPoliciesWithPermissions();
      setPolicies(allPolicies);
    })();
  }, []);

  return (
    <>
      <Button
        variant="outlined"
        style={{ marginBottom: "20px" }}
        onClick={() => navigate("/create-policy")}
      >
        Create Policy
      </Button>
      {policies && policies.length ? (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Policy ID</TableCell>
                <TableCell>Policy Name</TableCell>
                <TableCell>Policy Kind</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {policies.map((p: PolicyType) => (
                <Row
                  key={p.ID}
                  row={p}
                  policy={policy}
                  setPolicies={setPolicies}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div>
          <img src="fixing.png" alt="no policies" style={imgStyle} />
          <p style={{ textAlign: "center" }}>
            No Policies found. Create one yourself...
          </p>
        </div>
      )}
    </>
  );
}
