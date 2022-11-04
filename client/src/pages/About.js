import { useState } from 'react';
import Axios from 'axios';
import '../all_styles/About_style.css'

export default function About() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userList, setUserList] = useState([]);
    const [newPassword, setNewPassword] = useState("");
  
    const addUser = () => {
      Axios.post("http://localhost:3001/create", {
        username: username, 
        password: password,
      }).then(() => {
        setUserList([
          ...userList, 
          {
            username: username, 
            password: password,
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
  
    return (
  
      <div className="App">          
        <div className="users">
          <button onClick={getUsers}>Show Users</button>
  
          {userList.map((val, key) => {
            return (
              <div className='user'> 
                <h1>Username: {val.username}</h1>
                <p>Email:{val.email}</p>
                <p>UserId: {val.id}</p>
                <p>Password:{val.password}</p>
  
                <input type="text" id="updateInput" onChange={(event) => {
                  setNewPassword(event.target.value)
                }}/>
                <button className='Update'  onClick={() => {updateUser(val.username)}}>Update Password</button>
                <button className='Delete'  onClick={() => {deleteUser(val.username)}}>Delete</button>
                
              </div>
            );
          })}
        </div>
      </div>
  
    );
}