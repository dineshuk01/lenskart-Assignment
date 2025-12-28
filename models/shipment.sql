CREATE DATABASE IF NOT EXISTS last_mile;

USE last_mile;

DROP TABLE IF EXISTS shipments;

CREATE TABLE shipments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    shipment_id VARCHAR(50) UNIQUE NOT NULL,
    customer_name VARCHAR(100),
    otp_code VARCHAR(10) NOT NULL,
    status ENUM('Pending','In-Transit','Delivered') DEFAULT 'Pending',
    delivered_at TIMESTAMP NULL,
    delivered_by VARCHAR(100),
    INDEX idx_shipment_id (shipment_id),
    INDEX idx_status (status)
);

-- Sample test data
INSERT INTO shipments (shipment_id, customer_name, otp_code, status) VALUES
('SHIP001', 'Ramesh Kumar', '123456', 'In-Transit'),
('SHIP002', 'Sita Devi', '987654', 'In-Transit'),
('SHIP003', 'Aman Singh', '111222', 'Pending');
