# Last-Mile Delivery Confirmation System

##  Table of Contents
1. [Project Overview](#project-overview)
2. [What Problem Does This Solve?](#what-problem-does-this-solve)
3. [System Architecture](#system-architecture)
4. [Technology Stack](#technology-stack)
5. [Prerequisites Installation](#prerequisites-installation)
6. [Project Setup - Step by Step](#project-setup---step-by-step)
7. [Understanding the Code](#understanding-the-code)
8. [Testing the Application](#testing-the-application)
9. [Android App Setup](#android-app-setup)

---

##  Project Overview

**Last-Mile Delivery Confirmation System** is a complete 3-tier application designed for logistics companies to securely confirm package deliveries using OTP (One-Time Password) verification.

### **What is Last-Mile Delivery?**
Last-mile delivery is the final step in the delivery process - when a package is transported from a distribution center to the customer's doorstep. This is the most critical and expensive part of the shipping process.

### **Real-World Use Case**
Imagine a delivery company like Amazon, FedEx, or Flipkart:
- They have thousands of packages to deliver daily
- Delivery agents need to confirm deliveries
- Customers receive OTP via SMS
- Agent enters OTP to confirm delivery
- System prevents fraud and duplicate confirmations

---

##  What Problem Does This Solve?

### **Problems:**
1. ❌ **Delivery Fraud:** Agents marking deliveries as complete without actually delivering
2. ❌ **No Verification:** No way to verify customer received the package
3. ❌ **Manual Errors:** Paper-based tracking leads to mistakes
4. ❌ **No Audit Trail:** Can't track who delivered what and when

### **Our Solution:**
1. ✅ **OTP Verification:** Customer receives OTP, agent must enter correct OTP
2. ✅ **Real-time Updates:** Database updated instantly
3. ✅ **Audit Logging:** Every action is logged with timestamp
4. ✅ **Duplicate Prevention:** Can't confirm same delivery twice
5. ✅ **Mobile App:** Easy-to-use Android app for delivery agents

---

##  System Architecture

### **3-Tier Architecture Explained**

```
┌─────────────────────────────────────────────────────────────┐
│                   PRESENTATION TIER                         │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         Android Mobile App (Kotlin)                  │   │
│  │  - User Interface for delivery agents                │   │
│  │  - Input: Shipment ID, OTP, Agent Name              │   │
│  │  - Sends HTTP POST requests to backend              │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓ ↑ (HTTP/JSON)
┌─────────────────────────────────────────────────────────────┐
│                   APPLICATION TIER                          │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         REST API (Node.js + Express)                 │   │
│  │  - Receives and validates requests                   │   │
│  │  - Business logic (OTP verification)                 │   │
│  │  - Error handling and logging                        │   │
│  │  - Security middleware (Helmet, CORS)               │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓ ↑ (SQL Queries)
┌─────────────────────────────────────────────────────────────┐
│                      DATA TIER                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              MySQL Database                          │   │
│  │  - Stores shipment information                       │   │
│  │  - OTP codes and delivery status                     │   │
│  │  - Delivery timestamps and agent info                │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### **How It Works (Step-by-Step Flow):**

1. **Customer places order** → System generates Shipment ID and OTP
2. **Customer receives OTP** via SMS (simulated in our test data)
3. **Delivery agent arrives** with package
4. **Agent opens Android app** on their phone
5. **Agent enters:**
   - Shipment ID (from package label)
   - OTP (customer tells them verbally)
   - Their name (for audit trail)
6. **App sends request** to backend API server
7. **Backend validates:**
   - Does shipment exist? (404 if not)
   - Already delivered? (409 if yes)
   - Correct OTP? (401 if wrong)
8. **If valid:** Database updates status to "Delivered" with timestamp
9. **App shows success** message to agent
10. **Logs recorded** for audit and monitoring

---

##  Technology Stack

### **Backend:**
- **Node.js** (v18+): JavaScript runtime for server-side code
- **Express.js**: Web framework for building REST APIs
- **MySQL**: Relational database for storing shipment data
- **Winston**: Professional logging library
- **Morgan**: HTTP request logger
- **Helmet**: Security middleware for HTTP headers
- **CORS**: Cross-Origin Resource Sharing middleware
- **dotenv**: Environment variable management

### **Frontend (Mobile):**
- **Android Studio**: IDE for Android development
- **Kotlin**: Modern programming language for Android
- **OkHttp**: HTTP client for API calls
- **Material Design**: Google's design system for UI

### **Development Tools:**
- **VS Code**: Code editor
- **Postman**: API testing tool
- **MySQL Workbench**: Database management (optional)

---

##  Prerequisites Installation

### **1. Install Node.js (JavaScript Runtime)**

**What is Node.js?**
Node.js allows you to run JavaScript code outside the browser, perfect for building server applications.

**Windows Installation:**
1. Go to: https://nodejs.org/
2. Download **LTS version** (e.g., 18.x or 20.x)
3. Run installer, click Next → Next → Install
4. Open Command Prompt and verify:
   ```bash
   node --version
   # Should show: v18.x.x or v20.x.x
   
   npm --version
   # Should show: 9.x.x or 10.x.x
   ```

**What is npm?**
npm (Node Package Manager) is installed automatically with Node.js. It's used to install libraries (packages) that our project needs.

---

### **2. Install MySQL (Database)**

**What is MySQL?**
MySQL is a database that stores our shipment data in organized tables (like Excel sheets but much more powerful).

**Windows Installation:**
1. Download MySQL Installer: https://dev.mysql.com/downloads/installer/
2. Choose **"mysql-installer-community"** (free version)
3. Run installer:
   - Choose **"Developer Default"** setup type
   - Click Next until "Accounts and Roles" page
   - **Set root password** (remember this! You'll need it)
   - Note: Use a simple password like `root123` for development
4. Complete installation
5. Verify:
   ```bash
   mysql --version
   # Should show: mysql Ver 8.0.x
   ```

**Start MySQL Service (Windows):**
1. Press `Win + R`
2. Type `services.msc`
3. Find **MySQL80** service
4. Right-click → Start (if not running)

---

### **3. Install Android Studio**

**What is Android Studio?**
Android Studio is the official IDE (development environment) for building Android apps.

**Installation:**
1. Go to: https://developer.android.com/studio
2. Download Android Studio
3. Run installer (takes 10-15 minutes)
4. On first launch:
   - Choose **Standard** installation
   - Wait for SDK downloads (this is automatic)
5. Create test emulator:
   - Open Android Studio
   - Click **More Actions** → **Virtual Device Manager**
   - Click **Create Device**
   - Choose **Pixel 5** → Next
   - Select system image (API 33 or higher) → Next → Finish

---

### **4. Install Git (Optional but Recommended)**

**What is Git?**
Git is version control - it tracks changes to your code and lets you save different versions.

**Windows Installation:**
1. Download: https://git-scm.com/download/win
2. Run installer with default settings
3. Verify:
   ```bash
   git --version
   # Should show: git version 2.x.x
   ```

---

### **5. Install VS Code (Code Editor)**

**What is VS Code?**
VS Code is a powerful, free code editor by Microsoft.

**Installation:**
1. Go to: https://code.visualstudio.com/
2. Download and install
3. Install useful extensions:
   - **ESLint** (JavaScript linting)
   - **Prettier** (Code formatting)
   - **MySQL** (Database management)
   - **REST Client** (API testing)

---

##  Project Setup - Step by Step

### **STEP 1: Create Project Structure**

Open Command Prompt or VS Code terminal:

```bash
# Navigate to D drive (or any location you prefer)
D:

# Create main project folder
mkdir last-mile-delivery
cd last-mile-delivery

# Create backend folder structure
mkdir backend
cd backend
mkdir controllers routes models logs

# Your structure should look like:
# D:\last-mile-delivery\
#   └── backend\
#       ├── controllers\
#       ├── routes\
#       ├── models\
#       └── logs\
```

---

### **STEP 2: Initialize Node.js Project**

```bash
# Make sure you're in the backend folder
cd D:\last-mile-delivery\backend

# Initialize npm (creates package.json)
npm init -y
```

**What does this do?**
- Creates `package.json` file
- This file lists all dependencies (libraries) your project needs
- Think of it as a recipe card that lists ingredients

---

### **STEP 3: Install Dependencies**

```bash
npm install express mysql2 winston express-async-errors dotenv morgan helmet cors
npm install --save-dev nodemon
```

**What each package does:**

| Package | Purpose | Example |
|---------|---------|---------|
| **express** | Web framework for building APIs | Handles HTTP requests like POST, GET |
| **mysql2** | MySQL database driver | Connects Node.js to MySQL database |
| **winston** | Logging library | Records events to files: "Delivery confirmed" |
| **express-async-errors** | Automatic error handling | Catches errors in async functions |
| **dotenv** | Environment variables | Reads .env file for passwords, config |
| **morgan** | HTTP request logger | Logs every API call: "POST /api/deliveries" |
| **helmet** | Security middleware | Adds security headers to responses |
| **cors** | Cross-Origin Resource Sharing | Allows Android app to call API |
| **nodemon** | Auto-restart server | Restarts server when you save code changes |

**Installation takes 2-3 minutes**. You'll see:
```
added 57 packages, and audited 58 packages in 2m
```

---

### **STEP 4: Create Database Schema**

Create file: `backend/models/shipment.sql`

**Open VS Code:**
```bash
# From backend folder
code .
```

Create new file: `models/shipment.sql` and paste:

```sql
-- This script creates database and table for shipments

-- Create database (like creating a new Excel workbook)
CREATE DATABASE IF NOT EXISTS last_mile;

-- Use this database for all following commands
USE last_mile;

-- Drop existing table if any (for clean slate)
DROP TABLE IF EXISTS shipments;

-- Create shipments table (like creating an Excel sheet with columns)
CREATE TABLE shipments (
    -- Auto-incrementing ID (1, 2, 3, ...)
    id INT AUTO_INCREMENT PRIMARY KEY,
    
    -- Shipment ID (unique, like tracking number)
    shipment_id VARCHAR(50) UNIQUE NOT NULL,
    
    -- Customer name
    customer_name VARCHAR(100),
    
    -- OTP code for verification
    otp_code VARCHAR(10) NOT NULL,
    
    -- Status: can only be Pending, In-Transit, or Delivered
    status ENUM('Pending','In-Transit','Delivered') DEFAULT 'Pending',
    
    -- Timestamp when delivered (NULL until delivered)
    delivered_at TIMESTAMP NULL,
    
    -- Name of agent who delivered
    delivered_by VARCHAR(100),
    
    -- Indexes for faster searches
    INDEX idx_shipment_id (shipment_id),
    INDEX idx_status (status)
);

-- Insert 3 test shipments
INSERT INTO shipments (shipment_id, customer_name, otp_code, status) VALUES
('SHIP001', 'Ramesh Kumar', '123456', 'In-Transit'),
('SHIP002', 'Sita Devi', '987654', 'In-Transit'),
('SHIP003', 'Aman Singh', '111222', 'Pending');
```

**Understanding the table:**
- **id**: Unique number for each row (1, 2, 3...)
- **shipment_id**: Tracking number like "SHIP001"
- **customer_name**: Who ordered the package
- **otp_code**: The PIN customer received (like ATM PIN)
- **status**: Current state of delivery
- **delivered_at**: When it was delivered (empty until delivered)
- **delivered_by**: Agent's name who delivered it

---

### **STEP 5: Execute SQL Script**

**Method 1: Command Line**
```bash
# From backend folder
mysql -u root -p < models\shipment.sql
# Enter your MySQL password when prompted
```

**Method 2: MySQL Workbench**
1. Open MySQL Workbench
2. Connect to local MySQL
3. File → Open SQL Script → select `shipment.sql`
4. Click Execute (lightning bolt icon)

**Verify it worked:**
```bash
mysql -u root -p
# Enter password
```

```sql
USE last_mile;
SHOW TABLES;
-- Should show: shipments

SELECT * FROM shipments;
-- Should show 3 test shipments
```

Expected output:
```
+----+-------------+---------------+----------+------------+--------------+--------------+
| id | shipment_id | customer_name | otp_code | status     | delivered_at | delivered_by |
+----+-------------+---------------+----------+------------+--------------+--------------+
|  1 | SHIP001     | Ramesh Kumar  | 123456   | In-Transit | NULL         | NULL         |
|  2 | SHIP002     | Sita Devi     | 987654   | In-Transit | NULL         | NULL         |
|  3 | SHIP003     | Aman Singh    | 111222   | Pending    | NULL         | NULL         |
+----+-------------+---------------+----------+------------+--------------+--------------+
```

---

### **STEP 6: Create Configuration File**

Create file: `backend/.env`

```env
# Server configuration
PORT=3000

# MySQL database configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=last_mile
DB_PORT=3306

# Logging level
LOG_LEVEL=info
```

** IMPORTANT:** 
- Replace `your_mysql_password_here` with your actual MySQL password
- **Never commit .env file to Git** (contains sensitive passwords)

**What is .env file?**
- Stores configuration that changes between environments
- Development uses localhost, production uses real server
- Keeps passwords out of source code

---

### **STEP 7: Create Database Connection**

Create file: `backend/db.js`

```javascript
// Import required libraries
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create connection pool
// Pool = collection of reusable database connections
// More efficient than creating new connection for each request
const pool = mysql.createPool({
    host: process.env.DB_HOST,           // localhost
    user: process.env.DB_USER,           // root
    password: process.env.DB_PASSWORD,   // your password
    database: process.env.DB_NAME,       // last_mile
    port: process.env.DB_PORT || 3306,   // 3306 is MySQL default
    waitForConnections: true,            // Wait if all connections busy
    connectionLimit: 10,                 // Max 10 simultaneous connections
    queueLimit: 0                        // No limit on waiting requests
});

// Export pool so other files can use it
module.exports = pool;
```

**Key Concepts:**
- **Connection Pool**: Reuses database connections instead of creating new ones
- **Why?** Creating new connection is slow (like opening a door vs walking through open door)
- **connectionLimit: 10** means max 10 requests can query database simultaneously

---

### **STEP 8: Create Logger**

Create file: `backend/logger.js`

```javascript
// Import winston logging library
const winston = require('winston');
const { combine, timestamp, printf } = winston.format;

// Define log format
// Output: 2024-12-28T10:30:00.000Z [INFO] Delivery confirmed: SHIP001
const logFormat = printf(({ level, message, timestamp, ...meta }) => {
    return `${timestamp} [${level.toUpperCase()}] ${message} ${
        Object.keys(meta).length ? JSON.stringify(meta) : ''
    }`;
});

// Create logger instance
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',  // info, warn, error
    format: combine(
        timestamp(),    // Add timestamp to each log
        logFormat       // Use our custom format
    ),
    transports: [
        // Log to console (terminal)
        new winston.transports.Console(),
        
        // Log to file
        new winston.transports.File({ 
            filename: './logs/app.log', 
            level: 'info' 
        })
    ]
});

// Export logger for use in other files
module.exports = logger;
```

**Why Logging?**
- **Debugging**: Find what went wrong
- **Auditing**: Track who did what and when
- **Monitoring**: Detect unusual patterns
- **Compliance**: Many industries require audit logs

**Log Levels:**
- **info**: Normal events (delivery confirmed)
- **warn**: Something unusual but not broken
- **error**: Something failed

---

### **STEP 9: Create Controller (Business Logic)**

Create file: `backend/controllers/deliveryController.js`

```javascript
// Import database connection and logger
const pool = require('../db');
const logger = require('../logger');

// Main function to confirm delivery
async function confirmDelivery(req, res) {
    // Extract data from request body
    const { shipmentId, otp, deliveredBy } = req.body;

    // VALIDATION: Check all required fields present
    if (!shipmentId || !otp || !deliveredBy) {
        return res.status(400).json({ 
            message: 'shipmentId, otp and deliveredBy are required' 
        });
    }

    // Get database connection from pool
    const conn = await pool.getConnection();
    
    try {
        // START TRANSACTION
        // Transaction = all-or-nothing operation
        // Either all changes happen, or none happen (atomic)
        await conn.beginTransaction();

        // STEP 1: Check if shipment exists
        const [rows] = await conn.query(
            'SELECT * FROM shipments WHERE shipment_id = ?', 
            [shipmentId]
        );

        if (rows.length === 0) {
            // Shipment doesn't exist
            await conn.rollback();  // Undo any changes
            logger.info(`Delivery attempt failed - invalid shipment: ${shipmentId} by ${deliveredBy}`);
            return res.status(404).json({ message: 'Shipment not found' });
        }

        const shipment = rows[0];

        // STEP 2: Check if already delivered
        if (shipment.status === 'Delivered') {
            await conn.rollback();
            logger.info(`Delivery attempt ignored - already delivered: ${shipmentId} by ${deliveredBy}`);
            return res.status(409).json({ message: 'Shipment already delivered' });
        }

        // STEP 3: Verify OTP
        if (shipment.otp_code !== otp) {
            await conn.rollback();
            logger.info(`Delivery attempt failed - invalid OTP for ${shipmentId} by ${deliveredBy}`);
            return res.status(401).json({ message: 'Invalid OTP' });
        }

        // STEP 4: All checks passed - Update to Delivered
        const now = new Date();
        await conn.query(
            'UPDATE shipments SET status = ?, delivered_at = ?, delivered_by = ? WHERE shipment_id = ?',
            ['Delivered', now, deliveredBy, shipmentId]
        );

        // COMMIT TRANSACTION
        // Make all changes permanent
        await conn.commit();
        
        // Log success
        logger.info(`Delivery confirmed: ${shipmentId} by ${deliveredBy}`);
        
        // Send success response
        return res.status(200).json({ 
            message: 'Delivery confirmed', 
            shipmentId,
            deliveredAt: now 
        });

    } catch (err) {
        // If any error occurs, undo all changes
        await conn.rollback();
        logger.error('Confirm delivery error', { error: err });
        return res.status(500).json({ message: 'Internal server error' });
        
    } finally {
        // Always release connection back to pool
        // Like returning a library book so others can use it
        conn.release();
    }
}

// Export function so routes can use it
module.exports = { confirmDelivery };
```

**Key Concepts:**

**1. Transactions:**
```
BEGIN TRANSACTION
  - Check shipment exists
  - Check not already delivered  
  - Verify OTP
  - Update status
COMMIT (save all changes)

If ANY step fails:
ROLLBACK (undo everything)
```

**2. HTTP Status Codes:**
- **200 OK**: Success
- **400 Bad Request**: Missing required fields
- **401 Unauthorized**: Wrong OTP
- **404 Not Found**: Shipment doesn't exist
- **409 Conflict**: Already delivered
- **500 Internal Server Error**: Something crashed

**3. Why async/await?**
- Database operations take time
- `await` pauses until operation completes
- Prevents callback hell

---

### **STEP 10: Create Routes**

Create file: `backend/routes/deliveryRoutes.js`

```javascript
// Import Express router
const express = require('express');
const router = express.Router();

// Import controller function
const { confirmDelivery } = require('../controllers/deliveryController');

// Define route
// When POST request comes to /confirm, call confirmDelivery function
router.post('/confirm', confirmDelivery);

// Export router
module.exports = router;
```

**What are routes?**
Routes map URLs to functions:
- `POST /api/deliveries/confirm` → `confirmDelivery()` function

Think of it like a receptionist:
- "Request for /confirm? Go to confirmDelivery office"

---

### **STEP 11: Create Main Server**

Create file: `backend/server.js`

```javascript
// Load environment variables first
require('dotenv').config();

// Auto-catch async errors
require('express-async-errors');

// Import required libraries
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const fs = require('fs');

// Import our routes and logger
const deliveryRoutes = require('./routes/deliveryRoutes');
const logger = require('./logger');

// Create Express application
const app = express();

// MIDDLEWARE SETUP
// Middleware = functions that process requests before they reach routes

// 1. SECURITY: Add security headers
app.use(helmet());

// 2. CORS: Allow requests from Android app
app.use(cors());

// 3. PARSING: Parse JSON request bodies
app.use(express.json());

// 4. HTTP LOGGING: Log all HTTP requests to file
app.use(morgan('combined', { 
    stream: fs.createWriteStream('./logs/access.log', { flags: 'a' }) 
}));

// ROUTES
// All delivery routes will be under /api/deliveries
// Example: /api/deliveries/confirm
app.use('/api/deliveries', deliveryRoutes);

// HEALTH CHECK ENDPOINT
// Used to check if server is running
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date() });
});

// GLOBAL ERROR HANDLER
// Catches any unhandled errors
app.use((err, req, res, next) => {
    logger.error('Unhandled error', { error: err });
    res.status(500).json({ message: 'Internal server error' });
});

// START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`);
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
});
```

**Middleware Execution Order:**
```
Request → helmet → cors → json parser → morgan → routes → response
```

Each middleware processes the request and passes to next one.

---

### **STEP 12: Update package.json**

Edit `backend/package.json` to add scripts:

```json
{
  "name": "last-mile-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mysql2": "^3.3.0",
    "winston": "^3.8.2",
    "express-async-errors": "^3.1.1",
    "dotenv": "^16.3.1",
    "morgan": "^1.10.0",
    "helmet": "^7.0.0",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}
```

**Scripts explained:**
- `npm start`: Runs server (for production)
- `npm run dev`: Runs with nodemon (auto-restart on code changes)

---

### **STEP 13: Start the Server**

```bash
# Make sure you're in backend folder
cd D:\last-mile-delivery\backend

# Start in development mode
npm run dev
```

**Expected output:**
```
[nodemon] 2.0.22
[nodemon] starting `node server.js`
🚀 Server running on http://localhost:3000
📊 Health check: http://localhost:3000/health
2024-12-28T10:30:00.000Z [INFO] Server listening on port 3000
```

**✅ Backend is now running!**

Keep this terminal window open. The server must stay running to accept requests.

---

##  Testing the Application

### **Test 1: Health Check**

Open new terminal (keep server running in first terminal):

```bash
curl http://localhost:3000/health
```

**Expected response:**
```json
{"status":"OK","timestamp":"2024-12-28T10:30:00.000Z"}
```

### **Test 2: Successful Delivery**

**Windows Command Prompt:**
```bash
curl -X POST http://localhost:3000/api/deliveries/confirm -H "Content-Type: application/json" -d "{\"shipmentId\":\"SHIP001\",\"otp\":\"123456\",\"deliveredBy\":\"Agent_Rahul\"}"
```

**Expected response:**
```json
{
  "message":"Delivery confirmed",
  "shipmentId":"SHIP001",
  "deliveredAt":"2024-12-28T10:35:00.000Z"
}
```

### **Test 3: Invalid OTP**

```bash
curl -X POST http://localhost:3000/api/deliveries/confirm -H "Content-Type: application/json" -d "{\"shipmentId\":\"SHIP002\",\"otp\":\"000000\",\"deliveredBy\":\"Agent_Test\"}"
```

**Expected response:**
```json
{"message":"Invalid OTP"}
```

### **Test 4: Already Delivered**

Try SHIP001 again:
```bash
curl -X POST http://localhost:3000/api/deliveries/confirm -H "Content-Type: application/json" -d "{\"shipmentId\":\"SHIP001\",\"otp\":\"123456\",\"deliveredBy\":\"Agent_Someone\"}"
```

**Expected response:**
```json
{"message":"Shipment already delivered"}
```

### **Verify in Database**

```bash
mysql -u root -p
```

```sql
USE last_mile;
SELECT * FROM shipments;
```

You should see SHIP001 with:
- status = 'Delivered'
- delivered_by = 'Agent_Rahul'
- delivered_at = timestamp

---

## 📱 Android App Setup

### **STEP 1: Create Android Project**

1. Open **Android Studio**
2. Click **New Project**
3. Select **Empty Activity**
4. Configure:
   - Name: `LastMileDelivery`
   - Package: `com.example.lastmiledelivery`
   - Language: **Kotlin**
   - Minimum SDK: **API 24** (Android 7.0)
5. Click **Finish**

### **STEP 2: Add Dependencies**

Open `app/build.gradle.kts` (or `build.gradle`):

```kotlin
dependencies {
    implementation("androidx.core:core-ktx:1.12.0")
    implementation("androidx.appcompat:appcompat:1.6.1")
    implementation("com.google.android.material:material:1.11.0")
    implementation("androidx.constraintlayout:constraintlayout:2.1.4")
    
    // OkHttp for network calls
    implementation("com.squareup.okhttp3:okhttp:4.12.0")
    
    // Coroutines for async operations
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.3")
}
```

Click **Sync Now** (top right corner)

### **STEP 3: Add Internet Permission**

Open `app/src/main/AndroidManifest.xml`:

Add before `<application>`:
```xml
<uses-permission android:name="android.permission.INTERNET" />
```

Add to `<application>` tag:
```xml
<application
    android:usesCleartextTraffic="true"
    ...>
```

**Why?**
- `INTERNET` permission: Allows app to make network requests
- `usesCleartextTraffic`: Allows HTTP (not just HTTPS) for localhost testing

### **STEP 4: Create Layout**

Open `app/src/main/res/layout/activity_main.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="24dp"
    android:gravity="center">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Last-Mile Delivery"
        android:textSize="24sp"
        android:textStyle="bold"
        android:layout_marginBottom="32dp" />

    <com.google.android.material.textfield.TextInputLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginBottom="16dp">
        
        <com.google.android.material.textfield.TextInputEditText
            android:id="@+id/etShipmentId"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:hint="Shipment ID (e.g., SHIP002)" />
    </com.google.android.material.textfield.TextInputLayout>

    <com.google.android.material.textfield.TextInputLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginBottom="16dp">
        
        <com.google.android.material.textfield.TextInputEditText
            android:id="@+id/etOtp"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:hint="OTP"
            android:inputType="number"
            android:maxLength="10" />
    </com.google.android.material.textfield.TextInputLayout>

    <com.google.android.material.textfield.TextInputLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginBottom="24dp">
        
        <com.google.android.material.textfield.TextInputEditText
            android:id="@+id/etAgentName"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:hint="Your Name" />
    </com.google.android.material.textfield.TextInputLayout>

    <Button
        android:id="@+id/btnSubmit"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Confirm Delivery"
        android:textSize="16sp" />

    <TextView
        android:id="@+id/tvResult"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:paddingTop="24dp"
        android:textSize="14sp"
        android:textColor="#000000" />

</LinearLayout>
```

**Layout explained:**
- **LinearLayout**: Stacks elements vertically
- **TextInputLayout**: Material Design text input with floating label
- **Button**: Submit button to confirm delivery
- **TextView**: Shows response/result

### **STEP 5: Create MainActivity**

Open `app/src/main/java/com/example/lastmiledelivery/MainActivity.kt`:

```kotlin
package com.example.lastmiledelivery

import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.textfield.TextInputEditText
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import java.util.concurrent.TimeUnit

class MainActivity : AppCompatActivity() {
    
    // HTTP client for making network requests
    private val client = OkHttpClient.Builder()
        .connectTimeout(10, TimeUnit.SECONDS)
        .readTimeout(10, TimeUnit.SECONDS)
        .build()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Get references to UI elements
        val etShipmentId = findViewById<TextInputEditText>(R.id.etShipmentId)
        val etOtp = findViewById<TextInputEditText>(R.id.etOtp)
        val etAgentName = findViewById<TextInputEditText>(R.id.etAgentName)
        val btnSubmit = findViewById<Button>(R.id.btnSubmit)
        val tvResult = findViewById<TextView>(R.id.tvResult)

        // Button click handler
        btnSubmit.setOnClickListener {
            // Get values from input fields
            val shipmentId = etShipmentId.text.toString().trim()
            val otp = etOtp.text.toString().trim()
            val name = etAgentName.text.toString().trim()

            // Validation
            if (shipmentId.isEmpty() || otp.isEmpty() || name.isEmpty()) {
                tvResult.text = "❌ Please fill all fields"
                return@setOnClickListener
            }

            // Show loading
            tvResult.text = "⏳ Processing..."
            btnSubmit.isEnabled = false

            // Make network call on background thread
            // UI thread cannot do network calls (Android restriction)
            CoroutineScope(Dispatchers.IO).launch {
                try {
                    // Create JSON request body
                    val json = """
                        {
                            "shipmentId": "$shipmentId",
                            "otp": "$otp",
                            "deliveredBy": "$name"
                        }
                    """.trimIndent()

                    val body = json.toRequestBody("application/json".toMediaTypeOrNull())
                    
                    // Build HTTP request
                    // 10.0.2.2 = Android emulator's way to reach host machine
                    val request = Request.Builder()
                        .url("http://10.0.2.2:3000/api/deliveries/confirm")
                        .post(body)
                        .build()

                    // Execute request
                    val response = client.newCall(request).execute()
                    val responseBody = response.body?.string() ?: "No response"

                    // Switch back to UI thread to update UI
                    withContext(Dispatchers.Main) {
                        // Handle different response codes
                        when (response.code) {
                            200 -> tvResult.text = "✅ SUCCESS\n\n$responseBody"
                            401 -> tvResult.text = "❌ Invalid OTP\n\n$responseBody"
                            404 -> tvResult.text = "❌ Shipment Not Found\n\n$responseBody"
                            409 -> tvResult.text = "⚠️ Already Delivered\n\n$responseBody"
                            else -> tvResult.text = "❌ Error (${response.code})\n\n$responseBody"
                        }
                        btnSubmit.isEnabled = true
                    }

                } catch (e: Exception) {
                    // Handle network errors
                    withContext(Dispatchers.Main) {
                        tvResult.text = "❌ Network Error:\n${e.localizedMessage}\n\nMake sure backend is running!"
                        btnSubmit.isEnabled = true
                    }
                }
            }
        }
    }
}
```


## 📚 API Documentation

### **Base URL**
```
http://localhost:3000
```

### **Endpoints**

#### **GET /health**
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-12-28T10:30:00.000Z"
}
```

