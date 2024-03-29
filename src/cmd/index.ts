import { ArgumentParser } from "argparse";

import executeTests from "./test";

const parser = new ArgumentParser({
    description: "Argparse example"
});

parser.add_argument("--test", {
    help: "Execute tests",
    action: "store_true"
});

/**
 * Execute commands
 */
export default async function executeCommands() {
    const args = parser.parse_args();
    console.log(`Arguments: `, args);

    await executeTests(args);
    
    // process.exit(0);
};

executeCommands();
