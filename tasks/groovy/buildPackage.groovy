// This script is intended to be called from the repo root.
// Prerequisites:
// Groovy installed(latest versio is ok)
// Node.js version 6.11.1 installed
// Bundler installed
// Run: bundler
// 
def runCommand = { command -> 
  println command
  def proc = command.execute()
  proc.in.eachLine { line -> println line }
  proc.out.close()
  proc.waitFor()

  if (proc.exitValue()) {
     println "[ERROR] ${proc.getErrorStream()}"
  }
}


println "Creating a debian package from the binaries."

def currentDir = new File( "." ).getCanonicalPath()
println "Current dir:" + currentDir

runCommand "node --version"
println "npm --version".execute().text  // For logging purposes.
            
//"npm install".execute()    // Installs the dependencies.

//Create new file with content, 
def configFile = new File("./config/config.json")
configFile.createNewFile()
configFile.text = '''{
"publicPath": "PLACEHOLDER_PUBLICPATH",
"apiUrl": "PLACEHOLDER_APIURL",
"baseUrl" : "PLACEHOLDER_BASEURL",
"title": "PLACEHOLDER_TITLE"
}'''
println configFile.text

//"npm run build").execute()    // Builds the product.

//Create new file with content, 
def prermFile = new File("prerm")
prermFile.createNewFile()
prermFile.text = '''#!/bin/sh
rm -rf /var/www/groepspas/scripts/scripts.*.js         
'''

//'bundle install --deployment --no-color'.execute()  //Download/install ruby gems needed in job. For example 'fpm'

def dir = new File("pkg")
dir.mkdirs() //Make new directory


return this
