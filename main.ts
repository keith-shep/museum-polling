import "jsr:@std/dotenv/load";
import { bgGreen, gray } from "https://deno.land/std@0.153.0/fmt/colors.ts";
import { sendEmail } from "./mail.ts";
import { writeToFile } from "./filewriter.ts";
export async function fetchData(): Promise<object> {
    const jsonResponse = await fetch(
        "https://museum-tickets.nintendo.com/en/api/calendar?target_year=2024&target_month=12",
        {
            headers: {
                "x-requested-with": "XMLHttpRequest",
                "cache-control": "no-cache",
            },
        },
    );

    const jsonData = await jsonResponse.json();
    return jsonData.data.calendar;
}

export function availableDays(calendar: Object): Array<CalendarDate> {
    const data: Array<CalendarDate> = [];
    for (const [date, value] of Object.entries(calendar)) {
        value["date"] = date;
        data.push(value);
    }
    const availableDays = data.filter((day) =>
        day.sale_status === SaleStatus.Open &&
        day.open_status == OpenStatus.Open
    );
    return availableDays;
}

export async function checkMuseum() {
    try {
        const data = await fetchData();

        const days = availableDays(data);
        const daysArray = days.map((day) => day.date);

        const interval = getRandomInterval();
        if (daysArray.length === 0) {
            log(
                `no available slots - retrying in ${interval / 1000} seconds`,
                gray,
            );
        } else {
            log(
                `slots are available! - retrying in ${interval / 1000} seconds`,
                bgGreen,
            );
            sendEmail(daysArray.join("\n"));
        }
    } catch (err) {
        console.log(err);
    } finally {
        const interval = getRandomInterval();
        setTimeout(() => checkMuseum(), interval);
    }
}

function log(message: string, color: Function): void {
    const now = new Date().toString();
    const messageString = `${message} - ${now}`;
    writeToFile(messageString);
    console.log(color(messageString));
}

enum SaleStatus {
    Open = 1,
    Closed = 2,
}

enum OpenStatus {
    Open = 1,
    Closed = 2,
}

// diamond/circle - salestatus 1 openstatus 1
// cross - salestatus 1 openstatus 2
// dash salestatus 2 openstatus 1

enum Status {
    Circle, // Available now
    Dash, // Sold out
    Diamond, // Accepting entries
    Cross, // Closure / Regular Holiday / Already Have Tickets
}

interface CalendarDate {
    apply_type: number;
    sale_status: SaleStatus;
    open_status: OpenStatus;
    holiday: any;
    day_label: object;
    is_temporary_closure: boolean;
    temporary_closure_time: any;
    is_holding: boolean;
    date: string; // extra
}

function getRandomInt(min: number, max: number): number {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    const randomInt = Math.floor(
        Math.random() * (maxFloored - minCeiled) + minCeiled,
    ); // The maximum is exclusive and the minimum is inclusive
    return randomInt;
}

function getRandomInterval(): number {
    const SECONDS = 1000;
    const MIN_INTERVAL_IN_SECONDS = Deno.env.get("MIN_INTERVAL_IN_SECONDS");
    const MAX_INTERVAL_IN_SECONDS = Deno.env.get("MAX_INTERVAL_IN_SECONDS");

    const interval =
        getRandomInt(MIN_INTERVAL_IN_SECONDS, MAX_INTERVAL_IN_SECONDS) *
        SECONDS;
    return interval;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
    checkMuseum();
}
