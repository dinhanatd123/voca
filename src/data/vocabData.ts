import { VocabItem, PhrasebookItem, PersonaMode } from '../types';

export const PERSONA_META: Record<
  PersonaMode,
  { tag: string; desc: string; defaultDomain: 'office' | 'ielts' | 'toeic' }
> = {
  all: {
    tag: 'Chế độ Toàn diện',
    desc: 'Kết hợp đầy đủ 4 luồng: TOEIC thương mại, IELTS học thuật, Email/Họp công sở và Phản xạ đời thường.',
    defaultDomain: 'office',
  },
  busy_pro: {
    tag: 'Người đi làm bận rộn (5–10p/ngày)',
    desc: 'Ưu tiên các Cụm từ & Câu mẫu ứng dụng ngay vào viết Email, họp trực tuyến, đàm phán và báo cáo tiến độ.',
    defaultDomain: 'office',
  },
  fresh_grad: {
    tag: 'Sinh viên mới ra trường',
    desc: 'Tập trung từ vựng thi TOEIC đi kèm mẫu câu giao tiếp văn phòng để tự tin phỏng vấn và thử việc.',
    defaultDomain: 'toeic',
  },
  exam_prep: {
    tag: 'Luyện thi cấp tốc (IELTS & TOEIC)',
    desc: 'Tập trung Academic Collocations (Band 7.0–8.0+) và các cấu trúc bẫy thường gặp trong đề thi.',
    defaultDomain: 'ielts',
  },
};

