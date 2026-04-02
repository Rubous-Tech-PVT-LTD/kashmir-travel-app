import { useState } from 'react';

const ChevronDown = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3dba8f" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const HotelIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h15a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z" />
  </svg>
);

export default function TripItinerary({ tripData }) {
  const [expandedDay, setExpandedDay] = useState(null);

  if (!tripData || !tripData.itinerary || tripData.itinerary.length === 0) {
    return null;
  }

  const toggleDay = (dayNumber) => {
    setExpandedDay(expandedDay === dayNumber ? null : dayNumber);
  };

  return (
    <div style={{ marginTop: '40px' }}>
      <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1a2b4a', marginBottom: '20px' }}>
        Day-by-Day Itinerary
      </h3>

      <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
        {tripData.itinerary.map((day, index) => (
          <div key={index} style={{ borderBottom: index < tripData.itinerary.length - 1 ? '1px solid #e2e8f0' : 'none' }}>
            {/* Day Header */}
            <div
              onClick={() => toggleDay(index)}
              style={{
                padding: '18px 20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: expandedDay === index ? '#f8fafc' : '#fff',
                transition: 'background-color 0.2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '8px',
                    backgroundColor: '#d1fae5',
                    color: '#047857',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontSize: '16px',
                  }}
                >
                  {day.day}
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: '700', color: '#1a2b4a' }}>
                    {day.title}
                  </h4>
                  <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                    {day.activities ? day.activities.length + ' Activities' : 'No activities'}
                  </p>
                </div>
              </div>
              <div
                style={{
                  transform: expandedDay === index ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s',
                  color: '#94a3b8',
                }}
              >
                <ChevronDown />
              </div>
            </div>

            {/* Day Details */}
            {expandedDay === index && (
              <div style={{ padding: '18px 20px', backgroundColor: '#fff', borderTop: '1px solid #e2e8f0' }}>
                {/* Activities */}
                {day.activities && day.activities.length > 0 && (
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <LocationIcon />
                      <h5 style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>
                        Activities
                      </h5>
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '20px', listStyle: 'none' }}>
                      {day.activities.map((activity, idx) => (
                        <li
                          key={idx}
                          style={{
                            fontSize: '14px',
                            color: '#334155',
                            marginBottom: '8px',
                            paddingLeft: '0',
                            position: 'relative',
                          }}
                        >
                          <span style={{ color: '#3dba8f', fontWeight: '700', marginRight: '8px' }}>•</span>
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Accommodation */}
                {day.accommodation && (
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <HotelIcon />
                      <h5 style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>
                        Accommodation
                      </h5>
                    </div>
                    <p style={{ margin: 0, fontSize: '14px', color: '#334155', paddingLeft: '24px' }}>
                      {day.accommodation}
                    </p>
                  </div>
                )}

                {/* Meals */}
                {day.meals && (
                  <div style={{ marginBottom: '20px' }}>
                    <h5 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>
                      Meals
                    </h5>
                    <p style={{ margin: 0, fontSize: '14px', color: '#334155', paddingLeft: '24px' }}>
                      {day.meals}
                    </p>
                  </div>
                )}

                {/* Notes */}
                {day.notes && (
                  <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#eff6ff', borderLeft: '3px solid #3dba8f', borderRadius: '4px' }}>
                    <p style={{ margin: 0, fontSize: '13px', color: '#334155' }}>
                      <strong>Note: </strong>{day.notes}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
