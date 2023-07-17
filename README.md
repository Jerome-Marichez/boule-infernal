# Boule Infernal
- Boule Infernal - Remake of game "Boule Infernal" in React
- Play the game here: https://boule-infernal.vercel.app/

## Table of Contents
- [Introduction](#introduction)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Installation](#installation)

## Introduction

- The Infernal Ball is a game where the goal is to achieve the highest possible score. The ball must dodge the walls and collect the goals.

- The controls are the "Up/Down" keyboard keys on a computer and clicks above or below the ball for the mobile version.

- This game is a remake of a game released on Amstrad.

- The project is entirely coded in React and includes unit tests that cover the project (Jest with 90% coverage), as well as a test of these tests using a code mutation tool (StrykerJS with 70% coverage) to ensure reliability and quality.

- The scores are saved online using SupaBase.

![Capture d’écran 2023-07-17 114613](https://github.com/Jerome-Marichez/boule-infernal/assets/62617561/651cb6b7-f5fd-4d03-a171-5a0182463962)
![Capture d’écran 2023-07-17 114419](https://github.com/Jerome-Marichez/boule-infernal/assets/62617561/77c6af9f-e33c-4c3e-b8ac-72f1d4fac0d2)

## Technologies 

- <img src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png" width="24"/> React
- <img src="https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png" width="24"/> TypeScript
- <img src="https://icons-for-free.com/iconfiles/png/512/end+long+shadow+preprocesor+sass+web+icon-1320184849915610733.png" width="24"/> SASS
- <img src="https://www.svgrepo.com/show/353930/jest.svg" width="24"/> Jest
- <img src="https://stryker-mutator.io/images/stryker.svg" width="24"/> StrykerJS
- <img src="https://cf.appdrag.com/dashboard-openvm-clo-b2d42c/uploads/supabase-TAiY.png" width="24"/> SupaBase

## Prerequisites

- [NodeJS (**version 14 or higher**)](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)

## Installation 

- Clone the present repo .
- In the directory of the cloned repo, install its dependencies: `npm install`.
- Launch the project: `npm run start`.
- For run tests with jest: `npm test -- --coverage` 
- For test our tests with mutation testing: `stryker run` 
