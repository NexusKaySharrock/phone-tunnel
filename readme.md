# Phone Tunnels

This leverages various unjs packages and cloudflare tunnels to make a localhost server available on the internet.

The main use of this will be to "host" a local site for testing on a mobile device.

## installation

required node >18

`nvm use 18`

`yarn install`

`yarn tunnel`

The tunnel will remain open until the command is killed in the terminal, at which point it will close down automatically.
