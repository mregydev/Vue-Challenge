import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import { screen, waitFor } from '@testing-library/vue';
import { ref } from 'vue';
import Gallery from '../../pages/gallery.vue';

const mockUsers = {
  users: [
    {
      id: 1,
      name: 'Test User',
      albums: [{ id: 1 }],
      posts: [{ id: 1 }],
      comments: [{ id: 1 }],
    },
    {
      id: 2,
      name: 'Another User',
      albums: [],
      posts: [],
      comments: [],
    },
  ],
};

const mockGalleryUser1 = [
  {
    id: 1,
    userId: 1,
    picture: 'https://example.com/photo1.jpg',
    title: 'Photo 1',
    userName: 'Test User',
  },
  {
    id: 2,
    userId: 1,
    picture: 'https://example.com/photo2.jpg',
    title: 'Photo 2',
    userName: 'Test User',
  },
];

const mockGalleryUser2 = [
  {
    id: 3,
    userId: 2,
    picture: 'https://example.com/photo3.jpg',
    title: 'Photo 3',
    userName: 'Another User',
  },
];

const mockFetch = vi.fn((url: string) => {
  if (url.includes('/api/users')) return Promise.resolve(mockUsers);
  if (url.includes('/api/gallery/1')) return Promise.resolve(mockGalleryUser1);
  if (url.includes('/api/gallery/2')) return Promise.resolve(mockGalleryUser2);
  return Promise.resolve([]);
});

mockNuxtImport('useFetch', () => {
  return () => ({
    data: ref(mockUsers),
    pending: ref(false),
    error: ref(null),
  });
});

vi.stubGlobal('$fetch', mockFetch);

describe('Gallery page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockImplementation((url: string) => {
      if (url.includes('/api/users')) return Promise.resolve(mockUsers);
      if (url.includes('/api/gallery/1')) return Promise.resolve(mockGalleryUser1);
      if (url.includes('/api/gallery/2')) return Promise.resolve(mockGalleryUser2);
      return Promise.resolve([]);
    });
  });

  it('renders users list and images', async () => {
    await renderSuspended(Gallery);

    await waitFor(() => {
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThanOrEqual(1);
      expect(headings[0].textContent).toBe('Gallery');

      const userHeadings = headings.filter(
        (h) => h.textContent === 'Test User' || h.textContent === 'Another User'
      );
      expect(userHeadings.length).toBe(2);

      const listItems = screen.getAllByRole('listitem');
      expect(listItems.length).toBe(2);
    });
  });

  it('renders images with role img', async () => {
    await renderSuspended(Gallery);

    await waitFor(
      () => {
        const images = screen.getAllByRole('img');
        expect(images.length).toBe(3);
        expect(images[0].getAttribute('alt')).toBe('Photo 1');
        expect(images[1].getAttribute('alt')).toBe('Photo 2');
        expect(images[2].getAttribute('alt')).toBe('Photo 3');
      },
      { timeout: 3000 }
    );
  });

  it('displays user stats', async () => {
    await renderSuspended(Gallery);

    await waitFor(() => {
      const albumsLabels = screen.getAllByText(/Albums:/);
      const postsLabels = screen.getAllByText(/Posts:/);
      const commentsLabels = screen.getAllByText(/Comments:/);
      expect(albumsLabels.length).toBeGreaterThanOrEqual(1);
      expect(postsLabels.length).toBeGreaterThanOrEqual(1);
      expect(commentsLabels.length).toBeGreaterThanOrEqual(1);
    });
  });
});
