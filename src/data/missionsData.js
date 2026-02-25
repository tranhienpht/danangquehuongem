import { Compass, Music, Utensils, Scroll, Crown } from 'lucide-react';

export const missions = [
    {
        id: 1,
        title: "THỬ THÁCH ĐỊA LÝ",
        description: "Định vị địa danh trên bản đồ tương tác.",
        icon: Compass,
        color: "#1abc9c",
        timeLimit: 120, // 2 minutes in seconds
        passScore: 8,
        questions: [
            {
                question: "Đà Nẵng và Quảng Nam chính thức sáp nhập từ ngày nào?",
                options: ["01/01/2025", "1/6/2025", "01/7/2025", "01/9/2025"],
                answer: "01/7/2025",
                explanation: "Việc sáp nhập được thực hiện chính thức từ ngày 01/7/2025 theo nghị quyết của Quốc hội."
            },
            {
                question: "Tên gọi đơn vị hành chính sau khi sáp nhập là:",
                options: ["Tỉnh Đà Nẵng – Quảng Nam", "Thành phố Quảng Nam", "Thành phố Đà Nẵng", "Tỉnh Đà Nẵng"],
                answer: "Thành phố Đà Nẵng",
                explanation: "Sau sáp nhập, đơn vị hành chính vẫn mang tên Thành phố Đà Nẵng, một trong 5 thành phố trực thuộc Trung ương."
            },
            {
                question: "Sau sáp nhập, Đà Nẵng thuộc khu vực nào?",
                options: ["Miền Trung", "Bắc Trung Bộ", "Nam Trung Bộ và Tây Nguyên", "Đông Nam Bộ"],
                answer: "Nam Trung Bộ và Tây Nguyên",
                explanation: "Sau sáp nhập, điều chỉnh phân vùng và điều chỉnh quy hoạch vùng kinh tế - xã hội, vùng Nam Trung Bộ và Tây Nguyên gồm 6 tỉnh, thành phố: Đà Nẵng, Quảng Ngãi, Gia Lai, Đắk Lắk, Khánh Hòa, Lâm Đồng."
            },
            {
                question: "Thành phố Đà Nẵng có vị trí tiếp giáp như thế nào với các đơn vị hành chính và khu vực xung quanh?",
                options: [
                    "Phía Bắc giáp tỉnh Quảng Trị, phía Nam giáp tỉnh Bình Định...",
                    "Phía Bắc giáp tỉnh Quảng Bình, phía Nam giáp tỉnh Gia Lai...",
                    "Phía Bắc giáp Thành phố Huế, phía Nam và Tây Nam giáp tỉnh Quảng Ngãi...",
                    "Phía Bắc giáp Thành phố Huế, phía Nam giáp tỉnh Kon Tum..."
                ],
                // The user provided long options, I'll shorten them for display or keep them if UI handles it. 
                // Option C is correct.
                // Let's use the full text but be careful with line breaks.
                fullOptions: [
                    "Phía Bắc giáp tỉnh Quảng Trị, phía Nam giáp tỉnh Bình Định, phía Tây giáp Lào và phía Đông giáp Biển Đông.",
                    "Phía Bắc giáp tỉnh Quảng Bình, phía Nam giáp tỉnh Gia Lai, phía Tây giáp tỉnh Quảng Trị và phía Đông giáp Vịnh Bắc Bộ.",
                    "Phía Bắc giáp Thành phố Huế, phía Nam và Tây Nam giáp tỉnh Quảng Ngãi, phía Tây giáp tỉnh Kon Tum và phía Đông giáp Biển Đông.",
                    "Phía Bắc giáp Thành phố Huế, phía Nam giáp tỉnh Kon Tum, phía Tây giáp tỉnh Quảng Ngãi và phía Đông giáp Biển Tây."
                ],
                answer: "Phía Bắc giáp Thành phố Huế, phía Nam và Tây Nam giáp tỉnh Quảng Ngãi, phía Tây giáp tỉnh Kon Tum và phía Đông giáp Biển Đông.",
                explanation: ""
            },
            {
                question: "Địa hình chủ yếu của Thành phố Đà Nẵng sau sáp nhập là:",
                options: ["Đồng bằng rộng lớn", "Cao nguyên bằng phẳng", "Núi cao hiểm trở", "Đồng bằng ven biển, đồi núi phía Tây"],
                answer: "Đồng bằng ven biển, đồi núi phía Tây",
                explanation: "Đà Nẵng có đồng bằng ven biển ở phía Đông và đồi núi Trường Sơn ở phía Tây."
            },
            {
                question: "Sông chảy qua trung tâm đô thị Đà Nẵng là:",
                options: ["Sông Thu Bồn", "Sông Vu Gia", "Sông Hàn", "Sông Cả"],
                answer: "Sông Hàn",
                explanation: "Sông Hàn chảy qua trung tâm thành phố Đà Nẵng."
            },
            {
                question: "Khí hậu của Thành phố Đà Nẵng là:",
                options: ["Khí hậu ôn đới", "Khí hậu khô hạn", "Khí hậu xích đạo", "Khí hậu nhiệt đới gió mùa"],
                answer: "Khí hậu nhiệt đới gió mùa",
                explanation: "Đà Nẵng có khí hậu nhiệt đới gió mùa, mưa nhiều vào mùa thu – đông."
            },
            {
                question: "Bán đảo Sơn Trà thuộc khu vực nào của Đà Nẵng?",
                options: ["Phía Tây", "Phía Nam", "Phía Đông Bắc", "Phía Tây Nam"],
                answer: "Phía Đông Bắc",
                explanation: "Bán đảo Sơn Trà nằm ở phía Đông Bắc, là “lá phổi xanh” của thành phố."
            },
            {
                question: "Núi/đèo nào là ranh giới tự nhiên giữa Đà Nẵng và Thành phố Huế?",
                options: ["Đèo Cả", "Đèo Khánh Lê", "Đèo Hải Vân", "Đèo Ngang"],
                answer: "Đèo Hải Vân",
                explanation: "Đèo Hải Vân thuộc dãy Bạch Mã, là ranh giới tự nhiên giữa Đà Nẵng và Huế."
            },
            {
                question: "Nhận xét nào đúng nhất về đặc điểm tự nhiên của Thành phố Đà Nẵng sau sáp nhập?",
                options: ["Chỉ có núi", "Chỉ có biển", "Không có sông", "Có biển, đồng bằng và đồi núi"],
                answer: "Có biển, đồng bằng và đồi núi",
                explanation: "Đà Nẵng có địa hình đa dạng, thuận lợi phát triển nhiều ngành kinh tế."
            }
        ]
    },
    // Keep other missions as is for now, or use a simplified placeholder if not changed. 
    // I must include them to avoid breaking the app.
    // I will copy the previous data for missions 2-5.
    {
        id: 2,
        title: "LỄ HỘI TRUYỀN THỐNG",
        description: "Lắng nghe âm hưởng và nét đẹp văn hóa.",
        icon: Music,
        color: "#e67e22",
        timeLimit: 120,
        passScore: 8,
        questions: [
            { question: "Lễ hội Pháo hoa Quốc tế Đà Nẵng thường diễn ra vào mùa nào?", options: ["Mùa Xuân", "Mùa Hạ", "Mùa Thu", "Mùa Đông"], answer: "Mùa Hạ", explanation: "Lễ hội Pháo hoa Quốc tế Đà Nẵng (DIFF) thường được tổ chức vào mùa hè, thu hút du khách khắp nơi." },
            { question: "Lễ hội Quan Thế Âm được tổ chức tại danh thắng nào?", options: ["Bà Nà Hills", "Ngũ Hành Sơn", "Sơn Trà", "Đèo Hải Vân"], answer: "Ngũ Hành Sơn", explanation: "Lễ hội Quan Thế Âm diễn ra hàng năm tại chùa Quán Thế Âm thuộc quần thể di tích danh thắng Ngũ Hành Sơn." },
            { question: "Lễ hội Cầu Ngư là lễ hội của ngư dân vùng nào?", options: ["Vùng núi", "Vùng biển", "Vùng đồng bằng", "Vùng cao nguyên"], answer: "Vùng biển", explanation: "Lễ hội Cầu Ngư là nét văn hóa tín ngưỡng đặc sắc của ngư dân vùng biển, thể hiện lòng thành kính với Mẹ Đại Dương." },
            { question: "Lễ hội Quan Thế Âm diễn ra vào ngày nào âm lịch?", options: ["19/2", "15/7", "15/8", "1/1"], answer: "19/2", explanation: "Lễ hội được tổ chức vào khoảng ngày 19 tháng 2 âm lịch." },
            { question: "Trong lễ hội Cầu Ngư, người dân thờ loài cá nào?", options: ["Cá Chép", "Cá Voi (Cá Ông)", "Cá Mập", "Cá Ngừ"], answer: "Cá Voi (Cá Ông)", explanation: "Ngư dân gọi cá voi là Cá Ông và tôn thờ vì loài cá này luôn hiển linh giúp đỡ thuyền bè khi gặp nạn." },
            { question: "Lễ hội đua thuyền trên sông Hàn thường tổ chức vào dịp nào?", options: ["Quốc khánh 2/9", "Tết Nguyên Đán", "Giỗ tổ Hùng Vương", "30/4"], answer: "Quốc khánh 2/9", explanation: "Hoạt động đua thuyền rộn rã trên sông Hàn là một phần không thể thiếu trong dịp lễ Quốc khánh ở Đà Nẵng." },
            { question: "Lễ hội Mục Đồng dành cho đối tượng nào?", options: ["Trẻ chăn trâu", "Người già", "Phụ nữ", "Thanh niên"], answer: "Trẻ chăn trâu", explanation: "Đây là lễ hội độc đáo tôn vinh những trẻ chăn trâu và cầu mùa màng bội thu ở làng Phong Lệ." },
            { question: "Làng nghề đá Non Nước nổi tiếng với sản phẩm gì?", options: ["Gốm sứ", "Điêu khắc đá", "Dệt lụa", "Đúc đồng"], answer: "Điêu khắc đá", explanation: "Làng Non Nước là cái nôi của nghệ thuật điêu khắc đá mỹ nghệ tinh xảo." },
            { question: "Lễ hội nào tôn vinh văn hóa Chăm Pa tại Đà Nẵng?", options: ["Lễ hội Katê", "Lễ hội Quán Thế Âm", "Lễ hội Cầu Ngư", "Không có"], answer: "Lễ hội Katê", explanation: "Lễ hội Katê gắn với di sản văn hóa Chăm Pa đặc sắc còn lưu giữ lại trên mảnh đất này." },
            { question: "Lễ hội đình làng Túy Loan nhắc nhở về truyền thống gì?", options: ["Uống nước nhớ nguồn", "Tôn sư trọng đạo", "Lá lành đùm lá rách", "Yêu nước"], answer: "Uống nước nhớ nguồn", explanation: "Lễ hội nhằm tri ân các bậc tiền nhân đã có công khai khẩn lập nên làng Túy Loan." }
        ]
    },
    {
        id: 3,
        title: "ẨM THỰC ĐÀ NẴNG",
        description: "Trở thành đầu bếp nhí tài ba.",
        icon: Utensils,
        color: "#f1c40f",
        timeLimit: 120,
        passScore: 8,
        questions: [
            { question: "Món mì nào là đặc sản nổi tiếng nhất Đà Nẵng?", options: ["Mì Quảng", "Phở", "Bún chả", "Cao lầu"], answer: "Mì Quảng", explanation: "Mì Quảng sợi dai, nước lèo đậm đà là món ăn linh hồn của xứ Quảng - Đà." },
            { question: "Bánh tráng cuốn thịt heo thường ăn kèm với loại mắm nào?", options: ["Nước mắm chua ngọt", "Mắm nêm", "Mắm tôm", "Tương ớt"], answer: "Mắm nêm", explanation: "Mắm nêm cay nồng thơm lừng là linh hồn làm nên vị ngon của Bánh tráng cuốn thịt heo." },
            { question: "Gỏi cá Nam Ô được làm từ loại cá nào?", options: ["Cá Ngừ", "Cá Trích", "Cá Thu", "Cá Hồi"], answer: "Cá Trích", explanation: "Gỏi cá trứ danh này lấy nguyên liệu chủ yếu từ cá trích đánh bắt ở làng biển Nam Ô." },
            { question: "Món Bún Chả Cá Đà Nẵng có vị gì đặc trưng?", options: ["Chua cay", "Ngọt thanh", "Mặn chát", "Đắng"], answer: "Ngọt thanh", explanation: "Nước dùng Bún Chả Cá Đà Nẵng được hầm từ xương cá tươi có vị ngọt thanh rất riêng biệt." },
            { question: "Bánh Xèo Đà Nẵng thường được gọi là gì?", options: ["Bánh Khoái", "Bánh Xèo vỏ", "Bánh Xèo nhảy", "Bánh Xèo miền Trung"], answer: "Bánh Xèo miền Trung", explanation: "Thường gọi là Bánh xèo miền Trung với kích thước nhỏ, dòn rụm chứ không to như bánh xèo miền Tây." },
            { question: "Chè Liên nổi tiếng với món chè nào?", options: ["Chè bưởi", "Chè đậu đỏ", "Chè sầu riêng", "Chè thái"], answer: "Chè sầu riêng", explanation: "Chè sầu riêng Liên đã trở thành thương hiệu nổi tiếng khách du lịch hay tìm đến nhất tại Đà Nẵng." },
            { question: "Món ốc hút thường được bán nhiều ở đâu?", options: ["Nhà hàng sang trọng", "Vỉa hè, chợ", "Trong khách sạn", "Siêu thị"], answer: "Vỉa hè, chợ", explanation: "Ốc hút lá chanh xào thơm lừng là món ăn vặt quen thuộc ở hầu hết các nẻo đường, chợ búa." },
            { question: "Nem lụi thường được cuốn vào cây gì khi nướng?", options: ["Cây tre", "Cây sả", "Cây mía", "Cây sắt"], answer: "Cây sả", explanation: "Quấn thịt quanh thân củ sả khi nướng giúp nem lụi tỏa hương thơm cực kỳ hấp dẫn." },
            { question: "Món tré - đặc sản làm quà thường gói bằng lá gì?", options: ["Lá chuối", "Lá ổi", "Lá dừa", "Lá sen"], answer: "Lá ổi", explanation: "Tré Đà Nẵng thường dùng lá ổi ở lớp lõi trong để hỗ trợ lên men và tăng hương vị." },
            { question: "Bê thui Cầu Mống chấm với gì là ngon nhất?", options: ["Muối tiêu chanh", "Tương ớt", "Mắm nêm", "Xì dầu"], answer: "Mắm nêm", explanation: "Đúng điệu nhất là cuốn bê thui với bánh tráng rau rừng rồi chấm đẫm mắm nêm." }
        ]
    },
    {
        id: 4,
        title: "HỒI ỨC NHỮNG TRANG SỬ VÀNG",
        description: "Khám phá dấu ấn lịch sử hào hùng.",
        icon: Scroll,
        color: "#34495e",
        timeLimit: 120,
        passScore: 8,
        questions: [
            { question: "Thành Điện Hải là di tích lịch sử quan trọng trong cuộc kháng chiến chống quân xâm lược nào?", options: ["Pháp", "Mỹ", "Nhật", "Trung Quốc"], answer: "Pháp", explanation: "Thành Điện Hải gắn liền với cuộc chiến đấu ngoan cường của quân dân đầu những năm 1858 chống Pháp." },
            { question: "Vị tướng nào đã chỉ huy quân dân Đà Nẵng chống Pháp năm 1858?", options: ["Trần Hưng Đạo", "Nguyễn Tri Phương", "Võ Nguyên Giáp", "Phan Châu Trinh"], answer: "Nguyễn Tri Phương", explanation: "Danh tướng Nguyễn Tri Phương là người đã lập chiến tuyến kiên cố tại Đà Nẵng ngăn cản quân xâm lược." },
            { question: "Ngày giải phóng thành phố Đà Nẵng là ngày nào?", options: ["30/4/1975", "29/3/1975", "2/9/1945", "19/5/1890"], answer: "29/3/1975", explanation: "Ngày 29/3/1975, thành phố Đà Nẵng hoàn toàn được giải phóng trong đại thắng mùa Xuân lịch sử." },
            { question: "Bảo tàng nào lưu giữ nhiều hiện vật về văn hóa Chăm Pa nhất?", options: ["Bảo tàng Đà Nẵng", "Bảo tàng Điêu khắc Chăm", "Bảo tàng Quân khu 5", "Bảo tàng Hồ Chí Minh"], answer: "Bảo tàng Điêu khắc Chăm", explanation: "Nơi lưu giữ bộ sưu tập điêu khắc đá Chăm Pa quy mô và độc đáo nhất Việt Nam." },
            { question: "Đường Bạch Đằng nằm dọc theo bờ sông nào?", options: ["Sông Hàn", "Sông Cẩm Lệ", "Sông Cu Đê", "Sông Vĩnh Điện"], answer: "Sông Hàn", explanation: "Đây là con đường ven sông Hàn đẹp nhất và mang đậm dấu ấn lịch sử của thành phố." },
            { question: "Nghĩa trũng Hòa Vang là nơi an nghỉ của ai?", options: ["Các vua nhà Nguyễn", "Các nghĩa sĩ chống Pháp", "Các nhà thơ lớn", "Người dân thường"], answer: "Các nghĩa sĩ chống Pháp", explanation: "Nơi quy tập phần mộ của các nghĩa sĩ đã xả thân bảo vệ quê hương trong thời kỳ đầu kháng chiến chống Pháp." },
            { question: "Tượng Mẹ Nhu dũng sĩ nằm ở quận nào?", options: ["Thanh Khê", "Hải Châu", "Cẩm Lệ", "Liên Chiểu"], answer: "Thanh Khê", explanation: "Khuôn mặt hiền từ Mẹ Nhu (quận Thanh Khê) che chở cho các chiến sĩ luôn nằm rạng rỡ trong sử sách quê nhà." },
            { question: "Căn cứ cách mạng K20 nằm ở khu vực nào?", options: ["Hòa Vang", "Ngũ Hành Sơn", "Sơn Trà", "Hải Châu"], answer: "Ngũ Hành Sơn", explanation: "Căn cứ cách mạng K20 ở Ngũ Hành Sơn là một khu di tích quan trọng minh chứng cho một thời oanh liệt." },
            { question: "Cầu Nguyễn Văn Trỗi do ai xây dựng?", options: ["Pháp", "Nhật", "Mỹ", "Việt Nam"], answer: "Mỹ", explanation: "Đây vốn là một cây cầu quân sự được quân Mỹ xây dựng, sau này được biến thành điểm đi bộ đậm chất hoài cổ." },
            { question: "Danh thắng Ngũ Hành Sơn thiết lập Di tích quốc gia đặc biệt năm nào?", options: ["2010", "2015", "2018", "2020"], answer: "2018", explanation: "Danh thắng Ngũ Hành Sơn được công nhận là Di tích quốc gia đặc biệt vào năm 2018." }
        ]
    },
    {
        id: 5,
        title: "ĐÀ NẴNG TRONG TIM EM",
        description: "Đô thị sát hạch cuối cùng của em.",
        icon: Crown,
        color: "#f39c12",
        timeLimit: 120,
        passScore: 8,
        questions: [
            { question: "Biểu tượng của thành phố Đà Nẵng là cây cầu nào?", options: ["Cầu Rồng", "Cầu Sông Hàn", "Cầu Trần Thị Lý", "Cầu Thuận Phước"], answer: "Cầu Sông Hàn", explanation: "Cầu Sông Hàn là biểu tượng vì là cây cầu quay độc đáo do người dân Đà Nẵng chung sức xây dựng." },
            { question: "Đà Nẵng được mệnh danh là thành phố gì?", options: ["Thành phố Hồ", "Thành phố của những cây cầu", "Thành phố Hoa Phượng Đỏ", "Thành phố Sương Mù"], answer: "Thành phố của những cây cầu", explanation: "Vì bắt qua sông Hàn thơ mộng là vô vàn cây cầu với mỗi cầu mang một nét kiến trúc độc đáo riêng." },
            { question: "Loài voọc quý hiếm nào sống ở bán đảo Sơn Trà?", options: ["Voọc mũi hếch", "Voọc chà vá chân nâu", "Voọc đen", "Voọc quần đùi trắng"], answer: "Voọc chà vá chân nâu", explanation: "Được coi là 'nữ hoàng linh trưởng', Voọc chà vá chân nâu là sinh vật đặc hữu của rừng Sơn Trà." },
            { question: "Công viên APEC nằm ở đường nào?", options: ["Bạch Đằng", "2 tháng 9", "Nguyễn Văn Linh", "Hùng Vương"], answer: "2 tháng 9", explanation: "Công viên biểu tượng Cánh Diều nằm ở đường 2 tháng 9 ven bờ sông Hàn thơ mộng." },
            { question: "Sân bay quốc tế Đà Nẵng nằm ở quận nào?", options: ["Thanh Khê", "Hải Châu", "Cẩm Lệ", "Ngũ Hành Sơn"], answer: "Hải Châu", explanation: "Sân bay duy nhất ở miền Trung tọa lạc ngay ngắn tại quận Hải Châu để đón chuyến khách trong và ngoài nước." },
            { question: "Tòa nhà hành chính Đà Nẵng có hình dáng giống cái gì?", options: ["Trái bắp", "Ngọn hải đăng", "Cánh buồm", "Bông sen"], answer: "Ngọn hải đăng", explanation: "Thiết kế lấy cảm hứng từ ngọn hải đăng vươn cao trên biển khơi." },
            { question: "Làng nghề nước mắm Nam Ô thuộc quận nào?", options: ["Liên Chiểu", "Thanh Khê", "Cẩm Lệ", "Sơn Trà"], answer: "Liên Chiểu", explanation: "Làng chài Nam Ô tọa lạc tại quận Liên Chiểu với nghề làm mắm từ bao đời nay." },
            { question: "Cây cầu nào quay được ở Đà Nẵng?", options: ["Cầu Rồng", "Cầu Sông Hàn", "Cầu Thuận Phước", "Cầu Tiên Sơn"], answer: "Cầu Sông Hàn", explanation: "Là biểu tượng tự hào, đây cũng là cây cầu duy nhất quay được ở Việt Nam." },
            { question: "Sun World Bà Nà Hills nổi tiếng với công trình nào?", options: ["Cầu Vàng", "Cầu Rồng", "Tượng Phật Bà", "Chùa Linh Ứng"], answer: "Cầu Vàng", explanation: "Thiết kế ấn tượng của Cầu Vàng (Golden Bridge) đã vinh dự được lan tỏa đến tận quốc tế." },
            { question: "Em có yêu mến Đà Nẵng không?", options: ["Có, rất nhiều!", "Bình thường", "Không thích lắm", "Không biết"], answer: "Có, rất nhiều!", explanation: "Thật tuyệt vời! Mình biết quê hương Đà Nẵng cũng rất yêu và tự hào về em đó!" }
        ]
    }
];
