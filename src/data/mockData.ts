export type CharacterType = "anime" | "celebrity";

export interface Character {
  id: string;
  name: string;
  type: CharacterType;
  birthDate: string; // DD/MM format
  avatar: string;
  occupation: string;
  didYouKnow: string;
}

export const charactersData: Character[] = [
  // Anime
  {
    id: "a1",
    name: "Doraemon",
    type: "anime",
    birthDate: "03/09",
    avatar: "https://i.pinimg.com/736x/87/e5/23/87e5233ea853df0bc425a81ca0447fa4.jpg",
    occupation: "Mèo Máy Tương Lai",
    didYouKnow: "Doraemon bị mất tai vì một con chuột máy cắn, đó là lý do cậu ấy rất sợ chuột!"
  },
  {
    id: "a2",
    name: "Gojo Satoru",
    type: "anime",
    birthDate: "07/12",
    avatar: "https://i.pinimg.com/736x/21/d9/b4/21d9b4b0051e2338ed7f4c784dd5dd1c.jpg",
    occupation: "Chú Thuật Sư Mạnh Nhất",
    didYouKnow: "Gojo rất thích ăn đồ ngọt. Lượng đường cậu ấy tiêu thụ siêu khủng!"
  },
  {
    id: "a3",
    name: "Monkey D. Luffy",
    type: "anime",
    birthDate: "05/05",
    avatar: "https://i.pinimg.com/736x/23/2f/78/232f782cadd629ea191df4ca86ab9ca5.jpg",
    occupation: "Vua Hải Tặc Tương Lai",
    didYouKnow: "Luffy không bao giờ giết kẻ thù, cậu chỉ đánh bại giấc mơ của họ."
  },
  {
    id: "a4",
    name: "Naruto Uzumaki",
    type: "anime",
    birthDate: "10/10",
    avatar: "https://i.pinimg.com/736x/c8/10/83/c8108390b10ec9479361a9ab40de21f1.jpg",
    occupation: "Hokage Đệ Thất",
    didYouKnow: "Món ăn yêu thích nhất của Naruto là Ramen ở tiệm Ichiraku."
  },
  {
    id: "a5",
    name: "Levi Ackerman",
    type: "anime",
    birthDate: "25/12",
    avatar: "https://i.pinimg.com/736x/df/75/a9/df75a99adfedae97223da1ff557fe9fb.jpg",
    occupation: "Đội Trưởng",
    didYouKnow: "Levi mắc hội chứng sợ bẩn và bắt mọi người dọn dẹp liên tục."
  },
  {
    id: "a6",
    name: "Frieren",
    type: "anime",
    birthDate: "14/06",
    avatar: "https://i.pinimg.com/736x/87/f8/bf/87f8bfe1bebd037bb4586ea5cd5f84cb.jpg",
    occupation: "Pháp Sư Yêu Tinh",
    didYouKnow: "Frieren có sở thích sưu tầm các loại bùa phép kỳ lạ và vô dụng."
  },
  {
    id: "a7",
    name: "Vegeta",
    type: "anime",
    birthDate: "14/08",
    avatar: "https://i.pinimg.com/736x/07/20/aa/0720aa0251752b02e70b3b4d45dcd8af.jpg",
    occupation: "Hoàng Tử Saiyan",
    didYouKnow: "Vegeta rất sợ giun, mặc dù anh có sức mạnh phá hủy cả hành tinh."
  },
  {
    id: "a8",
    name: "Kamado Tanjiro",
    type: "anime",
    birthDate: "14/07",
    avatar: "https://i.pinimg.com/736x/eb/70/4f/eb704fb3def0b1ec17bde33d6ea87d19.jpg",
    occupation: "Kiếm Sĩ Diệt Quỷ",
    didYouKnow: "Tanjiro có một cái trán cứng như thép cứng, thường dùng để 'thiết đầu công'."
  },
  {
    id: "a9",
    name: "Killua Zoldyck",
    type: "anime",
    birthDate: "07/07",
    avatar: "https://i.pinimg.com/736x/91/d5/9c/91d59cc5d909564619941a27e98a3b09.jpg",
    occupation: "Sát Thủ Hunter",
    didYouKnow: "Khác với sát thủ khác, Killua rất thích dùng tiền thưởng đi mua kẹo choco-robot."
  },
  {
    id: "a10",
    name: "Anya Forger",
    type: "anime",
    birthDate: "01/10",
    avatar: "https://i.pinimg.com/736x/eb/8c/fb/eb8cfbafe55f05ee88dffde1fb1db1ff.jpg",
    occupation: "Nhà Ngoại Cảm Nhí",
    didYouKnow: "Anya rất thích đậu phộng và cực kỳ ghét cà rốt!"
  },
  
  // Celebrities
  {
    id: "c1",
    name: "Albert Einstein",
    type: "celebrity",
    birthDate: "14/03",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg/800px-Einstein_1921_by_F_Schmutzer_-_restoration.jpg",
    occupation: "Nhà Vật Lý Học",
    didYouKnow: "Einstein từng được đề nghị làm Tổng thống thứ hai của Israel nhưng ông đã từ chối."
  },
  {
    id: "c2",
    name: "Taylor Swift",
    type: "celebrity",
    birthDate: "13/12",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Taylor_Swift_at_the_2023_MTV_Video_Music_Awards_%283%29.png",
    occupation: "Ca Sĩ",
    didYouKnow: "Số 13 luôn được Taylor Swift coi là con số may mắn nhất của mình."
  },
  {
    id: "c3",
    name: "Elon Musk",
    type: "celebrity",
    birthDate: "28/06",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Elon_Musk_Royal_Society.jpg",
    occupation: "Tỷ Phú Công Nghệ",
    didYouKnow: "Khi 12 tuổi, Elon đã tạo ra và bán một trò chơi điện tử tên là 'Blastar' với giá 500 USD."
  },
  {
    id: "c4",
    name: "Lionel Messi",
    type: "celebrity",
    birthDate: "24/06",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg",
    occupation: "Cầu Thủ Bóng Đá",
    didYouKnow: "Bản hợp đồng đầu tiên của Messi với Barcelona được ký trên một tờ giấy ăn."
  },
  {
    id: "c5",
    name: "Adele",
    type: "celebrity",
    birthDate: "05/05",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Adele_2016.jpg",
    occupation: "Ca Sĩ",
    didYouKnow: "Vài album âm nhạc của Adele mang tên là tuổi của cô lúc sáng tác (19, 21, 25, 30)."
  },
  {
    id: "c6",
    name: "Bill Gates",
    type: "celebrity",
    birthDate: "28/10",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Bill_Gates_2018.jpg",
    occupation: "Nhà Sáng Lập Microsoft",
    didYouKnow: "Bill Gates chưa bao giờ lấy bằng đại học Harvard dù ông học ở đó, nhưng sau này trường trao cho ông bằng danh dự."
  },
  {
    id: "c7",
    name: "Marie Curie",
    type: "celebrity",
    birthDate: "07/11",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Marie_Curie_c._1920s.jpg",
    occupation: "Nhà Khoa Học",
    didYouKnow: "Marie Curie là người đầu tiên và duy nhất giành được hai giải Nobel ở hai lĩnh vực khoa học khác nhau."
  },
  {
    id: "c8",
    name: "Zendaya",
    type: "celebrity",
    birthDate: "01/09",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/2/28/Zendaya_-_2019_by_Glenn_Francis.jpg",
    occupation: "Diễn Viên Mĩ",
    didYouKnow: "Zendaya có bằng chứng nhận là đại sứ toàn cầu của UNICEF từ khi đang còn rất trẻ."
  },
  {
    id: "c9",
    name: "Steve Jobs",
    type: "celebrity",
    birthDate: "24/02",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Steve_Jobs_Headshot_2010-CROP2.jpg",
    occupation: "Đồng Sáng Lập Apple",
    didYouKnow: "Thực đơn ăn kiêng của Steve Jobs nghiêm ngặt đến mức có lúc ông chỉ ăn toàn trái cây và hạt."
  },
  {
    id: "c10",
    name: "Leonardo DiCaprio",
    type: "celebrity",
    birthDate: "11/11",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/4/46/Leonardo_Dicaprio_Cannes_2019.jpg",
    occupation: "Diễn Viên Hollywood",
    didYouKnow: "Anh được đặt theo tên của thiên tài Leonardo da Vinci vì mẹ anh cảm nhận anh cựa quậy khi đang xem một bức tranh của ông."
  }
];