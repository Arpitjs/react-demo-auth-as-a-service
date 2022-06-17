import { SelectChangeEvent } from "@mui/material/Select";
import { FC, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ButtonAppBar from "../components/Nav";
import { Params, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setPolicy } from "../redux/policyReducer";
import client from "../utils/authClient";
import { PermissionType } from "../interfaces";
import { center } from "../utils/reusable_styles";
import Input from "../components/Input";
import RadioButton from "../components/RadioButton";
import ButtonComp from "../components/Button";
import SelectComponent from "../components/Select";

const PolicyForm: FC<{ type: string }> = ({ type }) => {
  const { permission, policy } = client;
  const [permissions, setPermissions] = useState<PermissionType[]>([]);
  const [policies, setPolicies] = useState({
    name: "",
    kind: "",
  });
  const [errorX, setErrorX] = useState({
    error: false,
    helperText: "",
    name: "",
  });

  const [selected, setSelected] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<any[]>) => {
    const { value } = event.target;
    setSelected(typeof value === "string" ? value.split(",") : value);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { policy2 } = useSelector((state: any) => state.policy);
  const params: Readonly<Params<string>> = useParams();

  useEffect(() => {
    (async () => {
      const allPermissions: PermissionType[] = await permission.getAll();
      setPermissions(allPermissions);
    })();
  }, []);

  useEffect(() => {
    if (type === "edit") setPolicies(policy2);
  }, []);

  const handleRadio = (event: SelectChangeEvent) => {
    setPolicies((prev) => ({
      ...prev,
      kind: event.target.value as string,
    }));
  };

  function handleBack() {
    navigate("/");
    dispatch(setPolicy({}));
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPolicies((prev) => ({
      ...prev,
      name: value,
    }));
    value === ""
      ? setErrorX({
          error: true,
          helperText: "name is required",
          name,
        })
      : setErrorX({ error: false, helperText: "", name });
  };

  async function handleSubmit() {
    let text = "";
    if (type === "create") {
      await policy.createWithAllowOrDeny({
        ...policies,
        permissionid: selected,
      });
      text = "created";
    } else {
      if (params.id) await policy.updateWithAllowOrDeny(params.id, policies);
      text = "updated";
    }
    toast.success(`policy ${text}!`);
  }

  return (
    <div style={{ position: "relative", backgroundColor: "white" }}>
      <ButtonAppBar />
      <Button
        variant="outlined"
        onClick={handleBack}
        style={{ margin: "0px 0px 20px 40px" }}
      >
        Go Back
      </Button>
      <p
        style={{
          textAlign: "center",
          fontSize: "larger",
          position: "absolute",
          top: "20%",
          left: "40%",
        }}
      >
        {" "}
        {type === "create" ? "Create a Policy..." : `Edit: ${policy2.Name}... `}
      </p>
      <div style={center}>
        {type === "create" && (
          <SelectComponent
            permissions={permissions}
            handleChange={handleChange}
            selected={selected}
          />
        )}
        <Input
          type={type}
          isEdit={policy2.Name}
          errorX={errorX}
          handleInputChange={handleInputChange}
          operation="Policy Name"
          _name="name"
        />
        <RadioButton type={type} isEdit={policy2} handleRadio={handleRadio} />
        <ButtonComp
          handleSubmit={handleSubmit}
          type={type}
          errorX={errorX}
          toValidate={[policies.name, policies.kind]}
        />
      </div>
    </div>
  );
};

export default PolicyForm;
