// SSoT Data Engine for Top Heroes Pets Calculators
// Auto-generated from game cache Meta.bytes v1.0.43637 & Locale_vi.bytes v1.0.43593

export type PetRarity = "rare" | "epic" | "legendary" | "mythic";
export type PetFaction = "league" | "horde" | "nature" | "special";

export interface PetForm {
  formNumber: number;
  nameVi: string;
  headName: string;
  headPath: string;
  illustrationPath: string;
}

export interface PetSkillInfo {
  id: number;
  nameVi: string;
  desc1: string;
  params1: string;
  desc2: string;
  desc3: string;
  desc4: string;
}

export interface PetDefinition {
  id: number;
  nameVi: string;
  nameEn: string;
  faction: PetFaction;
  factionVi: string;
  rarity: PetRarity;
  isNew: boolean;
  avatarPath: string;
  originBreak: number;
  maxBreak: number;
  forms: PetForm[];
  skills: PetSkillInfo[];
}

export interface PetLevelCost {
  level: number;
  foodCost: number;
  essenceCost: number;
  cumulativeFood: number;
  cumulativeEssence: number;
  fightforce: number;
}

export interface PetBreakMilestone {
  breakIndex: number;
  tierNameVi: string;
  starCount: number;
  maxPetLevel: number;
  inheritancePct: number;
  sameCopiesCost: number;
  anyFodderCost: number;
  essenceCost: number;
  cumulativeSameCopies: number;
  cumulativeAnyFodder: number;
  cumulativeEssence: number;
  form: number;
  skillLevels: string;
}

export interface PetLevelUpgradeInput {
  fromLevel: number;
  toLevel: number;
  ownedFood?: number;
  ownedEssence?: number;
}

export interface PetLevelUpgradeResult {
  fromLevel: number;
  toLevel: number;
  requiredFood: number;
  requiredEssence: number;
  missingFood: number;
  missingEssence: number;
  garEventPoints: number;
  breakdown: Array<{
    level: number;
    stepFood: number;
    stepEssence: number;
    cumulativeFood: number;
    cumulativeEssence: number;
    fightforce: number;
  }>;
}

export interface PetBreakthroughInput {
  fromBreak: number;
  toBreak: number;
  ownedSame?: number;
  ownedAny?: number;
  ownedEssence?: number;
}

export interface PetBreakthroughResult {
  fromBreak: number;
  toBreak: number;
  requiredSameCopies: number;
  requiredAnyFodder: number;
  requiredEssence: number;
  missingSameCopies: number;
  missingAnyFodder: number;
  missingEssence: number;
  currentInheritancePct: number;
  targetInheritancePct: number;
  statGainPct: number;
  targetForm: number;
  breakdown: Array<{
    breakIndex: number;
    tierNameVi: string;
    stepSame: number;
    stepAny: number;
    stepEssence: number;
    cumulativeSame: number;
    cumulativeAny: number;
    cumulativeEssence: number;
    inheritancePct: number;
    maxLevel: number;
  }>;
}

