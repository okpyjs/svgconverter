# SVG to PNG Converter

A module for converting SVG to PNG format from URL, content, file.

## Installation

To install the SVG to PNG Converter module, use the following command:

```shell
npm install svgconverter
```

## Usage

```javascript
const converter = require('svgconverter');

const svgUrl = 'https://www.w3schools.com/signup/lynxlogo.svg';
const svgContent = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M38,38c0-12,24-15,23-2c0,9-16,13-16,23v7h11v-4c0-9,17-12,17-27c-2-22-45-22-45,3zM45,70h11v11h-11z" fill="#371"/><circle cx="50" cy="50" r="45" fill="none" stroke="#371" stroke-width="10"/></svg>';
const localFilePath = 'example.svg';
var outputFilePath = 'output.png';

// Convert from URL
outputFilePath = 'fromURL.png';
converter.convertFromUrl(svgUrl, outputFilePath, (err, imageDataUrl) => {
    if (err) {
        console.error('Error converting SVG to PNG:', err);
        return;
    }

    console.log('Conversion successful! Image data URL:', imageDataUrl);
});

// Convert from SVG content
outputFilePath = 'fromContent.png';
converter.convertFromContent(svgContent, outputFilePath, (err, imageDataUrl) => {
    if (err) {
        console.error('Error converting SVG to PNG:', err);
        return;
    }

    console.log('Conversion successful! Image data URL:', imageDataUrl);
});

// Convert from local file
outputFilePath = 'fromFile.png';
converter.convertFromLocalFile(localFilePath, outputFilePath, (err, imageDataUrl) => {
    if (err) {
        console.error('Error converting SVG to PNG:', err);
        return;
    }

    console.log('Conversion successful! Image data URL:', imageDataUrl);
});

```

## Functions

### `convertFromUrl(svgUrl, outputPath, callback)`

Converts an SVG file from a URL to PNG format and saves it to the specified output path.

- `svgUrl` (string): The URL of the SVG file.
- `outputPath` (string): The path where the PNG image will be saved.
- `callback` (function): The callback function to handle the result or error. It receives two parameters: `error` (if any) and `imageDataUrl` (the resulting PNG image data URL).

### `convertFromContent(svgContent, outputPath, callback)`

Converts an SVG content to PNG format and saves it to the specified output path.

- `svgContent` (string): The content of the SVG file.
- `outputPath` (string): The path where the PNG image will be saved.
- `callback` (function): The callback function to handle the result or error. It receives two parameters: `error` (if any) and `imageDataUrl` (the resulting PNG image data URL).

### `convertFromLocalFile(filePath, outputPath, callback)`

Converts an SVG file from the local filesystem to PNG format and saves it to the specified output path.

- `filePath` (string): The path of the SVG file.
- `outputPath` (string): The path where the PNG image will be saved.
- `callback` (function): The callback function to handle the result or error. It receives two parameters: `error` (if any) and `imageDataUrl` (the resulting PNG image data URL).

## License

This module is released under the MIT License. See the [LICENSE](LICENSE) file for details.
