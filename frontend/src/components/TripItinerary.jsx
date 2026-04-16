import { useState } from 'react';
import { ChevronDown as ChevronDownIcon, MapPin, Building2 } from 'lucide-react';

const ChevronDown = () => (
  <ChevronDownIcon width={18} height={18} strokeWidth={2} />
);

const LocationIcon = () => (
  <MapPin width={16} height={16} color="#3dba8f" strokeWidth={2} />
);

const HotelIcon = () => (
  <Building2 width={16} height={16} color="#64748b" strokeWidth={2} />
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
    <div className="mt-10">
      <h3 className="mb-5 text-2xl font-bold text-[#1a2b4a]">
        Day-by-Day Itinerary
      </h3>

      <div className="overflow-hidden rounded-xl border border-slate-200">
        {tripData.itinerary.map((day, index) => (
          <div key={index} className={index < tripData.itinerary.length - 1 ? 'border-b border-slate-200' : ''}>
            {/* Day Header */}
            <div
              onClick={() => toggleDay(index)}
              className={`flex cursor-pointer items-center justify-between px-5 py-4.5 transition-colors ${expandedDay === index ? 'bg-slate-50' : 'bg-white'}`}
            >
              <div className="flex flex-1 items-center gap-3.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-100 text-base font-bold text-emerald-700">
                  {day.day}
                </div>
                <div>
                  <h4 className="mb-1 text-base font-bold text-[#1a2b4a]">
                    {day.title}
                  </h4>
                  <p className="text-[13px] text-slate-500">
                    {day.activities ? day.activities.length + ' Activities' : 'No activities'}
                  </p>
                </div>
              </div>
              <div className={`text-slate-400 transition-transform duration-300 ${expandedDay === index ? 'rotate-180' : 'rotate-0'}`}>
                <ChevronDown />
              </div>
            </div>

            {/* Day Details */}
            {expandedDay === index && (
              <div className="border-t border-slate-200 bg-white px-5 py-4.5">
                {/* Activities */}
                {day.activities && day.activities.length > 0 && (
                  <div className="mb-5">
                    <div className="mb-3 flex items-center gap-2">
                      <LocationIcon />
                      <h5 className="text-[13px] font-bold uppercase text-slate-600">
                        Activities
                      </h5>
                    </div>
                    <ul className="space-y-2 pl-5">
                      {day.activities.map((activity, idx) => (
                        <li key={idx} className="text-sm text-slate-700">
                          <span className="mr-2 font-bold text-emerald-500">•</span>
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Accommodation */}
                {day.accommodation && (
                  <div className="mb-5">
                    <div className="mb-3 flex items-center gap-2">
                      <HotelIcon />
                      <h5 className="text-[13px] font-bold uppercase text-slate-600">
                        Accommodation
                      </h5>
                    </div>
                    <p className="pl-6 text-sm text-slate-700">
                      {day.accommodation}
                    </p>
                  </div>
                )}

                {/* Meals */}
                {day.meals && (
                  <div className="mb-5">
                    <h5 className="mb-3 text-[13px] font-bold uppercase text-slate-600">
                      Meals
                    </h5>
                    <p className="pl-6 text-sm text-slate-700">
                      {day.meals}
                    </p>
                  </div>
                )}

                {/* Notes */}
                {day.notes && (
                  <div className="mt-4 rounded bg-blue-50 p-3">
                    <p className="border-l-3 border-emerald-500 pl-3 text-[13px] text-slate-700">
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