export const PET_CATALOG: PetDefinition[] = [
  {
    "id": 830001,
    "nameVi": "Quái Dẻo",
    "nameEn": "Quái Dẻo",
    "faction": "league",
    "factionVi": "Liên Minh",
    "rarity": "rare",
    "isNew": false,
    "avatarPath": "/images/pets/avatars/Head_pet_101.webp",
    "originBreak": 0,
    "maxBreak": 17,
    "forms": [
      {
        "formNumber": 1,
        "nameVi": "Quái Dẻo",
        "headName": "Head_pet_101",
        "headPath": "/images/pets/avatars/Head_pet_101.webp",
        "illustrationPath": "/images/pets/illustrations/pet_101.webp"
      },
      {
        "formNumber": 2,
        "nameVi": "Quái Dẻo Thủy Tinh",
        "headName": "Head_pet_102",
        "headPath": "/images/pets/avatars/Head_pet_102.webp",
        "illustrationPath": "/images/pets/illustrations/pet_102.webp"
      },
      {
        "formNumber": 3,
        "nameVi": "Vua Slime",
        "headName": "Head_pet_103",
        "headPath": "/images/pets/avatars/Head_pet_103.webp",
        "illustrationPath": "/images/pets/illustrations/pet_103.webp"
      },
      {
        "formNumber": 4,
        "nameVi": "Quái Dẻo Vương Quân",
        "headName": "Head_pet_104",
        "headPath": "/images/pets/avatars/Head_pet_104.webp",
        "illustrationPath": "/images/pets/illustrations/pet_104.webp"
      }
    ],
    "skills": [
      {
        "id": 8300101,
        "nameVi": "Sắc Bén",
        "desc1": "tăng {0}% sức tấn công cho toàn thể đơn vị phe ta (gồm Vật Triệu Hồi), duy trì {1}s, CD {2}s",
        "params1": "5,8,12",
        "desc2": "Bonus Tấn Công tăng thêm {0}% ",
        "desc3": "Bonus Tấn Công tăng thêm {0}% ",
        "desc4": ""
      },
      {
        "id": 8300102,
        "nameVi": "Kiên Cố",
        "desc1": "Khi trong trận, tất cả Anh Hùng phe ta Giảm ST tăng {0}%, cứ {1}s hồi cho tất cả Anh Hùng {2}% HP tối đa",
        "params1": "10,3,1",
        "desc2": "Hiệu quả hồi HP tăng thêm {0}%",
        "desc3": "Hiệu quả hồi HP tăng thêm {0}%",
        "desc4": ""
      },
      {
        "id": 8300103,
        "nameVi": "Bành Trướng",
        "desc1": "Khi bắt đầu chiến đấu cung cấp hiệu quả Bành Trướng cho {0} Anh Hùng phe ta, khiến Bạo Kích của Anh Hùng này tăng vĩnh viễn {1}%, ST Bạo Kích tăng vĩnh viễn {2}%",
        "params1": "1,6,10",
        "desc2": "",
        "desc3": "",
        "desc4": ""
      }
    ]
  },
  {
    "id": 830002,
    "nameVi": "Thỏ Con",
    "nameEn": "Thỏ Con",
    "faction": "nature",
    "factionVi": "Thiên Nhiên",
    "rarity": "rare",
    "isNew": false,
    "avatarPath": "/images/pets/avatars/Head_pet_701.webp",
    "originBreak": 0,
    "maxBreak": 17,
    "forms": [
      {
        "formNumber": 1,
        "nameVi": "Thỏ Con",
        "headName": "Head_pet_701",
        "headPath": "/images/pets/avatars/Head_pet_701.webp",
        "illustrationPath": "/images/pets/illustrations/pet_701.webp"
      },
      {
        "formNumber": 2,
        "nameVi": "Thỏ Nhỏ Gắt Gỏng",
        "headName": "Head_pet_702",
        "headPath": "/images/pets/avatars/Head_pet_702.webp",
        "illustrationPath": "/images/pets/illustrations/pet_702.webp"
      },
      {
        "formNumber": 3,
        "nameVi": "Ngài Thỏ",
        "headName": "Head_pet_703",
        "headPath": "/images/pets/avatars/Head_pet_703.webp",
        "illustrationPath": "/images/pets/illustrations/pet_703.webp"
      },
      {
        "formNumber": 4,
        "nameVi": "Thỏ Cà Rốt",
        "headName": "Head_pet_704",
        "headPath": "/images/pets/avatars/Head_pet_704.webp",
        "illustrationPath": "/images/pets/illustrations/pet_704.webp"
      }
    ],
    "skills": [
      {
        "id": 8300201,
        "nameVi": "Trợn Mắt",
        "desc1": "Giảm {0}% sức tấn công của tất cả đơn vị địch (bao gồm Vật Triệu Hồi), kéo dài {1} giây, CD {2} giây",
        "params1": "5,8,12",
        "desc2": "Hiệu quả giảm Tấn Công tăng thêm {0}%",
        "desc3": "Hiệu quả giảm Tấn Công tăng thêm {0}%",
        "desc4": ""
      },
      {
        "id": 8300202,
        "nameVi": "Bụi Bay",
        "desc1": "Khi xuất hiện, tất cả Anh Hùng phe ta nhận được {0}% Giảm ST Đòn Đánh Thường；mỗi {1} giây làm cho tất cả Anh Hùng phe ta nhận được {1}% Né kéo dài {2} giây",
        "params1": "12.5,6,2,1.5",
        "desc2": "Hiệu quả Né tăng thêm {0}%",
        "desc3": "Hiệu quả Né tăng thêm {0}%",
        "desc4": ""
      },
      {
        "id": 8300203,
        "nameVi": "Chạy Nhanh",
        "desc1": "Khi bắt đầu chiến đấu, cung cấp hiệu quả chạy nhanh cho {0} Anh Hùng, khiến tỷ lệ né của họ tăng vĩnh viễn {1}%, tốc độ di chuyển tăng vĩnh viễn {2}%",
        "params1": "1,5,10",
        "desc2": "",
        "desc3": "",
        "desc4": ""
      }
    ]
  },
  {
    "id": 830003,
    "nameVi": "Lợn Bé",
    "nameEn": "Lợn Bé",
    "faction": "horde",
    "factionVi": "Bộ Tộc",
    "rarity": "rare",
    "isNew": false,
    "avatarPath": "/images/pets/avatars/Head_pet_501.webp",
    "originBreak": 0,
    "maxBreak": 17,
    "forms": [
      {
        "formNumber": 1,
        "nameVi": "Lợn Bé",
        "headName": "Head_pet_501",
        "headPath": "/images/pets/avatars/Head_pet_501.webp",
        "illustrationPath": "/images/pets/illustrations/pet_501.webp"
      },
      {
        "formNumber": 2,
        "nameVi": "Lợn Bùn Đất",
        "headName": "Head_pet_502",
        "headPath": "/images/pets/avatars/Head_pet_502.webp",
        "illustrationPath": "/images/pets/illustrations/pet_502.webp"
      },
      {
        "formNumber": 3,
        "nameVi": "Lợn Nanh Nhọn",
        "headName": "Head_pet_503",
        "headPath": "/images/pets/avatars/Head_pet_503.webp",
        "illustrationPath": "/images/pets/illustrations/pet_503.webp"
      },
      {
        "formNumber": 4,
        "nameVi": "Lợn Đại Ca",
        "headName": "Head_pet_504",
        "headPath": "/images/pets/avatars/Head_pet_504.webp",
        "illustrationPath": "/images/pets/illustrations/pet_504.webp"
      }
    ],
    "skills": [
      {
        "id": 8300301,
        "nameVi": "Phẫn Nộ",
        "desc1": "Khiến toàn thể Anh Hùng phe ta Giảm ST tăng {0}%, duy trì {1}s, CD {2}s",
        "params1": "2.5,8,12",
        "desc2": "Tăng chỉ số Giảm Sát Thương thêm {0}%.",
        "desc3": "Tăng chỉ số Giảm Sát Thương thêm {0}%.",
        "desc4": ""
      },
      {
        "id": 8300302,
        "nameVi": "Da Cứng",
        "desc1": "Khi xuất hiện, tất cả Anh Hùng phe ta nhận được {0}% Giảm ST Skill; Cứ {1} giây cung cấp cho tất cả Anh Hùng một Khiên bằng {2}% HP của Vật Triệu Hồi, Khiên có thể hấp thụ {3}% sát thương, kéo dài {4} giây.",
        "params1": "12.5,9,5,40,6",
        "desc2": "Giá trị khiên tăng {0}%",
        "desc3": "Giá trị khiên tăng {0}%",
        "desc4": ""
      },
      {
        "id": 8300303,
        "nameVi": "Xung Phong",
        "desc1": "Khi bắt đầu chiến đấu, cung cấp hiệu quả Xung Phong cho {0} Anh Hùng, khiến Tốc Độ Đánh của anh hùng này tăng vĩnh viễn {1}%, Tăng ST Đòn Đánh Thường tăng vĩnh viễn {2}%",
        "params1": "1,18,6",
        "desc2": "",
        "desc3": "",
        "desc4": ""
      }
    ]
  },
  {
    "id": 840001,
    "nameVi": "Tia Điện",
    "nameEn": "Tia Điện",
    "faction": "league",
    "factionVi": "Liên Minh",
    "rarity": "mythic",
    "isNew": false,
    "avatarPath": "/images/pets/avatars/Head_pet_201.webp",
    "originBreak": 5,
    "maxBreak": 23,
    "forms": [
      {
        "formNumber": 1,
        "nameVi": "Tia Điện",
        "headName": "Head_pet_201",
        "headPath": "/images/pets/avatars/Head_pet_201.webp",
        "illustrationPath": "/images/pets/illustrations/pet_201.webp"
      },
      {
        "formNumber": 2,
        "nameVi": "Bạo Điện",
        "headName": "Head_pet_202",
        "headPath": "/images/pets/avatars/Head_pet_202.webp",
        "illustrationPath": "/images/pets/illustrations/pet_202.webp"
      },
      {
        "formNumber": 3,
        "nameVi": "Sấm Điện",
        "headName": "Head_pet_203",
        "headPath": "/images/pets/avatars/Head_pet_203.webp",
        "illustrationPath": "/images/pets/illustrations/pet_203.webp"
      },
      {
        "formNumber": 4,
        "nameVi": "Hoàng Điện",
        "headName": "Head_pet_204",
        "headPath": "/images/pets/avatars/Head_pet_204.webp",
        "illustrationPath": "/images/pets/illustrations/pet_204.webp"
      }
    ],
    "skills": [
      {
        "id": 8400101,
        "nameVi": "Vòng Chớp Điện",
        "desc1": "Áp dụng Vòng Chớp Điện cho {0} Anh Hùng ngẫu nhiên của phe ta, khiến cho {1} lần tấn công thường tiếp theo sẽ gây thêm 1 lần sát thương phạm vi bằng {2}% sức tấn công của bản thân, CD {3} giây",
        "params1": "2,4,120,10",
        "desc2": "Sát thương skill tăng {0}%",
        "desc3": "Tăng sát thương skill thêm {0}% và thi triển lên thêm {1} anh hùng.",
        "desc4": "Tăng sát thương skill thêm {0}% và thi triển lên thêm {1} anh hùng."
      },
      {
        "id": 8400102,
        "nameVi": "Thừa Thắng Truy Kích",
        "desc1": "Trong cuộc chiến, cứ có 1 kẻ địch tử trận (bao gồm Vật Triệu Hồi), toàn bộ Anh Hùng phe ta nhận được Tăng ST {0}%, có thể cộng dồn tối đa {1} tầng",
        "params1": "6,6",
        "desc2": "Tăng ST tăng thêm {0}%",
        "desc3": "Tăng ST tăng thêm {0}%",
        "desc4": "Tăng ST tăng thêm {0}%, số tầng có thể cộng dồn +{1}"
      },
      {
        "id": 8400103,
        "nameVi": "Thú Dữ Uy Hiếp",
        "desc1": "Khi bắt đầu trận chiến, số lượng anh hùng Liên Minh trong đội hình kích hoạt hiệu ứng Đe Dọa, mỗi anh hùng Liên Minh làm giảm lượng trị liệu nhận được của toàn bộ anh hùng phe đối phương đi {0}% và vĩnh viễn giảm thuộc tính \"Tăng Sát Thương Kỹ Năng\" đi {1}%.",
        "params1": "4,2",
        "desc2": "Khả năng giảm trị liệu trên mỗi anh hùng Liên Minh được tăng thêm {0}% và Sát Thương Skill tăng thêm {1}%.",
        "desc3": "Khả năng giảm trị liệu trên mỗi anh hùng Liên Minh được tăng thêm {0}% và Sát Thương Skill tăng thêm {1}%.",
        "desc4": ""
      },
      {
        "id": 8400104,
        "nameVi": "Bảo vệ của Liên Minh",
        "desc1": "Khi ra trận, việc có lần lượt {0}/{1}/{2} anh hùng Liên Minh trong đội sẽ làm tăng tương ứng {3}%/{4}%/{5}% Tấn Công Lính và {6}%/{7}%/{8}% HP Lính cho toàn bộ anh hùng.",
        "params1": "4,5,6,60,100,180,120,200,360",
        "desc2": "",
        "desc3": "",
        "desc4": ""
      }
    ]
  },
  {
    "id": 840002,
    "nameVi": "Gấu Cưng",
    "nameEn": "Gấu Cưng",
    "faction": "nature",
    "factionVi": "Thiên Nhiên",
    "rarity": "mythic",
    "isNew": false,
    "avatarPath": "/images/pets/avatars/Head_pet_401.webp",
    "originBreak": 5,
    "maxBreak": 23,
    "forms": [
      {
        "formNumber": 1,
        "nameVi": "Gấu Cưng",
        "headName": "Head_pet_401",
        "headPath": "/images/pets/avatars/Head_pet_401.webp",
        "illustrationPath": "/images/pets/illustrations/pet_401.webp"
      },
      {
        "formNumber": 2,
        "nameVi": "Gấu Gầm",
        "headName": "Head_pet_402",
        "headPath": "/images/pets/avatars/Head_pet_402.webp",
        "illustrationPath": "/images/pets/illustrations/pet_402.webp"
      },
      {
        "formNumber": 3,
        "nameVi": "Gấu Nanh Nghiến",
        "headName": "Head_pet_403",
        "headPath": "/images/pets/avatars/Head_pet_403.webp",
        "illustrationPath": "/images/pets/illustrations/pet_403.webp"
      },
      {
        "formNumber": 4,
        "nameVi": "Gấu Núi Nâu",
        "headName": "Head_pet_404",
        "headPath": "/images/pets/avatars/Head_pet_404.webp",
        "illustrationPath": "/images/pets/illustrations/pet_404.webp"
      }
    ],
    "skills": [
      {
        "id": 8400301,
        "nameVi": "Skin Bền Chắc",
        "desc1": "Thi triển Bền cho tất cả Anh Hùng phe ta, làm giảm ST Bạo Kích nhận được {0}%, và nhận hiệu quả phản kích, mỗi lần nhận sát thương gây sát thương bằng {1}% sức tấn công của bản thân cho kẻ tấn công, duy trì {2} giây, CD {3} giây",
        "params1": "15,60,6,12",
        "desc2": "Bonus giảm ST Bạo Kích tăng thêm {0}%",
        "desc3": "Bonus giảm ST Bạo Kích tăng thêm {0}%; ST Phản Kích tăng thêm {1}%",
        "desc4": "Bonus giảm ST Bạo Kích tăng thêm {0}%; ST Phản Kích tăng thêm {1}%"
      },
      {
        "id": 8400302,
        "nameVi": "Thân Thể Mạnh Mẽ",
        "desc1": "Khi trong trận, điểm Khiên phe ta nhận được mỗi lần tăng {0}%, HP Vật Triệu Hồi tăng {1}%",
        "params1": "10,20",
        "desc2": "Giá trị hấp thụ của Khiên tăng thêm {0}%, đồng thời HP của đơn vị triệu hồi tăng thêm {1}%.",
        "desc3": "Giá trị hấp thụ của Khiên tăng thêm {0}%, đồng thời HP của đơn vị triệu hồi tăng thêm {1}%.",
        "desc4": "Giá trị hấp thụ của Khiên tăng thêm {0}%, đồng thời HP của đơn vị triệu hồi tăng thêm {1}%."
      },
      {
        "id": 8400303,
        "nameVi": "Sức Mạnh Gấu Lớn",
        "desc1": "Khi bắt đầu cuộc chiến, tăng {0}% Tấn Công cho tất cả Anh Hùng phe ta trong {1} giây. Với mỗi anh hùng Thiên Nhiên có trong đội sẽ khiến hiệu ứng này được tăng thêm {2} giây",
        "params1": "10,4,1",
        "desc2": "Bonus Tấn Công tăng thêm {0}% ",
        "desc3": "Bonus Tấn Công tăng thêm {0}% ",
        "desc4": ""
      },
      {
        "id": 8400304,
        "nameVi": "Bảo vệ của Thiên Nhiên",
        "desc1": "Khi ra trận, việc có lần lượt {0}/{1}/{2} anh hùng Thiên Nhiên trong đội sẽ làm tăng tương ứng {3}%/{4}%/{5}% Tấn Công Lính và {6}%/{7}%/{8}% HP Lính cho tất cả anh hùng.",
        "params1": "4,5,6,60,100,180,120,200,360",
        "desc2": "",
        "desc3": "",
        "desc4": ""
      }
    ]
  },
  {
    "id": 840003,
    "nameVi": "Sói Hú",
    "nameEn": "Sói Hú",
    "faction": "horde",
    "factionVi": "Bộ Tộc",
    "rarity": "mythic",
    "isNew": false,
    "avatarPath": "/images/pets/avatars/Head_pet_301.webp",
    "originBreak": 5,
    "maxBreak": 23,
    "forms": [
      {
        "formNumber": 1,
        "nameVi": "Sói Hú",
        "headName": "Head_pet_301",
        "headPath": "/images/pets/avatars/Head_pet_301.webp",
        "illustrationPath": "/images/pets/illustrations/pet_301.webp"
      },
      {
        "formNumber": 2,
        "nameVi": "Sói Vuốt Sắc",
        "headName": "Head_pet_302",
        "headPath": "/images/pets/avatars/Head_pet_302.webp",
        "illustrationPath": "/images/pets/illustrations/pet_302.webp"
      },
      {
        "formNumber": 3,
        "nameVi": "Sói Răng Kiếm",
        "headName": "Head_pet_303",
        "headPath": "/images/pets/avatars/Head_pet_303.webp",
        "illustrationPath": "/images/pets/illustrations/pet_303.webp"
      },
      {
        "formNumber": 4,
        "nameVi": "Sói Vương Chúa",
        "headName": "Head_pet_304",
        "headPath": "/images/pets/avatars/Head_pet_304.webp",
        "illustrationPath": "/images/pets/illustrations/pet_304.webp"
      }
    ],
    "skills": [
      {
        "id": 8400201,
        "nameVi": "Gió Phá Sát Thương",
        "desc1": "Cắn ngẫu nhiên {0} anh hùng địch, khiến họ nhận {1}% giá trị tối đa HP của mục tiêu mỗi giây, không vượt quá {2}% Tấn Công của Sói Đáng Sợ, và làm tăng {3}% sát thương nhận được, kéo dài {4} giây, thời gian hồi {5} giây",
        "params1": "2,4,300,5,5,10",
        "desc2": "ST dựa theo HP tối đa tăng thêm {0}%",
        "desc3": "ST dựa theo HP tối đa tăng thêm {0}%; Số lượng Anh Hùng mục tiêu+{1}",
        "desc4": "ST dựa theo HP tối đa tăng thêm {0}%; Số lượng Anh Hùng mục tiêu+{1}"
      },
      {
        "id": 8400202,
        "nameVi": "Nanh Vuốt Sắc Nhọn",
        "desc1": "Khi trong trận, tất cả Anh Hùng được thêm Tăng Sát Thương {0}%, đòn tấn công của họ sẽ bỏ qua {1}% Giảm Sát Thương phe địch.",
        "params1": "5,5",
        "desc2": "Bonus Tăng ST tăng thêm {0}%, bỏ qua Bonus Giảm ST tăng thêm {1}%",
        "desc3": "Bonus Tăng ST tăng thêm {0}%, bỏ qua Bonus Giảm ST tăng thêm {1}%",
        "desc4": "Bonus Tăng ST tăng thêm {0}%, bỏ qua Bonus Giảm ST tăng thêm {1}%"
      },
      {
        "id": 8400203,
        "nameVi": "Tiếng Gọi Hoang Dã",
        "desc1": "Khi bắt đầu chiến đấu, thi triển {0} tầng hiệu quả Cường Công cho tất cả Anh Hùng Bộ Lạc của phe ta, mỗi tầng Cường Công cung cấp {1}% Giảm ST, {2}% Tăng ST, mất {3} tầng hiệu quả Cường Công mỗi giây",
        "params1": "10,1,2,1",
        "desc2": "Mỗi cộng dồn cung cấp thêm {0}% Giảm ST, và thêm {1}% Tăng ST, cùng với +{2} cộng dồn.",
        "desc3": "Mỗi cộng dồn cung cấp thêm {0}% Giảm ST, và thêm {1}% Tăng ST, cùng với +{2} cộng dồn.",
        "desc4": ""
      },
      {
        "id": 8400204,
        "nameVi": "Bảo vệ của Bộ Lạc",
        "desc1": "Khi ra trận, việc có lần lượt {0}/{1}/{2} anh hùng Bộ Tộc trong đội sẽ làm tăng tương ứng {3}%/{4}%/{5}% Tấn Công Lính và {6}%/{7}%/{8}% HP Lính cho tất cả anh hùng.",
        "params1": "4,5,6,60,100,180,120,200,360",
        "desc2": "",
        "desc3": "",
        "desc4": ""
      }
    ]
  },
  {
    "id": 840004,
    "nameVi": "Bé Trứng",
    "nameEn": "Bé Trứng",
    "faction": "league",
    "factionVi": "Liên Minh",
    "rarity": "mythic",
    "isNew": false,
    "avatarPath": "/images/pets/avatars/Head_pet_601.webp",
    "originBreak": 5,
    "maxBreak": 23,
    "forms": [
      {
        "formNumber": 1,
        "nameVi": "Bé Trứng",
        "headName": "Head_pet_601",
        "headPath": "/images/pets/avatars/Head_pet_601.webp",
        "illustrationPath": "/images/pets/illustrations/pet_601.webp"
      },
      {
        "formNumber": 2,
        "nameVi": "Gà Tây Dũng Cảm",
        "headName": "Head_pet_602",
        "headPath": "/images/pets/avatars/Head_pet_602.webp",
        "illustrationPath": "/images/pets/illustrations/pet_602.webp"
      },
      {
        "formNumber": 3,
        "nameVi": "Quý Ông Gà Tây",
        "headName": "Head_pet_603",
        "headPath": "/images/pets/avatars/Head_pet_603.webp",
        "illustrationPath": "/images/pets/illustrations/pet_603.webp"
      },
      {
        "formNumber": 4,
        "nameVi": "Gà Công Tước",
        "headName": "Head_pet_604",
        "headPath": "/images/pets/avatars/Head_pet_604.webp",
        "illustrationPath": "/images/pets/illustrations/pet_604.webp"
      }
    ],
    "skills": [
      {
        "id": 8400401,
        "nameVi": "Tạ Ơn",
        "desc1": "Thêm hiệu quả Tạ Ơn cho {0} Anh Hùng phe ta ngẫu nhiên, khiến nó Bạo Kích Skill+{1}% và ST Bạo Kích Skill+{2}%, duy trì {3}s, CD {4}s",
        "params1": "2,10,20,6,10",
        "desc2": "Bonus ST Bạo Kích Skill thêm +{0}%",
        "desc3": "Bonus ST Bạo Kích Skill thêm +{0}%; Số lượng Anh Hùng mục tiêu+{1}",
        "desc4": "Bonus Bạo Kích Skill thêm +{0}%; Số lượng Anh Hùng mục tiêu+{1}"
      },
      {
        "id": 8400402,
        "nameVi": "Dũng Khí Quyết Thắng",
        "desc1": "Trong cuộc chiến, cứ có 1 kẻ địch tử trận (bao gồm Vật Triệu Hồi), toàn bộ Anh Hùng phe ta nhận được Tăng ST {0}%, có thể cộng dồn tối đa {1} tầng",
        "params1": "6,6",
        "desc2": "Tăng ST tăng thêm {0}%",
        "desc3": "Tăng ST tăng thêm {0}%",
        "desc4": "Tăng ST tăng thêm {0}%, số tầng có thể cộng dồn +{1}"
      },
      {
        "id": 8400403,
        "nameVi": "Quý Ông Hoàn Mỹ",
        "desc1": "Khi bắt đầu trận chiến, số lượng anh hùng Liên Minh trong đội hình kích hoạt hiệu ứng Đe Dọa, mỗi anh hùng Liên Minh làm giảm lượng trị liệu nhận được của toàn bộ anh hùng phe đối phương đi {0}% và vĩnh viễn giảm thuộc tính \"Tăng Sát Thương Kỹ Năng\" đi {1}%.",
        "params1": "4,2",
        "desc2": "Khả năng giảm trị liệu trên mỗi anh hùng Liên Minh được tăng thêm {0}% và Sát Thương Skill tăng thêm {1}%.",
        "desc3": "Khả năng giảm trị liệu trên mỗi anh hùng Liên Minh được tăng thêm {0}% và Sát Thương Skill tăng thêm {1}%.",
        "desc4": ""
      },
      {
        "id": 8400404,
        "nameVi": "Bảo vệ của Liên Minh",
        "desc1": "Khi ra trận, việc có lần lượt {0}/{1}/{2} anh hùng Liên Minh trong đội sẽ làm tăng tương ứng {3}%/{4}%/{5}% Tấn Công Lính và {6}%/{7}%/{8}% HP Lính cho toàn bộ anh hùng.",
        "params1": "4,5,6,60,100,180,120,200,360",
        "desc2": "",
        "desc3": "",
        "desc4": ""
      }
    ]
  },
  {
    "id": 840005,
    "nameVi": "Bé Xương Rồng",
    "nameEn": "Bé Xương Rồng",
    "faction": "nature",
    "factionVi": "Thiên Nhiên",
    "rarity": "mythic",
    "isNew": false,
    "avatarPath": "/images/pets/avatars/Head_pet_801.webp",
    "originBreak": 5,
    "maxBreak": 23,
    "forms": [
      {
        "formNumber": 1,
        "nameVi": "Bé Xương Rồng",
        "headName": "Head_pet_801",
        "headPath": "/images/pets/avatars/Head_pet_801.webp",
        "illustrationPath": "/images/pets/illustrations/pet_801.webp"
      },
      {
        "formNumber": 2,
        "nameVi": "Anh Xương Rồng",
        "headName": "Head_pet_802",
        "headPath": "/images/pets/avatars/Head_pet_802.webp",
        "illustrationPath": "/images/pets/illustrations/pet_802.webp"
      },
      {
        "formNumber": 3,
        "nameVi": "Dũng Sĩ Xương Rồng",
        "headName": "Head_pet_803",
        "headPath": "/images/pets/avatars/Head_pet_803.webp",
        "illustrationPath": "/images/pets/illustrations/pet_803.webp"
      },
      {
        "formNumber": 4,
        "nameVi": "Xương Rồng Báo Thù",
        "headName": "Head_pet_804",
        "headPath": "/images/pets/avatars/Head_pet_804.webp",
        "illustrationPath": "/images/pets/illustrations/pet_804.webp"
      }
    ],
    "skills": [
      {
        "id": 8400501,
        "nameVi": "Xuất Kích Gai Nhọn",
        "desc1": "Thi triển Gai Nhọn ngẫu nhiên tấn công {0} Anh Hùng địch, gây cho nó ST bằng {1}% Tấn Công của bản thân, và khiến nó giảm TL Bạo Kích {2}%, duy trì {3}s, CD {4}s",
        "params1": "2,300,10,3,10",
        "desc2": "Hiệu quả giảm Bạo Kích thêm +{0}%",
        "desc3": "Hiệu quả giảm Bạo Kích thêm +{0}%; Số lượng Anh Hùng mục tiêu+{1}",
        "desc4": "Hiệu quả giảm Bạo Kích thêm +{0}%; Số lượng Anh Hùng mục tiêu+{1}"
      },
      {
        "id": 8400502,
        "nameVi": "Sức Sống Bền Bỉ",
        "desc1": "Khi trong trận, điểm Khiên phe ta nhận được mỗi lần tăng {0}%, HP Vật Triệu Hồi tăng {1}%",
        "params1": "10,20",
        "desc2": "Giá trị hấp thụ của Khiên tăng thêm {0}%, đồng thời HP của đơn vị triệu hồi tăng thêm {1}%.",
        "desc3": "Giá trị hấp thụ của Khiên tăng thêm {0}%, đồng thời HP của đơn vị triệu hồi tăng thêm {1}%.",
        "desc4": "Giá trị hấp thụ của Khiên tăng thêm {0}%, đồng thời HP của đơn vị triệu hồi tăng thêm {1}%."
      },
      {
        "id": 8400503,
        "nameVi": "Cổ Vũ Chiến Binh",
        "desc1": "Khi bắt đầu cuộc chiến, tăng {0}% Tấn Công cho tất cả Anh Hùng phe ta trong {1} giây. Với mỗi anh hùng Thiên Nhiên có trong đội sẽ khiến hiệu ứng này được tăng thêm {2} giây",
        "params1": "10,4,1",
        "desc2": "Bonus Tấn Công tăng thêm {0}% ",
        "desc3": "Bonus Tấn Công tăng thêm {0}% ",
        "desc4": ""
      },
      {
        "id": 8400504,
        "nameVi": "Bảo vệ của Thiên Nhiên",
        "desc1": "Khi ra trận, việc có lần lượt {0}/{1}/{2} anh hùng Thiên Nhiên trong đội sẽ làm tăng tương ứng {3}%/{4}%/{5}% Tấn Công Lính và {6}%/{7}%/{8}% HP Lính cho tất cả anh hùng.",
        "params1": "4,5,6,60,100,180,120,200,360",
        "desc2": "",
        "desc3": "",
        "desc4": ""
      }
    ]
  },
  {
    "id": 840006,
    "nameVi": "Bé Bóng Tuyết",
    "nameEn": "Bé Bóng Tuyết",
    "faction": "nature",
    "factionVi": "Thiên Nhiên",
    "rarity": "mythic",
    "isNew": false,
    "avatarPath": "/images/pets/avatars/Head_pet_901.webp",
    "originBreak": 5,
    "maxBreak": 23,
    "forms": [
      {
        "formNumber": 1,
        "nameVi": "Bé Bóng Tuyết",
        "headName": "Head_pet_901",
        "headPath": "/images/pets/avatars/Head_pet_901.webp",
        "illustrationPath": "/images/pets/illustrations/pet_901.webp"
      },
      {
        "formNumber": 2,
        "nameVi": "Tuyết Vui Nhộn",
        "headName": "Head_pet_902",
        "headPath": "/images/pets/avatars/Head_pet_902.webp",
        "illustrationPath": "/images/pets/illustrations/pet_902.webp"
      },
      {
        "formNumber": 3,
        "nameVi": "Tuyết Vương Kiêu",
        "headName": "Head_pet_903",
        "headPath": "/images/pets/avatars/Head_pet_903.webp",
        "illustrationPath": "/images/pets/illustrations/pet_903.webp"
      },
      {
        "formNumber": 4,
        "nameVi": "Tuyết Sư Quý Tộc",
        "headName": "Head_pet_904",
        "headPath": "/images/pets/avatars/Head_pet_904.webp",
        "illustrationPath": "/images/pets/illustrations/pet_904.webp"
      }
    ],
    "skills": [
      {
        "id": 8400601,
        "nameVi": "Băng Phách Nộ",
        "desc1": "Giải phóng làm sương lạnh khiến {0} anh hùng phe địch bị giảm Tốc Độ Đánh đi {1}% và giảm Tốc Độ Di Chuyển đi {2}%, kéo dài trong {3} giây. Hồi chiêu: {4} giây.",
        "params1": "3,20,5,3,10",
        "desc2": "Hiệu ứng giảm công tốc tăng thêm {0}%",
        "desc3": "Hiệu ứng giảm công tốc tăng thêm {0}%. Số lượng mục tiêu anh hùng địch +{1}",
        "desc4": "Hiệu ứng giảm công tốc tăng thêm {0}%. Số lượng mục tiêu anh hùng địch +{1}"
      },
      {
        "id": 8400602,
        "nameVi": "Hộ Vệ Băng",
        "desc1": "Khi trong trận, điểm Khiên phe ta nhận được mỗi lần tăng {0}%, HP Vật Triệu Hồi tăng {1}%",
        "params1": "10,20",
        "desc2": "Giá trị hấp thụ của Khiên tăng thêm {0}%, đồng thời HP của đơn vị triệu hồi tăng thêm {1}%.",
        "desc3": "Giá trị hấp thụ của Khiên tăng thêm {0}%, đồng thời HP của đơn vị triệu hồi tăng thêm {1}%.",
        "desc4": "Giá trị hấp thụ của Khiên tăng thêm {0}%, đồng thời HP của đơn vị triệu hồi tăng thêm {1}%."
      },
      {
        "id": 8400603,
        "nameVi": "Bảo Vật Hoàng Tộc",
        "desc1": "Khi bắt đầu cuộc chiến, tăng {0}% Tấn Công cho tất cả Anh Hùng phe ta trong {1} giây. Với mỗi anh hùng Thiên Nhiên có trong đội sẽ khiến hiệu ứng này được tăng thêm {2} giây",
        "params1": "10,4,1",
        "desc2": "Bonus Tấn Công tăng thêm {0}% ",
        "desc3": "Bonus Tấn Công tăng thêm {0}% ",
        "desc4": ""
      },
      {
        "id": 8400604,
        "nameVi": "Bảo vệ của Thiên Nhiên",
        "desc1": "Khi ra trận, việc có lần lượt {0}/{1}/{2} anh hùng Thiên Nhiên trong đội sẽ làm tăng tương ứng {3}%/{4}%/{5}% Tấn Công Lính và {6}%/{7}%/{8}% HP Lính cho tất cả anh hùng.",
        "params1": "4,5,6,60,100,180,120,200,360",
        "desc2": "",
        "desc3": "",
        "desc4": ""
      }
    ]
  },
  {
    "id": 840007,
    "nameVi": "Mèo Ánh Lửa",
    "nameEn": "Mèo Ánh Lửa",
    "faction": "horde",
    "factionVi": "Bộ Tộc",
    "rarity": "mythic",
    "isNew": false,
    "avatarPath": "/images/pets/avatars/Head_pet_1001.webp",
    "originBreak": 5,
    "maxBreak": 23,
    "forms": [
      {
        "formNumber": 1,
        "nameVi": "Mèo Ánh Lửa",
        "headName": "Head_pet_1001",
        "headPath": "/images/pets/avatars/Head_pet_1001.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1001.webp"
      },
      {
        "formNumber": 2,
        "nameVi": "Mèo Cháy Rực",
        "headName": "Head_pet_1002",
        "headPath": "/images/pets/avatars/Head_pet_1002.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1002.webp"
      },
      {
        "formNumber": 3,
        "nameVi": "Mèo Vuốt Lửa",
        "headName": "Head_pet_1003",
        "headPath": "/images/pets/avatars/Head_pet_1003.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1003.webp"
      },
      {
        "formNumber": 4,
        "nameVi": "Hỏa Miêu Vằn",
        "headName": "Head_pet_1004",
        "headPath": "/images/pets/avatars/Head_pet_1004.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1004.webp"
      }
    ],
    "skills": [
      {
        "id": 8400701,
        "nameVi": "Hỏa Vũ Xoáy",
        "desc1": "Tấn công ngẫu nhiên {0} anh hùng phe địch, gây sát thương bằng {1}% Tấn Công và thi triển {2} cộng dồn Thiêu Đốt. Đồng thời làm giảm thuộc tính Giảm Sát Thương của chúng đi {3}% trong {4} giây. Hồi chiêu: {5} giây.\nThiêu Đốt: Kéo dài trong {6} giây, gây {7}% sát thương mỗi giây.",
        "params1": "4,100,1,6,3,10,8,30",
        "desc2": "Hiệu ứng giảm thuộc tính Giảm Sát Thương được tăng thêm {0}%",
        "desc3": "Hiệu ứng giảm thuộc tính Giảm Sát Thương được tăng thêm {0}%, và thêm +{1} cộng dồn Thiêu Đốt.",
        "desc4": "Hiệu ứng giảm thuộc tính Giảm Sát Thương được tăng thêm {0}%, và thêm +{1} cộng dồn Thiêu Đốt."
      },
      {
        "id": 8400702,
        "nameVi": "Phi Trảo",
        "desc1": "Khi trong trận, tất cả Anh Hùng được thêm Tăng Sát Thương {0}%, đòn tấn công của họ sẽ bỏ qua {1}% Giảm Sát Thương phe địch.",
        "params1": "5,5",
        "desc2": "Bonus Tăng ST tăng thêm {0}%, bỏ qua Bonus Giảm ST tăng thêm {1}%",
        "desc3": "Bonus Tăng ST tăng thêm {0}%, bỏ qua Bonus Giảm ST tăng thêm {1}%",
        "desc4": "Bonus Tăng ST tăng thêm {0}%, bỏ qua Bonus Giảm ST tăng thêm {1}%"
      },
      {
        "id": 8400703,
        "nameVi": "Ân Sủng Mèo Thần",
        "desc1": "Khi bắt đầu chiến đấu, thi triển {0} tầng hiệu quả Cường Công cho tất cả Anh Hùng Bộ Lạc của phe ta, mỗi tầng Cường Công cung cấp {1}% Giảm ST, {2}% Tăng ST, mất {3} tầng hiệu quả Cường Công mỗi giây",
        "params1": "10,1,2,1",
        "desc2": "Mỗi cộng dồn cung cấp thêm {0}% Giảm ST, và thêm {1}% Tăng ST, cùng với +{2} cộng dồn.",
        "desc3": "Mỗi cộng dồn cung cấp thêm {0}% Giảm ST, và thêm {1}% Tăng ST, cùng với +{2} cộng dồn.",
        "desc4": ""
      },
      {
        "id": 8400704,
        "nameVi": "Bảo vệ của Bộ Lạc",
        "desc1": "Khi ra trận, việc có lần lượt {0}/{1}/{2} anh hùng Bộ Tộc trong đội sẽ làm tăng tương ứng {3}%/{4}%/{5}% Tấn Công Lính và {6}%/{7}%/{8}% HP Lính cho tất cả anh hùng.",
        "params1": "4,5,6,60,100,180,120,200,360",
        "desc2": "",
        "desc3": "",
        "desc4": ""
      }
    ]
  },
  {
    "id": 840008,
    "nameVi": "Rắn Nanh Mầm",
    "nameEn": "Rắn Nanh Mầm",
    "faction": "nature",
    "factionVi": "Thiên Nhiên",
    "rarity": "mythic",
    "isNew": false,
    "avatarPath": "/images/pets/avatars/Head_pet_1101.webp",
    "originBreak": 5,
    "maxBreak": 23,
    "forms": [
      {
        "formNumber": 1,
        "nameVi": "Rắn Nanh Mầm",
        "headName": "Head_pet_1101",
        "headPath": "/images/pets/avatars/Head_pet_1101.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1101.webp"
      },
      {
        "formNumber": 2,
        "nameVi": "Rắn Vảy Xanh",
        "headName": "Head_pet_1102",
        "headPath": "/images/pets/avatars/Head_pet_1102.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1102.webp"
      },
      {
        "formNumber": 3,
        "nameVi": "Rắn Độc Vương",
        "headName": "Head_pet_1103",
        "headPath": "/images/pets/avatars/Head_pet_1103.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1103.webp"
      },
      {
        "formNumber": 4,
        "nameVi": "Yêu Xà",
        "headName": "Head_pet_1104",
        "headPath": "/images/pets/avatars/Head_pet_1104.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1104.webp"
      }
    ],
    "skills": [
      {
        "id": 8400801,
        "nameVi": "Phun Dịch Độc",
        "desc1": "Phóng dịch độc vào {0} kẻ địch ngẫu nhiên, gây sát thương bằng {1}% Tấn Công và giảm Phòng Thủ của chúng đi {2}% trong {3} giây. Giảm phòng thủ tối đa ở mức: {4}. Hồi chiêu: {5} giây.",
        "params1": "2,300,5,3,2000,10",
        "desc2": "Thêm giảm phòng thủ: +{0}%, giảm tối đa ở mức: {1}.",
        "desc3": "Thêm giảm phòng thủ: +{0}%, tối đa ở mức: {1}. Số lượng mục tiêu anh hùng địch +{2}.",
        "desc4": "Thêm giảm phòng thủ: +{0}%, tối đa ở mức: {1}. Số lượng mục tiêu anh hùng địch +{2}."
      },
      {
        "id": 8400802,
        "nameVi": "Giáp Vảy Kiên Cố",
        "desc1": "Khi trong trận, điểm Khiên phe ta nhận được mỗi lần tăng {0}%, HP Vật Triệu Hồi tăng {1}%",
        "params1": "10,20",
        "desc2": "Giá trị hấp thụ của Khiên tăng thêm {0}%, đồng thời HP của đơn vị triệu hồi tăng thêm {1}%.",
        "desc3": "Giá trị hấp thụ của Khiên tăng thêm {0}%, đồng thời HP của đơn vị triệu hồi tăng thêm {1}%.",
        "desc4": "Giá trị hấp thụ của Khiên tăng thêm {0}%, đồng thời HP của đơn vị triệu hồi tăng thêm {1}%."
      },
      {
        "id": 8400803,
        "nameVi": "Vương Miện Rắn",
        "desc1": "Khi bắt đầu cuộc chiến, tăng {0}% Tấn Công cho tất cả Anh Hùng phe ta trong {1} giây. Với mỗi anh hùng Thiên Nhiên có trong đội sẽ khiến hiệu ứng này được tăng thêm {2} giây",
        "params1": "10,4,1",
        "desc2": "Bonus Tấn Công tăng thêm {0}% ",
        "desc3": "Bonus Tấn Công tăng thêm {0}% ",
        "desc4": ""
      },
      {
        "id": 8400804,
        "nameVi": "Bảo vệ của Thiên Nhiên",
        "desc1": "Khi ra trận, việc có lần lượt {0}/{1}/{2} anh hùng Thiên Nhiên trong đội sẽ làm tăng tương ứng {3}%/{4}%/{5}% Tấn Công Lính và {6}%/{7}%/{8}% HP Lính cho tất cả anh hùng.",
        "params1": "4,5,6,60,100,180,120,200,360",
        "desc2": "",
        "desc3": "",
        "desc4": ""
      }
    ]
  },
  {
    "id": 840009,
    "nameVi": "Hổ Tí Nị",
    "nameEn": "Hổ Tí Nị",
    "faction": "horde",
    "factionVi": "Bộ Tộc",
    "rarity": "mythic",
    "isNew": false,
    "avatarPath": "/images/pets/avatars/Head_pet_1301.webp",
    "originBreak": 5,
    "maxBreak": 23,
    "forms": [
      {
        "formNumber": 1,
        "nameVi": "Hổ Tí Nị",
        "headName": "Head_pet_1301",
        "headPath": "/images/pets/avatars/Head_pet_1301.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1301.webp"
      },
      {
        "formNumber": 2,
        "nameVi": "Hổ Ánh Lửa",
        "headName": "Head_pet_1302",
        "headPath": "/images/pets/avatars/Head_pet_1302.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1302.webp"
      },
      {
        "formNumber": 3,
        "nameVi": "Hổ Hỏa Thần",
        "headName": "Head_pet_1303",
        "headPath": "/images/pets/avatars/Head_pet_1303.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1303.webp"
      },
      {
        "formNumber": 4,
        "nameVi": "Mãnh Hổ Vương",
        "headName": "Head_pet_1304",
        "headPath": "/images/pets/avatars/Head_pet_1304.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1304.webp"
      }
    ],
    "skills": [
      {
        "id": 8400901,
        "nameVi": "Đe Dọa",
        "desc1": "Tấn công ngẫu nhiên {0} anh hùng phe địch, gây sát thương bằng {1}% Tấn Công và làm giảm chỉ số Tăng Sát Thương của chúng đi {2}% trong {3} giây. Hồi chiêu: {4} giây.",
        "params1": "2,300,6,5,10",
        "desc2": "Hiệu ứng giảm chỉ số Tăng Sát Thương sẽ được tăng thêm {0}%.",
        "desc3": "Hiệu ứng giảm chỉ số Tăng Sát Thương sẽ được tăng thêm {0}%. Số lượng mục tiêu anh hùng địch +{1}.",
        "desc4": "Hiệu ứng giảm chỉ số Tăng Sát Thương sẽ được tăng thêm {0}%. Số lượng mục tiêu anh hùng địch +{1}."
      },
      {
        "id": 8400902,
        "nameVi": "Hổ Gầm",
        "desc1": "Khi trong trận, tất cả Anh Hùng được thêm Tăng Sát Thương {0}%, đòn tấn công của họ sẽ bỏ qua {1}% Giảm Sát Thương phe địch.",
        "params1": "5,5",
        "desc2": "Bonus Tăng ST tăng thêm {0}%, bỏ qua Bonus Giảm ST tăng thêm {1}%",
        "desc3": "Bonus Tăng ST tăng thêm {0}%, bỏ qua Bonus Giảm ST tăng thêm {1}%",
        "desc4": "Bonus Tăng ST tăng thêm {0}%, bỏ qua Bonus Giảm ST tăng thêm {1}%"
      },
      {
        "id": 8400903,
        "nameVi": "Uy Quyền Mãnh Vương",
        "desc1": "Khi bắt đầu chiến đấu, thi triển {0} tầng hiệu quả Cường Công cho tất cả Anh Hùng Bộ Lạc của phe ta, mỗi tầng Cường Công cung cấp {1}% Giảm ST, {2}% Tăng ST, mất {3} tầng hiệu quả Cường Công mỗi giây",
        "params1": "10,1,2,1",
        "desc2": "Mỗi cộng dồn cung cấp thêm {0}% Giảm ST, và thêm {1}% Tăng ST, cùng với +{2} cộng dồn.",
        "desc3": "Mỗi cộng dồn cung cấp thêm {0}% Giảm ST, và thêm {1}% Tăng ST, cùng với +{2} cộng dồn.",
        "desc4": ""
      },
      {
        "id": 8400904,
        "nameVi": "Bảo vệ của Bộ Lạc",
        "desc1": "Khi ra trận, việc có lần lượt {0}/{1}/{2} anh hùng Bộ Tộc trong đội sẽ làm tăng tương ứng {3}%/{4}%/{5}% Tấn Công Lính và {6}%/{7}%/{8}% HP Lính cho tất cả anh hùng.",
        "params1": "4,5,6,60,100,180,120,200,360",
        "desc2": "",
        "desc3": "",
        "desc4": ""
      }
    ]
  },
  {
    "id": 840010,
    "nameVi": "Bé Nến",
    "nameEn": "Bé Nến",
    "faction": "league",
    "factionVi": "Liên Minh",
    "rarity": "mythic",
    "isNew": false,
    "avatarPath": "/images/pets/avatars/Head_pet_1401.webp",
    "originBreak": 5,
    "maxBreak": 23,
    "forms": [
      {
        "formNumber": 1,
        "nameVi": "Bé Nến",
        "headName": "Head_pet_1401",
        "headPath": "/images/pets/avatars/Head_pet_1401.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1401.webp"
      },
      {
        "formNumber": 2,
        "nameVi": "Nến Cưng",
        "headName": "Head_pet_1402",
        "headPath": "/images/pets/avatars/Head_pet_1402.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1402.webp"
      },
      {
        "formNumber": 3,
        "nameVi": "Nến Xinh",
        "headName": "Head_pet_1403",
        "headPath": "/images/pets/avatars/Head_pet_1403.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1403.webp"
      },
      {
        "formNumber": 4,
        "nameVi": "Nữ Vương Đèn Lồng",
        "headName": "Head_pet_1404",
        "headPath": "/images/pets/avatars/Head_pet_1404.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1404.webp"
      }
    ],
    "skills": [
      {
        "id": 8401001,
        "nameVi": "Ngọn Lửa Nến",
        "desc1": "Trao Ngọn Lửa Nến cho {0} anh hùng đồng minh ngẫu nhiên (ưu tiên anh hùng hàng trước). Giúp nhận {1}% giảm sát thương từ đòn tấn công thường và gây {2}% sát thương tấn công mỗi giây lên các mục tiêu địch gần kề trong vòng {3} giây. Hồi chiêu: {4} giây.",
        "params1": "2,6,60,5,10",
        "desc2": "Hiệu ứng Giảm Sát Thương từ đòn Đòn Đánh Thường tăng thêm +{0}%",
        "desc3": "Hiệu ứng Giảm Sát Thương từ đòn Đòn Đánh Thường tăng +{0}%. Số Anh Hùng Mục Tiêu +{1}.",
        "desc4": "Hiệu ứng Giảm Sát Thương từ đòn Đòn Đánh Thường tăng +{0}%. Số Anh Hùng Mục Tiêu +{1}."
      },
      {
        "id": 8401002,
        "nameVi": "Hoài Niệm",
        "desc1": "Trong cuộc chiến, cứ có 1 kẻ địch tử trận (bao gồm Vật Triệu Hồi), toàn bộ Anh Hùng phe ta nhận được Tăng ST {0}%, có thể cộng dồn tối đa {1} tầng",
        "params1": "6,6",
        "desc2": "Tăng ST tăng thêm {0}%",
        "desc3": "Tăng ST tăng thêm {0}%",
        "desc4": "Tăng ST tăng thêm {0}%, số tầng có thể cộng dồn +{1}"
      },
      {
        "id": 8401003,
        "nameVi": "Hội Tụ Ánh Sáng",
        "desc1": "Khi bắt đầu trận chiến, số lượng anh hùng Liên Minh trong đội hình kích hoạt hiệu ứng Đe Dọa, mỗi anh hùng Liên Minh làm giảm lượng trị liệu nhận được của toàn bộ anh hùng phe đối phương đi {0}% và vĩnh viễn giảm thuộc tính \"Tăng Sát Thương Kỹ Năng\" đi {1}%.",
        "params1": "4,2",
        "desc2": "Khả năng giảm trị liệu trên mỗi anh hùng Liên Minh được tăng thêm {0}% và Sát Thương Skill tăng thêm {1}%.",
        "desc3": "Khả năng giảm trị liệu trên mỗi anh hùng Liên Minh được tăng thêm {0}% và Sát Thương Skill tăng thêm {1}%.",
        "desc4": ""
      },
      {
        "id": 8401004,
        "nameVi": "Bảo vệ của Liên Minh",
        "desc1": "Khi ra trận, việc có lần lượt {0}/{1}/{2} anh hùng Liên Minh trong đội sẽ làm tăng tương ứng {3}%/{4}%/{5}% Tấn Công Lính và {6}%/{7}%/{8}% HP Lính cho toàn bộ anh hùng.",
        "params1": "4,5,6,60,100,180,120,200,360",
        "desc2": "",
        "desc3": "",
        "desc4": ""
      }
    ]
  },
  {
    "id": 840011,
    "nameVi": "Tiểu Hồ",
    "nameEn": "Tiểu Hồ",
    "faction": "league",
    "factionVi": "Liên Minh",
    "rarity": "mythic",
    "isNew": false,
    "avatarPath": "/images/pets/avatars/Head_pet_1201.webp",
    "originBreak": 5,
    "maxBreak": 23,
    "forms": [
      {
        "formNumber": 1,
        "nameVi": "Tiểu Hồ",
        "headName": "Head_pet_1201",
        "headPath": "/images/pets/avatars/Head_pet_1201.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1201.webp"
      },
      {
        "formNumber": 2,
        "nameVi": "Tuyết Tử",
        "headName": "Head_pet_1202",
        "headPath": "/images/pets/avatars/Head_pet_1202.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1202.webp"
      },
      {
        "formNumber": 3,
        "nameVi": "Huyễn Linh",
        "headName": "Head_pet_1203",
        "headPath": "/images/pets/avatars/Head_pet_1203.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1203.webp"
      },
      {
        "formNumber": 4,
        "nameVi": "Đại Hồ Tỷ",
        "headName": "Head_pet_1204",
        "headPath": "/images/pets/avatars/Head_pet_1204.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1204.webp"
      }
    ],
    "skills": [
      {
        "id": 8401101,
        "nameVi": "Hỏa Thiêu",
        "desc1": "Tấn công ngẫu nhiên {0} anh hùng phe địch, gây sát thương bằng {1}% Tấn Công và làm giảm chỉ số Tấn Công của chúng đi {2}% trong {3} giây. Hồi chiêu: {4} giây.",
        "params1": "2,300,12,5,10",
        "desc2": "Hiệu ứng giảm Tấn Công được tăng thêm {0}%",
        "desc3": "Hiệu ứng giảm Tấn Công được tăng thêm {0}%. Số lượng anh hùng mục tiêu +{1}",
        "desc4": "Hiệu ứng giảm Tấn Công được tăng thêm {0}%. Số lượng anh hùng mục tiêu +{1}"
      },
      {
        "id": 8401102,
        "nameVi": "Nội Tâm",
        "desc1": "Trong cuộc chiến, cứ có 1 kẻ địch tử trận (bao gồm Vật Triệu Hồi), toàn bộ Anh Hùng phe ta nhận được Tăng ST {0}%, có thể cộng dồn tối đa {1} tầng",
        "params1": "6,6",
        "desc2": "Tăng ST tăng thêm {0}%",
        "desc3": "Tăng ST tăng thêm {0}%",
        "desc4": "Tăng ST tăng thêm {0}%, số tầng có thể cộng dồn +{1}"
      },
      {
        "id": 8401103,
        "nameVi": "Quý Phái",
        "desc1": "Khi bắt đầu trận chiến, số lượng anh hùng Liên Minh trong đội hình kích hoạt hiệu ứng Đe Dọa, mỗi anh hùng Liên Minh làm giảm lượng trị liệu nhận được của toàn bộ anh hùng phe đối phương đi {0}% và vĩnh viễn giảm thuộc tính \"Tăng Sát Thương Kỹ Năng\" đi {1}%.",
        "params1": "4,2",
        "desc2": "Khả năng giảm trị liệu trên mỗi anh hùng Liên Minh được tăng thêm {0}% và Sát Thương Skill tăng thêm {1}%.",
        "desc3": "Khả năng giảm trị liệu trên mỗi anh hùng Liên Minh được tăng thêm {0}% và Sát Thương Skill tăng thêm {1}%.",
        "desc4": ""
      },
      {
        "id": 8401104,
        "nameVi": "Bảo vệ của Liên Minh",
        "desc1": "Khi ra trận, việc có lần lượt {0}/{1}/{2} anh hùng Liên Minh trong đội sẽ làm tăng tương ứng {3}%/{4}%/{5}% Tấn Công Lính và {6}%/{7}%/{8}% HP Lính cho toàn bộ anh hùng.",
        "params1": "4,5,6,60,100,180,120,200,360",
        "desc2": "",
        "desc3": "",
        "desc4": ""
      }
    ]
  },
  {
    "id": 840012,
    "nameVi": "Thời Long - Chronos",
    "nameEn": "Thời Long - Chronos",
    "faction": "horde",
    "factionVi": "Bộ Tộc",
    "rarity": "mythic",
    "isNew": false,
    "avatarPath": "/images/pets/avatars/Head_pet_1501.webp",
    "originBreak": 5,
    "maxBreak": 23,
    "forms": [
      {
        "formNumber": 1,
        "nameVi": "Thời Long - Chronos",
        "headName": "Head_pet_1501",
        "headPath": "/images/pets/avatars/Head_pet_1501.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1501.webp"
      },
      {
        "formNumber": 2,
        "nameVi": "Thời Long - Chronos",
        "headName": "Head_pet_1502",
        "headPath": "/images/pets/avatars/Head_pet_1502.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1502.webp"
      },
      {
        "formNumber": 3,
        "nameVi": "Thời Long - Chronos",
        "headName": "Head_pet_1503",
        "headPath": "/images/pets/avatars/Head_pet_1503.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1503.webp"
      },
      {
        "formNumber": 4,
        "nameVi": "Thời Long - Chronos",
        "headName": "Head_pet_1504",
        "headPath": "/images/pets/avatars/Head_pet_1504.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1504.webp"
      }
    ],
    "skills": [
      {
        "id": 8401201,
        "nameVi": "Long Hỏa Viêm",
        "desc1": "Tấn công ngẫu nhiên {0} anh hùng địch, gây sát thương bằng {1}% Tấn Công và làm giảm chỉ số Sát Thương Bạo Kích của chúng đi {2}% trong {3} giây. Hồi chiêu: {4} giây.",
        "params1": "2,300,20,5,10",
        "desc2": "Hiệu ứng giảm Sát Thương Bạo Kích được tăng thêm {0}%",
        "desc3": "Hiệu ứng giảm Sát Thương Bạo Kích được tăng thêm {0}%. Số lượng anh hùng mục tiêu +{1}",
        "desc4": "Hiệu ứng giảm Sát Thương Bạo Kích được tăng thêm {0}%. Số lượng anh hùng mục tiêu +{1}"
      },
      {
        "id": 8401202,
        "nameVi": "Long Trảo",
        "desc1": "Khi trong trận, tất cả Anh Hùng được thêm Tăng Sát Thương {0}%, đòn tấn công của họ sẽ bỏ qua {1}% Giảm Sát Thương phe địch.",
        "params1": "5,5",
        "desc2": "Bonus Tăng ST tăng thêm {0}%, bỏ qua Bonus Giảm ST tăng thêm {1}%",
        "desc3": "Bonus Tăng ST tăng thêm {0}%, bỏ qua Bonus Giảm ST tăng thêm {1}%",
        "desc4": "Bonus Tăng ST tăng thêm {0}%, bỏ qua Bonus Giảm ST tăng thêm {1}%"
      },
      {
        "id": 8401203,
        "nameVi": "Uy Long",
        "desc1": "Khi bắt đầu chiến đấu, thi triển {0} tầng hiệu quả Cường Công cho tất cả Anh Hùng Bộ Lạc của phe ta, mỗi tầng Cường Công cung cấp {1}% Giảm ST, {2}% Tăng ST, mất {3} tầng hiệu quả Cường Công mỗi giây",
        "params1": "10,1,2,1",
        "desc2": "Mỗi cộng dồn cung cấp thêm {0}% Giảm ST, và thêm {1}% Tăng ST, cùng với +{2} cộng dồn.",
        "desc3": "Mỗi cộng dồn cung cấp thêm {0}% Giảm ST, và thêm {1}% Tăng ST, cùng với +{2} cộng dồn.",
        "desc4": ""
      },
      {
        "id": 8401204,
        "nameVi": "Bảo vệ của Bộ Lạc",
        "desc1": "Khi ra trận, việc có lần lượt {0}/{1}/{2} anh hùng Bộ Tộc trong đội sẽ làm tăng tương ứng {3}%/{4}%/{5}% Tấn Công Lính và {6}%/{7}%/{8}% HP Lính cho tất cả anh hùng.",
        "params1": "4,5,6,60,100,180,120,200,360",
        "desc2": "",
        "desc3": "",
        "desc4": ""
      }
    ]
  },
  {
    "id": 840013,
    "nameVi": "Thiên Mã",
    "nameEn": "Thiên Mã",
    "faction": "nature",
    "factionVi": "Thiên Nhiên",
    "rarity": "mythic",
    "isNew": false,
    "avatarPath": "/images/pets/avatars/Head_pet_1601.webp",
    "originBreak": 5,
    "maxBreak": 23,
    "forms": [
      {
        "formNumber": 1,
        "nameVi": "Thiên Mã",
        "headName": "Head_pet_1601",
        "headPath": "/images/pets/avatars/Head_pet_1601.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1601.webp"
      },
      {
        "formNumber": 2,
        "nameVi": "Thiên Mã",
        "headName": "Head_pet_1602",
        "headPath": "/images/pets/avatars/Head_pet_1602.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1602.webp"
      },
      {
        "formNumber": 3,
        "nameVi": "Thiên Mã",
        "headName": "Head_pet_1603",
        "headPath": "/images/pets/avatars/Head_pet_1603.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1603.webp"
      },
      {
        "formNumber": 4,
        "nameVi": "Thiên Mã",
        "headName": "Head_pet_1604",
        "headPath": "/images/pets/avatars/Head_pet_1604.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1604.webp"
      }
    ],
    "skills": [
      {
        "id": 8401301,
        "nameVi": "Lốc Xoáy",
        "desc1": "Tấn công ngẫu nhiên {0} anh hùng phe địch, gây sát thương bằng {1}% Tấn Công và làm giảm chỉ số Tăng Sát Thương Skill của chúng đi {2}% trong {3} giây. Hồi chiêu: {4} giây.",
        "params1": "2,300,6,5,10",
        "desc2": "Hiệu ứng giảm chỉ số Tăng Sát Thương Skill sẽ được tăng thêm {0}%.",
        "desc3": "Hiệu ứng giảm chỉ số Tăng Sát Thương Skill sẽ được tăng thêm {0}%. Số lượng mục tiêu +{1}.",
        "desc4": "Hiệu ứng giảm chỉ số Tăng Sát Thương Skill sẽ được tăng thêm {0}%. Số lượng mục tiêu +{1}."
      },
      {
        "id": 8401302,
        "nameVi": "Lông Vũ Tơ Mềm",
        "desc1": "Khi trong trận, điểm Khiên phe ta nhận được mỗi lần tăng {0}%, HP Vật Triệu Hồi tăng {1}%",
        "params1": "10,20",
        "desc2": "Giá trị hấp thụ của Khiên tăng thêm {0}%, đồng thời HP của đơn vị triệu hồi tăng thêm {1}%.",
        "desc3": "Giá trị hấp thụ của Khiên tăng thêm {0}%, đồng thời HP của đơn vị triệu hồi tăng thêm {1}%.",
        "desc4": "Giá trị hấp thụ của Khiên tăng thêm {0}%, đồng thời HP của đơn vị triệu hồi tăng thêm {1}%."
      },
      {
        "id": 8401303,
        "nameVi": "Cuồng Loạn",
        "desc1": "Khi bắt đầu cuộc chiến, tăng {0}% Tấn Công cho tất cả Anh Hùng phe ta trong {1} giây. Với mỗi anh hùng Thiên Nhiên có trong đội sẽ khiến hiệu ứng này được tăng thêm {2} giây",
        "params1": "10,4,1",
        "desc2": "Bonus Tấn Công tăng thêm {0}% ",
        "desc3": "Bonus Tấn Công tăng thêm {0}% ",
        "desc4": ""
      },
      {
        "id": 8401304,
        "nameVi": "Bảo vệ của Thiên Nhiên",
        "desc1": "Khi ra trận, việc có lần lượt {0}/{1}/{2} anh hùng Thiên Nhiên trong đội sẽ làm tăng tương ứng {3}%/{4}%/{5}% Tấn Công Lính và {6}%/{7}%/{8}% HP Lính cho tất cả anh hùng.",
        "params1": "4,5,6,60,100,180,120,200,360",
        "desc2": "",
        "desc3": "",
        "desc4": ""
      }
    ]
  },
  {
    "id": 840014,
    "nameVi": "Cua Thủy Triều",
    "nameEn": "Cua Thủy Triều",
    "faction": "nature",
    "factionVi": "Thiên Nhiên",
    "rarity": "mythic",
    "isNew": false,
    "avatarPath": "/images/pets/avatars/Head_pet_1701.webp",
    "originBreak": 5,
    "maxBreak": 23,
    "forms": [
      {
        "formNumber": 1,
        "nameVi": "Cua Thủy Triều",
        "headName": "Head_pet_1701",
        "headPath": "/images/pets/avatars/Head_pet_1701.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1701.webp"
      },
      {
        "formNumber": 2,
        "nameVi": "Cua Thủy Triều",
        "headName": "Head_pet_1702",
        "headPath": "/images/pets/avatars/Head_pet_1702.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1702.webp"
      },
      {
        "formNumber": 3,
        "nameVi": "Cua Thủy Triều",
        "headName": "Head_pet_1703",
        "headPath": "/images/pets/avatars/Head_pet_1703.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1703.webp"
      },
      {
        "formNumber": 4,
        "nameVi": "Cua Thủy Triều",
        "headName": "Head_pet_1704",
        "headPath": "/images/pets/avatars/Head_pet_1704.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1704.webp"
      }
    ],
    "skills": [
      {
        "id": 8401401,
        "nameVi": "Kẹp Phát Đi Luôn",
        "desc1": "Thế Gọng Kìm nhắm vào {0} anh hùng địch ngẫu nhiên, gây sát thương mỗi giây bằng {1}% HP Tối đa của mục tiêu, đạt tối đa tại {2}% Tấn Công của Cua Thủy Triều và làm tăng {3}% sát thương nhận vào trong {4} giây. Hồi chiêu: {5} giây.",
        "params1": "2,4,300,5,5,10",
        "desc2": "ST dựa theo HP tối đa tăng thêm {0}%",
        "desc3": "ST dựa theo HP tối đa tăng thêm {0}%; Số lượng Anh Hùng mục tiêu+{1}",
        "desc4": "ST dựa theo HP tối đa tăng thêm {0}%; Số lượng Anh Hùng mục tiêu+{1}"
      },
      {
        "id": 8401402,
        "nameVi": "Thế Trận Vỏ Cứng",
        "desc1": "Khi trong trận, điểm Khiên phe ta nhận được mỗi lần tăng {0}%, HP Vật Triệu Hồi tăng {1}%",
        "params1": "10,20",
        "desc2": "Giá trị hấp thụ của Khiên tăng thêm {0}%, đồng thời HP của đơn vị triệu hồi tăng thêm {1}%.",
        "desc3": "Giá trị hấp thụ của Khiên tăng thêm {0}%, đồng thời HP của đơn vị triệu hồi tăng thêm {1}%.",
        "desc4": "Giá trị hấp thụ của Khiên tăng thêm {0}%, đồng thời HP của đơn vị triệu hồi tăng thêm {1}%."
      },
      {
        "id": 8401403,
        "nameVi": "Điên Cuồng",
        "desc1": "Khi bắt đầu cuộc chiến, tăng {0}% Tấn Công cho tất cả Anh Hùng phe ta trong {1} giây. Với mỗi anh hùng Thiên Nhiên có trong đội sẽ khiến hiệu ứng này được tăng thêm {2} giây",
        "params1": "10,4,1",
        "desc2": "Bonus Tấn Công tăng thêm {0}% ",
        "desc3": "Bonus Tấn Công tăng thêm {0}% ",
        "desc4": ""
      },
      {
        "id": 8401404,
        "nameVi": "Bảo vệ của Thiên Nhiên",
        "desc1": "Khi ra trận, việc có lần lượt {0}/{1}/{2} anh hùng Thiên Nhiên trong đội sẽ làm tăng tương ứng {3}%/{4}%/{5}% Tấn Công Lính và {6}%/{7}%/{8}% HP Lính cho tất cả anh hùng.",
        "params1": "4,5,6,60,100,180,120,200,360",
        "desc2": "",
        "desc3": "",
        "desc4": ""
      }
    ]
  },
  {
    "id": 840015,
    "nameVi": "Tia Lửa",
    "nameEn": "Tia Lửa",
    "faction": "horde",
    "factionVi": "Bộ Tộc",
    "rarity": "mythic",
    "isNew": false,
    "avatarPath": "/images/pets/avatars/Head_pet_1801.webp",
    "originBreak": 5,
    "maxBreak": 23,
    "forms": [
      {
        "formNumber": 1,
        "nameVi": "Tia Lửa",
        "headName": "Head_pet_1801",
        "headPath": "/images/pets/avatars/Head_pet_1801.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1801.webp"
      },
      {
        "formNumber": 2,
        "nameVi": "Tia Lửa",
        "headName": "Head_pet_1802",
        "headPath": "/images/pets/avatars/Head_pet_1802.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1802.webp"
      },
      {
        "formNumber": 3,
        "nameVi": "Tia Lửa",
        "headName": "Head_pet_1803",
        "headPath": "/images/pets/avatars/Head_pet_1803.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1803.webp"
      },
      {
        "formNumber": 4,
        "nameVi": "Tia Lửa",
        "headName": "Head_pet_1804",
        "headPath": "/images/pets/avatars/Head_pet_1804.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1804.webp"
      }
    ],
    "skills": [
      {
        "id": 8401501,
        "nameVi": "Tia Lửa",
        "desc1": "Trao Tia Lửa cho {0} anh hùng đồng minh ngẫu nhiên (ưu tiên anh hùng hàng trước). Giúp nhận {1}% giảm sát thương từ đòn tấn công thường và gây sát thương mỗi giây bằng {2}% Tấn Công lên các mục tiêu địch gần kề trong vòng {3} giây. Hồi chiêu: {4} giây.",
        "params1": "2,6,60,5,10",
        "desc2": "Hiệu ứng Giảm Sát Thương từ đòn Đòn Đánh Thường tăng thêm +{0}%",
        "desc3": "Hiệu ứng Giảm Sát Thương từ đòn Đòn Đánh Thường tăng +{0}%. Số Anh Hùng Mục Tiêu +{1}.",
        "desc4": "Hiệu ứng Giảm Sát Thương từ đòn Đòn Đánh Thường tăng +{0}%. Số Anh Hùng Mục Tiêu +{1}."
      },
      {
        "id": 8401502,
        "nameVi": "Lốc Xoáy Lửa",
        "desc1": "Khi trong trận, tất cả Anh Hùng được thêm Tăng Sát Thương {0}%, đòn tấn công của họ sẽ bỏ qua {1}% Giảm Sát Thương phe địch.",
        "params1": "5,5",
        "desc2": "Bonus Tăng ST tăng thêm {0}%, bỏ qua Bonus Giảm ST tăng thêm {1}%",
        "desc3": "Bonus Tăng ST tăng thêm {0}%, bỏ qua Bonus Giảm ST tăng thêm {1}%",
        "desc4": "Bonus Tăng ST tăng thêm {0}%, bỏ qua Bonus Giảm ST tăng thêm {1}%"
      },
      {
        "id": 8401503,
        "nameVi": "Hỏa Thần",
        "desc1": "Khi bắt đầu chiến đấu, thi triển {0} tầng hiệu quả Cường Công cho tất cả Anh Hùng Bộ Lạc của phe ta, mỗi tầng Cường Công cung cấp {1}% Giảm ST, {2}% Tăng ST, mất {3} tầng hiệu quả Cường Công mỗi giây",
        "params1": "10,1,2,1",
        "desc2": "Mỗi cộng dồn cung cấp thêm {0}% Giảm ST, và thêm {1}% Tăng ST, cùng với +{2} cộng dồn.",
        "desc3": "Mỗi cộng dồn cung cấp thêm {0}% Giảm ST, và thêm {1}% Tăng ST, cùng với +{2} cộng dồn.",
        "desc4": ""
      },
      {
        "id": 8401504,
        "nameVi": "Bảo vệ của Bộ Lạc",
        "desc1": "Khi ra trận, việc có lần lượt {0}/{1}/{2} anh hùng Bộ Tộc trong đội sẽ làm tăng tương ứng {3}%/{4}%/{5}% Tấn Công Lính và {6}%/{7}%/{8}% HP Lính cho tất cả anh hùng.",
        "params1": "4,5,6,60,100,180,120,200,360",
        "desc2": "",
        "desc3": "",
        "desc4": ""
      }
    ]
  },
  {
    "id": 840016,
    "nameVi": "Tia Chớp",
    "nameEn": "Tia Chớp",
    "faction": "league",
    "factionVi": "Liên Minh",
    "rarity": "mythic",
    "isNew": false,
    "avatarPath": "/images/pets/avatars/Head_pet_1901.webp",
    "originBreak": 5,
    "maxBreak": 23,
    "forms": [
      {
        "formNumber": 1,
        "nameVi": "Tia Chớp",
        "headName": "Head_pet_1901",
        "headPath": "/images/pets/avatars/Head_pet_1901.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1901.webp"
      },
      {
        "formNumber": 2,
        "nameVi": "Tia Chớp",
        "headName": "Head_pet_1902",
        "headPath": "/images/pets/avatars/Head_pet_1902.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1902.webp"
      },
      {
        "formNumber": 3,
        "nameVi": "Tia Chớp",
        "headName": "Head_pet_1903",
        "headPath": "/images/pets/avatars/Head_pet_1903.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1903.webp"
      },
      {
        "formNumber": 4,
        "nameVi": "Tia Chớp",
        "headName": "Head_pet_1904",
        "headPath": "/images/pets/avatars/Head_pet_1904.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1904.webp"
      }
    ],
    "skills": [
      {
        "id": 8401601,
        "nameVi": "Phản Đòn Chớp Nhoáng",
        "desc1": "Tăng cho toàn bộ anh hùng đồng minh hiệu ứng Phản Kích trong vòng {0} giây. Mỗi khi họ nhận phải sát thương, họ sẽ phản đòn với sát thương tương đương {1}% Tấn Công của chính họ lên kẻ ra đòn. Hồi chiêu: {2} giây.",
        "params1": "6,60,12",
        "desc2": "Sát thương đòn Phản Kích được tăng thêm {0}%. Khi trong trạng thái phản công sẽ được nhận {1}% Giảm Sát Thương Bạo Kích.",
        "desc3": "Sát Thương Phản Kích +{0}%; Giảm Sát Thương Bạo Kích +{1}%.",
        "desc4": "Sát Thương Phản Kích +{0}%; Giảm Sát Thương Bạo Kích +{1}%."
      },
      {
        "id": 8401602,
        "nameVi": "Tham Ăn",
        "desc1": "Trong cuộc chiến, cứ có 1 kẻ địch tử trận (bao gồm Vật Triệu Hồi), toàn bộ Anh Hùng phe ta nhận được Tăng ST {0}%, có thể cộng dồn tối đa {1} tầng",
        "params1": "6,6",
        "desc2": "Tăng ST tăng thêm {0}%",
        "desc3": "Tăng ST tăng thêm {0}%",
        "desc4": "Tăng ST tăng thêm {0}%, số tầng có thể cộng dồn +{1}"
      },
      {
        "id": 8401603,
        "nameVi": "Chậm Chạp",
        "desc1": "Khi bắt đầu trận chiến, số lượng anh hùng Liên Minh trong đội hình kích hoạt hiệu ứng Đe Dọa, mỗi anh hùng Liên Minh làm giảm lượng trị liệu nhận được của toàn bộ anh hùng phe đối phương đi {0}% và vĩnh viễn giảm thuộc tính \"Tăng Sát Thương Kỹ Năng\" đi {1}%.",
        "params1": "4,2",
        "desc2": "Khả năng giảm trị liệu trên mỗi anh hùng Liên Minh được tăng thêm {0}% và Sát Thương Skill tăng thêm {1}%.",
        "desc3": "Khả năng giảm trị liệu trên mỗi anh hùng Liên Minh được tăng thêm {0}% và Sát Thương Skill tăng thêm {1}%.",
        "desc4": ""
      },
      {
        "id": 8401604,
        "nameVi": "Bảo vệ của Liên Minh",
        "desc1": "Khi ra trận, việc có lần lượt {0}/{1}/{2} anh hùng Liên Minh trong đội sẽ làm tăng tương ứng {3}%/{4}%/{5}% Tấn Công Lính và {6}%/{7}%/{8}% HP Lính cho toàn bộ anh hùng.",
        "params1": "4,5,6,60,100,180,120,200,360",
        "desc2": "",
        "desc3": "",
        "desc4": ""
      }
    ]
  },
  {
    "id": 840017,
    "nameVi": "Dart",
    "nameEn": "Dart",
    "faction": "special",
    "factionVi": "Đặc Biệt",
    "rarity": "mythic",
    "isNew": false,
    "avatarPath": "/images/pets/avatars/Head_pet_2001.webp",
    "originBreak": 5,
    "maxBreak": 23,
    "forms": [
      {
        "formNumber": 1,
        "nameVi": "Dart",
        "headName": "Head_pet_2001",
        "headPath": "/images/pets/avatars/Head_pet_2001.webp",
        "illustrationPath": "/images/pets/illustrations/pet_2001.webp"
      },
      {
        "formNumber": 2,
        "nameVi": "Dart",
        "headName": "Head_pet_2002",
        "headPath": "/images/pets/avatars/Head_pet_2002.webp",
        "illustrationPath": "/images/pets/illustrations/pet_2002.webp"
      },
      {
        "formNumber": 3,
        "nameVi": "Dart",
        "headName": "Head_pet_2003",
        "headPath": "/images/pets/avatars/Head_pet_2003.webp",
        "illustrationPath": "/images/pets/illustrations/pet_2003.webp"
      },
      {
        "formNumber": 4,
        "nameVi": "Dart",
        "headName": "Head_pet_2004",
        "headPath": "/images/pets/avatars/Head_pet_2004.webp",
        "illustrationPath": "/images/pets/illustrations/pet_2004.webp"
      }
    ],
    "skills": [
      {
        "id": 8401701,
        "nameVi": "Cào Xé",
        "desc1": "Tấn công ngẫu nhiên {0} anh hùng phe địch, gây sát thương bằng {1}% Tấn Công. Hồi chiêu: {2} giây.",
        "params1": "4,400,6",
        "desc2": "Sát thương skill tăng {0}%",
        "desc3": "Sát thương skill tăng {0}%",
        "desc4": "Sát thương skill tăng {0}%"
      },
      {
        "id": 8401702,
        "nameVi": "Đe Đọa",
        "desc1": "Khi trận đấu bắt đầu, toàn bộ anh hùng phe ta nhận {0}% Tăng Sát Thương.",
        "params1": "6",
        "desc2": "Bonus sát thương tăng {0}%",
        "desc3": "Bonus sát thương tăng {0}%",
        "desc4": "Bonus sát thương tăng {0}%"
      },
      {
        "id": 8401703,
        "nameVi": "Lớp Da Cứng",
        "desc1": "Khi trận đấu bắt đầu, toàn bộ anh hùng phe ta nhận {0}% Giảm Sát Thương.",
        "params1": "6",
        "desc2": "Tăng chỉ số Giảm Sát Thương thêm {0}%.",
        "desc3": "Tăng chỉ số Giảm Sát Thương thêm {0}%.",
        "desc4": ""
      },
      {
        "id": 8401704,
        "nameVi": "Lớp Bảo Hộ Demo-chó",
        "desc1": "Khi ra trận, việc có lần lượt {0}/{1}/{2} anh hùng từ phẩm chất Cam trở lên, sẽ làm tăng tương ứng {3}%/{4}%/{5}% Tấn Công Lính và {6}%/{7}%/{8}% HP Lính cho tất cả anh hùng.",
        "params1": "4,5,6,60,100,180,120,200,360",
        "desc2": "",
        "desc3": "",
        "desc4": ""
      }
    ]
  },
  {
    "id": 840018,
    "nameVi": "Mỏ Sắt",
    "nameEn": "Mỏ Sắt",
    "faction": "league",
    "factionVi": "Liên Minh",
    "rarity": "mythic",
    "isNew": true,
    "avatarPath": "/images/pets/avatars/Head_pet_1904.webp",
    "originBreak": 5,
    "maxBreak": 23,
    "forms": [
      {
        "formNumber": 1,
        "nameVi": "Mỏ Sắt",
        "headName": "Head_pet_1904",
        "headPath": "/images/pets/avatars/Head_pet_1904.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1904.webp"
      },
      {
        "formNumber": 2,
        "nameVi": "Mỏ Sắt",
        "headName": "Head_pet_1904",
        "headPath": "/images/pets/avatars/Head_pet_1904.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1904.webp"
      },
      {
        "formNumber": 3,
        "nameVi": "Mỏ Sắt",
        "headName": "Head_pet_1904",
        "headPath": "/images/pets/avatars/Head_pet_1904.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1904.webp"
      },
      {
        "formNumber": 4,
        "nameVi": "Mỏ Sắt",
        "headName": "Head_pet_1904",
        "headPath": "/images/pets/avatars/Head_pet_1904.webp",
        "illustrationPath": "/images/pets/illustrations/pet_1904.webp"
      }
    ],
    "skills": [
      {
        "id": 8401801,
        "nameVi": "hero_skill_name_8401801",
        "desc1": "Phóng ra tia sét đánh ngẫu nhiên {0} anh hùng địch, gây sát thương mỗi giây bằng {1}% HP tối đa của mục tiêu (đạt tối đa tại {2}% ATK của Mỏ Sắt). Đồng thời tăng sát thương mà mục tiêu phải chịu thêm {3}% trong {4} giây. Hồi chiêu: {5} giây.",
        "params1": "2,4,300,5,5,10",
        "desc2": "ST dựa theo HP tối đa tăng thêm {0}%",
        "desc3": "ST dựa theo HP tối đa tăng thêm {0}%; Số lượng Anh Hùng mục tiêu+{1}",
        "desc4": "ST dựa theo HP tối đa tăng thêm {0}%; Số lượng Anh Hùng mục tiêu+{1}"
      },
      {
        "id": 8401802,
        "nameVi": "hero_skill_name_8401802",
        "desc1": "Trong cuộc chiến, cứ có 1 kẻ địch tử trận (bao gồm Vật Triệu Hồi), toàn bộ Anh Hùng phe ta nhận được Tăng ST {0}%, có thể cộng dồn tối đa {1} tầng",
        "params1": "6,6",
        "desc2": "Tăng ST tăng thêm {0}%",
        "desc3": "Tăng ST tăng thêm {0}%",
        "desc4": "Tăng ST tăng thêm {0}%, số tầng có thể cộng dồn +{1}"
      },
      {
        "id": 8401803,
        "nameVi": "hero_skill_name_8401803",
        "desc1": "Khi bắt đầu trận chiến, số lượng anh hùng Liên Minh trong đội hình kích hoạt hiệu ứng Đe Dọa, mỗi anh hùng Liên Minh làm giảm lượng trị liệu nhận được của toàn bộ anh hùng phe đối phương đi {0}% và vĩnh viễn giảm thuộc tính \"Tăng Sát Thương Kỹ Năng\" đi {1}%.",
        "params1": "4,2",
        "desc2": "Khả năng giảm trị liệu trên mỗi anh hùng Liên Minh được tăng thêm {0}% và Sát Thương Skill tăng thêm {1}%.",
        "desc3": "Khả năng giảm trị liệu trên mỗi anh hùng Liên Minh được tăng thêm {0}% và Sát Thương Skill tăng thêm {1}%.",
        "desc4": ""
      },
      {
        "id": 8401804,
        "nameVi": "Bảo vệ của Liên Minh",
        "desc1": "Khi ra trận, việc có lần lượt {0}/{1}/{2} anh hùng Liên Minh trong đội sẽ làm tăng tương ứng {3}%/{4}%/{5}% Tấn Công Lính và {6}%/{7}%/{8}% HP Lính cho toàn bộ anh hùng.",
        "params1": "4,5,6,60,100,180,120,200,360",
        "desc2": "",
        "desc3": "",
        "desc4": ""
      }
    ]
  }
];

