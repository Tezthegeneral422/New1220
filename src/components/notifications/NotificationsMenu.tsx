import React, { useState, useRef, useEffect } from 'react';
import { NotificationBell } from './NotificationBell';
import { NotificationList } from './NotificationList';

export function NotificationsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <NotificationBell 
        onClick={() => setIsOpen(!isOpen)} 
      />
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-background-card rounded-lg shadow-lg overflow-hidden z-50">
          <NotificationList onClose={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
}