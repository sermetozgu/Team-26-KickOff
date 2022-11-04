import {useState} from 'react';
import {Avatar, Grid, Paper, TextField, Typography, Button, Link} from "@mui/material"
import Axios from 'axios';
import '../all_styles/Login_style.css'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function Login() {
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

  const deleteUser = (username) => {
    const api_str = "http://localhost:3001/delete/"
    const api_str2 = api_str + username
    Axios.delete(api_str2);
  };

  const updateUser = (username) => {
    Axios.put("http://localhost:3001/update", {
      username: username,
      password: newPassword,
    });
    setNewPassword("")
  };

  const Login=() => {
    const paperStyle={padding : 20, height: "70vh", width: 350, margin: "30px auto"}
    const avatarStyle={backgroundColor: "green"}
    const buttonStyle={margin: "8px 0"}
    return(
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align= "center">
            <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
            <h2>Log In</h2>
          </Grid>
            <TextField label="Username" placeholder='Enter Username' fullWidth required/>
            <TextField label="Password" placeholder='Enter Password' type="password" fullWidth required/>
          <FormControlLabel
            control={
              <Checkbox 
                  name="CheckB" 
                  color="primary"
              />
            }
            label="Remember me"
          />
          <Button type="submit" color="primary" variant='contained' style = {buttonStyle} fullWidth>Log In</Button>
          <Typography>
            <Link href = "#">
              Forgot password
            </Link>
          </Typography>
          <Typography> Do you have an account?
            <Link href = "/signin">
              Sign up
            </Link>
          </Typography>
        </Paper>
      </Grid>
    );
  }

  return (
    <div className='Login'>
      <Login/>      
    </div>
   
  );
}