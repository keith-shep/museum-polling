import { assertEquals } from "jsr:@std/assert";
import { predictTimeScheduleId } from "./predict.ts";
import { Timeslot } from "./timeslot_enum.ts";

// Deno.test(function addTest() {
// assertEquals(add(2, 3), 5);
// });

Deno.test("Expect ID 9336 for 1 Jan 2025 1000hr timeslot", () => {
    
    const date = new Date('2025-01-01');
    const timeslot = Timeslot._1000HR;
    const id = predictTimeScheduleId(date, timeslot);
    assertEquals(id, 9336);
});


Deno.test("Expect ID 9349 for 2 Jan 2025 1000hr timeslot", () => { 
    const date = new Date('2025-01-02');
    const timeslot = Timeslot._1000HR;
    const id = predictTimeScheduleId(date, timeslot);
    assertEquals(id, 9349);
});

