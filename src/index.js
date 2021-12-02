const { Bookmarklet } = require("./utils/bookmarklet");

const titleElem = document.getElementById('title');
titleElem.innerHTML = "Advent of Code Bookmarklets";

const day1 = new Bookmarklet('day1').element;
titleElem.parentElement.append(day1);