export const INITIAL_VOCAB_DATA: VocabItem[] = [
  {
    id: 'accommodate',
    word: 'accommodate',
    pos: 'Verb',
    ipa: '/əˈkɑː.mə.deɪt/',
    cefr: 'B2–C1',
    coreMeaning: 'Đáp ứng yêu cầu, điều chỉnh cho phù hợp, hoặc cung cấp đủ chỗ cho ai/cái gì.',
    memoryTip:
      "Mẹo nhớ: Có gốc 'commod-' (tiện nghi/phù hợp) — làm cho mọi thứ vừa vặn, thuận tiện với nhu cầu của đối phương.",
    srsStatus: 'due',
    srsInterval: 'Đến hạn hôm nay (Chu kỳ 1 ngày)',
    personas: ['all', 'busy_pro', 'fresh_grad', 'exam_prep'],
    contexts: {
      toeic: {
        badge: 'TOEIC Part 4 & 7 · Khách sạn & Dịch vụ',
        chunk: 'accommodate up to 200 guests / accommodate special dietary requests',
        chunkMeaning: 'Đủ sức chứa tới 200 khách / Đáp ứng các yêu cầu ăn kiêng đặc biệt',
        sentenceEn:
          "The grand ballroom can accommodate up to 200 guests for the annual shareholders' banquet.",
        sentenceVi:
          'Phòng khánh tiết lớn có thể đón tiếp tới 200 vị khách cho buổi tiệc thường niên của các cổ đông.',
        grammarNote:
          "Thường đi kèm giới từ 'up to + số lượng' trong các bài đọc TOEIC về đặt phòng hội nghị.",
      },
      ielts: {
        badge: 'IELTS Writing Task 2 · Urbanization (Band 7.5+)',
        chunk: 'accommodate the burgeoning population / accommodate the shifting needs of',
        chunkMeaning: 'Đáp ứng quy mô dân số tăng nhanh / Thích ứng với nhu cầu thay đổi của...',
        sentenceEn:
          'Municipal authorities must expand public transit infrastructure to accommodate the burgeoning urban population.',
        sentenceVi:
          'Chính quyền thành phố phải mở rộng cơ sở hạ tầng giao thông công cộng để đáp ứng quy mô dân số đô thị đang gia tăng nhanh chóng.',
        grammarNote:
          "Thay thế cực kỳ đắt giá cho cụm từ đơn giản 'have enough space for more people'.",
      },
      office: {
        badge: 'Giao tiếp Công sở · Đặt lịch họp & Đàm phán',
        chunk: 'accommodate your schedule / accommodate a last-minute change',
        chunkMeaning: 'Linh hoạt điều chỉnh theo lịch của bạn / Xoay xở cho một thay đổi phút chót',
        sentenceEn:
          "We would be happy to push Friday's kickoff meeting to 3:00 PM to accommodate your schedule.",
        sentenceVi:
          'Chúng tôi rất sẵn lòng dời buổi họp khởi động ngày thứ Sáu sang 3 giờ chiều để thuận tiện cho lịch trình của bạn.',
        grammarNote: 'Cụm từ lịch sự, chuyên nghiệp khi viết email dời lịch với khách hàng hoặc sếp.',
      },
      daily: {
        badge: 'Giao tiếp Đời thường · Nhà hàng & Du lịch',
        chunk: 'accommodate a late check-out',
        chunkMeaning: 'Hỗ trợ trả phòng muộn',
        sentenceEn: "Since our flight isn't until 9 PM, could the hotel accommodate a late check-out?",
        sentenceVi:
          'Vì chuyến bay của tụi mình tận 9 giờ tối mới cất cánh, khách sạn có thể hỗ trợ cho trả phòng muộn được không?',
        grammarNote: "Cách hỏi lịch sự giúp bạn dễ được lễ tân hỗ trợ hơn so với 'Can I check out late?'.",
      },
    },
    practice: {
      step1Question:
        "Từ nào mang nghĩa 'đáp ứng nhu cầu, điều chỉnh lịch trình hoặc đủ sức chứa cho một lượng khách'?",
      step1Choices: ['accommodate', 'accumulate', 'accelerate', 'acknowledge'],
      step2TargetMeaning: 'Linh hoạt điều chỉnh để phù hợp với lịch trình của bạn',
      step2Words: ['to', 'accommodate', 'your', 'schedule'],
      step2Distractors: ['with', 'calendar'],
      step3TargetChunk: 'accommodate your schedule',
      step3Template: 'Please let me know if we need to move the meeting to accommodate your schedule.',
    },
  },
  {
    id: 'address',
    word: 'address',
    pos: 'Verb / Noun',
    ipa: '/əˈdres/',
    cefr: 'B2',
    coreMeaning: '(Động từ) Giải quyết, xử lý trực diện một vấn đề; hoặc phát biểu trước đám đông.',
    memoryTip:
      "Đừng chỉ dịch là 'địa chỉ'! Khi làm động từ, 'address an issue' = gửi hướng giải quyết tới tận 'địa chỉ' của vấn đề.",
    srsStatus: 'due',
    srsInterval: 'Đến hạn hôm nay (Chu kỳ 3 ngày)',
    personas: ['all', 'busy_pro', 'fresh_grad', 'exam_prep'],
    contexts: {
      toeic: {
        badge: 'TOEIC Part 5 & 7 · Chăm sóc khách hàng',
        chunk: 'address customer inquiries promptly',
        chunkMeaning: 'Giải đáp/xử lý các thắc mắc của khách hàng một cách nhanh chóng',
        sentenceEn:
          'Our technical support team strives to address customer inquiries promptly within 24 business hours.',
        sentenceVi:
          'Đội ngũ hỗ trợ kỹ thuật của chúng tôi luôn nỗ lực giải quyết thắc mắc của khách hàng nhanh chóng trong vòng 24 giờ làm việc.',
        grammarNote:
          "Trong TOEIC, 'address + problem/concern/inquiry' là đáp án cực kỳ phổ biến thay cho 'solve'.",
      },
      ielts: {
        badge: 'IELTS Writing Task 2 · Problem & Solution (Band 7.0+)',
        chunk: 'address the root causes of / address the pressing issue of',
        chunkMeaning: 'Giải quyết nguyên nhân gốc rễ của... / Xử lý vấn đề cấp bách về...',
        sentenceEn:
          'Merely imposing heavier fines fails to address the root causes of environmental degradation.',
        sentenceVi:
          'Việc chỉ áp đặt mức phạt nặng hơn không thể giải quyết tận gốc nguyên nhân của tình trạng suy thoái môi trường.',
        grammarNote:
          "Cụm 'address the root causes of' là khung xương sống cho mọi bài luận Problem-Solution.",
      },
      office: {
        badge: 'Giao tiếp Công sở · Họp giải quyết sự cố',
        chunk: 'address the bottleneck / address your concerns',
        chunkMeaning: 'Tháo gỡ điểm nghẽn / Giải tỏa những băn khoăn của bạn',
        sentenceEn:
          "Before we finalize the Q4 budget, I'd like to address the concerns raised by the marketing team.",
        sentenceVi:
          'Trước khi chốt ngân sách Quý 4, tôi muốn giải quyết các băn khoăn mà đội Marketing đã nêu ra.',
        grammarNote: 'Dùng trong cuộc họp khi muốn chuyển sang phần giải quyết thắc mắc của đồng nghiệp.',
      },
      daily: {
        badge: 'Giao tiếp Đời thường · Chuyện trò & Quan hệ',
        chunk: 'address the elephant in the room',
        chunkMeaning: 'Thẳng thắn nói về vấn đề nhạy cảm mà ai cũng biết nhưng né tránh',
        sentenceEn:
          "It's time we addressed the elephant in the room regarding how we split the apartment bills.",
        sentenceVi:
          'Đã đến lúc tụi mình phải nói thẳng với nhau về chuyện chia tiền hóa đơn căn hộ rồi.',
        grammarNote: 'Idiom cực kỳ tự nhiên trong giao tiếp hàng ngày và IELTS Speaking.',
      },
    },
    practice: {
      step1Question:
        "Động từ nào vừa có nghĩa là 'địa chỉ' (danh từ), vừa mang nghĩa 'giải quyết trực diện một vấn đề/băn khoăn'?",
      step1Choices: ['address', 'allocate', 'attribute', 'advocate'],
      step2TargetMeaning: 'Giải quyết nguyên nhân gốc rễ của vấn đề',
      step2Words: ['address', 'the', 'root', 'causes', 'of'],
      step2Distractors: ['for', 'reason'],
      step3TargetChunk: 'address the concerns',
      step3Template: "Let's schedule a quick call to address the concerns from our client.",
    },
  },
  {
    id: 'elaborate',
    word: 'elaborate',
    pos: 'Verb / Adj',
    ipa: '/iˈlæb.ə.reɪt/',
    cefr: 'B2–C1',
    coreMeaning: '(Động từ) Giải thích kỹ hơn, trình bày chi tiết hơn về một ý tưởng.',
    memoryTip:
      "Chú ý giới từ đi kèm luôn là 'elaborate ON something' = đào sâu thêm chi tiết về điều gì.",
    srsStatus: 'learning',
    srsInterval: 'Ôn lại sau 3 ngày',
    personas: ['all', 'busy_pro', 'exam_prep'],
    contexts: {
      toeic: {
        badge: 'TOEIC Part 3 & 6 · Thuyết trình dự án',
        chunk: 'elaborate on the proposed timeline',
        chunkMeaning: 'Trình bày chi tiết hơn về mốc thời gian đề xuất',
        sentenceEn:
          "During tomorrow's briefing, Ms. Lin will elaborate on the proposed timeline for the warehouse expansion.",
        sentenceVi:
          'Trong buổi phổ biến ngày mai, cô Lin sẽ trình bày chi tiết hơn về tiến độ đề xuất cho việc mở rộng nhà kho.',
        grammarNote: "Nhớ bẫy giới từ TOEIC Part 5: luôn chọn 'on' sau động từ 'elaborate'.",
      },
      ielts: {
        badge: 'IELTS Speaking Part 3 · Mở rộng câu trả lời',
        chunk: 'To elaborate further on this point,',
        chunkMeaning: 'Để phân tích sâu hơn về luận điểm này,',
        sentenceEn:
          'To elaborate further on this point, remote work not only cuts commuting time but also boosts autonomy.',
        sentenceVi:
          'Để làm rõ hơn luận điểm này, làm việc từ xa không chỉ cắt giảm thời gian đi lại mà còn nâng cao tính tự chủ.',
        grammarNote:
          'Dùng cụm chuyển ý này ở Speaking Part 3 giúp tăng điểm Fluency & Coherence ngay lập tức.',
      },
      office: {
        badge: 'Giao tiếp Công sở · Hỏi thêm thông tin trong cuộc họp',
        chunk: 'Could you elaborate on...? / elaborate a bit more on',
        chunkMeaning: 'Bạn có thể nói rõ hơn về... được không?',
        sentenceEn:
          'That sounds promising—could you elaborate a bit more on how this impacts our Q3 KPIs?',
        sentenceVi:
          'Nghe rất triển vọng đấy — bạn có thể chia sẻ cụ thể hơn việc này tác động thế nào đến KPI Quý 3 của chúng ta không?',
        grammarNote: "Lịch sự và chuyên nghiệp hơn rất nhiều so với 'Can you explain more?'.",
      },
      daily: {
        badge: 'Giao tiếp Đời thường · Kể chuyện',
        chunk: 'care to elaborate?',
        chunkMeaning: 'Kể rõ hơn xem nào? (Dùng thân mật với bạn bè)',
        sentenceEn: 'You said your weekend trip was a total plot twist—care to elaborate?',
        sentenceVi:
          'Cậu bảo chuyến đi cuối tuần vừa rồi toàn cú ngoặt bất ngờ hả — kể kỹ hơn nghe xem nào?',
        grammarNote: 'Câu hỏi ngắn, tự nhiên như người bản xứ khi muốn bạn bè kể thêm chi tiết.',
      },
    },
    practice: {
      step1Question:
        "Từ nào đi với giới từ 'on' mang nghĩa 'trình bày chi tiết hơn, giải thích sâu hơn'?",
      step1Choices: ['elaborate', 'eliminate', 'evaluate', 'exaggerate'],
      step2TargetMeaning: 'Bạn có thể trình bày chi tiết hơn về điều đó không?',
      step2Words: ['Could', 'you', 'elaborate', 'on', 'that'],
      step2Distractors: ['about', 'with'],
      step3TargetChunk: 'elaborate on',
      step3Template: 'Could you please elaborate on the budget requirements for this campaign?',
    },
  },
  {
    id: 'delegate',
    word: 'delegate',
    pos: 'Verb / Noun',
    ipa: '/ˈdel.ə.ɡeɪt/',
    cefr: 'B2–C1',
    coreMeaning:
      '(Động từ) Ủy quyền, giao phó công việc/trách nhiệm cho cấp dưới hoặc thành viên trong nhóm.',
    memoryTip:
      'Danh từ đọc là /ˈdel.ə.ɡət/ (đại biểu), Động từ đọc đuôi /-ɡeɪt/ (phân công, ủy quyền).',
    srsStatus: 'due',
    srsInterval: 'Đến hạn hôm nay (Chu kỳ 2 ngày)',
    personas: ['all', 'busy_pro', 'fresh_grad'],
    contexts: {
      toeic: {
        badge: 'TOEIC Part 4 & 7 · Quản trị & Hội nghị',
        chunk: 'delegate authority to / conference delegates',
        chunkMeaning: 'Ủy quyền cho ai / Các đại biểu tham dự hội nghị',
        sentenceEn:
          'All conference delegates are requested to pick up their name badges at the registration desk.',
        sentenceVi:
          'Tất cả các đại biểu dự hội nghị được yêu cầu nhận thẻ tên tại bàn đăng ký.',
        grammarNote:
          'Đề TOEIC rất hay hỏi cả nghĩa Danh từ (đại biểu dự hội thảo) lẫn Động từ (giao việc).',
      },
      ielts: {
        badge: 'IELTS Writing & Speaking · Quản lý & Công việc',
        chunk: 'delegate routine tasks effectively',
        chunkMeaning: 'Phân công các công việc thường nhật một cách hiệu quả',
        sentenceEn:
          'Competent leaders know how to delegate routine tasks effectively so they can focus on strategic vision.',
        sentenceVi:
          'Những nhà lãnh đạo có năng lực biết cách phân công các tác vụ thường nhật hiệu quả để tập trung vào tầm nhìn chiến lược.',
        grammarNote:
          "Cấu trúc 'delegate [something] TO [someone]' rất ăn điểm trong chủ đề Work/Leadership.",
      },
      office: {
        badge: 'Giao tiếp Công sở · Phân chia đầu việc trong Team',
        chunk: 'delegate this task to / delegate ownership of',
        chunkMeaning: 'Giao đầu việc này cho... / Bàn giao quyền phụ trách...',
        sentenceEn:
          "Since my plate is full this week, I'll delegate the client onboarding report to Minh.",
        sentenceVi:
          'Vì tuần này lịch việc của tôi đã kín, tôi sẽ giao báo cáo tiếp nhận khách hàng mới cho Minh phụ trách.',
        grammarNote: "Kết hợp cùng idiom công sở 'my plate is full' (tôi đang quá tải việc).",
      },
      daily: {
        badge: 'Giao tiếp Đời thường · Việc nhà & Tổ chức tiệc',
        chunk: 'delegate the party prep',
        chunkMeaning: 'Chia bớt việc chuẩn bị tiệc cho mọi người',
        sentenceEn:
          "Don't try to cook everything yourself—delegate the dessert and drinks to the guests!",
        sentenceVi:
          'Đừng cố tự nấu hết mọi món một mình — hãy phân công phần tráng miệng và đồ uống cho khách khứa phụ một tay!',
        grammarNote: 'Dùng vui vẻ khi khuyên bạn bè đừng ôm đồm mọi việc.',
      },
    },
    practice: {
      step1Question:
        "Từ nào mang nghĩa 'phân công, giao phó đầu việc cho người khác' (động từ) hoặc 'đại biểu hội nghị' (danh từ)?",
      step1Choices: ['delegate', 'dedicate', 'demonstrate', 'designate'],
      step2TargetMeaning: 'Phân công các công việc thường nhật cho các thành viên',
      step2Words: ['delegate', 'routine', 'tasks', 'to', 'team', 'members'],
      step2Distractors: ['for', 'from'],
      step3TargetChunk: 'delegate tasks to',
      step3Template: 'A good project manager learns to delegate tasks to the right specialists.',
    },
  },
  {
    id: 'mitigate',
    word: 'mitigate',
    pos: 'Verb',
    ipa: '/ˈmɪt.ə.ɡeɪt/',
    cefr: 'C1',
    coreMeaning:
      'Giảm thiểu, làm dịu bớt mức độ nghiêm trọng của rủi ro, thiệt hại hoặc tác động tiêu cực.',
    memoryTip:
      'Luôn đi cặp với các từ chỉ rủi ro/hậu quả: mitigate risks, mitigate negative impacts.',
    srsStatus: 'learning',
    srsInterval: 'Ôn lại sau 5 ngày',
    personas: ['all', 'exam_prep', 'busy_pro'],
    contexts: {
      toeic: {
        badge: 'TOEIC Part 7 · Quản trị chuỗi cung ứng & Tài chính',
        chunk: 'mitigate supply chain disruptions',
        chunkMeaning: 'Giảm thiểu sự gián đoạn chuỗi cung ứng',
        sentenceEn:
          'Diversifying our raw material vendors will help mitigate supply chain disruptions next quarter.',
        sentenceVi:
          'Việc đa dạng hóa các nhà cung cấp nguyên liệu thô sẽ giúp giảm thiểu rủi ro đứt gãy chuỗi cung ứng trong quý tới.',
        grammarNote:
          'Xuất hiện nhiều trong các bài đọc báo cáo cổ đông hoặc thông cáo báo chí của TOEIC Part 7.',
      },
      ielts: {
        badge: 'IELTS Writing Task 2 · Environment & Policy (Band 8.0)',
        chunk: 'mitigate the adverse effects of climate change',
        chunkMeaning: 'Giảm nhẹ những tác động bất lợi của biến đổi khí hậu',
        sentenceEn:
          'Reforestation initiatives play a pivotal role in mitigating the adverse effects of climate change.',
        sentenceVi:
          'Các sáng kiến tái trồng rừng đóng vai trò then chốt trong việc làm giảm nhẹ những tác động tiêu cực của biến đổi khí hậu.',
        grammarNote: "Cụm C1 cực chuẩn để nâng cấp từ 'reduce bad effects'.",
      },
      office: {
        badge: 'Giao tiếp Công sở · Quản lý rủi ro dự án',
        chunk: 'mitigate potential risks / risk mitigation plan',
        chunkMeaning: 'Giảm thiểu rủi ro tiềm ẩn / Kế hoạch kiểm soát rủi ro',
        sentenceEn:
          "We've prepared a backup server to mitigate potential risks during tonight's system migration.",
        sentenceVi:
          'Chúng tôi đã chuẩn bị sẵn máy chủ dự phòng để giảm thiểu rủi ro tiềm ẩn trong đợt chuyển đổi hệ thống tối nay.',
        grammarNote: 'Dùng trong báo cáo kỹ thuật và quản trị dự án (Project Management).',
      },
      daily: {
        badge: 'Giao tiếp Đời thường · Sức khỏe & Đời sống',
        chunk: 'mitigate eye strain',
        chunkMeaning: 'Làm giảm tình trạng mỏi mắt',
        sentenceEn:
          'Taking a 5-minute break every hour really helps mitigate eye strain from staring at screens.',
        sentenceVi:
          'Nghỉ giải lao 5 phút sau mỗi tiếng làm việc thực sự giúp giảm mỏi mắt khi phải nhìn màn hình liên tục.',
        grammarNote: 'Dùng khi nói về mẹo sức khỏe, lối sống khoa học.',
      },
    },
    practice: {
      step1Question:
        "Động từ C1 nào mang nghĩa 'giảm nhẹ, làm dịu bớt rủi ro hoặc tác động tiêu cực'?",
      step1Choices: ['mitigate', 'migrate', 'motivate', 'manipulate'],
      step2TargetMeaning: 'Giảm nhẹ những tác động bất lợi của biến đổi khí hậu',
      step2Words: ['mitigate', 'the', 'adverse', 'effects', 'of'],
      step2Distractors: ['reasons', 'with'],
      step3TargetChunk: 'mitigate potential risks',
      step3Template: 'We need a clear backup plan to mitigate potential risks before launching.',
    },
  },
  {
    id: 'expedite',
    word: 'expedite',
    pos: 'Verb',
    ipa: '/ˈek.spə.daɪt/',
    cefr: 'C1',
    coreMeaning: 'Đẩy nhanh tiến độ, xúc tiến để một quy trình/công việc diễn ra nhanh hơn.',
    memoryTip:
      "Gốc 'ped-' (bước chân) + 'ex-' (thoát ra): gỡ vướng bước chân để chạy nhanh hơn = thúc đẩy tiến độ.",
    srsStatus: 'due',
    srsInterval: 'Đến hạn hôm nay (Chu kỳ 1 ngày)',
    personas: ['all', 'busy_pro', 'fresh_grad'],
    contexts: {
      toeic: {
        badge: 'TOEIC Part 5, 6 & 7 · Vận chuyển & Đơn hàng',
        chunk: 'expedite the shipping process / expedited delivery',
        chunkMeaning: 'Đẩy nhanh quy trình giao hàng / Giao hàng hỏa tốc',
        sentenceEn:
          'Customers may pay an additional fee to expedite the shipping process for urgent orders.',
        sentenceVi:
          'Khách hàng có thể trả thêm một khoản phí để đẩy nhanh quá trình vận chuyển đối với các đơn hàng gấp.',
        grammarNote:
          "Tính từ phân từ 'expedited shipping/delivery' (giao hàng nhanh) xuất hiện liên tục trong đề TOEIC.",
      },
      ielts: {
        badge: 'IELTS Writing Task 2 · Technology & Efficiency',
        chunk: 'expedite administrative procedures',
        chunkMeaning: 'Rút ngắn/đẩy nhanh các thủ tục hành chính',
        sentenceEn:
          'Digitalizing public records can significantly expedite administrative procedures for citizens.',
        sentenceVi:
          'Việc số hóa hồ sơ công cộng có thể đẩy nhanh đáng kể các thủ tục hành chính cho người dân.',
        grammarNote: "Từ vựng Band 7.5+ thay thế cho 'make processes faster'.",
      },
      office: {
        badge: 'Giao tiếp Công sở · Email hối thúc phê duyệt',
        chunk: 'expedite the approval process',
        chunkMeaning: 'Xúc tiến nhanh quy trình phê duyệt',
        sentenceEn:
          'Could you please help expedite the contract approval so we can onboard the vendor by Monday?',
        sentenceVi:
          'Bạn có thể hỗ trợ thúc đẩy nhanh việc duyệt hợp đồng để chúng ta kịp làm việc với nhà cung cấp vào thứ Hai không?',
        grammarNote:
          'Cách nói cực kỳ lịch sự khi muốn hối thúc phòng ban khác mà không gây khó chịu.',
      },
      daily: {
        badge: 'Giao tiếp Đời thường · Làm hộ chiếu / Visa',
        chunk: 'expedite my passport renewal',
        chunkMeaning: 'Làm thủ tục gia hạn hộ chiếu nhanh',
        sentenceEn: 'I had to pay extra to expedite my passport renewal before my trip to Tokyo.',
        sentenceVi:
          'Mình đã phải đóng thêm phí làm nhanh để kịp gia hạn hộ chiếu trước chuyến đi Tokyo.',
        grammarNote: 'Thường gặp khi làm giấy tờ, thủ tục sân bay hoặc dịch vụ công.',
      },
    },
    practice: {
      step1Question:
        "Từ nào mang nghĩa 'xúc tiến, đẩy nhanh tiến độ một quy trình hoặc đơn hàng'?",
      step1Choices: ['expedite', 'expand', 'exploit', 'exhibit'],
      step2TargetMeaning: 'Xúc tiến nhanh quy trình phê duyệt hợp đồng',
      step2Words: ['expedite', 'the', 'contract', 'approval', 'process'],
      step2Distractors: ['delay', 'for'],
      step3TargetChunk: 'expedite the process',
      step3Template:
        'Please send over the signed documents today to help us expedite the process.',
    },
  },
  {
    id: 'align',
    word: 'align',
    pos: 'Verb',
    ipa: '/əˈlaɪn/',
    cefr: 'B2',
    coreMeaning: 'Căn chỉnh cho khớp nhau; thống nhất quan điểm, mục tiêu giữa các bên.',
    memoryTip:
      "Nghĩa đen là xếp thẳng hàng (line); nghĩa bóng trong công sở là 'thống nhất cùng một hướng đi'.",
    srsStatus: 'mastered',
    srsInterval: 'Đã thuộc (Ôn lại sau 14 ngày)',
    personas: ['all', 'busy_pro', 'fresh_grad'],
    contexts: {
      toeic: {
        badge: 'TOEIC Part 6 & 7 · Chiến lược doanh nghiệp',
        chunk: 'align with corporate objectives',
        chunkMeaning: 'Phù hợp/đi đúng với các mục tiêu chung của tập đoàn',
        sentenceEn:
          'All departmental budgets must closely align with our long-term corporate objectives.',
        sentenceVi:
          'Tất cả ngân sách của các phòng ban phải bám sát các mục tiêu dài hạn của công ty.',
        grammarNote: "Chú ý cấu trúc 'align WITH something' trong bài điền từ TOEIC.",
      },
      ielts: {
        badge: 'IELTS Writing Task 2 · Education & Career',
        chunk: 'align university curricula with labor market demands',
        chunkMeaning: 'Điều chỉnh chương trình đại học khớp với nhu cầu thị trường lao động',
        sentenceEn:
          'Higher education institutions should align their curricula with evolving labor market demands.',
        sentenceVi:
          'Các trường đại học nên điều chỉnh chương trình giảng dạy sát với nhu cầu đang thay đổi của thị trường lao động.',
        grammarNote: "Cấu trúc 'align A with B' rất mạch lạc cho bài viết về giáo dục và kinh tế.",
      },
      office: {
        badge: 'Giao tiếp Công sở · Họp chốt phương án',
        chunk: 'get aligned on priorities / make sure we are aligned',
        chunkMeaning: 'Thống nhất các thứ tự ưu tiên / Đảm bảo chúng ta hiểu giống nhau',
        sentenceEn:
          "Let's hop on a 10-minute call to make sure we're aligned on the launch deliverables.",
        sentenceVi:
          'Hãy gọi nhanh 10 phút để đảm bảo chúng ta thống nhất rõ các hạng mục bàn giao cho đợt ra mắt nhé.',
        grammarNote: 'Một trong những từ được dùng nhiều nhất trong môi trường công sở quốc tế.',
      },
      daily: {
        badge: 'Giao tiếp Đời thường · Lối sống & Quan điểm',
        chunk: 'align with my personal values',
        chunkMeaning: 'Phù hợp với giá trị sống cá nhân của mình',
        sentenceEn:
          "I turned down the job offer because the company culture didn't align with my personal values.",
        sentenceVi:
          'Mình đã từ chối lời mời làm việc đó vì văn hóa công ty không phù hợp với giá trị sống của mình.',
        grammarNote: 'Rất hay dùng trong IELTS Speaking khi kể về quyết định cá nhân.',
      },
    },
    practice: {
      step1Question:
        "Động từ nào đi kèm với 'with' mang nghĩa 'thống nhất quan điểm hoặc điều chỉnh cho khớp với mục tiêu'?",
      step1Choices: ['align', 'assign', 'alter', 'assure'],
      step2TargetMeaning: 'Đảm bảo chúng ta thống nhất về các mục tiêu ưu tiên',
      step2Words: ['make', 'sure', 'we', 'are', 'aligned', 'on'],
      step2Distractors: ['with', 'to'],
      step3TargetChunk: 'align with our goals',
      step3Template: 'This new feature does not really align with our Q4 goals.',
    },
  },
  {
    id: 'feasible',
    word: 'feasible',
    pos: 'Adjective',
    ipa: '/ˈfiː.zə.bəl/',
    cefr: 'B2–C1',
    coreMeaning:
      'Khả thi, có thể thực hiện được trên thực tế (về thời gian, chi phí, nguồn lực).',
    memoryTip:
      "Danh từ là 'feasibility' (tính khả thi — hay gặp trong 'feasibility study': nghiên cứu tiền khả thi).",
    srsStatus: 'mastered',
    srsInterval: 'Đã thuộc (Ôn lại sau 14 ngày)',
    personas: ['all', 'exam_prep', 'busy_pro'],
    contexts: {
      toeic: {
        badge: 'TOEIC Part 5 & 7 · Đánh giá dự án',
        chunk: 'conduct a feasibility study / economically feasible',
        chunkMeaning: 'Tiến hành nghiên cứu tính khả thi / Khả thi về mặt kinh tế',
        sentenceEn:
          'The board will conduct a thorough feasibility study before approving the new factory site.',
        sentenceVi:
          'Hội đồng quản trị sẽ tiến hành nghiên cứu tính khả thi kỹ lưỡng trước khi phê duyệt địa điểm xây nhà máy mới.',
        grammarNote:
          "Cụm danh từ ghép 'feasibility study' là cụm cố định rất hay ra trong TOEIC.",
      },
      ielts: {
        badge: 'IELTS Writing Task 2 · Đánh giá giải pháp',
        chunk: 'a financially feasible alternative',
        chunkMeaning: 'Một giải pháp thay thế khả thi về mặt tài chính',
        sentenceEn:
          'Solar power has become a financially feasible alternative to fossil fuels in many developing nations.',
        sentenceVi:
          'Năng lượng mặt trời đã trở thành một giải pháp thay thế khả thi về mặt tài chính cho nhiên liệu hóa thạch ở nhiều nước đang phát triển.',
        grammarNote:
          "Kết hợp trạng từ + tính từ ('financially/economically/practically feasible') giúp tăng điểm Lexical Resource.",
      },
      office: {
        badge: 'Giao tiếp Công sở · Phản biện deadline & nguồn lực',
        chunk: 'Is it feasible to deliver by Friday?',
        chunkMeaning: 'Liệu có khả thi để bàn giao trước thứ Sáu không?',
        sentenceEn:
          'Given our current engineering bandwidth, is it feasible to roll out this update by Friday?',
        sentenceVi:
          'Xét theo nguồn lực kỹ thuật hiện tại của nhóm, liệu việc tung ra bản cập nhật này trước thứ Sáu có khả thi không?',
        grammarNote:
          'Cách đặt câu hỏi chuyên nghiệp khi muốn đánh giá xem deadline có thực tế hay không.',
      },
      daily: {
        badge: 'Giao tiếp Đời thường · Lên kế hoạch cá nhân',
        chunk: 'not really feasible right now',
        chunkMeaning: 'Chưa thực sự khả thi vào lúc này',
        sentenceEn:
          "Buying a car isn't really feasible for me right now since I'm saving up for grad school.",
        sentenceVi:
          'Mua xe hơi lúc này chưa thực sự khả thi với mình vì mình đang tiết kiệm tiền học cao học.',
        grammarNote: 'Tự nhiên, gọn gàng khi nói về kế hoạch tài chính cá nhân.',
      },
    },
    practice: {
      step1Question: "Tính từ nào mang nghĩa 'khả thi, thực tế có thể làm được'?",
      step1Choices: ['feasible', 'flexible', 'fragile', 'favorable'],
      step2TargetMeaning: 'Một giải pháp thay thế khả thi về mặt tài chính',
      step2Words: ['a', 'financially', 'feasible', 'alternative'],
      step2Distractors: ['feasibility', 'optionally'],
      step3TargetChunk: 'is it feasible to',
      step3Template:
        'Is it feasible to complete the user testing phase before next Wednesday?',
    },
  },
  {
    id: 'bottleneck',
    word: 'bottleneck',
    pos: 'Noun',
    ipa: '/ˈbɑː.təl.nek/',
    cefr: 'B2–C1',
    coreMeaning: 'Điểm nghẽn, nút thắt cổ chai làm chậm toàn bộ quy trình hoặc giao thông.',
    memoryTip:
      'Hãy tưởng tượng cổ chai nước hẹp làm nước chảy ra chậm lại — đó chính là điểm làm tắc nghẽn tiến độ công việc.',
    srsStatus: 'learning',
    srsInterval: 'Ôn lại sau 4 ngày',
    personas: ['all', 'busy_pro', 'fresh_grad'],
    contexts: {
      toeic: {
        badge: 'TOEIC Part 7 · Sản xuất & Logistics',
        chunk: 'eliminate production bottlenecks',
        chunkMeaning: 'Loại bỏ các điểm nghẽn trong dây chuyền sản xuất',
        sentenceEn:
          'Installing automated sorting machines helped the plant eliminate major production bottlenecks.',
        sentenceVi:
          'Việc lắp đặt hệ thống máy phân loại tự động đã giúp nhà máy loại bỏ các điểm nghẽn lớn trong sản xuất.',
        grammarNote:
          'Thường đi cùng các động từ: identify, create, relieve, hoặc eliminate a bottleneck.',
      },
      ielts: {
        badge: 'IELTS Writing Task 1 & 2 · Giao thông & Kinh tế',
        chunk: 'create severe traffic bottlenecks',
        chunkMeaning: 'Gây ra các điểm ùn tắc giao thông nghiêm trọng',
        sentenceEn:
          'Inadequate highway interchanges often create severe traffic bottlenecks during peak commuting hours.',
        sentenceVi:
          'Các nút giao cao tốc bất cập thường tạo ra những điểm ùn tắc giao thông nghiêm trọng vào giờ cao điểm.',
        grammarNote:
          'Từ vựng hình ảnh rất hay để miêu tả bản đồ (Map) hoặc bài luận về giao thông.',
      },
      office: {
        badge: 'Giao tiếp Công sở · Báo cáo tiến độ (Daily Standup)',
        chunk: 'identify the main bottleneck',
        chunkMeaning: 'Xác định nút thắt đang làm chậm tiến độ',
        sentenceEn:
          'Right now, legal review is the main bottleneck holding up our partnership launch.',
        sentenceVi:
          'Hiện tại, khâu duyệt pháp lý đang là nút thắt chính làm chậm đợt ra mắt hợp tác của chúng ta.',
        grammarNote:
          'Từ khóa cực kỳ thông dụng trong các buổi họp Agile/Scrum hoặc báo cáo dự án.',
      },
      daily: {
        badge: 'Giao tiếp Đời thường · Đi đường',
        chunk: 'stuck in a bottleneck near the bridge',
        chunkMeaning: 'Kẹt cứng ở đoạn thắt cổ chai gần cầu',
        sentenceEn:
          "I'll be 10 minutes late—traffic is stuck in a huge bottleneck right before the bridge.",
        sentenceVi:
          'Mình tới trễ 10 phút nhé — xe cộ đang kẹt cứng ở đoạn nút thắt ngay trước đầu cầu.',
        grammarNote: 'Dùng để nhắn tin báo trễ vì kẹt xe rất sinh động.',
      },
    },
    practice: {
      step1Question:
        "Danh từ nào dùng hình ảnh 'cổ chai' để chỉ điểm nghẽn làm đình trệ cả quy trình?",
      step1Choices: ['bottleneck', 'breakthrough', 'benchmark', 'backlash'],
      step2TargetMeaning: 'Xác định điểm nghẽn chính trong quy trình',
      step2Words: ['identify', 'the', 'main', 'bottleneck', 'in'],
      step2Distractors: ['on', 'bottle'],
      step3TargetChunk: 'main bottleneck',
      step3Template:
        'Waiting for design approval is currently the main bottleneck for our team.',
    },
  },
  {
    id: 'TouchBase',
    word: 'follow up / touch base',
    pos: 'Phrasal Chunk',
    ipa: '/ˈfɑː.loʊ ʌp/ · /tʌtʃ beɪs/',
    cefr: 'B2',
    coreMeaning:
      'Liên hệ lại để cập nhật tình hình, nhắc nhở khéo hoặc kiểm tra tiến độ sau cuộc trao đổi trước.',
    memoryTip:
      "'Follow up' chuẩn mực cho mọi email; 'Touch base' thân thiện khi muốn hỏi thăm nhanh tiến độ đồng nghiệp.",
    srsStatus: 'mastered',
    srsInterval: 'Đã thuộc (Ôn lại sau 14 ngày)',
    personas: ['all', 'busy_pro', 'fresh_grad'],
    contexts: {
      toeic: {
        badge: 'TOEIC Part 3 & 7 · Email Chăm sóc khách hàng',
        chunk: 'follow up on your recent inquiry',
        chunkMeaning: 'Phản hồi/cập nhật tiếp về yêu cầu gần đây của bạn',
        sentenceEn:
          'I am writing to follow up on your recent inquiry regarding our enterprise software license.',
        sentenceVi:
          'Tôi viết thư này để trao đổi tiếp về yêu cầu gần đây của quý khách liên quan đến bản quyền phần mềm doanh nghiệp.',
        grammarNote:
          'Câu mở đầu kinh điển trong hầu hết các bức thư thương mại TOEIC Part 7.',
      },
      ielts: {
        badge: 'IELTS Speaking Part 2 & General Training Writing',
        chunk: 'conduct a follow-up evaluation',
        chunkMeaning: 'Thực hiện đánh giá theo dõi sau đó',
        sentenceEn:
          'Researchers conducted a follow-up study six months later to measure long-term retention.',
        sentenceVi:
          'Các nhà nghiên cứu đã thực hiện một cuộc khảo sát theo dõi 6 tháng sau đó để đo lường khả năng ghi nhớ dài hạn.',
        grammarNote:
          "Khi có gạch nối 'a follow-up study/evaluation', nó đóng vai trò cụm danh từ rất học thuật.",
      },
      office: {
        badge: 'Giao tiếp Công sở · Email nhắc việc khéo léo',
        chunk: 'just following up on / touch base regarding',
        chunkMeaning: 'Nhắn hỏi thăm tiến độ về... / Liên hệ nhanh để cập nhật...',
        sentenceEn:
          'Hi Alex, just following up on the invoice I sent last Tuesday—please let me know if you need any further details.',
        sentenceVi:
          'Chào Alex, mình nhắn để hỏi thăm tiến độ hóa đơn gửi hôm thứ Ba tuần trước — cần thêm thông tin gì cứ báo mình nhé.',
        grammarNote: "Mẫu câu 'cứu cánh' mỗi khi cần nhắc sếp hoặc đối tác trả lời email.",
      },
      daily: {
        badge: 'Giao tiếp Đời thường · Hẹn hò bạn bè',
        chunk: "let's touch base on Friday",
        chunkMeaning: 'Thứ Sáu nhắn lại chốt nhé',
        sentenceEn:
          "Let's touch base on Friday morning to confirm what time we're heading to the beach.",
        sentenceVi:
          'Sáng thứ Sáu tụi mình nhắn lại để chốt mấy giờ xuất phát đi biển nhé.',
        grammarNote: 'Cực kỳ tự nhiên khi hẹn lịch đi chơi với bạn bè.',
      },
    },
    practice: {
      step1Question:
        "Cụm động từ nào mang nghĩa 'liên hệ lại để hỏi thăm tiến độ hoặc tiếp nối cuộc trò chuyện trước đó'?",
      step1Choices: ['follow up on', 'fall behind on', 'figure out', 'fill in for'],
      step2TargetMeaning: 'Nhắn để hỏi thăm tiến độ về bản đề xuất',
      step2Words: ['following', 'up', 'on', 'the', 'proposal'],
      step2Distractors: ['with', 'about'],
      step3TargetChunk: 'following up on',
      step3Template: 'I am just following up on the contract draft we discussed yesterday.',
    },
  },
];

