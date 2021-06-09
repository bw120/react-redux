import React from 'react';
import {render, waitForElement} from '@testing-library/react';
import {store} from '../app/store';
import * as Redux from 'react-redux';
import Home from './Home';

const mockUsers = {
  userList: [
    {
      "id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "1-770-736-8031 x56442",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    },
    {
      "id": 2,
      "name": "Ervin Howell",
      "username": "Antonette",
      "email": "Shanna@melissa.tv",
      "address": {
        "street": "Victor Plains",
        "suite": "Suite 879",
        "city": "Wisokyburgh",
        "zipcode": "90566-7771",
        "geo": {
          "lat": "-43.9509",
          "lng": "-34.4618"
        }
      },
      "phone": "010-692-6593 x09125",
      "website": "anastasia.net",
      "company": {
        "name": "Deckow-Crist",
        "catchPhrase": "Proactive didactic contingency",
        "bs": "synergize scalable supply-chains"
      }
    }
  ]
};

test('Renders with headline', () => {
  const { getByText } = render(
    <Redux.Provider store={store}>
      <Home users={mockUsers}/>
    </Redux.Provider>
  );

  expect(getByText(/User List/i)).toBeInTheDocument();
});

test('Renders with search label and input', () => {
  const { getByLabelText, container } = render(
    <Redux.Provider store={store}>
      <Home users={mockUsers}/>
    </Redux.Provider>
  );

  expect(getByLabelText(/Search/i)).toBeInTheDocument();
  expect(container.querySelector('input')).toBeInTheDocument();
});

test('Table renders with table head', async () => {
  const { container } = render(
    <Redux.Provider store={store}>
      <Home users={mockUsers}/>
    </Redux.Provider>
  );

  const table = await waitForElement(() => container.querySelector('table'));
  const tableHead = await waitForElement(() => container.querySelectorAll('thead td'));

  expect(table).toBeInTheDocument();
  expect(tableHead.length).toBe(4);
  expect(tableHead[0].textContent).toBe('name');
  expect(tableHead[1].textContent).toBe('email');
  expect(tableHead[2].textContent).toBe('city');
  expect(tableHead[3].textContent).toBe('company');
});

test('Table body renders with data', async () => {
  const { container } = render(
    <Redux.Provider store={store}>
      <Home users={mockUsers} />
    </Redux.Provider>
  );

  const tableBody = await waitForElement(() => container.querySelector('tbody'));
  const firstRow = await waitForElement(() => container.querySelectorAll('tbody tr')[0]);
  const cols = await waitForElement(() => firstRow.querySelectorAll('td'));

  expect(tableBody).toBeInTheDocument();
  expect(cols.length).toBe(4);
  expect(cols[0].textContent).toBe('Leanne Graham');
  expect(cols[1].textContent).toBe('Sincere@april.biz');
  expect(cols[2].textContent).toBe('Gwenborough');
  expect(cols[3].textContent).toBe('Romaguera-Crona');
});
