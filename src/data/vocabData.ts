import { VocabItem, PhrasebookItem } from '../types';
import { OXFORD_AUDIO_MAP, OXFORD_EXTRA_WORDS } from './oxfordExtraWords';

const CORE_10_WORDS: VocabItem[] = [
  {
    id: 'accommodate',
    word: 'accommodate',
    ipaUs: '/əˈkɑː.mə.deɪt/',
    ipaUk: '/əˈkɒm.ə.deɪt/',
    pos: 'Verb',
    cefr: 'B2-C1',
    srsStatus: 'review',
    ef: 2.5,
    intervalText: 'Hôm nay',
    meaningVi: 'Đáp ứng yêu cầu, điều chỉnh cho phù hợp, hoặc cung cấp đủ chỗ chứa.',
    meaningEn:
      "To provide sufficient space for; or to adapt to / meet someone's special requests, needs, or schedule.",
    trapTip:
      "Bẫy chính tả kinh điển: Có 2 chữ 'c' và 2 chữ 'm' (a-CC-o-MM-odate). Trong TOEIC Part 5/7, từ này không chỉ mang nghĩa 'chỗ ở' mà thường xuyên mang nghĩa 'đáp ứng yêu cầu khách hàng' (accommodate client requests).",
    family: ['accommodation (n)', 'accommodating (adj)', 'meet / fulfill (syn)'],
    contexts: {
      toeic: {
        label: 'TOEIC Thương mại',
        badgeColor: 'indigo',
        chunk: 'accommodate special dietary requests',
        chunkVi: 'đáp ứng các yêu cầu ăn uống đặc biệt',
        register: 'Trang trọng · Dịch vụ & Khách sạn',
        sentence:
          'The banquet hall can accommodate up to 300 guests and accommodate special dietary requests upon prior notice.',
        sentenceVi:
          'Sảnh tiệc có thể chứa tới 300 khách và đáp ứng các yêu cầu ăn uống đặc biệt khi được báo trước.',
        note: 'Hay xuất hiện trong email đặt phòng hội nghị, nhà hàng (TOEIC Reading Part 7).',
      },
      ielts: {
        label: 'IELTS Academic (Band 7.5+)',
        badgeColor: 'violet',
        chunk: 'accommodate the rapid influx of urban migrants',
        chunkVi: 'đáp ứng làn sóng người nhập cư đô thị tăng nhanh',
        register: 'Học thuật · Urbanization & Policy',
        sentence:
          'Municipal infrastructure must be upgraded to accommodate the rapid influx of urban migrants over the next decade.',
        sentenceVi:
          'Cơ sở hạ tầng đô thị phải được nâng cấp để đáp ứng làn sóng người nhập cư đô thị tăng nhanh trong thập kỷ tới.',
        note: "Cấu trúc 'be upgraded to accommodate + Noun phrase' giúp ăn điểm Lexical Resource trong Writing Task 2.",
      },
      workplace: {
        label: 'Giao tiếp Công sở',
        badgeColor: 'emerald',
        chunk: 'accommodate your timeline / schedule',
        chunkVi: 'linh hoạt điều chỉnh theo lịch trình của bạn',
        register: 'Lịch sự, hợp tác · Email & Họp',
        sentence:
          'We have adjusted our sprint priorities to accommodate your timeline for the Q4 product launch.',
        sentenceVi:
          'Chúng tôi đã điều chỉnh thứ tự ưu tiên của sprint để đáp ứng khung thời gian ra mắt sản phẩm Quý 4 của bạn.',
        note: 'Dùng khi muốn thể hiện thiện chí hỗ trợ khách hàng hoặc phòng ban khác.',
      },
      daily: {
        label: 'Giao tiếp Đời thường',
        badgeColor: 'amber',
        chunk: 'accommodate a last-minute change',
        chunkVi: 'xoay xở cho một thay đổi phút chót',
        register: 'Tự nhiên · Đời sống & Du lịch',
        sentence:
          'The restaurant was super busy, but the manager kindly accommodated our last-minute change from four seats to six.',
        sentenceVi:
          'Nhà hàng cực kỳ đông khách, nhưng quản lý đã rất nhiệt tình sắp xếp thay đổi phút chót của chúng tôi từ 4 lên 6 ghế.',
        note: 'Cách khen dịch vụ chu đáo rất tự nhiên trong giao tiếp hàng ngày.',
      },
    },
    quiz: {
      question:
        "The conference center is being expanded to __________ the growing number of international delegates attending next year's summit.",
      options: ['accommodate', 'elaborate', 'delegate', 'mitigate'],
      answer: 'accommodate',
      explanation:
        "'accommodate' đi với số lượng người/khách tham dự mang nghĩa 'cung cấp đủ sức chứa / đáp ứng'.",
    },
    chunkPuzzle: {
      targetChunk: 'accommodate your timeline for the launch',
      meaningVi: 'đáp ứng khung thời gian ra mắt của bạn',
      distractors: ['with', 'into'],
    },
    sentenceStarter: "We will do our best to accommodate your team's request regarding ",
  },
  {
    id: 'address',
    word: 'address',
    ipaUs: '/əˈdres/',
    ipaUk: '/əˈdres/',
    pos: 'Verb',
    cefr: 'B2',
    srsStatus: 'review',
    ef: 2.4,
    intervalText: 'Hôm nay',
    meaningVi: 'Giải quyết, xử lý trực diện một vấn đề hoặc mối quan ngại.',
    meaningEn:
      'To think about and begin to deal with an issue, problem, or complaint formally and directly.',
    trapTip:
      "Đừng chỉ dịch 'address' là 'địa chỉ' (Danh từ)! Khi là Động từ (nhấn âm 2 /əˈdres/), nó bằng với 'deal with / tackle' nhưng trang trọng hơn rất nhiều. Không dùng giới từ 'to' sau address khi mang nghĩa giải quyết vấn đề.",
    family: ['addressable (adj)', 'tackle / resolve (syn)', 'ignore / overlook (ant)'],
    contexts: {
      toeic: {
        label: 'TOEIC Thương mại',
        badgeColor: 'indigo',
        chunk: 'address customer complaints promptly',
        chunkVi: 'giải quyết khiếu nại của khách hàng một cách nhanh chóng',
        register: 'Chuyên nghiệp · Customer Service',
        sentence:
          'Our support team is trained to address customer complaints promptly to maintain high satisfaction ratings.',
        sentenceVi:
          'Đội ngũ hỗ trợ của chúng tôi được đào tạo để giải quyết khiếu nại của khách hàng nhanh chóng nhằm duy trì mức độ hài lòng cao.',
        note: "Cặp trạng từ 'address ... promptly / effectively' cực kỳ phổ biến trong đề thi TOEIC.",
      },
      ielts: {
        label: 'IELTS Academic (Band 7.5+)',
        badgeColor: 'violet',
        chunk: 'address the root causes of climate change',
        chunkVi: 'giải quyết tận gốc nguyên nhân của biến đổi khí hậu',
        register: 'Học thuật · Mở bài & Kết bài Task 2',
        sentence:
          'Governments must implement stringent carbon taxes to address the root causes of climate change rather than merely treating its symptoms.',
        sentenceVi:
          'Chính phủ phải áp dụng thuế carbon nghiêm ngặt để giải quyết tận gốc nguyên nhân biến đổi khí hậu thay vì chỉ xử lý phần ngọn.',
        note: "Cụm 'address the root causes of...' giúp câu văn học thuật sắc bén hơn hẳn 'solve the problem of...'.",
      },
      workplace: {
        label: 'Giao tiếp Công sở',
        badgeColor: 'emerald',
        chunk: 'address the security concerns raised in the audit',
        chunkVi: 'xử lý các lo ngại bảo mật được nêu trong đợt kiểm toán',
        register: 'Trang trọng · Báo cáo & Họp dự án',
        sentence:
          "In today's meeting, we need to address the security concerns raised in the Q3 audit before deploying to production.",
        sentenceVi:
          'Trong cuộc họp hôm nay, chúng ta cần xử lý các lo ngại bảo mật được nêu trong đợt kiểm toán Quý 3 trước khi đưa lên môi trường thật.',
        note: 'Dùng trong biên bản họp (Meeting Minutes) để nêu mục tiêu cần giải quyết.',
      },
      daily: {
        label: 'Giao tiếp Đời thường',
        badgeColor: 'amber',
        chunk: 'address the elephant in the room',
        chunkVi: 'nói thẳng vào vấn đề nhạy cảm mà ai cũng né tránh',
        register: 'Idiomatic · Giao tiếp tự nhiên',
        sentence:
          "It's time we addressed the elephant in the room and talked openly about how we split the apartment bills.",
        sentenceVi:
          'Đã đến lúc chúng ta nói thẳng vào vấn đề nhạy cảm và trao đổi cởi mở về cách chia tiền hóa đơn căn hộ.',
        note: 'Idiom cực hay khi muốn mở lời giải quyết khúc mắc trong cuộc sống hoặc nhóm bạn.',
      },
    },
    quiz: {
      question:
        'The new software patch was released specifically to __________ the privacy vulnerabilities reported by users last week.',
      options: ['address', 'delegate', 'align', 'elaborate'],
      answer: 'address',
      explanation:
        "'address vulnerabilities / concerns / issues' là cụm chuẩn mang nghĩa giải quyết, khắc phục vấn đề.",
    },
    chunkPuzzle: {
      targetChunk: 'address the root causes of the issue',
      meaningVi: 'giải quyết nguyên nhân cốt lõi của vấn đề',
      distractors: ['about', 'to'],
    },
    sentenceStarter: 'Our immediate priority this week is to address the concerns regarding ',
  },
  {
    id: 'elaborate',
    word: 'elaborate',
    ipaUs: '/ɪˈlæb.ə.reɪt/',
    ipaUk: '/ɪˈlæb.ər.eɪt/',
    pos: 'Verb',
    cefr: 'B2-C1',
    srsStatus: 'learning',
    ef: 2.5,
    intervalText: '2 ngày tới',
    meaningVi: 'Giải thích kỹ hơn, trình bày chi tiết hơn về một ý tưởng hoặc kế hoạch.',
    meaningEn:
      'To add more information to or explain something that you have said in greater detail.',
    trapTip:
      "Chú ý giới từ đi kèm: Luôn là 'elaborate ON something' (không dùng elaborate about). Ngoài ra, khi là Tính từ (nhấn âm /ɪˈlæb.ər.ət/), nó mang nghĩa 'tỉ mỉ, công phu'.",
    family: ['elaboration (n)', 'elaborately (adv)', 'expand on / flesh out (syn)'],
    contexts: {
      toeic: {
        label: 'TOEIC Thương mại',
        badgeColor: 'indigo',
        chunk: 'elaborate on the proposed marketing strategy',
        chunkVi: 'trình bày chi tiết hơn về chiến lược tiếp thị được đề xuất',
        register: 'Trang trọng · Thuyết trình & Phỏng vấn',
        sentence:
          'During the second part of the seminar, Ms. Chen will elaborate on the proposed marketing strategy for Southeast Asia.',
        sentenceVi:
          'Trong phần hai của hội thảo, bà Chen sẽ trình bày chi tiết hơn về chiến lược tiếp thị được đề xuất cho khu vực Đông Nam Á.',
        note: "Bẫy giới từ TOEIC Part 5: Chỗ trống sau 'elaborate' thường chọn giới từ 'on' hoặc 'upon'.",
      },
      ielts: {
        label: 'IELTS Academic (Band 7.5+)',
        badgeColor: 'violet',
        chunk: 'elaborate further on the socio-economic implications',
        chunkVi: 'phân tích sâu hơn về các hệ quả kinh tế - xã hội',
        register: 'Học thuật · IELTS Speaking Part 3 & Writing',
        sentence:
          'To elaborate further on the socio-economic implications, prolonged inflation disproportionately affects low-income households.',
        sentenceVi:
          'Để phân tích sâu hơn về các hệ quả kinh tế - xã hội, lạm phát kéo dài ảnh hưởng nặng nề hơn đến các hộ gia đình thu nhập thấp.',
        note: "Cụm mở đầu cực mượt trong IELTS Speaking Part 3 khi giám khảo hỏi 'Can you tell me more about that?'.",
      },
      workplace: {
        label: 'Giao tiếp Công sở',
        badgeColor: 'emerald',
        chunk: 'Could you elaborate a bit more on...',
        chunkVi: 'Bạn có thể nói rõ hơn một chút về... được không?',
        register: 'Lịch sự · Họp & Review thiết kế/code',
        sentence:
          'Could you elaborate a bit more on how this API change will impact our mobile app latency?',
        sentenceVi:
          'Bạn có thể giải thích chi tiết hơn một chút về việc thay đổi API này sẽ ảnh hưởng thế nào đến độ trễ ứng dụng di động không?',
        note: "Thay thế hoàn hảo cho câu 'What do you mean?' dễ gây cảm giác chất vấn trong cuộc họp.",
      },
      daily: {
        label: 'Giao tiếp Đời thường',
        badgeColor: 'amber',
        chunk: 'care to elaborate?',
        chunkVi: 'kể rõ hơn xem nào? (thân mật)',
        register: 'Thân mật · Trò chuyện bạn bè',
        sentence: 'You said the blind date was a total disaster—care to elaborate over coffee?',
        sentenceVi:
          'Cậu bảo buổi hẹn hò giấu mặt là một thảm họa toàn tập—vừa uống cà phê vừa kể rõ hơn xem nào?',
        note: 'Câu hỏi ngắn gọn, tự nhiên khi muốn bạn bè kể thêm chi tiết chuyện thú vị.',
      },
    },
    quiz: {
      question:
        'The candidate was asked to elaborate __________ her previous experience managing cross-functional engineering teams.',
      options: ['on', 'with', 'into', 'for'],
      answer: 'on',
      explanation:
        "Cấu trúc cố định: 'elaborate on / upon something' (trình bày chi tiết hơn về điều gì).",
    },
    chunkPuzzle: {
      targetChunk: 'elaborate a bit more on this point',
      meaningVi: 'giải thích kỹ hơn một chút về điểm này',
      distractors: ['about', 'to'],
    },
    sentenceStarter: 'Could you please elaborate on how we plan to ',
  },
  {
    id: 'delegate',
    word: 'delegate',
    ipaUs: '/ˈdel.ə.ɡeɪt/',
    ipaUk: '/ˈdel.ɪ.ɡeɪt/',
    pos: 'Verb',
    cefr: 'B2-C1',
    srsStatus: 'review',
    ef: 2.3,
    intervalText: 'Hôm nay',
    meaningVi: 'Ủy quyền, giao phó công việc hoặc trách nhiệm cho cấp dưới/người khác.',
    meaningEn:
      'To give a particular job, duty, right, or power to someone else so that they do it for you.',
    trapTip:
      "Phân biệt phát âm: Động từ 'ủy quyền' đọc đuôi /-ɡeɪt/ (/ˈdel.ə.ɡeɪt/), còn Danh từ 'đại biểu tham dự hội nghị' đọc đuôi /-ɡət/ (/ˈdel.ə.ɡət/). Cấu trúc chuẩn: delegate [task] TO [someone].",
    family: ['delegation (n)', 'delegate (n - đại biểu)', 'assign / entrust (syn)'],
    contexts: {
      toeic: {
        label: 'TOEIC Thương mại',
        badgeColor: 'indigo',
        chunk: 'delegate routine administrative tasks to junior staff',
        chunkVi: 'bàn giao các công việc hành chính thường nhật cho nhân viên cấp dưới',
        register: 'Quản trị & Nhân sự · TOEIC Part 6/7',
        sentence:
          'Department heads are encouraged to delegate routine administrative tasks to junior staff so they can focus on strategic planning.',
        sentenceVi:
          'Các trưởng bộ phận được khuyến khích giao phó công việc hành chính thường nhật cho nhân viên cấp dưới để tập trung vào hoạch định chiến lược.',
        note: "Cấu trúc 'delegate [something] to [someone]' rất hay được hỏi trong bài đọc quản trị doanh nghiệp.",
      },
      ielts: {
        label: 'IELTS Academic (Band 7.5+)',
        badgeColor: 'violet',
        chunk: 'delegate decision-making authority to local councils',
        chunkVi: 'phân quyền ra quyết định cho chính quyền địa phương',
        register: 'Học thuật · Quản trị công & Tổ chức',
        sentence:
          'Central governments often achieve higher efficiency when they delegate decision-making authority to local councils.',
        sentenceVi:
          'Chính phủ trung ương thường đạt hiệu quả cao hơn khi phân quyền ra quyết định cho các hội đồng địa phương.',
        note: "Cụm 'delegate decision-making authority' cực kỳ đắt giá cho chủ đề Government / Business.",
      },
      workplace: {
        label: 'Giao tiếp Công sở',
        badgeColor: 'emerald',
        chunk: 'delegate ownership of the module to...',
        chunkVi: 'giao quyền phụ trách chính phân khu này cho...',
        register: 'Quản lý dự án · Agile / Scrum',
        sentence:
          "To avoid overloading the tech lead, let's delegate ownership of the payment module to Minh starting next sprint.",
        sentenceVi:
          'Để tránh làm quá tải Tech Lead, hãy giao quyền phụ trách chính module thanh toán cho Minh từ sprint tới.',
        note: 'Cách giao việc chuyên nghiệp, nhấn mạnh vào tinh thần làm chủ (ownership).',
      },
      daily: {
        label: 'Giao tiếp Đời thường',
        badgeColor: 'amber',
        chunk: 'delegate the party prep to everyone',
        chunkVi: 'phân công việc chuẩn bị tiệc cho mọi người',
        register: 'Đời sống · Gia đình & Sự kiện',
        sentence:
          "Don't try to cook ten dishes by yourself—delegate the party prep to everyone in the family!",
        sentenceVi:
          'Đừng cố tự nấu cả mười món một mình—hãy phân công việc chuẩn bị bữa tiệc cho mọi người trong nhà đi!',
        note: 'Dùng vui vẻ trong gia đình khi tổ chức tiệc tùng, dọn dẹp.',
      },
    },
    quiz: {
      question:
        'Effective managers know how to __________ operational tasks to capable team members rather than micromanaging every detail.',
      options: ['delegate', 'expedite', 'mitigate', 'bottleneck'],
      answer: 'delegate',
      explanation:
        "'delegate tasks to team members' nghĩa là giao phó/ủy quyền công việc cho thành viên nhóm.",
    },
    chunkPuzzle: {
      targetChunk: 'delegate routine tasks to junior staff',
      meaningVi: 'giao các việc thường nhật cho nhân viên cấp dưới',
      distractors: ['for', 'with'],
    },
    sentenceStarter: 'To keep the project moving smoothly, I will delegate ',
  },
  {
    id: 'mitigate',
    word: 'mitigate',
    ipaUs: '/ˈmɪt.ə.ɡeɪt/',
    ipaUk: '/ˈmɪt.ɪ.ɡeɪt/',
    pos: 'Verb',
    cefr: 'C1',
    srsStatus: 'learning',
    ef: 2.6,
    intervalText: '3 ngày tới',
    meaningVi: 'Giảm thiểu, làm dịu bớt mức độ nghiêm trọng hoặc rủi ro.',
    meaningEn: 'To make something harmful, unpleasant, or bad less severe, serious, or painful.',
    trapTip:
      "Từ vựng hạng C1 'vàng mười'! Không dùng 'mitigate' cho những thứ tích cực hay số lượng thông thường (như giá cả); luôn đi kèm các danh từ mang sắc thái tiêu cực: rủi ro (risks), thiệt hại (damage), tác động xấu (adverse impacts).",
    family: [
      'mitigation (n)',
      'mitigating (adj)',
      'alleviate / minimize (syn)',
      'exacerbate / aggravate (ant)',
    ],
    contexts: {
      toeic: {
        label: 'TOEIC Thương mại',
        badgeColor: 'indigo',
        chunk: 'mitigate supply chain disruptions',
        chunkVi: 'giảm thiểu sự gián đoạn chuỗi cung ứng',
        register: 'Kinh doanh & Tài chính · C1',
        sentence:
          'Diversifying our vendor network in Asia helped mitigate supply chain disruptions during the peak shipping season.',
        sentenceVi:
          'Việc đa dạng hóa mạng lưới nhà cung cấp tại châu Á đã giúp giảm thiểu sự gián đoạn chuỗi cung ứng trong mùa vận chuyển cao điểm.',
        note: 'Xuất hiện nhiều trong các bài báo cáo tài chính, quản trị rủi ro (Risk Management).',
      },
      ielts: {
        label: 'IELTS Academic (Band 7.5+)',
        badgeColor: 'violet',
        chunk: 'mitigate the adverse environmental impacts of...',
        chunkVi: 'giảm nhẹ các tác động tiêu cực đến môi trường của...',
        register: 'Học thuật Band 8.0 · Environment & Health',
        sentence:
          'Reforestation initiatives play a vital role in mitigating the adverse environmental impacts of industrial expansion.',
        sentenceVi:
          'Các sáng kiến trồng rừng đóng vai trò thiết yếu trong việc giảm nhẹ các tác động tiêu cực đến môi trường của quá trình mở rộng công nghiệp.',
        note: "Thay thế hoàn hảo cho 'reduce bad effects' trong IELTS Writing Task 2.",
      },
      workplace: {
        label: 'Giao tiếp Công sở',
        badgeColor: 'emerald',
        chunk: 'mitigate the risk of downtime',
        chunkVi: 'giảm thiểu rủi ro sập hệ thống / gián đoạn dịch vụ',
        register: 'Kỹ thuật & Quản trị dự án',
        sentence:
          'We have set up automated failover servers to mitigate the risk of downtime during Black Friday traffic spikes.',
        sentenceVi:
          'Chúng tôi đã thiết lập máy chủ dự phòng tự động để giảm thiểu rủi ro sập hệ thống trong đợt tăng vọt lưu lượng dịp Black Friday.',
        note: "Cụm 'mitigate the risk of...' là ngôn ngữ chuẩn mực của Senior Engineer / PM.",
      },
      daily: {
        label: 'Giao tiếp Đời thường',
        badgeColor: 'amber',
        chunk: 'mitigate the jet lag',
        chunkVi: 'làm dịu bớt cơn mệt mỏi do lệch múi giờ',
        register: 'Đời sống & Sức khỏe',
        sentence:
          'Staying hydrated and getting morning sunlight really helped mitigate the jet lag after my flight to London.',
        sentenceVi:
          'Uống đủ nước và đón nắng sớm thực sự giúp làm dịu bớt cơn lệch múi giờ sau chuyến bay tới London của tôi.',
        note: 'Dùng cho sức khỏe, triệu chứng mệt mỏi thường ngày rất tự nhiên.',
      },
    },
    quiz: {
      question:
        'Financial institutions must adopt strict cybersecurity protocols to __________ the risk of data breaches.',
      options: ['mitigate', 'elaborate', 'expedite', 'accommodate'],
      answer: 'mitigate',
      explanation:
        "Collocation kinh điển: 'mitigate the risk / impact / damage' (giảm thiểu rủi ro/tác động).",
    },
    chunkPuzzle: {
      targetChunk: 'mitigate the risk of project delays',
      meaningVi: 'giảm thiểu rủi ro chậm trễ dự án',
      distractors: ['into', 'with'],
    },
    sentenceStarter: 'To mitigate the potential risks associated with this release, we should ',
  },
  {
    id: 'expedite',
    word: 'expedite',
    ipaUs: '/ˈek.spə.daɪt/',
    ipaUk: '/ˈek.spɪ.daɪt/',
    pos: 'Verb',
    cefr: 'C1',
    srsStatus: 'review',
    ef: 2.3,
    intervalText: 'Hôm nay',
    meaningVi: 'Đẩy nhanh tiến độ, xúc tiến quy trình hoặc thủ tục.',
    meaningEn: 'To make a process, approval, or delivery happen more quickly and efficiently.',
    trapTip:
      "Cẩn thận nhầm với 'expedition' (chuyến thám hiểm)! 'Expedite' là ngoại động từ trang trọng thay cho 'speed up', đặc biệt hay đi với: shipping (giao hàng), approval (phê duyệt), customs clearance (thông quan).",
    family: ['expedited (adj - giao nhanh)', 'expeditious (adj)', 'accelerate / fast-track (syn)'],
    contexts: {
      toeic: {
        label: 'TOEIC Thương mại',
        badgeColor: 'indigo',
        chunk: 'expedite the shipment at no extra charge',
        chunkVi: 'đẩy nhanh việc giao lô hàng mà không tính thêm phí',
        register: 'Thương mại & Logistics · TOEIC Part 7',
        sentence:
          'To apologize for the inventory error, we will expedite the shipment at no extra charge so it arrives by Tuesday.',
        sentenceVi:
          'Để xin lỗi vì sai sót tồn kho, chúng tôi sẽ đẩy nhanh việc giao hàng miễn phí để đơn hàng đến nơi trước thứ Ba.',
        note: 'Từ khóa ăn điểm trong các email xử lý đơn hàng trễ của TOEIC.',
      },
      ielts: {
        label: 'IELTS Academic (Band 7.5+)',
        badgeColor: 'violet',
        chunk: 'expedite the transition toward renewable energy',
        chunkVi: 'thúc đẩy nhanh quá trình chuyển dịch sang năng lượng tái tạo',
        register: 'Học thuật C1 · Chính sách & Công nghệ',
        sentence:
          'Government subsidies for solar panels can significantly expedite the transition toward renewable energy.',
        sentenceVi:
          'Trợ cấp của chính phủ cho pin mặt trời có thể thúc đẩy đáng kể quá trình chuyển dịch sang năng lượng tái tạo.',
        note: "Nâng tầm câu văn hơn hẳn 'make the change faster'.",
      },
      workplace: {
        label: 'Giao tiếp Công sở',
        badgeColor: 'emerald',
        chunk: 'expedite the legal review process',
        chunkVi: 'xúc tiến nhanh quy trình rà soát pháp lý',
        register: 'Lịch sự, khẩn trương · Email liên phòng ban',
        sentence:
          'Is there any way we can expedite the legal review process for this vendor contract before month-end?',
        sentenceVi:
          'Có cách nào để chúng ta xúc tiến nhanh quy trình rà soát pháp lý cho hợp đồng nhà cung cấp này trước cuối tháng không?',
        note: 'Cách nhờ vả hối thúc tiến độ cực kỳ lịch sự, không gây khó chịu cho đồng nghiệp.',
      },
      daily: {
        label: 'Giao tiếp Đời thường',
        badgeColor: 'amber',
        chunk: 'pay for expedited passport processing',
        chunkVi: 'đóng phí làm hộ chiếu nhanh',
        register: 'Thủ tục hành chính & Du lịch',
        sentence:
          'Since my trip is in two weeks, I had to pay an extra fee for expedited passport processing.',
        sentenceVi:
          'Vì chuyến đi của tôi chỉ còn 2 tuần nữa nên tôi phải đóng thêm phí để làm thủ tục cấp hộ chiếu nhanh.',
        note: "Tính từ 'expedited shipping / expedited processing' xuất hiện trên mọi trang thương mại điện tử.",
      },
    },
    quiz: {
      question:
        'Please submit all signed invoices by noon so the finance department can __________ your reimbursement.',
      options: ['expedite', 'elaborate', 'delegate', 'bottleneck'],
      answer: 'expedite',
      explanation:
        "'expedite reimbursement / approval / delivery' mang nghĩa đẩy nhanh tiến độ xử lý/hoàn tiền.",
    },
    chunkPuzzle: {
      targetChunk: 'expedite the contract approval process',
      meaningVi: 'xúc tiến nhanh quy trình phê duyệt hợp đồng',
      distractors: ['on', 'slow'],
    },
    sentenceStarter: 'Could you please help us expedite the approval for ',
  },
  {
    id: 'align',
    word: 'align',
    ipaUs: '/əˈlaɪn/',
    ipaUk: '/əˈlaɪn/',
    pos: 'Verb',
    cefr: 'B2',
    srsStatus: 'mastered',
    ef: 2.8,
    intervalText: '7 ngày tới',
    meaningVi: 'Căn chỉnh cho khớp nhau; thống nhất quan điểm, mục tiêu giữa các bên.',
    meaningEn: 'To bring into agreement, coordination, or close cooperation toward a shared goal.',
    trapTip:
      "Từ khóa số 1 nơi công sở quốc tế! Chú ý âm 'g' câm (/əˈlaɪn/). Khi nói thống nhất ý kiến với ai hoặc phù hợp với mục tiêu nào, luôn dùng giới từ 'align WITH' (hoặc 'get aligned ON a plan').",
    family: ['alignment (n)', 'misaligned (adj - lệch pha)', 'coordinate / sync (syn)'],
    contexts: {
      toeic: {
        label: 'TOEIC Thương mại',
        badgeColor: 'indigo',
        chunk: 'align departmental budgets with corporate goals',
        chunkVi: 'điều chỉnh ngân sách phòng ban khớp với mục tiêu chung của tập đoàn',
        register: 'Chiến lược doanh nghiệp · TOEIC',
        sentence:
          'All regional directors must align departmental budgets with corporate goals for the upcoming fiscal year.',
        sentenceVi:
          'Tất cả giám đốc khu vực phải điều chỉnh ngân sách phòng ban thống nhất với mục tiêu chung của tập đoàn trong năm tài chính tới.',
        note: "Cấu trúc 'align A with B' xuất hiện thường xuyên trong thông báo nội bộ.",
      },
      ielts: {
        label: 'IELTS Academic (Band 7.5+)',
        badgeColor: 'violet',
        chunk: 'align university curricula with labor market demands',
        chunkVi: 'điều chỉnh chương trình đại học sát với nhu cầu thị trường lao động',
        register: 'Học thuật · Chủ đề Education & Employment',
        sentence:
          'Tertiary institutions should closely align university curricula with evolving labor market demands.',
        sentenceVi:
          'Các cơ sở giáo dục đại học nên điều chỉnh chương trình giảng dạy bám sát với nhu cầu ngày càng thay đổi của thị trường lao động.',
        note: 'Ý tưởng và cụm từ cực sáng giá cho đề bài IELTS về giáo dục đại học.',
      },
      workplace: {
        label: 'Giao tiếp Công sở',
        badgeColor: 'emerald',
        chunk: 'make sure we are fully aligned on the scope',
        chunkVi: 'đảm bảo chúng ta hoàn toàn thống nhất về phạm vi công việc',
        register: 'Họp dự án · Kick-off & Sync',
        sentence:
          "Before we start coding, let's do a quick 10-minute sync to make sure we are fully aligned on the scope.",
        sentenceVi:
          'Trước khi bắt đầu code, hãy trao đổi nhanh 10 phút để đảm bảo chúng ta hoàn toàn thống nhất về phạm vi công việc.',
        note: 'Câu cửa miệng của Product Manager và Tech Lead trong các công ty đa quốc gia.',
      },
      daily: {
        label: 'Giao tiếp Đời thường',
        badgeColor: 'amber',
        chunk: 'align with my personal values',
        chunkVi: 'phù hợp với giá trị sống cá nhân của tôi',
        register: 'Đời sống & Định hướng bản thân',
        sentence:
          "I turned down the job offer because the company culture didn't really align with my personal values.",
        sentenceVi:
          'Tôi đã từ chối lời mời làm việc vì văn hóa công ty đó không thực sự phù hợp với giá trị cá nhân của tôi.',
        note: 'Dùng rất hay khi chia sẻ về lối sống, định hướng nghề nghiệp.',
      },
    },
    quiz: {
      question:
        "Let's schedule a brief meeting tomorrow morning to ensure the design and engineering teams are __________ on the new product specifications.",
      options: ['aligned', 'expedited', 'mitigated', 'delegated'],
      answer: 'aligned',
      explanation:
        "'be aligned on something' mang nghĩa thống nhất quan điểm, hiểu đúng ý nhau về một kế hoạch.",
    },
    chunkPuzzle: {
      targetChunk: 'make sure we are aligned on the scope',
      meaningVi: 'đảm bảo chúng ta thống nhất về phạm vi công việc',
      distractors: ['at', 'by'],
    },
    sentenceStarter: 'I want to make sure our team is fully aligned on ',
  },
  {
    id: 'feasible',
    word: 'feasible',
    ipaUs: '/ˈfiː.zə.bəl/',
    ipaUk: '/ˈfiː.zə.bəl/',
    pos: 'Adjective',
    cefr: 'B2-C1',
    srsStatus: 'mastered',
    ef: 2.7,
    intervalText: '7 ngày tới',
    meaningVi: 'Khả thi, có thể thực hiện được trên thực tế (về thời gian, chi phí, kỹ thuật).',
    meaningEn: 'Possible, practical, and likely to be achieved successfully given available resources.',
    trapTip:
      "Khác với 'possible' (chỉ khả năng lý thuyết có thể xảy ra), 'feasible' nhấn mạnh vào tính thực thi thực tế khi xét đến ngân sách, thời gian và nguồn lực (nghiên cứu khả thi = feasibility study).",
    family: ['feasibility (n)', 'infeasible (adj)', 'viable / practical (syn)'],
    contexts: {
      toeic: {
        label: 'TOEIC Thương mại',
        badgeColor: 'indigo',
        chunk: 'conduct a comprehensive feasibility study',
        chunkVi: 'tiến hành một nghiên cứu tiền khả thi toàn diện',
        register: 'Đầu tư & Dự án · TOEIC Part 5/7',
        sentence:
          'The board of directors voted to conduct a comprehensive feasibility study before approving the new factory construction.',
        sentenceVi:
          'Hội đồng quản trị đã bỏ phiếu tiến hành một nghiên cứu khả thi toàn diện trước khi phê duyệt việc xây dựng nhà máy mới.',
        note: "Cụm danh từ ghép 'feasibility study' là cụm cố định cực kỳ phổ biến.",
      },
      ielts: {
        label: 'IELTS Academic (Band 7.5+)',
        badgeColor: 'violet',
        chunk: 'an economically feasible alternative to fossil fuels',
        chunkVi: 'một giải pháp thay thế khả thi về mặt kinh tế cho nhiên liệu hóa thạch',
        register: 'Học thuật · Đánh giá giải pháp Task 2',
        sentence:
          'Advancements in battery storage have made solar power an economically feasible alternative to fossil fuels.',
        sentenceVi:
          'Những tiến bộ trong lưu trữ pin đã biến điện mặt trời thành một giải pháp thay thế khả thi về mặt kinh tế cho nhiên liệu hóa thạch.',
        note: "Cặp 'economically / technically / politically feasible' giúp lập luận cực kỳ thuyết phục.",
      },
      workplace: {
        label: 'Giao tiếp Công sở',
        badgeColor: 'emerald',
        chunk: 'not feasible within the current timeframe',
        chunkVi: 'không khả thi trong khung thời gian hiện tại',
        register: 'Đàm phán deadline · Lịch sự & Chuyên nghiệp',
        sentence:
          'Adding three new payment gateways is not feasible within the current timeframe unless we push the release date by two weeks.',
        sentenceVi:
          'Việc thêm ba cổng thanh toán mới là không khả thi trong khung thời gian hiện tại trừ khi chúng ta lùi ngày ra mắt lại hai tuần.',
        note: "Cách từ chối yêu cầu vô lý (scope creep) một cách khách quan thay vì nói 'I can't do it'.",
      },
      daily: {
        label: 'Giao tiếp Đời thường',
        badgeColor: 'amber',
        chunk: "doesn't seem feasible right now",
        chunkVi: 'hiện tại có vẻ chưa thực tế / chưa làm được',
        register: 'Kế hoạch cá nhân & Tài chính',
        sentence:
          "Buying a house in the city center just doesn't seem feasible right now with mortgage rates this high.",
        sentenceVi:
          'Mua nhà ở trung tâm thành phố hiện tại có vẻ chưa khả thi khi lãi suất vay mua nhà cao thế này.',
        note: 'Dùng khi bàn chuyện chi tiêu, kế hoạch du lịch hoặc mua sắm lớn.',
      },
    },
    quiz: {
      question:
        'While the proposed design looks impressive, our engineers determined that it is not technically __________ given our current hardware constraints.',
      options: ['feasible', 'accommodating', 'elaborate', 'aligned'],
      answer: 'feasible',
      explanation: "'technically feasible' nghĩa là khả thi về mặt kỹ thuật.",
    },
    chunkPuzzle: {
      targetChunk: 'not feasible within the current timeframe',
      meaningVi: 'không khả thi trong khung thời gian hiện tại',
      distractors: ['on', 'from'],
    },
    sentenceStarter: 'Given our current budget and resources, it would be more feasible to ',
  },
  {
    id: 'bottleneck',
    word: 'bottleneck',
    ipaUs: '/ˈbɑː.təl.nek/',
    ipaUk: '/ˈbɒt.əl.nek/',
    pos: 'Noun',
    cefr: 'B2-C1',
    srsStatus: 'learning',
    ef: 2.5,
    intervalText: '2 ngày tới',
    meaningVi: 'Điểm nghẽn, nút thắt cổ chai làm trì trệ toàn bộ quy trình hoặc tiến độ.',
    meaningEn:
      'A point of congestion or blockage in a system or workflow that slows down overall progress.',
    trapTip:
      "Hình ảnh ẩn dụ từ 'cổ chai' hẹp làm nước chảy chậm lại. Trong công sở và kỹ thuật, các động từ chuẩn đi trước 'bottleneck' là: identify (xác định), eliminate / remove (loại bỏ), hoặc resolve (giải quyết) a bottleneck.",
    family: ['bottlenecked (adj)', 'gridlock / impediment / constraint (syn)'],
    contexts: {
      toeic: {
        label: 'TOEIC Thương mại',
        badgeColor: 'indigo',
        chunk: 'eliminate production bottlenecks at the assembly plant',
        chunkVi: 'loại bỏ các điểm nghẽn sản xuất tại nhà máy lắp ráp',
        register: 'Sản xuất & Vận hành · TOEIC',
        sentence:
          'Installing automated sorting machines helped eliminate production bottlenecks at the main assembly plant.',
        sentenceVi:
          'Việc lắp đặt máy phân loại tự động đã giúp loại bỏ các điểm nghẽn sản xuất tại nhà máy lắp ráp chính.',
        note: 'Hay gặp trong chủ đề Manufacturing, Logistics và Operations.',
      },
      ielts: {
        label: 'IELTS Academic (Band 7.5+)',
        badgeColor: 'violet',
        chunk: 'severe infrastructure bottlenecks hindering economic growth',
        chunkVi: 'những điểm nghẽn hạ tầng nghiêm trọng cản trở tăng trưởng kinh tế',
        register: 'Học thuật · Kinh tế vĩ mô & Giao thông',
        sentence:
          'Developing nations must invest in modern ports and railways to overcome severe infrastructure bottlenecks hindering economic growth.',
        sentenceVi:
          'Các quốc gia đang phát triển phải đầu tư vào cảng biển và đường sắt hiện đại để tháo gỡ những điểm nghẽn hạ tầng nghiêm trọng đang cản trở tăng trưởng kinh tế.',
        note: 'Từ vựng cực chất khi viết về giao thông đô thị hoặc phát triển kinh tế.',
      },
      workplace: {
        label: 'Giao tiếp Công sở',
        badgeColor: 'emerald',
        chunk: 'identify the main bottleneck in our QA workflow',
        chunkVi: 'xác định điểm nghẽn chính trong quy trình kiểm thử QA',
        register: 'Báo cáo tiến độ · Daily Standup & Retro',
        sentence:
          'During the sprint retrospective, the team worked together to identify the main bottleneck in our QA workflow.',
        sentenceVi:
          'Trong buổi họp nhìn lại sprint (Retrospective), cả nhóm đã cùng làm việc để xác định điểm nghẽn chính trong quy trình kiểm thử QA.',
        note: 'Giúp bạn mô tả vấn đề quy trình một cách chuyên nghiệp mà không đổ lỗi cá nhân.',
      },
      daily: {
        label: 'Giao tiếp Đời thường',
        badgeColor: 'amber',
        chunk: 'stuck in a traffic bottleneck at the bridge',
        chunkVi: 'bị kẹt cứng ở nút thắt giao thông ngay đầu cầu',
        register: 'Đời sống · Đi lại hàng ngày',
        sentence:
          "I'll be ten minutes late—I'm stuck in a huge traffic bottleneck right at the bridge entrance.",
        sentenceVi:
          'Mình sẽ đến muộn 10 phút nhé—mình đang bị kẹt ở nút thắt giao thông ngay lối lên cầu.',
        note: 'Nghĩa đen thực tế dùng khi mô tả đoạn đường bị thu hẹp gây kẹt xe.',
      },
    },
    quiz: {
      question:
        'Manual invoice approval has become a major __________ that delays vendor payments by up to two weeks.',
      options: ['bottleneck', 'delegation', 'accommodation', 'alignment'],
      answer: 'bottleneck',
      explanation:
        "'a major bottleneck' (điểm nghẽn lớn) là danh từ chỉ khâu làm chậm toàn bộ quy trình.",
    },
    chunkPuzzle: {
      targetChunk: 'identify the main bottleneck in our workflow',
      meaningVi: 'xác định điểm nghẽn chính trong quy trình làm việc',
      distractors: ['at', 'with'],
    },
    sentenceStarter: 'Right now, the biggest bottleneck slowing down our progress is ',
  },
  {
    id: 'follow-up',
    word: 'follow up / touch base',
    ipaUs: '/ˈfɑː.loʊ ʌp / tʌtʃ beɪs/',
    ipaUk: '/ˈfɒl.əʊ ʌp / tʌtʃ beɪs/',
    pos: 'Verb Chunk',
    cefr: 'B2',
    srsStatus: 'mastered',
    ef: 2.9,
    intervalText: '10 ngày tới',
    meaningVi: 'Liên hệ lại để cập nhật tình hình, theo sát tiến độ hoặc nhắc nhở khéo.',
    meaningEn:
      'To make further contact with someone to check progress, exchange updates, or pursue an earlier discussion.',
    trapTip:
      "Quy tắc dấu gạch ngang: Khi là Động từ thì viết rời ('I will follow up with you'), nhưng khi là Danh từ hoặc Tính từ đứng trước danh từ thì có gạch nối ('a follow-up email', 'a quick follow-up'). 'Touch base' thân thiện và nhẹ nhàng hơn khi hỏi thăm tiến độ.",
    family: ['follow-up (n/adj)', 'check in / circle back (syn)'],
    contexts: {
      toeic: {
        label: 'TOEIC Thương mại',
        badgeColor: 'indigo',
        chunk: 'follow up on the status of your application',
        chunkVi: 'theo dõi / hỏi thăm về tình trạng hồ sơ của bạn',
        register: 'Email giao dịch & Tuyển dụng · TOEIC',
        sentence:
          'I am writing to follow up on the status of the vendor application we submitted on October 15.',
        sentenceVi:
          'Tôi viết thư này để hỏi thăm về tình trạng hồ sơ đăng ký nhà cung cấp mà chúng tôi đã nộp vào ngày 15 tháng 10.',
        note: "Cấu trúc chuẩn mở đầu email nhắc việc: 'I am writing to follow up on...'.",
      },
      ielts: {
        label: 'IELTS Academic (Band 7.5+)',
        badgeColor: 'violet',
        chunk: 'conduct a longitudinal follow-up study',
        chunkVi: 'tiến hành một nghiên cứu theo dõi dọc dài hạn',
        register: 'Học thuật · Nghiên cứu khoa học & Y tế',
        sentence:
          'Researchers conducted a five-year follow-up study to evaluate the long-term efficacy of the educational reform.',
        sentenceVi:
          'Các nhà nghiên cứu đã tiến hành một nghiên cứu theo dõi kéo dài 5 năm để đánh giá hiệu quả lâu dài của cuộc cải cách giáo dục.',
        note: "Trong IELTS Academic, hãy ưu tiên dạng danh từ ghép 'a follow-up study / assessment' thay vì phrasal verb.",
      },
      workplace: {
        label: 'Giao tiếp Công sở',
        badgeColor: 'emerald',
        chunk: 'just wanted to touch base with you regarding...',
        chunkVi: 'chỉ muốn liên hệ nhanh với bạn để cập nhật về...',
        register: 'Lịch sự, không gây áp lực · Email & Slack',
        sentence:
          'Hi Sarah, I just wanted to touch base with you regarding the Q4 budget proposal and see if you need any additional data.',
        sentenceVi:
          'Chào Sarah, mình chỉ muốn liên hệ nhanh với bạn về đề xuất ngân sách Quý 4 và xem bạn có cần thêm số liệu nào không.',
        note: 'Cách nhắc khéo đồng nghiệp hoặc khách hàng đỉnh cao mà không tạo cảm giác hối thúc nặng nề.',
      },
      daily: {
        label: 'Giao tiếp Đời thường',
        badgeColor: 'amber',
        chunk: 'touch base next week over lunch',
        chunkVi: 'tuần sau gặp nhau ăn trưa cập nhật tình hình nhé',
        register: 'Thân thiện · Bạn bè & Mối quan hệ',
        sentence: "It's been ages since we caught up! Let's touch base next week over lunch.",
        sentenceVi: 'Lâu lắm rồi tụi mình chưa gặp nhau! Tuần sau đi ăn trưa cập nhật tình hình nhé.',
        note: 'Dùng để giữ liên lạc với bạn bè hoặc đồng nghiệp cũ.',
      },
    },
    quiz: {
      question:
        'After sending the initial quotation, the account manager scheduled a __________ call for Thursday to answer any technical questions.',
      options: ['follow-up', 'bottleneck', 'feasible', 'mitigated'],
      answer: 'follow-up',
      explanation:
        "Đứng trước danh từ 'call', ta dùng tính từ ghép có dấu gạch nối 'follow-up call' (cuộc gọi trao đổi tiếp theo).",
    },
    chunkPuzzle: {
      targetChunk: 'follow up on the status of the proposal',
      meaningVi: 'theo dõi tình trạng của bản đề xuất',
      distractors: ['into', 'at'],
    },
    sentenceStarter: 'Hi team, I just wanted to follow up on ',
  },
];

