import pc from 'picocolors'
import inquirer from 'inquirer'
import ora from 'ora'
import sade from 'sade'
// import semver from 'semver'
import fs from 'fs-extra'
import { resolve } from 'path'
// import { execaCommand } from 'execa'
import pkgInfo from '../package.json'
const { version: pkgVersion } = pkgInfo

// 创建控制台对象实例
const prog = sade('mycli')
const sleep = (time = 1000) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}
// 定义命令
prog
  .version(pkgVersion)
  .command('create <pkg>')
  .option('--template')
  .describe('choosse template')
  .example('cxl-cli create nice-project --template ts-react')
  .action(async (pkg, args) => {
    console.log(
      pc.yellow(`
              **                                             **            
             /**                                            //             
   *****     /**           ******      **    **    ******    **     ****** 
  **///**    /******      **////**    /**   /**   //**//*   /**    **////**
 /**  //     /**///**    /**   /**    //** /**     /** /    /**   /**   /**
 /**   **    /**  /**    /**   /**     //****      /**      /**   /**   /**
 //*****     /**  /**    //******       //**      /***      /**   //****** 
  /////      //   //      //////         //       ///       //     //////  
        `)
    )
    const template = await inquirer.prompt({
      type: 'list',
      name: 'template',
      message: 'choose a template',
      choices: ['react', 'vue', 'angular', 'react-ts', 'vue-ts']
    })
    // await sleep(3000)
    console.log(pc.green(`fetch template ${template.template}`))
    const fetchingSpinning = ora(pc.blue(`fetch template`)).start()
    fetchingSpinning.color = 'cyan'
    fetchingSpinning.stop()
    const copySpinner = ora(pc.blue(`generate project by template...`)).start()
    await sleep(3000)
    const realPath = await fs.realpath(process.cwd())
    const projectPath = realPath + '/' + pkg.toString()
    console.log(resolve(__dirname, `../../template/${template.template}`), 222)
    await fs.copy(
      resolve(__dirname, `../../template/${template.template}`),
      projectPath
    )
    copySpinner.stop()
    const installSpinner = ora(
      pc.blue(`generate project by template...`)
    ).start()
    process.chdir(projectPath)
    // await execa.execaCommand('npm i')
    installSpinner.stop()
    console.log(pc.green(`generate project by template`))
  })
prog.parse(process.argv)