export function getPetById(id: number): PetDefinition | undefined {
  return PET_CATALOG.find((p) => p.id === id);
}

export const PET_LEVEL_COSTS: PetLevelCost[] = [
  {
    "level": 1,
    "foodCost": 0,
    "essenceCost": 0,
    "cumulativeFood": 0,
    "cumulativeEssence": 0,
    "fightforce": 11060
  },
  {
    "level": 2,
    "foodCost": 100,
    "essenceCost": 0,
    "cumulativeFood": 100,
    "cumulativeEssence": 0,
    "fightforce": 13720
  },
  {
    "level": 3,
    "foodCost": 150,
    "essenceCost": 0,
    "cumulativeFood": 250,
    "cumulativeEssence": 0,
    "fightforce": 16380
  },
  {
    "level": 4,
    "foodCost": 200,
    "essenceCost": 0,
    "cumulativeFood": 450,
    "cumulativeEssence": 0,
    "fightforce": 19040
  },
  {
    "level": 5,
    "foodCost": 250,
    "essenceCost": 0,
    "cumulativeFood": 700,
    "cumulativeEssence": 0,
    "fightforce": 21700
  },
  {
    "level": 6,
    "foodCost": 300,
    "essenceCost": 0,
    "cumulativeFood": 1000,
    "cumulativeEssence": 0,
    "fightforce": 23888
  },
  {
    "level": 7,
    "foodCost": 400,
    "essenceCost": 0,
    "cumulativeFood": 1400,
    "cumulativeEssence": 0,
    "fightforce": 26076
  },
  {
    "level": 8,
    "foodCost": 500,
    "essenceCost": 0,
    "cumulativeFood": 1900,
    "cumulativeEssence": 0,
    "fightforce": 28264
  },
  {
    "level": 9,
    "foodCost": 600,
    "essenceCost": 0,
    "cumulativeFood": 2500,
    "cumulativeEssence": 0,
    "fightforce": 30452
  },
  {
    "level": 10,
    "foodCost": 700,
    "essenceCost": 0,
    "cumulativeFood": 3200,
    "cumulativeEssence": 0,
    "fightforce": 32641
  },
  {
    "level": 11,
    "foodCost": 800,
    "essenceCost": 0,
    "cumulativeFood": 4000,
    "cumulativeEssence": 0,
    "fightforce": 34892
  },
  {
    "level": 12,
    "foodCost": 900,
    "essenceCost": 0,
    "cumulativeFood": 4900,
    "cumulativeEssence": 0,
    "fightforce": 38263
  },
  {
    "level": 13,
    "foodCost": 1000,
    "essenceCost": 0,
    "cumulativeFood": 5900,
    "cumulativeEssence": 0,
    "fightforce": 41634
  },
  {
    "level": 14,
    "foodCost": 1100,
    "essenceCost": 0,
    "cumulativeFood": 7000,
    "cumulativeEssence": 0,
    "fightforce": 45005
  },
  {
    "level": 15,
    "foodCost": 1200,
    "essenceCost": 0,
    "cumulativeFood": 8200,
    "cumulativeEssence": 0,
    "fightforce": 48377
  },
  {
    "level": 16,
    "foodCost": 1300,
    "essenceCost": 0,
    "cumulativeFood": 9500,
    "cumulativeEssence": 0,
    "fightforce": 51811
  },
  {
    "level": 17,
    "foodCost": 1400,
    "essenceCost": 0,
    "cumulativeFood": 10900,
    "cumulativeEssence": 0,
    "fightforce": 55245
  },
  {
    "level": 18,
    "foodCost": 1500,
    "essenceCost": 0,
    "cumulativeFood": 12400,
    "cumulativeEssence": 0,
    "fightforce": 58679
  },
  {
    "level": 19,
    "foodCost": 1600,
    "essenceCost": 0,
    "cumulativeFood": 14000,
    "cumulativeEssence": 0,
    "fightforce": 62113
  },
  {
    "level": 20,
    "foodCost": 1700,
    "essenceCost": 0,
    "cumulativeFood": 15700,
    "cumulativeEssence": 0,
    "fightforce": 65548
  },
  {
    "level": 21,
    "foodCost": 1800,
    "essenceCost": 0,
    "cumulativeFood": 17500,
    "cumulativeEssence": 0,
    "fightforce": 69045
  },
  {
    "level": 22,
    "foodCost": 1900,
    "essenceCost": 0,
    "cumulativeFood": 19400,
    "cumulativeEssence": 0,
    "fightforce": 73802
  },
  {
    "level": 23,
    "foodCost": 2000,
    "essenceCost": 0,
    "cumulativeFood": 21400,
    "cumulativeEssence": 0,
    "fightforce": 78559
  },
  {
    "level": 24,
    "foodCost": 2100,
    "essenceCost": 0,
    "cumulativeFood": 23500,
    "cumulativeEssence": 0,
    "fightforce": 83316
  },
  {
    "level": 25,
    "foodCost": 2200,
    "essenceCost": 0,
    "cumulativeFood": 25700,
    "cumulativeEssence": 0,
    "fightforce": 88074
  },
  {
    "level": 26,
    "foodCost": 2300,
    "essenceCost": 0,
    "cumulativeFood": 28000,
    "cumulativeEssence": 0,
    "fightforce": 92894
  },
  {
    "level": 27,
    "foodCost": 2400,
    "essenceCost": 0,
    "cumulativeFood": 30400,
    "cumulativeEssence": 0,
    "fightforce": 97714
  },
  {
    "level": 28,
    "foodCost": 2500,
    "essenceCost": 0,
    "cumulativeFood": 32900,
    "cumulativeEssence": 0,
    "fightforce": 102534
  },
  {
    "level": 29,
    "foodCost": 2600,
    "essenceCost": 0,
    "cumulativeFood": 35500,
    "cumulativeEssence": 0,
    "fightforce": 107354
  },
  {
    "level": 30,
    "foodCost": 2750,
    "essenceCost": 0,
    "cumulativeFood": 38250,
    "cumulativeEssence": 0,
    "fightforce": 112175
  },
  {
    "level": 31,
    "foodCost": 2900,
    "essenceCost": 0,
    "cumulativeFood": 41150,
    "cumulativeEssence": 0,
    "fightforce": 119369
  },
  {
    "level": 32,
    "foodCost": 3050,
    "essenceCost": 0,
    "cumulativeFood": 44200,
    "cumulativeEssence": 0,
    "fightforce": 127824
  },
  {
    "level": 33,
    "foodCost": 3200,
    "essenceCost": 0,
    "cumulativeFood": 47400,
    "cumulativeEssence": 0,
    "fightforce": 136278
  },
  {
    "level": 34,
    "foodCost": 3350,
    "essenceCost": 0,
    "cumulativeFood": 50750,
    "cumulativeEssence": 0,
    "fightforce": 144733
  },
  {
    "level": 35,
    "foodCost": 3500,
    "essenceCost": 0,
    "cumulativeFood": 54250,
    "cumulativeEssence": 0,
    "fightforce": 153188
  },
  {
    "level": 36,
    "foodCost": 3650,
    "essenceCost": 0,
    "cumulativeFood": 57900,
    "cumulativeEssence": 0,
    "fightforce": 161869
  },
  {
    "level": 37,
    "foodCost": 3800,
    "essenceCost": 0,
    "cumulativeFood": 61700,
    "cumulativeEssence": 0,
    "fightforce": 170550
  },
  {
    "level": 38,
    "foodCost": 3950,
    "essenceCost": 0,
    "cumulativeFood": 65650,
    "cumulativeEssence": 0,
    "fightforce": 179232
  },
  {
    "level": 39,
    "foodCost": 4100,
    "essenceCost": 0,
    "cumulativeFood": 69750,
    "cumulativeEssence": 0,
    "fightforce": 187913
  },
  {
    "level": 40,
    "foodCost": 4300,
    "essenceCost": 0,
    "cumulativeFood": 74050,
    "cumulativeEssence": 0,
    "fightforce": 196595
  },
  {
    "level": 41,
    "foodCost": 4500,
    "essenceCost": 0,
    "cumulativeFood": 78550,
    "cumulativeEssence": 0,
    "fightforce": 207216
  },
  {
    "level": 42,
    "foodCost": 4700,
    "essenceCost": 0,
    "cumulativeFood": 83250,
    "cumulativeEssence": 0,
    "fightforce": 219518
  },
  {
    "level": 43,
    "foodCost": 4900,
    "essenceCost": 0,
    "cumulativeFood": 88150,
    "cumulativeEssence": 0,
    "fightforce": 231820
  },
  {
    "level": 44,
    "foodCost": 5100,
    "essenceCost": 0,
    "cumulativeFood": 93250,
    "cumulativeEssence": 0,
    "fightforce": 244122
  },
  {
    "level": 45,
    "foodCost": 5300,
    "essenceCost": 0,
    "cumulativeFood": 98550,
    "cumulativeEssence": 0,
    "fightforce": 256424
  },
  {
    "level": 46,
    "foodCost": 5500,
    "essenceCost": 0,
    "cumulativeFood": 104050,
    "cumulativeEssence": 0,
    "fightforce": 269066
  },
  {
    "level": 47,
    "foodCost": 5700,
    "essenceCost": 0,
    "cumulativeFood": 109750,
    "cumulativeEssence": 0,
    "fightforce": 283108
  },
  {
    "level": 48,
    "foodCost": 5900,
    "essenceCost": 0,
    "cumulativeFood": 115650,
    "cumulativeEssence": 0,
    "fightforce": 297150
  },
  {
    "level": 49,
    "foodCost": 6100,
    "essenceCost": 0,
    "cumulativeFood": 121750,
    "cumulativeEssence": 0,
    "fightforce": 311192
  },
  {
    "level": 50,
    "foodCost": 6350,
    "essenceCost": 0,
    "cumulativeFood": 128100,
    "cumulativeEssence": 0,
    "fightforce": 325234
  },
  {
    "level": 51,
    "foodCost": 6600,
    "essenceCost": 0,
    "cumulativeFood": 134700,
    "cumulativeEssence": 0,
    "fightforce": 341443
  },
  {
    "level": 52,
    "foodCost": 6850,
    "essenceCost": 0,
    "cumulativeFood": 141550,
    "cumulativeEssence": 0,
    "fightforce": 359192
  },
  {
    "level": 53,
    "foodCost": 7100,
    "essenceCost": 0,
    "cumulativeFood": 148650,
    "cumulativeEssence": 0,
    "fightforce": 376941
  },
  {
    "level": 54,
    "foodCost": 7350,
    "essenceCost": 0,
    "cumulativeFood": 156000,
    "cumulativeEssence": 0,
    "fightforce": 394690
  },
  {
    "level": 55,
    "foodCost": 7600,
    "essenceCost": 0,
    "cumulativeFood": 163600,
    "cumulativeEssence": 0,
    "fightforce": 412440
  },
  {
    "level": 56,
    "foodCost": 7850,
    "essenceCost": 0,
    "cumulativeFood": 171450,
    "cumulativeEssence": 0,
    "fightforce": 430642
  },
  {
    "level": 57,
    "foodCost": 8100,
    "essenceCost": 0,
    "cumulativeFood": 179550,
    "cumulativeEssence": 0,
    "fightforce": 451645
  },
  {
    "level": 58,
    "foodCost": 8350,
    "essenceCost": 0,
    "cumulativeFood": 187900,
    "cumulativeEssence": 0,
    "fightforce": 472648
  },
  {
    "level": 59,
    "foodCost": 8600,
    "essenceCost": 0,
    "cumulativeFood": 196500,
    "cumulativeEssence": 0,
    "fightforce": 493651
  },
  {
    "level": 60,
    "foodCost": 8850,
    "essenceCost": 0,
    "cumulativeFood": 205350,
    "cumulativeEssence": 0,
    "fightforce": 514654
  },
  {
    "level": 61,
    "foodCost": 9100,
    "essenceCost": 0,
    "cumulativeFood": 214450,
    "cumulativeEssence": 0,
    "fightforce": 538697
  },
  {
    "level": 62,
    "foodCost": 9350,
    "essenceCost": 0,
    "cumulativeFood": 223800,
    "cumulativeEssence": 0,
    "fightforce": 566521
  },
  {
    "level": 63,
    "foodCost": 9600,
    "essenceCost": 0,
    "cumulativeFood": 233400,
    "cumulativeEssence": 0,
    "fightforce": 594344
  },
  {
    "level": 64,
    "foodCost": 9850,
    "essenceCost": 0,
    "cumulativeFood": 243250,
    "cumulativeEssence": 0,
    "fightforce": 622168
  },
  {
    "level": 65,
    "foodCost": 10100,
    "essenceCost": 0,
    "cumulativeFood": 253350,
    "cumulativeEssence": 0,
    "fightforce": 649992
  },
  {
    "level": 66,
    "foodCost": 10350,
    "essenceCost": 0,
    "cumulativeFood": 263700,
    "cumulativeEssence": 0,
    "fightforce": 680639
  },
  {
    "level": 67,
    "foodCost": 10600,
    "essenceCost": 0,
    "cumulativeFood": 274300,
    "cumulativeEssence": 0,
    "fightforce": 715346
  },
  {
    "level": 68,
    "foodCost": 10850,
    "essenceCost": 0,
    "cumulativeFood": 285150,
    "cumulativeEssence": 0,
    "fightforce": 750054
  },
  {
    "level": 69,
    "foodCost": 11100,
    "essenceCost": 0,
    "cumulativeFood": 296250,
    "cumulativeEssence": 0,
    "fightforce": 784761
  },
  {
    "level": 70,
    "foodCost": 11350,
    "essenceCost": 0,
    "cumulativeFood": 307600,
    "cumulativeEssence": 0,
    "fightforce": 819469
  },
  {
    "level": 71,
    "foodCost": 11600,
    "essenceCost": 0,
    "cumulativeFood": 319200,
    "cumulativeEssence": 0,
    "fightforce": 857417
  },
  {
    "level": 72,
    "foodCost": 11900,
    "essenceCost": 0,
    "cumulativeFood": 331100,
    "cumulativeEssence": 0,
    "fightforce": 899565
  },
  {
    "level": 73,
    "foodCost": 12200,
    "essenceCost": 0,
    "cumulativeFood": 343300,
    "cumulativeEssence": 0,
    "fightforce": 941714
  },
  {
    "level": 74,
    "foodCost": 12500,
    "essenceCost": 0,
    "cumulativeFood": 355800,
    "cumulativeEssence": 0,
    "fightforce": 983862
  },
  {
    "level": 75,
    "foodCost": 12800,
    "essenceCost": 0,
    "cumulativeFood": 368600,
    "cumulativeEssence": 0,
    "fightforce": 1026011
  },
  {
    "level": 76,
    "foodCost": 13100,
    "essenceCost": 0,
    "cumulativeFood": 381700,
    "cumulativeEssence": 0,
    "fightforce": 1073718
  },
  {
    "level": 77,
    "foodCost": 13400,
    "essenceCost": 0,
    "cumulativeFood": 395100,
    "cumulativeEssence": 0,
    "fightforce": 1126326
  },
  {
    "level": 78,
    "foodCost": 13700,
    "essenceCost": 0,
    "cumulativeFood": 408800,
    "cumulativeEssence": 0,
    "fightforce": 1178934
  },
  {
    "level": 79,
    "foodCost": 14000,
    "essenceCost": 0,
    "cumulativeFood": 422800,
    "cumulativeEssence": 0,
    "fightforce": 1231542
  },
  {
    "level": 80,
    "foodCost": 14300,
    "essenceCost": 0,
    "cumulativeFood": 437100,
    "cumulativeEssence": 0,
    "fightforce": 1284150
  },
  {
    "level": 81,
    "foodCost": 14600,
    "essenceCost": 0,
    "cumulativeFood": 451700,
    "cumulativeEssence": 0,
    "fightforce": 1344380
  },
  {
    "level": 82,
    "foodCost": 14900,
    "essenceCost": 0,
    "cumulativeFood": 466600,
    "cumulativeEssence": 0,
    "fightforce": 1410911
  },
  {
    "level": 83,
    "foodCost": 15200,
    "essenceCost": 0,
    "cumulativeFood": 481800,
    "cumulativeEssence": 0,
    "fightforce": 1477442
  },
  {
    "level": 84,
    "foodCost": 15500,
    "essenceCost": 0,
    "cumulativeFood": 497300,
    "cumulativeEssence": 0,
    "fightforce": 1543973
  },
  {
    "level": 85,
    "foodCost": 15800,
    "essenceCost": 0,
    "cumulativeFood": 513100,
    "cumulativeEssence": 0,
    "fightforce": 1610504
  },
  {
    "level": 86,
    "foodCost": 16100,
    "essenceCost": 0,
    "cumulativeFood": 529200,
    "cumulativeEssence": 0,
    "fightforce": 1685662
  },
  {
    "level": 87,
    "foodCost": 16400,
    "essenceCost": 0,
    "cumulativeFood": 545600,
    "cumulativeEssence": 0,
    "fightforce": 1767120
  },
  {
    "level": 88,
    "foodCost": 16700,
    "essenceCost": 0,
    "cumulativeFood": 562300,
    "cumulativeEssence": 0,
    "fightforce": 1848578
  },
  {
    "level": 89,
    "foodCost": 17000,
    "essenceCost": 0,
    "cumulativeFood": 579300,
    "cumulativeEssence": 0,
    "fightforce": 1930037
  },
  {
    "level": 90,
    "foodCost": 17300,
    "essenceCost": 0,
    "cumulativeFood": 596600,
    "cumulativeEssence": 0,
    "fightforce": 2011495
  },
  {
    "level": 91,
    "foodCost": 5900,
    "essenceCost": 50,
    "cumulativeFood": 602500,
    "cumulativeEssence": 50,
    "fightforce": 2081382
  },
  {
    "level": 92,
    "foodCost": 6000,
    "essenceCost": 100,
    "cumulativeFood": 608500,
    "cumulativeEssence": 150,
    "fightforce": 2151270
  },
  {
    "level": 93,
    "foodCost": 6100,
    "essenceCost": 150,
    "cumulativeFood": 614600,
    "cumulativeEssence": 300,
    "fightforce": 2225357
  },
  {
    "level": 94,
    "foodCost": 6200,
    "essenceCost": 200,
    "cumulativeFood": 620800,
    "cumulativeEssence": 500,
    "fightforce": 2299444
  },
  {
    "level": 95,
    "foodCost": 6400,
    "essenceCost": 250,
    "cumulativeFood": 627200,
    "cumulativeEssence": 750,
    "fightforce": 2373532
  },
  {
    "level": 96,
    "foodCost": 6500,
    "essenceCost": 300,
    "cumulativeFood": 633700,
    "cumulativeEssence": 1050,
    "fightforce": 2458913
  },
  {
    "level": 97,
    "foodCost": 6600,
    "essenceCost": 350,
    "cumulativeFood": 640300,
    "cumulativeEssence": 1400,
    "fightforce": 2544295
  },
  {
    "level": 98,
    "foodCost": 6800,
    "essenceCost": 400,
    "cumulativeFood": 647100,
    "cumulativeEssence": 1800,
    "fightforce": 2629677
  },
  {
    "level": 99,
    "foodCost": 6900,
    "essenceCost": 450,
    "cumulativeFood": 654000,
    "cumulativeEssence": 2250,
    "fightforce": 2715059
  },
  {
    "level": 100,
    "foodCost": 7000,
    "essenceCost": 500,
    "cumulativeFood": 661000,
    "cumulativeEssence": 2750,
    "fightforce": 2800441
  },
  {
    "level": 101,
    "foodCost": 7200,
    "essenceCost": 600,
    "cumulativeFood": 668200,
    "cumulativeEssence": 3350,
    "fightforce": 2900438
  },
  {
    "level": 102,
    "foodCost": 7300,
    "essenceCost": 700,
    "cumulativeFood": 675500,
    "cumulativeEssence": 4050,
    "fightforce": 3000436
  },
  {
    "level": 103,
    "foodCost": 7400,
    "essenceCost": 800,
    "cumulativeFood": 682900,
    "cumulativeEssence": 4850,
    "fightforce": 3104634
  },
  {
    "level": 104,
    "foodCost": 7600,
    "essenceCost": 900,
    "cumulativeFood": 690500,
    "cumulativeEssence": 5750,
    "fightforce": 3208832
  },
  {
    "level": 105,
    "foodCost": 7700,
    "essenceCost": 1000,
    "cumulativeFood": 698200,
    "cumulativeEssence": 6750,
    "fightforce": 3313030
  },
  {
    "level": 106,
    "foodCost": 7800,
    "essenceCost": 1100,
    "cumulativeFood": 706000,
    "cumulativeEssence": 7850,
    "fightforce": 3432694
  },
  {
    "level": 107,
    "foodCost": 8000,
    "essenceCost": 1200,
    "cumulativeFood": 714000,
    "cumulativeEssence": 9050,
    "fightforce": 3552358
  },
  {
    "level": 108,
    "foodCost": 8100,
    "essenceCost": 1300,
    "cumulativeFood": 722100,
    "cumulativeEssence": 10350,
    "fightforce": 3672022
  },
  {
    "level": 109,
    "foodCost": 8200,
    "essenceCost": 1400,
    "cumulativeFood": 730300,
    "cumulativeEssence": 11750,
    "fightforce": 3791687
  },
  {
    "level": 110,
    "foodCost": 8400,
    "essenceCost": 1500,
    "cumulativeFood": 738700,
    "cumulativeEssence": 13250,
    "fightforce": 3911351
  },
  {
    "level": 111,
    "foodCost": 8500,
    "essenceCost": 1600,
    "cumulativeFood": 747200,
    "cumulativeEssence": 14850,
    "fightforce": 4051511
  },
  {
    "level": 112,
    "foodCost": 8600,
    "essenceCost": 1700,
    "cumulativeFood": 755800,
    "cumulativeEssence": 16550,
    "fightforce": 4191672
  },
  {
    "level": 113,
    "foodCost": 8800,
    "essenceCost": 1800,
    "cumulativeFood": 764600,
    "cumulativeEssence": 18350,
    "fightforce": 4331832
  },
  {
    "level": 114,
    "foodCost": 8900,
    "essenceCost": 1900,
    "cumulativeFood": 773500,
    "cumulativeEssence": 20250,
    "fightforce": 4471992
  },
  {
    "level": 115,
    "foodCost": 9000,
    "essenceCost": 2000,
    "cumulativeFood": 782500,
    "cumulativeEssence": 22250,
    "fightforce": 4612153
  },
  {
    "level": 116,
    "foodCost": 9200,
    "essenceCost": 2100,
    "cumulativeFood": 791700,
    "cumulativeEssence": 24350,
    "fightforce": 4773943
  },
  {
    "level": 117,
    "foodCost": 9300,
    "essenceCost": 2200,
    "cumulativeFood": 801000,
    "cumulativeEssence": 26550,
    "fightforce": 4935733
  },
  {
    "level": 118,
    "foodCost": 9400,
    "essenceCost": 2300,
    "cumulativeFood": 810400,
    "cumulativeEssence": 28850,
    "fightforce": 5097523
  },
  {
    "level": 119,
    "foodCost": 9600,
    "essenceCost": 2400,
    "cumulativeFood": 820000,
    "cumulativeEssence": 31250,
    "fightforce": 5259314
  },
  {
    "level": 120,
    "foodCost": 9700,
    "essenceCost": 2500,
    "cumulativeFood": 829700,
    "cumulativeEssence": 33750,
    "fightforce": 5421104
  }
];

