require 'json'

desc "Build binaries"
task :build do |task|
  config_file = {
    "publicPath" => "PLACEHOLDER_PUBLICPATH",
    "apiUrl"     => "PLACEHOLDER_APIURL",
    "baseUrl"    => "PLACEHOLDER_BASEURL",
    "title"      => "PLACEHOLDER_TITLE"
  }

  File.write('config/config.json', config_file.to_json)

  system('npm install') or exit 1
  system('npm run build') or exit 1
end
