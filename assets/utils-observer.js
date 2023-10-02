const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};

export const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target.querySelector('[data-animation="show"]')) {
        const cards = entry.target.querySelector("div");
        cards.classList.add("unset");
      }
      if (entry.target.querySelector('[data-animation="up"]')) {
        const cards = entry.target.querySelectorAll(".academy_card");
        cards.forEach((card) => {
          card.classList.add("unset");
        });
      }
      observer.unobserve(entry.target); // Unobserve after animating
    }
  });
}, options);
