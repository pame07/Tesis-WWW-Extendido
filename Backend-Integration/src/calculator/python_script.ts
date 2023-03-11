/* eslint-disable quotes */
/* eslint-disable no-empty */
//Por fin salió !!!!

/* const route = require('path')
const { process } = require('child_process')
const scriptName = route.join(__dirname, 'predictUser', 'bot_detection_module.py')
async function predictUser(user: String):Promise<String>{
  return new Promise((resolve, reject) => {
    const test = process('python', [scriptName, user])
    try {
      test.stdout.on("data", (data:any) => {
        return resolve(String(data).trim())
      })
      test.stderr.on("error", (err:any) => {
        return reject(err)
      })
    } catch(error){
          
    }
  })
} */

const road = require('path')
const proc = require('child_process')
const namefile = road.join(__dirname, 'predictUser', 'bot_detection_module.py')
 function predictUser(user: String) : string{
  var test = proc.spawnSync('python', [namefile, user])
  return test.stdout.toString().trim()
}


const utf8 = require('utf8')
const path = require('path')
const { spawn } = require('child_process')
const scriptFilename = path.join(__dirname, 'semantic', 'analisis_seman.py')
function semanticScore(tweet_text: String, tweet_lang:String):Promise<number>{
  return new Promise((resolve, reject) => {
    const test = spawn('python', [scriptFilename, utf8.encode(tweet_text), tweet_lang])
    try {
      test.stdout.on("data", (data:any) => {
        return resolve(parseFloat(data.toString('utf-8'))*100)
      })
      test.stdeerr.on("error", (err:any) => {
        return reject(err)
      })
    } catch(error){
          
    }
  })
}

//////////////////////////////////////////////////////////////////////////////


export {
  semanticScore,
  predictUser
}

