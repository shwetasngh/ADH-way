export interface TrafficData {
  vehicleCount: number;
  averageSpeed: number;
  queueLength: number;
  waitTime: number;
}

export interface Intersection {
  id: string;
  name: string;
  directions: Record<Direction, TrafficData>;
  currentPhase: Direction;
  greenDuration: number;
}

export type Direction = 'north' | 'south' | 'east' | 'west';

export interface TrafficPhase {
  direction: Direction;
  duration: number;
}