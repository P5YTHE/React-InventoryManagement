// Pipeline for CI of Inventory management Frontend (React)
pipeline {
    agent any

    stages {
        // Gets the frontend code from git repo
        stage('Checkout') {
            steps {
                git 'https://github.com/P5YTHE/React-InventoryManagement.git'
            }
        }
        // Installs all dependencies related to project
        stage('Prepare') {
            steps {
                bat 'npm install'
            }
        }
        // Builds the project
        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }
    }
}
