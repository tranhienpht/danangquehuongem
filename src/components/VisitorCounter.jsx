/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    increment,
    collection,
    query,
    where,
    getDocs,
    serverTimestamp,
    onSnapshot
} from 'firebase/firestore';
import { BarChart2 } from 'lucide-react';
import './VisitorCounter.css';
import { v4 as uuidv4 } from 'uuid'; // Generate unique ID for session

const VisitorCounter = () => {
    const [totalVisits, setTotalVisits] = useState(0);
    const [onlineUsers, setOnlineUsers] = useState(0);

    useEffect(() => {
        // 1. Logic Đếm Lượt Truy Cập (Total Visits) kèm Fallback LocalStorage
        const trackVisit = async () => {
            // Lấy số liệu cache tạm trên máy người dùng trước để tránh hiển thị 0
            const localCount = localStorage.getItem('visitorCount');
            if (localCount) {
                setTotalVisits(parseInt(localCount, 10));
            }

            try {
                const statsRef = doc(db, 'statistics', 'website_visits');
                const docSnap = await getDoc(statsRef);

                let currentCount = 0;

                // Nếu chưa có document thì tạo mới
                if (!docSnap.exists()) {
                    await setDoc(statsRef, { count: 0 }).catch(e => console.warn("Lưu firebase mới bị từ chối:", e));
                } else {
                    currentCount = docSnap.data().count;
                }

                // Tăng lượt đếm nếu đây là phiên truy cập mới 
                if (!sessionStorage.getItem('hasVisited')) {
                    const newCount = currentCount + 1;

                    // Thử lưu lên Firebase
                    try {
                        await updateDoc(statsRef, {
                            count: increment(1)
                        });
                        setTotalVisits(newCount);
                        localStorage.setItem('visitorCount', newCount.toString()); // Lưu Backup
                    } catch (fbError) {
                        console.warn("⚠️ Firebase chặn đếm (Permission Denied/Quota). Chuyển sang lưu cục bộ:", fbError);
                        // Fallback chỉ đếm trên máy hiện tại
                        const fallbackCount = parseInt(localCount || "0") + 1;
                        setTotalVisits(fallbackCount);
                        localStorage.setItem('visitorCount', fallbackCount.toString());
                    }

                    sessionStorage.setItem('hasVisited', 'true');
                }

                // Theo dõi dữ liệu real-time
                const unsubscribeVisits = onSnapshot(statsRef, (doc) => {
                    if (doc.exists() && doc.data().count > 0) {
                        const cloudCount = doc.data().count;
                        setTotalVisits(cloudCount);
                        localStorage.setItem('visitorCount', cloudCount.toString()); // Đồng bộ cloud về máy
                    }
                }, (error) => {
                    console.warn("⚠️ Không thể đọc Real-time Firebase:", error);
                });

                return unsubscribeVisits;
            } catch (error) {
                console.error("Lỗi hệ thống đếm truy cập:", error);
            }
        };

        const initTracking = async () => {
            await trackVisit();
        };
        initTracking();

    }, []);

    useEffect(() => {
        // 2. Logic Đếm Người Online (Sử dụng Heartbeat)
        let sessionId = sessionStorage.getItem('sessionId');
        if (!sessionId) {
            // Cài đặt thư viện uuid hoặc dùng math random
            sessionId = Math.random().toString(36).substring(2, 15);
            sessionStorage.setItem('sessionId', sessionId);
        }

        const onlineRef = doc(db, 'active_users', sessionId);

        const keepAlive = async () => {
            try {
                await setDoc(onlineRef, {
                    lastActive: serverTimestamp()
                });
            } catch (error) {
                console.error("Lỗi cập nhật Online:", error);
            }
        };

        // Gửi nhịp tim (heartbeat) lên firestore mỗi phút để báo đang online
        keepAlive();
        const heartbeatInterval = setInterval(keepAlive, 60000);

        // Đếm số lượng người có tín hiệu online 2 phút đổ lại đây
        const countOnlineUsers = () => {
            const usersRef = collection(db, 'active_users');
            const q = query(usersRef);

            return onSnapshot(q, (snapshot) => {
                let count = 0;
                // Nếu muốn chính xác có thể check timestamp < 2 mins. Nhưng do firestore security đôi khi block serverTimestamp comparison.
                // Hàm onSnapshot đếm mọi doc có trong bảng
                const now = new Date().getTime();
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    if (data.lastActive) {
                        const lastActiveTime = data.lastActive.toDate?.()?.getTime() || data.lastActive.toMillis?.() || 0;
                        // Phải có hoạt động trong vòng 2 phút qua
                        if (now - lastActiveTime < 120000) {
                            count++;
                        }
                    } else {
                        // Fallback nếu serverTimestamp chưa update ngay
                        count++;
                    }
                });

                // Tránh lỗi chưa nạp kịp nên bị 0
                setOnlineUsers(Math.max(count, 1));
            });
        };

        const unsubscribeOnline = countOnlineUsers();

        // Cleanup: Xóa trạng thái online khi tắt trang web 
        // (Lưu ý: event unload không lúc nào cũng chạy đc FireStore API, nên dựa vào timestamp heartbeat là phụ chính).
        const handleUnload = async () => {
            // Không set await vì trang web sắp đóng
            setDoc(onlineRef, { status: "offline" });
        };
        window.addEventListener('beforeunload', handleUnload);

        return () => {
            clearInterval(heartbeatInterval);
            unsubscribeOnline();
            window.removeEventListener('beforeunload', handleUnload);
        };
    }, []);

    return (
        <div className="visitor-counter-container">
            <div className="visitor-header">
                <BarChart2 size={16} className="chart-icon" />
                <span>THỐNG KÊ</span>
            </div>
            <div className="visitor-divider"></div>
            <div className="visitor-stats">
                <div className="stat-row">
                    <span className="stat-label">Truy cập:</span>
                    <span className="stat-value">{totalVisits.toLocaleString('vi-VN')}</span>
                </div>
                <div className="stat-row">
                    <span className="stat-label">
                        <span className="online-dot"></span> Online:
                    </span>
                    <span className="stat-value online-value">{onlineUsers}</span>
                </div>
            </div>
        </div>
    );
};

export default VisitorCounter;
