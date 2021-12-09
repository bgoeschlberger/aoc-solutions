import { Bookmarklet } from './utils/bookmarklet';
import './index.less';

const bookmarkletArea = document.getElementById('bookmarkletArea');

bookmarkletArea.append(new Bookmarklet('day01').element);
bookmarkletArea.append(new Bookmarklet('day02').element);
bookmarkletArea.append(new Bookmarklet('day03').element);
bookmarkletArea.append(new Bookmarklet('day04').element);
bookmarkletArea.append(new Bookmarklet('day05').element);
bookmarkletArea.append(new Bookmarklet('day06').element);
bookmarkletArea.append(new Bookmarklet('day07').element);
bookmarkletArea.append(new Bookmarklet('day08').element);