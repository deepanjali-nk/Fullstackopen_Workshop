import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Note from './Note';
import { test, expect } from 'vitest';

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  };

  render(<Note notes={note} updateNote={() => {}} />); // Ensure updateNote is provided
  screen.debug(); 

  const div = screen.getByText(/Component testing is done with react-testing-library/i);
  expect(div).toBeInTheDocument();
});

test('clicking the button calls event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }
  
  const mockHandler = vi.fn()

  render(
    <Note note={note} updateNote={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('change true')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
});

test('toggled content can be closed', async () => {
  const user = userEvent.setup()
  const button = screen.getByText('show...')
  await user.click(button)

  const closeButton = screen.getByText('cancel')
  await user.click(closeButton)

  const div = container.querySelector('.togglableContent')
  expect(div).toHaveStyle('display: none')
})
