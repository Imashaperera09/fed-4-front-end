// Simple backend server for testing Postman and frontend
import http from 'http';
import url from 'url';

const mockData = {
  solarUnits: {
    "68f27e4735af464f48833c71": {
      id: "68f27e4735af464f48833c71",
      name: "Alice's House Solar Panel",
      capacity: "5kW",
      location: "Rooftop",
      installDate: "2023-01-15",
      serialNumber: "SU-2025-001",
      status: "ACTIVE"
    }
  },
  energyRecords: [
    { date: "2024-11-16", energy: 567, unit: "kWh" },
    { date: "2024-11-15", energy: 672, unit: "kWh" },
    { date: "2024-11-14", energy: 543, unit: "kWh" },
    { date: "2024-11-13", energy: 612, unit: "kWh" },
    { date: "2024-11-12", energy: 589, unit: "kWh" },
    { date: "2024-11-11", energy: 634, unit: "kWh" },
    { date: "2024-11-10", energy: 598, unit: "kWh" }
  ]
};

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;

  console.log(`${req.method} ${req.url}`);

  res.setHeader('Content-Type', 'application/json');

  // Handle solar units endpoint
  if (path.match(/^\/api\/solar-units\/(.+)$/)) {
    const id = path.split('/').pop();
    const unit = mockData.solarUnits[id];
    
    if (unit) {
      res.writeHead(200);
      res.end(JSON.stringify({
        success: true,
        data: unit
      }));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({
        success: false,
        error: "Solar unit not found"
      }));
    }
    return;
  }

  // Handle energy records endpoint
  if (path.match(/^\/api\/energy-generation-records\/solar-unit\/(.+)$/)) {
    const id = path.split('/')[4]; // Get the ID from the path
    const groupBy = parsedUrl.query.groupBy || 'date';
    
    if (mockData.solarUnits[id]) {
      res.writeHead(200);
      res.end(JSON.stringify({
        success: true,
        data: mockData.energyRecords,
        groupBy: groupBy
      }));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({
        success: false,
        error: "Solar unit not found"
      }));
    }
    return;
  }

  // 404 for other endpoints
  res.writeHead(404);
  res.end(JSON.stringify({
    success: false,
    error: "Endpoint not found"
  }));
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log('📡 Available API endpoints:');
  console.log(`   GET http://localhost:${PORT}/api/solar-units/68f27e4735af464f48833c71`);
  console.log(`   GET http://localhost:${PORT}/api/energy-generation-records/solar-unit/68f27e4735af464f48833c71?groupBy=date`);
  console.log('');
  console.log('✅ Ready for Postman testing and frontend integration!');
});
