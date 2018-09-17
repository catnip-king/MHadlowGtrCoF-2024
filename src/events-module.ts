import * as music from "./music-module"

export class Bus<T> {
    private listeners: Array<(x: T) => void> = []
    private name: string
    private debug: boolean = false

    // name should be the name of the exported variable in 'events' that the bus instance is assigned to.
    constructor(name: string) {
        this.name = name
    }

    public subscribe(listener: (x: T) => void): void {
        this.listeners.push(listener)
    }

    public publish(event: T): void {
        if (this.debug) {
            // tslint:disable-next-line
            console.log("Published event: '" + this.name + "'")
        }

        for (const listener of this.listeners) {
            listener(event)
        }
    }
}

// FIXME: TSLint: This isn't used in project
// function genericName<U>(type: { new (): U }): string {
//     return type.constructor.toString()
// }

export let scaleChange: Bus<ScaleChangedEvent> = new Bus<ScaleChangedEvent>("scaleChange")

export interface ScaleChangedEvent {
    readonly nodes: music.Node[]
    readonly mode: music.Mode
}

export let tonicChange: Bus<TonicChangedEvent> = new Bus<TonicChangedEvent>("tonicChange")

export interface TonicChangedEvent {
    readonly noteSpec: music.NoteSpec
}

export let modeChange: Bus<ModeChangedEvent> = new Bus<ModeChangedEvent>("modeChange")

export interface ModeChangedEvent {
    readonly mode: music.Mode
}

export let chordChange: Bus<ChordChangeEvent> = new Bus<ChordChangeEvent>("chordChange")

export interface ChordChangeEvent {
    readonly chordIndex: number
}

export let toggle: Bus<ToggleEvent> = new Bus<ToggleEvent>("toggle")

export interface ToggleEvent {
    readonly index: number
}

export let tuningChange: Bus<TuningChangedEvent> = new Bus<TuningChangedEvent>("tuningChange")

export interface TuningChangedEvent {
    readonly tuning: string
    readonly dots: Array<[number, number]>
    readonly description: string
    readonly notes: number[]
}

export let leftHandedChange: Bus<LeftHandedFretboardEvent> = new Bus<LeftHandedFretboardEvent>("leftHandedChange")

export interface LeftHandedFretboardEvent {
    readonly isLeftHanded: boolean
}

export let flipNutChange: Bus<FlipNutEvent> = new Bus<FlipNutEvent>("flipNutChange")

export interface FlipNutEvent {
    readonly isNutFlipped: boolean
}

export let fretboardLabelChange: Bus<FretboardLabelChangeEvent> = new Bus<FretboardLabelChangeEvent>(
    "fretboardLabelChange"
)

export interface FretboardLabelChangeEvent {
    readonly labelType: FretboardLabelType
}

export enum FretboardLabelType {
    None,
    NoteName,
    Interval,
}

export let chordIntervalChange: Bus<ChordIntervalChangeEvent> = new Bus<ChordIntervalChangeEvent>("chordIntervalChange")

export interface ChordIntervalChangeEvent {
    readonly chordIntervals: number[]
}

export let scaleFamilyChange: Bus<ScaleFamilyChangeEvent> = new Bus<ScaleFamilyChangeEvent>("scaleFamilyChange")

export interface ScaleFamilyChangeEvent {
    readonly scaleFamily: music.ScaleFamily
}

export let midiNote: Bus<MidiNoteEvent> = new Bus<MidiNoteEvent>("midiNoteEvent")

export interface MidiNoteEvent {
    readonly toggledIndexes: number
}
