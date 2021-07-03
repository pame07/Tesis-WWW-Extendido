/* //Por fin salió !!!!
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' */

import { spawnSync } from "node:child_process";

/* function predictUser(user: String):Promise<String>{
    return new Promise((resolve, reject) => {
        const path = require('path')
        const scriptFilename = path.join(__dirname, 'predictUser', 'bot_detection_module.py')
        const { exec } = require('child_process');
        exec(scriptFilename + " " + user, (err: any, stdout: any, stderr: any) => {
            if (err) {
                // node couldn't execute the command
                reject(stderr);
            }
            // the *entire* stdout Sand stderr (buffered)
                resolve(String(stdout.trim()));
        })
    })
}
 */

/* async function semanticScore(tweet_text: String):Promise<number>{
    return new Promise((resolve, reject) => {
        const path = require('path')
        const scriptFilename = path.join(__dirname, 'semantic', 'analisis_seman.py')
        const { exec } = require('child_process');
        exec(scriptFilename + " " +tweet_text, (err: any, stdout: any, stderr: any) => {
            if (err) {
                // node couldn't execute the command
                return reject(stderr);
            }
            // the *entire* stdout and stderr (buffered)
                return resolve(stdout);
        })

    })
} */

/* async function semantic(tweet_text: String):Promise<number>{
    return new Promise((resolve, reject) => {
        const { execSync } = require('child_process');
        const path = require('path')
        const scriptFilename = path.join(__dirname, 'semantic', 'analisis_seman.py')
        const child = execSync('python'+ ' ' + scriptFilename + ' ' +tweet_text, {stdio:'inherit'},(err: any, stdout: any, stderr: any) => {
            if (err) {
                // node couldn't execute the command
                return reject(stderr);
            }
            // the *entire* stdout and stderr (buffered)
                return resolve(stdout);
        })

    })
} */

async function semantic(tweet_text: String):Promise<number>{
    return new Promise((resolve, reject) => {
        const spawn = require('child_process')
        const path = require('path')
        const scriptFilename = path.join(__dirname, 'semantic', 'analisis_seman.py')
        const test = spawn.spawnSync('python', [scriptFilename, tweet_text], { encoding : 'utf8', stdio: "inherit", silent:true });
        try {
            test.on("close", (data:any) => {
                return resolve(data);
            });
            test.on("error", (err:any) => {
                return reject(err);
            });
        } catch(error){
            
        }
    })
}



semantic("Con sonrisas y abrazos, los exministros de Piñera, Briones y Sichel –actuales precandidatos por la derecha– festejaban la aprobación del primer IFE propuesto por el gobierno, el que entregó $65.000 por persona, al inicio de la pandemia en 2020. MISERABLES #DebateCHVCNN").then(result=>console.log(result))
semantic("Ni Boric ni Jadue saludaron en mapudungún. Pésimos candidatos").then(result=>console.log(result))
//semantic("La izquierda tiene dos grandes candidatos presidenciales. Ambos hacen aporte valioso a la reconstrucción de un movimiento popular vigoroso y decidido. Jadue y Boric excelentes.").then(result=>console.log(result))
//semantic("Y Sichel dijo q celebraba porque se iba a entregar ayuda, no del monto... Cree q tenemos mala memoria...").then(result=>console.log(result))


//////////////////////////////////////////////////////////////////////////////






