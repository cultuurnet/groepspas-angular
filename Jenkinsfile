pipeline {
    options {
        disableRestartFromStage()
    }

    agent none

    environment {
        PIPELINE_VERSION = util.pipelineVersion()
        REPOSITORY_NAME  = 'uitpas-groepspas'
    }

    stages {
        stage('Pre build') {
            steps {
                setBuildDisplayName to: env.PIPELINE_VERSION
                sendBuildNotification()
            }
        }

        stage('Setup and build') {
            stages {
                stage('Build project') {
                    agent {
                        docker {
                            image 'base_images/node/16'
                            label 'docker'
                        }
                    }
                    environment {
                        npm_config_cache = '/tmp/.npm-cache'
                    }
                    steps {
                        writeFile file: 'config/config.json', text: '{"publicPath":"PLACEHOLDER_PUBLICPATH","apiUrl":"PLACEHOLDER_APIURL","baseUrl":"PLACEHOLDER_BASEURL","title":"PLACEHOLDER_TITLE"}'
                        sh label: 'Install node modules', script: 'npm ci'
                        sh label: 'Build project', script: 'npm run build'
                        sh label: 'Archive build', script: 'tar czf dist.tgz dist'
                        stash name: 'dist', includes: 'dist.tgz'
                    }
                    post {
                        cleanup {
                            cleanWs()
                        }
                    }
                }

                stage('Build artifact') {
                    agent { label 'ubuntu && 20.04' }
                    environment {
                        GIT_SHORT_COMMIT = util.shortCommitRef()
                        ARTIFACT_VERSION = "${env.PIPELINE_VERSION}" + '+sha.' + "${env.GIT_SHORT_COMMIT}"
                    }
                    steps {
                        sh label: 'Install rubygems', script: 'bundle install --deployment'
                        unstash 'dist'
                        sh label: 'Extract build', script: 'tar xzf dist.tgz && rm dist.tgz'
                        sh label: 'Build artifact', script: "bundle exec rake build_artifact ARTIFACT_VERSION=${env.ARTIFACT_VERSION}"
                        archiveArtifacts artifacts: "pkg/*${env.ARTIFACT_VERSION}*.deb", onlyIfSuccessful: true
                    }
                    post {
                        cleanup {
                            cleanWs()
                        }
                    }
                }
            }
        }

        stage('Upload artifact') {
            agent any
            options { skipDefaultCheckout() }
            steps {
                copyArtifacts filter: 'pkg/*.deb', projectName: env.JOB_NAME, flatten: true, selector: specific(env.BUILD_NUMBER)
                uploadAptlyArtifacts artifacts: '*.deb', repository: env.REPOSITORY_NAME
                createAptlySnapshot name: "${env.REPOSITORY_NAME}-${env.PIPELINE_VERSION}", repository: env.REPOSITORY_NAME
            }
            post {
                cleanup {
                    cleanWs()
                }
            }
        }

        stage('Deploy to development') {
            agent any
            options { skipDefaultCheckout() }
            environment {
                APPLICATION_ENVIRONMENT = 'development'
            }
            steps {
                publishAptlySnapshot snapshotName: "${env.REPOSITORY_NAME}-${env.PIPELINE_VERSION}", publishTarget: "${env.REPOSITORY_NAME}-${env.APPLICATION_ENVIRONMENT}", distributions: 'focal'
            }
        }

        stage('Deploy to acceptance') {
            agent { label 'ubuntu && 20.04' }
            options { skipDefaultCheckout() }
            environment {
                APPLICATION_ENVIRONMENT = 'acceptance'
            }
            steps {
                publishAptlySnapshot snapshotName: "${env.REPOSITORY_NAME}-${env.PIPELINE_VERSION}", publishTarget: "${env.REPOSITORY_NAME}-${env.APPLICATION_ENVIRONMENT}", distributions: 'focal'
                triggerDeployment nodeName: 'uitpas-balie-acc01'
            }
            post {
                always {
                    sendBuildNotification to: '#ups-ops', message: "Pipeline <${env.RUN_DISPLAY_URL}|${util.getJobDisplayName()} [${currentBuild.displayName}]>: deployed to *${env.APPLICATION_ENVIRONMENT}*"
                }
            }
        }

        stage('Deploy to testing') {
            input { message "Deploy to Testing?" }
            agent { label 'ubuntu && 20.04' }
            options { skipDefaultCheckout() }
            environment {
                APPLICATION_ENVIRONMENT = 'testing'
            }
            steps {
                publishAptlySnapshot snapshotName: "${env.REPOSITORY_NAME}-${env.PIPELINE_VERSION}", publishTarget: "${env.REPOSITORY_NAME}-${env.APPLICATION_ENVIRONMENT}", distributions: 'focal'
                triggerDeployment nodeName: 'uitpas-balie-test01'
            }
            post {
                always {
                    sendBuildNotification to: '#ups-ops', message: "Pipeline <${env.RUN_DISPLAY_URL}|${util.getJobDisplayName()} [${currentBuild.displayName}]>: deployed to *${env.APPLICATION_ENVIRONMENT}*"
                }
            }
        }

        stage('Deploy to production') {
            input { message "Deploy to Production?" }
            agent { label 'ubuntu && 20.04' }
            options { skipDefaultCheckout() }
            environment {
                APPLICATION_ENVIRONMENT = 'production'
            }
            steps {
                publishAptlySnapshot snapshotName: "${env.REPOSITORY_NAME}-${env.PIPELINE_VERSION}", publishTarget: "${env.REPOSITORY_NAME}-${env.APPLICATION_ENVIRONMENT}", distributions: 'focal'
                triggerDeployment nodeName: 'uitpas-balie-prod01'
            }
            post {
                always {
                    sendBuildNotification to: '#ups-ops', message: "Pipeline <${env.RUN_DISPLAY_URL}|${util.getJobDisplayName()} [${currentBuild.displayName}]>: deployed to *${env.APPLICATION_ENVIRONMENT}*"
                }
                cleanup {
                    cleanupAptlySnapshots repository: env.REPOSITORY_NAME
                }
            }
        }

        stage('Tag release') {
            options { skipDefaultCheckout() }

            agent any
            steps {
                copyArtifacts filter: 'pkg/*.deb', projectName: env.JOB_NAME, flatten: true, selector: specific(env.BUILD_NUMBER)
                tagRelease commitHash: artifact.metadata(artifactFilter: '*.deb', field: 'git-ref')
            }
            post {
                cleanup {
                    cleanWs()
                }
            }
        }
    }

    post {
        always {
            sendBuildNotification()
        }
    }
}
