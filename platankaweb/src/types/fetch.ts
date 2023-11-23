export type FetchType<T> = {
  loading: boolean;
  data: T | null;
  getData: any;
  error: string;
  status: string;
};
