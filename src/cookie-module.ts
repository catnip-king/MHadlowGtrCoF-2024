import * as events from "./events-module"

export function init(): void {
    events.scaleChange.subscribe(bakeCookie)
}

function bakeCookie(scaleChange: events.ScaleChangedEvent): void {
    const cookieExpiryDays = 30
    const expiryDate = new Date(Date.now() + cookieExpiryDays * 24 * 60 * 60 * 1000)
    const expires = "expires=" + expiryDate.toUTCString()
    const tonicNode = scaleChange.nodes[0]
    document.cookie =
        "gtr-cof-state=" +
        tonicNode.scaleNote.note.index +
        "|" +
        tonicNode.scaleNote.note.natural.index +
        "|" +
        scaleChange.mode.index +
        "|" +
        (scaleChange.nodes.some(x => x.isChordRoot)
            ? scaleChange.nodes.filter(x => x.isChordRoot)[0].scaleNote.note.index
            : -1) +
        "" +
        ";" +
        expires
}

export function readCookie(): CookieData {
    const result = document.cookie.match(new RegExp("gtr-cof-state" + "=([^;]+)"))
    if (result != null) {
        const items = result[1].split("|")
        if (items.length === 4) {
            return {
                hasCookie: true,
                index: Number(items[0]),
                naturalIndex: Number(items[1]),
                modeIndex: Number(items[2]),
                chordIndex: Number(items[3]),
            }
        }
    }
    return {
        hasCookie: false,
        index: 0,
        naturalIndex: 0,
        modeIndex: 0,
        chordIndex: -1,
    }
}

export interface CookieData {
    readonly hasCookie: boolean
    readonly index: number
    readonly naturalIndex: number
    readonly modeIndex: number
    readonly chordIndex: number
}
