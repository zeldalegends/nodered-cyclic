// *** System ***

var os = require("os");
console.log("Platform:", 
	    os.release());
console.log("IP:", 
	    os.networkInterfaces().eth0[0].address);
console.log("OS:", 
	    os.version());
console.log("CPU:",
	    os.cpus().length, "x", os.cpus()[0].model, os.cpus()[0].speed, "MHz");
console.log("RAM:",
	    Math.round(os.totalmem() / 1024 / 1024 / 1024 * 100) / 100, "GB /",
	    Math.round(os.freemem() / 1024 / 1024 / 1024 * 100) / 100, "GB free");

// *** Node-RED ***

var http = require('http');
var express = require("express");
var RED = require("node-red");

// Create an Express app
var app = express();

// Add a simple route for static content served from 'public'
app.use("/", express.static("public"));

// Create a server
var server = http.createServer(app);

// Create the settings object - see default settings.js file for other options
var settings = {
	httpAdminRoot: "/",
	httpNodeRoot: "/",
	userDir: ".",
	credentialSecret: false,
	flowFile: "flows.json",
	functionGlobalContext: {} // enables global context
};

// Initialise the runtime with a server and settings
RED.init(server, settings);

// Serve the editor UI from /red
app.use(settings.httpAdminRoot, RED.httpAdmin);

// Serve the http nodes UI from /api
app.use(settings.httpNodeRoot, RED.httpNode);

server.listen(1880);

// Start the runtime
RED.start();
