import runAllTests from "../test";

/**
 * Execute test
 */
export default async function executeTests(args: any) {
    if(args.test) {
        await runAllTests();
    }
}
