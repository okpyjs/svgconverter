const fs = require('fs');
const axios = require('axios');
const svg2img = require('svg2img');
const { parse } = require('svgson');

/**
 * Converts an SVG content to PNG format and saves it to the specified output path.
 * @param {string} svgContent - The content of the SVG file.
 * @param {string} outputPath - The path where the PNG image will be saved.
 * @param {Function} callback - The callback function to handle the result or error.
 */
function convertSvgToPng(svgContent, outputPath, callback) {
  // Parse SVG to extract dimensions
  parse(svgContent)
    .then((parsedSvg) => {
      const { width, height } = parsedSvg.attributes;

      // Convert SVG to PNG with dynamic size
      svg2img(svgContent, { format: 'png', width, height }, (err, buffer) => {
        if (err) {
          callback(err);
          return;
        }

        // Save the PNG buffer to the specified output path
        fs.writeFile(outputPath, buffer, (err) => {
          if (err) {
            callback(err);
            return;
          }

          // Read the saved PNG file
          fs.readFile(outputPath, (err, data) => {
            if (err) {
              callback(err);
              return;
            }

            // Convert the PNG data to a base64-encoded image data URL
            const base64String = data.toString('base64');
            const imageDataUrl = `data:image/png;base64,${base64String}`;

            // Invoke the callback with the image data URL
            callback(null, imageDataUrl);
          });
        });
      });
    })
    .catch((error) => {
      callback(error);
    });
}

/**
 * Creates a converter object with methods to convert SVG to PNG.
 * @returns {object} - The converter object.
 */
function createConverter() {
  return {
    /**
     * Converts an SVG file from a URL to PNG format and saves it to the specified output path.
     * @param {string} svgUrl - The URL of the SVG file.
     * @param {string} outputPath - The path where the PNG image will be saved.
     * @param {Function} callback - The callback function to handle the result or error.
     */
    convertFromUrl: (svgUrl, outputPath, callback) => {
      axios
        .get(svgUrl, { responseType: 'text' })
        .then((response) => {
          const svgContent = response.data;
          convertSvgToPng(svgContent, outputPath, callback);
        })
        .catch((error) => {
          callback(error);
        });
    },

    /**
     * Converts an SVG content to PNG format and saves it to the specified output path.
     * @param {string} svgContent - The content of the SVG file.
     * @param {string} outputPath - The path where the PNG image will be saved.
     * @param {Function} callback - The callback function to handle the result or error.
     */
    convertFromContent: (svgContent, outputPath, callback) => {
      convertSvgToPng(svgContent, outputPath, callback);
    },

    /**
     * Converts an SVG file from the local filesystem to PNG format and saves it to the specified output path.
     * @param {string} filePath - The path of the SVG file.
     * @param {string} outputPath - The path where the PNG image will be saved.
     * @param {Function} callback - The callback function to handle the result or error.
     */
    convertFromLocalFile: (filePath, outputPath, callback) => {
      fs.readFile(filePath, 'utf8', (err, svgContent) => {
        if (err) {
          callback(err);
          return;
        }

        convertSvgToPng(svgContent, outputPath, callback);
      });
    },
  };
}

// Create a converter object
const converter = createConverter();

module.exports = converter;
