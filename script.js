const adviceId = document.querySelector(".advice__id");
const adviceText = document.querySelector(".advice__text");
const diceButton = document.querySelector(".dice-container");
const image = document.querySelector(".pattern-divider");

//add advice
const generateAdvice = async function () {
  try {
    const res = await fetch("https://api.adviceslip.com/advice");

    if (!res.ok) throw new Error("advice not found");

    const data = await res.json();

    const {
      slip: { id, advice },
    } = data;

    //setting the advice id
    adviceId.textContent = `advice # ${id}`;
    adviceText.textContent = `"${advice}"`;

    //telling to screen readers that the advice is displayed correctly
    adviceText.setAttribute("aria-live", "polite");
    adviceId.setAttribute("aria-live", "polite");
  } catch (err) {
    adviceText.textContent = `${err}`;

    //telling to screen readers that the advice which is displayed is incorrect
    adviceText.setAttribute("aria-live", "polite");
    adviceId.setAttribute("aria-live", "polite");
  }
};

//generating the advice
generateAdvice();

//generating the advice when the button is clicked
diceButton.addEventListener("click", generateAdvice);

//setting the image when the screen resizes
window.addEventListener("resize", function () {
  //get the screen width
  const screenWidth = window.innerWidth;

  if (screenWidth >= 1024) {
    image.setAttribute("src", "images/pattern-divider-desktop.svg");
  } else if (screenWidth < 1024) {
    image.setAttribute("src", "images/pattern-divider-mobile.svg");
  }
});
