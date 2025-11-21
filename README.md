# Devlog #1 - 11/14/2025

## Roles:

Reece will be the _Tools Lead_ for this project. She will look at and select the necessary tools to facilitate the processes of source control and automated deployment of our game to the web. When needed, she will help team members set up and configure these systems on their machines. She will also look into tools to help with development such as linters and auto-formatting tools.

Beckham will be the _Engine Lead_. He is resourceful due to having various experiences in other engines. As a result he is able to figure out how to solve problems through constant experimentation. He’s had experience in handling big projects which should be helpful for keeping the codebase organized. He’s also taught students how to use various engines in the past.

Kimi is the _Design Lead_. With her art experience, she will be responsible for establishing the art direction of the game. This will go in tandem with the creative direction of the game. This includes what kind of feelings or fantasy the game is trying to depict. She will also manipulate the HTML to give the game the appropriate UI based on the direction of the game, as well as creating new assets with Procreate.

Vivian will be the _Testing Lead_. They will handle testing in various ways. One way is using Copilot to organize any problems in the code. Another is actually testing the game. This will be done via solo playtests but also finding others to playtest as well. This will be done a couple of times a week to make sure the codebase is constantly organized.

## Main Creation Tools:

### Language and Libraries

While we are not committed to a particular engine, we plan to use TypeScript or JavaScript due to our familiarity with using the language. We will be using the Three.js library to render 3D graphics and enable physics in our game. We will also be including HTML as a support piece for marking up the browser page and creation of UI elements. If we decide down the line that we need to save any data, we’ll be looking to save them in a JSON file for use.

### Tools

We will be using Github Codespaces as our IDE since we’ve already been working with it throughout our assignments. The Live Share extension available in Codespaces also eases the difficulty of remote collaboration through allowing remote pair programming. For art, we will be using Procreate to create original, hand-drawn assets. The Three.js editor will be used for building a 3D scene as this our planned library to use. If we wish to include 3D assets, we will be utilizing Blender for modelling and rendering. For sound design we will be using Reaper to edit audio files needed for our game.

### AI Usage

We’ll use Github Copilot’s autocomplete features on our code during development, as well as agent mode to review our code for smells and potential solutions. The use of these tools is intended to quicken the speed of development and produce higher-quality code that is easier to read and understand.

## Outlook

### What is your team hoping to accomplish that other teams might not attempt?

We are hoping to create a playable game mechanic that can be expanded upon. We hope that what we create in this project can be used as a framework for future physics-based puzzles that we may encounter in the future.

### What do you anticipate being the hardest or riskiest part of the project?

The most difficult part of this project would probably be implementing physics in TypeScript, as it is mostly a language that handles 2D and web creation. Working in a language that each team member is familiar with makes it easier for each of us to understand, debug, and contribute, but the language has its own limitations as a 3D engine.

### What are you hoping to learn by approaching the project with the tools and materials you selected above?

We would like to gain more experience using GitHub Codespaces together. We’ve done it before in section but now we’ll be collaborating for a full project. This will be a good opportunity to learn how to use libraries in TypeScript due to the wide range of possibilities that are made available with Three.js such as 3D graphics and physics.

---

# Devlog #2 - 11/21/2025

## Requirements

### Platform

We are using the web via TypeScript. However, we are using a modified version of TypeScript as certain things had to be done to bypass the strict type to allow our .js libraries to work. TypeScript doesn’t come with native 3D support so anything in that capacity must be imported. Our project setup is different from the ones used in the past class projects.

### Third-party 3D Rendering Library

We are using Three.js as our third-party 3D rendering library. This allows our scene to be in 3D. Three.js allows things like making cubes. It also comes with features that we wrote in code, like a clock which behaves as a timer. Another is orbiting controls which are common in 3D engines.

### Third-party Physics Library

We are using ammo.js as our third-party physics simulation library. This allows the use of a physics world. We can set objects to have rigidbodies which can do various things such as colliding with other objects. It also allows us to use forces like gravity or our own custom forces.

### Simple Physics-based Puzzle

The playable prototype has a simple physics-based puzzle requiring the player to move a cube into a goal area. A condition check that will detect when the player cube hits the target hole.

### Player Controls

The player is able to exert control over the game through WASD controls. These apply a force in a direction with W/S being on the Y axis and A/D being on the X axis. The cube is always falling so the player must keep that in mind when applying forces.

### Visual Win/Loss States

The player cube starts red, then turns green once they complete the puzzle.

### Pre-commit Automation

The codebase uses Prettier as before-commit automation which consistently formats our code for us. A linting program was attempted although it doesn’t seem to work anymore. We’ll look into fixing the program or using another one, but for now, we’re settling with just autoformatting.

### Post-push Automation

The codebase automatically pushes the project to GitHub Pages. This is done through the Github Actions bot which automatically updates the Github Page after pushing our changes. This method requires us to remove all errors of the code before deployment, otherwise, it will not push. There were a few moments where we kept unused imports, preventing the page from publishing until the errors were resolved.

## Reflection

Probably use another physics library? I can't find a way to detect collisions with ammo.js.

---

# Dev Commands

### Run in browser:

`npm run dev`

### Linting automation:

`npx eslint . --fix`

### Formatting automation:

`npx prettier . --write`
