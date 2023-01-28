import React, { useState } from 'react';

interface Event {
  // interface for events with name, day, and time properties
  name: string
  day: string
  time: string
}

const Calendar = () => {
  const [formData, setFormData] = useState({
    name: '',
    day: '',
    time: ''
  })

  // state for array of events, initially empty
  const [events, setEvents] = useState<Event[]>([])

  // function to handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent page refresh on form submit
    if (formData.day !== "" && formData.time !== "") {
      setEvents([...events, { ...formData }]);
      setFormData({ name: '', day: '', time: '' });
    }
  }

  return (
    <>
      {/* Calendar table */}
      <table>
        <thead>
          <tr>
            <th className='blank-header-cell'></th>
            <th className='day'>Monday</th>
            <th className='day'>Tuesday</th>
            <th className='day'>Wednesday</th>
            <th className='day'>Thursday</th>
            <th className='day'>Friday</th>
          </tr>
        </thead>
        <tbody>
          {/* Iterate through times to create rows */}
          {Array.from({ length: 9 }, (_, i) => i + 9).map((time) => (
            <tr key={time}>
              <td className='time'>{time}:00</td>
              {/* Iterate through days to create cells */}
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => {
                // filter events by time and day
                const eventsForTimeAndDay = events.filter(
                  (event) => event.time === `${time}:00` && event.day === day
                )
                return (
                  <td key={day} className='cell'>
                    {/* event container */}
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
      {/* form to add events */}
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
          <h4>Time</h4>
          <select name="time" value={formData.time} onChange={handleChange}>
            <option value="">-- Select a Time --</option>
            <option value="9:00">9:00</option>            
            <option value="10:00">10:00</option>
            <option value="11:00">11:00</option>
            <option value="12:00">12:00</option>
            <option value="13:00">13:00</option>
            <option value="14:00">14:00</option>
            <option value="15:00">15:00</option>
            <option value="16:00">16:00</option>
            <option value="17:00">17:00</option>
          </select>
          <button type="submit">Add</button>
        </div>
      </form>
    </>
  )
}

export default Calendar