'use client';

import { useAsync } from './useAsync';
import { fetchSettings } from '../services/content';

export function useSettings() {
    return useAsync(fetchSettings, []);
}
