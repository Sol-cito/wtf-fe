pipeline {
    agent any
    tools {
        nodejs "node16"
        git "git"
    }
    stages {
        stage('Health Check') {
            steps {
                echo "Hello WTF!!!"
            }
        }
        stage('Prepare') {
            steps {
                echo "clone project"
                sh "cd /var/lib/jenkins/jobs/wtf-fe/workspace/"
                sh "rm -rf *"
                sh "rm -rf .git"
                git branch: "${BRANCH}", credentialsId: "ef29195d-a28d-45b3-8cb1-eefaf3a99bb2", url: 'https://github.com/Sol-cito/wtf-fe.git'
            }
        }

        // stage('Build') {
        //     steps {
        //         sh "npm install"
        //         sh "npm run build"
        //     }
        // }

        // stage('Deploy') {
        //     steps {
        //         sh "npm install"
        //         sh "npm run build"
        //     }
        // }
    }
}