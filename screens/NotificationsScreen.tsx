import React from 'react';
import { Screen } from '../types';
import type { Notification } from '../App';
import FlameIcon from '../components/FlameIcon';
import BottomNav from '../components/BottomNav';
import { CompassIcon, LocationMarkerIcon, UserIcon, StarIcon, HeartIcon } from '../components/Icons';

interface NotificationsScreenProps {
  notifications: Notification[];
  onNavigate: (screen: Screen) => void;
  cartCount: number;
  notificationCount: number;
  activeScreen: Screen;
}

const NotificationCard: React.FC<{ notification: Notification }> = ({ notification }) => {
    const { type, text, action } = notification;

    const renderMainIcon = () => {
        switch (type) {
            case 'location':
                return <LocationMarkerIcon className="w-6 h-6 text-white" />;
            case 'user':
                return <UserIcon className="w-6 h-6 text-white" />;
            default:
                return null;
        }
    };
    
    const renderActionIcon = () => {
        switch (action) {
            case 'star':
                return <StarIcon className="w-6 h-6 text-gray-300" />;
            case 'heart':
                return <HeartIcon className="w-6 h-6 text-gray-300" />;
            default:
                return null;
        }
    };

    return (
        <div className="bg-white p-4 rounded-2xl border border-orange-300 shadow-sm flex items-center space-x-4">
            <div className="bg-orange-500 rounded-full p-3 flex-shrink-0">
                {renderMainIcon()}
            </div>
            <div className="flex-grow min-w-0">
                <p className="text-gray-700 text-sm">{text}</p>
            </div>
            <div className="flex-shrink-0">
                {renderActionIcon()}
            </div>
        </div>
    );
};

const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ notifications, onNavigate, cartCount, notificationCount, activeScreen }) => {
  return (
    <div className="bg-gray-100 min-h-screen pb-20">
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <FlameIcon className="w-6 h-6 text-orange-500" />
          <div>
            <p className="text-sm font-semibold text-gray-600">{notificationCount} Novas</p>
            <h1 className="font-bold text-xl text-gray-800">Notificações</h1>
          </div>
        </div>
        <button className="text-gray-600">
          <CompassIcon className="w-7 h-7" />
        </button>
      </header>
      
      <main className="px-4">
        {notifications.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">Você não tem nenhuma notificação.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map(notif => (
              <NotificationCard key={notif.id} notification={notif} />
            ))}
          </div>
        )}
      </main>
      
      <BottomNav cartCount={cartCount} notificationCount={notificationCount} onNavigate={onNavigate} activeScreen={activeScreen} />
    </div>
  );
};

export default NotificationsScreen;
