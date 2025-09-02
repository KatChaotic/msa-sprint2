import fetch from 'node-fetch';

const HOTELS_API_URL = process.env.HOTELS_API_URL || 'http://localhost:8084';

export async function getHotelById(hotelId) {
    console.log('[HotelService] getHotelById', hotelId);
    try {
        const response = await fetch(`${HOTELS_API_URL}/api/hotels/${hotelId}`, {
            method: 'GET',
        });

        return await response.json();
    }
    catch (error) {
        console.error('[HotelService] getHotelById', error);
        return null;
    }
}