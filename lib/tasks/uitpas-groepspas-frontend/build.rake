require 'json'

namespace 'uitpas-groepspas-frontend' do
  desc "Build binaries"
  task :build do |task|

    calver_version     = ENV['PIPELINE_VERSION'].nil? ? Time.now.strftime("%Y.%m.%d.%H%M%S") : ENV['PIPELINE_VERSION']

    system('npm install') or exit 1

    config_file = {
      "publicPath" => "PLACEHOLDER_PUBLICPATH",
      "apiUrl"     => "PLACEHOLDER_APIURL",
      "baseUrl"    => "PLACEHOLDER_BASEURL",
      "title"      => "PLACEHOLDER_TITLE"
    }

    File.write('config/config.json', config_file.to_json)

    system('npm run build') or exit 1
  end
end