export const PET_BREAK_MILESTONES: PetBreakMilestone[] = [
  {
    "breakIndex": 0,
    "tierNameVi": "Hiếm 0★ (Cơ bản)",
    "starCount": 0,
    "maxPetLevel": 20,
    "inheritancePct": 20,
    "sameCopiesCost": 0,
    "anyFodderCost": 0,
    "essenceCost": 0,
    "cumulativeSameCopies": 0,
    "cumulativeAnyFodder": 0,
    "cumulativeEssence": 0,
    "form": 1,
    "skillLevels": "1,0,0"
  },
  {
    "breakIndex": 1,
    "tierNameVi": "Hiếm 1★ (Lam)",
    "starCount": 1,
    "maxPetLevel": 30,
    "inheritancePct": 24,
    "sameCopiesCost": 1,
    "anyFodderCost": 0,
    "essenceCost": 0,
    "cumulativeSameCopies": 1,
    "cumulativeAnyFodder": 0,
    "cumulativeEssence": 0,
    "form": 1,
    "skillLevels": "1,0,0"
  },
  {
    "breakIndex": 2,
    "tierNameVi": "Hiếm 2★ (Lam)",
    "starCount": 2,
    "maxPetLevel": 40,
    "inheritancePct": 28,
    "sameCopiesCost": 0,
    "anyFodderCost": 2,
    "essenceCost": 0,
    "cumulativeSameCopies": 1,
    "cumulativeAnyFodder": 2,
    "cumulativeEssence": 0,
    "form": 1,
    "skillLevels": "2,0,0"
  },
  {
    "breakIndex": 3,
    "tierNameVi": "Hiếm 3★ (Lam)",
    "starCount": 3,
    "maxPetLevel": 50,
    "inheritancePct": 32,
    "sameCopiesCost": 0,
    "anyFodderCost": 3,
    "essenceCost": 0,
    "cumulativeSameCopies": 1,
    "cumulativeAnyFodder": 5,
    "cumulativeEssence": 0,
    "form": 1,
    "skillLevels": "2,0,0"
  },
  {
    "breakIndex": 4,
    "tierNameVi": "Hiếm 4★ (Lam)",
    "starCount": 4,
    "maxPetLevel": 60,
    "inheritancePct": 36,
    "sameCopiesCost": 2,
    "anyFodderCost": 0,
    "essenceCost": 0,
    "cumulativeSameCopies": 3,
    "cumulativeAnyFodder": 5,
    "cumulativeEssence": 0,
    "form": 1,
    "skillLevels": "3,0,0"
  },
  {
    "breakIndex": 5,
    "tierNameVi": "Sử Thi 0★ (Cơ bản)",
    "starCount": 0,
    "maxPetLevel": 35,
    "inheritancePct": 36,
    "sameCopiesCost": 0,
    "anyFodderCost": 0,
    "essenceCost": 0,
    "cumulativeSameCopies": 0,
    "cumulativeAnyFodder": 0,
    "cumulativeEssence": 0,
    "form": 1,
    "skillLevels": "1,1,0,0"
  },
  {
    "breakIndex": 6,
    "tierNameVi": "Sử Thi 1★",
    "starCount": 1,
    "maxPetLevel": 40,
    "inheritancePct": 40,
    "sameCopiesCost": 1,
    "anyFodderCost": 0,
    "essenceCost": 0,
    "cumulativeSameCopies": 1,
    "cumulativeAnyFodder": 0,
    "cumulativeEssence": 0,
    "form": 1,
    "skillLevels": "1,1,0,0"
  },
  {
    "breakIndex": 7,
    "tierNameVi": "Sử Thi 2★",
    "starCount": 2,
    "maxPetLevel": 45,
    "inheritancePct": 44,
    "sameCopiesCost": 0,
    "anyFodderCost": 3,
    "essenceCost": 0,
    "cumulativeSameCopies": 1,
    "cumulativeAnyFodder": 3,
    "cumulativeEssence": 0,
    "form": 1,
    "skillLevels": "2,1,0,0"
  },
  {
    "breakIndex": 8,
    "tierNameVi": "Sử Thi 3★",
    "starCount": 3,
    "maxPetLevel": 50,
    "inheritancePct": 48,
    "sameCopiesCost": 1,
    "anyFodderCost": 0,
    "essenceCost": 0,
    "cumulativeSameCopies": 2,
    "cumulativeAnyFodder": 3,
    "cumulativeEssence": 0,
    "form": 1,
    "skillLevels": "2,2,0,0"
  },
  {
    "breakIndex": 9,
    "tierNameVi": "Sử Thi 4★",
    "starCount": 4,
    "maxPetLevel": 55,
    "inheritancePct": 52,
    "sameCopiesCost": 0,
    "anyFodderCost": 3,
    "essenceCost": 0,
    "cumulativeSameCopies": 2,
    "cumulativeAnyFodder": 6,
    "cumulativeEssence": 0,
    "form": 2,
    "skillLevels": "3,2,0,0"
  },
  {
    "breakIndex": 10,
    "tierNameVi": "Sử Thi 5★ (Tím)",
    "starCount": 5,
    "maxPetLevel": 60,
    "inheritancePct": 56,
    "sameCopiesCost": 1,
    "anyFodderCost": 5,
    "essenceCost": 0,
    "cumulativeSameCopies": 3,
    "cumulativeAnyFodder": 11,
    "cumulativeEssence": 0,
    "form": 2,
    "skillLevels": "3,3,0,0"
  },
  {
    "breakIndex": 11,
    "tierNameVi": "Huyền Thoại 0★",
    "starCount": 0,
    "maxPetLevel": 70,
    "inheritancePct": 60,
    "sameCopiesCost": 1,
    "anyFodderCost": 5,
    "essenceCost": 0,
    "cumulativeSameCopies": 4,
    "cumulativeAnyFodder": 16,
    "cumulativeEssence": 0,
    "form": 2,
    "skillLevels": "3,3,1,0"
  },
  {
    "breakIndex": 12,
    "tierNameVi": "Huyền Thoại 1★",
    "starCount": 1,
    "maxPetLevel": 80,
    "inheritancePct": 64,
    "sameCopiesCost": 2,
    "anyFodderCost": 5,
    "essenceCost": 0,
    "cumulativeSameCopies": 6,
    "cumulativeAnyFodder": 21,
    "cumulativeEssence": 0,
    "form": 2,
    "skillLevels": "4,3,1,0"
  },
  {
    "breakIndex": 13,
    "tierNameVi": "Huyền Thoại 2★",
    "starCount": 2,
    "maxPetLevel": 90,
    "inheritancePct": 68,
    "sameCopiesCost": 2,
    "anyFodderCost": 10,
    "essenceCost": 0,
    "cumulativeSameCopies": 8,
    "cumulativeAnyFodder": 31,
    "cumulativeEssence": 0,
    "form": 3,
    "skillLevels": "4,3,2,0"
  },
  {
    "breakIndex": 14,
    "tierNameVi": "Huyền Thoại 3★",
    "starCount": 3,
    "maxPetLevel": 90,
    "inheritancePct": 72,
    "sameCopiesCost": 3,
    "anyFodderCost": 10,
    "essenceCost": 0,
    "cumulativeSameCopies": 11,
    "cumulativeAnyFodder": 41,
    "cumulativeEssence": 0,
    "form": 3,
    "skillLevels": "4,4,2,0"
  },
  {
    "breakIndex": 15,
    "tierNameVi": "Huyền Thoại 4★",
    "starCount": 4,
    "maxPetLevel": 90,
    "inheritancePct": 76,
    "sameCopiesCost": 3,
    "anyFodderCost": 15,
    "essenceCost": 0,
    "cumulativeSameCopies": 14,
    "cumulativeAnyFodder": 56,
    "cumulativeEssence": 0,
    "form": 3,
    "skillLevels": "4,4,2,0"
  },
  {
    "breakIndex": 16,
    "tierNameVi": "Huyền Thoại 5★ (Cam)",
    "starCount": 5,
    "maxPetLevel": 90,
    "inheritancePct": 80,
    "sameCopiesCost": 4,
    "anyFodderCost": 15,
    "essenceCost": 0,
    "cumulativeSameCopies": 18,
    "cumulativeAnyFodder": 71,
    "cumulativeEssence": 0,
    "form": 3,
    "skillLevels": "4,4,3,0"
  },
  {
    "breakIndex": 17,
    "tierNameVi": "Thần Thoại 0★",
    "starCount": 0,
    "maxPetLevel": 90,
    "inheritancePct": 84,
    "sameCopiesCost": 5,
    "anyFodderCost": 15,
    "essenceCost": 0,
    "cumulativeSameCopies": 23,
    "cumulativeAnyFodder": 86,
    "cumulativeEssence": 0,
    "form": 3,
    "skillLevels": "4,4,3,1"
  },
  {
    "breakIndex": 18,
    "tierNameVi": "Thần Thoại 1★",
    "starCount": 1,
    "maxPetLevel": 95,
    "inheritancePct": 88,
    "sameCopiesCost": 3,
    "anyFodderCost": 10,
    "essenceCost": 1000,
    "cumulativeSameCopies": 26,
    "cumulativeAnyFodder": 96,
    "cumulativeEssence": 1000,
    "form": 3,
    "skillLevels": "4,4,3,1"
  },
  {
    "breakIndex": 19,
    "tierNameVi": "Thần Thoại 2★",
    "starCount": 2,
    "maxPetLevel": 100,
    "inheritancePct": 92,
    "sameCopiesCost": 4,
    "anyFodderCost": 15,
    "essenceCost": 2000,
    "cumulativeSameCopies": 30,
    "cumulativeAnyFodder": 111,
    "cumulativeEssence": 3000,
    "form": 3,
    "skillLevels": "4,4,3,1"
  },
  {
    "breakIndex": 20,
    "tierNameVi": "Thần Thoại 3★",
    "starCount": 3,
    "maxPetLevel": 105,
    "inheritancePct": 96,
    "sameCopiesCost": 5,
    "anyFodderCost": 20,
    "essenceCost": 4000,
    "cumulativeSameCopies": 35,
    "cumulativeAnyFodder": 131,
    "cumulativeEssence": 7000,
    "form": 3,
    "skillLevels": "4,4,3,1"
  },
  {
    "breakIndex": 21,
    "tierNameVi": "Thần Thoại 4★",
    "starCount": 4,
    "maxPetLevel": 110,
    "inheritancePct": 100,
    "sameCopiesCost": 6,
    "anyFodderCost": 20,
    "essenceCost": 6000,
    "cumulativeSameCopies": 41,
    "cumulativeAnyFodder": 151,
    "cumulativeEssence": 13000,
    "form": 3,
    "skillLevels": "4,4,3,1"
  },
  {
    "breakIndex": 22,
    "tierNameVi": "Thần Thoại 5★ (Đỏ)",
    "starCount": 5,
    "maxPetLevel": 115,
    "inheritancePct": 104,
    "sameCopiesCost": 8,
    "anyFodderCost": 30,
    "essenceCost": 8000,
    "cumulativeSameCopies": 49,
    "cumulativeAnyFodder": 181,
    "cumulativeEssence": 21000,
    "form": 3,
    "skillLevels": "4,4,3,1"
  },
  {
    "breakIndex": 23,
    "tierNameVi": "Titan 5★",
    "starCount": 0,
    "maxPetLevel": 120,
    "inheritancePct": 108,
    "sameCopiesCost": 8,
    "anyFodderCost": 30,
    "essenceCost": 10000,
    "cumulativeSameCopies": 57,
    "cumulativeAnyFodder": 211,
    "cumulativeEssence": 31000,
    "form": 4,
    "skillLevels": "4,4,3,1"
  }
];

