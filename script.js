// ----- Array med munk information ----- //

const donutArray = [
  {
    id: "donut1", // Munkens id
    picture1: "images/donut_1.png", // Munk bild 2
    picture2: "images/donut_1_two.png", // Munk bild 2
    name: "Socker Munk", // Munkens Namn
    price: 25, // Munkens Pris
    quantity: 0, // Antal Munkar
    category: "01Budget", // Munkens Kategori  Budget/Economy/Deluxe
    rating: 1, // Munkens Rating 1-5 stjärnor
  },
  {
    id: "donut2",
    picture1: "images/donut_2.png",
    picture2: "images/donut_2_two.png",
    name: "Choklad Munk",
    price: 28,
    quantity: 0,
    category: "01Budget",
    rating: 3,
  },
  {
    id: "donut3",
    picture1: "images/donut_3.png",
    picture2: "images/donut_3_two.png",
    name: "Vanilj Munk",
    price: 20,
    quantity: 0,
    category: "01Budget",
    rating: 2,
  },
  {
    id: "donut4",
    picture1: "images/donut_4.png",
    picture2: "images/donut_4_two.png",
    name: "Äppel Munk",
    price: 29,
    quantity: 0,
    category: "01Budget",
    rating: 1,
  },
  {
    id: "donut5",
    picture1: "images/donut_5.png",
    picture2: "images/donut_5_two.png",
    name: "Saffrans Munk",
    price: 21,
    quantity: 0,
    category: "02Economy",
    rating: 1,
  },
  {
    id: "donut6",
    picture1: "images/donut_6.png",
    picture2: "images/donut_6_two.png",
    name: "Kokos Munk",
    price: 33,
    quantity: 0,
    category: "02Economy",
    rating: 3,
  },
  {
    id: "donut7",
    picture1: "images/donut_7.png",
    picture2: "images/donut_7_two.png",
    name: "Citron Munk",
    price: 32,
    quantity: 0,
    category: "02Economy",
    rating: 3,
  },
  {
    id: "donut8",
    picture1: "images/donut_8.png",
    picture2: "images/donut_8_two.png",
    name: "Blåbärs Munk",
    price: 35,
    quantity: 0,
    category: "02Economy",
    rating: 4,
  },
  {
    id: "donut9",
    picture1: "images/donut_9.png",
    picture2: "images/donut_9_two.png",
    name: "Holy Munk",
    price: 45,
    quantity: 0,
    category: "03Deluxe",
    rating: 5,
  },
  {
    id: "donut10",
    picture1: "images/donut_10.png",
    picture2: "images/donut_10_two.png",
    name: "Ängla Munk",
    price: 42,
    quantity: 0,
    category: "03Deluxe",
    rating: 4,
  },
  {
    id: "donut11",
    picture1: "images/donut_11.png",
    picture2: "images/donut_11_two.png",
    name: "Gloria Munk",
    price: 55,
    quantity: 0,
    category: "03Deluxe",
    rating: 4,
  },
  {
    id: "donut12",
    picture1: "images/donut_12.png",
    picture2: "images/donut_12_two.png",
    name: "Gudomlig Munk",
    price: 60,
    quantity: 0,
    category: "03Deluxe",
    rating: 5,
  },
];

let shop = document.querySelector("#shop");

//funktion för rating stars
const printRating = (rating) => {
  var stars = `<span class="ratingStars${rating}">&#9733;</span>`;

  for (let i = 1; i < 5; i++) {
    stars = stars + `<span class="ratingStars${rating}">&#9733;</span>`;
  }

  return stars;
};

