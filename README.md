This is a MERN Stack project template. Still a WIP.
Clone it, use it, modify it!

## About
This project can be used as a boilerplate for any MERN Stack project you want to build!
You can use only the client (React) or the server (NodeJS) section independently aswell.

## Prerequisites
For this project to run you need to have a mongoDB connection.
Either a local MongoDB or hosted on something like AWS, Azure etc.
Additionally you need [git](https://git-scm.com/), [NodeJS](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed.

## Setup

First clone this project.
```
$ git clone https://github.com/JakobKIT/MERN-project-template.git
```

After cloning the project you need to install all dependencies.
You need to do this in the main folder and in the client folder!

```bash
$ npm install
```

Last but not least create 2 .env files. I created a template in the folder.
```
/server/config
```
## Features

The project is split into two different subfolders, one containing the server (NodeJS) the other the client (React).
To run the project in Development mode just use the following command:
```
$ npm start dev
```
This will start the NodeJS server aswell as the [webpack-dev-server](https://www.npmjs.com/package/webpack-dev-server) for the client.
To do that I used [concurrently](https://www.npmjs.com/package/concurrently).

### Server (NodeJS)

The server is using [express](https://expressjs.com/) as a web framework and [mongoose](https://mongoosejs.com/) as a ORM for mongoDB. 
While running in development mode, [morgan](https://www.npmjs.com/package/morgan) is used to log the incoming requests to your terminal. 
Furthermore there are two seeding scripts that create some test data und a user to log in.
The user information will be displayed in your terminal too.

### Client (React)

The client side is build using [React](https://reactjs.org/) and [Redux](https://redux.js.org/).
For bundling the files in development aswell as in production mode [webpack](https://webpack.js.org/) is used.
For backwards compatibility [babel](https://babeljs.io/) is used aswell.

## License

  [MIT](LICENSE)