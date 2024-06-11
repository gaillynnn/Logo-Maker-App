import inquirer from 'inquirer';
import svgdotjs from '@svgdotjs/svg.js';
const { createSVG } = svgdotjs;

// Create an SVG canvas using the createSVG function
const svg = createSVG().size(300, 200);

const questions = [
  {
    type: 'input',
    name: 'text',
    message: 'Enter the text for the logo:',
  },
  {
    type: 'input',
    name: 'textColor',
    message: 'Enter the text color:',
  },
  {
    type: 'list',
    name: 'shape',
    message: 'Choose a shape (circle, triangle, square):',
    choices: ['circle', 'triangle', 'square'],
  },
  {
    type: 'input',
    name: 'shapeColor',
    message: 'Enter the shape color:',
  },
];

inquirer.prompt(questions)
  .then(answers => {
    // Handle user responses
    console.log('User input:', answers);

    // Add text to the canvas based on user input
    svg.text(answers.text).fill(answers.textColor).font({ size: 30, anchor: 'middle' }).center(150, 100);

    // Determine the shape chosen by the user and draw the shape
    let shape;
    if (answers.shape === 'circle') {
        shape = svg.circle(100).center(150, 100);
    } else if (answers.shape === 'triangle') {
        shape = svg.polygon('150,50 100,150 200,150');
    } else if (answers.shape === 'square') {
        shape = svg.rect(100, 100).move(100, 50);
    }

    // Set the color of the shape based on user input
    shape.fill(answers.shapeColor);

    // Save the SVG canvas to a file named 'logo.svg'
    svg.svgToFile('logo.svg');
    console.log('Generated logo.svg'); // Print the output text in the command line
  })
  .catch(error => {
    console.error('Error:', error);
  });