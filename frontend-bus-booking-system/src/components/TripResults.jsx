function formatDateTime(isoString) {
    if (!isoString) return '—';
    const date = new Date(isoString);
    return date.toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

function formatPrice(price) {
    if (price == null) return '—';
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(price);
}

function TripCard({ trip, index }) {
    return (
        <div
            className="trip-card glass-card fade-in-up"
            style={{ animationDelay: `${index * 0.08}s` }}
        >
            <div className="trip-card__route">
                <div className="trip-card__cities">
                    <span className="trip-card__city">{trip.departure}</span>
                    <span className="trip-card__arrow">→</span>
                    <span className="trip-card__city">{trip.destination}</span>
                </div>
                <div className="trip-card__times">
                    <span className="trip-card__time-item">
                        🕐 Khởi hành: {formatDateTime(trip.departureTime)}
                    </span>
                    <span className="trip-card__time-item">
                        📍 Đến nơi: {formatDateTime(trip.arrivalTime)}
                    </span>
                </div>
            </div>
            <div className="trip-card__meta">
                <span className="trip-card__price">{formatPrice(trip.price)}</span>
                <span className="trip-card__seats">
                    {trip.availableSeats} ghế trống
                </span>
            </div>
        </div>
    );
}

function SkeletonLoader() {
    return (
        <div className="skeleton">
            {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton__card" />
            ))}
        </div>
    );
}

export default function TripResults({ trips, loading, searched }) {
    if (loading) {
        return (
            <div className="results-section">
                <SkeletonLoader />
            </div>
        );
    }

    if (!searched) return null;

    if (!trips || trips.length === 0) {
        return (
            <div className="results-section">
                <div className="empty-state glass-card">
                    <div className="empty-state__icon">🚌</div>
                    <h3 className="empty-state__title">Không tìm thấy chuyến xe</h3>
                    <p className="empty-state__text">
                        Hãy thử thay đổi điểm đi, điểm đến hoặc ngày để tìm chuyến phù hợp.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="results-section">
            <div className="results-section__header">
                <h2 className="results-section__title">Kết quả tìm kiếm</h2>
                <span className="results-section__count">{trips.length} chuyến</span>
            </div>
            <div className="results-grid">
                {trips.map((trip, index) => (
                    <TripCard key={trip.id} trip={trip} index={index} />
                ))}
            </div>
        </div>
    );
}
