export function add(a: number, b: number): number {
  return a + b;
}

export async function fetchData(): Promise<object> {
  const jsonResponse = await fetch(
    "https://museum-tickets.nintendo.com/en/api/calendar?target_year=2024&target_month=12", {
      headers: {
        "x-requested-with": "XMLHttpRequest",
      },
    }
  );

  const jsonData = await jsonResponse.json();
  return jsonData;
}

export function availableDays(jsonData: object): Array<Object> {
  const data = [];
  for (const [date, value] of Object.entries(jsonData.data.calendar)) {
    value['date'] = date;
    data.push(value);
  } 
  const availableDays = data.filter(day => day.sale_status === SaleStatus.Open && day.open_status == OpenStatus.Open);
  return availableDays;
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

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const data = await fetchData();

  const days = availableDays(data);
  console.log(days.map(day => day.date));


}