export const INITIAL_PHRASEBOOK_DATA: PhrasebookItem[] = [
  {
    id: 'pb1',
    category: 'email',
    catLabel: 'Email & Slack',
    situation: 'Hối thúc đối tác/đồng nghiệp phản hồi email một cách lịch sự',
    keyChunk: 'following up on / circling back to',
    sentenceEn:
      "Hi Sarah, I'm just following up on my previous email regarding the Q4 marketing budget—please let me know if you've had a chance to review it.",
    sentenceVi:
      'Chào Sarah, mình nhắn để hỏi thăm về email trước đó liên quan đến ngân sách Marketing Quý 4 — cho mình biết nếu bạn đã kịp xem qua nhé.',
    tone: 'Lịch sự · Không gây áp lực',
    saved: true,
  },
  {
    id: 'pb2',
    category: 'negotiation',
    catLabel: 'Xin lùi Deadline',
    situation: 'Xin gia hạn thêm thời gian bàn giao nhưng vẫn giữ uy tín',
    keyChunk: 'push back the deadline / ensure top quality',
    sentenceEn:
      'To ensure we deliver accurate data analysis, would it be feasible to push back the submission deadline to Thursday at 2 PM?',
    sentenceVi:
      'Để đảm bảo cung cấp bản phân tích dữ liệu chính xác nhất, liệu chúng ta có thể dời hạn nộp sang 2 giờ chiều thứ Năm được không?',
    tone: 'Chuyên nghiệp · Có lý do thuyết phục',
    saved: true,
  },
  {
    id: 'pb3',
    category: 'meeting',
    catLabel: 'Họp & Thuyết trình',
    situation: 'Muốn ngắt lời lịch sự hoặc bổ sung ý kiến trong cuộc họp',
    keyChunk: 'jump in here / add to that point',
    sentenceEn:
      "Sorry to jump in here, David, but I'd love to briefly add to that point from a customer support perspective.",
    sentenceVi:
      'Xin lỗi vì ngắt lời một chút nhé David, nhưng mình muốn bổ sung ngắn gọn vào ý đó từ góc nhìn của bộ phận hỗ trợ khách hàng.',
    tone: 'Tự nhiên · Tôn trọng người nói',
    saved: false,
  },
  {
    id: 'pb4',
    category: 'meeting',
    catLabel: 'Họp & Thuyết trình',
    situation: 'Kéo cuộc họp quay lại chủ đề chính khi mọi người bàn lan man',
    keyChunk: 'get back on track / table this discussion',
    sentenceEn:
      "That's an important detail, but in the interest of time, let's table that discussion for now and get back on track with our main agenda.",
    sentenceVi:
      'Đó là một chi tiết quan trọng, nhưng để đảm bảo thời gian, chúng ta hãy tạm gác phần đó lại và quay về nội dung chính của buổi họp nhé.',
    tone: 'Điều phối cuộc họp · Quyết đoán',
    saved: false,
  },
  {
    id: 'pb5',
    category: 'negotiation',
    catLabel: 'Từ chối khéo',
    situation: 'Từ chối nhận thêm việc khi đang quá tải mà vẫn thiện chí',
    keyChunk: 'at full capacity / prioritize current deliverables',
    sentenceEn:
      "I'd love to help out, but I'm currently at full capacity with the app release. Could we revisit this early next week?",
    sentenceVi:
      'Mình rất muốn hỗ trợ, nhưng hiện tại mình đang kín lịch với đợt ra mắt ứng dụng. Đầu tuần sau chúng ta trao đổi lại việc này được không?',
    tone: 'Khéo léo · Bảo vệ thời gian cá nhân',
    saved: false,
  },
  {
    id: 'pb6',
    category: 'email',
    catLabel: 'Email & Slack',
    situation: 'Báo lỗi hoặc thông báo tin chưa tốt cho khách hàng',
    keyChunk: 'encountered an unexpected bottleneck / working around the clock',
    sentenceEn:
      'We encountered an unexpected bottleneck during server testing, but our engineers are working around the clock to resolve it by 5 PM.',
    sentenceVi:
      'Chúng tôi gặp một điểm nghẽn ngoài dự kiến khi kiểm thử máy chủ, nhưng đội kỹ sư đang làm việc hết công suất để khắc phục trước 5 giờ chiều.',
    tone: 'Chủ động nhận trách nhiệm · Đưa giải pháp',
    saved: false,
  },
];

