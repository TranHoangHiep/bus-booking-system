import { useState } from 'react';

export default function SearchForm({ onSearch, loading }) {
    const [form, setForm] = useState({
        departure: '',
        destination: '',
        day: '',
        seats: 1,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === 'seats' ? Number(value) : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(form);
    };

    return (
        <form className="search-form glass-card" onSubmit={handleSubmit}>
            <div className="search-form__grid">
                <div className="form-group">
                    <label className="form-group__label" htmlFor="departure">Điểm đi</label>
                    <input
                        id="departure"
                        className="form-group__input"
                        type="text"
                        name="departure"
                        placeholder="VD: Hà Nội"
                        value={form.departure}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-group__label" htmlFor="destination">Điểm đến</label>
                    <input
                        id="destination"
                        className="form-group__input"
                        type="text"
                        name="destination"
                        placeholder="VD: Hồ Chí Minh"
                        value={form.destination}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-group__label" htmlFor="day">Ngày đi</label>
                    <input
                        id="day"
                        className="form-group__input"
                        type="date"
                        name="day"
                        value={form.day}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-group__label" htmlFor="seats">Số ghế</label>
                    <input
                        id="seats"
                        className="form-group__input"
                        type="number"
                        name="seats"
                        min="1"
                        max="50"
                        value={form.seats}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <button className="btn btn--primary btn--full" type="submit" disabled={loading}>
                {loading ? (
                    <>
                        <span className="spinner"></span>
                        Đang tìm kiếm...
                    </>
                ) : (
                    <>🔍 Tìm chuyến xe</>
                )}
            </button>
        </form>
    );
}
