const body = document.querySelector("body");

body.style.backgroundColor = `rgb(${[0,0,0].map(() => Math.floor(Math.random() * 256)).join(",")})`;
