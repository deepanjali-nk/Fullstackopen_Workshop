import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
import Note from './Note';
import Togglable from './Togglable'; // adjust the path as needed
import { test, expect } from 'vitest';

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  };

  render(<Note notes={note} updateNote={() => {}} />); // Change `note` to `notes`

  const div = screen.getByText(/Component testing is done with react-testing-library/i);
  expect(div).toBeInTheDocument();
});

test('clicking the button calls event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  };

  const mockHandler = vi.fn();

  render(
    <Note notes={note} updateNote={mockHandler} />  // Change `note` to `notes`
  );

  const user = userEvent.setup();
  const button = screen.getByText('change true');
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
});

// test('toggled content can be closed', async () => {
//   const user = userEvent.setup()

//   // First, click the 'show' button to reveal the content
//   const button = screen.getByText('show')
//   await user.click(button)

//   // Click the 'cancel' button to close the content
//   const cancelButton = screen.getByText('cancel')
//   await user.click(cancelButton)

//   // Check that the content is hidden (display: none)
//   const div = screen.queryByText('Content') // or query the element that contains the content
//   expect(div).toHaveStyle('display: none') // It should be hidden after canceling
// });




