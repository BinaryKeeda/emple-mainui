import React, { useState } from 'react';

export default function CalendarComponent() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 10)); // February 10, 2026
  const [streak, setStreak] = useState(5); // Example streak
  
  // Activity dots for specific dates (example data)
  const activityDates = [5, 8, 9]; // Dates with activity dots

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1; // Convert to Monday-based week
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const prevMonthDays = getDaysInMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handlePrevYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1));
  };

  const handleNextYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1));
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const isWeekend = (dayIndex) => {
    return dayIndex === 5 || dayIndex === 6; // Saturday or Sunday
  };

  const hasActivity = (day) => {
    return activityDates.includes(day);
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      days.push(
        <div
          key={`prev-${day}`}
          className="text-center py-2 text-sm text-gray-300 dark:text-gray-600"
        >
          {day}
        </div>
      );
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const dayIndex = (firstDay + day - 1) % 7;
      const isCurrentDay = isToday(day);
      const isWeekendDay = isWeekend(dayIndex);
      const hasActivityDot = hasActivity(day);

      days.push(
        <div
          key={`current-${day}`}
          className={`
            text-center py-2 text-sm cursor-pointer transition-all relative flex items-center justify-center
            ${isCurrentDay 
              ? 'text-white font-semibold'
              : isWeekendDay
              ? 'text-red-500 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full'
            }
          `}
        >
          {isCurrentDay ? (
            <span
              style={{ background: 'linear-gradient(135deg, #ff6200 35%, #f13000 100%)' }}
              className="w-8 h-8 flex items-center justify-center rounded-full text-white font-semibold"
            >
              {day}
            </span>
          ) : (
            <>
              {day}
              {hasActivityDot && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                  <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                </div>
              )}
            </>
          )}
        </div>
      );
    }

    // Next month days to fill the grid
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    const remainingCells = totalCells - (firstDay + daysInMonth);
    
    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <div
          key={`next-${day}`}
          className="text-center py-2 text-sm text-gray-300 dark:text-gray-600"
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 flex-1 border border-gray-200 dark:border-gray-700">

      {/* Header with Title and Streak */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold dark:text-white text-gray-800">
          Activity Calendar
        </h3>
        
        {/* Streak Badge */}
        <div className="flex items-center gap-2 bg-orange-50 dark:bg-orange-900/20 px-3 py-1.5 rounded-full">
          <span className="text-orange-500 text-lg">🔥</span>
          <div className="flex flex-col">
            <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">Streak</span>
            <span className="text-sm font-bold text-orange-600 dark:text-orange-400">{streak} days</span>
          </div>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="flex justify-between items-center mb-4 px-2">
        <div className="flex gap-1">
          <button
            onClick={handlePrevYear}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors text-gray-600 dark:text-gray-400"
            aria-label="Previous year"
          >
            «
          </button>
          <button
            onClick={handlePrevMonth}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors text-gray-600 dark:text-gray-400"
            aria-label="Previous month"
          >
            ‹
          </button>
        </div>
        
        <span className="font-semibold text-gray-700 dark:text-gray-200">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </span>
        
        <div className="flex gap-1">
          <button
            onClick={handleNextMonth}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors text-gray-600 dark:text-gray-400"
            aria-label="Next month"
          >
            ›
          </button>
          <button
            onClick={handleNextYear}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors text-gray-600 dark:text-gray-400"
            aria-label="Next year"
          >
            »
          </button>
        </div>
      </div>

      {/* Week Days Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold text-gray-500 dark:text-gray-400 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {renderCalendarDays()}
      </div>
    </div>
  );
}