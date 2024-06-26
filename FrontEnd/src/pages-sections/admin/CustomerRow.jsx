import { Delete, Edit } from "@mui/icons-material";
import { FlexBox } from "components/flex-box";
import { Paragraph } from "components/Typography";
import {
  StyledIconButton,
  StyledTableCell,
  StyledTableRow,
} from "./StyledComponents";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, MenuItem, TextField } from "@mui/material"; // ========================================================================

// ========================================================================
const CustomerRow = ({ customer }) => {
  const {
    id,
    username,
    phoneNumber,
    address,
    roleName,
    email,
    counterId,
  } = customer;
  const router = useRouter();
  const [update, setUpdate] = useState();
  const [edit, setEdit] = useState(false);
  const [userName, setUserName] = useState("");
  const [phoneNumberNew, setPhoneNumberNew] = useState("");
  const [addressNew, setAddressNew] = useState("");
  const [roleNameNew, setRoleNameNew] = useState("");
  const [emailNew, setEmailNew] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const Object = {
    userName: userName,
    phoneNumberNew: phoneNumberNew,
    addressNew: addressNew,
    roleNameNew: roleNameNew,
    emailNew: emailNew,
    passwordNew: passwordNew,
  };
  let token = "";
  if (typeof localStorage !== "undefined") {
    token = localStorage.getItem("token");
  } else if (typeof sessionStorage !== "undefined") {
    token = localStorage.getItem("token");
  } else {
    console.log("Web Storage is not supported in this environment.");
  }
  const handleUpdateUser = async () => {
    try {
      const resUpdateAccount = await axios.put(
        `https://four-gems-api-c21adc436e90.herokuapp.com/user/update?id=${id}`,
        {
          id: id,
          name: username,
          userName: userName,
          address: addressNew,
          email: emailNew,
          password: passwordNew,
          phoneNumber: phoneNumberNew,
          roleId: roleNameNew,
          counterId: counterId,
        },
        {
          headers: {
            Authorization: "Bearer " + token, //the token is a variable which holds the token
          },
        }
      );
      window.location.reload();
      console.log(resUpdateAccount.data.data);
    } catch (e) {
      console.log(e);
    }
  };
  const handleDeleteUser = async () => {
    try {
      await axios.delete(
        `https://four-gems-api-c21adc436e90.herokuapp.com/user/delete?userId=${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete account:", error);
    }
  };
  return (
    <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
          {edit ? (
            <TextField
              fullWidth
              name="userName"
              label="Full Name"
              color="info"
              size="medium"
              placeholder="Full Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          ) : (
            <Paragraph>{username}</Paragraph>
          )}
        </FlexBox>
      </StyledTableCell>
      <StyledTableCell
        align="left"
        sx={{
          fontWeight: 400,
        }}
      >
        <FlexBox alignItems="center" gap={1.5}>
          {edit ? (
            <TextField
              fullWidth
              name="phoneNumber"
              label="Phone Number"
              color="info"
              size="medium"
              placeholder="Phone Number"
              value={phoneNumberNew}
              onChange={(e) => setPhoneNumberNew(e.target.value)}
            />
          ) : (
            <Paragraph>{phoneNumber}</Paragraph>
          )}
        </FlexBox>
      </StyledTableCell>

      <StyledTableCell
        align="left"
        sx={{
          fontWeight: 400,
        }}
      >
        <FlexBox alignItems="center" gap={1.5}>
          {edit ? (
            <TextField
              fullWidth
              name="addressNew"
              label="Address"
              color="info"
              size="medium"
              placeholder="Address"
              value={addressNew}
              onChange={(e) => setAddressNew(e.target.value)}
            />
          ) : (
            <Paragraph>{address}</Paragraph>
          )}
        </FlexBox>
      </StyledTableCell>

      <StyledTableCell
        align="left"
        sx={{
          fontWeight: 400,
        }}
      >
        <FlexBox alignItems="center" gap={1.5}>
          {edit ? (
            <TextField
              fullWidth
              name="passwordNew"
              label="Password"
              color="info"
              size="medium"
              placeholder="Password"
              value={passwordNew}
              onChange={(e) => setPasswordNew(e.target.value)}
            />
          ) : (
            <Paragraph>********</Paragraph>
          )}
        </FlexBox>
      </StyledTableCell>
      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
          {edit ? (
            <TextField
              fullWidth
              name="email"
              label="Email"
              color="info"
              size="medium"
              placeholder="Email"
              value={emailNew}
              onChange={(e) => setEmailNew(e.target.value)}
            />
          ) : (
            <Paragraph>{email}</Paragraph>
          )}
        </FlexBox>
      </StyledTableCell>
      <StyledTableCell
        align="left"
        sx={{
          fontWeight: 400,
        }}
      >
        <FlexBox alignItems="center" gap={1.5}>
          {edit ? (
            <TextField
              select
              fullWidth
              color="info"
              size="medium"
              name="roleName"
              placeholder="Role Name"
              onChange={(e) => setRoleNameNew(e.target.value)}
              value={roleNameNew}
              label="Role Name"
            >
              <MenuItem value="3">Admin</MenuItem>
              <MenuItem value="2">Manager</MenuItem>
              <MenuItem value="1">Staff</MenuItem>
            </TextField>
          ) : (
            <Paragraph>{roleName}</Paragraph>
          )}
        </FlexBox>
      </StyledTableCell>

      <StyledTableCell align="center">
        {edit ? (
          <div>
            <Button
              sx={{
                margin: "1px",
                borderRadius: "10px",
              }}
              variant="contained"
              color="info"
              onClick={() => handleUpdateUser()}
            >
              Confirm
            </Button>
            <Button
              sx={{
                margin: "1px",
                width: "89.28px",
                borderRadius: "10px",
              }}
              variant="contained"
              color="error"
              onClick={() => setEdit(!edit)}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <div>
            <StyledIconButton onClick={() => setEdit(!edit)}>
              <Edit />
            </StyledIconButton>
            <StyledIconButton onClick={() => handleDeleteUser()}>
              <Delete />
            </StyledIconButton>
          </div>
        )}
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default CustomerRow;
