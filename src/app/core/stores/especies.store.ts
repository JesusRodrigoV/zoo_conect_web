import { Especie } from '@models/animales';
import { signalStore, withState } from '@ngrx/signals';

type EspecieState = {
  especies: Especie[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: EspecieState = {
  especies: [],
  isLoading: false,
  filter: { query: '', order: 'asc' },
};

export const EspecieStore = signalStore(
  { providedIn: 'root' },
  withState(initialState)
);
