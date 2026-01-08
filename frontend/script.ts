const form = document.getElementById("form") as HTMLFormElement;
const list = document.getElementById("appointments") as HTMLUListElement;

const API_URL = "http://localhost:3333/appointments";

async function loadAppointments() {
  const response = await fetch(API_URL);
  const data = await response.json();

  list.innerHTML = "";

  data.forEach((item: any) => {
    const li = document.createElement("li");
    li.innerText = `${item.name} - ${item.service} | ${item.date} ${item.time}`;
    list.appendChild(li);
  });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = (document.getElementById("name") as HTMLInputElement).value;
  const service = (document.getElementById("service") as HTMLSelectElement)
    .value;
  const date = (document.getElementById("date") as HTMLInputElement).value;
  const time = (document.getElementById("time") as HTMLInputElement).value;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, service, date, time }),
  });

  form.reset();
  loadAppointments();
});

loadAppointments();
