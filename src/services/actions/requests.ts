import { TActionTemplate } from "../../types/services";
export const START_REQUEST = "START_REQUEST";
export const END_REQUEST = "END_REQUEST";

// типы экшенов:

// для requestReducer
type TStartRequestAction = TActionTemplate<typeof START_REQUEST>;

type TEndRequestAction = TActionTemplate<typeof END_REQUEST>;

export type TRequestActions = TStartRequestAction | TEndRequestAction;
