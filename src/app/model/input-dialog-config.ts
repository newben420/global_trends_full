import { ResParamFx } from "./../../../serve/lib/functions";

export class InputDialogConfig {
    callback!: ResParamFx;
    title!: string;
    label?: string;
    type?: "text" | "number";
    pattern?: RegExp;
    required?: boolean;
    maxLength?: number;
    max?: number;
    minLength?: number;
    min?: number;
    hint?: string;
    error?: string;
    initVal?: any;
}