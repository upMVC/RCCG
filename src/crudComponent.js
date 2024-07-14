/*
 *   Copyright (c) 2024 BitsHost
 *   All rights reserved.

 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:

 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.

 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 */



import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsersCrudComponent = () => {
    const [users, setUsers] = useState([]);
    const [id, setId] = useState('');
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const apiUrl = 'https://upmvc.com/demo/apiUsers';

    const fetchData = async () => {
      try {
          const config = {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          };

          const data = {
              task: 'readall',
             
          };
          const response = await axios.post(apiUrl, data, config);
          console.log(response.data);
          setUsers(response.data);
        } catch (error) {
            console.log('Error fetching userss:', error);
        }
    };

    const handleAddData = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };

            const data = {
                task: 'create',
                id: id,
        name: name,
        email: email,
        username: username,
        password: password
            };

            const response = await axios.post(apiUrl, data, config);
            setUsers([...users, response.data]);
            setId('');
    setName('');
    setEmail('');
    setUsername('');
    setPassword('');
        } catch (error) {
            console.error('Error creating users:', error);
        }
    };

    const handleUpdateData = async (id, name, email, username, password) => {
      try {
          const config = {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          };

          const data = {
              task: 'update',
              id: id,
name: name,
email: email,
username: username,
password: password
          };

          // Make the update request using axios
          const response = await axios.post(apiUrl, data, config);
          console.log('User updated successfully:', response.data);
          alert("Item Updated");
          // You can update the user state if needed
          //setUsers([...users, response.data]);
          // Reset input fields
          // setId('');
          // setOtherField('');
          // ...
      } catch (error) {
          console.error('Error updating user:', error);
      }
  };
  


    const handleDeleteData = async (id) => {
      try {
          const config = {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          };

          const data = {
              task: 'delete',
              id: id,
          };

          // Make the delete request using axios
          const response = await axios.post(apiUrl, data, config);
          console.log('User deleted successfully:', response.data);
          // You can update the user state if needed
          // setUsers([...users, response.data]);
          // You can also remove the deleted user from the state
          // setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
          let subsWrapper = document.getElementById('user-row-' + id);
          subsWrapper.remove();
      } catch (error) {
          console.error('Error deleting user:', error);
      }
  };

    const handleInputChange = (id, field, value) => {
      setUsers(prevUsers =>
          prevUsers.map(user => {
              if (user.id === id) {
                  return { ...user, [field]: value };
              }
              return user;
          })
      );
  };

    return (
        <div>
            <h2>Users CRUD</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleAddData();
            }}>
                <input type="text" placeholder="id" value={id} onChange={(e) => setId(e.target.value)} />
<input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
<input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
<input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
<input type="text" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Create Users</button>
            </form>

            <div className="table-container">
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Password</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        
{users.map(u => (
  <tr key={u.id} id={'user-row-' + u.id}>
    <td>
        <input
          type="text"
          value={u['id']}
          onChange={(e) => handleInputChange(u.id, 'id', e.target.value)}
        />
      </td>
<td>
        <input
          type="text"
          value={u['name']}
          onChange={(e) => handleInputChange(u.id, 'name', e.target.value)}
        />
      </td>
<td>
        <input
          type="text"
          value={u['email']}
          onChange={(e) => handleInputChange(u.id, 'email', e.target.value)}
        />
      </td>
<td>
        <input
          type="text"
          value={u['username']}
          onChange={(e) => handleInputChange(u.id, 'username', e.target.value)}
        />
      </td>
<td>
        <input
          type="text"
          value={u['password']}
          onChange={(e) => handleInputChange(u.id, 'password', e.target.value)}
        />
      </td>
    <td>
      <button onClick={() => handleUpdateData(u['id'], u['name'], u['email'], u['username'], u['password'])}>Update</button>
      <button onClick={() => handleDeleteData(u.id)}>Delete</button>
    </td>
  </tr>
))}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersCrudComponent;
