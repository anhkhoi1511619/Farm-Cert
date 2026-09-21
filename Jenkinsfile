pipeline {
    agent any

    options {
        timestamps()
        skipDefaultCheckout(true)
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Configure Android SDK') {
            steps {
                script {
                    def sdkPath = sh(
                        script: '''
                            for candidate in "$ANDROID_SDK_ROOT" "$ANDROID_HOME" "$HOME/Library/Android/sdk" "$HOME/Android/Sdk"; do
                                if [ -n "$candidate" ] && [ -d "$candidate" ]; then
                                    printf '%s' "$candidate"
                                    exit 0
                                fi
                            done
                            exit 1
                        ''',
                        returnStdout: true
                    ).trim()

                    if (!sdkPath) {
                        error('Android SDK not found. Configure ANDROID_SDK_ROOT on the Jenkins agent.')
                    }

                    env.ANDROID_HOME = sdkPath
                    env.ANDROID_SDK_ROOT = sdkPath
                    env.PATH = "${sdkPath}/platform-tools:${sdkPath}/cmdline-tools/latest/bin:${env.PATH}"

                    sh "printf 'sdk.dir=%s\\n' '${sdkPath.replace('\\\\', '\\\\\\\\')}' > local.properties"
                    sh "test -d '${sdkPath}/platforms/android-36' || (echo 'Android SDK Platform 36 is missing.' && exit 1)"
                }
            }
        }

        stage('JUnit Test') {
            steps {
                sh 'chmod +x gradlew'
                sh './gradlew testDebugUnitTest --no-daemon'
            }
            post {
                always {
                    junit testResults: 'app/build/test-results/testDebugUnitTest/*.xml', allowEmptyResults: true
                }
            }
        }

        stage('Android Build') {
            steps {
                sh './gradlew assembleDebug --no-daemon'
            }
            post {
                success {
                    archiveArtifacts artifacts: 'app/build/outputs/apk/debug/app-debug.apk', fingerprint: true
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'app/build/reports/**', allowEmptyArchive: true
        }
    }
}
