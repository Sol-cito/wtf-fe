pipeline {
    agent any

    stages {
        stage('Health Check') {
            steps {
                echo "Hello WTF!!!!!"
            }
        }
        stage('Build') {
            steps {
                echo "Build project"
                sh "cd /var/lib/jenkins/jobs/wtf-fe/workspace/"
                sh "npm install --save --legacy-peer-deps"
                sh "CI= npm run build"
                sh "cd /home/sol/project/wtf-fe/"
                sh "rm -rf build"
                sh "cd /var/lib/jenkins/jobs/wtf-fe/workspace/"
                sh "mv build /home/sol/project/wtf-fe/"
            }
        }
        stage('Restart Nginx') {
            steps {
                echo "Restart Nginx"
                sh "sudo systemctl restart nginx"
            }
        }
    }
}