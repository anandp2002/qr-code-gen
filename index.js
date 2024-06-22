/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
// import inquirer from "inquirer";
// import qr from "qr-image";
// import fs from "fs";

// inquirer
//   .prompt([
//     {
//       message: "Type in your URL: ",
//       name: "URL",
//     },
//   ])
//   .then((answers) => {
//     const url = answers.URL;
//     var qr_svg = qr.image(url);
//     qr_svg.pipe(fs.createWriteStream("qr_img.png"));

//     fs.writeFile("URL.txt", url, (err) => {
//       if (err) throw err;
//       console.log("The file has been saved!");
//     });
//   })
//   .catch((error) => {
//     if (error.isTtyError) {
//       // Prompt couldn't be rendered in the current environment
//     } else {
//       // Something else went wrong
//     }
//   });

//index.js
// import inquirer from "inquirer";
// import qr from "qr-image";
// import fs from "fs";
// import express from "express";
// import path from "path";

// const app = express();
// const port = process.env.PORT || 3000;

// // Serve static files from the 'public' folder
// app.use(express.static(path.join(__dirname, 'frontend')));
// const __filename = new URL(import.meta.url).pathname;
// const __dirname = path.dirname(__filename);

// app.use(express.static(path.join(__dirname, 'frontend')));

// app.get('/generate-qr', (req, res) => {
//   const data = req.query.data || 'https://example.com'; // Default data if not provided

// // app.get("/", (req, res) => {
// //     console.log(req.rawHeaders);

//   const qrCode = qr.image(data);
//   res.type('png'); // Set response type to PNG
//   qrCode.pipe(res);
// });

// inquirer
//   .prompt([
//     {
//       message: "Type in your URL: ",
//       name: "URL",
//     },
//   ])
//   .then((answers) => {
//     const url = answers.URL;
//     var qr_svg = qr.image(url);
//     qr_svg.pipe(fs.createWriteStream("frontend/qr_img.png")); // Save the image in the 'public' folder

//     fs.writeFile("frontend/URL.txt", url, (err) => {
//       if (err) throw err;
//       console.log("The file has been saved!");
//     });
//   })
//   .catch((error) => {
//     if (error.isTtyError) {
//       // Prompt couldn't be rendered in the current environment
//     } else {
//       // Something else went wrong
//     }
//   });

// // Start the Express server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3000;

// Calculate __dirname using import.meta.url
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve static files from the 'frontend' folder
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/generate-qr', (req, res) => {
  const data = req.query.data || 'https://example.com'; // Default data if not provided
  const qrCode = qr.image(data);
  res.type('png'); // Set response type to PNG
  qrCode.pipe(res);
});

inquirer
  .prompt([
    {
      message: 'Type in your URL: ',
      name: 'URL',
    },
  ])
  .then((answers) => {
    const url = answers.URL;
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream('frontend/qr_img.png')); // Save the image in the 'frontend' folder

    fs.writeFile('frontend/URL.txt', url, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
