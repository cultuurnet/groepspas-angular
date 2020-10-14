//This script is intended to be called from the repo root.
//def call() {
   println "Creating a debian package from the binaries."
   //echo "Blah Blah"
   "ls -a".execute()
   def currentDir = new File( "." ).getCanonicalPath()
   println "Current dir:" + currentDir
   
   def upTwo = new File( "../../" ).getCanonicalPath()
   println "UpTwo dir:" + upTwo

String text = '''{\n
"publicPath": "PLACEHOLDER_PUBLICPATH",\n
"apiUrl": "PLACEHOLDER_APIURL",\n
"baseUrl" : "PLACEHOLDER_BASEURL",\n
"title": "PLACEHOLDER_TITLE"\n
}'''

File file = new File("config/config.json")
file.append(text)
println file.text


//}
return this
