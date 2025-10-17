/**
 * Netlify Function: Get Availability
 * Returns available booking slots for a specific artist
 */

exports.handler = async (event, context) => {
    // Allow GET requests
    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        // Parse query parameters
        const params = event.queryStringParameters || {};
        const artistId = params.artist;
        const month = params.month; // Format: YYYY-MM

        // In production, fetch from database or calendar API
        // For now, return mock availability data
        const availability = generateMockAvailability(artistId, month);

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
            },
            body: JSON.stringify({
                success: true,
                artist: artistId,
                month: month,
                slots: availability
            })
        };

    } catch (error) {
        console.error('Availability fetch error:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Failed to fetch availability',
                message: error.message
            })
        };
    }
};

// Generate mock availability data
function generateMockAvailability(artistId, month) {
    const availability = {};
    const today = new Date();
    const [year, monthNum] = month ? month.split('-') : [today.getFullYear(), today.getMonth() + 1];

    // Generate availability for next 30 days
    for (let i = 2; i < 32; i++) {
        const date = new Date(year, monthNum - 1, i);

        // Skip weekends
        if (date.getDay() === 0 || date.getDay() === 6) continue;

        const dateStr = date.toISOString().split('T')[0];

        // Generate time slots (10 AM - 6 PM)
        const timeSlots = [];
        for (let hour = 10; hour < 18; hour++) {
            const time24 = `${hour.toString().padStart(2, '0')}:00`;
            const hour12 = hour > 12 ? hour - 12 : hour;
            const period = hour >= 12 ? 'PM' : 'AM';
            const time12 = `${hour12}:00 ${period}`;

            // Randomly mark some slots as booked (for demo)
            const isAvailable = Math.random() > 0.3; // 70% available

            timeSlots.push({
                time: time12,
                time24: time24,
                available: isAvailable
            });
        }

        availability[dateStr] = timeSlots;
    }

    return availability;
}