export const DEFAULT_WORDS: VocabItem[] = [
  ...CORE_10_WORDS.map((w) => ({
    ...w,
    ...(OXFORD_AUDIO_MAP[w.id] || {}),
  })),
  ...OXFORD_EXTRA_WORDS,
];

export const DEFAULT_PHRASEBOOK: PhrasebookItem[] = [
  {
    id: 'pb-1',
    category: 'email',
    categoryLabel: '📧 Email & Báo cáo',
    situation: 'Nhắc khéo đối tác/đồng nghiệp phản hồi email mà không gây áp lực',
    chunk: 'follow up on / touch base regarding',
    sentenceEn:
      'Hi Alex, I wanted to quickly touch base regarding the contract draft sent last Tuesday and see if you have any feedback.',
    sentenceVi:
      'Chào Alex, mình muốn liên hệ nhanh về bản dự thảo hợp đồng gửi hôm thứ Ba tuần trước và xem bạn có góp ý gì không.',
    tone: 'Lịch sự · Thiện chí',
    saved: true,
  },
  {
    id: 'pb-2',
    category: 'deadline',
    categoryLabel: '⏳ Đàm phán & Deadline',
    situation: 'Từ chối khéo yêu cầu thêm tính năng sát ngày ra mắt (Scope Creep)',
    chunk: 'not feasible within the current timeframe',
    sentenceEn:
      "While this feature adds great value, implementing it now is not feasible within the current timeframe without impacting Friday's release.",
    sentenceVi:
      'Dù tính năng này mang lại giá trị lớn, việc triển khai ngay lúc này là không khả thi trong khung thời gian hiện tại nếu không làm ảnh hưởng đến đợt ra mắt thứ Sáu.',
    tone: 'Khách quan · Chắc chắn',
    saved: true,
  },
  {
    id: 'pb-3',
    category: 'meeting',
    categoryLabel: '🎙️ Họp hành & Thuyết trình',
    situation: 'Nhờ đồng nghiệp giải thích sâu hơn một ý kiến trong cuộc họp',
    chunk: 'elaborate a bit more on...',
    sentenceEn:
      "That's an interesting approach—could you elaborate a bit more on how we will handle data migration?",
    sentenceVi:
      'Hướng tiếp cận đó rất thú vị—bạn có thể trình bày chi tiết hơn một chút về cách chúng ta xử lý việc chuyển đổi dữ liệu không?',
    tone: 'Tôn trọng · Cầu thị',
    saved: false,
  },
  {
    id: 'pb-4',
    category: 'meeting',
    categoryLabel: '🎙️ Họp hành & Thuyết trình',
    situation: 'Chốt lại sự thống nhất của cả nhóm trước khi kết thúc cuộc họp',
    chunk: 'make sure we are fully aligned on...',
    sentenceEn:
      "Before we wrap up, let's recap the action items to make sure everyone is fully aligned on the deliverables for next week.",
    sentenceVi:
      'Trước khi kết thúc, hãy điểm lại các đầu việc để đảm bảo mọi người hoàn toàn thống nhất về kết quả cần bàn giao trong tuần tới.',
    tone: 'Chuyên nghiệp · Rõ ràng',
    saved: true,
  },
  {
    id: 'pb-5',
    category: 'slack',
    categoryLabel: '💬 Nhắn tin Slack / Teams',
    situation: 'Báo cáo điểm nghẽn đang làm chậm tiến độ trong Daily Standup',
    chunk: 'identify / resolve a bottleneck in...',
    sentenceEn:
      'Quick update: coding is 100% done, but we hit a bottleneck in staging environment deployment. DevOps is looking into it now.',
    sentenceVi:
      'Cập nhật nhanh: phần code đã xong 100%, nhưng chúng ta đang vướng một điểm nghẽn ở khâu đưa lên môi trường staging. Đội DevOps đang kiểm tra.',
    tone: 'Ngắn gọn · Minh bạch',
    saved: false,
  },
  {
    id: 'pb-6',
    category: 'email',
    categoryLabel: '📧 Email & Báo cáo',
    situation: 'Trấn an khách hàng rằng vấn đề của họ đang được xử lý trực diện',
    chunk: 'address the issue promptly',
    sentenceEn:
      'Thank you for bringing this to our attention. Our engineering team is actively working to address the issue promptly.',
    sentenceVi:
      'Cảm ơn bạn đã thông báo điều này cho chúng tôi. Đội ngũ kỹ thuật đang tích cực làm việc để giải quyết vấn đề một cách nhanh chóng.',
    tone: 'Chuyên nghiệp · Đáng tin cậy',
    saved: false,
  },
  {
    id: 'pb-7',
    category: 'deadline',
    categoryLabel: '⏳ Đàm phán & Deadline',
    situation: 'Nhờ bộ phận khác ưu tiên duyệt gấp hồ sơ hoặc hợp đồng',
    chunk: 'expedite the approval process',
    sentenceEn:
      'Since the client is ready to sign today, we would greatly appreciate it if you could help expedite the legal approval process.',
    sentenceVi:
      'Vì khách hàng đã sẵn sàng ký kết hôm nay, chúng tôi rất cảm kích nếu bạn có thể hỗ trợ xúc tiến nhanh quy trình phê duyệt pháp lý.',
    tone: 'Khẩn trương · Lịch sự',
    saved: false,
  },
  {
    id: 'pb-8',
    category: 'email',
    categoryLabel: '📧 Email & Báo cáo',
    situation: 'Đề xuất phương án dự phòng để giảm thiểu rủi ro dự án',
    chunk: 'mitigate the risk of...',
    sentenceEn:
      'To mitigate the risk of server overload during the campaign, we recommend scaling up cloud capacity 24 hours in advance.',
    sentenceVi:
      'Để giảm thiểu rủi ro quá tải máy chủ trong chiến dịch, chúng tôi khuyến nghị nâng cấp dung lượng đám mây trước 24 giờ.',
    tone: 'Tư vấn · Chiến lược',
    saved: false,
  },
  {
    id: 'pb-9',
    category: 'slack',
    categoryLabel: '💬 Nhắn tin Slack / Teams',
    situation: 'Bàn giao quyền phụ trách đầu việc cho thành viên trong nhóm',
    chunk: 'delegate ownership of...',
    sentenceEn:
      "While I'm attending the client summit on Thursday, I'll delegate ownership of the release checklist to Lan.",
    sentenceVi:
      'Trong lúc mình tham dự hội nghị khách hàng vào thứ Năm, mình sẽ ủy quyền phụ trách danh sách kiểm tra ra mắt sản phẩm cho Lan.',
    tone: 'Rõ ràng · Tin tưởng',
    saved: false,
  },
  {
    id: 'pb-10',
    category: 'deadline',
    categoryLabel: '⏳ Đàm phán & Deadline',
    situation: 'Thông báo điều chỉnh kế hoạch để hỗ trợ yêu cầu mới từ khách hàng',
    chunk: 'accommodate your request / timeline',
    sentenceEn:
      'We have rearranged our testing schedule so that we can accommodate your request for an early demo on Wednesday.',
    sentenceVi:
      'Chúng tôi đã sắp xếp lại lịch kiểm thử để có thể đáp ứng yêu cầu xem bản demo sớm vào thứ Tư của bạn.',
    tone: 'Hợp tác · Linh hoạt',
    saved: false,
  },
];

