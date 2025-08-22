import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { millisToMinutesAndSeconds } from '@/utils/timers';

import { TracksListCard } from './TracksListCard';

describe('TracksListCard', () => {
  it('should render the tracks list', () => {
    const mockTracks = [
      {
        id: '1',
        name: 'Track 1',
        albumName: 'Album 1',
        albumImage: 'https://via.placeholder.com/150',
        artists: [{ name: 'Artist 1' }],
        duration_ms: 123456,
      },
    ];
    const { getByText } = render(<TracksListCard tracks={mockTracks} />);
    const trackName = getByText('Track 1');
    const artistName = getByText('Artist 1');
    const duration = getByText(millisToMinutesAndSeconds(mockTracks[0].duration_ms));

    expect(trackName).toBeTruthy();
    expect(artistName).toBeTruthy();
    expect(duration).toBeTruthy();
  });
});
