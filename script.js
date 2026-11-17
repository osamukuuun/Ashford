const breeds = {
  mal: {
    t: "Міні-мальтіпу",
    d: [
      "Міні-мальтіпу — результат схрещування мальтійської болонки та міні-пуделя. Це спокійна, лагідна собака, яка тягнеться до людини й легко звикає до життя в міській квартирі.",
      "Шерсть м’яка, хвиляста й майже не линяє. Підходить багатьом людям з алергією, але потребує регулярного розчісування."
    ],
    f: [
      ["Зріст", "25–32 см"],
      ["Вага", "3–5 кг"],
      ["Забарвлення", "абрикос, крем, білий"],
      ["Характер", "ніжний, слухняний"],
      ["Прогулянки", "до 1 години на день"],
      ["Тривалість життя", "13–16 років"]
    ]
  },
  spz: {
    t: "Шпіц",
    d: [
      "Померанський шпіц — маленька собака з яскравою «левовою» шерстю, жвавим розумом і дзвінким голосом. Він одразу стає центром родини.",
      "Шпіцу потрібна послідовність у вихованні та два-три розчісування на тиждень. Натомість він дасть безмежну відданість."
    ],
    f: [
      ["Зріст", "18–22 см"],
      ["Вага", "1,8–3,5 кг"],
      ["Забарвлення", "помаранчевий, кремовий, соболиний"],
      ["Характер", "бадьорий, сміливий"],
      ["Прогулянки", "до 1 години на день"],
      ["Тривалість життя", "12–16 років"]
    ]
  }
};

const dogs = [
  { n: "Бертрам",   b: "mal", c: "Абрикос",      s: "Хлопчик", a: "10 тиж.", p: 38000, t: "Спокійний, любить коліна" },
  { n: "Констанс",  b: "mal", c: "Крем",         s: "Дівчинка", a: "10 тиж.", p: 42000, t: "Ніжна, наймовчазніша у виводку" },
  { n: "Олівер",    b: "mal", c: "Білий",        s: "Хлопчик", a: "9 тиж.",  p: 40000, t: "Грайливий, обожнює людей" },
  { n: "Генрієтта", b: "spz", c: "Помаранчевий", s: "Дівчинка", a: "11 тиж.", p: 48000, t: "Яскрава, з густим підшерстям" },
  { n: "Август",    b: "spz", c: "Кремовий",     s: "Хлопчик", a: "11 тиж.", p: 45000, t: "Сміливий і дуже розумний" },
  { n: "Віолетта",  b: "spz", c: "Соболиний",    s: "Дівчинка", a: "10 тиж.", p: 52000, t: "Рідкісне забарвлення, м’який норов" }
];

const $ = s => document.querySelector(s);
const fmt = n => n.toLocaleString("uk-UA") + " ₴";

/* породи */
function showBreed(k) {
  const b = breeds[k];
  $("#breedBox").innerHTML =
    "<div>" + b.d.map(x => "<p>" + x + "</p>").join("") + "</div>" +
    "<ul class='facts'>" + b.f.map(r => "<li><span>" + r[0] + "</span><span>" + r[1] + "</span></li>").join("") + "</ul>";
  document.querySelectorAll(".tab").forEach(t => t.setAttribute("aria-selected", t.dataset.b === k));
}
document.querySelectorAll(".tab").forEach(t => t.onclick = () => showBreed(t.dataset.b));
showBreed("mal");

/* цуценята */
function renderDogs(f) {
  $("#grid").innerHTML = dogs.filter(d => f === "all" || d.b === f).map(d =>
    "<article class='card'>" +
      "<div class='portrait " + (d.b === "spz" ? "sp" : "") + "'>" + d.n[0] + "</div>" +
      "<div class='in'>" +
        "<span class='tag'>" + breeds[d.b].t + "</span>" +
        "<h3>" + d.n + "</h3>" +
        "<div class='sub'>" + d.s + ", " + d.c.toLowerCase() + ", " + d.a + "</div>" +
        "<div class='sub'>" + d.t + "</div>" +
        "<div class='price'>" + fmt(d.p) + "</div>" +
        "<button data-n='" + d.n + "' data-b='" + d.b + "'>Запитати про цуценя</button>" +
      "</div>" +
    "</article>"
  ).join("");

  document.querySelectorAll(".card button").forEach(b => b.onclick = () => {
    $("#s").value = b.dataset.b === "mal" ? "Міні-мальтіпу" : "Померанський шпіц";
    $("#m").value = "Цікавить цуценя на ім’я " + b.dataset.n + ". ";
    $("#contact").scrollIntoView({ behavior: "smooth" });
    setTimeout(() => $("#n").focus({ preventScroll: true }), 500);
  });
}
document.querySelectorAll(".chip").forEach(c => c.onclick = () => {
  document.querySelectorAll(".chip").forEach(x => x.setAttribute("aria-pressed", x === c));
  renderDogs(c.dataset.f);
});
renderDogs("all");

/* меню */
const bg = $(".burger"), nav = $("#nav");
bg.onclick = () => {
  const o = nav.classList.toggle("open");
  bg.classList.toggle("open", o);
  bg.setAttribute("aria-expanded", o);
};
nav.querySelectorAll("a").forEach(a => a.onclick = () => {
  nav.classList.remove("open");
  bg.classList.remove("open");
});

/* форма */
$("#form").onsubmit = e => {
  e.preventDefault();
  const n = $("#n").value.trim(), p = $("#p").value.trim();
  $("#en").textContent = n.length < 2 ? "Вкажіть ім’я" : "";
  $("#ep").textContent = p.length < 5 ? "Вкажіть телефон або Telegram" : "";
  if (n.length < 2 || p.length < 5) return;
  $("#form").style.display = "none";
  const ok = $("#ok");
  ok.style.display = "block";
  ok.textContent = "Дякуємо, " + n + ". Ми зв’яжемося з вами протягом доби.";
};