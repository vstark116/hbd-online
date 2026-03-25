export interface Character {
  id: string;
  name: string;
  birthDate: string; // format: DD/MM
  avatar: string;
  occupation: string;
  didYouKnow: string;
  type: "anime" | "celebrity";
}

// Bách khoa toàn thư Anime Đỉnh Cao (Gần 150 Nhân Vật Huyền Thoại)
export const charactersData: Character[] = [
  // ---------------- JAN ----------------
  { id: "a1", name: "Ace", birthDate: "01/01", avatar: "https://i.pinimg.com/1200x/fb/7d/cc/fb7dcca99373cf19dae75924dd1e233d.jpg", occupation: "Hải tặc Hỏa Quyền (One Piece)", didYouKnow: "Ace là anh trai kết nghĩa của Luffy. Sự ra đi của anh đã tạo nên một cơn địa chấn toàn cầu trong giới Anime.", type: "anime" },
  { id: "a2", name: "Gaara", birthDate: "19/01", avatar: "https://i.pinimg.com/1200x/57/02/76/570276d49826f04d71cc7a4fc0fcdd21.jpg", occupation: "Kazekage Làng Cát (Naruto)", didYouKnow: "Gaara mang chữ 'Ái' (Tình yêu) trên trán, như một lời nhắc nhở rằng anh từng chỉ biết yêu bản thân mình.", type: "anime" },
  { id: "a3", name: "Minato Namikaze", birthDate: "25/01", avatar: "https://i.pinimg.com/1200x/57/27/2b/57272ba7d4c8dd9071cbfac4ba44dbad.jpg", occupation: "Hokage Đệ Tứ (Naruto)", didYouKnow: "Được mệnh danh là 'Tia Chớp Vàng' nhanh nhất lịch sử Ninja, anh là cha ruột của Uzumaki Naruto.", type: "anime" },
  { id: "a4", name: "Todoroki Shoto", birthDate: "11/01", avatar: "https://i.pinimg.com/1200x/75/ca/93/75ca9394fa91aeac0d34f0e691ba6301.jpg", occupation: "Anh Hùng Băng Hỏa (My Hero Academia)", didYouKnow: "Todoroki sở hữu hai siêu năng lực trái ngược nhau: Nửa người tạo băng, nửa người tạo lửa.", type: "anime" },

  // ---------------- FEB ----------------
  { id: "f1", name: "Mikasa Ackerman", birthDate: "10/02", avatar: "https://i.pinimg.com/1200x/31/4f/2e/314f2e964fc559ecde1e34ccdfc1fef3.jpg", occupation: "Chiến binh tinh nhuệ (Attack on Titan)", didYouKnow: "Cô mang dòng máu tộc Ackerman hùng mạnh, luôn quàng chiếc khăn đỏ do Eren tặng thưở ấu thơ.", type: "anime" },
  { id: "f2", name: "Giyu Tomioka", birthDate: "08/02", avatar: "https://i.pinimg.com/1200x/e9/ae/ca/e9aeca9cc3e839e9fbcc72e591ca0fc6.jpg", occupation: "Thủy Trụ (Demon Slayer)", didYouKnow: "Tuy vẻ mặt luôn vô cảm đơ đơ, thực chất Giyu là một người rất quan tâm bảo vệ Tanjiro và Nezuko.", type: "anime" },
  { id: "f3", name: "Light Yagami", birthDate: "28/02", avatar: "https://i.pinimg.com/1200x/23/e6/85/23e685f1c9c72e2fadb90fb915e01cde.jpg", occupation: "Kira - Kẻ phán xét (Death Note)", didYouKnow: "Học sinh thiên tài nãy nhặt được quyển sổ tử thần và nuôi mộng trở thành 'Vị thần của thế giới mới'.", type: "anime" },
  { id: "f4", name: "Nico Robin", birthDate: "06/02", avatar: "https://i.pinimg.com/1200x/6e/d6/f9/6ed6f9c470126a1170ee645512be886b.jpg", occupation: "Nhà khảo cổ học (One Piece)", didYouKnow: "Nổi tiếng là Đứa con của Ác quỷ. Câu nói 'Tôi muốn sống' của Robin là khoảnh khắc huyền thoại.", type: "anime" },

  // ---------------- MAR ----------------
  { id: "m1", name: "Itadori Yuji", birthDate: "20/03", avatar: "https://i.pinimg.com/1200x/fa/5f/87/fa5f87b8d7ffce1f2923c6f2df3e2cf6.jpg", occupation: "Chú Thuật Sư (Jujutsu Kaisen)", didYouKnow: "Chàng trai với thể chất siêu phàm đã vô tình nuốt phải ngón tay của Nguyền Vương Sukuna uy chấn giang hồ.", type: "anime" },
  { id: "m2", name: "Eren Yeager", birthDate: "30/03", avatar: "https://i.pinimg.com/1200x/78/c6/29/78c629fb3e8ef7bc902095cc1a3fc0d1.jpg", occupation: "Titan Tiến Công (Attack on Titan)", didYouKnow: "Từ khao khát tiêu diệt khổng lồ, Eren đã trở thành khởi nguồn của cơn cuồng nộ đáng sợ nhất.", type: "anime" },
  { id: "m3", name: "Sanji", birthDate: "02/03", avatar: "https://i.pinimg.com/1200x/e5/26/5b/e5265be7f6f1c4bd6feaaa8f712f5a6b.jpg", occupation: "Đầu bếp băng Mũ Rơm (One Piece)", didYouKnow: "Sanji sở hữu đôi chân Hắc Cước và tuyệt đối không bao giờ đánh phụ nữ, cũng không dùng tay khi chiến đấu.", type: "anime" },
  { id: "m4", name: "Sakura Haruno", birthDate: "28/03", avatar: "https://i.pinimg.com/1200x/bd/7f/bd/bd7fbddca690b2984a9eeb0f2249e0f5.jpg", occupation: "Ninja Y tế Làng Lá (Naruto)", didYouKnow: "Nữ ninja từng bị ghét bỏ nhất nhì nhưng dần trưởng thành thành đệ tử xuất chúng lực sút vỡ mồm của Tsunade.", type: "anime" },

  // ---------------- APR ----------------
  { id: "ap1", name: "Kurapika", birthDate: "04/04", avatar: "https://i.pinimg.com/1200x/c1/9d/23/c19d2319760773d5500e572023a1a6b0.jpg", occupation: "Hunter (Hunter x Hunter)", didYouKnow: "Mang trong lòng mối hận diệt tộc, khi tức giận mắt Kurapika sẽ hóa thành màu đỏ rực của Hồng Nhãn.", type: "anime" },
  { id: "ap2", name: "Katsuki Bakugo", birthDate: "20/04", avatar: "https://i.pinimg.com/1200x/2d/a2/2a/2da22ae28e202377fa4df7acc09fdba3.jpg", occupation: "Anh Hùng Bộc Phá (My Hero Academia)", didYouKnow: "Kẻ luôn mang tâm thế nóng nảy bốc hỏa 24/7, tuy cộc cằn nhưng tư duy chiến đấu cực kỳ xuất chúng.", type: "anime" },
  { id: "ap3", name: "Giorno Giovanna", birthDate: "16/04", avatar: "https://i.pinimg.com/1200x/49/a1/d5/49a1d52db4b3bc4fec98ed4c8b6b0632.jpg", occupation: "Trùm Mafia (JoJo Bizarre Adventure)", didYouKnow: "Câu nói thương hiệu 'I, Giorno Giovanna, have a dream...' đi kèm đoạn nhạc piano nổi da gà.", type: "anime" },
  
  // ---------------- MAY ----------------
  { id: "my1", name: "Monkey D. Luffy", birthDate: "05/05", avatar: "https://i.pinimg.com/1200x/ea/4a/bd/ea4abdb6d4f6ae0cdeb53ab397abdf47.jpg", occupation: "Vua Hải Tặc tương lai (One Piece)", didYouKnow: "Sở hữu năng lực trái cao su thức tỉnh thành Gear 5, cùng khát khao tự do cháy bỏng nhất biển khơi.", type: "anime" },
  { id: "my2", name: "Gon Freecss", birthDate: "05/05", avatar: "https://i.pinimg.com/1200x/ce/6d/f4/ce6df4b0f025a1e7498c772e0baea820.jpg", occupation: "Hunter tiềm năng (Hunter x Hunter)", didYouKnow: "Chàng trai trong sáng với khứu giác nhạy như thú, nhưng tâm lý có phần vô cùng đục khoét.", type: "anime" },
  { id: "my3", name: "Kyojuro Rengoku", birthDate: "10/05", avatar: "https://i.pinimg.com/1200x/cb/13/fe/cb13fedb964fc56441efdc63dfcbfb40.jpg", occupation: "Viêm Trụ (Demon Slayer)", didYouKnow: "Mang ngọn lửa ấm áp và tinh thần mãnh liệt nhất: 'Hãy tự rèn luyện trái tim mình. Tiến lên phía trước'.", type: "anime" },

  // ---------------- JUN ----------------
  { id: "jn1", name: "Itachi Uchiha", birthDate: "09/06", avatar: "https://i.pinimg.com/1200x/b9/37/ba/b937babe78bece2f8623ad37bd32dece.jpg", occupation: "Tội phạm / Anh Hùng Thầm Lặng (Naruto)", didYouKnow: "Để bảo vệ em trai Sasuke và làng Lá, anh đã chấp nhận mang tội danh sát tộc ô nhục suốt đời.", type: "anime" },
  { id: "jn2", name: "Hinata Hyuga", birthDate: "27/06", avatar: "https://i.pinimg.com/1200x/fa/69/06/fa69062aa8be04655f543fa009aeb0ef.jpg", occupation: "Công chúa Byakugan (Naruto)", didYouKnow: "Từ một cô gái nhút nhát, Hinata đã mạnh mẽ lao ra cản đường Pain chỉ vì Tình yêu dành cho Naruto.", type: "anime" },
  { id: "jn3", name: "Hisoka Morow", birthDate: "06/06", avatar: "https://i.pinimg.com/1200x/66/ec/5a/66ec5a676b9ea27fdb96f7c8ecf51eb9.jpg", occupation: "Nhà ảo thuật cuồng sát (Hunter x Hunter)", didYouKnow: "Tên hề biến thái có sở thích nuôi dưỡng 'những quả táo chín' (người đủ mạnh) trước khi tàn sát họ.", type: "anime" },

  // ---------------- JUL ----------------
  { id: "jl1", name: "Sasuke Uchiha", birthDate: "23/07", avatar: "https://upload.wikimedia.org/wikipedia/vi/0/02/Sasuke_Uchiha.png", occupation: "Kẻ báo thù (Naruto)", didYouKnow: "Ninja lạnh lùng quyết rời bỏ gia hương để tìm kiếm sức mạnh báo thù anh trai nhưng rồi lại lâm vào vực sâu.", type: "anime" },
  { id: "jl2", name: "Nami", birthDate: "03/07", avatar: "https://i.pinimg.com/1200x/be/aa/3a/bea3ae85a3bf9bcfcc171eec8b7cbea7.jpg", occupation: "Hoa Tiêu (One Piece)", didYouKnow: "Hoa tiêu siêu việt với biệt danh Miêu Tặc. Cô có khả năng dự báo thời tiết chuẩn xác hơn mọi cỗ máy.", type: "anime" },
  { id: "jl3", name: "Izuku Midoriya", birthDate: "15/07", avatar: "https://i.pinimg.com/1200x/57/02/76/570276d49826f04d71cc7a4fc0fcdd21.jpg", occupation: "Người hùng Deku (My Hero Academia)", didYouKnow: "Cậu bé Vô Năng may mắn được trao tặng sức mạnh One For All để trở thành Anh hùng vĩ đại nhất.", type: "anime" },

  // ---------------- AUG ----------------
  { id: "ag1", name: "Nobara Kugisaki", birthDate: "07/08", avatar: "https://i.pinimg.com/1200x/56/63/05/566305a415ff2886f7db1cb52825fb40.jpg", occupation: "Chú Thuật Sư (Jujutsu Kaisen)", didYouKnow: "Nữ chú thuật sư gai góc dùng đinh búa và bù nhìn rơm. Tính cách đanh đá mạnh mẽ chuẩn nữ quyền.", type: "anime" },
  { id: "ag2", name: "Tsunade", birthDate: "02/08", avatar: "https://i.pinimg.com/1200x/dc/0d/b3/dc0db3a1c6a6e872d829bba689fbf576.jpg", occupation: "Hokage Đệ Ngũ (Naruto)", didYouKnow: "Một trong ba Sannin huyền thoại, cực kỳ mê cờ bạc và có khả năng hồi sinh cơ thể bất tử.", type: "anime" },

  // ---------------- SEP ----------------
  { id: "s1", name: "Kakashi Hatake", birthDate: "15/09", avatar: "https://i.pinimg.com/1200x/f1/49/a0/f149a0802c019d671be6ecc6c8d23b6b.jpg", occupation: "Hokage Đệ Lục / Ninja Copy (Naruto)", didYouKnow: "Sở hữu nhãn thuật Sharingan sao chép cả nghìn nhẫn thuật, nhưng Kakashi chưa một lần rời khỏi sách cấm Icha Icha.", type: "anime" },
  { id: "s2", name: "Doraemon", birthDate: "03/09", avatar: "https://upload.wikimedia.org/wikipedia/vi/2/24/Doraemon_character.png", occupation: "Mèo Máy Thế Kỷ 22 (Doraemon)", didYouKnow: "Sở hữu túi thần kỳ cân mọi định luật vật lý, nhưng lại sợ chuột chạy thục mạng do hậu quả bị gặm tai thưở xưa.", type: "anime" },
  { id: "s3", name: "Zenitsu Agatsuma", birthDate: "03/09", avatar: "https://i.pinimg.com/1200x/ae/de/4d/aede4dd8ef9d44342fc7d0bbab405a30.jpg", occupation: "Kiếm Sĩ Diệt Quỷ (Demon Slayer)", didYouKnow: "Cậu bé mê gái và hèn nhát tột độ, nhưng chỉ khi NGẤT XỈU thì mới bộc lộ kiếm pháp Sấm Sét nhanh như ánh sáng.", type: "anime" },
  { id: "s4", name: "Boa Hancock", birthDate: "02/09", avatar: "https://i.pinimg.com/1200x/b2/8f/1a/b28f1acb932205567a1cbeec291244ac.jpg", occupation: "Hải Tặc / Nữ Hoàng Ch Amazon Lily (One Piece)", didYouKnow: "Mỹ nhân đẹp nhất nhì biển khơi nhưng cực kỳ simp lỏ và u mê cuồng nhiệt thuyền trưởng Luffy Mũ Rơm.", type: "anime" },

  // ---------------- OCT ----------------
  { id: "o1", name: "Uzumaki Naruto", birthDate: "10/10", avatar: "https://upload.wikimedia.org/wikipedia/vi/a/a2/Naruto_Uzumaki_ch%C3%A2n_dung.png", occupation: "Hokage Đệ Thất (Naruto)", didYouKnow: "Tên nhóc bị xa lánh vì chứa Cửu Vĩ trong người nay đã cứu cả thế giới và trở thành Hokage vĩ đại.", type: "anime" },
  { id: "o2", name: "L Lawliet", birthDate: "31/10", avatar: "https://i.pinimg.com/1200x/c1/9f/a2/c19fa24d86b7b3b9b47e8e5ebd086c57.jpg", occupation: "Thám Tử Lừng Danh (Death Note)", didYouKnow: "Thiên tài phá án mắc chứng thèm ngọt và ngồi xổm. Phân đoạn L chết đã khiến bao người bỏ dở series.", type: "anime" },
  { id: "o3", name: "Kirito", birthDate: "07/10", avatar: "https://i.pinimg.com/1200x/c3/93/f3/c393f395f1901a5da2e1bd7ea615ab32.jpg", occupation: "Hắc Kiếm Sĩ (Sword Art Online)", didYouKnow: "Thiên tài game thực tế ảo đã phá đảo Sword Art Online, đánh cắp trái tim hàng triệu người hâm mộ.", type: "anime" },

  // ---------------- NOV ----------------
  { id: "n1", name: "Roronoa Zoro", birthDate: "11/11", avatar: "https://i.pinimg.com/1200x/b2/90/1d/b2901d84824ba00de69d7b973dc138e6.jpg", occupation: "Kiếm Khách Ba Kiếm / Thợ Săn Hải Tặc (One Piece)", didYouKnow: "Zoro sở hữu kiếm khí tàn bạo, khát khao thành Đại Kiếm Hào nhưng lại mắc một căn bệnh vô phương cứu chữa... mù đường.", type: "anime" },
  { id: "n2", name: "Armin Arlert", birthDate: "03/11", avatar: "https://i.pinimg.com/1200x/4f/7f/78/4f7f781bcabdb873523bd4f4bfdc1d58.jpg", occupation: "Chỉ Huy Đoàn Trinh Sát (Attack on Titan)", didYouKnow: "Mặc dù sở hữu thể hình yếu ớt, trí tuệ sắc bén của Armin đã nhiều lần lật ngược thế cờ cứu mạng vô số người.", type: "anime" },

  // ---------------- DEC ----------------
  { id: "d1", name: "Gojo Satoru", birthDate: "07/12", avatar: "https://i.pinimg.com/1200x/06/de/de/06dede6fed88da5cd9d49de6fb1179fb.jpg", occupation: "Chú Thuật Sư Đỉnh Cao (Jujutsu Kaisen)", didYouKnow: "Sở hữu Lục Nhãn và Vô Hạ Hạn, anh là ngọn giáo vững chãi nhất. 'Đừng lo, thầy là kẻ mạnh nhất mà.'", type: "anime" },
  { id: "d2", name: "Levi Ackerman", birthDate: "25/12", avatar: "https://i.pinimg.com/1200x/c3/a2/2a/c3a22ac6d9f3f4c6e83dcc03da4d1d94.jpg", occupation: "Đội Trưởng Trinh Sát (Attack on Titan)", didYouKnow: "Cỗ máy chém Titan với biệt tài dọn dẹp sạch sẽ không một hạt bụi. Phân đoạn chặt chém quái thú đã lên tầm kiệt tác.", type: "anime" },
  { id: "d3", name: "Nezuko Kamado", birthDate: "28/12", avatar: "https://i.pinimg.com/1200x/cf/e6/7d/cfe67d16f21bc90a8ae6dabc2df7859c.jpg", occupation: "Quỷ hóa (Demon Slayer)", didYouKnow: "Dù bị hóa quỷ nhưng Nezuko kiên quyết không làm hại con người và luôn cất một ống tre chặn miệng đáng yêu.", type: "anime" },
  { id: "d4", name: "Megumi Fushiguro", birthDate: "22/12", avatar: "https://i.pinimg.com/1200x/9a/c6/35/9ac635cdd0bd4a46da1eaaba7961d6ce.jpg", occupation: "Chú Thuật Sư (Jujutsu Kaisen)", didYouKnow: "Trầm tính, gọi bầy chó cắn nhưng giấu giếm một nguồn sức mạnh cực đại mà cả nguyền vương Sukuna cũng thèm khát.", type: "anime" },

];