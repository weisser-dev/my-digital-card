import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {render, screen} from '@testing-library/react';
import {afterEach, describe, expect, it, vi} from 'vitest';
import App from './App';

// react-modal binds to #root at import time (ModalComponent.setAppElement).
vi.hoisted(() => {
  document.body.innerHTML = '<div id="root"></div>';
});

// The card is a static page that fetches its (base64 encoded) profile data at runtime.
const encoded = readFileSync(join(__dirname, '..', 'public', 'data', 'b64ProfileData.json'), 'utf8');
const profile = JSON.parse(Buffer.from(encoded, 'base64').toString('utf8'));

describe('App', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('renders the profile loaded from data/b64ProfileData.json', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(encoded)));
    render(<App/>);
    expect(await screen.findByText(profile.profile.name)).toBeTruthy();
    expect(screen.getAllByRole('link').length).toBeGreaterThan(0);
  });

  it('survives a failed profile request without crashing', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => { throw new Error('offline'); }));
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<App/>);
    await vi.waitFor(() => expect(error).toHaveBeenCalled());
    error.mockRestore();
  });
});