let generateDonuts = () => {
  // Denna funktion skapar nya munkar i html strukturen med datan från donutArray
  shop.innerHTML = donutArray
    .map((x) => {
      let { id, name, price, picture1, picture2, quantity, category, rating } =
        x;
      return ` 
        <div id=product-id-${id} class="item donut-item" data-price="${price}">
            <div id=prod-img-${id} class="img-container">
                <i onclick="nextImage(${id})" class="bi bi-caret-left-fill"></i>
                <img width="275" src=${picture1} alt="Munk bild ett.">
                <i onclick="nextImage(${id})" class="bi bi-caret-right-fill"></i>
            </div>
            <div class="description">
                <h3>${name}</h3>
                <p>${printRating(rating)}</p>
                <h2>${price} kr</h2>
                <div class="price-quantity">
        
                    <div class="buttons">
                        <button title="Subtract" onclick="removeDonut(${id})" class="bi bi-dash-circle-fill"></button>
                        <div id=${id} class="quantity">${quantity}</div>
                        <button title="Add" onclick="addDonut(${id})" class="bi bi-plus-circle-fill"></button>
                    </div>
                </div>
            </div>
        </div>
        `;
    })
    .join("");
};

generateDonuts();

const addDonut = (id) => {
  let selectedDonut = id;
  let search = donutArray.find((x) => x.id === selectedDonut.id);

  if (search === undefined) {
    donutArray.push({
      id: selectedDonut.id,
      quantity: 1,
    });
  } else {
    search.quantity += 1;
  }
  updateQuantity(selectedDonut.id);
};

const removeDonut = (id) => {
  let selectedDonut = id;
  let search = donutArray.find((x) => x.id === selectedDonut.id);

  if (search.quantity === 0) return;
  else {
    search.quantity -= 1;
  }
  updateQuantity(selectedDonut.id);
};

let updateQuantity = (id) => {
  let search = donutArray.find((x) => x.id === id);

  document.getElementById(id).innerHTML = search.quantity;
  printCurrentDonuts();
  noFaktura();
};

// --- Sortera Munkar --- //

const nameBtn = document.querySelector("#sortName");
const priceBtn = document.querySelector("#sortPrice");
const ratingBtn = document.querySelector("#sortRating");
const categoryBtn = document.querySelector("#sortCategory");
const minPriceInterval = document.querySelector("#minPrice");
const maxPriceInterval = document.querySelector("#maxPrice");

minPriceInterval.value = 0;
maxPriceInterval.value = 100;
minPriceInterval.max = 100;
maxPriceInterval.max = 100;

// Sortera efter Namn

nameBtn.addEventListener("click", sortName);

const priceIntervalHandler = () => {
  const donuts = document.querySelectorAll(".donut-item");
  const min = minPriceInterval.value;
  const max = maxPriceInterval.value;
  for (const donut of donuts) {
    const price = Number(donut.dataset.price);
    if (min <= price && price <= max) {
      donut.style.display = "block";
    } else {
      donut.style.display = "none";
    }
  }
};

// Sortera  efter prisintervall
document
  .querySelector("#minPrice")
  .addEventListener("input", priceIntervalHandler);
document
  .querySelector("#maxPrice")
  .addEventListener("input", priceIntervalHandler);

function sortName() {
  donutArray.sort((prod1, prod2) =>
    prod1.name.localeCompare(prod2.name, "se-SV")
  );
  generateDonuts();
}

// Sortera efter Rating

ratingBtn.addEventListener("click", sortRating);

function sortRating() {
  donutArray.sort((prod1, prod2) => prod1.rating - prod2.rating);
  generateDonuts();
}

// Sortera efter Category

categoryBtn.addEventListener("click", sortCategory);

function sortCategory() {
  donutArray.sort((prod1, prod2) =>
    prod1.category.localeCompare(prod2.category, "se-SV")
  );
  generateDonuts();
}

// Sortera efter Price

priceBtn.addEventListener("click", sortPrice);

function sortPrice() {
  donutArray.sort((prod1, prod2) => prod1.price - prod2.price);
  generateDonuts();
}

// --- Price Range Meny --- //

let donutRangeOne = document.querySelector("#donutPriceOne");
let donutRangeTwo = document.querySelector("#donutPriceTwo");
let donutRangeThree = document.querySelector("#donutPriceThree");

