import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import { useState } from 'react';

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventText, setEventText] = useState('');
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleReset = () => {
    setSelectedDate(null);
    setEventText('');
    setEvents([]);
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);
  };

  const handleEventAdd = () => {
    if (selectedDate && eventText) {
      const newEvent = {
        date: selectedDate,
        month: currentDate.toLocaleString('default', { month: 'long' }),
        year: currentDate.getFullYear(),
        text: eventText,
      };
      setEvents([...events, newEvent]);
      setSelectedDate(null);
      setEventText('');
    }
  };

  const handleMonthChange = (increment) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + increment);
      return newDate;
    });
  };

  return (
    <div className="container">
      <div className="left">
        <div className="calendar">
          <div className="month">
            <i
              className="fas fa-angle-left prev"
              onClick={() => handleMonthChange(-1)}
            ></i>
            <div className="date">
              {currentDate.toLocaleString('default', { month: 'long' })}{' '}
              {currentDate.getFullYear()}
            </div>
            <i
              className="fas fa-angle-right next"
              onClick={() => handleMonthChange(1)}
            ></i>
          </div>
          <div className="weekdays">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <div className="days">
            {Array.from({ length: 30 }, (_, index) => (
              <div
                key={index + 1}
                className={`day ${selectedDate === index + 1 ? 'active' : ''}`}
                onClick={() => handleDayClick(index + 1)}
              >
                {index + 1}
              </div>
            ))}
          </div>
          {selectedDate && (
            <div className="event-input">
              <input
                type="text"
                value={eventText}
                onChange={(e) => setEventText(e.target.value)}
                placeholder="Enter event description"
              />
              <button onClick={handleEventAdd}>Add Event</button>
            </div>
          )}
          <div className="event-list">
            <h2>Events</h2>
            <ul>
              {events.map((event, index) => (
                <li key={index}>
                  <span>Date: {event.month} {event.date}, {event.year}</span>
                  <span>Event: {event.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="reset-button">
            <button onClick={handleReset}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
