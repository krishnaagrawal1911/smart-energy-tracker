# ⚡ Smart IoT Energy & Power Consumption Tracker

A modern full-stack IoT telemetry application designed to monitor live electrical load, calculate real-time power consumption, estimate electricity billing metrics, and detect threshold overload alerts with an interactive control dashboard.

---

## 🌟 Key Features
- **Real-Time Telemetry Simulation:** Simulates active power ($P = V \times I \times \cos\phi$), fluctuating RMS grid voltage ($226\text{V} - 234\text{V}$), and power factor metrics.
- **Interactive Load Controls:** Toggle individual high-load appliances (HVAC, Inverter AC, EV Charger, Induction) on/off with instantaneous wattage recalculation.
- **Dynamic Energy Visualizations:** Real-time Chart.js graph tracking active power spikes and load patterns.
- **Billing & Tariff Engine:** Automatically computes estimated consumption costs per hour based on active kWh draw.
- **Peak Overload Guard:** Immediate UI alerts when aggregated active demand breaches the safe grid threshold ($> 3.0\text{ kW}$).
- **RESTful API Architecture:** Clean decoupled Express.js backend serving telemetry endpoints.

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js, REST APIs
- **Frontend:** HTML5, CSS3 (Modern Flex/Grid, Dark Mode UI), JavaScript (ES6+), Chart.js
- **Domain Focus:** Electrical Load Monitoring + Full-Stack Web Development

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.

### 2. Installation
Clone this repository and install the dependencies:
```bash
git clone https://github.com/your-username/smart-energy-tracker.git
cd smart-energy-tracker
npm install
```

### 3. Run the Application
Start the local server:
```bash
npm start
```

Visit the dashboard in your browser:
```text
http://localhost:3000
```

---

## 📡 REST API Documentation

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/telemetry` | Fetches real-time power metrics, voltage, cost estimate, and status of all appliances |
| `POST` | `/api/appliance/:id/toggle` | Toggles an appliance `ON` or `OFF` and updates instantaneous grid load |
| `GET` | `/api/logs` | Returns recent system and switching logs |

---

## 👨‍💻 Author
- **Krishan** - B.Tech in Electrical Engineering with Minor in CSE, MANIT Bhopal