const cart = document.querySelector("#donuts-cart");
const totalPrice = document.querySelector("#totalPrice");
const clearBtn = document.querySelector("#clearBtn");
const discount = document.querySelector("#discount");
const cartSymbol = document.querySelector("#cartSymbol");
const shippingPrice = document.querySelector("#shippingPrice");
const priceWithShipping = document.querySelector("#priceWithShipping");
const darkThemeBtn = document.querySelector("#darkThemeBtn");
const buttonContainer = document.querySelector("#buttonContainer");
const sortBtns = buttonContainer.getElementsByClassName("sortBtn");
const discountBtn = document.querySelector("#discountBtn");

let donutsAmount = 0;
let total = 0;
let cartQuantity = "";
let shippingprice = 0;

// highlightar aktiv sorteringsknapp
for (let i = 0; i < sortBtns.length; i++) {
  sortBtns[i].addEventListener("click", function () {
    let current = document.getElementsByClassName("active");
    if (current.length > 0) {
      current[0].className = current[0].className.replace(" active", "");
    }
    this.className += " active";
  });
}

const d = new Date();
// skapar dagens datum (månad/datum)
let dd = String(d.getDate()).padStart(2, "0");
let mm = String(d.getMonth() + 1).padStart(2, "0"); //January is 0!
let today = mm + "/" + dd;

// Skapar veckodag 0-6 0 = söndag, 1 = måndag osv.
let day = d.getDay();

//skapar numret på aktuell vecka
startDate = new Date(d.getFullYear(), 0, 1);
let days = Math.floor((d - startDate) / (24 * 60 * 60 * 1000));

let weekNumber = Math.ceil(days / 7);

// skapar aktuellt klockslag
let hours = d.getHours();
let minutes = d.getMinutes();
let time = hours + ":" + minutes;

// Fredag 15:00 - måndag 03:00 alla munkar 15% dyrare

function weekendPrice() {
  if (
    (day === 5 && hours >= 15) ||
    day > 5 ||
    day === 0 ||
    (day === 1 && hours < 3)
  ) {
    for (let i = 0; i < donutArray.length; i++) {
      donutArray[i].price = Math.round(donutArray[i].price * 1.15); // 15% dyrare och avrundat till heltal
    }
    generateDonuts();
  }
}

weekendPrice();

// Lägger till donuts i varukorgen
function printCurrentDonuts() {
  cart.innerHTML = "";
  total = 0;
  donutsAmount = 0;
  shippingprice = 0;

  for (let i = 0; i < donutArray.length; i++) {
    // räknar ut priset på flera av samma sort
    let totalDonutPrice = donutArray[i].price * donutArray[i].quantity;

    // 10% rabatt om fler än 10 av en sort
    if (donutArray[i].quantity > 10) {
      totalDonutPrice = Math.round(totalDonutPrice * 0.9);
    }

    donutsAmount += donutArray[i].quantity; //räknar ut hur många donuts i varukorgen
    total += Math.round(totalDonutPrice); // räknar it totalsumman av alla donuts

    if (donutsAmount > 15) {
      shippingprice = 0; // gratis frakt om fler än 15 munkar
    } else {
      shippingprice = Math.round(25 + total * 0.1); // Frakt 25 kr + 10% av totalpris avrundat till heltal
    }

    shippingPrice.innerHTML = `Frakt: ${shippingprice} kr`; // Skriver ut pris för frakt

    priceWithShipping.innerHTML = `Totalbelopp: ${shippingprice + total} kr`;

    // Visar antal donuts och totalpris i varukorgen i menyn
    cartSymbol.innerHTML = `<i class="fa-solid fa-cart-shopping"></i><span>${donutsAmount}</span>  ${total} kr`;

    //Skriver ut donuts i kundvagnen
    if (donutArray[i].quantity > 0) {
      cart.innerHTML += `
            <div>
                <img src = "${donutArray[i].picture1}">
                <ul>
                    <li><span>${donutArray[i].name}</span></li>
                    <li>${donutArray[i].quantity} st á ${donutArray[i].price} kr/st</li>
                    <li>totalt ${totalDonutPrice} kr</li>
                </ul>
            </div>`;

      totalPrice.textContent = `Pris: ${total} kr`;
    }
  }
  specialOffers();
}

