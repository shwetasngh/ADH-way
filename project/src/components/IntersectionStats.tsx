import React from 'react';
import { BarChart3, Clock, Car, Activity } from 'lucide-react';
import { TrafficStats } from '../types/traffic';

interface IntersectionStatsProps {
  stats: TrafficStats;
}

export function IntersectionStats({ stats }: IntersectionStatsProps) {
  const getCongestionColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'high': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Traffic Statistics</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-500" />
          <div>
            <div className="text-sm text-gray-600">Average Wait</div>
            <div className="font-medium">{stats.averageWaitTime.toFixed(1)}s</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Car className="w-5 h-5 text-blue-500" />
          <div>
            <div className="text-sm text-gray-600">Total Vehicles</div>
            <div className="font-medium">{stats.totalVehicles}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <BarChart3 className={`w-5 h-5 ${getCongestionColor(stats.congestionLevel)}`} />
          <div>
            <div className="text-sm text-gray-600">Congestion</div>
            <div className="font-medium capitalize">{stats.congestionLevel}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-500" />
          <div>
            <div className="text-sm text-gray-600">Efficiency</div>
            <div className="font-medium">{stats.efficiency.toFixed(1)}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}