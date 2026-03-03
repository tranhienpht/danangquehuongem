import React, { useState } from 'react';
import { Send } from 'lucide-react';
import './Nature.css';

const Nature = () => {
    const [answer, setAnswer] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (answer.trim()) {
            alert("Cảm ơn câu trả lời của em! Hãy chia sẻ với thầy cô và các bạn nhé.");
            setAnswer('');
        }
    };

    return (
        <div className="nature-page textbook-style">
            <header className="nature-header">
                <div className="header-content">
                    <h1>Địa lý & Thiên nhiên</h1>
                    <p>Khám phá vùng đất Đà Nẵng qua bài học</p>
                </div>
            </header>

            <div className="textbook-container">
                {/* Learning Objectives Box */}
                <section className="learning-objectives box-shadow-yellow">
                    <h3 className="objective-title">SAU BÀI HỌC NÀY, EM SẼ:</h3>
                    <ul className="objective-list-custom">
                        <li>Xác định được vị trí địa lí của thành phố Đà Nẵng mới trên bản đồ Việt Nam.</li>
                        <li>Mô tả được một số nét chính về tự nhiên (ví dụ: địa hình, khí hậu, ...) của thành phố Đà Nẵng có sử dụng lược đồ hoặc bản đồ.</li>
                        <li>Trình bày được một số hoạt động kinh tế ở thành phố Đà Nẵng.</li>
                        <li>Thể hiện được tình cảm với địa phương và sẵn sàng hành động bảo vệ môi trường xung quanh.</li>
                    </ul>
                </section>

                {/* Warm Up Section */}
                <section className="warm-up-section">
                    <div className="section-title-wrapper">
                        <div className="title-accent-bar yellow-bar"></div>
                        <h2 className="section-title dark-green">KHỞI ĐỘNG</h2>
                    </div>

                    <p className="bold-italic">Đố em?</p>

                    <div className="poem-question">
                        <p className="italic-text">Dòng sông yên ả giữa trời</p>
                        <p className="italic-text">Cây cầu rực rỡ sáng ngời về đêm</p>
                        <p className="italic-text">Xoay mình giữa sông êm đềm</p>
                        <p className="italic-text">Tự hào Đà Nẵng, gợi tên cầu gì ?</p>
                        <p className="bold-italic dark-green mt-1">(Là cây cầu gì?)</p>
                    </div>

                    <form className="answer-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="answer-input"
                            placeholder="Nhập câu trả lời của em..."
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                        />
                        <button type="submit" className="submit-btn dark-green-bg">
                            GỬI <Send size={16} className="send-icon" />
                        </button>
                    </form>

                    <p className="instruction-text mb-4">
                        Hãy chia sẻ hiểu biết của em về các địa danh của Đà Nẵng hoặc về nơi em đang ở với các bạn.
                    </p>
                </section>

                {/* Lesson Content 1 */}
                <section className="lesson-content">
                    <h2 className="content-heading dark-green">1. VỊ TRÍ ĐỊA LÍ CỦA THÀNH PHỐ ĐÀ NẴNG</h2>

                    <p className="paragraph-text">
                        Thành phố Đà Nẵng thuộc vùng Bắc Trung Bộ và Nam Trung Bộ. Phía Bắc giáp tỉnh Thừa Thiên Huế, phía Tây
                        giáp tỉnh Sekong (Lào), phía Nam giáp tỉnh Quảng Ngãi và phía Đông giáp Biển Đông. Ngày 01/7/2025, Đà
                        Nẵng chính thức sáp nhập với tỉnh Quảng Nam, trở thành thành phố trực thuộc Trung ương có quy mô lớn.
                    </p>
                    <p className="paragraph-text">
                        Thành phố hiện có diện tích tự nhiên khoảng 11.859,59 km², dân số 3.065.628 người (2025). Về hành chính, Đà
                        Nẵng được tổ chức thành 94 đơn vị cấp xã, gồm 23 phường, 70 xã và 1 đặc khu (Đặc khu Hoàng Sa).
                    </p>
                </section>

                {/* Lesson Content 2 */}
                <section className="lesson-content">
                    <h2 className="content-heading dark-green">2. ĐẶC ĐIỂM THIÊN NHIÊN CỦA THÀNH PHỐ ĐÀ NẴNG</h2>

                    <h3 className="sub-heading">a) Địa hình</h3>
                    <p className="paragraph-text">
                        Đà Nẵng sau sáp nhập có địa hình rất đa dạng và rộng lớn. Miền núi chiếm diện tích đáng kể ở phía Tây và Tây Bắc, nơi địa hình cao, dốc, có nhiều dãy núi chạy từ nội địa ra đến sát biên giới với Lào, tạo thành vùng đệm hiểm trở, nhiều thung lũng và sông suối. Về phía Đông và Đông Nam là vùng đồng bằng, vùng ven biển mở rộng ra đến Biển Đông — với bờ biển dài và nhiều vịnh, cửa sông, bãi tắm đẹp. Độ cao thay đổi lớn: từ đường bờ biển gần mực nước biển lên tới các đỉnh núi cao (có nơi trên 1.500 m).
                    </p>

                    <h3 className="sub-heading">b) Khí hậu</h3>
                    <p className="paragraph-text">
                        Thành phố Đà Nẵng nằm trong vùng khí hậu nhiệt đới ẩm gió mùa. Mỗi năm có 2 mùa rõ rệt: mùa mưa từ tháng 9 đến tháng 12 và mùa khô từ tháng 1 đến tháng 8. Hằng năm, nơi đây có những đợt rét mùa đông nhưng không đậm và không kéo dài. Những tháng cuối năm thường có mưa lớn và bão gây thiệt hại về người và của.
                    </p>
                    <div className="info-box box-shadow-blue mb-4">
                        <h4 className="info-box-title">Em có biết?</h4>
                        <p className="paragraph-text mb-0">Rặng núi Bà Nà (rặng núi Lỗ Đông) nằm hơi chếch về phía Tây Nam của thành phố Đà Nẵng, là rặng núi có đỉnh Núi Chúa cao 1 487 m so với mực nước biển. Khí hậu Bà Nà quanh năm mát mẻ, nhiệt độ trung bình khoảng 18°C, thường xuyên có sương mù vào buổi chiều và sau các cơn mưa giông, nhiệt độ thấp nhất là 2°C vào mùa đông và cao nhất là 25°C vào mùa hè.</p>
                    </div>

                    <h3 className="sub-heading">c) Sông ngòi</h3>
                    <p className="paragraph-text">
                        Hệ thống sông phong phú, gồm sông Thu Bồn, Vu Gia, Yên, Túy Loan, Cu Đê, Cẩm Lệ, Vĩnh Điện… tạo thành mạng lưới chằng chịt, vừa cung cấp nước sản xuất, vừa thuận lợi cho giao thông và du lịch sinh thái.
                    </p>
                </section>

                {/* Lesson Content 3 */}
                <section className="lesson-content">
                    <h2 className="content-heading dark-green">3. HOẠT ĐỘNG KINH TẾ CỦA THÀNH PHỐ ĐÀ NẴNG</h2>

                    <h3 className="sub-heading">a) Công nghiệp</h3>
                    <p className="paragraph-text">
                        Sau khi sáp nhập với tỉnh Quảng Nam, công nghiệp Đà Nẵng ngày càng phát triển và đa dạng hơn. Ngoài các ngành chế biến nông – lâm – thủy sản, cơ khí, vật liệu xây dựng, công nghệ thông tin…, thành phố còn có nhiều ngành mới như sản xuất ô tô, linh kiện điện tử, dệt may và năng lượng sạch. Các khu công nghiệp lớn gồm Hòa Khánh, Hòa Cầm, Khu công nghệ cao Đà Nẵng, Khu kinh tế mở Chu Lai, Điện Nam – Điện Ngọc, Tam Thăng… Công nghiệp phát triển đã tạo thêm nhiều việc làm, góp phần làm cho thành phố Đà Nẵng ngày càng hiện đại và năng động,…
                    </p>

                    <h3 className="sub-heading">b) Dịch vụ, du lịch</h3>
                    <p className="paragraph-text">
                        Đà Nẵng có nhiều tài nguyên biển, rừng, cảnh quan, di sản văn hóa, lễ hội, nghệ thuật truyền thống,… hấp dẫn khách du lịch trong và ngoài nước.
                    </p>

                    <h3 className="sub-heading">c) Nông nghiệp</h3>
                    <p className="paragraph-text">
                        Nông nghiệp ở Đà Nẵng chủ yếu là nghề trồng lúa nước. Bên cạnh đó còn phát triển thêm nghề trồng hoa và rau, củ, quả. Trong những năm gần đây, Đà Nẵng đã tập trung vào việc phát triển nông nghiệp công nghệ cao, áp dụng các phương pháp canh tác hiện đại nhằm tăng năng suất và chất lượng sản phẩm, đồng thời giảm thiểu tác động đến môi trường.
                    </p>

                    <h3 className="sub-heading">d) Kinh tế biển</h3>
                    <p className="paragraph-text">
                        Kinh tế biển của thành phố Đà Nẵng (mới) rất phát triển nhờ có đường bờ biển dài, nhiều bãi tắm đẹp và các cảng biển lớn như Tiên Sa, Kỳ Hà. Đà Nẵng có các cảng biển thuận tiện cho tàu thuyền cập bến, thúc đẩy phát triển nền kinh tế về du lịch và xuất nhập khẩu.
                    </p>

                    <h3 className="sub-heading">e) Nghề truyền thống</h3>
                    <p className="paragraph-text">
                        Trong bối cảnh hiện nay, Đà Nẵng có nhiều nghề truyền thống đa dạng, nổi bật như các làng nghề gốm Thanh Hà, mộc Kim Bồng, lụa Duy Trinh, rau Trà Quế, đúc đồng Phước Kiều, và các sản phẩm của Hội An như đèn lồng, cao lầu, chiếu cói Kim Bồng, làng điêu khắc đá mỹ nghệ Non Nước, nước mắm Nam Ô, bánh tráng Túy Loan, làng chiếu Cẩm Nê, khô mè Cẩm Lệ,…
                    </p>
                </section>

                {/* Lesson Content 4 removed as requested */}
            </div>
        </div>
    );
};

export default Nature;
