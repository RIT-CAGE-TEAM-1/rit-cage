import React from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Button } from "@mantine/core";
import StudentShell from "./StudentShell";

function CheckoutConfiirmation({ user }) {
  const navigate = useNavigate();
  const location = useLocation();

  const params = useParams();

  // const [item, setItem] = useState();

  // React.useEffect(() => {
  //   getItem(params.id);
  // }, []);

  // React.useEffect(() => {
  //   console.log("State item");
  //   console.log(item);
  // }, [item]);

  // const getItem = async (modelId) => {
  //   try {
  //     const items = await ItemAPI.getItemModel(modelId);
  //     console.log({ items });
  //     setItem(items);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const { state } = useLocation();
  const { name, typeN, category } = state;

  return (
    <>
      <StudentShell user={user}>
        <div style={{ paddingLeft: "1em" }}>
          <IoIosCheckmarkCircle color="#F76902" style={{ fontSize: "60px" }} />
          <h1 style={{ color: "#F76902", marginBottom: "0" }}>
            Reservation Confirmation
          </h1>

          <h3> {name}</h3>
          <h4> 1x</h4>

          {/* Container for type title and value */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <h4
              style={{
                fontWeight: "350",
                paddingRight: "1em",
                marginBottom: "0",
              }}
            >
              Type:
            </h4>
            <h4 style={{ fontWeight: "600" }}> {typeN} </h4>
          </div>

          {/* Container for type Category and value */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <h4
              style={{ fontWeight: "350", paddingRight: "1em", marginTop: "0" }}
            >
              Category:{" "}
            </h4>
            <h4 style={{ fontWeight: "600", marginTop: "0" }}>{category}</h4>
          </div>

          <h3 style={{ color: "#F76902", marginBottom: "0" }}>
            {" "}
            Return Date:{" "}
          </h3>
          <h4 style={{ marginTop: "0" }}> xxxx </h4>

          <Button
            color="orange"
            radius="xl"
            type="submit"
            style={{ marginTop: "1.5em" }}
            onClick={() => {
              navigate("/studentList");
            }}
          >
            Back to Home
          </Button>
        </div>
      </StudentShell>
    </>
  );
}

export default CheckoutConfiirmation;
