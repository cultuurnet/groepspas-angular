namespace 'uitpas-groepspas-frontend' do
  desc "Create a debian package from the binaries."
  task :build_artifact do |task|

    calver_version = ENV['PIPELINE_VERSION'].nil? ? Time.now.strftime("%Y.%m.%d.%H%M%S") : ENV['PIPELINE_VERSION']
    git_short_ref  = `git rev-parse --short HEAD`.strip
    version        = ENV['ARTIFACT_VERSION'].nil? ? "#{calver_version}+sha.#{git_short_ref}" : ENV['ARTIFACT_VERSION']
    artifact_name  = 'uitpas-groepspas-frontend'
    vendor         = 'publiq VZW'
    maintainer     = 'Infra publiq <infra@publiq.be>'
    license        = 'Apache-2.0'
    description    = 'AngularJS frontend for UiTPAS Groepspas'
    source         = 'https://github.com/cultuurnet/groepspas-angular'
    build_url      = ENV['JOB_DISPLAY_URL'].nil? ? "" : ENV['JOB_DISPLAY_URL']

    FileUtils.mkdir_p('pkg')

    system("fpm -s dir -t deb -n #{artifact_name} -v #{version} -a all -p pkg \
      -C dist -d rubygem-angular-config \
      -x '.git*' -x pkg -x vendor -x lib -x Rakefile -x Gemfile -x Gemfile.lock \
      -x .bundle -x 'Jenkinsfile*' \
      --prefix /var/www/uitpas-groepspas-frontend \
      --before-remove lib/tasks/uitpas-groepspas-frontend/prerm \
      --deb-user www-data --deb-group www-data \
      --description '#{description}' --url '#{source}' --vendor '#{vendor}' \
      --license '#{license}' -m '#{maintainer}' \
      --deb-field 'Pipeline-Version: #{calver_version}' \
      --deb-field 'Git-Ref: #{git_short_ref}' \
      --deb-field 'Build-Url: #{build_url}' \
      ."
    ) or exit 1
  end
end
