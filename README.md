# 🔐 Password Cracking Visualizer

A sophisticated, educational project to demonstrate password hashing, cracking techniques, and password security. This application showcases the dangers of weak passwords and highlights methods to enhance password security through interactive hashing and cracking features.

![App Preview](https://github.com/Rahulmarkasserithodi/CryptCat/blob/main/public/imgs/Hero.png)

## 🚀 Project Overview

This project visualizes the process of password cracking and hashing, educating users about cybersecurity concepts, including dictionary attacks and salting. Built with **Next.js**, **AWS Lambda**, **DynamoDB**, and **Vercel**, this app provides an interactive and visually engaging experience.

## 🌟 Key Features

- **Hash Generator:** Generate hashes for any input using MD5, SHA-1, or SHA-256 algorithms.
- **Password Cracker:** Emulates a dictionary attack to test the strength of passwords by attempting to crack hashed inputs.
- **Salting Suggestions:** Automatically generates secure, salted variations of cracked passwords to improve security.
- **Animated UI:** Uses Framer Motion for engaging visual effects, including a text generation effect for educational insights.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js, Tailwind CSS, Framer Motion
- **Backend:** AWS Lambda, AWS API Gateway
- **Database:** AWS DynamoDB
- **Hosting:** Vercel, with serverless deployments on AWS Lambda
- **Other Tools:** Crypto-js (for MD5 hashing), AWS CloudWatch (for monitoring and logging)

---

## 📖 Features in Detail

### Hash Generator

Input a password and select a hashing algorithm (MD5, SHA-1, or SHA-256) to generate a hash. Use this feature to understand how different algorithms produce unique hashes.

### Password Cracker

Simulates a dictionary attack to crack passwords. The feature:

- Attempts to match your input hash against a predefined dictionary.
- Displays loading animations with educational insights on dictionary attacks.
- Returns the cracked password if found, or confirms it as "strong" after a set time.

### Salting Suggestions

For cracked passwords, the app suggests three "salted" versions to demonstrate improved password security using random salt values.

---

## 🌐 AWS Architecture

- **API Gateway:** Routes requests to the appropriate AWS Lambda function.
- **Lambda Functions:** Handles password cracking initiation, processing, and job status retrieval.
- **DynamoDB:** Stores job statuses and responses for asynchronous password cracking requests.
- **S3 Bucket:** Hosts the wordlist for dictionary attacks, accessed securely by Lambda.
- **CloudWatch:** Monitors Lambda function activity and logs any errors.

![AWS Architecture Diagram]([https://link-to-architecture-diagram.com/diagram.png](https://github.com/Rahulmarkasserithodi/CryptCat/blob/main/public/imgs/AWS.png)) 

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js**: Make sure you have [Node.js](https://nodejs.org/) installed.
- **AWS Account**: You'll need an AWS account to set up Lambda, API Gateway, and DynamoDB.

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/password-cracking-visualizer.git
   cd password-cracking-visualizer
   ```
