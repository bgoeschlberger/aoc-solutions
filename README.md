[![Build Status](https://app.travis-ci.com/bgoeschlberger/aoc-solutions.svg?branch=main)](https://app.travis-ci.com/bgoeschlberger/aoc-solutions) [![Build and Test](https://github.com/bgoeschlberger/aoc-solutions/actions/workflows/build_and_test.yml/badge.svg)](https://github.com/bgoeschlberger/aoc-solutions/actions/workflows/build_and_test.yml) [![github-pages](https://github.com/bgoeschlberger/aoc-solutions/actions/workflows/gh-pages.yml/badge.svg)](https://github.com/bgoeschlberger/aoc-solutions/actions/workflows/gh-pages.yml) [![Known Vulnerabilities](https://snyk.io/test/github/bgoeschlberger/aoc-solutions/badge.svg)](https://snyk.io/test/github/bgoeschlberger/aoc-solutions) [![codecov](https://codecov.io/gh/bgoeschlberger/aoc-solutions/branch/main/graph/badge.svg?token=FCQLVPCXSE)](https://codecov.io/gh/bgoeschlberger/aoc-solutions)

# aoc-solutions

This project uses webpack to create [bookmarklets](https://en.wikipedia.org/wiki/Bookmarklet) for [Advent of Code 2021](https://adventofcode.com/).

It is continously deployed to Heroku: [https://aoc-solutions.herokuapp.com/](https://aoc-solutions.herokuapp.com/).

Here is a quick illustration of how you can use the bookmarklets to get a solution
![How-to](how-to-aoc.gif)

The bookmarklets include a check if they are executed on adventofcode.com and won't do anything anywhere else.
```javascript
if(window.location.host === 'adventofcode.com' )
```
