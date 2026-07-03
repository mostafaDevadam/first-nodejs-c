
console.log("start...")

const {exec} = require("child_process")

exec('./hello', (error, stdout, stderr) => {

    if(error){
        console.error(`Error: ${error.message}`)
        return
    }

    console.log(`C Output: ${stdout}`)
})


exec('./main', (error, stdout, stderr) => {

    if(error){
        console.error(`Error: ${error.message}`)
        return
    }
    const sum = parseInt(stdout.trim(), 10)

    console.log(`C Output: ${sum}`)
     console.log(`C Output: ${stdout}`)
     console.log(`C Output: ${sum + 10}`)
})

//------------------------------ 1
// Import the compiled native C binary
const addon = require('./build/Release/addon.node');

// Call the pure C sum function
const result = addon.sum(12.5, 7.5);

console.log(`Result addon calculated by C: ${result}`); // Output: 20

//-------------------------------------- 2
const koffi = require('koffi');
const path = require('path');

// 1. Load the compiled C shared library
const libraryPath = path.resolve(__dirname, 'libmain.so');
const lib = koffi.load(libraryPath);

// 2. Define the function signature: lib.func('name', 'return_type', ['argument_types'])
const sum = lib.func('sum', 'int', ['int', 'int']);

// 3. Call it natively like normal JavaScript!
console.log('Running koffi Node.js program...');
const result2 = sum(40, 2);

console.log(`Result2 koffi from C: ${result2}`); // Output: 42
//--------------------------------------------