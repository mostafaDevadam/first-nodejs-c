
console.log("start...")

const {exec} = require("child_process")

exec('./hello', (error, stdout, stderr) => {

    if(error){
        console.error(`Error: ${error.message}`)
        return
    }

    console.log(`\n C Output: ${stdout} \n`)
})


exec('./main', (error, stdout, stderr) => {

    if(error){
        console.error(`Error: ${error.message}`)
        return
    }
    const sum = parseInt(stdout.trim(), 10)

    console.log(`\n C Output: ${sum} \n`)
     console.log(`\n C Output: ${stdout} \n`)
     console.log(`\n C Output: ${sum + 10} \n`)
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

// set_name
const set_name = lib.func('set_name', 'void', ['string'])

set_name("Mostafa")

let name_buffer = Buffer.alloc(100)
name_buffer.write("Alex", "utf-8")
set_name(name_buffer)

// get_name
const get_name = lib.func('get_name', 'string', [])

const name = get_name()

console.log("get_name from c in nodejs : ", name)

// set_person

const Person = koffi.struct('Person', {
    name: 'char[150]',
    city: 'char[50]'
})

const set_person = lib.func('set_person', 'void', [Person])

const input_user = {
    name: "Adam",
    city: "Kiel"
}

console.log("Sending Js object to c struct person...")

set_person(input_user)

// get_person

const get_person = lib.func('get_person', Person, [])

console.log("get_person:", get_person())




//--------------------------------------------