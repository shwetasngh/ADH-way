import React, { useEffect, useState } from 'react';
import { TrafficLight } from './TrafficLight';
import { IntersectionStats } from './IntersectionStats';
import { Intersection, Direction, TrafficStats } from '../types/traffic';
import { determineNextPhase, calculateTrafficEfficiency } from '../utils/trafficOptimizer';

interface TrafficIntersectionProps {
  intersection: Intersection;
  onPhaseChange: (direction: Direction, duration: number) => void;
}

export function TrafficIntersection({ 
  intersection,
  onPhaseChange 
}: TrafficIntersectionProps) {
  const [stats, setStats] = useState<TrafficStats>({
    averageWaitTime: 0,
    totalVehicles: 0,
    congestionLevel: 'low',
    efficiency: 100
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const nextPhase = determineNextPhase(intersection);
      onPhaseChange(nextPhase.direction, nextPhase.duration);
      
      // Update statistics
      const efficiency = calculateTrafficEfficiency(intersection);
      const totalVehicles = Object.values(intersection.directions)
        .reduce((sum, data) => sum + data.vehicleCount, 0);
      const avgWait = Object.values(intersection.directions)
        .reduce((sum, data) => sum + data.waitTime, 0) / 4;
      
      setStats({
        averageWaitTime: avgWait,
        totalVehicles,
        congestionLevel: efficiency > 75 ? 'low' : efficiency > 50 ? 'medium' : 'high',
        efficiency
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [intersection, onPhaseChange]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">AI Traffic Management System</h1>
      <div className="mb-6">
        <IntersectionStats stats={stats} />
      </div>
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="flex justify-center">
          <TrafficLight
            direction="north"
            isActive={intersection.currentPhase === 'north'}
            duration={intersection.greenDuration}
            vehicleCount={intersection.directions.north.vehicleCount}
            waitTime={intersection.directions.north.waitTime}
          />
        </div>
        <div className="flex justify-center">
          <TrafficLight
            direction="south"
            isActive={intersection.currentPhase === 'south'}
            duration={intersection.greenDuration}
            vehicleCount={intersection.directions.south.vehicleCount}
            waitTime={intersection.directions.south.waitTime}
          />
        </div>
        <div className="flex justify-center">
          <TrafficLight
            direction="east"
            isActive={intersection.currentPhase === 'east'}
            duration={intersection.greenDuration}
            vehicleCount={intersection.directions.east.vehicleCount}
            waitTime={intersection.directions.east.waitTime}
          />
        </div>
        <div className="flex justify-center">
          <TrafficLight
            direction="west"
            isActive={intersection.currentPhase === 'west'}
            duration={intersection.greenDuration}
            vehicleCount={intersection.directions.west.vehicleCount}
            waitTime={intersection.directions.west.waitTime}
          />
        </div>
      </div>
    </div>
  );
}