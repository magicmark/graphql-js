export class SetMap {
    constructor() {
        this._entries = new Map();
        this._memberIds = new Map();
        this._nextMemberId = 0;
    }
    get size() {
        return this._entries.size;
    }
    get(members) {
        return this._find(members)?.value;
    }
    getOrInsert(members, value) {
        const entry = this._find(members);
        if (entry !== undefined) {
            return entry.value;
        }
        this._create(members, value);
        return value;
    }
    getOrInsertComputed(members, computeValue) {
        const entry = this._find(members);
        if (entry !== undefined) {
            return entry.value;
        }
        const value = computeValue(members);
        this.set(members, value);
        return value;
    }
    has(members) {
        return this._find(members) !== undefined;
    }
    set(members, value) {
        const entry = this._find(members);
        if (entry !== undefined) {
            entry.value = value;
            return this;
        }
        this._create(members, value);
        return this;
    }
    *keys() {
        for (const entry of this._entries.values()) {
            yield entry.members;
        }
    }
    *values() {
        for (const entry of this._entries.values()) {
            yield entry.value;
        }
    }
    *entries() {
        for (const entry of this._entries.values()) {
            yield [entry.members, entry.value];
        }
    }
    [Symbol.iterator]() {
        return this.entries();
    }
    _find(members) {
        return this._entries.get(this._key(members));
    }
    _create(members, value) {
        const entry = { members, value };
        this._entries.set(this._key(members), entry);
    }
    _key(members) {
        const ids = [];
        for (const member of members) {
            let id = this._memberIds.get(member);
            if (id === undefined) {
                id = this._nextMemberId++;
                this._memberIds.set(member, id);
            }
            ids.push(id);
        }
        ids.sort((id1, id2) => id1 - id2);
        return ids.join(',');
    }
}
//# sourceMappingURL=SetMap.js.map