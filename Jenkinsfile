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
                sh "cd /var/lib/jenkins/jobs/wtf-fe-dev/workspace/"
                sh "npm install --save --legacy-peer-deps"
                sh "CI= npm run build"
            }
        }
        stage('Move Build Folder to Project dir') {
            steps {
                sh "sudo rm -rf /home/sol/project/wtf-fe/build"
                sh "sudo cp -r /var/lib/jenkins/jobs/wtf-fe-dev/workspace/build /home/sol/project/wtf-fe/"
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