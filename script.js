document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("open-card-btn");
  const buttonContainer = document.getElementById("button-container");
  const contentContainer = document.getElementById("content-container");
  const cardContainer = document.querySelector(".card-container");
  const card = document.querySelector(".card");
  const flowerContainer = document.querySelector(".flower-container");

  const MAX_FLOWERS = 15;
  const FLOWER_INTERVAL = 1000;
  let flowersOnScreen = 0;
  let lastFlowerTime = 0;

  function createFlower() {
    if (flowersOnScreen >= MAX_FLOWERS) return;

    const flower = document.createElement("div");
    flower.classList.add("flower");

    for (let i = 1; i <= 10; i++) {
      const petal = document.createElement("div");
      petal.classList.add("petal", `p${i}`);
      flower.appendChild(petal);
    }

    const center = document.createElement("div");
    center.classList.add("center");
    flower.appendChild(center);

    flower.style.left = `${Math.random() * (window.innerWidth - 150)}px`;

    flowerContainer.appendChild(flower);
    flowersOnScreen++;

    flower.addEventListener("animationend", () => {
      if (flower.parentNode === flowerContainer) {
        flower.remove();
        flowersOnScreen--;
      }
    });
  }

  function animateFlowers(timestamp) {
    if (timestamp - lastFlowerTime > FLOWER_INTERVAL) {
      createFlower();
      lastFlowerTime = timestamp;
    }
    requestAnimationFrame(animateFlowers);
  }

  // Al presionar el botón
  openBtn.addEventListener("click", () => {
    // Oculta el botón
    buttonContainer.style.display = "none"; 

    // Muestra el contenedor de la carta y flores
    contentContainer.classList.remove("hidden");

    // Animación de aparición de la carta
    setTimeout(() => {
      cardContainer.classList.add("show");
      card.classList.add("show");
    }, 300);

    // Inicia animación de flores
    requestAnimationFrame(animateFlowers);

    // Reproducir música (opcional)
    const music = document.getElementById("bg-music");
    if (music) {
      music.volume = 0.5; // volumen inicial
      music.play().catch(err => console.log("Error al reproducir música:", err));
    }
  });
});
