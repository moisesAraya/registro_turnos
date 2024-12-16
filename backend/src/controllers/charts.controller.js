export const getChartsFormatted = async (req, res) => {
    try {
      const scanRepository = AppDataSource.getRepository(Scan);
  
      // Agrupar registros por fecha
      const datos = await scanRepository
        .createQueryBuilder("scan")
        .select("DATE(scan.scanTime)", "fecha")
        .addSelect("COUNT(scan.id)", "cantidad")
        .groupBy("fecha")
        .orderBy("fecha", "ASC")
        .getRawMany();
  
      // Formatear datos para el frontend
      const chartData = datos.map((item) => ({
        date: item.fecha,
        count: item.cantidad,
      }));
  
      res.status(200).json({ message: "Datos formateados", data: chartData });
    } catch (error) {
      console.error("Error al obtener datos formateados:", error);
      res.status(500).json({ message: "Error al obtener datos." });
    }
  };
  