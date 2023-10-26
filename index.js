const fs = require('fs');
const inquirer = require('inquirer');
const xmlbuilder = require('xmlbuilder');

const questions = [
    {
        type: 'input',
        name: 'text',
        message: "Enter three characters you want in your logo.",
        validate: function (text) {
            if (text.length > 3) {
                return "Please enter up to three characters.";
            }
            return true;
        }
    }, {
        type: 'input',
        name: 'textColor',
        message: "Enter the hex code you want for your logo's text."
    }, {
        type: 'list',
        name: 'shape',
        message: "Select the shape you want for your logo.",
        choices: ['Circle', 'Square', 'Triangle']
    }, {
        type: 'input',
        name: 'shapeColor',
        message: "Enter the hex code you want for your logo's shape."
    }
]

inquirer
    .prompt(questions)
    .then((answers) => {
        const {text, textColor, shape, shapeColor} = answers;

        function createLogo() {
            const svg = xmlbuilder
                .create('svg')
                .att('xmlns', 'http://www.w3.org/2000/svg')
                .att('width', 300)
                .att('height', 200);

            // Define the shape
            if (shape.toLowerCase() === 'circle') {
                svg
                    .ele('circle')
                    .att('cx', 150)
                    .att('cy', 100)
                    .att('r', 75)
                    .att('fill', shapeColor);
            } else if (shape.toLowerCase() === 'triangle') {
                svg
                    .ele('polygon')
                    .att('points', '150,25 75,175 225,175')
                    .att('fill', shapeColor);
            } else if (shape.toLowerCase() === 'square') {
                svg
                    .ele('rect')
                    .att('x', 75)
                    .att('y', 50)
                    .att('width', 150)
                    .att('height', 100)
                    .att('fill', shapeColor);
            }

            // Add the text
            svg
                .ele('text', text)
                .att('x', 150)
                .att('y', 110)
                .att('font-family', 'impact')
                .att('font-size', 50)
                .att('text-anchor', 'middle')
                .att('alignment-baseline', 'middle')
                .att('fill', textColor);

            // Save the SVG file
            fs.writeFileSync('logo.svg', svg.end({pretty: true}));

            console.log('Generated logo.svg');
        }

        createLogo();
    })