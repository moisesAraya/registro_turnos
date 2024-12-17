import { useState, useEffect } from 'react';
import { getAreas } from '@services/charts.service.js';

const useAreas = () => {
    const [areas, setAreas] = useState([]);

    const fetchAreas = async () => {
        try {
            const response = await getAreas();
            const formattedData = response.map(area => ({
                id: area.id,
                name: area.name,
            }));
            setAreas(formattedData);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchAreas();
    }, []);

    return { areas, fetchAreas, setAreas };
}

export default useAreas;