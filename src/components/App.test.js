import React from 'react';
import {render, screen, waitForElement} from '@testing-library/react';
import * as Redux from 'react-redux';
import {store} from '../app/store';
import { act } from 'react-dom/test-utils';
import App from './App';

test('renders with container', () => {
  const { container } = render(
    <Redux.Provider store={store}>
      <App />
    </Redux.Provider>
  );

  expect(container.firstChild).toHaveClass('app');
  expect(container.querySelector('.container')).toBeInTheDocument();
});

test('Loads root page by default', () => {
  render(
    <Redux.Provider store={store}>
      <App />
    </Redux.Provider>
  )

  expect(screen.getByText(/User List/i)).toBeInTheDocument()
})

test('Post page loads on row click', async () => {
  const {container} = render(
    <Redux.Provider store={store}>
      <App />
    </Redux.Provider>
  )
  const firstTableRow = await waitForElement(() => container.querySelectorAll('tbody tr')[0]);
    act(() => {
    firstTableRow.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(screen.getByText(/Posts from/i)).toBeInTheDocument()
})

test('loads dispatches event to load user data on init', () => {
  const useDispatchSpy = jest.spyOn(Redux, 'useDispatch');
  const mockDispatchFn = jest.fn()
  useDispatchSpy.mockReturnValue(mockDispatchFn);
  const { container } = render(
    <Redux.Provider store={store}>
      <App />
    </Redux.Provider>
  );
  expect(mockDispatchFn).toHaveBeenCalled();
});