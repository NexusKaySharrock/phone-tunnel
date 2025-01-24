import { consola } from "consola";
import { startTunnel } from "untun";
import { renderUnicodeCompact as renderQRCode } from 'uqr'

async function main() {
    const url = await consola.prompt("What URL do you want to tunnel?", {
        type: "text",
        default: 'http://localhost:3000/',
        placeholder: 'http://localhost:3000/'
    });

    consola.info(`Starting tunnel for: ${url}`);

    const tunnel = await startTunnel({
        url
    });

    // Function to handle cleanup tasks
    const cleanup = () => {
        consola.info('Closing tunnel...');
        tunnel.close();
        consola.success('Tunnel closed successfully');
    };

    const tunnelUrl = await tunnel?.getURL();

    if (tunnelUrl?.length) {
        consola.success(`Tunnel successfully started at: ${tunnelUrl}`);
    
        consola.box(renderQRCode(tunnelUrl));
    } else {
        consola.error(new Error('Could not find tunnel url. Closing'))
        cleanup();
    }
    
    // Listen for the SIGINT signal
    process.on('SIGINT', () => {
        consola.info('Received SIGINT. Exiting gracefully...');
        cleanup();
        process.exit(0); // Exit the process with success code
    });

    // Optionally, listen for other exit signals if needed
    process.on('SIGTERM', cleanup);
}

main().catch(error => {
    consola.error('An error occurred:', error);
    process.exit(1); // Exit with error code
});
