import * as events from "./events-module"

export function onLeftHandedClick(e: HTMLInputElement) {
    events.leftHandedChange.publish({ isLeftHanded: e.checked })
}

export function onFlipNut(e: HTMLInputElement) {
    events.flipNutChange.publish({ isNutFlipped: e.checked })
}

export function onFbNoteTextClick(e: HTMLInputElement) {
    events.fretboardLabelChange.publish({ labelType: parseInt(e.value, 10) })
}
