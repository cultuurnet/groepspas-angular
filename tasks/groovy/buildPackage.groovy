//This script is intended to be called from repoName/tasks/groovy/
//def call() {
   println "Creating a debian package from the binaries."
   //echo "Blah Blah"
   "ls -a".execute()
   def currentDir = new File( "." ).getCanonicalPath()
   println "Current dir:" + currentDir
   
   def upTwo = new File( "../../" ).getCanonicalPath()
   println "UpTwo dir:" + upTwo
   
   //command.execute(null, new File("Working dir"))
//}
return this
