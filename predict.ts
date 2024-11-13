import { Timeslot } from "./timeslot_enum.ts";

import { difference } from "https://deno.land/std@0.224.0/datetime/difference.ts";

export function predictTimeScheduleId(date: Date, timeslot: Timeslot): number {
    const baseDate = new Date('2025-01-01');
    const dayDelta = difference(date, baseDate).days;
    if (dayDelta == undefined) {
        throw new Error('something went wrong')
    }
    const baseId = 9336;

    const baseTimeslot = Timeslot._1000HR; 
    const timeslotDelta = timeslot - baseTimeslot;

    return baseId + (dayDelta * 13) + timeslotDelta;
}
