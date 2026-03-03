const fs = require('fs');
const PDFParser = require("pdf2json");

const pdfParser = new PDFParser(this, 1); // 1 = text only

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
pdfParser.on("pdfParser_dataReady", pdfData => {
    fs.writeFileSync("parsed-content.txt", pdfParser.getRawTextContent());
    console.log("Done");
});

pdfParser.loadPDF("public/tai-lieu-dia-ly.pdf");