function specialOffers() {
  // rabatt för tisdag och jämn vecka
  if (weekNumber % 2 == 0 && day === 2 && total > 25) {
    total = total * 0.75;
    totalPrice.innerHTML = `Tisdag jämn vecka, 25% rabatt!<br>Totalpris: ${total} kr`;
  }

  // luciabulle på köpet, får det inte att funka med (dd === 13 && mm === 12) varför??
  else if (today === "12/13") {
    totalPrice.innerHTML = `Totalpris: ${total} kr<br>Du får en luciabulle på köpet!`;
  }

  // 10% måndagar innan kl10
  else if (day === 1 && hours < 11 && minutes < 60) {
    total = total * 0.9;
    totalPrice.innerHTML = `Måndag innan kl 10, 10% rabatt!<br>Totalpris: ${total} kr`;
  }

  //Om lucia och jämn vecka och tisdag
  else if (
    weekNumber % 2 == 0 &&
    day === 3 &&
    total > 25 &&
    today === "12/13"
  ) {
    total = total * 0.75;
    totalPrice.innerHTML = `Tisdag jämn vecka, 25% rabatt!<br> Totalpris: ${total} kr.<br> Du får dessutom luciabulle på köpet!`;
  }

  //Om lucia och måndag innan kl10
  else if (today === "12/13" && day === 1 && hours < 11 && minutes < 60) {
    total = total * 0.9;
    totalPrice.innerHTML = `Måndag innan kl 10, 10% rabatt!<br>Totalpris: ${total} kr.<br>Du får dessutom luciabulle på köpet!`;
  } else {
  }
}

discountBtn.addEventListener("click", discountFunction);

// funktion för rabattkod a_damn_fine-cup_of-coffee
function discountFunction() {
  if (discount.value === "a_damn_fine-cup_of-coffee") {
    totalPrice.textContent = `Grattis, beställningen är gratis!`;
    total = 0;
    discount.value = "";
    priceWithShipping.innerHTML = `Totalt: ${shippingprice + total} kr`;
    cartSymbol.innerHTML = `<i class="fa-solid fa-cart-shopping"></i><span>${donutsAmount}</span>  ${total} kr`;
  }
}

// tömning av varukorg när man trycker på knappen

clearBtn.addEventListener("click", deleteCheckout);

// timers som visar varningsmeddelande i kundkorg efter 12 min
//och tömmer varukorg efter 15 min
function timer() {
  setTimeout(warningTime, 720000); // 720 000 ms = 12 min
  setTimeout(deleteCheckout, 900000); // 900 000 ms = 15 min
}

timer();

// visar ett varningsmeddelande att det är 3 min kvar innan korgen töms
function warningTime() {
  alert(
    "OBS! Slutför din beställning inom 3 minuter, annars töms din varukorg!"
  );
}

// funktion som tömmer varukorgen, antingen när man trycker på
// töm varukorg eller när det gått 15 min
function deleteCheckout() {
  for (let i = 0; i < donutArray.length; i++) {
    donutArray[i].quantity = 0;
  }
  printCurrentDonuts(); //laddar om kassan
  generateDonuts(); //laddar om html'n
  cart.innerHTML = `<h3>Varukorgen är tom</h3>`;
  priceWithShipping.innerHTML = `Totalt: 0 kr`;
  totalPrice.innerHTML = ``;
  shippingPrice.innerHTML = ``;
}

let body = document.querySelector("#body");

//Dark-theme toggle
darkThemeBtn.addEventListener("click", function () {
  body.classList.toggle("dark-theme");
});

// om julafton julaftontema
function christmasTheme() {
  if ((dd = 24 && mm == 12)) {
    body.classList.add("christmas-theme");
    console.log("idag");
  }
}
christmasTheme();

//hittar massa olika html element

