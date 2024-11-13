import { assertEquals } from "jsr:@std/assert";
import { predictTimeScheduleId } from "./predict.ts";
import { Timeslot } from "./timeslot_enum.ts";

Deno.test("test1", () => {
    const date = new Date('2025-01-01');
    const timeslot = Timeslot._1000HR;
    const id = predictTimeScheduleId(date, timeslot);
    assertEquals(id, 9336);
});


Deno.test("test2", () => { 
    const date = new Date('2025-01-02');
    const timeslot = Timeslot._1000HR;
    const id = predictTimeScheduleId(date, timeslot);
    assertEquals(id, 9349);
});

Deno.test("test3", () => {
    const date = new Date('2025-01-09');
    const timeslot = Timeslot._1230HR;
    const id = predictTimeScheduleId(date, timeslot);
    assertEquals(id, 9445);
});

Deno.test("test4", () => {
    const date = new Date('2025-01-11');
    const timeslot = Timeslot._1000HR;
    const id = predictTimeScheduleId(date, timeslot);
    assertEquals(id, 9466);
});

Deno.test("test5", () => {
    const date = new Date('2025-01-09');
    const timeslot = Timeslot._1600HR;
    const id = predictTimeScheduleId(date, timeslot);
    assertEquals(id, 9452);
});

Deno.test("test6", () => {
    const date = new Date('2025-01-09');
    const timeslot = Timeslot._1530HR;
    const id = predictTimeScheduleId(date, timeslot);
    assertEquals(id, 9451);
});


Deno.test("test7", () => {
    const date = new Date('2025-01-29');
    const timeslot = Timeslot._1430HR;
    const id = predictTimeScheduleId(date, timeslot);
    assertEquals(id, 9709);
});


