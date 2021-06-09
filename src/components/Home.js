import React, { useState } from 'react';
import {
  useHistory,
} from "react-router-dom";
import './Home.css';

function User(props) {
  const {userList = [], status} = props.users;

  const [query, setQuery] = useState('');

  const updateQuery = (e) => {
    setQuery(e.target.value);
  }

  const matchQuery = (item) => {
    let match = new RegExp(`${query}`, 'i');
    return match.test(item.name);
  }

  const history = useHistory();

  const handleClick = (e, userId) => {
    e.preventDefault();
    history.push(`/post/${userId}`)
  }

  return (
    <>
      <h1>User List</h1>
      <div className="search-box">
        <label>Search:&nbsp;
          <input type="text" onChange={updateQuery} value={query} />
        </label>
      </div>
      {(status === 'loading' && userList.length === 0) ? <p>Loading</p> : (
        <table className="user-list">
          <thead>
            <tr>
              <td>name</td>
              <td>email</td>
              <td>city</td>
              <td>company</td>
            </tr>
          </thead>
          <tbody>
            {userList.filter(matchQuery).map((item) => {
              const {
                id,
                name,
                email,
                company: {
                  name: companyName,
                } = {},
                address: {
                  city,
                }
              } = item;

              return (
                <tr onClick={(e) => handleClick(e, id)} key={name}>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{city}</td>
                  <td>{companyName}</td>
                </tr>
              )})}
          </tbody>
        </table>
      )}
    </>
  );
}


export default User;
