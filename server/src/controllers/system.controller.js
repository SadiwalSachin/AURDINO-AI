import os from "os"
import path from "path"

const systemInfo = async (req,res) => {
    try {
        res.json({
            cwd: process.cwd(),
            platform: os.platform(),
            arch: os.arch(),
            home: os.homedir(),
            hostname: os.hostname(),
            uptime: os.uptime(),
            cpus: os.cpus().length,
            username: os.userInfo().username,
          });  
    } catch (error) {
        
    }
}

export {systemInfo}