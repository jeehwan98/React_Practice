import { render, screen } from '@testing-library/react';
import Async from './Async';

describe('Async component', () => {
  test('renders posts if request succeeds', async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: 'p1', title: 'First post' }] // an array since we're expecting an array of data
    });

    render(<Async />)

    // since list items are roles, we use `getAllByRole`
    // initial items, there are no items as we have an emptyArray for the initial posts
    // therefore, we have to use `findAllByRole`, which returns a promise
    const listItemElements = await screen.findAllByRole('listitem');
    expect(listItemElements).not.toHaveLength(0);
  });
});