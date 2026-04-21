# file operations

# Jenkins

# apache tomcat

# HTTPD service

# Creating User

yum install httpd -y

file system in linux


1. linux command on ec2 instance
 yum install tree
 cp file1 file2: means copy file1 to file2
 mv file1 file2 : means move file1 to file2, if file2 already exists, it will be overwritten
 rm file1 : means remove file1

 which httpd : means find the location of httpd command
 install jenkins :
    sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
    what is jenkins: jenkins is a open source automation server which enables developers around the world to reliably build, test, and deploy their software. It is a self-contained java-based program that can be run on various platforms, including Windows, macOS, and Linux. Jenkins provides a wide range of plugins that allow users to integrate with various tools and technologies, making it a popular choice for continuous integration and continuous delivery (CI/CD) pipelines. With Jenkins, developers can automate the process of building, testing, and deploying their applications, which helps to improve efficiency and reduce errors in the software development lifecycle.


  sudo yum install httpd
  service httpd start
  run apache tomcat server:
    1. download apache tomcat server from the official website: command: wget https://archive.apache.org/dist/tomcat/tomcat-9/v9.0.68/bin/apache-tomcat-9.0.68.tar.gz
    2. extract the downloaded file using the command: tar -xvf apache-tomcat-9.0.68.tar.gz
    3. navigate to the bin directory of the extracted folder using the command: cd apache-tomcat-9.0.68/bin
    4. run the startup.sh script to start the server using the command: ./startup.sh


   -gpassward -m user1,user2,user3 : means create a group named gpassward and add users user1, user2, and user3 to the group. The -g option specifies the group name, the -m option creates a home directory for each user, and the list of users is provided after the options. This command is typically used in Linux or Unix-based systems to manage user accounts and groups.



    yum install hpptd -y: means install the httpd package using the yum package manager with the -y option, which automatically answers "yes" to any prompts during the installation process. This command is typically used in Linux-based systems to install the Apache HTTP Server, which is a widely used web server software.

    yum install git -y: means install the git package using the yum package manager with the -y option, which automatically answers "yes" to any prompts during the installation process. This command is typically used in Linux-based systems to install Git, which is a distributed version control system commonly used for source code management in software development.



    edit inbound rule-> http and 0.0.0.0

    EC2 Web Server Setup & Deployment

1. ssh -i training-key ec2-user@<public-ip>
   → Access AWS server

2. sudo su -
   → Get admin privileges

3. yum install httpd -y
   → Install Apache web server

4. cd /var/www/html
   → Go to web root directory

5. which git
   → Check if Git is installed

6. yum install git -y
   → Install Git

7. which git
   → Verify Git installation

8. git clone https://github.com/ARAVINDTrainings/FoodApp.git
   → Clone project from GitHub

9. cd FoodApp
   → Open project folder

10. ls
    → Check project files (index.html, assets)

Memory: Connect → Root → Apache → Web Folder → Git → Clone → Open → Check


systemctl start httpd
systemctl enable httpd
http://<public-ip> : Access the web server using the public IP address of the EC2 instance. You should see the contents of the index.html file from the FoodApp project displayed in your web browser.

***move that 4 files into html direclty and then it works fine. because the index.html file is in the FoodApp folder, so we need to move it to the html directory to make it work.
**go in FoodApp and use this command : mv * ../ to copy all files from the FoodApp folder to the html directory. .


file system in Linux

# EBS:
EBS stands for Elastic Block Store, which is a block-level storage service provided by Amazon Web Services (AWS). EBS allows you to create and attach persistent storage volumes to your EC2 instances. These volumes can be used as primary storage for data that requires frequent updates, such as databases or file systems. EBS volumes are highly available and can be easily scaled up or down based on your needs. They also provide features like snapshots for backup and recovery, encryption for data security, and the ability to detach and reattach volumes to different instances as needed.

# Adding EBS volume to EC2 instance: 

    how to add ebs volume to ecs in anpother availability zone:

# Load Balancer:

DNS records: DNS stands for Domain Name System, which is a hierarchical system that translates human-readable domain names (like www.example.com) into IP addresses (like 192.0.2.1).   

# ALS: ALS stands for Application Load Balancer, which is a type of load balancer provided by Amazon Web Services (AWS). 

# NLB: NLB stands for Network Load Balancer, which is another type of load balancer provided by AWS.

# CLASSICAL LOAD BALANCER

# Snowball: Snowball is a data transfer service provided by Amazon Web Services (AWS) that allows you to securely transfer large amounts of data into and out of the AWS cloud. 

# SNS : SNS stands for Simple Notification Service, which is a fully managed messaging service provided by Amazon Web Services (AWS). SNS allows you to send messages or notifications to a large number of subscribers or endpoints, such as email addresses, mobile devices, or other AWS services.

