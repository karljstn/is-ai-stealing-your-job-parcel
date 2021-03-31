# Architecture

This document describes the high-level architecture of `is-ai-stealing-your-job`.
If you want to familiarize yourself with the code base, you are just in the right place!

## Bird's Eye View

This is the front-end of a website who's purpose is to inform and question users about Artificial Intelligence and it's role in the workforce.
During navigation, users will converse with an AI, answer questions, play mini-games, and interact with data.

`is-ai-stealing-your-job` is built with Vue CLI, Typescript, VueX and ThreeJS.

## Code Map

This section talks briefly about various important directories and data structures.

### `src/classes/`

To be initialized from Vue components, usually at `mount()`.

### `src/classes/three/`

-   `MainScene.ts`: responsible for overall scene setup and logic.
-   `Benchmark.ts`: stress-tests a device to obtain raw FPS data, used to configure quality settings.

### `src/components/`

VueJS components, divided in four categories:

-   **Sections** : main sub-sections of the website, each one ending with a way to progress to the next sub-section,

### `src/views/`

VueJS components loaded from router.

## Cross-Cutting Concerns

This sections talks about the things which are everywhere and nowhere in particular.

### Optimisation

This project should run flawlessly on any smartphone dated released less than 4 years ago as of start of development (not release date).

This puts it at 12 February 2017.
Notable minimum targets are therefore iPhone 8, Samsung Galaxy S8 / J3 / J5 / J7 and Google Pixel 2.

### GUI

Any meaningful and easy to implement variable impacting the animations and visuals should be accessible through a GUI.
This streamlines developer - designer exchanges and overall tweaking.

### Accessibility

We're targeting A11Y compliance and multilang (FR/EN).

### Backend

We're connected to a basic database, hosted on a Node server and using Directus.

## Greatly inspired by :

https://matklad.github.io/2021/02/06/ARCHITECTURE.md.html
