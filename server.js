const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Simulated live telemetry state
let appliances = [
  { id: 'app-1', name: 'Smart Air Conditioner', status: 'ON', basePower: 1450, currentPower: 1450, voltage: 230, powerFactor: 0.95 },
  { id: 'app-2', name: 'Induction Cooktop', status: 'ON', basePower: 1200, currentPower: 1200, voltage: 230, powerFactor: 0.98 },
  { id: 'app-3', name: 'Refrigerator (Inverter)', status: 'ON', basePower: 180, currentPower: 180, voltage: 230, powerFactor: 0.88 },
  { id: 'app-4', name: 'EV Home Charger', status: 'OFF', basePower: 3300, currentPower: 0, voltage: 230, powerFactor: 0.99 },
  { id: 'app-5', name: 'Workstation Setup', status: 'ON', basePower: 220, currentPower: 220, voltage: 230, powerFactor: 0.92 }
];

let logs = [];
const UNIT_RATE_INR = 7.5; // Rs. 7.5 per kWh

function simulateFluctuations() {
  appliances = appliances.map(app => {
    if (app.status === 'OFF') {
      return { ...app, currentPower: 0, current: 0 };
    }
    // Random fluctuation +/- 7%
    const fluctuation = 1 + (Math.random() * 0.14 - 0.07);
    const voltageFluc = 230 + (Math.random() * 8 - 4); // 226V - 234V
    const activePower = Math.round(app.basePower * fluctuation);
    const current = +(activePower / (voltageFluc * app.powerFactor)).toFixed(2);
    
    return {
      ...app,
      currentPower: activePower,
      voltage: +voltageFluc.toFixed(1),
      current: current
    };
  });
}

setInterval(simulateFluctuations, 2000);

// API Endpoints
app.get('/api/telemetry', (req, res) => {
  const totalPowerW = appliances.reduce((sum, a) => sum + a.currentPower, 0);
  const totalPowerKW = +(totalPowerW / 1000).toFixed(3);
  const estimatedHourlyCost = +(totalPowerKW * UNIT_RATE_INR).toFixed(2);
  const averageVoltage = +(appliances.reduce((s, a) => s + a.voltage, 0) / appliances.length).toFixed(1);

  // Check alert condition (e.g. over 3000W load)
  const isOverload = totalPowerW > 3000;

  res.json({
    timestamp: new Date().toISOString(),
    totalPowerW,
    totalPowerKW,
    estimatedHourlyCost,
    unitRate: UNIT_RATE_INR,
    averageVoltage,
    isOverload,
    appliances
  });
});

app.post('/api/appliance/:id/toggle', (req, res) => {
  const { id } = req.params;
  const target = appliances.find(a => a.id === id);
  if (!target) {
    return res.status(404).json({ error: 'Appliance not found' });
  }

  target.status = target.status === 'ON' ? 'OFF' : 'ON';
  target.currentPower = target.status === 'ON' ? target.basePower : 0;

  const logEntry = {
    timestamp: new Date().toLocaleTimeString(),
    message: `${target.name} turned ${target.status}`
  };
  logs.unshift(logEntry);
  if (logs.length > 20) logs.pop();

  res.json({ success: true, appliance: target, logs });
});

app.get('/api/logs', (req, res) => {
  res.json(logs);
});

app.listen(PORT, () => {
  console.log(`[Smart Energy Tracker] running on http://localhost:${PORT}`);
});
