import "../App.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { EditOutlined, DeleteOutlined } from "@material-ui/icons";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Chip from "@mui/material/Chip";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setPolicy } from "../redux/policyReducer";
import client from "./../utils/authClient";
import axios from "axios";
import { PolicyType } from "../interfaces";
import { imgStyle } from "../utils/reusable_styles";

export default function ViewPolicy() {
  const { policy } = client;
  const [pp, setPp] = useState<any>([]);
  const [policies, setPolicies] = useState<PolicyType[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEdit = (p: PolicyType) => {
    navigate(`/edit-policy/${p.ID}`);
    dispatch(setPolicy(p));
  };

  useEffect(() => {
    (async () => {
      const allPolicies = await policy.getAll();
      setPolicies(allPolicies);
      const x = await axios.get("http://localhost:8080/v1/policy-permission/");
      setPp(x.data);
    })();
  }, []);

  async function handleDelete(p: PolicyType) {
    await policy.delete(p.ID);
    setPolicies(await policy.getAll());
    toast.warning("Policy deleted!");
  }

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
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Policy ID</TableCell>
                <TableCell>Policy Name</TableCell>
                <TableCell>Policy Kind</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {policies.map((p: PolicyType) => {
                return (
                  <TableRow key={p.ID}>
                    <TableCell>{p.ID}</TableCell>
                    <TableCell>{p.Name}</TableCell>
                    <TableCell>
                      <Chip
                        label={p.Kind}
                        variant="outlined"
                        color={p.Kind === "ALLOW" ? "success" : "error"}
                      />
                    </TableCell>
                    <TableCell>
                      <EditOutlined
                        onClick={() => handleEdit(p)}
                        style={{ marginRight: "30px" }}
                        className="pointer"
                      />
                      <DeleteOutlined
                        onClick={() => handleDelete(p)}
                        className="pointer"
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div>
          <img src="fixing.png" alt="fixing" style={imgStyle} />
          <p style={{ textAlign: "center" }}>
            No Policies found. Create one yourself...
          </p>
        </div>
      )}
    </>
  );
}
