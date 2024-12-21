import React from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import type { TimeBlock } from '../../../../types/routine';

interface TimeBlocksProps {
  schedule: TimeBlock[];
  onUpdateBlock: (blockId: string, status: TimeBlock['status']) => void;
}

export function TimeBlocks({ schedule, onUpdateBlock }: TimeBlocksProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-900 dark:text-white">Time Blocks</h3>
      <div className="space-y-2">
        {schedule.map((block) => (
          <div
            key={block.id}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-background-card rounded-lg border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">{block.time}</span>
              </div>
              <span className="text-sm text-gray-900 dark:text-white">{block.activity}</span>
            </div>

            <div className="flex items-center space-x-2">
              {block.status === 'pending' ? (
                <>
                  <button
                    onClick={() => onUpdateBlock(block.id, 'completed')}
                    className="p-1 text-green-600 hover:text-green-700"
                  >
                    <CheckCircle className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onUpdateBlock(block.id, 'skipped')}
                    className="p-1 text-gray-400 hover:text-gray-500"
                  >
                    <XCircle className="h-5 w-5" />
                  </button>
                </>
              ) : (
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    block.status === 'completed'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                  }`}
                >
                  {block.status.charAt(0).toUpperCase() + block.status.slice(1)}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}