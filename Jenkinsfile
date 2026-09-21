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

        stage('JUnit Test') {
            steps {
                sh 'chmod +x gradlew'
                sh './gradlew testDebugUnitTest --no-daemon'
            }
            post {
                always {
                    junit testResults: 'app/build/test-results/testDebugUnitTest/*.xml', allowEmptyResults: false
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
