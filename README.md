# Devlog Entry - 11/14/2025

# Roles:

Reece will be the _Tools Lead_ for this project. She will look at and select the necessary tools to facilitate the processes of source control and automated deployment of our game to the web. When needed, she will help team members set up and configure these systems on their machines. She will also look into tools to help with development such as linters and auto-formatting tools.

Beckham will be the _Engine Lead_. He is resourceful due to having various experiences in other engines. As a result he is able to figure out how to solve problems through constant experimentation. He’s had experience in handling big projects which should be helpful for keeping the codebase organized. He’s also taught students how to use various engines in the past.

Kimi is the _Design Lead_. With her art experience, she will be responsible for establishing the art direction of the game. This will go in tandem with the creative direction of the game. This includes what kind of feelings or fantasy the game is trying to depict. She will also manipulate the HTML to give the game the appropriate UI based on the direction of the game, as well as creating new assets with [Procreate](https://procreate.com/).

Vivian will be the _Testing Lead_. They will handle testing in various ways. One way is using Copilot to organize any problems in the code. Another is actually testing the game. This will be done via solo playtests but also finding others to playtest as well. This will be done a couple of times a week to make sure the codebase is constantly organized.

---

# Main Creation Tools:

## Language and Libraries

While we are not committed to a particular engine, we plan to use TypeScript or JavaScript due to our familiarity with using the language. We will be using the [Three.js](http://Three.js) library to render 3D graphics and enable physics in our game. We will also be including HTML as a support piece for marking up the browser page and creation of UI elements. If we decide down the line that we need to save any data, we’ll be looking to save them in a JSON file for use.

## Tools

We will be using [GitHub Codespaces](https://github.com/features/codespaces) as our IDE since we’ve already been working with it throughout our assignments. The [Live Share](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare) extension available in Codespaces also eases the difficulty of remote collaboration through allowing remote pair programming. For art, we will be using [Procreate](https://procreate.com/) to create original, hand-drawn assets. The [Three.js](http://Three.js) editor will be used for building a 3D scene as this our planned library to use. If we wish to include 3D assets, we will be utilizing [Blender](https://www.blender.org/) for modelling and rendering. For sound design we will be using [Reaper](https://www.reaper.fm/) to edit audio files needed for our game.

## AI Usage

We’ll use Github Copilot’s autocomplete features on our code during development, as well as agent mode to review our code for smells and potential solutions. The use of these tools is intended to quicken the speed of development and produce higher-quality code that is easier to read and understand.

---

# Outlook

## What is your team hoping to accomplish that other teams might not attempt?

We are hoping to create a playable game mechanic that can be expanded upon. We hope that what we create in this project can be used as a framework for future physics-based puzzles that we may encounter in the future.

## What do you anticipate being the hardest or riskiest part of the project?

The most difficult part of this project would probably be implementing physics in TypeScript, as it is mostly a language that handles 2D and web creation. Working in a language that each team member is familiar with makes it easier for each of us to understand, debug, and contribute, but the language has its own limitations as a 3D engine.

## What are you hoping to learn by approaching the project with the tools and materials you selected above?

We would like to gain more experience using [GitHub Codespaces](https://github.com/features/codespaces) together. We’ve done it before in section but now we’ll be collaborating for a full project. This will be a good opportunity to learn how to use libraries in TypeScript due to the wide range of possibilities that are made available with [Three.js](http://Three.js) such as 3D graphics and physics.

---

# Codespaces Notes

Running browser:

npm run dev

Linting automation:

npx eslint . --fix

Formatting automation:

npx prettier . --write
