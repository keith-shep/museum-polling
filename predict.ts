import { Timeslot } from "./timeslot_enum.ts";

import { difference } from "https://deno.land/std@0.224.0/datetime/difference.ts";

export function predictTimeScheduleId(date: Date, timeslot: Timeslot): number {
    const baseDate = new Date('2025-01-01');
    const delta = difference(date, baseDate).days;
    if (delta == undefined) {
        throw new Error('something went wrong')
    }
    const baseId = 9336;
    return baseId + (delta * 13);
}

// if (import.meta.main) {
//     const date = new Date('2025-01-01');
//     predictTimeScheduleId(date, Timeslot._1000HR);
// }


// 1 jan 9336
// 2 jan 9349
// 3 jan 9362
// 4 jan 9375
// 5 jan 9388
// 6 jan 9401
// 7 jan 9414
// 8 jan 9427
// 9 jan 9440
// 10 jan 9453
// 11 jan 9466



