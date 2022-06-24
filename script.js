'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const textBox = document.querySelector('.text-box');
const container = document.querySelector('.container');
const loads = document.querySelector('.spin');
const arrow = document.querySelector('.arrow');
const renderError = function (message) {
  const html = `<div class="error">${message}</div> `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const show = function (message) {
  const html = `<div class="show">${message}</div> `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
// Render Country
const renderCountry = function (data, className = '') {
  const html = `
  <article class="country animate-bottom" ${className}>
    <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💵</span>${data.currencies[0].name}</p>
      </div>
    </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
let renderNow = false;
let Run = false;
setTimeout(() => {
  console.log('loading....');
}, 1000);
setTimeout(() => {
  loads.classList.add('hidden');
}, 4700);
setTimeout(() => {
  btn.classList.remove('hidden');
  arrow.classList.add('animate-bottom');
  textBox.classList.add('animate-bottom');
  btn.classList.add('animate-bottom');
  textBox.classList.remove('hidden');
  arrow.classList.remove('hidden');
  console.log('Loading Complete');
}, 5000);
///////////////////////////////////////
// Get User Location
let remove = false;
if (!remove) {
  const whereAmI = function (lat, lng) {
    // Convert lat and lng to Country Name
    fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
      .then(res => {

        if (!res.ok) {
          // Handle error
          countriesContainer.classList.remove('lazy-img');
          btn.classList.add('hidden');
          show(`Whoops Something Went Wrong At the Back Rooms (<span class="highlight">ERROR</span> ${res.status}) Try Again!`);
        }
        return res.json();
      })
      .then(data => {
        return fetch(`https://restcountries.com/v2/name/${data.country}`);
      })
      .then(res => {
        if (!res.ok)
        // Handle error
          throw new Error(`Country not found (${res.status}) Try again`);

        return res.json();
      })
      .then(data => renderCountry(data[0]))
      // Handle error When No RenderCountry
      .catch(err => console.error(`Error ${err} 💥`));
    };
  btn.addEventListener('click', function () {
    // When Clicked Get User Location
    console.log('LOCATING...');
    const coords = navigator.geolocation.getCurrentPosition(function (
      position
    ) {
      setTimeout(() => {
        console.log(`LOCATED`);
      }, 1000)
      textBox.classList.add('hidden');
      arrow.classList.add('hidden');
      countriesContainer.style.marginBottom = '-10%';
      btn.classList.add('hidden');
      // Render Country As a UI Component
      whereAmI(position.coords.latitude, position.coords.longitude);
      setTimeout(() => {
        countriesContainer.classList.remove('lazy-img');
      }, 5400);
    });
    remove = true;
  });
}

