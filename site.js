// Highlight current page in nav
const here = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav ul a").forEach(a => {
  if (a.getAttribute("href") === here) a.classList.add("active");
});

// Scroll reveal
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
}, { threshold: 0.08 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// Footer year
document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

// Art filters + lightbox
const filters = document.querySelectorAll(".filters button");
filters.forEach(btn => btn.addEventListener("click", () => {
  filters.forEach(b => b.classList.remove("on"));
  btn.classList.add("on");
  const f = btn.dataset.filter;
  document.querySelectorAll(".art-card").forEach(card => {
    card.style.display = (f === "all" || card.dataset.cat === f) ? "" : "none";
  });
}));

const lb = document.querySelector(".lightbox");
if (lb) {
  const big = lb.querySelector(".big");
  const cap = lb.querySelector("p");
  document.querySelectorAll(".art-card").forEach(card => card.addEventListener("click", () => {
    const media = card.querySelector("img, .frame").cloneNode(true);
    big.replaceChildren(media);
    cap.textContent = card.querySelector(".cap").innerText.replace("\n", " · ");
    lb.classList.add("open");
  }));
  const close = () => lb.classList.remove("open");
  lb.querySelector("button").addEventListener("click", close);
  lb.addEventListener("click", e => { if (e.target === lb) close(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
}
