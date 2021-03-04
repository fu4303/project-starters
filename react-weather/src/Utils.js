export function utilsGetIcon(icon) {
  return `https://openweathermap.org/img/wn/${icon}@2x.png `;
}

export function utilsGetDayOfWeek(unixTimeStamp) {
  const date = new Date(unixTimeStamp * 1000);

  var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  var day = date.getDay();

  if (day === new Date().getDay()) {
    return "Today";
  }

  return weekdays[day];
}

export function utilsGetFormattedTime(unixTimeStamp) {
  const date = new Date(unixTimeStamp * 1000);

  let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

  return `${hours}:${minutes}`;
}

export function utilsCapitalizeText(text) {
  if (text === null) {
    return "";
  }
  return text.replace(/\w\S*/g, (w) =>
    w.replace(/^\w/, (c) => c.toUpperCase())
  );
}

export function utilsCapitalizeFirstLetter(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function utilsGetUnitsIndicator(units) {
  if (units === "imperial") {
    return "F";
  }

  return "C";
}
