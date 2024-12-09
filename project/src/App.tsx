import React, { useState, useCallback } from 'react';
import { TrafficIntersection } from './components/TrafficIntersection';
import { Intersection, Direction, TrafficData } from './types/traffic';

function generateRandomTrafficData(): TrafficData {
  return {
    vehicleCount: Math.floor(Math.random() * 50),
    averageSpeed: 20 + Math.random() * 40,
    queueLength: Math.floor(Math.random() * 15),
    waitTime: Math.floor(Math.random() * 60),
    density: Math.random()
  };
}

function App() {
  const [intersection, setIntersection] = useState<Intersection>({
    id: '1',
    name: 'Main Street & First Avenue',
    directions: {
      north: generateRandomTrafficData(),
      south: generateRandomTrafficData(),
      east: generateRandomTrafficData(),
      west: generateRandomTrafficData()
    },
    currentPhase: 'north',
    greenDuration: 30,
    lastUpdated: new Date()
  });

  const handlePhaseChange = useCallback((direction: Direction, duration: number) => {
    setIntersection(prev => ({
      ...prev,
      currentPhase: direction,
      greenDuration: duration,
      lastUpdated: new Date(),
      directions: {
        ...prev.directions,
        [direction]: {
          ...prev.directions[direction],
          waitTime: Math.max(0, prev.directions[direction].waitTime - 5),
          queueLength: Math.max(0, prev.directions[direction].queueLength - 2)
        }
      }
    }));
  }, []);

  // Simulate traffic changes
  React.useEffect(() => {
    const interval = setInterval(() => {
      setIntersection(prev => ({
        ...prev,
        directions: Object.entries(prev.directions).reduce((acc, [dir, data]) => ({
          ...acc,
          [dir]: {
            ...data,
            vehicleCount: Math.max(0, data.vehicleCount + (Math.random() > 0.5 ? 1 : -1)),
            waitTime: dir === prev.currentPhase 
              ? Math.max(0, data.waitTime - 1)
              : data.waitTime + 1,
            queueLength: dir === prev.currentPhase
              ? Math.max(0, data.queueLength - 0.5)
              : Math.min(20, data.queueLength + 0.5)
          }
        }), {} as Record<Direction, TrafficData>)
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <TrafficIntersection
        intersection={intersection}
        onPhaseChange={handlePhaseChange}
      />
    </div>
  );
}

export default App;