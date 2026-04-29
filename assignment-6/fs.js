const fs = require("fs");

// console.log(fs)

fs.writeFile("./docs/test.txt", "Test this my firest file", (err) => {
   console.log("File created successfully.");
});

fs.readFile("./docs/test.txt", "utf-8", (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
    } else {
        console.log("File content:", data.toString());
    }
}); 

const redStream = fs.createReadStream("./docs/test.txt", "utf-8");

redStream.on("data", (chunk) => {
    console.log("Chunk received:", chunk.toString());
});

redStream.on("error", (err) => {
    console.error("Error reading file:", err);
});

redStream.on("end", () => {
    console.log("Finished reading file.");
}); 