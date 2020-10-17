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
//def runCommand = { command -> 
//  println command
//  def proc = command.execute()
//  proc.in.eachLine { line -> println line }
//  proc.out.close()
//  proc.waitFor()
//
//  if (proc.exitValue()) {
//     println "[ERROR] ${proc.getErrorStream()}"
//  }
//}

// a wrapper closure around executing a string                                  
// can take either a string or a list of strings (for arguments with spaces)    
// prints all output, complains and halts on error                              
def runCommand = { strList ->
  assert ( strList instanceof String ||
           ( strList instanceof List && strList.each{ it instanceof String } ) \
)
  println command
  def proc = strList.execute()
  proc.in.eachLine { line -> println line }
  proc.out.close()
  proc.waitFor()

  print "[INFO] ( "
  if(strList instanceof List) {
    strList.each { print "${it} " }
  } else {
    print strList
  }
  println " )"

  if (proc.exitValue()) {
    println "gave the following error: "
    println "[ERROR] ${proc.getErrorStream()}"
  }
  assert !proc.exitValue()
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

//'bundle install --deployment --no-color'.execute()  //Download/install ruby gems needed in job. For example 'fpm'

//Make new directory
def dir = new File("pkg").mkdirs() 

String temp = '''bundle exec fpm -t deb -n groepspas-angular-app -v ''' + fileName + ''' \\
-s dir -a all -p pkg --deb-user www-data --deb-group www-data \\
--license "Apache-2.0" -m "Infra publiq <infra@publiq.be>" \\
--url "https://www.publiq.be" --vendor "publiq vzw" \\
--description "AngularJS frontend for Groepspas" \\
--prefix /var/www/groepspas --before-remove prerm -C dist \\
-d rubygem-angular-config .'''

println temp

return this
