import * as core from "@actions/core";
import * as shelljs from "shelljs";
import * as path from "path";

async function run() {
  try {
    installGpg();
  } catch (error) {
    core.setFailed(error.message);
  }
}

export function installGpg() {
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
  const g10 = path.join(shelljs.pwd(), "g10");
  core.addPath(g10);
  core.endGroup();

  shelljs.exec(`./${path.join(g10, "gpg")} --version`);
}

run();
