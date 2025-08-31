import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { ErrorState } from './ErrorState';

describe('ErrorState', () => {
  it('should render the error state', () => {
    const message = 'Error na busca de artistas';
    const mockFn = vi.fn();
    const { getByText } = render(<ErrorState message={message} onRetry={mockFn} />);
    const title = getByText('Ops! Algo deu errado');
    const messageError = getByText(message);
    expect(title).toBeTruthy();
    expect(messageError).toBeTruthy();
    expect(mockFn).not.toHaveBeenCalled();
  });

  it('should call onRetry when button is clicked', () => {
    const message = 'Error na busca de artistas';
    const mockFn = vi.fn();
    const { getByText } = render(<ErrorState message={message} onRetry={mockFn} />);
    const button = getByText('Tentar novamente');
    button.click();
    expect(mockFn).toHaveBeenCalled();
  });
});
