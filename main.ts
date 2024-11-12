import "jsr:@std/dotenv/load";
import { sendEmail } from "./mail.ts";
export async function fetchData(): Promise<object> {
  const jsonResponse = await fetch(
    "https://museum-tickets.nintendo.com/en/api/calendar?target_year=2024&target_month=12", {
      headers: {
        "x-requested-with": "XMLHttpRequest",
        'cache-control': 'no-cache'
      },
    }
  );

  const jsonData = await jsonResponse.json();
  return jsonData.data.calendar;
}

export function availableDays(calendar: Object): Array<CalendarDate> {
  const data: Array<CalendarDate> = [];
  for (const [date, value] of Object.entries(calendar)) {
    value['date'] = date;
    data.push(value);
  } 
  const availableDays = data.filter(day => day.sale_status === SaleStatus.Open && day.open_status == OpenStatus.Open);
  return availableDays;
}

export async function checkMuseum() {
  const data = await fetchData();

  const days = availableDays(data);
  const daysArray = days.map(day => day.date);

  if (daysArray.length === 0) {
    console.log('no available slots');
  } else {
    console.log('slots are available!');
    sendEmail(daysArray.join('\n'));
  }
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
  apply_type: number,
  sale_status: SaleStatus,
  open_status: OpenStatus,
  holiday: any,
  day_label: object,
  is_temporary_closure: boolean,
  temporary_closure_time: any,
  is_holding: boolean,
  date: string // extra
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const SECONDS = 1000;
  setInterval(() => checkMuseum(), getRandomInt(30) * SECONDS);

}
