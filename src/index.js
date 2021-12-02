const { Bookmarklet } = require("./utils/bookmarklet");

const titleElem = document.getElementById('title');
titleElem.innerHTML = "Advent of Code Bookmarklets";

titleElem.parentElement.append(new Bookmarklet('day01').element);
titleElem.parentElement.append(new Bookmarklet('day02').element);