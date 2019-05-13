#!/usr/bin/env node
/* eslint-disable no-console */
import http from 'http';
import https from 'https';
import fs from 'fs'
import axios from "axios";

import './index';
import app from './app';
import models, { sequelize } from './models';
import socketIo from 'socket.io';

/**
 *  Create HTTP / HTTPS server.
 *  Get port from environment or args
 */



const port = process.env.PORT || process.argv[2] || 5000;
app.set('port', port);



let server;
if(process.env.ENV_NAME === 'DEV_LOCAL' || process.env.ENV_NAME === 'MEMORY'){
  server = http.createServer(app);
} else{
  const key = fs.readFileSync(__dirname + '/privkey.pem');
  const cert = fs.readFileSync(__dirname + '/cert.pem');
  const options = {
    key: key,
    cert: cert,
    requestCert: true,
    rejectUnauthorized: false,
  }
  server = https.createServer(options, app);
}

const io = socketIo(server);

let interval;
io.on("connection", socket => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 5000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});


const getApiAndEmit = async socket => {
  try {
    const res = await axios.get(
      "https://api.airtable.com/v0/app4XnP7NuSCWMWD7/NewOrders",{
        headers: {
          "Content-Type" : 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`
        }
      }
    ); 
    socket.emit("FromAPI", res.data.records); // Emitting a new message. It will be consumed by the client
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

function onListening() {
  const addr = server.address();
  console.info(`Listening on ${addr.port}`);
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // specific listen error gets a friendly message
  switch (error.code) {
    case 'EADDRINUSE':
      console.error(`${port} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
