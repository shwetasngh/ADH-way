import React from 'react';
import { Circle } from 'lucide-react';
import { Direction } from '../types/traffic';

interface TrafficLightProps {
  direction: Direction;
  isActive: boolean;
  duration: number;
  vehicleCount: number;
  waitTime: number;
}

export function TrafficLight({ 
  direction, 
  isActive, 
  duration, 
  vehicleCount,
  waitTime 
}: TrafficLightProps) {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="relative">
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <Circle
            className={`w-8 h-8 ${
              isActive 
                ? 'text-green-500 animate-pulse' 
                : 'text-red-500'
            }`}
            fill={isActive ? 'currentColor' : 'currentColor'}
          />
        </div>
        {isActive && (
          <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
            {Math.ceil(duration)}s
          </div>
        )}
      </div>
      <div className="text-sm font-medium capitalize">
        {direction}
      </div>
      <div className="bg-gray-100 p-2 rounded-md text-xs space-y-1">
        <div className="flex justify-between gap-2">
          <span>Vehicles:</span>
          <span className="font-medium">{vehicleCount}</span>
        </div>
        <div className="flex justify-between gap-2">
          <span>Wait:</span>
          <span className="font-medium">{waitTime}s</span>
        </div>
      </div>
    </div>
  );
}