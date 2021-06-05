const api = process.env.API_URL || 'https://jsonplaceholder.typicode.com';

const headers = {
  'Accept': 'application/json',
};

export const getUsers = () =>
  fetch(`${api}/users`, { headers })
  .then(res => res.json())
  .then(data => data);

export const getPosts = ({userId}) => {
  const params = userId ? `?userId=${userId}` : '';

  return fetch(`${api}/posts${params}`, {headers})
    .then(res => res.json())
    .then(data => data)
};