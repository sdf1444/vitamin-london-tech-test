import React, { useEffect, useState } from 'react';

interface Event {
  name: string
  day: string
  startTime: string
  endTime: string
}

const Calendar = () => {
  const [formData, setFormData] = useState({
    name: '',
    day: '',
    startTime: '',
    endTime: ''
  });

  const [events, setEvents] = useState<Event[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEvents([...events, { ...formData }]);
    setFormData({ name: '', day: '', startTime: '', endTime: '' });
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th className='blank-header'></th>
            <th className='day'>Monday</th>
            <th className='day'>Tuesday</th>
            <th className='day'>Wednesday</th>
            <th className='day'>Thursday</th>
            <th className='day'>Friday</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 9 }, (_, i) => i + 9).map((time) => (
            <tr key={time}>
              <td className='time'>{time}:00</td>
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => {
                const eventsForTimeAndDay = events.filter(
                  (event) => {
                    const timeStamp = new Date("1970-01-01T" + (time < 10 ? '0' + time : time) + ":00" + "Z").getTime();
                    const startTime = new Date("1970-01-01T" + (Number(event.startTime) < 10 ? '0' + event.startTime : event.startTime) + "Z").getTime();
                    const endTime = new Date("1970-01-01T" + (Number(event.endTime) < 10 ? '0' + event.endTime : event.endTime) + "Z").getTime();
                    return startTime <= timeStamp && endTime > timeStamp && event.day == day
                  }
                )
                return (
                  <td key={day} className='cell'>
                    <div className='event-container'>
                      {eventsForTimeAndDay.map((event, i) => (
                        <div
                          className='event'
                          key={event.name}
                          style={{ width: `${100 / eventsForTimeAndDay.length}%` }}
                        >
                          {event.name}
                        </div>
                      ))}
                    </div>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <h3>Add Event</h3>
          <h4>Name:</h4>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <h4>Day</h4>
          <select name="day" value={formData.day} onChange={handleChange}>
            <option value="">-- Select a Day --</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
          </select>
          <h4>Start Time</h4>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
          />
          <h4>End Time</h4>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
          />
          <button type="submit">Add</button>
        </div>
      </form>
    </>
  )
}

export default Calendar