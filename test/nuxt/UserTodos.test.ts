import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import { screen, waitFor, fireEvent } from '@testing-library/vue';
import { ref, reactive } from 'vue';
import UserTodos from '../../components/UserTodos.vue';

const mockTodos = [
  { id: 1, title: 'Todo One', completed: true },
  { id: 2, title: 'Todo Two', completed: false },
  { id: 3, title: 'Todo Three', completed: true },
  { id: 4, title: 'Todo Four', completed: false },
];

const routeState = reactive({
  params: { id: '1' },
  query: {} as Record<string, string>,
  path: '/user/1',
});

mockNuxtImport('useRoute', () => () => routeState);

mockNuxtImport('useRouter', () => () => ({
  push: vi.fn((to: { query?: Record<string, string> }) => {
    if (to?.query) {
      routeState.query = { ...to.query };
    }
  }),
  replace: vi.fn((to: { query?: Record<string, string> }) => {
    if (to?.query) {
      routeState.query = { ...to.query };
    }
  }),
}));

mockNuxtImport('useAsyncData', () => {
  return (_key: string, _fn: () => Promise<unknown>) => ({
    data: ref(mockTodos),
    pending: ref(false),
    error: ref(null),
    refresh: vi.fn(),
    status: ref('success'),
  });
});

describe('UserTodos component', () => {
  beforeEach(() => {
    routeState.query = {};
    vi.clearAllMocks();
  });

  it('renders todo list with listitems', async () => {
    await renderSuspended(UserTodos, {
      props: { userId: '1' },
    });

    await waitFor(() => {
      const listItems = screen.getAllByRole('listitem');
      expect(listItems.length).toBe(4);
      expect(listItems[0].textContent).toContain('Todo One');
      expect(listItems[0].textContent).toContain('Completed');
      expect(listItems[1].textContent).toContain('Todo Two');
      expect(listItems[1].textContent).toContain('Pending');
    });
  });

  it('filters to completed only when Show pending is unchecked', async () => {
    await renderSuspended(UserTodos, {
      props: { userId: '1' },
    });

    await waitFor(() => {
      expect(screen.getAllByRole('listitem').length).toBe(4);
    });

    // Uncheck "Show pending" -> status becomes 'completed', only completed todos show
    const pendingCheckbox = screen.getByRole('checkbox', {
      name: /show pending/i,
    });
    await fireEvent.click(pendingCheckbox);

    await waitFor(() => {
      const listItems = screen.getAllByRole('listitem');
      expect(listItems.length).toBe(2);
      expect(listItems[0].textContent).toContain('Todo One');
      expect(listItems[0].textContent).toContain('Completed');
      expect(listItems[1].textContent).toContain('Todo Three');
      expect(listItems[1].textContent).toContain('Completed');
    });
  });
});
