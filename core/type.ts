export type JSXChild = JSX.Element | string | number | null;
export interface DeepArrayI<T> extends Array<T | DeepArrayI<T>> {}
export type DeepArray<T> = T | DeepArrayI<T>;
export type JSXChildren = DeepArray<JSXChild>;
