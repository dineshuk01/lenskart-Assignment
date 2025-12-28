const pool = require('../db');
const logger = require('../logger');

async function confirmDelivery(req, res) {
    const { shipmentId, otp, deliveredBy } = req.body;

    // Input validation
    if (!shipmentId || !otp || !deliveredBy) {
        return res.status(400).json({ 
            message: 'shipmentId, otp and deliveredBy are required' 
        });
    }

    const conn = await pool.getConnection();
    
    try {
        await conn.beginTransaction();

        // Check if shipment exists
        const [rows] = await conn.query(
            'SELECT * FROM shipments WHERE shipment_id = ?', 
            [shipmentId]
        );

        if (rows.length === 0) {
            await conn.rollback();
            logger.info(`Delivery attempt failed - invalid shipment: ${shipmentId} by ${deliveredBy}`);
            return res.status(404).json({ message: 'Shipment not found' });
        }

        const shipment = rows[0];

        // Check if already delivered
        if (shipment.status === 'Delivered') {
            await conn.rollback();
            logger.info(`Delivery attempt ignored - already delivered: ${shipmentId} by ${deliveredBy}`);
            return res.status(409).json({ message: 'Shipment already delivered' });
        }

        // Verify OTP
        if (shipment.otp_code !== otp) {
            await conn.rollback();
            logger.info(`Delivery attempt failed - invalid OTP for ${shipmentId} by ${deliveredBy}`);
            return res.status(401).json({ message: 'Invalid OTP' });
        }

        // Update to Delivered
        const now = new Date();
        await conn.query(
            'UPDATE shipments SET status = ?, delivered_at = ?, delivered_by = ? WHERE shipment_id = ?',
            ['Delivered', now, deliveredBy, shipmentId]
        );

        await conn.commit();
        logger.info(`Delivery confirmed: ${shipmentId} by ${deliveredBy}`);
        
        return res.status(200).json({ 
            message: 'Delivery confirmed', 
            shipmentId,
            deliveredAt: now 
        });

    } catch (err) {
        await conn.rollback();
        logger.error('Confirm delivery error', { error: err });
        return res.status(500).json({ message: 'Internal server error' });
    } finally {
        conn.release();
    }
}

module.exports = { confirmDelivery };