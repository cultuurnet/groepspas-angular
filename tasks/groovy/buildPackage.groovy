// This script is intended to be called from the repo root.
// Prerequisites:
// Groovy installed(latest versio is ok)
// Node.js version 6.11.1 installed
// Bundler installed
// Run: bundler

//This function runs a bash command, waits for it to finish, and outputs the results.
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

///var/lib/jenkins/tools/jenkins.plugins.nodejs.tools.NodeJSInstallation/NodeJS_6.11.1
//System.setProperty("prp_name", "value")
//env.NODEJS_HOME = "${tool "${nodeJSInstallation}"}"
//env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"

runCommand "node --version" // For logging purposes.
runCommand "npm --version" // For logging purposes.
            
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

//Make new directory
def dir = new File("pkg")
dir.mkdirs() 

String temp = '''bundle exec fpm -t deb -n groepspas-angular-app -v "${pipelineVersion}" \\
-s dir -a all -p pkg --deb-user www-data --deb-group www-data \\
--license "Apache-2.0" -m "Infra publiq <infra@publiq.be>" \\
--url "https://www.publiq.be" --vendor "publiq vzw" \\
--description "AngularJS frontend for Groepspas" \\
--prefix /var/www/groepspas --before-remove prerm -C dist \\
-d rubygem-angular-config .'''

println temp

return this
