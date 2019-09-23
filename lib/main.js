"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const shelljs = __importStar(require("shelljs"));
const path = __importStar(require("path"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            installGpg();
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
function installGpg() {
    core.startGroup("Download gpg");
    shelljs.exec("wget https://gnupg.org/ftp/gcrypt/gnupg/gnupg-1.4.23.tar.bz2");
    shelljs.exec("bzip2 -d gnupg-1.4.23.tar.bz2");
    shelljs.exec("tar xvf gnupg-1.4.23.tar");
    shelljs.cd("gnupg-1.4.23");
    core.endGroup();
    core.startGroup("./configure");
    shelljs.exec("./configure");
    core.endGroup();
    core.startGroup("make");
    shelljs.exec("make");
    const g10 = path.join(shelljs.pwd().stdout.trim(), "g10");
    core.addPath(g10);
    core.endGroup();
    shelljs.exec(`./${path.join(g10, "gpg")} --version`);
}
exports.installGpg = installGpg;
run();
