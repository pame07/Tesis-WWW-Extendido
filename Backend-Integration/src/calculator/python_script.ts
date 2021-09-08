/* eslint-disable quotes */
/* eslint-disable no-empty */
//Por fin salió !!!!

const road = require('path')
const proc = require('child_process')
const namefile = road.join(__dirname, 'predictUser', 'bot_detection_module.py')
function predictUser(user: String) : String{
  var test = proc.spawnSync('python', [namefile, user])

  return test.stdout.toString().trim()
}

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

