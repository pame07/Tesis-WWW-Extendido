"use strict";
/* //Por fin salió !!!!
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
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
function semantic(tweet_text) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var spawn = require('child_process');
                    var path = require('path');
                    var scriptFilename = path.join(__dirname, 'semantic', 'analisis_seman.py');
                    var test = spawn.spawnSync('python', [scriptFilename, tweet_text], { encoding: 'utf8', stdio: "inherit", silent: true });
                    try {
                        test.on("close", function (data) {
                            return resolve(data);
                        });
                        test.on("error", function (err) {
                            return reject(err);
                        });
                    }
                    catch (error) {
                    }
                })];
        });
    });
}
semantic("Con sonrisas y abrazos, los exministros de Piñera, Briones y Sichel –actuales precandidatos por la derecha– festejaban la aprobación del primer IFE propuesto por el gobierno, el que entregó $65.000 por persona, al inicio de la pandemia en 2020. MISERABLES #DebateCHVCNN").then(function (result) { return console.log(result); });
semantic("Ni Boric ni Jadue saludaron en mapudungún. Pésimos candidatos").then(function (result) { return console.log(result); });
semantic("La izquierda tiene dos grandes candidatos presidenciales. Ambos hacen aporte valioso a la reconstrucción de un movimiento popular vigoroso y decidido. Jadue y Boric excelentes.").then(function (result) { return console.log(result); });
semantic("Y Sichel dijo q celebraba porque se iba a entregar ayuda, no del monto... Cree q tenemos mala memoria...").then(function (result) { return console.log(result); });
//////////////////////////////////////////////////////////////////////////////
