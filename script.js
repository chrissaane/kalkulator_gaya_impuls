const $ = id => document.getElementById(id);
const el = id => parseFloat($(id).value);

function hitung() {
  const mInput = el("massa");
  const satuan = $("satuanMassa").value;

  let m;
  switch (satuan) {
    case "kg": m = mInput; break;
    case "g": m = mInput / 1000; break;
    case "mg": m = mInput / 1_000_000; break;
    case "ton": m = mInput * 1000; break;
    case "lb": m = mInput * 0.4536; break;
    case "ons": m = mInput * 0.1; break;
    default: m = mInput;
  }

  const a = el("percepatan"), t = el("waktu");
  if ([mInput, a, t].some(isNaN)) return alert("Isi semua nilai!");

  const f = m * a, i = f * t;
  $("popupGaya").textContent = `Gaya: ${f.toFixed(2)} N`;
  $("popupImpuls").textContent = `Impuls: ${i.toFixed(2)} N·s`;
  $("popup").style.display = "flex";

  const li = document.createElement("li");
  li.textContent = `m: ${mInput} ${satuan}, a: ${a} m/s², t: ${t} s → F: ${f.toFixed(2)} N, I: ${i.toFixed(2)} N·s`;
  li.style.animation = "slideFadeIn 0.3s ease";
  $("historyList").prepend(li);
}

function resetForm() {
  ["massa", "percepatan", "waktu"].forEach(id => $(id).value = '');
  $("popup").style.display = "none";
  $("hitungBtn").classList.remove("dual");
  $("resetBtn").style.display = "none";
}

function updateButtons() {
  const filled = ["massa", "percepatan", "waktu"].some(id => $(id).value.trim());
  $("resetBtn").style.display = filled ? "inline-block" : "none";
  $("hitungBtn").classList.toggle("dual", filled);
}

function toggleMode() {
  document.body.classList.toggle("light-mode");
  $("modeButton").textContent = document.body.classList.contains("light-mode") ? "Light Mode" : "Dark Mode";
}

$("closePopup").onclick = () => $("popup").style.display = "none";

window.onload = () => {
  setTimeout(() => {
    $("cover").style.display = "none";
    $("app").style.display = "block";
  }, 4000);
};