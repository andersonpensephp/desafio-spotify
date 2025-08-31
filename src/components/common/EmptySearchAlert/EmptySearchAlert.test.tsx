import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import EmptySearchAlert from './EmptySearchAlert';

describe('EmptySearchAlert', () => {
  it('should render the empty search alert', () => {
    const { getByText } = render(<EmptySearchAlert />);
    const title = getByText('Digite uma pesquisa');
    const message = getByText('Nenhum resultado encontrado');
    expect(title).toBeTruthy();
    expect(message).toBeTruthy();
  });
});