export function calculatePetLevelUpgrade(input: PetLevelUpgradeInput): PetLevelUpgradeResult {
  let from = Math.max(1, Math.min(120, Math.floor(Number(input.fromLevel) || 1)));
  let to = Math.max(1, Math.min(120, Math.floor(Number(input.toLevel) || 1)));

  if (from > to) {
    const temp = from;
    from = to;
    to = temp;
  }

  const ownedFood = Math.max(0, Math.floor(Number(input.ownedFood) || 0));
  const ownedEssence = Math.max(0, Math.floor(Number(input.ownedEssence) || 0));

  if (from === to) {
    return {
      fromLevel: from,
      toLevel: to,
      requiredFood: 0,
      requiredEssence: 0,
      missingFood: 0,
      missingEssence: 0,
      garEventPoints: 0,
      breakdown: [],
    };
  }

  const fromCost = PET_LEVEL_COSTS[from - 1];
  const toCost = PET_LEVEL_COSTS[to - 1];

  const requiredFood = (toCost?.cumulativeFood ?? 0) - (fromCost?.cumulativeFood ?? 0);
  const requiredEssence = (toCost?.cumulativeEssence ?? 0) - (fromCost?.cumulativeEssence ?? 0);

  const missingFood = Math.max(0, requiredFood - ownedFood);
  const missingEssence = Math.max(0, requiredEssence - ownedEssence);

  // GAR/KvK scoring: 960 pts per 100 food + 480 pts per essence
  const garEventPoints = Math.floor(requiredFood / 100) * 960 + requiredEssence * 480;

  const breakdown: PetLevelUpgradeResult["breakdown"] = [];
  let prevFood = fromCost?.cumulativeFood ?? 0;
  let prevEss = fromCost?.cumulativeEssence ?? 0;

  for (let lv = from + 1; lv <= to; lv++) {
    const row = PET_LEVEL_COSTS[lv - 1];
    if (row) {
      breakdown.push({
        level: lv,
        stepFood: row.cumulativeFood - prevFood,
        stepEssence: row.cumulativeEssence - prevEss,
        cumulativeFood: row.cumulativeFood - (fromCost?.cumulativeFood ?? 0),
        cumulativeEssence: row.cumulativeEssence - (fromCost?.cumulativeEssence ?? 0),
        fightforce: row.fightforce,
      });
      prevFood = row.cumulativeFood;
      prevEss = row.cumulativeEssence;
    }
  }

  return {
    fromLevel: from,
    toLevel: to,
    requiredFood,
    requiredEssence,
    missingFood,
    missingEssence,
    garEventPoints,
    breakdown,
  };
}

