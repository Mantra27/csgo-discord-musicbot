/*MIT License

Copyright (c) 2021 Mantra27

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

const Discord = require('discord.js');
const client = new Discord.Client();
const config = require(__dirname + "/settings.json");
const songfile_path = __dirname +"dtouch.txt"
const readLastLine = require('read-last-lines');
const fs = require('fs')
const ytdl = require('ytdl-core');
const token = config.bot_token;
var logfile = config.path
var vcid = config.channle_id;
console.log('//Listenin to CS:GO chat......//')
    client.once('ready', () => {
        console.log('Bot is online !')
    fs.watchFile(logfile, (eventType, filename) => {

        if (filename){
            readLastLine.read(logfile, 2).then(function (lines) {

                last_line = lines;
                if (last_line.includes(" : ")){

                    var msg = last_line.split(" : ")[1]
                    if(msg.includes("SC Mode MenuControls -> GameControls")){
                        msg = msg.replace("SC Mode MenuControls -> GameControls", " ");
                    }
                    msg = msg.trim();
                    //console.log(msg)
                    if(msg.startsWith("stopx")){
                        let VC = client.channels.cache.get(vcid);
                        VC.leave();
                        console.log('bot has been disconnected on command')
                    }
                    else if(msg.startsWith("playx")){
                        if(msg.includes("/at")){

                            msg = msg.replace("playx", "")
                            var ts = msg.split("/at")[1]
                            msg = msg.replace(ts, "")
                            msg = msg.replace("/at", "")
                            msg = msg.trim();
                            ts = ts.trim();
                
                            const ytsr = require('ytsr');
                            async function aditya_bro_lalDIL(){
                            
                            const searchResults = await ytsr(msg);
                            const video = searchResults.items.filter(i => i.type === "video")[0]
                            var link = video.url+`?t=${ts}`
                            console.log(link)
                            console.log(`link of `+`${msg}: ` + link)
                            
                                client.user.setActivity(msg,{type:"LISTENING"});
                                let VC = client.channels.cache.get(vcid); 
                                    VC.join().then(connection =>{
                                    const dispatcher = connection.play(ytdl(video.url, { filter: 'audioonly' }));
                                    dispatcher.on("end", end => {
                                        let VC = client.channels.cache.get(vcid);
                                        VC.leave();
                                        console.log('Playing is finished!');
                                    });    
                                })       
                            
                        }
                            aditya_bro_lalDIL();
        
                        }
                        else{
                        msg = msg.replace("playx", "")
                        msg = msg.trim();

                        const ytsr = require('ytsr');
                        async function aditya_bro_lalDIL(){
                        
                        const searchResults = await ytsr(msg);
                        const video = searchResults.items.filter(i => i.type === "video")[0]
                        
                        console.log(`link of `+`${msg}: ` +video.url)
                        
                            client.user.setActivity(msg,{type:"LISTENING"});
                            let VC = client.channels.cache.get(vcid); 
                                VC.join().then(connection =>{
                                const dispatcher = connection.play(ytdl(video.url, { filter: 'audioonly' }));
                                dispatcher.on("end", end => {
                                    let VC = client.channels.cache.get(vcid);
                                    VC.leave();
                                    console.log('Playing is finished!');
                                });    
                            })       
                        
                    }
                        aditya_bro_lalDIL();}
                }
                /* else if(msg.startsWith("playx") && msg.includes("/at")){

                    const timestamp = msg;
                    timestamp = timestamp.replace("playx", "") 
                    timestamp = timestamp.replace("/at", "")
                    timestamp = timestamp.trim();
                    console.log(timestamp)

                    msg = msg.replace("playx", "")
                    const new_msg = msg.split("/at")[1]
                    msg = msg.replace("/at", "")
                    msg = msg.replace(new_msg, "")
                    msg = msg.trim();
                    console.log('did pslit worked ?'+new_msg)
                    const ytsr = require('ytsr');
                    async function aditya_bro_lalDIL(){
                    
                    const searchResults = await ytsr(msg);
                    const video = searchResults.items.filter(i => i.type === "video")[0]
                    const link = video.url + `?t=${timestamp}`
                    console.log(link)
                    console.log(`link of `+`${msg}: ` + link)
                    
                        client.user.setActivity(msg,{type:"LISTENING"});
                        let VC = client.channels.cache.get(vcid); 
                            VC.join().then(connection =>{
                            const dispatcher = connection.play(ytdl(video.url, { filter: 'audioonly' }));
                            dispatcher.on("end", end => {
                                let VC = client.channels.cache.get(vcid);
                                VC.leave();
                                console.log('Playing is finished!');
                            });    
                        })       
                    
                }
                    aditya_bro_lalDIL();













                }*/
                }
                
            })}})})

//ahh shit, here we go again...            
client.login(token)
            