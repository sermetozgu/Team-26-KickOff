import './App.css';
import {useState} from 'react';
import Axios from 'axios';

function App() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userList, setUserList] = useState([]);
  const [newUser, setNewUser] = useState("");

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
      username: newUser,
    });
    setNewUser("")
  };

  return (
    <div className="App">
      <div className="information">
        <label>Username:</label>
        <input
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
          } } />
        <label>Password:</label>
        <input
          type="text"
          onChange={(event) => {
            setPassword(event.target.value);
          } } />
        <button onClick={addUser}>Add User</button>
      </div>
      <div className="users">
        <button onClick={getUsers}>Show Users</button>

        {userList.map((val, key) => {
          return (
            <div className='user'> 
              <h1>Username: {val.username}</h1>
              <p>Password:{val.password}</p>
              <p>UserId: {val.id}</p>

              <button onClick={() => {deleteUser(val.username)}}>Delete</button>
              <input type="text" id="updateInput" onChange={(event) => {
                setNewUser(event.target.value)
              }}/>
              <button onClick={() => {updateUser(val.username)}}>Update</button>
              
            </div>
          );
        })}
      </div>
    </div>

    

  );
}

export default App;