export const POSTGRESQL_SCHEMA_CODE = `CREATE TYPE context_domain AS ENUM ('toeic', 'ielts', 'office', 'daily');

-- 1. Bảng Từ gốc (Tầng 1)
CREATE TABLE words (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lemma VARCHAR(100) NOT NULL UNIQUE,
  pos VARCHAR(30) NOT NULL, -- verb, noun, adj...
  ipa_us VARCHAR(100),
  core_meaning_vi TEXT NOT NULL,
  memory_tip TEXT,
  cefr_level VARCHAR(5) DEFAULT 'B2'
);

-- 2. Bảng Cụm từ / Collocations (Tầng 2)
CREATE TABLE word_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  word_id UUID NOT NULL REFERENCES words(id) ON DELETE CASCADE,
  chunk_text VARCHAR(255) NOT NULL,
  grammar_pattern VARCHAR(120),
  meaning_vi TEXT NOT NULL,
  domain context_domain NOT NULL
);

-- 3. Bảng Câu hoàn chỉnh theo ngữ cảnh (Tầng 3)
CREATE TABLE context_sentences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chunk_id UUID NOT NULL REFERENCES word_chunks(id) ON DELETE CASCADE,
  domain context_domain NOT NULL,
  situation_label VARCHAR(120), -- VD: Email xin lùi deadline, IELTS Task 2
  sentence_en TEXT NOT NULL,
  sentence_vi TEXT NOT NULL,
  tone_badge VARCHAR(60) -- VD: Formal Business / Band 7.5+
);

-- 4. Bảng Tiến độ Lặp lại ngắt quãng (SRS SM-2)
CREATE TABLE user_srs_progress (
  user_id UUID NOT NULL,
  word_id UUID NOT NULL REFERENCES words(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'due', -- due, learning, mastered
  interval_days INT DEFAULT 1,
  easiness_factor NUMERIC(3,2) DEFAULT 2.50,
  next_review_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, word_id)
);`;

