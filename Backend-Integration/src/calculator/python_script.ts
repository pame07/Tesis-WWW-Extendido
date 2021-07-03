/* eslint-disable quotes */
/* eslint-disable no-empty */
//Por fin salió !!!!

/* function predictUser(user: String):Promise<String>{
  return new Promise((resolve, reject) => {
    const path = require('path')
    const scriptFilename = path.join(__dirname, 'predictUser', 'bot_detection_module.py')
    const { exec } = require('child_process')
    exec(scriptFilename + ' ' + user, (err: any, stdout: any, stderr: any) => {
      if (err) {
        // node couldn't execute the command
        reject(stderr)
      }
      // the *entire* stdout Sand stderr (buffered)
      resolve(String(stdout.trim()))
    })
  })
} */

const path = require('path')
const scriptFilename = path.join(__dirname, 'semantic', 'analisis_seman.py')
import { spawn } from 'child_process'

async function semanticScore(tweet_text: String):Promise<number>{
  return new Promise((resolve, reject) => {
    const test = spawn('python', [scriptFilename, tweet_text])
    try {
      test.on("close", (data:any) => {
        return resolve(data)
      })
      test.on("error", (err:any) => {
        return reject(err)
      })
    } catch(error){
          
    }
  })
}
//////////////////////////////////////////////////////////////////////////////



export {
  semanticScore
}

