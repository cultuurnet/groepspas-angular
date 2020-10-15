// This script is intended to be called from the repo root.
// Prerequisites:
// Groovy installed(latest versio is ok)
// Node.js version 6.11.1 installed
// Bundler installed
// Run: bundler
// 

println "Creating a debian package from the binaries."

def currentDir = new File( "." ).getCanonicalPath()
println "Current dir:" + currentDir

// File content
//String text = '''{\n
//"publicPath": "PLACEHOLDER_PUBLICPATH",\n
//"apiUrl": "PLACEHOLDER_APIURL",\n
//"baseUrl" : "PLACEHOLDER_BASEURL",\n
//"title": "PLACEHOLDER_TITLE"\n
//}'''

//Create new dir and file with content, 
File dir = new File('config')
dir.mkdir();
File file = new File(dir + "config.json")
file.createNewFile()
file.text = '''{
"publicPath": "PLACEHOLDER_PUBLICPATH",
"apiUrl": "PLACEHOLDER_APIURL",
"baseUrl" : "PLACEHOLDER_BASEURL",
"title": "PLACEHOLDER_TITLE"
}'''
println file.text

return this