const allInputForms = document.querySelectorAll("input"); //hittar alla inputfält (får med några för kassan också)
const clearFormButton = document.querySelector("#clearFormButton"); //hittar töm forumlär fältet
const personNummerInput = document.querySelector("#personnum"); //hittar personnummerfältet
const creditCardInputs = document.querySelectorAll(
  'input[data-operator="creditcard"'
); //hittar alla creditkortsfält
const selectPaymentMethod = document.querySelector("#paymentMethod"); //hittar val av betalmetod
const formErrorField = document.querySelectorAll(".errorInput"); //hittar fält för felmeddelanden
const submitFormButton = document.querySelector("#sendOrder"); //hittar continue to... knappen
const zipcodeInput = document.querySelector("#zip");
const firstNameInput = document.querySelector("#fname");
const lastNameInput = document.querySelector("#lname");
const cityNameInput = document.querySelector("#city");
const emailInput = document.querySelector("#email");
const addressInput = document.querySelector("#adr");
const gdprInput = document.querySelector("#approvedGDPR");
const paymentFaktura = document.querySelector("#paymentFaktura");
const userFormPayment = document.querySelector(".userForm");
const goToShop = document.querySelector("#buyMoreDonuts");
const sortBar = document.querySelector(".sort-bar");

let imgClickCounter = 2;

//Funktion för bildspel per munk
const nextImage = (id) => {
  let selectedDonut = id;
  let search = donutArray.find((x) => x.id === selectedDonut.id);
  selectedDonutImage =
    id.parentElement.parentElement.parentElement.previousElementSibling
      .children[1];
  if (imgClickCounter == 2) {
    selectedDonutImage.setAttribute("src", search.picture2);
    imgClickCounter--;
  } else {
    selectedDonutImage.setAttribute("src", search.picture1);
    imgClickCounter++;
  }
};

//funktion för betala och stänga shoppen
function continueToPayment() {
  shop.style.display = "none";
  sortBar.style.display = "none";
  userFormPayment.style.display = "flex";
  clearBtn.style.display = "none";
  document.getElementById("userForm").scrollIntoView();
}

function backToShop() {
  shop.style.display = "";
  sortBar.style.display = "";
  userFormPayment.style.display = "none";
  clearBtn.style.display = "block";
  document.getElementById("sortName").scrollIntoView();
}

//funktion för dyrt för faktura
function noFaktura() {
  if (total > 800) {
    paymentFaktura.value = "Endast kortköp över 800kr";
    paymentFaktura.textContent = "Endast kortköp över 800kr";
  }

  if (total < 800) {
    paymentFaktura.value = "faktura";
    paymentFaktura.textContent = "faktura";
  }
}

//boolean variablar för check av formulär
//Alla godkända aktiveras knappen submit!
function checkValidForm() {
  let validFirstName = firstNameInput.formNoValidate;
  let validLastName = lastNameInput.formNoValidate;
  let validEmail = emailInput.formNoValidate;
  let validAddress = addressInput.formNoValidate;
  let validCity = cityNameInput.formNoValidate;
  let validZip = zipcodeInput.formNoValidate;
  let validGDPR = gdprInput.checked;
  let validPersonnummer;

  if (selectPaymentMethod.value == "kort") {
    validPersonnummer = true;
  } else {
    validPersonnummer = personNummerInput.formNoValidate;
  }

  if (
    validFirstName &&
    validLastName &&
    validEmail &&
    validAddress &&
    validCity &&
    validZip &&
    validPersonnummer &&
    validGDPR
  ) {
    submitFormButton.removeAttribute("disabled");
    submitFormButton.value = "Klart! Klicka för att beställa!";
    submitFormButton.style.backgroundColor = "green";
  } else {
    submitFormButton.setAttribute("disabled", "");
    submitFormButton.value = "Fyll i formuläret för att fortsätta...";
    submitFormButton.style.backgroundColor = "gray";
  }
}

//funktion som loopar igenom alla input och sätter value till 0 = null
function deleteAllFormInput() {
  //från 3 till -1 för att endast påverka forumlären
  for (i = 1; i < allInputForms.length - 1; i++) {
    allInputForms[i].value = null;
  }
}

