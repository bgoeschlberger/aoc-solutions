import { Bookmarklet } from './utils/bookmarklet';
import './index.less'

const titleElem = document.getElementById('title');
titleElem.innerHTML = "Advent of Code Bookmarklets";

titleElem.parentElement.append(new Bookmarklet('day01').element);
titleElem.parentElement.append(new Bookmarklet('day02').element);
titleElem.parentElement.append(new Bookmarklet('day03').element);
titleElem.parentElement.append(new Bookmarklet('day04').element);