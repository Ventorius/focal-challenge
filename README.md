## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Live version

The live clickable version is available here: [Focal Challenge](https://focal-challenge.vercel.app/)


What is done:
- All the requirements are done
- Additionally mobile touch events are added
- Ability to reset all shapes
- Ability to choose custom width and height of the image


What could be done better:
- I was challenging myself to use only HTML and CSS to create the shapes, but it's not the best solution. It would be better to use canvas or SVG to create the shapes. It would be easier to manipulate them and add more functionalities.
- The code could be more organized, but I didn't want to spend too much time on it. Although logic is separated from the components, it could be better.
- The code could be more DRY, but I didn't want to spend too much time on it. I wanted to focus on the functionality.
- The colors are finite, so after couple clicks where the colors are randomized there will be a need to reset the colors. It would be better to have a possibility to change the color of the shapes or just add more randomization

What could be added:
- Possibility to edit shapes (there would be a need to switch to canvas for example)
- Zoom feature (I skipped it because it's useless to have this functionality without the possibility to edit shapes)
- Tests, tests, tests
- Ability to change background image
- Ability to change the color of the shapes
- Ability to change the size of the shapes
- Ability to change the position of the shapes
- 