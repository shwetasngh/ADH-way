import { Direction, Intersection, TrafficData, TrafficPhase } from '../types/traffic';

export function calculateOptimalDuration(trafficData: TrafficData): number {
  const { vehicleCount, queueLength, waitTime, density } = trafficData;
  
  // AI-based duration calculation using weighted parameters
  const baseDuration = 30;
  const weightedDuration = 
    (vehicleCount * 2.5) + 
    (queueLength * 3) + 
    (waitTime * 1.5) +
    (density * 2);
  
  // Ensure duration stays within reasonable bounds
  return Math.min(Math.max(baseDuration, weightedDuration), 90);
}

export function determineNextPhase(intersection: Intersection): TrafficPhase {
  const directions: Direction[] = ['north', 'south', 'east', 'west'];
  const currentTime = new Date();
  const timeSinceLastUpdate = (currentTime.getTime() - intersection.lastUpdated.getTime()) / 1000;

  const phases = directions.map(direction => {
    const data = intersection.directions[direction];
    const priority = calculatePriorityScore(data, direction === intersection.currentPhase, timeSinceLastUpdate);
    return {
      direction,
      duration: calculateOptimalDuration(data),
      priority
    };
  });

  return phases.reduce((prev, current) => 
    current.priority > prev.priority ? current : prev
  );
}

function calculatePriorityScore(
  data: TrafficData, 
  isCurrentPhase: boolean,
  timeSinceLastUpdate: number
): number {
  const {
    vehicleCount,
    queueLength,
    waitTime,
    density,
    averageSpeed
  } = data;

  // Dynamic weights based on traffic conditions
  const weights = {
    vehicleCount: 0.3,
    queueLength: 0.25,
    waitTime: 0.2,
    density: 0.15,
    speed: 0.1
  };

  // Calculate base score
  let score = 
    vehicleCount * weights.vehicleCount +
    queueLength * weights.queueLength +
    waitTime * weights.waitTime +
    density * weights.density +
    (1 / averageSpeed) * weights.speed;

  // Penalty for current phase to encourage switching
  if (isCurrentPhase) {
    score *= Math.max(0.5, 1 - (timeSinceLastUpdate / 120));
  }

  return score;
}

export function calculateTrafficEfficiency(intersection: Intersection): number {
  const totalWaitTime = Object.values(intersection.directions)
    .reduce((sum, data) => sum + data.waitTime, 0);
  const totalVehicles = Object.values(intersection.directions)
    .reduce((sum, data) => sum + data.vehicleCount, 0);
  
  const avgWaitTime = totalVehicles ? totalWaitTime / totalVehicles : 0;
  const efficiency = Math.max(0, 100 - (avgWaitTime * 2));
  
  return Math.min(efficiency, 100);
}