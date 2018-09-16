import * as d3 from "d3"
import * as events from "./events-module"

let buttons: d3.Selection<number>
let toggle: number = 0

export function init(): void {
    const radius = 10
    const pad = 2

    const svg = d3.select("#modes")
    const intervals = svg.append("g").attr("transform", "translate(0, 240)")

    const gs = intervals
        .selectAll("g")
        .data([0, 1, 2, 3, 4, 5, 6], function(i) {
            return i.toString()
        })
        .enter()
        .append("g")
        .attr("transform", function(d, i) {
            return "translate(" + (i * (radius * 2 + pad) + pad) + ", 0)"
        })

    buttons = gs
        .append("circle")
        .attr("cx", radius)
        .attr("cy", radius)
        .attr("r", radius)
        .attr("strokeWidth", 2)
        .attr("class", "mode-button")
        .on("click", onClick)

    gs.append("text")
        .attr("x", radius)
        .attr("y", radius + 5)
        .attr("text-anchor", "middle")
        .text(function(x) {
            return x + 1
        })

    events.chordIntervalChange.subscribe(update)
}

function onClick(x: number) {
    const updatedToggle = toggle ^ (2 ** x)
    const chordIntervals = [0, 1, 2, 3, 4, 5, 6].filter(interval => ((2 ** interval) & updatedToggle) === 2 ** interval)
    events.chordIntervalChange.publish({ chordIntervals })
}

export function update(event: events.ChordIntervalChangeEvent): void {
    toggle = 0
    event.chordIntervals.forEach(x => (toggle = toggle + 2 ** x))
    buttons
        .data(event.chordIntervals, function(m) {
            return m.toString()
        })
        .attr("class", "mode-button mode-button-selected")
        .exit()
        .attr("class", "mode-button")
}

interface button {
    readonly id: number
    selected: boolean
}
