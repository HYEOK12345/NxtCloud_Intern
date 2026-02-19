import React, { useState, useEffect } from 'react';
import { login, logout, uploadReceipt, getReceipts } from './services/api';
import './App.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [receipts, setReceipts] = useState([]);
    const [filteredReceipts, setFilteredReceipts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('test@example.com');
    const [password, setPassword] = useState('password123');
    const [selectedReceipt, setSelectedReceipt] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            fetchReceipts();
        }
    }, []);

    useEffect(() => {
        filterReceipts();
    }, [receipts, startDate, endDate]);

    const fetchReceipts = async () => {
        try {
            const response = await getReceipts();
            setReceipts(response.receipts || []);
        } catch (err) {
            console.error('영수증 조회 실패:', err);
        }
    };

    const filterReceipts = () => {
        let filtered = [...receipts];
        if (startDate) {
            filtered = filtered.filter(r => r.date >= startDate);
        }
        if (endDate) {
            filtered = filtered.filter(r => r.date <= endDate);
        }
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        setFilteredReceipts(filtered);
    };

    const clearFilter = () => {
        setStartDate('');
        setEndDate('');
    };

    const getStatistics = () => {
        const total = filteredReceipts.reduce((sum, r) => sum + (r.total_amount || 0), 0);
        const count = filteredReceipts.length;
        const average = count > 0 ? total / count : 0;
        const maxReceipt = filteredReceipts.reduce((max, r) => (r.total_amount > (max?.total_amount || 0)) ? r : max, null);
        return { total, count, average, maxReceipt };
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await login(email, password);
            if (response.success) {
                setIsLoggedIn(true);
                setUser(response.user);
                fetchReceipts();
            }
        } catch (err) {
            setError('로그인 실패: 이메일 또는 비밀번호를 확인하세요.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        setIsLoggedIn(false);
        setUser(null);
        setReceipts([]);
        setFilteredReceipts([]);
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setLoading(true);
        setError(null);
        try {
            await uploadReceipt(file);
            alert('영수증이 성공적으로 분석되었습니다!');
            fetchReceipts();
        } catch (err) {
            setError('업로드 실패: 다시 시도해주세요.');
        } finally {
            setLoading(false);
            e.target.value = '';
        }
    };

    const handleCardClick = (receipt) => {
        setSelectedReceipt(receipt);
    };

    const closeModal = () => {
        setSelectedReceipt(null);
    };

    const stats = getStatistics();

    if (!isLoggedIn) {
        return (
            <div className="login-container">
                <div className="login-box">
                    <div className="login-header">
                        <span className="login-icon">🧾</span>
                        <h1>영수증 분석 시스템</h1>
                        <p className="login-subtitle">AI 기반 스마트 영수증 관리 서비스</p>
                    </div>
                    <form onSubmit={handleLogin}>
                        <div className="input-group">
                            <label>이메일</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일을 입력하세요" />
                        </div>
                        <div className="input-group">
                            <label>비밀번호</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호를 입력하세요" />
                        </div>
                        {error && <p className="error">{error}</p>}
                        <button type="submit" className="login-btn" disabled={loading}>
                            {loading ? '로그인 중...' : '로그인'}
                        </button>
                    </form>
                    <div className="demo-info">
                        <p>테스트 계정</p>
                        <span>test@example.com / password123</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="app-container">
            <header className="app-header">
                <div className="header-left">
                    <span className="header-icon">🧾</span>
                    <h1>영수증 분석 시스템</h1>
                </div>
                <div className="header-right">
                    <span className="user-name">👤 {user?.name || '사용자'}님</span>
                    <button onClick={handleLogout} className="logout-btn">로그아웃</button>
                </div>
            </header>

            <main className="main-content">
                <section className="dashboard">
                    <h2 className="section-title">📊 지출 현황</h2>
                    <div className="stat-grid">
                        <div className="stat-card primary">
                            <div className="stat-icon">💰</div>
                            <div className="stat-info">
                                <p className="stat-label">총 지출</p>
                                <p className="stat-value">${stats.total.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="stat-card success">
                            <div className="stat-icon">🧾</div>
                            <div className="stat-info">
                                <p className="stat-label">영수증 수</p>
                                <p className="stat-value">{stats.count}개</p>
                            </div>
                        </div>
                        <div className="stat-card warning">
                            <div className="stat-icon">📈</div>
                            <div className="stat-info">
                                <p className="stat-label">평균 지출</p>
                                <p className="stat-value">${stats.average.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="stat-card danger">
                            <div className="stat-icon">🏆</div>
                            <div className="stat-info">
                                <p className="stat-label">최대 지출</p>
                                <p className="stat-value">${stats.maxReceipt?.total_amount?.toFixed(2) || '0.00'}</p>
                                <p className="stat-sub">{stats.maxReceipt?.store_name || '-'}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="upload-section">
                    <h2 className="section-title">📤 영수증 업로드</h2>
                    <div className="upload-box">
                        <input type="file" accept="image/*" onChange={handleUpload} disabled={loading} id="file-upload" />
                        <label htmlFor="file-upload" className="upload-label">
                            <span className="upload-icon">{loading ? '⏳' : '📷'}</span>
                            <span className="upload-text">{loading ? '분석 중...' : '클릭하여 영수증 이미지 업로드'}</span>
                            <span className="upload-hint">JPG, PNG 파일 지원</span>
                        </label>
                    </div>
                    {error && <p className="error">{error}</p>}
                </section>

                <section className="filter-section">
                    <h2 className="section-title">📅 기간 조회</h2>
                    <div className="filter-box">
                        <div className="filter-inputs">
                            <div className="filter-group">
                                <label>시작일</label>
                                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                            </div>
                            <span className="filter-separator">~</span>
                            <div className="filter-group">
                                <label>종료일</label>
                                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                            </div>
                        </div>
                        <button onClick={clearFilter} className="clear-btn">초기화</button>
                    </div>
                </section>

                <section className="receipts-section">
                    <div className="section-header">
                        <h2 className="section-title">📋 영수증 목록</h2>
                        <div className="section-actions">
                            <span className="receipt-count">{filteredReceipts.length}개</span>
                            <button onClick={fetchReceipts} className="refresh-btn">🔄 새로고침</button>
                        </div>
                    </div>
                    {filteredReceipts.length === 0 ? (
                        <div className="empty-state">
                            <span className="empty-icon">📭</span>
                            <p>등록된 영수증이 없습니다.</p>
                            <p className="empty-hint">위에서 영수증을 업로드해보세요!</p>
                        </div>
                    ) : (
                        <div className="receipts-grid">
                            {filteredReceipts.map((r, index) => (
                                <div key={r.receipt_id} className="receipt-card" onClick={() => handleCardClick(r)}>
                                    <div className="card-header">
                                        <span className="receipt-number">#{index + 1}</span>
                                        <span className="receipt-date">{r.date || '-'}</span>
                                    </div>
                                    <h3 className="store-name">{r.store_name || '알 수 없음'}</h3>
                                    <div className="card-footer">
                                        <span className="receipt-amount">${r.total_amount?.toFixed(2) || '0.00'}</span>
                                        <span className="receipt-items">{r.items?.length || 0}개 항목</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>

            <footer className="app-footer">
                <p>© 2026 영수증 분석 시스템 | AWS + React + FastAPI</p>
            </footer>

            {selectedReceipt && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={closeModal}>✕</button>
                        <div className="modal-header">
                            <h2>🧾 영수증 상세</h2>
                        </div>
                        <div className="modal-body">
                            <div className="detail-card">
                                <div className="detail-row">
                                    <span className="detail-icon">🏪</span>
                                    <div className="detail-info">
                                        <span className="detail-label">상호명</span>
                                        <span className="detail-value">{selectedReceipt.store_name || '-'}</span>
                                    </div>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-icon">📅</span>
                                    <div className="detail-info">
                                        <span className="detail-label">날짜</span>
                                        <span className="detail-value">{selectedReceipt.date || '-'}</span>
                                    </div>
                                </div>
                                <div className="detail-row highlight">
                                    <span className="detail-icon">💵</span>
                                    <div className="detail-info">
                                        <span className="detail-label">총액</span>
                                        <span className="detail-value">${selectedReceipt.total_amount?.toFixed(2) || '0.00'}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="items-section">
                                <h3>📦 구매 항목</h3>
                                {selectedReceipt.items && selectedReceipt.items.length > 0 ? (
                                    <table className="items-table">
                                        <thead>
                                            <tr>
                                                <th>상품명</th>
                                                <th>수량</th>
                                                <th>가격</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedReceipt.items.map((item, idx) => (
                                                <tr key={idx}>
                                                    <td>{item.name}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>${item.price?.toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="no-items">항목 정보가 없습니다.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
