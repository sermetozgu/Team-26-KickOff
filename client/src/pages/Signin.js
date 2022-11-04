import { useState } from 'react';
import { Avatar, Grid, Paper, TextField, Typography, Button, Link } from "@mui/material"
import Axios from 'axios';
import '../all_styles/Signin_style.css'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userList, setUserList] = useState([]);
  const [newPassword, setNewPassword] = useState("");

  const addUser = () => {
    Axios.post("http://localhost:3001/create", {
      username: username,
      password: password,
      email: email,
    }).then(() => {
      setUserList([
        ...userList,
        {
          username: username,
          password: password,
          email: email,
        }
      ]);
    });
  };

  const getUsers = () => {
    Axios.get("http://localhost:3001/users").then((response) => {
      setUserList(response.data);
    });
  };

  const paperStyle = { padding: 20, height: "70vh", width: 350, margin: "30px auto" }
  const avatarStyle = { backgroundColor: "green" }
  const buttonStyle = { margin: "8px 0" }
  return (
    <Grid>
      <Paper elevation={5} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
          <h2>Sign In</h2>
        </Grid>
        <div className='information'>
          <label>Username:</label>
          <input
            type="text"
            onChange={(event) => {
              setUsername(event.target.value);
            }} />
          <label>Email:</label>
          <input
            type="text"
            onChange={(event) => {
              setEmail(event.target.value);
            }} />
          <label>Password:</label>
          <input
            type="text"
            onChange={(event) => {
              setPassword(event.target.value);
            }} />
        </div>

        <button onClick={addUser}>Sign In</button>
      </Paper>
    </Grid>
  );
}