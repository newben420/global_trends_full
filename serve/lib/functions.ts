import { Res } from "./res";

export type ResParamFx = (data: Res) => void;
export type BoolParamFx = (data: boolean) => void;
export type  StringArrayParamFx = (data: string[]) => void;
