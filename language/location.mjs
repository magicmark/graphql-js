import { invariant } from "../jsutils/invariant.mjs";
const LineRegExp = /\r\n|[\n\r]/g;
export function getLocation(source, position) {
    let lastLineStart = 0;
    let line = 1;
    for (const match of source.body.matchAll(LineRegExp)) {
        if (!(typeof match.index === 'number'))
            invariant(false);
        if (match.index >= position) {
            break;
        }
        lastLineStart = match.index + match[0].length;
        line += 1;
    }
    return { line, column: position + 1 - lastLineStart };
}
//# sourceMappingURL=location.js.map