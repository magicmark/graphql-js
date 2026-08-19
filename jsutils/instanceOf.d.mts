interface Constructor {
    prototype: {
        [Symbol.toStringTag]: string;
    };
    new (...args: Array<any>): any;
}
interface Constructor {
    prototype: {
        [Symbol.toStringTag]: string;
    };
    new (...args: Array<any>): any;
}
/** @internal */
export declare let instanceOf: (value: unknown, symbol: symbol, constructor: Constructor) => boolean;
/** @internal */
export declare function enableDevInstanceOf(): void;
export {};
