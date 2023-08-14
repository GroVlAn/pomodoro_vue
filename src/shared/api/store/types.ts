export type TState = {
  activeColor: string;
  userId: string | null;
};

type TDetail = {
  input: string | null;
  loc: Array<string>;
  msg: string;
  type: string;
  url: string;
};

export type TErroResponse = {
  data: { detail: Array<TDetail> | string };
  status: number;
};
