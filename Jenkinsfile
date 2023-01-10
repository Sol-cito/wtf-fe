pipeline {
    agent any

    stages {

        stage('Check parameterized Profile') {
            steps {
                script {
                    echo "Current profile is ${PROFILE}"
                }
            }
        }
        stage('Health Check') {
            steps {
                echo "Hello WTF!!!!!"
            }
        }
        stage('Build') {
            steps {
                sh "cd /var/lib/jenkins/jobs/wtf-fe-${PROFILE}/workspace/"
                sh "npm install --save --legacy-peer-deps"
                sh "CI= npm run build"
            }
        }
        stage('Move Build Folder to Project dir') {
            steps {
                sh "sudo rm -rf /home/sol/project/wtf-fe-${PROFILE}/build"
                sh "sudo cp -r /var/lib/jenkins/jobs/wtf-fe-${PROFILE}/workspace/build /home/sol/project/wtf-fe-${PROFILE}/"
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