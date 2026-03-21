import { useEffect, useRef } from 'react';

function parsebookedSeats(bookedSeatsStr) {
    if (!bookedSeatsStr || bookedSeatsStr.trim() === '') return new Set();
    return new Set(
        bookedSeatsStr.split(',').map((s) => parseInt(s.trim(), 10)).filter((n) => !isNaN(n))
    );
}

function SeatIcon({ seatNumber, isBooked }) {
    return (
        <button
            className={`seat-icon ${isBooked ? 'seat-icon--booked' : 'seat-icon--available'}`}
            title={`Ghế ${seatNumber} — ${isBooked ? 'Đã đặt' : 'Còn trống'}`}
            aria-label={`Ghế ${seatNumber} ${isBooked ? 'đã đặt' : 'còn trống'}`}
            disabled
        >
            <svg
                className="seat-icon__svg"
                viewBox="0 0 24 28"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Seat back */}
                <rect x="3" y="2" width="18" height="16" rx="4" ry="4" />
                {/* Seat bottom */}
                <rect x="2" y="16" width="20" height="7" rx="3" ry="3" />
                {/* Armrests */}
                <rect x="0" y="14" width="3" height="10" rx="1.5" ry="1.5" />
                <rect x="21" y="14" width="3" height="10" rx="1.5" ry="1.5" />
            </svg>
            <span className="seat-icon__number">{seatNumber}</span>
        </button>
    );
}

function formatPrice(price) {
    if (price == null) return '—';
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(price);
}

export default function SeatMap({ trip, seatData, loading, error, onClose }) {
    const overlayRef = useRef(null);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    // Close on overlay click
    const handleOverlayClick = (e) => {
        if (e.target === overlayRef.current) onClose();
    };

    const bookedSet = seatData ? parsebookedSeats(seatData.bookedSeats) : new Set();
    const totalSeats = seatData?.totalSeat || 0;

    // Build rows of 4 seats (2 left + aisle + 2 right)
    const seatRows = [];
    for (let i = 1; i <= totalSeats; i += 4) {
        const row = [];
        for (let j = i; j < i + 4 && j <= totalSeats; j++) {
            row.push(j);
        }
        seatRows.push(row);
    }

    return (
        <div className="seat-overlay" ref={overlayRef} onClick={handleOverlayClick}>
            <div className="seat-modal glass-card fade-in-up">
                {/* Header */}
                <div className="seat-modal__header">
                    <div className="seat-modal__title-row">
                        <h2 className="seat-modal__title">Sơ đồ ghế</h2>
                        <button
                            className="seat-modal__close"
                            onClick={onClose}
                            aria-label="Đóng"
                        >
                            ✕
                        </button>
                    </div>
                    {trip && (
                        <div className="seat-modal__trip-info">
                            <span className="seat-modal__route">
                                {trip.departure} → {trip.destination}
                            </span>
                            {seatData && (
                                <span className="seat-modal__price">
                                    {formatPrice(seatData.price)}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Legend */}
                <div className="seat-legend">
                    <div className="seat-legend__item">
                        <span className="seat-legend__dot seat-legend__dot--available"></span>
                        <span>Còn trống</span>
                    </div>
                    <div className="seat-legend__item">
                        <span className="seat-legend__dot seat-legend__dot--booked"></span>
                        <span>Đã đặt</span>
                    </div>
                </div>

                {/* Content */}
                {loading && (
                    <div className="seat-modal__loading">
                        <div className="spinner"></div>
                        <p>Đang tải sơ đồ ghế...</p>
                    </div>
                )}

                {error && (
                    <div className="seat-modal__error">
                        <p>⚠️ {error}</p>
                    </div>
                )}

                {!loading && !error && seatData && (
                    <>
                        {/* Bus front indicator */}
                        <div className="seat-bus-front">
                            <span>🚌 Đầu xe</span>
                        </div>

                        {/* Seat grid */}
                        <div className="seat-grid">
                            {seatRows.map((row, rowIndex) => (
                                <div className="seat-row" key={rowIndex}>
                                    <div className="seat-row__left">
                                        {row.slice(0, 2).map((seatNum) => (
                                            <SeatIcon
                                                key={seatNum}
                                                seatNumber={seatNum}
                                                isBooked={bookedSet.has(seatNum)}
                                            />
                                        ))}
                                    </div>
                                    <div className="seat-row__aisle"></div>
                                    <div className="seat-row__right">
                                        {row.slice(2).map((seatNum) => (
                                            <SeatIcon
                                                key={seatNum}
                                                seatNumber={seatNum}
                                                isBooked={bookedSet.has(seatNum)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary */}
                        <div className="seat-summary">
                            <span className="seat-summary__item">
                                Tổng: <strong>{totalSeats}</strong> ghế
                            </span>
                            <span className="seat-summary__item">
                                Đã đặt: <strong>{bookedSet.size}</strong>
                            </span>
                            <span className="seat-summary__item seat-summary__item--highlight">
                                Còn trống: <strong>{totalSeats - bookedSet.size}</strong>
                            </span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
