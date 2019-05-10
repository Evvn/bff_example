> The Reporting Web (B)ackend (F)or a (F)rontend is a middle man between Mr.Yum and supporting upstream APIs.
> This project uses ```expressjs``` and ```nodejs``` with ```babel 7``` as the transpiler.

Mr.Yum BFF
=================
  * [Setting up the project](#setup)
  * [Environment Configuration](#environment-configuration)
  * [Running this project locally](#running-this-project-locally)
  * [Running tests locally](#running-tests-locally)

## Setup


## Environment Configuration
#### Layers

| Thing       | Description                    |
| ----------- | ------------------------------ |
| Router      | Mapping paths to Service calls |
| Service     | Public API for domain          |
| Transformer | Thing that does the Work       |
| Extract     | Thing that gets the values     |

    +---+   +-app.js-------------------------------------------------------------+
    |   |   |                                                                    |
    |   |   |  +---+   +--------+   +-------------------+   +-----------------+  |
    |   |   |  |   |   |        |   |                   |   |                 |  |
    |   |   |  |   |   |        |   |                 <-----+   Extractor     |  |
    |   |   |  |   |   |        |   |                   |   |                 |  |
    |   |   |  |   |   |        |   |                   |   |                 |  |
    |   |   |  |   |   |        |   |                   |   +-----------------+  |
    |   |   |  |   |   |      <-----+      Service      |                        |
    |   |   |  |   |   |        |   |                   |   +-----------------+  |
    |   |   |  | e |   |        |   |                   |   |                 |  |
    | s |   |  | x |   |        |   |                 <-----+   Transformer   |  |
    | e |   |  | p |   |        |   |                   |   |                 |  |
    | r <---+  | r <---+ Router |   |                   |   |                 |  |
    | v |   |  | e |   |        |   +-------------------+   +-----------------+  |
    | e |   |  | s |   |        |                                                |
    | r |   |  | s |   |        |                                                |
    |   |   |  |   |   |        |   +-------------------+                        |
    |   |   |  |   |   |        |   |                   |                        |
    |   |   |  |   |   |        |   |                   |                        |
    |   |   |  |   |   |        |   |                   |                        |
    |   |   |  |   |   |      <-----+   expressRouter   |                        |
    |   |   |  |   |   |        |   |                   |                        |
    |   |   |  |   |   |        |   |                   |                        |
    |   |   |  |   |   |        |   |                   |                        |
    |   |   |  +---+   +--------+   +-------------------+                        |
    |   |   |                                                                    |
    +---+   +--------------------------------------------------------------------+
    
## Running This Project Locally
:exclamation: Always issue ```npm install``` before running the project so that all the dependencies that are required for the project are restored properly.
#### ```dev.local``` mode: 
* Please use ```sh ./ops/bin/dev_local/start.sh``` command.
* :exclamation: This mode should not required any external apis calls as the data is being fetched from the memory. 



[contributions process]: (CONTRIBUTING.md)
[Linting]: (docs/linting-and-styles.yaml#linting)
[node]: https://nodejs.org/en/
[nvm]: https://github.com/creationix/nvm
