import React from 'react';
import {render, waitForElement, cleanup} from '@testing-library/react';
import {store} from '../app/store';
import * as Redux from 'react-redux';
import Post from './Post';
import nock from 'nock';
import { createMemoryHistory } from "history";
import { Router, Route } from "react-router-dom";

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

const nockScope = nock('https://jsonplaceholder.typicode.com')
  .persist()
  .defaultReplyHeaders({"access-control-allow-origin": "*"})
  .get('/posts?userId=2')
  .once()
  .reply(200, [
    {
      "userId": 2,
      "id": 11,
      "title": "et ea vero quia laudantium autem",
      "body": "delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus"
    },
    {
      "userId": 2,
      "id": 12,
      "title": "in quibusdam tempore odit est dolorem",
      "body": "itaque id aut magnam\npraesentium quia et ea odit et ea voluptas et\nsapiente quia nihil amet occaecati quia id voluptatem\nincidunt ea est distinctio odio"
    },
  ]);

function renderWithProviders(
  ui,
  {
    path = '/post/:userId', // ie. "/project/:id"
    route = "/post/2",
    history = createMemoryHistory({ initialEntries: [route] })
  } = {},
) {
  return {
    ...render(
      <Router history={history}>
        <Route path={path}>{ui}</Route>
      </Router>
    ),
    history
  };
}

test('Renders with headline', async () => {
  const { getByText } = renderWithProviders(
    <Redux.Provider store={store}>
      <Post users={mockUsers}/>
    </Redux.Provider>
  );

  expect(getByText(/Posts from/i)).toBeInTheDocument();
});

test('Table renders with table head', async () => {
  const { container } = renderWithProviders(
    <Redux.Provider store={store}>
      <Post users={mockUsers}/>
    </Redux.Provider>
  );

  const table = await waitForElement(() => container.querySelector('table'));
  const tableHead = await waitForElement(() => container.querySelectorAll('thead td'));

  expect(table).toBeInTheDocument();
  expect(tableHead.length).toBe(2);
  expect(tableHead[0].textContent).toBe('Title');
  expect(tableHead[1].textContent).toBe('Body');
});

test('Table body renders with data', async () => {
  const { container } = renderWithProviders(
    <Redux.Provider store={store}>
      <Post users={mockUsers}/>
    </Redux.Provider>
  );

  const tableBody = await waitForElement(() => container.querySelector('tbody'));
  const firstRow = await waitForElement(() => container.querySelectorAll('tbody tr')[0]);
  const cols = await waitForElement(() => firstRow.querySelectorAll('td'));

  expect(tableBody).toBeInTheDocument();
  expect(cols.length).toBe(2);
  expect(cols[0].textContent).toBe('et ea vero quia laudantium autem');
  expect(cols[1].textContent).toBe('delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus');
});
