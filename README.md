# Sorting Algorithm Visualizer

> [Working Demo](https://sorting.raru.dev/)

## Project Description

A web-based visualizer that employs rainbow-colored lines with varying heights
to illustrate the inner workings of sorting algorithms. This web application,
built using vanilla `JavaScript` and `p5.js` for canvas rendering, offers an
interactive learning experience. Users can select from a range of sorting
algorithms and observe their real-time execution.

## Getting Started

### Prerequisites

- nodejs

  Debian/Ubuntu:

  ```sh
  sudo apt install nodejs
  ```

- npm

  Debian/Ubuntu:

  ```sh
  sudo apt install npm
  ```

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/CozmaRares/sorting-algs-visualizer.git
   cd sorting-algs-visualizer
   ```

2. Install the dependencies

   ```sh
   npm install
   ```

3. Start the development server

   ```sh
   npm run dev
   ```

4. Build for production

   ```sh
   npm run build
   ```

   or build and deploy (configured deploy on GitHub Pages)

   ```sh
   npm run deploy
   ```

   > **Note** By default, the deploy script will push to the current `origin`.
   > If you cloned this repository, the `origin` will be set to **MY** GitHub
   > repository and domain. Be sure to remove the `origin` and set it yoursef,
   > and change the `deploy:domain` script if you plan on deploying to GitHub Pages.

    <!---->

   > Remove origin
   >
   > ```sh
   > git remote remove origin
   > ```

## Reflection

I decided to work on this project because I had just learned about **p5.js**,
which was one of the first JavaScript libraries I got the hang of. I thought
it'd be fun to create a website using it, and since I was really into sorting
algorithms at the time, I decided to combine the two interests. This project is
basically a tweaked version of the initial project to be bundled with Vite.

To put it all together, I used some basic stuff like **HTML** and **CSS** to set
up the structure of the website and add basic styles. Then, I added the interactive
parts using **JavaScript** and the **p5.js** library.