export function calculatePetBreakthroughUpgrade(input: PetBreakthroughInput): PetBreakthroughResult {
  let from = Math.max(0, Math.min(23, Math.floor(Number(input.fromBreak) || 0)));
  let to = Math.max(0, Math.min(23, Math.floor(Number(input.toBreak) || 0)));

  if (from > to) {
    const temp = from;
    from = to;
    to = temp;
  }

  const ownedSame = Math.max(0, Math.floor(Number(input.ownedSame) || 0));
  const ownedAny = Math.max(0, Math.floor(Number(input.ownedAny) || 0));
  const ownedEssence = Math.max(0, Math.floor(Number(input.ownedEssence) || 0));

  if (from === to) {
    const curRow = PET_BREAK_MILESTONES[from];
    return {
      fromBreak: from,
      toBreak: to,
      requiredSameCopies: 0,
      requiredAnyFodder: 0,
      requiredEssence: 0,
      missingSameCopies: 0,
      missingAnyFodder: 0,
      missingEssence: 0,
      currentInheritancePct: curRow?.inheritancePct ?? 20.0,
      targetInheritancePct: curRow?.inheritancePct ?? 20.0,
      statGainPct: 0,
      targetForm: curRow?.form ?? 1,
      breakdown: [],
    };
  }

  const fromRow = PET_BREAK_MILESTONES[from];
  const toRow = PET_BREAK_MILESTONES[to];

  // If calculating for Mythic pet (from >= 5), subtract Mythic cumulative
  // If from < 5 (Rare pet), calculate standard step sum
  let requiredSameCopies = 0;
  let requiredAnyFodder = 0;
  let requiredEssence = 0;

  const breakdown: PetBreakthroughResult["breakdown"] = [];

  for (let b = from + 1; b <= to; b++) {
    const row = PET_BREAK_MILESTONES[b];
    if (row) {
      requiredSameCopies += row.sameCopiesCost;
      requiredAnyFodder += row.anyFodderCost;
      requiredEssence += row.essenceCost;

      breakdown.push({
        breakIndex: b,
        tierNameVi: row.tierNameVi,
        stepSame: row.sameCopiesCost,
        stepAny: row.anyFodderCost,
        stepEssence: row.essenceCost,
        cumulativeSame: requiredSameCopies,
        cumulativeAny: requiredAnyFodder,
        cumulativeEssence: requiredEssence,
        inheritancePct: row.inheritancePct,
        maxLevel: row.maxPetLevel,
      });
    }
  }

  const missingSameCopies = Math.max(0, requiredSameCopies - ownedSame);
  const missingAnyFodder = Math.max(0, requiredAnyFodder - ownedAny);
  const missingEssence = Math.max(0, requiredEssence - ownedEssence);

  const currentInheritancePct = fromRow?.inheritancePct ?? 20.0;
  const targetInheritancePct = toRow?.inheritancePct ?? 20.0;
  const statGainPct = +(targetInheritancePct - currentInheritancePct).toFixed(2);
  const targetForm = toRow?.form ?? 1;

  return {
    fromBreak: from,
    toBreak: to,
    requiredSameCopies,
    requiredAnyFodder,
    requiredEssence,
    missingSameCopies,
    missingAnyFodder,
    missingEssence,
    currentInheritancePct,
    targetInheritancePct,
    statGainPct,
    targetForm,
    breakdown,
  };
}
