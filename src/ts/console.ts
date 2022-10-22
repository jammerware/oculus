export class Console<T> {
    private _name: string = "";

    constructor(x: new () => T | string) {
        if (typeof x === "string") {
            this._name = x;
        }
        else {
            this._name = x.name;
        }
    }

    log(... message: any[]) {
        console.log(this.prepend(message));
    }

    logError(message: any, throws = false) {
        console.error(this.prepend(message));

        if (throws) {
            throw new Error(message);
        }
    }

    private prepend(message: any): any[] {
        return [this._name].concat(message);
    }
}