import type { Maybe } from "./Maybe.mjs";
import type { ReadOnlyObjMap, ReadOnlyObjMapLike, ReadOnlyObjMapSymbolLike, ReadOnlyObjMapWithSymbol } from "./ObjMap.mjs";
/** @internal */
export declare function toObjMap<T>(obj: Maybe<ReadOnlyObjMapLike<T>>): ReadOnlyObjMap<T>;
/** @internal */
export declare function toObjMapWithSymbols<T>(obj: Maybe<ReadOnlyObjMapSymbolLike<T>>): ReadOnlyObjMapWithSymbol<T>;