//funktion som körs då value på selectPaymentMethod ändras.
//funktionen hittar även "label" till valt inputfält med hjälp av previousElementSibling
function showSelectedPaymentMethod() {
  if (selectPaymentMethod.value == "faktura") {
    //gömer kreditkort
    for (i = 0; i < creditCardInputs.length; i++) {
      creditCardInputs[i].hidden = true;
      creditCardInputs[i].previousElementSibling.hidden = true;
    }
    personNummerInput.previousElementSibling.hidden = false; //gör personnummerfältet synligt och
    personNummerInput.hidden = false;
  } else if (selectPaymentMethod.value == "kort") {
    //döljer personnr
    personNummerInput.hidden = true;
    personNummerInput.previousElementSibling.hidden = true; //gör kreditkort synligt
    for (i = 0; i < creditCardInputs.length; i++) {
      creditCardInputs[i].hidden = false;
      creditCardInputs[i].previousElementSibling.hidden = false;
    }
  } else {
    //döljer alla betalningsätt
    personNummerInput.hidden = true;
    personNummerInput.previousElementSibling.hidden = true;
    for (i = 0; i < creditCardInputs.length; i++) {
      creditCardInputs[i].hidden = true;
      creditCardInputs[i].previousElementSibling.hidden = true;
    }
  }
}

//funktion för a validera alla typer av nummer
//inputField = vilket inputfält vi får datan ifrån
//numberAmount = antal tecken/siffror som är godkänt
//errorField = 0 för kontakt info 1 för betalinfo
const checkNumberIfOk = function (inputField, numberAmount, errorField) {
  const newErrorLine = document.createElement(`li`);
  newErrorLine.setAttribute("data-operator", `${inputField.name}`);
  let numbers = /^[0-9]+$/;
  if (
    inputField.value.match(numbers) &&
    inputField.value.length == numberAmount
  ) {
    try {
      newNewErrorLine = document.querySelector(
        `li[data-operator="${inputField.name}"`
      );
      newNewErrorLine.remove();
    } catch (err) {}
    inputField.style.color = "black";
    inputField.formNoValidate = true; //skickar tillbaka true om det är godkänt
  } else {
    formErrorField[errorField].appendChild(newErrorLine);
    newErrorLine.innerHTML = `Fel angivet ${inputField.name} </li>`;
    inputField.style.color = "red";
    inputField.formNoValidate = false; //skickar tillbaka false om det är icke godkänt
  }
  checkValidForm(); //updaterar våra boolean variablar ifall saker är godkänt eller ej
};

//funktion för a validera alla typer av nummer
//inputField = vilket inputfält vi får datan ifrån
//errorField = 0 för kontakt info 1 för betalinfo
const checkTextIfOk = function (inputField, errorField, regexSet) {
  const newErrorLine = document.createElement(`li`);
  newErrorLine.setAttribute("data-operator", `${inputField.name}`);
  let validation = regexSet;
  console.log(validation);
  if (inputField.value.match(validation)) {
    try {
      newNewErrorLine = document.querySelector(
        `li[data-operator="${inputField.name}"`
      );
      newNewErrorLine.remove();
    } catch (err) {}
    inputField.style.color = "black";
    inputField.formNoValidate = true; //skickar tillbaka true om det är godkänt
  } else {
    formErrorField[errorField].appendChild(newErrorLine);
    newErrorLine.innerHTML = `Fel angivet ${inputField.name} </li>`;
    inputField.style.color = "red";
    inputField.formNoValidate = false; //skickar tillbaka false om det är icke godkänt
  }
  checkValidForm(); //updaterar våra boolean variablar ifall saker är godkänt eller ej
};