---

#### **POST /api/deliveries/confirm**
Confirm a delivery with OTP verification.

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "shipmentId": "SHIP001",
  "otp": "123456",
  "deliveredBy": "Agent_Rahul"
}
```

**Success Response (200):**
```json
{
  "message": "Delivery confirmed",
  "shipmentId": "SHIP001",
  "deliveredAt": "2024-12-28T10:35:00.000Z"
}
```

**Error Responses:**

| Code | Meaning | Response |
|------|---------|----------|
| 400 | Bad Request | `{"message": "shipmentId, otp and deliveredBy are required"}` |
| 401 | Unauthorized | `{"message": "Invalid OTP"}` |
| 404 | Not Found | `{"message": "Shipment not found"}` |
| 409 | Conflict | `{"message": "Shipment already delivered"}` |
| 500 | Server Error | `{"message": "Internal server error"}` |

---

## 📊 Database Schema

### **shipments table**

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Auto-increment primary key |
| shipment_id | VARCHAR(50) | Unique tracking number |
| customer_name | VARCHAR(100) | Customer name |
| otp_code | VARCHAR(10) | OTP for verification |
| status | ENUM | Pending, In-Transit, Delivered |
| delivered_at | TIMESTAMP | Delivery timestamp (NULL until delivered) |
| delivered_by | VARCHAR(100) | Agent name who delivered |

**Indexes:**
- Primary key on `id`
- Unique index on `shipment_id`
- Index on `status` for faster queries

---

---

## 📝 Project Structure Summary

```
last-mile-delivery/
├── backend/
│   ├── package.json          # Dependencies and scripts
│   ├── .env                  # Environment variables (passwords)
│   ├── server.js             # Main server file
│   ├── db.js                 # Database connection
│   ├── logger.js             # Logging configuration
│   ├── controllers/
│   │   └── deliveryController.js  # Business logic
│   ├── routes/
│   │   └── deliveryRoutes.js      # API routes
│   ├── models/
│   │   └── shipment.sql           # Database schema
│   └── logs/
│       ├── app.log           # Application logs
│       └── access.log        # HTTP access logs
│
└── android/
    └── LastMileDelivery/
        ├── app/
        │   ├── src/main/
        │   │   ├── java/.../MainActivity.kt
        │   │   └── res/layout/activity_main.xml
        │   └── build.gradle
        └── build.gradle

```




