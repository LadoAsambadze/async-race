import type { FetchBaseQueryMeta } from '@reduxjs/toolkit/query';

const TOTAL_COUNT_HEADER = 'X-Total-Count';

export const readTotalCount = (meta: FetchBaseQueryMeta | undefined): number =>
  Number(meta?.response?.headers.get(TOTAL_COUNT_HEADER) ?? 0);
