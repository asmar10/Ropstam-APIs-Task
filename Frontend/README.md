# Client Side

## Features

Video Walkthrough: https://www.loom.com/share/be51dd3277a54be0bc828623924ed500?sid=53573b1a-a30d-4bc7-bfb7-f9a9d09f3e89

- The client side consists of a user login and signup form.
- A user can either sign up using their email or just directly sign in by signing a message through metamask.
- A unique random nonce along with text is generated as a message to sign for the user.
- Once the user signs the message their access token is stored by the browser in the local storage which maintains the session.
- Once the user hits logout the session is cleared.

## METAMASK SIGN IN

- Client sends an address to the server and receives a unique message to sign
- Metamask pops up for the user to sign the message
- In return a signature is received
- Client sends the address, message, signature to the server to authenticate
- If verified then server returns the token
