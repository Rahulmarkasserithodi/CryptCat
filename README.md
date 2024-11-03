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

![AWS Architecture Diagram](https://github.com/Rahulmarkasserithodi/CryptCat/blob/main/public/imgs/AWS.png) 

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
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Set Up Environment Variables**
   Create a .env.local file in the root directory and add the following:
   ```env
   NEXT_PUBLIC_AWS_REGION=your-aws-region
   NEXT_PUBLIC_API_BASE_URL=https://your-api-gateway-url.com
   ```
4. **Run the Application**
   ```bash
   npm run dev
   ```
   The app will be available at http://localhost:3000.

## 📚 Usage Guide
   **Hashing a Password**: Navigate to the "Hash Your Password" page, enter a password, choose a hashing algorithm, and click "Hash Password" to see the result.
   **Cracking a Password**: Go to the "Crack Your Password" page, enter a hash, choose the algorithm, and click "Crack Password" to simulate the cracking process.
   **Salting Suggestions**: Once a password is cracked, observe the salted suggestions for a more secure password.

## 🎨 Screenshots
   [Hash Generator](https://github.com/Rahulmarkasserithodi/CryptCat/blob/main/public/imgs/Hash.png)
   
   
   [Password Cracker](https://github.com/Rahulmarkasserithodi/CryptCat/blob/main/public/imgs/Crack.png)


## 🧩 Contributing
   Contributions are welcome! Please fork this repository, make your changes, and submit a pull request.

## 🔍 License
   This project is licensed under the MIT License. See the LICENSE file for more information.

## 📬 Contact
   For any inquiries or feedback, feel free to reach out at rahul4nair35@gmail.com


