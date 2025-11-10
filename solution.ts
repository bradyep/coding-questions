import { Fizzbuzz } from "./solutions/fizzbuzz.js";

const nodeParamsToOmit = 2;
const args: string[] = process.argv.slice(nodeParamsToOmit); // remove node and script paths

if (args.length < 1) {
    console.log('Must supply which solution to run');
    process.exit(0);
}

args.forEach((arg, index) => {
    console.log(`Argument ${index + 1}: ${arg}`)
});

const solution: string = args[0] ?? '';

switch (solution) {
    case "fizzbuzz": 
        console.log("loading fizzbuzz solution");
        const countToParamValue = getParamValueFor('count-to');
        const fizzbuzz = new Fizzbuzz(+countToParamValue);
        fizzbuzz.solve();
        break;
    case "fibonacci": 
        console.log("loading fibonacci solution");
        break;
    case "anagram": 
        console.log("loading anagram solution");
        break;
    default:
        console.log(`solution ${solution} not found`);
}

function getParamValueFor(paramName: string): number | string {
    const paramNameIndex = args.indexOf('--' + paramName)
    if (paramNameIndex < 0) { 
        console.log(`Can't find parameter name: ${paramName}`);
    } else {
        console.log(`Found ${paramName} | args.length: ${args.length} | paramNameIndex: ${paramNameIndex}`);
        if (args.length - 1 <= paramNameIndex) { 
            console.log(`Found param name at ${paramNameIndex} but size of array is ${args.length}, which is too small, so can't get value`);
        } else {
            const paramValue = args[paramNameIndex + 1];
            if (paramValue) {
                return paramValue;
            } else {
                console.log(`Param value at position ${paramNameIndex + 1} is undefined`)
            }
        }
    }

    return 0;
}
