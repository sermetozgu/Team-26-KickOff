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
}

export default App;
