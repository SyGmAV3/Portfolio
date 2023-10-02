import { observer } from "./assets/utils-observer.js";

document.addEventListener("DOMContentLoaded", function () {
  // --- Add an event listener to each navbar link ---
  document.querySelectorAll(".navbar_links a").forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      const navbar = document.getElementById("navbar");
      navbar.classList.remove("close_navbar_js");

      const navbarHeight = document.querySelector(".header").offsetHeight;
      const targetSection = document.querySelector(link.getAttribute("href"));
      const targetPosition = targetSection.offsetTop - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });

  document.getElementById("close-navbar").addEventListener("click", () => {
    const navbar = document.getElementById("navbar");
    navbar.classList.remove("close_navbar_js");
  });

  document.getElementById("open-navbar").addEventListener("click", () => {
    const navbar = document.getElementById("navbar");
    navbar.classList.add("close_navbar_js");
  });

  //------ Observer function -------
  const skilcards = document.querySelectorAll(".skills");
  const academycards = document.querySelectorAll(".academy");
  const observerElements = [...skilcards, ...academycards];

  observerElements.forEach((element) => {
    observer.observe(element);
  });

  //------ Modal function --------
  const academyCards = document.querySelectorAll(".academy_card");
  const modal = document.getElementById("modal");

  academyCards.forEach((card) => {
    if (card.getAttribute("data-url")) {
      card.addEventListener("click", () => {
        const url = card.getAttribute("data-url");
        modal.classList.add("modal");
        modal.style.backgroundImage = `url('${url}')`;
      });
    }
  });

  modal.addEventListener("click", (ev) => {
    ev.target.classList.remove("modal");
    ev.target.style.backgroundImage = "none";
  });

  //------  Form submit funcion ------
  const form = document.getElementById("form-contact");
  const email = document.getElementById("input-email");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputs = document.querySelectorAll(".input");
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = regex.test(email.value);
    const sendedMessage = document.getElementById("sended-message");
    let isValidInput = true;

    inputs.forEach((input) => {
      if (!isValidEmail) {
        const span = document.getElementById("invalid-email");
        span.classList.add("show_error");
        input.classList.add("input_invalid");
      }

      if (input.value === "") {
        input.classList.add("input_invalid");

        isValidInput = false;
      } else {
        if (!isValidEmail) {
          return;
        }
        input.classList.remove("input_invalid");
      }
    });

    if (!isValidInput || !isValidEmail) {
      sendedMessage.innerHTML = "Porfavor no olvide rellenar los campos :)";
      return;
    } else {
      email.classList.remove("input_valid");
      const data = {};
      inputs.forEach((input) => {
        data[input.placeholder.toLowerCase()] = input.value;
        input.value = "";
      });

      sendedMessage.innerHTML =
        "Gracias por contactarse, revisa la data en consola :)";
      console.log(data);
      console.log("data enviada");
      console.log(
        "Agradezco que hayas llegado hasta aqui, si eres companero alura LATAM / Oracle estamos en contacto, ya tienes mis redes sociales arriba y juntos podemos aprender el uno del otro :)"
      );
    }
  });

  email.addEventListener("blur", (ev) => {
    const span = document.getElementById("invalid-email");
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = regex.test(email.value);

    if (!isValidEmail || email.value === "") {
      email.classList.remove("input_valid");
      span.classList.add("show_error");
      email.classList.add("input_invalid");
    } else if (email.value !== "") {
      span.classList.remove("show_error");
      email.classList.remove("input_invalid");
      email.classList.add("input_valid");
    }
  });
});
