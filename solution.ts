const nodeParamsToOmit = 2;
const args: string[] = process.argv.slice(nodeParamsToOmit); // remove node and script paths
args.forEach((arg, index) => {
    console.log(`Argument ${index + 1}: ${arg}`)
})