export const SQL_SCHEMA_TEXT = `-- LexiFlow Pro: 3-Tier Multi-Context Vocabulary & SM-2 SRS Schema
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Bảng lưu trữ Tầng 1: Từ vựng cốt lõi (Core Words)
CREATE TABLE words (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(64) UNIQUE NOT NULL,
    word_text VARCHAR(120) NOT NULL,
    part_of_speech VARCHAR(32) NOT NULL,
    cefr_level VARCHAR(16) NOT NULL DEFAULT 'B2',
    ipa_us VARCHAR(120),
    ipa_uk VARCHAR(120),
    core_meaning_vi TEXT NOT NULL,
    core_meaning_en TEXT,
    exam_trap_note TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Bảng lưu trữ Tầng 2: Cụm từ theo 4 ngữ cảnh (Collocations & Chunks)
CREATE TYPE context_domain AS ENUM ('toeic', 'ielts', 'workplace', 'daily');

CREATE TABLE word_chunks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    word_id UUID NOT NULL REFERENCES words(id) ON DELETE CASCADE,
    context_type context_domain NOT NULL,
    chunk_en TEXT NOT NULL,
    chunk_vi TEXT NOT NULL,
    register_note VARCHAR(160),
    UNIQUE (word_id, context_type)
);

-- 3. Bảng lưu trữ Tầng 3: Mẫu câu hoàn chỉnh (Full Contextual Sentences)
CREATE TABLE context_sentences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    chunk_id UUID NOT NULL REFERENCES word_chunks(id) ON DELETE CASCADE,
    sentence_en TEXT NOT NULL,
    sentence_vi TEXT NOT NULL,
    scoring_note TEXT,
    audio_url VARCHAR(512)
);

-- 4. Bảng theo dõi Tiến độ SRS SM-2 & Lịch sử AI chấm câu của Học viên
CREATE TYPE srs_state AS ENUM ('review', 'learning', 'mastered');

CREATE TABLE user_srs_progress (
    user_id UUID NOT NULL,
    word_id UUID NOT NULL REFERENCES words(id) ON DELETE CASCADE,
    srs_status srs_state NOT NULL DEFAULT 'review',
    easiness_factor NUMERIC(4,2) NOT NULL DEFAULT 2.50,
    interval_days INTEGER NOT NULL DEFAULT 0,
    repetitions INTEGER NOT NULL DEFAULT 0,
    next_review_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_user_sentence TEXT,
    last_ai_band_score NUMERIC(3,1),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, word_id)
);

CREATE INDEX idx_srs_user_next_review ON user_srs_progress(user_id, next_review_at);`;
