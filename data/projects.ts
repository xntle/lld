const e = (s: string) =>
  "/" + s.split("/").map(encodeURIComponent).join("/");

export type Project = {
  name: string;
  year?: string;
  cover: string;
  photos: string[];
};

const PROJECTS: Project[] = [
  {
    name: "An Nam Resort",
    year: "2022",
    cover: e("photos/CT/AN NAM RESORT/main.jpg"),
    photos: [
      e("photos/CT/AN NAM RESORT/main.jpg"),
      e("photos/CT/AN NAM RESORT/1.jpg"),
      e("photos/CT/AN NAM RESORT/2.jpg"),
    ],
  },
  {
    name: "La Maison de Campagne",
    year: "2018",
    cover: e("photos/CT/LA MAISON DE CAMPAGNE/main.jpg"),
    photos: [
      e("photos/CT/LA MAISON DE CAMPAGNE/main.jpg"),
      e("photos/CT/LA MAISON DE CAMPAGNE/33137410_1076375375861228_866307702605742080_n.jpg"),
      e("photos/CT/LA MAISON DE CAMPAGNE/37245640_1129460703886028_1887678499284582400_n.jpg"),
      e("photos/CT/LA MAISON DE CAMPAGNE/462228930_3105691639596248_265259701098415019_n.jpg"),
    ],
  },
  {
    name: "Nguyễn Ư Dĩ",
    year: "2025",
    cover: e("photos/CT/NGUYỄN Ư DĨ/main.jpg"),
    photos: [
      e("photos/CT/NGUYỄN Ư DĨ/main.jpg"),
      e("photos/CT/NGUYỄN Ư DĨ/524618688_1087321356718755_3465773905738856592_n.jpg"),
      e("photos/CT/NGUYỄN Ư DĨ/525601403_1087321360052088_3341107866079582956_n.jpg"),
      e("photos/CT/NGUYỄN Ư DĨ/525792076_1087322676718623_1918399872725374111_n.jpg"),
      e("photos/CT/NGUYỄN Ư DĨ/z7725933735801_0eeb4446de457dd3be12a3b5ab953217.jpg"),
      e("photos/CT/NGUYỄN Ư DĨ/z7725933758168_196ba717dab9e2e1b898f3b4edd18448.jpg"),
      e("photos/CT/NGUYỄN Ư DĨ/z7725933774605_33e287f71d7e4523db9e5f5131ec9817.jpg"),
      e("photos/CT/NGUYỄN Ư DĨ/z7725933798873_c671a073aa4d7abe752efb16fc03c454.jpg"),
    ],
  },
  {
    name: "Tulip 29",
    year: "2024",
    cover: e("photos/CT/TULIP 29/main.jpg"),
    photos: [
      e("photos/CT/TULIP 29/main.jpg"),
      e("photos/CT/TULIP 29/z7725938458271_ca9fd627260541edc312098bd4f4f6e9.jpg"),
      e("photos/CT/TULIP 29/z7725938467473_16671209fefbaf3557b2c9302779785f.jpg"),
      e("photos/CT/TULIP 29/z7725938493114_8a58c9026ee06aa3f68692f719b6d7a9.jpg"),
      e("photos/CT/TULIP 29/z7725938521132_7fea948c99ae0c178b1b0a8bfc825bd5.jpg"),
      e("photos/CT/TULIP 29/z7725938562141_872b8830512ba7772d55739b9c8005c5.jpg"),
      e("photos/CT/TULIP 29/z7725941165152_dddd6dd7148b5f400d01c39cc0a13696.jpg"),
      e("photos/CT/TULIP 29/z7725941180532_a5c8247db0c00ad89233c25ad4aa6a39.jpg"),
    ],
  },
  {
    name: "Tulip 8",
    year: "2024",
    cover: e("photos/CT/TULIP 8/main.png"),
    photos: [
      e("photos/CT/TULIP 8/main.png"),
      e("photos/CT/TULIP 8/1.png"),
      e("photos/CT/TULIP 8/2.png"),
      e("photos/CT/TULIP 8/4.png"),
      e("photos/CT/TULIP 8/5.png"),
      e("photos/CT/TULIP 8/6.png"),
      e("photos/CT/TULIP 8/z7725943006140_aca03eb9abde56941db3c0898f1f5ada.jpg"),
      e("photos/CT/TULIP 8/z7725943030641_fddbf17b2dea3a02f914ac0fd526bdde.jpg"),
    ],
  },
  {
    name: "CT Nhơn Trạch",
    year: "2025",
    cover: e("photos/CT/CT NHƠN TRẠCH/main.jpg"),
    photos: [
      e("photos/CT/CT NHƠN TRẠCH/main.jpg"),
      e("photos/CT/CT NHƠN TRẠCH/483883220_987190993398459_8261432256101663277_n.jpg"),
      e("photos/CT/CT NHƠN TRẠCH/484130688_987191143398444_3075465510373178487_n.jpg"),
      e("photos/CT/CT NHƠN TRẠCH/z7725246697799_cc30d5a2c6276bd6656c16e3271530a9.jpg"),
      e("photos/CT/CT NHƠN TRẠCH/z7725246708153_832ab4d11125f85be3a56fa1ecf7ad69.jpg"),
      e("photos/CT/CT NHƠN TRẠCH/z7725246710305_23f2f6cd89ed0318e1bc7a7bc51bf536.jpg"),
    ],
  },
  {
    name: "Phòng Sauna Thảo Điền",
    year: "2024",
    cover: e("photos/CT/PHÒNG SAUNA THẢO ĐIỀN/z7648668219673_56f0fd836e9f143e0fc4ba861d2b785f.jpg"),
    photos: [
      e("photos/CT/PHÒNG SAUNA THẢO ĐIỀN/z7648668219673_56f0fd836e9f143e0fc4ba861d2b785f.jpg"),
      e("photos/CT/PHÒNG SAUNA THẢO ĐIỀN/z7648668239998_411e701cbddbb0019e492d8e73cdeaa1.jpg"),
      e("photos/CT/PHÒNG SAUNA THẢO ĐIỀN/z7648668240002_8e81089538798d73ce4bcf9363c61b76.jpg"),
      e("photos/CT/PHÒNG SAUNA THẢO ĐIỀN/z7648668240003_e260eced0b2713c2ae841581042c6abc.jpg"),
      e("photos/CT/PHÒNG SAUNA THẢO ĐIỀN/z7648668258641_9bce953c3ebf0c21757a72f153857b5e.jpg"),
      e("photos/CT/PHÒNG SAUNA THẢO ĐIỀN/z7648668258889_50921869379d306ae0e155d6784dafa4.jpg"),
    ],
  },
  {
    name: "Private Resident – Bình Dương",
    year: "2021",
    cover: e("photos/CT/PRIVATE RESIDENT ( BINH DUONG )/main.jpg"),
    photos: [
      e("photos/CT/PRIVATE RESIDENT ( BINH DUONG )/main.jpg"),
      e("photos/CT/PRIVATE RESIDENT ( BINH DUONG )/270255094_1267387043742889_2129287397831394921_n.jpg"),
      e("photos/CT/PRIVATE RESIDENT ( BINH DUONG )/270382514_145064381219070_8025224364206930678_n.jpg"),
      e("photos/CT/PRIVATE RESIDENT ( BINH DUONG )/271748119_145064367885738_6747422466468919539_n.jpg"),
      e("photos/CT/PRIVATE RESIDENT ( BINH DUONG )/271885352_145064294552412_854493187644353716_n.jpg"),
    ],
  },
  {
    name: "CT Anh Tâm – Thủ Dầu Một",
    year: "2021",
    cover: e("photos/CT/CT ANH TÂM - THỦ DẦU MỘT/main.jpg"),
    photos: [
      e("photos/CT/CT ANH TÂM - THỦ DẦU MỘT/main.jpg"),
      e("photos/CT/CT ANH TÂM - THỦ DẦU MỘT/145250236_1053152928499636_8983928726142175707_n.jpg"),
      e("photos/CT/CT ANH TÂM - THỦ DẦU MỘT/145349759_1053152825166313_4622665047202296211_n.jpg"),
      e("photos/CT/CT ANH TÂM - THỦ DẦU MỘT/147278058_1053152898499639_8388114328228546847_n.jpg"),
    ],
  },
  {
    name: "Anh Long – Thuận An",
    year: "2022",
    cover: e("photos/CT/ANH LONG - THUẬN AN BD/main.jpg"),
    photos: [
      e("photos/CT/ANH LONG - THUẬN AN BD/main.jpg"),
      e("photos/CT/ANH LONG - THUẬN AN BD/z6001798243652_440afff9f7298dec50d42c1651206142.jpg"),
      e("photos/CT/ANH LONG - THUẬN AN BD/z6001798254175_bfd31685ac7f56c09ccdc141f3da91c8.jpg"),
    ],
  },
  {
    name: "CT Anh Vũ – Lâm Đồng",
    year: "2023",
    cover: e("photos/CT/CT ANH VŨ - LÂM ĐỒNG/main.png"),
    photos: [
      e("photos/CT/CT ANH VŨ - LÂM ĐỒNG/main.png"),
      e("photos/CT/CT ANH VŨ - LÂM ĐỒNG/10.png"),
      e("photos/CT/CT ANH VŨ - LÂM ĐỒNG/11.png"),
    ],
  },
  {
    name: "CT Chị Thùy – Lái Thiêu",
    year: "2024",
    cover: e("photos/CT/CT CHỊ THÙY LÁI THIÊU/main.png"),
    photos: [
      e("photos/CT/CT CHỊ THÙY LÁI THIÊU/main.png"),
      e("photos/CT/CT CHỊ THÙY LÁI THIÊU/12.png"),
      e("photos/CT/CT CHỊ THÙY LÁI THIÊU/15.png"),
      e("photos/CT/CT CHỊ THÙY LÁI THIÊU/z7689856165383_513f500d02a2a7aa9d33f4c514b8af35.jpg"),
      e("photos/CT/CT CHỊ THÙY LÁI THIÊU/z7689856173029_20709352d349bef57cb6a029cd27d188.jpg"),
    ],
  },
  {
    name: "Gò Công – Tiền Giang",
    year: "2022",
    cover: e("photos/CT/GÒ CÔNG - TIỀN GIANG/main.jpg"),
    photos: [
      e("photos/CT/GÒ CÔNG - TIỀN GIANG/main.jpg"),
      e("photos/CT/GÒ CÔNG - TIỀN GIANG/z6001786159387_a292c79e8f6733ac14a404ff19eeb768.jpg"),
      e("photos/CT/GÒ CÔNG - TIỀN GIANG/z6001786997366_e2fdd18d3cdf708677b58f401f1e2335.jpg"),
    ],
  },
  {
    name: "Phòng Sauna 1",
    year: "2022",
    cover: e("photos/CT/PHÒNG SAUNA 1/298754826_1410753066072952_158666123998050449_n.jpg"),
    photos: [
      e("photos/CT/PHÒNG SAUNA 1/298754826_1410753066072952_158666123998050449_n.jpg"),
      e("photos/CT/PHÒNG SAUNA 1/298799770_1410753092739616_3641453143522959281_n.jpg"),
      e("photos/CT/PHÒNG SAUNA 1/299071314_1410753156072943_9023091062281397649_n.jpg"),
      e("photos/CT/PHÒNG SAUNA 1/299101914_1410753812739544_7037121145382090201_n.jpg"),
    ],
  },
  {
    name: "Singapore International School",
    year: "2022",
    cover: e("photos/CT/SINGAPORE INTERNATITIONAL SCHOOL/main.jpg"),
    photos: [
      e("photos/CT/SINGAPORE INTERNATITIONAL SCHOOL/main.jpg"),
      e("photos/CT/SINGAPORE INTERNATITIONAL SCHOOL/273887113_150859223972919_178405544567450680_n.jpg"),
      e("photos/CT/SINGAPORE INTERNATITIONAL SCHOOL/274031266_150859233972918_6702729223654071584_n.jpg"),
    ],
  },
  {
    name: "Thuận An – Bình Dương",
    year: "2020",
    cover: e("photos/CT/THUẬN AN - BD/main.jpg"),
    photos: [
      e("photos/CT/THUẬN AN - BD/main.jpg"),
      e("photos/CT/THUẬN AN - BD/115765989_915588362256094_2551826720722931032_n.jpg"),
      e("photos/CT/THUẬN AN - BD/116253019_915588478922749_4710923537349340389_n.jpg"),
      e("photos/CT/THUẬN AN - BD/116443757_915588445589419_8559847386291417476_n.jpg"),
      e("photos/CT/THUẬN AN - BD/116455554_915588495589414_7741820830875850095_n.jpg"),
    ],
  },
  {
    name: "Thảo Điền – Q2",
    year: "2020",
    cover: e("photos/CT/THẢO ĐIỀN - Q2/main.jpg"),
    photos: [
      e("photos/CT/THẢO ĐIỀN - Q2/main.jpg"),
      e("photos/CT/THẢO ĐIỀN - Q2/120277032_961350977679832_9138570838912859010_n.jpg"),
      e("photos/CT/THẢO ĐIỀN - Q2/120293312_961351134346483_5320060672932495169_n.jpg"),
      e("photos/CT/THẢO ĐIỀN - Q2/120553060_961351084346488_3860618796638349751_n.jpg"),
    ],
  },
  {
    name: "Thủ Dầu Một – Bình Dương",
    year: "2020",
    cover: e("photos/CT/THỦ DẦU MỘT - BD/main.jpg"),
    photos: [
      e("photos/CT/THỦ DẦU MỘT - BD/main.jpg"),
      e("photos/CT/THỦ DẦU MỘT - BD/107829315_905592516589012_3131941180020331065_n.jpg"),
      e("photos/CT/THỦ DẦU MỘT - BD/109141275_905592576589006_6489856170585189167_n.jpg"),
      e("photos/CT/THỦ DẦU MỘT - BD/109714159_905592433255687_7937341406033198976_n.jpg"),
      e("photos/CT/THỦ DẦU MỘT - BD/110199054_905592546589009_6812740844022215080_n.jpg"),
    ],
  },
  {
    name: "CT Trường Bùi Thị Xuân – Đồng Nai",
    year: "2024",
    cover: e("photos/CT/CT TRƯỜNG BÙI THỊ XUÂN - ĐỒNG NAI/main.jpg"),
    photos: [
      e("photos/CT/CT TRƯỜNG BÙI THỊ XUÂN - ĐỒNG NAI/main.jpg"),
      e("photos/CT/CT TRƯỜNG BÙI THỊ XUÂN - ĐỒNG NAI/z7666947551801_80c6b1908e7de04eb9a9e18a68ee4d8f.jpg"),
      e("photos/CT/CT TRƯỜNG BÙI THỊ XUÂN - ĐỒNG NAI/z7666947585115_2d130f7ce1d2f01124b8762da2a4fcbd.jpg"),
      e("photos/CT/CT TRƯỜNG BÙI THỊ XUÂN - ĐỒNG NAI/z7666947585116_3f700f005f684737a08fa0a30bc69bb0.jpg"),
    ],
  },
  {
    name: "Phòng Sauna 2",
    year: "2021",
    cover: e("photos/CT/PHÒNG SAUNA 2/158291248_1074429726371956_6726411855873353599_n.jpg"),
    photos: [
      e("photos/CT/PHÒNG SAUNA 2/158291248_1074429726371956_6726411855873353599_n.jpg"),
      e("photos/CT/PHÒNG SAUNA 2/158445487_1074429849705277_2070508328466625463_n.jpg"),
      e("photos/CT/PHÒNG SAUNA 2/158618802_1074429823038613_4521882971511355926_n.jpg"),
      e("photos/CT/PHÒNG SAUNA 2/158828456_1074429746371954_5827632627542097321_n.jpg"),
    ],
  },
];

export default PROJECTS;
