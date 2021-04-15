const greet = () => {
  const person = prompt("Please enter your Name 🎅", "Savio");
  if (person != null) {
    document.getElementById("text").innerHTML =
      "Happy Christmas " + person + "🎄";
  }
};
