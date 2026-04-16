import React from 'react';
import HTMLFlipBook from 'react-pageflip';

const Page = React.forwardRef((props, ref) => {
    return (
        <div className="demoPage" ref={ref} style={{ backgroundColor: '#fff', border: 'solid 1px #c2b5a3', overflow: 'hidden' }}>
            <div style={{ padding: '0', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <img 
                    src={props.image} 
                    onError={(e) => { 
                        e.target.onerror = null; 
                        e.target.src = `https://placehold.co/600x900/e0f2f1/00695c?text=Trang+${props.number}`; 
                    }}
                    alt={`Trang ${props.number}`} 
                    style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', backgroundColor: '#fff' }} 
                />
            </div>
        </div>
    );
});

const Doremon = () => {
    const pages = [
        "trang 01 bia.png",
        "trang 02 nobita.png",
        "trang 03.png",
        "trang 04.png",
        "trang 05.png",
        "trang 06.png",
        "trang 07.png",
        "trang 08.png",
        "trang 09.png",
    ].map(name => `${import.meta.env.BASE_URL}images/doremon/${encodeURI(name)}`);

    return (
        <div className="page-container" style={{ textAlign: 'center', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Học cùng Doremon</h1>
            <p style={{ marginBottom: '2rem' }}>Khám phá bài học qua tập truyện tranh hấp dẫn!</p>
            
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', maxWidth: '900px', margin: '0 auto', marginBottom: '2rem' }}>
                {/* HTMLFlipBook require width and height to calculate aspect ratio */}
                <HTMLFlipBook 
                    width={400} 
                    height={550} 
                    size="stretch" 
                    minWidth={315} 
                    maxWidth={500} 
                    minHeight={400} 
                    maxHeight={700} 
                    maxShadowOpacity={0.5} 
                    showCover={true} 
                    mobileScrollSupport={true}
                    className="demo-book"
                >
                    {pages.map((imgSrc, index) => (
                        <Page key={index} number={index + 1} image={imgSrc} />
                    ))}
                </HTMLFlipBook>
            </div>
            
            <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#e0f2f1', borderRadius: '15px', textAlign: 'left', maxWidth: '800px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <h3 style={{ marginTop: 0, color: '#00695c' }}>💡 Hướng dẫn cập nhật hình ảnh của bạn:</h3>
                <p>Tôi đã thiết lập khung sách lật với 9 trang. Để hình ảnh của bạn hiện lên, bạn chỉ cần:</p>
                <ol style={{ lineHeight: '1.8' }}>
                    <li>Đổi tên 9 bức ảnh của bạn thành <strong>page1.jpg, page2.jpg, ... page9.jpg</strong>.</li>
                    <li>Chép các ảnh này vào thư mục <strong>public/images/doremon/</strong> trong mã nguồn hiện tại của bạn. (Tôi đã tạo sẵn thư mục đó rồi).</li>
                    <li>Ảnh của bạn sẽ tự động thay thế các trang chữ mặc định này!</li>
                </ol>
            </div>
        </div>
    );
};

export default Doremon;
