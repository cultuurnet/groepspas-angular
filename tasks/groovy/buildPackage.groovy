// This script is intended to be called from the repo root.
// Prerequisites:
// Groovy installed(latest versio is ok)
// Node.js version 6.11.1 installed
// Bundler installed
// Run: bundler
import java.text.SimpleDateFormat

def tempDate = new Date()
println "Testing date " + tempDate.format("yyyyMMddHHmmss")

String fileName = ''
if(this.args[0]){
   fileName = this.args[0]
}
else{
   println "No file name provided, using yyyyMMddHHmmss"
   def now = new Date()
   fileName = now.format("yyyyMMddHHmmss") 
}

//This function runs a bash command, waits for it to finish, and outputs the results.
def runCommand = { command ->
  //print command
  if(command instanceof List) {
     command.each { print "${it} " }
     println " "
  } else {
     println command
  }
    
  def sout = new StringBuilder(), serr = new StringBuilder()
  def proc = command.execute()
  proc.consumeProcessOutput(sout, serr)  
  //proc.in.eachLine { line -> println line }
  proc.out.close()
  proc.waitFor()
  println "$sout"

  if (proc.exitValue()) {
     println "[ERROR] ${proc.getErrorStream()}"
      println "${serr}"
     System.exit(proc.exitValue())
  }
}

println "Creating a debian package from the binaries."

def currentDir = new File( "." ).getCanonicalPath()
println "Current dir:" + currentDir

runCommand "node --version" // For logging purposes.
runCommand "npm --version" // For logging purposes.
           
runCommand "npm install"  // Install the dependencies.

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

runCommand "npm run build"   // Builds the product.

//Create new file with content, 
def prermFile = new File("prerm")
prermFile.createNewFile()
prermFile.text = '''#!/bin/sh
rm -rf /var/www/groepspas/scripts/scripts.*.js         
'''

//Make new directory
def dir = new File("pkg").mkdirs() 

//String command = '''bundle exec fpm -t deb -n groepspas-angular-app -v ''' + fileName + 
//                 ''' -s dir -a all -p pkg --deb-user www-data --deb-group www-data''' + 
//                 ''' --license "Apache-2.0" -m "Infra publiq <infra@publiq.be>"''' +
//                 ''' --url "https://www.publiq.be" --vendor "publiq vzw"''' +
//                 ''' --description "AngularJS frontend for Groepspas"''' + 
//                 ''' --prefix /var/www/groepspas --before-remove prerm -C dist''' + 
//                 ''' -d rubygem-angular-config .'''

// THe following characters need to be escaped #{\'}${"}/'
List command = ['bundle', 'exec', 'fpm', '-t', 'deb', '-n', 'groepspas-angular-app', '-v', "${fileName}", '-s', 'dir', '-a', 'all', 
                '-p', 'pkg', '--deb-user', 'www-data', '--deb-group', 'www-data', '--license', '\"Apache-2.0\"',
                '-m', 'Infra publiq <infra@publiq.be>', '--url', '''"https://www.publiq.be"''', '--vendor', 'publiq vzw',
                '--description', '\"AngularJS frontend for Groepspas\"', '--prefix', '''/var/www/groepspas''' '--before-remove', 'prerm', 
                '-C', 'dist', '-d', 'rubygem-angular-config', '.']

runCommand command

return this
