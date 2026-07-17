function parseCommand(input) {
    const args = [];

    let current = "";
    let inSingleQuote = false;

    for (let i = 0; i < input.length; i++) {
        const ch = input[i];

        if (ch === "'") {
            inSingleQuote = !inSingleQuote;
            continue;
        }

        if (ch === " " && !inSingleQuote) {

            if (current.length > 0) {
                args.push(current);
                current = "";
            }

            continue;
        }

        current += ch;
    }

    if (current.length > 0) {
        args.push(current);
    }

    return args;
}

module.exports = {
    parseCommand,
};