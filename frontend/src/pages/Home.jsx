import { useState, useEffect } from 'react';
import ItineraryCard from '../components/ItineraryCard';

const Home = () => {
    const [itineraries, setItineraries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItineraries = async () => {
            try {
                // Testing backend connectivity
                const response = await fetch('/api/itineraries');
                const result = await response.json();
                
                // If API returns empty data, we populate with some dummy data for now
                // to visualize the UI
                if (result.data && result.data.length === 0) {
                     setItineraries([
                         {
                             _id: '1',
                             title: 'Srinagar to Gulmarg Weekend Getaway',
                             price: 15499,
                             image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=800&auto=format&fit=crop'
                         },
                         {
                             _id: '2',
                             title: 'Pahalgam Valley Expedition - 4 Days',
                             price: 22999,
                             image: 'https://images.unsplash.com/photo-1502175353174-a7a70e73b362?q=80&w=800&auto=format&fit=crop'
                         },
                         {
                             _id: '3',
                             title: 'Sonamarg Trekking Experience',
                             price: 18500,
                             image: 'https://images.unsplash.com/photo-1626024483726-ad0749e756c6?q=80&w=800&auto=format&fit=crop'
                         }
                     ]);
                } else {
                     setItineraries(result.data);
                }
               
            } catch (error) {
                console.error("Error fetching itineraries:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchItineraries();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-20 animate-pulse">
                <div className="text-2xl font-semibold text-sky-500">Loading Itineraries...</div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-slate-100">Explore Our Premium Kashmiri Itineraries</h2>
            {itineraries.length === 0 ? (
                <div className="bg-slate-800 border border-slate-700 p-8 rounded-xl text-center shadow-inner">
                    <p className="text-slate-400">No itineraries found. Start by adding one in the database!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {itineraries.map((itinerary) => (
                        <ItineraryCard 
                            key={itinerary._id}
                            title={itinerary.title}
                            price={itinerary.price}
                            image={itinerary.image || itinerary.coverImage}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