// = = = = Kopplar funktioner till tryck/changes = = = = //
clearFormButton.addEventListener("click", deleteAllFormInput); //kopplar funktion till knapptryck av "rensa formulär"
selectPaymentMethod.addEventListener("change", showSelectedPaymentMethod); //kopplar funktion till val av betalmetod
personNummerInput.addEventListener("change", () => {
  checkNumberIfOk(personNummerInput, 10, 1); //kopplar funktion till on change vid personnrfältet
});
zipcodeInput.addEventListener("change", () => {
  checkNumberIfOk(zipcodeInput, 5, 0); //kopplar funktion till on change vid zipcode
});
firstNameInput.addEventListener("change", () => {
  checkTextIfOk(firstNameInput, 0, /^[a-zA-Z]+$/); //kopplar funktion till on change vid firstname
});
lastNameInput.addEventListener("change", () => {
  checkTextIfOk(lastNameInput, 0, /^[a-zA-Z]+$/); //kopplar funktion till on change vid firstname
});
cityNameInput.addEventListener("change", () => {
  checkTextIfOk(cityNameInput, 0, /^[a-zA-Z]+$/); //kopplar funktion till on change vid firstname
});
emailInput.addEventListener("change", () => {
  checkTextIfOk(emailInput, 0, /^\S+@\S+\.\S+$/); //kopplar funktion till on change vid firstname
});
addressInput.addEventListener("change", () => {
  checkTextIfOk(addressInput, 0, /^\s*\S+(?:\s+\S+){1}/); //kopplar funktion till on change vid firstname
});
gdprInput.addEventListener("change", checkValidForm);
// submitFormButton.addEventListener('click', sendDonutOrder);
goToCheckOut.addEventListener("click", continueToPayment);
goToShop.addEventListener("click", backToShop);

// popupruta med leveranstid och beställningsbekräftelse
const deliveryBtn = document.querySelector("#sendOrder");
const deliveryTime = document.querySelector("#deliveryInformation");
const checkOutPopUp = document.querySelector("#checkOutPopUp");

deliveryBtn.addEventListener("click", createPopUp); // På klick så startar eventet timeCheck

function createPopUp() {
  checkOutPopUp.style.display = "block";
  const now = new Date();
  const hour = now.getHours();

  if (22 <= hour || 5 > hour) {
    // Mellan klockan 22:00 och 05:00.
    deliveryTime.innerHTML = `Tack för beställningen ${firstNameInput.value}! <br> Vi skickar ${donutsAmount} munkar till ${addressInput.value} <br> Totaltpris: ${total} kr <br> Levernstiden förväntas bli 45 minuter.<br>Happy Donuting!`;
  } else if (
    now.getDay() === 5 && // Dagen är fredag.
    hour >= 11 && // Klockan är 11:00 eller mer.
    hour < 13 // Klocklan är mindre än 13:00.
  ) {
    deliveryTime.innerHTML = `Tack för beställningen ${firstNameInput.value}! <br> Vi skickar ${donutsAmount} munkar till ${addressInput.value} <br> Totaltpris: ${total} kr <br>Leveransen beräknas vara framme 15:00.<br>Happy Donuting!`;
  } else if (now.getDay() === 6) {
    return (document.getElementById(
      "leveransTid"
    ).innerHTML = `Tack för beställningen ${firstNameInput.value}! <br>Vi skickar ${donutsAmount} munkar till ${addressInput.value} <br>Totaltpris: ${total} kr <br> Leveranstid förväntas bli 1 timme & 30 minuter.<br>Happy Donuting!`);
  } else if (now.getDay() === 0) {
    return (document.getElementById(
      "leveransTid"
    ).innerHTML = `Tack för beställningen ${firstNameInput.value}! <br>Vi skickar ${donutsAmount} munkar till ${addressInput.value} <br>Totaltpris: ${total} kr <br> Leveranstid förväntas bli 1 timme & 30 minuter.<br>Happy Donuting!`);
  } else {
    deliveryTime.innerHTML = `Tack för beställningen ${firstNameInput.value}! <br>Vi skickar ${donutsAmount} munkar till ${addressInput.value} <br>Totaltpris: ${total} kr <br> Leveranstid förväntas bli 30 minuter.<br>Happy Donuting!`;
  }
}