export const JSON_PAYLOAD_EXAMPLE = `{
  "lemma": "accommodate",
  "pos": "Verb",
  "ipa": "/əˈkɑː.mə.deɪt/",
  "cefr": "B2-C1",
  "coreMeaning": "Đáp ứng, điều chỉnh để phù hợp, thu xếp chỗ ở/nhu cầu",
  "tiers": {
    "chunks": [
      {
        "domain": "toeic",
        "chunk": "accommodate special requests",
        "meaning": "đáp ứng các yêu cầu đặc biệt của khách hàng"
      },
      {
        "domain": "office",
        "chunk": "accommodate your schedule",
        "meaning": "linh hoạt điều chỉnh theo lịch trình của bạn"
      },
      {
        "domain": "ielts",
        "chunk": "accommodate the growing demand for",
        "meaning": "đáp ứng nhu cầu ngày càng tăng đối với..."
      }
    ],
    "sentences": [
      {
        "domain": "office",
        "situation": "Họp & Đặt lịch hẹn với đối tác",
        "en": "We can move Friday's call to 3 PM to accommodate your schedule.",
        "vi": "Chúng tôi có thể dời cuộc gọi thứ Sáu sang 3 giờ chiều để khớp với lịch của bạn."
      }
    ]
  }
}`;
