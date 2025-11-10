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
