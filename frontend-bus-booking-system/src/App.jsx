import { useState, useCallback } from 'react';
import SearchForm from './components/SearchForm';
import TripResults from './components/TripResults';
import Pagination from './components/Pagination';
import SeatMap from './components/SeatMap';
import './index.css';

const PAGE_SIZE = 10;

export default function App() {
  const [trips, setTrips] = useState([]);
  const [paging, setPaging] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);
  const [lastSearch, setLastSearch] = useState(null);

  // Seat map state
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [seatData, setSeatData] = useState(null);
  const [seatLoading, setSeatLoading] = useState(false);
  const [seatError, setSeatError] = useState(null);

  const fetchTrips = useCallback(async (searchParams, pageIndex = 0) => {
    setLoading(true);
    setError(null);

    const body = {
      departure: searchParams.departure,
      destination: searchParams.destination,
      day: searchParams.day,
      seats: searchParams.seats,
      paging: {
        page_index: pageIndex,
        page_size: PAGE_SIZE,
      },
    };

    try {
      const res = await fetch('/bus-booking/api/v1/trips/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error(`Lỗi ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      setTrips(data.data || []);
      setPaging(data.paging || null);
      setSearched(true);
    } catch (err) {
      setError(err.message || 'Đã xảy ra lỗi khi tìm kiếm.');
      setTrips([]);
      setPaging(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = (searchParams) => {
    setLastSearch(searchParams);
    fetchTrips(searchParams, 0);
  };

  const handlePageChange = (newPageIndex) => {
    if (lastSearch) {
      fetchTrips(lastSearch, newPageIndex);
    }
  };

  const handleTripClick = async (trip) => {
    setSelectedTrip(trip);
    setSeatData(null);
    setSeatError(null);
    setSeatLoading(true);

    try {
      const res = await fetch(`/bus-booking/api/v1/trips/${trip.id}/seats`);
      if (!res.ok) {
        throw new Error(`Lỗi ${res.status}: ${res.statusText}`);
      }
      const data = await res.json();
      setSeatData(data);
    } catch (err) {
      setSeatError(err.message || 'Không thể tải thông tin ghế.');
    } finally {
      setSeatLoading(false);
    }
  };

  const handleCloseSeatMap = () => {
    setSelectedTrip(null);
    setSeatData(null);
    setSeatError(null);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-header__icon">🚌</div>
        <h1 className="app-header__title">Bus Booking</h1>
        <p className="app-header__subtitle">Tìm kiếm chuyến xe một cách dễ dàng</p>
      </header>

      <SearchForm onSearch={handleSearch} loading={loading} />

      {error && (
        <div className="error-state">
          <p className="error-state__text">⚠️ {error}</p>
        </div>
      )}

      <TripResults
        trips={trips}
        loading={loading}
        searched={searched}
        onTripClick={handleTripClick}
      />

      <Pagination paging={paging} onPageChange={handlePageChange} />

      {selectedTrip && (
        <SeatMap
          trip={selectedTrip}
          seatData={seatData}
          loading={seatLoading}
          error={seatError}
          onClose={handleCloseSeatMap}
        />
      )}
    </div>
  );
}
