const backend_port = document.getElementById("backend_port").src.split("backend_port=")[1];
const socket = new WebSocket(`ws://${location.hostname}:${backend_port}`);

var term = new window.Terminal({
    cursorBlink: true,
    theme: {
        background: '#1e1e1e', // Dark background color
        foreground: '#ffffff', // Text color
    }
});
term.open(document.getElementById('terminal'));

function init() {
    if (term._initialized) {
        return;
    }

    term._initialized = true;

    term.writeln("Welcome to Arcane Security Terminal!");
    term.writeln("Type 'help' to see available commands.\n");

    term.prompt = () => {
        term.write('\r\n');
    };
    prompt(term);

    term.onData(e => {
        switch (e) {
            case '\u0003': // Ctrl+C
                term.write('^C');
                prompt(term);
                break;
            case '\r': // Enter
                runCommand(term, command);
                command = '';
                break;
            case '\u007F': // Backspace (DEL)
                // Do not delete the prompt
                if (term._core.buffer.x > 2) {
                    term.write('\b \b');
                    if (command.length > 0) {
                        command = command.substr(0, command.length - 1);
                    }
                }
                break;
            case '\u0009':
                console.log('tabbed', output, ["dd", "ls"]);
                break;
            default:
                if (e >= String.fromCharCode(0x20) && e <= String.fromCharCode(0x7E) || e >= '\u00a0') {
                    command += e;
                    term.write(e);
                }
        }
    });
}

function clearInput(command) {
    var inputLengh = command.length;
    for (var i = 0; i < inputLengh; i++) {
        term.write('\b \b');
    }
}
function prompt(term) {
    command = '';
    term.write('\r\n');
}
socket.onmessage = (event) => {
    term.write(event.data);
}

function runCommand(term, command) {
    if (command.length > 0) {
        clearInput(command);
        socket.send(command + '\n');
        return;
    }
}

init();
