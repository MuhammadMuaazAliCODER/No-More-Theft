const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobileMenu");
const closeBtn = document.querySelector(".closeBtn");
const navItems = document.querySelectorAll("li");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("active");
});

closeBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
  hamburger.classList.remove("active");
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((li) => li.classList.remove("active"));
    item.classList.add("active");

    mobileMenu.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

document.addEventListener("click", (e) => {
  if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
    mobileMenu.classList.remove("active");
    hamburger.classList.remove("active");
  }
});
