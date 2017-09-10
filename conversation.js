/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var TJBot = require('tjbot');
var config = require('./config');

// obtain our credentials from config.js
var credentials = config.credentials;

// obtain user-specific config
var WORKSPACEID = config.conversationWorkspaceId;

// these are the hardware capabilities that TJ needs for this recipe
var hardware = ['microphone', 'speaker'];

// set up TJBot's configuration
var tjConfig = {
    verboseLogging: true,
    robot: {
        name: 'antônia',
        gender: 'female'
    },
    log: {
        level: 'verbose'
    }
};

// instantiate ou r TJBot!
var tj = new TJBot(hardware, tjConfig, credentials);

console.log("You can ask me to introduce myself or tell you a joke.");
console.log("Try saying, \"" + tj.configuration.robot.name + ", please introduce yourself\" or \"" + tj.configuration.robot.name + ", who are you?\"");
console.log("You can also say, \"" + tj.configuration.robot.name + ", tell me a joke!\"");

//tj.speak('Hello World');
tj.speak('Oi, Meu nome é Antônia!');


// listen for utterances with our attentionWord and send the result to
// the Conversation service
tj.listen(function(msg) {

    console.log(msg);
    // check to see if they are talking to TJBot
    if (msg.startsWith(tj.configuration.robot.name)) {
        // remove our name from the message
  console.log('nome ok!!');       
 var turn = msg.toLowerCase().replace(tj.configuration.robot.name.toLowerCase(), "");

        // send to the conversation service
        tj.converse(WORKSPACEID, turn, function(response) {
            // speak the result
	
	console.log(response.description);
        //tj.speak(turn);    
	tj.speak(response.description);
        });
    }
});
