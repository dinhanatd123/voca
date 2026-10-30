import { VocabItem } from '../types';

export const OXFORD_AUDIO_MAP: Record<
  string,
  { audioUk: string; audioUs: string; oxfordUrl: string }
> = {
  accommodate: {
    audioUk:
      'https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/a/acc/accom/accommodate__gb_1.mp3',
    audioUs:
      'https://www.oxfordlearnersdictionaries.com/media/english/us_pron/a/acc/accom/accommodate__us_1.mp3',
    oxfordUrl:
      'https://www.oxfordlearnersdictionaries.com/definition/english/accommodate',
  },
  address: {
    audioUk:
      'https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/a/add/addre/address__gb_3.mp3',
    audioUs:
      'https://www.oxfordlearnersdictionaries.com/media/english/us_pron/a/add/addre/address__us_2_rr.mp3',
    oxfordUrl:
      'https://www.oxfordlearnersdictionaries.com/definition/english/address_2',
  },
  elaborate: {
    audioUk:
      'https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/e/ela/elabo/elaborate__gb_1.mp3',
    audioUs:
      'https://www.oxfordlearnersdictionaries.com/media/english/us_pron/e/ela/elabo/elaborate__us_2_rr.mp3',
    oxfordUrl:
      'https://www.oxfordlearnersdictionaries.com/definition/english/elaborate_2',
  },
  delegate: {
    audioUk:
      'https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/d/del/deleg/delegate__gb_1.mp3',
    audioUs:
      'https://www.oxfordlearnersdictionaries.com/media/english/us_pron/d/del/deleg/delegate__us_1.mp3',
    oxfordUrl:
      'https://www.oxfordlearnersdictionaries.com/definition/english/delegate_2',
  },
  mitigate: {
    audioUk:
      'https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/m/mit/mitig/mitigate__gb_1.mp3',
    audioUs:
      'https://www.oxfordlearnersdictionaries.com/media/english/us_pron/m/mit/mitig/mitigate__us_1.mp3',
    oxfordUrl:
      'https://www.oxfordlearnersdictionaries.com/definition/english/mitigate',
  },
  expedite: {
    audioUk:
      'https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/e/exp/exped/expedite__gb_1.mp3',
    audioUs:
      'https://www.oxfordlearnersdictionaries.com/media/english/us_pron/e/exp/exped/expedite__us_1.mp3',
    oxfordUrl:
      'https://www.oxfordlearnersdictionaries.com/definition/english/expedite',
  },
  feasible: {
    audioUk:
      'https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/f/fea/feasi/feasible__gb_1.mp3',
    audioUs:
      'https://www.oxfordlearnersdictionaries.com/media/english/us_pron/f/fea/feasi/feasible__us_1.mp3',
    oxfordUrl:
      'https://www.oxfordlearnersdictionaries.com/definition/english/feasible',
  },
  align: {
    audioUk:
      'https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/a/ali/align/align__gb_1.mp3',
    audioUs:
      'https://www.oxfordlearnersdictionaries.com/media/english/us_pron/a/ali/align/align__us_1.mp3',
    oxfordUrl:
      'https://www.oxfordlearnersdictionaries.com/definition/english/align',
  },
  bottleneck: {
    audioUk:
      'https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/b/bot/bottl/bottleneck__gb_1.mp3',
    audioUs:
      'https://www.oxfordlearnersdictionaries.com/media/english/us_pron/b/bot/bottl/bottleneck__us_1.mp3',
    oxfordUrl:
      'https://www.oxfordlearnersdictionaries.com/definition/english/bottleneck',
  },
  'follow-up': {
    audioUk:
      'https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/f/fol/follo/follow_up_1_gb_1.mp3',
    audioUs:
      'https://www.oxfordlearnersdictionaries.com/media/english/us_pron/f/fol/follo/follow_up_1_us_1.mp3',
    oxfordUrl:
      'https://www.oxfordlearnersdictionaries.com/definition/english/follow-up_1',
  },
};

interface OxfordSeed {
  id: string;
  word: string;
  ipaUk: string;
  ipaUs: string;
  audioUk: string;
  audioUs: string;
  pos: string;
  cefr: string;
  srsStatus: 'review' | 'learning' | 'mastered';
  meaningVi: string;
  meaningEn: string;
  trapTip: string;
  family: string[];
  toeicChunk: string;
  toeicVi: string;
  toeicSentence: string;
  toeicSentenceVi: string;
  ieltsChunk: string;
  ieltsVi: string;
  ieltsSentence: string;
  ieltsSentenceVi: string;
  workChunk: string;
  workVi: string;
  workSentence: string;
  workSentenceVi: string;
  dailyChunk: string;
  dailyVi: string;
  dailySentence: string;
  dailySentenceVi: string;
}

const SEEDS: OxfordSeed[] = [
  {
    id: 'allocate',
    word: 'allocate',
    ipaUk: '/ˈæləkeɪt/',
    ipaUs: '/ˈæləkeɪt/',
    audioUk:
      'https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/a/all/alloc/allocate__gb_1.mp3',
    audioUs:
      'https://www.oxfordlearnersdictionaries.com/media/english/us_pron/a/all/alloc/allocate__us_1.mp3',
    pos: 'Verb',
    cefr: 'B2-C1',
    srsStatus: 'review',
    meaningVi: 'Phân bổ, cấp phát (ngân sách, nguồn lực, thời gian) cho mục đích cụ thể.',
    meaningEn:
      'To give something officially to somebody/something for a particular purpose (Oxford 3000).',
    trapTip:
      "Cấu trúc chuẩn Oxford: 'allocate something TO somebody/something' hoặc 'allocate something FOR something' (ví dụ: allocate funds to research).",
    family: ['allocation (n)', 'allocated (adj)', 'distribute / assign (syn)'],
    toeicChunk: 'allocate funds to marketing campaigns',
    toeicVi: 'phân bổ ngân sách cho các chiến dịch tiếp thị',
    toeicSentence:
      'The board decided to allocate additional funds to marketing campaigns in the Asia-Pacific region.',
    toeicSentenceVi:
      'Hội đồng quản trị đã quyết định phân bổ thêm ngân sách cho các chiến dịch tiếp thị tại khu vực Châu Á - Thái Bình Dương.',
    ieltsChunk: 'allocate a larger proportion of national budgets to education',
    ieltsVi: 'phân bổ tỷ trọng ngân sách quốc gia lớn hơn cho giáo dục',
    ieltsSentence:
      'Governments should allocate a larger proportion of national budgets to primary education and preventive healthcare.',
    ieltsSentenceVi:
      'Chính phủ nên phân bổ tỷ trọng ngân sách quốc gia lớn hơn cho giáo dục tiểu học và y tế dự phòng.',
    workChunk: 'allocate resources across Q3 priorities',
    workVi: 'phân bổ nguồn lực cho các ưu tiên Quý 3',
    workSentence:
      'Let’s review the roadmap so we can effectively allocate engineering resources across Q3 priorities.',
    workSentenceVi:
      'Hãy rà soát lại lộ trình để chúng ta có thể phân bổ hiệu quả nguồn lực kỹ thuật cho các ưu tiên Quý 3.',
    dailyChunk: 'allocate enough time for rest',
    dailyVi: 'dành đủ thời gian để nghỉ ngơi',
    dailySentence:
      'Even during exam week, make sure you allocate enough time for sleep and exercise.',
    dailySentenceVi:
      'Ngay cả trong tuần thi cử, hãy đảm bảo bạn dành đủ thời gian cho giấc ngủ và tập thể dục.',
  },
  {
    id: 'collaborate',
    word: 'collaborate',
    ipaUk: '/kəˈlæbəreɪt/',
    ipaUs: '/kəˈlæbəreɪt/',
    audioUk:
      'https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/c/col/colla/collaborate__gb_2.mp3',
    audioUs:
      'https://www.oxfordlearnersdictionaries.com/media/english/us_pron/c/col/colla/collaborate__us_1.mp3',
    pos: 'Verb',
    cefr: 'B2',
    srsStatus: 'learning',
    meaningVi: 'Hợp tác, cộng tác chặt chẽ với người khác để tạo ra kết quả chung.',
    meaningEn:
      'To work together with somebody in order to produce or achieve something (Oxford 5000).',
    trapTip:
      "Giới từ chuẩn: 'collaborate WITH somebody ON something' (cộng tác với ai về dự án gì). Đừng nhầm giới từ!",
    family: ['collaboration (n)', 'collaborative (adj)', 'cooperate / team up (syn)'],
    toeicChunk: 'collaborate with international partners on product design',
    toeicVi: 'hợp tác với các đối tác quốc tế về thiết kế sản phẩm',
    toeicSentence:
      'Our R&D division will collaborate with international partners on next-generation battery design.',
    toeicSentenceVi:
      'Bộ phận R&D của chúng tôi sẽ hợp tác với các đối tác quốc tế về thiết kế pin thế hệ mới.',
    ieltsChunk: 'collaborate globally to combat cybercrime',
    ieltsVi: 'hợp tác toàn cầu để chống tội phạm mạng',
    ieltsSentence:
      'Law enforcement agencies must collaborate globally to combat increasingly sophisticated cybercrime.',
    ieltsSentenceVi:
      'Các cơ quan thực thi pháp luật phải hợp tác toàn cầu để chống lại tội phạm mạng ngày càng tinh vi.',
    workChunk: 'collaborate closely across departments',
    workVi: 'phối hợp chặt chẽ liên phòng ban',
    workSentence:
      'Design and frontend teams need to collaborate closely across departments to deliver the new UI on time.',
    workSentenceVi:
      'Đội thiết kế và frontend cần phối hợp chặt chẽ liên phòng ban để bàn giao giao diện mới đúng hạn.',
    dailyChunk: 'collaborate on a group presentation',
    dailyVi: 'cùng làm chung một bài thuyết trình nhóm',
    dailySentence:
      'We used Google Docs to collaborate on our group presentation over the weekend.',
    dailySentenceVi:
      'Chúng mình đã dùng Google Docs để cùng làm bài thuyết trình nhóm vào cuối tuần.',
  },
  {
    id: 'commence',
    word: 'commence',
    ipaUk: '/kəˈmens/',
    ipaUs: '/kəˈmens/',
    audioUk:
      'https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/c/com/comme/commence__gb_2.mp3',
    audioUs:
      'https://www.oxfordlearnersdictionaries.com/media/english/us_pron/c/com/comme/commence__us_1.mp3',
    pos: 'Verb',
    cefr: 'C1',
    srsStatus: 'review',
    meaningVi: 'Bắt đầu, khởi công, khai mạc (trang trọng hơn start/begin).',
    meaningEn: 'To begin to happen; to begin something formally (Oxford 5000).',
    trapTip:
      "Từ cực kỳ hay gặp trong thông báo TOEIC Part 4/7 ('construction will commence on Monday'). Đi sau là Danh từ hoặc V-ing (commence operations / commence boarding).",
    family: ['commencement (n)', 'initiate / launch (syn)', 'conclude (ant)'],
    toeicChunk: 'commence construction on the new terminal',
    toeicVi: 'khởi công xây dựng nhà ga mới',
    toeicSentence:
      'The airport authority announced that it will commence construction on the new terminal next month.',
    toeicSentenceVi:
      'Ban quản lý sân bay thông báo sẽ khởi công xây dựng nhà ga mới vào tháng tới.',
    ieltsChunk: 'commence formal negotiations on trade tariffs',
    ieltsVi: 'bắt đầu các cuộc đàm phán chính thức về thuế quan thương mại',
    ieltsSentence:
      'Both nations agreed to commence formal negotiations on bilateral trade tariffs in Geneva.',
    ieltsSentenceVi:
      'Hai quốc gia đã đồng ý bắt đầu các cuộc đàm phán chính thức về thuế quan thương mại song phương tại Geneva.',
    workChunk: 'commence the onboarding process',
    workVi: 'bắt đầu quy trình hội nhập nhân sự mới',
    workSentence:
      'Once the contract is signed, HR will commence the onboarding process for the new hires.',
    workSentenceVi:
      'Ngay khi hợp đồng được ký, bộ phận Nhân sự sẽ bắt đầu quy trình hội nhập cho nhân viên mới.',
    dailyChunk: 'boarding will commence shortly',
    dailyVi: 'việc lên máy bay sẽ bắt đầu ngay sau đây',
    dailySentence:
      'Attention passengers, boarding for flight VN123 will commence shortly at Gate 5.',
    dailySentenceVi:
      'Xin hành khách lưu ý, việc lên máy bay cho chuyến bay VN123 sẽ bắt đầu ngay sau đây tại Cổng số 5.',
  },
  {
    id: 'comply',
    word: 'comply',
    ipaUk: '/kəmˈplaɪ/',
    ipaUs: '/kəmˈplaɪ/',
    audioUk:
      'https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/c/com/compl/comply__gb_1.mp3',
    usMp3:
      'https://www.oxfordlearnersdictionaries.com/media/english/us_pron/c/com/compl/comply__us_1.mp3',
    audioUs:
      'https://www.oxfordlearnersdictionaries.com/media/english/us_pron/c/com/compl/comply__us_1.mp3',
    pos: 'Verb',
    cefr: 'C1',
    srsStatus: 'mastered',
    meaningVi: 'Tuân thủ, chấp hành (quy định, luật lệ, tiêu chuẩn an toàn).',
    meaningEn:
      'To obey a rule, an order, etc.; to meet particular standards (Oxford 5000).',
    trapTip:
      "Bẫy giới từ số 1 trong TOEIC Part 5: Luôn luôn là 'comply WITH' (tuân thủ cái gì) và danh từ 'in compliance WITH'.",
    family: ['compliance (n)', 'compliant (adj)', 'adhere to / abide by (syn)'],
    toeicChunk: 'comply strictly with safety regulations',
    toeicVi: 'tuân thủ nghiêm ngặt các quy định an toàn',
    toeicSentence:
      'All factory personnel must comply strictly with safety regulations while operating heavy machinery.',
    toeicSentenceVi:
      'Tất cả nhân viên nhà máy phải tuân thủ nghiêm ngặt các quy định an toàn khi vận hành máy móc hạng nặng.',
    ieltsChunk: 'fail to comply with environmental standards',
    ieltsVi: 'không tuân thủ các tiêu chuẩn môi trường',
    ieltsSentence:
      'Corporations that fail to comply with environmental standards should face severe financial penalties.',
    ieltsSentenceVi:
      'Các tập đoàn không tuân thủ tiêu chuẩn môi trường cần phải chịu mức phạt tài chính nghiêm khắc.',
    workChunk: 'comply with GDPR data privacy policies',
    workVi: 'tuân thủ chính sách bảo mật dữ liệu GDPR',
    workSentence:
      'We updated our user consent flow to ensure we fully comply with GDPR data privacy policies.',
    workSentenceVi:
      'Chúng tôi đã cập nhật luồng xin phép người dùng để đảm bảo tuân thủ đầy đủ chính sách bảo mật dữ liệu GDPR.',
    dailyChunk: 'comply with the building rules',
    dailyVi: 'chấp hành nội quy tòa nhà',
    dailySentence:
      'Residents are kindly asked to comply with the building rules regarding quiet hours after 10 PM.',
    dailySentenceVi:
      'Cư dân được đề nghị vui lòng chấp hành nội quy tòa nhà về giờ giữ yên lặng sau 10 giờ tối.',
  },
  {
    id: 'consolidate',
    word: 'consolidate',
    ipaUk: '/kənˈsɒlɪdeɪt/',
    ipaUs: '/kənˈsɑːlɪdeɪt/',
    audioUk:
      'https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/x/xco/xcons/xconsolidate__gb_1.mp3',
    audioUs:
      'https://www.oxfordlearnersdictionaries.com/media/english/us_pron/x/xco/xcons/xconsolidate__us_1.mp3',
    pos: 'Verb',
    cefr: 'C1',
    srsStatus: 'review',
    meaningVi: 'Củng cố (vị thế, kiến thức) hoặc hợp nhất, gom chung (báo cáo, dữ liệu).',
    meaningEn:
      'To make a position of power or success stronger; or to combine several things into one (Oxford 5000).',
    trapTip:
      "Trong công sở, 'consolidate feedback / consolidate spreadsheets' có nghĩa là gom nhiều bản lẻ thành 1 file tổng hợp duy nhất.",
    family: ['consolidation (n)', 'consolidated (adj)', 'strengthen / merge (syn)'],
    toeicChunk: 'consolidate its position as market leader',
    toeicVi: 'củng cố vị thế dẫn đầu thị trường',
    toeicSentence:
      'The merger will allow the company to consolidate its position as the market leader in cloud logistics.',
    toeicSentenceVi:
      'Thương vụ sáp nhập sẽ giúp công ty củng cố vị thế dẫn đầu thị trường trong lĩnh vực hậu cần đám mây.',
    ieltsChunk: 'consolidate newly acquired knowledge through practice',
    ieltsVi: 'củng cố kiến thức mới tiếp thu thông qua thực hành',
    ieltsSentence:
      'Interactive assignments enable students to consolidate newly acquired knowledge through practical application.',
    ieltsSentenceVi:
      'Các bài tập tương tác giúp học sinh củng cố kiến thức mới tiếp thu thông qua ứng dụng thực tế.',
    workChunk: 'consolidate all feedback into a single document',
    workVi: 'tổng hợp mọi ý kiến phản hồi vào một tài liệu duy nhất',
    workSentence:
      'Could you consolidate all stakeholder feedback into a single document before tomorrow’s review?',
    workSentenceVi:
      'Bạn có thể tổng hợp tất cả phản hồi của các bên liên quan vào một tài liệu duy nhất trước buổi rà soát ngày mai không?',
    dailyChunk: 'consolidate small loans into one payment',
    dailyVi: 'gom các khoản vay nhỏ thành một khoản thanh toán',
    dailySentence:
      'He decided to consolidate his credit card balances into one monthly payment with a lower interest rate.',
    dailySentenceVi:
      'Anh ấy quyết định gom các khoản dư nợ thẻ tín dụng thành một khoản thanh toán hàng tháng với lãi suất thấp hơn.',
  },
  {
    id: 'cultivate',
    word: 'cultivate',
    ipaUk: '/ˈkʌltɪveɪt/',
    ipaUs: '/ˈkʌltɪveɪt/',
    audioUk:
      'https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/c/cul/culti/cultivate__gb_1.mp3',
    audioUs:
      'https://www.oxfordlearnersdictionaries.com/media/english/us_pron/c/cul/culti/cultivate__us_1.mp3',
    pos: 'Verb',
    cefr: 'C1',
    srsStatus: 'learning',
    meaningVi: 'Trau dồi, vun đắp (mối quan hệ, kỹ năng, thói quen) hoặc canh tác.',
    meaningEn:
      'To develop an attitude, a way of talking or behaving; or to prepare land for crops (Oxford 5000).',
    trapTip:
      "Từ vựng vàng cho IELTS Writing & Speaking: Thay vì viết 'build good habits / relationships', hãy dùng 'cultivate positive habits / long-term relationships'.",
    family: ['cultivation (n)', 'cultivated (adj)', 'foster / nurture (syn)'],
    toeicChunk: 'cultivate long-term relationships with key clients',
    toeicVi: 'vun đắp mối quan hệ lâu dài với các khách hàng trọng điểm',
    toeicSentence:
      'Successful account managers strive to cultivate long-term relationships with key corporate clients.',
    toeicSentenceVi:
      'Các quản lý khách hàng thành công luôn nỗ lực vun đắp mối quan hệ lâu dài với các khách hàng doanh nghiệp trọng điểm.',
    ieltsChunk: 'cultivate a sense of civic responsibility among youth',
    ieltsVi: 'nuôi dưỡng ý thức trách nhiệm công dân ở giới trẻ',
    ieltsSentence:
      'Schools play a pivotal role in helping to cultivate a sense of civic responsibility among young citizens.',
    ieltsSentenceVi:
      'Trường học đóng vai trò then chốt trong việc giúp nuôi dưỡng ý thức trách nhiệm công dân ở thế hệ trẻ.',
    workChunk: 'cultivate a culture of open feedback',
    workVi: 'xây dựng văn hóa góp ý cởi mở',
    workSentence:
      'Our engineering leadership is working hard to cultivate a culture of open feedback and psychological safety.',
    workSentenceVi:
      'Ban lãnh đạo kỹ thuật của chúng tôi đang nỗ lực xây dựng văn hóa góp ý cởi mở và tâm lý an toàn.',
    dailyChunk: 'cultivate a habit of reading every night',
    dailyVi: 'rèn thói quen đọc sách mỗi tối',
    dailySentence:
      'Putting your phone away at 10 PM makes it much easier to cultivate a habit of reading every night.',
    dailySentenceVi:
      'Cất điện thoại lúc 10 giờ tối giúp bạn dễ dàng rèn thói quen đọc sách mỗi tối hơn nhiều.',
  },
  {
    id: 'deteriorate',
    word: 'deteriorate',
    ipaUk: '/dɪˈtɪəriəreɪt/',
    ipaUs: '/dɪˈtɪriəreɪt/',
    audioUk:
      'https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/d/det/deter/deteriorate__gb_2.mp3',
    audioUs:
      'https://www.oxfordlearnersdictionaries.com/media/english/us_pron/d/det/deter/deteriorate__us_1.mp3',
    pos: 'Verb',
    cefr: 'C1',
    srsStatus: 'review',
    meaningVi: 'Trở nên tồi tệ hơn, xuống cấp, suy giảm (sức khỏe, chất lượng, quan hệ).',
    meaningEn: 'To become worse in quality, condition, or value (Oxford 5000).',
    trapTip:
      "'deteriorate' là nội động từ (Intransitive Verb) — KHÔNG chia bị động (không viết 'was deteriorated', chỉ viết 'rapidly deteriorated').",
    family: ['deterioration (n)', 'worsen / decline (syn)', 'improve (ant)'],
    toeicChunk: 'deteriorate due to poor storage conditions',
    toeicVi: 'bị xuống cấp do điều kiện bảo quản kém',
    toeicSentence:
      'Perishable goods can quickly deteriorate due to poor storage conditions during transit.',
    toeicSentenceVi:
      'Hàng hóa dễ hỏng có thể nhanh chóng bị giảm chất lượng do điều kiện bảo quản kém trong quá trình vận chuyển.',
    ieltsChunk: 'air quality in megacities continues to deteriorate',
    ieltsVi: 'chất lượng không khí tại các siêu đô thị tiếp tục suy giảm',
    ieltsSentence:
      'Without stringent emission controls, air quality in megacities will continue to deteriorate at an alarming rate.',
    ieltsSentenceVi:
      'Nếu không có các biện pháp kiểm soát khí thải nghiêm ngặt, chất lượng không khí tại các siêu đô thị sẽ tiếp tục suy giảm ở mức báo động.',
    workChunk: 'server response times began to deteriorate',
    workVi: 'thời gian phản hồi của máy chủ bắt đầu suy giảm',
    workSentence:
      'During the flash sale, server response times began to deteriorate when concurrent traffic doubled.',
    workSentenceVi:
      'Trong đợt mở bán chớp nhoáng, thời gian phản hồi của máy chủ bắt đầu chậm đi khi lưu lượng truy cập tăng gấp đôi.',
    dailyChunk: 'the weather started to deteriorate rapidly',
    dailyVi: 'thời tiết bắt đầu xấu đi nhanh chóng',
    dailySentence:
      'We decided to head back to the cabin as the weather started to deteriorate rapidly.',
    dailySentenceVi:
      'Chúng tôi quyết định quay về nhà gỗ khi thời tiết bắt đầu xấu đi nhanh chóng.',
  },
  {
    id: 'enhance',
    word: 'enhance',
    ipaUk: '/ɪnˈhɑːns/',
    ipaUs: '/ɪnˈhæns/',
    audioUk:
      'https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/e/enh/enhan/enhance__gb_2.mp3',
    audioUs:
      'https://www.oxfordlearnersdictionaries.com/media/english/us_pron/e/enh/enhan/enhance__us_3.mp3',
    pos: 'Verb',
    cefr: 'B2',
    srsStatus: 'mastered',
    meaningVi: 'Nâng cao, tăng cường, làm nổi bật (chất lượng, hiệu suất, trải nghiệm).',
    meaningEn:
      'To increase or further improve the good quality, value or status of somebody/something (Oxford 3000).',
    trapTip:
      "Thay thế hoàn hảo cho từ 'improve' nhàm chán! Thường đi với: enhance productivity, enhance user experience, enhance reputation.",
    family: ['enhancement (n)', 'enhanced (adj)', 'boost / elevate (syn)'],
    toeicChunk: 'enhance operational efficiency across branches',
    toeicVi: 'nâng cao hiệu quả vận hành trên toàn hệ thống chi nhánh',
    toeicSentence:
      'The new inventory software is designed to enhance operational efficiency across all retail branches.',
    toeicSentenceVi:
      'Phần mềm quản lý kho mới được thiết kế để nâng cao hiệu quả vận hành trên tất cả các chi nhánh bán lẻ.',
    ieltsChunk: 'significantly enhance cognitive development in children',
    ieltsVi: 'nâng cao đáng kể sự phát triển nhận thức ở trẻ em',
    ieltsSentence:
      'Learning a second language at an early age can significantly enhance cognitive development in children.',
    ieltsSentenceVi:
      'Học ngoại ngữ thứ hai từ sớm có thể nâng cao đáng kể sự phát triển nhận thức ở trẻ em.',
    workChunk: 'enhance the overall user experience',
    workVi: 'nâng tầm trải nghiệm người dùng tổng thể',
    workSentence:
      'Streamlining the checkout steps will directly enhance the overall user experience and conversion rate.',
    workSentenceVi:
      'Việc tinh gọn các bước thanh toán sẽ trực tiếp nâng cao trải nghiệm người dùng tổng thể và tỷ lệ chuyển đổi.',
    dailyChunk: 'fresh herbs enhance the flavor of the soup',
    dailyVi: 'các loại thảo mộc tươi làm dậy mùi vị của món súp',
    dailySentence:
      'A squeeze of lemon and fresh herbs really enhance the flavor of this homemade soup.',
    dailySentenceVi:
      'Một chút nước cốt chanh và thảo mộc tươi thực sự làm tăng hương vị cho món súp tự nấu này.',
  },
  {
    id: 'facilitate',
    word: 'facilitate',
    ipaUk: '/fəˈsɪlɪteɪt/',
    ipaUs: '/fəˈsɪlɪteɪt/',
    audioUk:
      'https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/f/fac/facil/facilitate__gb_1.mp3',
    audioUs:
      'https://www.oxfordlearnersdictionaries.com/media/english/us_pron/f/fac/facil/facilitate__us_1.mp3',
    pos: 'Verb',
    cefr: 'C1',
    srsStatus: 'learning',
    meaningVi: 'Tạo điều kiện thuận lợi, thúc đẩy, điều phối giúp một quá trình dễ dàng hơn.',
    meaningEn: 'To make an action or a process possible or easier (Oxford 5000).',
    trapTip:
      "Lưu ý ngữ pháp Oxford: Tân ngữ của 'facilitate' phải là một QUÁ TRÌNH / HOẠT ĐỘNG (facilitate learning / communication), KHÔNG dùng người làm tân ngữ trực tiếp (không viết 'facilitate students').",
    family: ['facilitation (n)', 'facilitator (n)', 'enable / assist (syn)'],
    toeicChunk: 'facilitate smooth communication between offices',
    toeicVi: 'tạo điều kiện giao tiếp thông suốt giữa các văn phòng',
    toeicSentence:
      'The cloud platform was adopted to facilitate smooth communication between our regional offices.',
    toeicSentenceVi:
      'Nền tảng đám mây được áp dụng nhằm tạo điều kiện giao tiếp thông suốt giữa các văn phòng khu vực của chúng tôi.',
    ieltsChunk: 'facilitate the transition to renewable energy',
    ieltsVi: 'thúc đẩy quá trình chuyển đổi sang năng lượng tái tạo',
    ieltsSentence:
      'Government subsidies are essential to facilitate the transition to renewable energy sources.',
    ieltsSentenceVi:
      'Các khoản trợ cấp của chính phủ là rất cần thiết để thúc đẩy quá trình chuyển đổi sang các nguồn năng lượng tái tạo.',
    workChunk: 'facilitate tomorrow’s retrospective meeting',
    workVi: 'điều phối buổi họp nhìn lại dự án vào ngày mai',
    workSentence:
      'Could you help facilitate tomorrow’s sprint retrospective meeting while the Scrum Master is away?',
    workSentenceVi:
      'Bạn có thể giúp điều phối buổi họp nhìn lại sprint vào ngày mai trong lúc Scrum Master vắng mặt không?',
    dailyChunk: 'apps that facilitate language learning',
    dailyVi: 'các ứng dụng hỗ trợ việc học ngoại ngữ dễ dàng hơn',
    dailySentence:
      'Interactive flashcards and audio examples greatly facilitate daily vocabulary learning.',
    dailySentenceVi:
      'Thẻ ghi nhớ tương tác và ví dụ âm thanh giúp việc học từ vựng hàng ngày trở nên dễ dàng hơn rất nhiều.',
  },
  {
    id: 'fluctuate',
    word: 'fluctuate',
    ipaUk: '/ˈflʌktʃueɪt/',
    ipaUs: '/ˈflʌktʃueɪt/',
    audioUk:
      'https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/f/flu/fluct/fluctuate__gb_3.mp3',
    audioUs:
      'https://www.oxfordlearnersdictionaries.com/media/english/us_pron/f/flu/fluct/fluctuate__us_1.mp3',
    pos: 'Verb',
    cefr: 'C1',
    srsStatus: 'review',
    meaningVi: 'Dao động, biến động lên xuống thất thường (giá cả, số liệu, nhiệt độ).',
    meaningEn:
      'To change frequently in size, amount, quality, etc., especially from one extreme to another (Oxford 5000).',
    trapTip:
      "Từ vựng số 1 cho IELTS Writing Task 1 (biểu đồ đường): 'fluctuate wildly / slightly BETWEEN X AND Y' hoặc 'fluctuate AROUND Z'.",
    family: ['fluctuation (n)', 'fluctuating (adj)', 'vary / oscillate (syn)'],
    toeicChunk: 'fluctuate according to seasonal demand',
    toeicVi: 'biến động theo nhu cầu mùa vụ',
    toeicSentence:
      'Hotel room rates tend to fluctuate significantly according to seasonal tourism demand.',
    toeicSentenceVi:
      'Giá phòng khách sạn có xu hướng biến động mạnh theo nhu cầu du lịch mùa vụ.',
    ieltsChunk: 'fluctuate between 15% and 22% over the decade',
    ieltsVi: 'dao động trong khoảng từ 15% đến 22% trong suốt thập kỷ',
    ieltsSentence:
      'As shown in the graph, the unemployment rate fluctuated between 15% and 22% over the decade.',
    ieltsSentenceVi:
      'Như thể hiện trên biểu đồ, tỷ lệ thất nghiệp dao động trong khoảng 15% đến 22% trong suốt thập kỷ.',
    workChunk: 'server load fluctuates throughout the workday',
    workVi: 'tải lượng máy chủ biến động trong suốt ngày làm việc',
    workSentence:
      'Because server load fluctuates throughout the workday, we enabled auto-scaling on our cluster.',
    workSentenceVi:
      'Vì tải lượng máy chủ biến động trong suốt ngày làm việc, chúng tôi đã bật tính năng tự động co giãn trên cụm máy chủ.',
    dailyChunk: 'temperatures fluctuate wildly in winter',
    dailyVi: 'nhiệt độ thay đổi thất thường vào mùa đông',
    dailySentence:
      'Pack a warm jacket because mountain temperatures can fluctuate wildly in winter.',
    dailySentenceVi:
      'Hãy mang theo áo khoác ấm vì nhiệt độ vùng núi có thể thay đổi thất thường vào mùa đông.',
  },
  {
    id: 'implement',
    word: 'implement',
    ipaUk: '/ˈɪmplɪment/',
    ipaUs: '/ˈɪmplɪment/',
    audioUk:
      'https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/i/imp/imple/implement__gb_3.mp3',
    audioUs:
      'https://www.oxfordlearnersdictionaries.com/media/english/us_pron/i/imp/imple/implement__us_1.mp3',
    pos: 'Verb',
    cefr: 'B2',
    srsStatus: 'mastered',
    meaningVi: 'Triển khai, thực thi, đưa vào áp dụng thực tế (kế hoạch, chính sách, tính năng).',
    meaningEn:
      'To make something that has been officially decided start to happen or be used (Oxford 3000).',
    trapTip:
      "Khác với 'plan' (lên kế hoạch), 'implement' là bắt tay vào thực thi kế hoạch đó ra thực tế. Danh từ: implementation.",
    family: ['implementation (n)', 'execute / carry out (syn)'],
    toeicChunk: 'implement a new quality control system',
    toeicVi: 'triển khai hệ thống kiểm soát chất lượng mới',
    toeicSentence:
      'The manufacturing plant will implement a new quality control system starting next quarter.',
    toeicSentenceVi:
      'Nhà máy sản xuất sẽ triển khai hệ thống kiểm soát chất lượng mới bắt đầu từ quý tới.',
    ieltsChunk: 'implement strict legislation to curb pollution',
    ieltsVi: 'thực thi luật pháp nghiêm ngặt để kiềm chế ô nhiễm',
    ieltsSentence:
      'Authorities must implement strict legislation to curb industrial water pollution.',
    ieltsSentenceVi:
      'Các cơ quan chức năng phải thực thi luật pháp nghiêm ngặt để kiềm chế tình trạng ô nhiễm nước công nghiệp.',
    workChunk: 'implement the requested UI changes',
    workVi: 'triển khai các thay đổi giao diện được yêu cầu',
    workSentence:
      'Our frontend developer will implement the requested UI changes before Friday’s code freeze.',
    workSentenceVi:
      'Lập trình viên frontend của chúng tôi sẽ triển khai các thay đổi giao diện được yêu cầu trước giờ đóng băng code vào thứ Sáu.',
    dailyChunk: 'implement a new morning routine',
    dailyVi: 'áp dụng một thói quen buổi sáng mới',
    dailySentence:
      'I’m trying to implement a new morning routine that includes 20 minutes of stretching.',
    dailySentenceVi:
      'Mình đang cố gắng áp dụng một thói quen buổi sáng mới bao gồm 20 phút giãn cơ.',
  },
  {
    id: 'incentive',
    word: 'incentive',
    ipaUk: '/ɪnˈsentɪv/',
    ipaUs: '/ɪnˈsentɪv/',
    audioUk:
      'https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/i/inc/incen/incentive__gb_2.mp3',
    audioUs:
      'https://www.oxfordlearnersdictionaries.com/media/english/us_pron/i/inc/incen/incentive__us_1.mp3',
    pos: 'Noun',
    cefr: 'B2-C1',
    srsStatus: 'learning',
    meaningVi: 'Sự khuyến khích, động lực thúc đẩy, khoản thưởng/ưu đãi kích cầu.',
    meaningEn: 'Something that encourages you to do something (Oxford 5000).',
    trapTip:
      "Cấu trúc chuẩn: 'offer/provide an incentive TO do something' hoặc 'tax incentives FOR companies'.",
    family: ['incentivize (v)', 'motivation / stimulus (syn)', 'deterrent (ant)'],
    toeicChunk: 'offer financial incentives to high-performing staff',
    toeicVi: 'đưa ra các khoản thưởng tài chính cho nhân viên xuất sắc',
    toeicSentence:
      'The company decided to offer financial incentives to high-performing sales staff.',
    toeicSentenceVi:
      'Công ty đã quyết định đưa ra các khoản thưởng tài chính khích lệ cho đội ngũ bán hàng đạt hiệu suất cao.',
    ieltsChunk: 'provide tax incentives for green technology firms',
    ieltsVi: 'cung cấp ưu đãi thuế cho các doanh nghiệp công nghệ xanh',
    ieltsSentence:
      'Governments can provide tax incentives for green technology firms to accelerate innovation.',
    ieltsSentenceVi:
      'Chính phủ có thể cung cấp các ưu đãi thuế cho các doanh nghiệp công nghệ xanh nhằm thúc đẩy đổi mới sáng tạo.',
    workChunk: 'create a strong incentive for early renewal',
    workVi: 'tạo động lực hấp dẫn để khách hàng gia hạn sớm',
    workSentence:
      'A 15% discount will create a strong incentive for enterprise clients to sign an early renewal.',
    workSentenceVi:
      'Mức chiết khấu 15% sẽ tạo động lực lớn để khách hàng doanh nghiệp ký gia hạn hợp đồng sớm.',
    dailyChunk: 'extra XP is a fun incentive to study daily',
    dailyVi: 'điểm thưởng XP là động lực thú vị để học mỗi ngày',
    dailySentence:
      'Earning bonus XP from the Noel Capybaras is a fun incentive to review vocabulary every day.',
    dailySentenceVi:
      'Nhận điểm XP thưởng từ đàn Capybara Noel là một động lực thú vị để ôn từ vựng mỗi ngày.',
  },
  {
    id: 'inevitable',
    word: 'inevitable',
    ipaUk: '/ɪnˈevɪtəbl/',
    ipaUs: '/ɪnˈevɪtəbl/',
    audioUk:
      'https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/i/ine/inevi/inevitable__gb_2.mp3',
    audioUs:
      'https://www.oxfordlearnersdictionaries.com/media/english/us_pron/i/ine/inevi/inevitable__us_1.mp3',
    pos: 'Adjective',
    cefr: 'B2-C1',
    srsStatus: 'review',
    meaningVi: 'Không thể tránh khỏi, tất yếu sẽ xảy ra.',
    meaningEn: 'That you cannot avoid or prevent (Oxford 5000).',
    trapTip:
      "Trạng từ 'inevitably' cực kỳ ăn điểm khi đặt ở đầu câu hoặc trước động từ trong IELTS Writing ('Technological automation will inevitably transform the job market').",
    family: ['inevitably (adv)', 'inevitability (n)', 'unavoidable (syn)'],
    toeicChunk: 'an inevitable delay in customs clearance',
    toeicVi: 'sự chậm trễ không thể tránh khỏi trong khâu thông quan',
    toeicSentence:
      'Due to the port strike, there will be an inevitable delay in customs clearance for imported goods.',
    toeicSentenceVi:
      'Do cuộc đình công tại cảng, sẽ có sự chậm trễ không thể tránh khỏi trong khâu thông quan đối với hàng nhập khẩu.',
    ieltsChunk: 'an inevitable consequence of rapid globalization',
    ieltsVi: 'hệ quả tất yếu của quá trình toàn cầu hóa nhanh chóng',
    ieltsSentence:
      'Cultural homogenization is often viewed as an inevitable consequence of rapid globalization.',
    ieltsSentenceVi:
      'Sự đồng nhất hóa văn hóa thường được xem là một hệ quả tất yếu của quá trình toàn cầu hóa nhanh chóng.',
    workChunk: 'make occasional bugs inevitable in complex software',
    workVi: 'khiến các lỗi nhỏ đôi khi là điều khó tránh khỏi trong phần mềm phức tạp',
    workSentence:
      'Tight deadlines make occasional bugs inevitable, which is why automated testing is crucial.',
    workSentenceVi:
      'Tiến độ gấp gáp khiến một vài lỗi nhỏ là khó tránh khỏi, đó là lý do kiểm thử tự động đóng vai trò sống còn.',
    dailyChunk: 'traffic jams are inevitable during rush hour',
    dailyVi: 'tắc đường là chuyện không tránh khỏi vào giờ cao điểm',
    dailySentence:
      'Traffic jams are pretty much inevitable if you leave the office at 5:30 PM.',
    dailySentenceVi:
      'Tắc đường gần như là điều không thể tránh khỏi nếu bạn rời văn phòng lúc 5 rưỡi chiều.',
  },
  {
    id: 'initiative',
    word: 'initiative',
    ipaUk: '/ɪˈnɪʃətɪv/',
    ipaUs: '/ɪˈnɪʃətɪv/',
    audioUk:
      'https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/i/ini/initi/initiative__gb_1.mp3',
    audioUs:
      'https://www.oxfordlearnersdictionaries.com/media/english/us_pron/i/ini/initi/initiative__us_1.mp3',
    pos: 'Noun',
    cefr: 'B2',
    srsStatus: 'learning',
    meaningVi: 'Sáng kiến, chương trình hành động mới; hoặc tính chủ động trong công việc.',
    meaningEn:
      'A new plan for dealing with a particular problem; or the ability to decide and act independently (Oxford 3000).',
    trapTip:
      "Phân biệt 2 nghĩa: (1) Đếm được 'launch a new initiative' = tung ra một sáng kiến/dự án mới; (2) Không đếm được 'take the initiative' = chủ động tiên phong làm việc gì.",
    family: ['initiate (v)', 'proactive (syn)', 'enterprise (syn)'],
    toeicChunk: 'launch a company-wide sustainability initiative',
    toeicVi: 'phát động sáng kiến phát triển bền vững trên toàn công ty',
    toeicSentence:
      'The CEO announced plans to launch a company-wide sustainability initiative to reduce paper waste.',
    toeicSentenceVi:
      'Giám đốc điều hành đã công bố kế hoạch phát động sáng kiến phát triển bền vững toàn công ty nhằm giảm rác thải giấy.',
    ieltsChunk: 'government initiatives aimed at promoting literacy',
    ieltsVi: 'các sáng kiến của chính phủ nhằm thúc đẩy xóa mù chữ',
    ieltsSentence:
      'Several government initiatives aimed at promoting digital literacy have yielded positive results.',
    ieltsSentenceVi:
      'Nhiều sáng kiến của chính phủ nhằm thúc đẩy phổ cập kỹ năng số đã mang lại kết quả tích cực.',
    workChunk: 'take the initiative to resolve the issue',
    workVi: 'chủ động đứng ra giải quyết vấn đề',
    workSentence:
      'I really appreciate how Minh took the initiative to resolve the client’s configuration issue.',
    workSentenceVi:
      'Mình thực sự đánh giá cao việc Minh đã chủ động đứng ra giải quyết lỗi cấu hình cho khách hàng.',
    dailyChunk: 'show a bit more initiative at home',
    dailyVi: 'chủ động hơn một chút trong việc nhà',
    dailySentence:
      'Parents love it when kids take the initiative to clean up their study desk without being asked.',
    dailySentenceVi:
      'Bố mẹ rất vui khi các bé chủ động dọn dẹp bàn học gọn gàng mà không cần nhắc nhở.',
  },
  {
    id: 'jeopardize',
    word: 'jeopardize',
    ipaUk: '/ˈdʒepədaɪz/',
    ipaUs: '/ˈdʒepərdaɪz/',
    audioUk:
      'https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/j/jeo/jeopa/jeopardize__gb_1.mp3',
    audioUs:
      'https://www.oxfordlearnersdictionaries.com/media/english/us_pron/j/jeo/jeopa/jeopardize__us_1.mp3',
    pos: 'Verb',
    cefr: 'C1',
    srsStatus: 'review',
    meaningVi: 'Gây nguy hại, đe dọa làm hỏng (cơ hội, dự án, uy tín, sức khỏe).',
    meaningEn: 'To risk harming or destroying something/somebody (Oxford 5000).',
    trapTip:
      "Từ C1 cực đắt giá thay cho 'harm / endanger'. Thành ngữ danh từ tương đương là 'put something in jeopardy'.",
    family: ['jeopardy (n)', 'endanger / threaten / compromise (syn)'],
    toeicChunk: 'jeopardize the success of the merger',
    toeicVi: 'đe dọa sự thành công của thương vụ sáp nhập',
    toeicSentence:
      'Any leak of confidential financial data could seriously jeopardize the success of the merger.',
    toeicSentenceVi:
      'Bất kỳ sự rò rỉ dữ liệu tài chính mật nào cũng có thể đe dọa nghiêm trọng đến thành công của thương vụ sáp nhập.',
    ieltsChunk: 'jeopardize the livelihoods of local fishermen',
    ieltsVi: 'đe dọa sinh kế của ngư dân địa phương',
    ieltsSentence:
      'Unregulated coastal development can destroy marine habitats and jeopardize the livelihoods of local fishermen.',
    ieltsSentenceVi:
      'Phát triển ven biển thiếu quy hoạch có thể phá hủy môi trường sống biển và đe dọa sinh kế của ngư dân địa phương.',
    workChunk: 'jeopardize our Q4 delivery timeline',
    workVi: 'làm ảnh hưởng xấu đến tiến độ bàn giao Quý 4 của chúng ta',
    workSentence:
      'Adding unapproved features at this stage will jeopardize our Q4 delivery timeline.',
    workSentenceVi:
      'Việc thêm các tính năng chưa được phê duyệt ở giai đoạn này sẽ đe dọa tiến độ bàn giao Quý 4 của chúng ta.',
    dailyChunk: 'never jeopardize your health for a game',
    dailyVi: 'đừng bao giờ đánh đổi sức khỏe vì trò chơi',
    dailySentence:
      'Staying up until 3 AM every night will jeopardize your health and school grades.',
    dailySentenceVi:
      'Thức khuya đến 3 giờ sáng mỗi đêm sẽ gây hại cho sức khỏe và kết quả học tập của bạn.',
  },
  {
    id: 'negotiate',
    word: 'negotiate',
    ipaUk: '/nɪˈɡəʊʃieɪt/',
    ipaUs: '/nɪˈɡoʊʃieɪt/',
    audioUk:
      'https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/n/neg/negot/negotiate__gb_1.mp3',
    audioUs:
      'https://www.oxfordlearnersdictionaries.com/media/english/us_pron/n/neg/negot/negotiate__us_1.mp3',
    pos: 'Verb',
    cefr: 'B2',
    srsStatus: 'mastered',
    meaningVi: 'Đàm phán, thương lượng để đi đến thỏa thuận chung.',
    meaningEn: 'To try to reach an agreement by formal discussion (Oxford 3000).',
    trapTip:
      "Cấu trúc chuẩn: 'negotiate WITH somebody FOR/OVER something' hoặc ngoại động từ 'negotiate a contract / a better price'.",
    family: ['negotiation (n)', 'negotiable (adj)', 'negotiator (n)'],
    toeicChunk: 'negotiate favorable contract terms with suppliers',
    toeicVi: 'đàm phán các điều khoản hợp đồng có lợi với nhà cung cấp',
    toeicSentence:
      'Our procurement director managed to negotiate favorable contract terms with key raw material suppliers.',
    toeicSentenceVi:
      'Giám đốc mua hàng của chúng tôi đã đàm phán thành công các điều khoản hợp đồng có lợi với các nhà cung cấp nguyên liệu chính.',
    ieltsChunk: 'negotiate peaceful resolutions to international disputes',
    ieltsVi: 'đàm phán các giải pháp hòa bình cho những tranh chấp quốc tế',
    ieltsSentence:
      'Diplomatic summits provide a forum for leaders to negotiate peaceful resolutions to international disputes.',
    ieltsSentenceVi:
      'Các hội nghị thượng đỉnh ngoại giao tạo diễn đàn để các nhà lãnh đạo đàm phán giải pháp hòa bình cho các tranh chấp quốc tế.',
    workChunk: 'negotiate a realistic deadline extension',
    workVi: 'thương lượng lùi thời hạn bàn giao một cách hợp lý',
    workSentence:
      'Let’s schedule a call with the product owner to negotiate a realistic deadline extension.',
    workSentenceVi:
      'Hãy đặt lịch gọi với Product Owner để thương lượng việc gia hạn deadline một cách thực tế.',
    dailyChunk: 'negotiate a lower rent with the landlord',
    dailyVi: 'thương lượng giá thuê nhà thấp hơn với chủ nhà',
    dailySentence:
      'If you sign a two-year lease, you might be able to negotiate a lower monthly rent with the landlord.',
    dailySentenceVi:
      'Nếu bạn ký hợp đồng thuê 2 năm, bạn có thể thương lượng được mức giá thuê hàng tháng thấp hơn với chủ nhà.',
  },
  {
    id: 'paradigm',
    word: 'paradigm',
    ipaUk: '/ˈpærədaɪm/',
    ipaUs: '/ˈpærədaɪm/',
    audioUk:
      'https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/p/par/parad/paradigm__gb_1.mp3',
    audioUs:
      'https://www.oxfordlearnersdictionaries.com/media/english/us_pron/p/par/parad/paradigm__us_1.mp3',
    pos: 'Noun',
    cefr: 'C1',
    srsStatus: 'review',
    meaningVi: 'Mô hình chuẩn, hệ tư duy, khuôn mẫu điển hình.',
    meaningEn: 'A typical example or pattern of something (Oxford 5000).',
    trapTip:
      "Bẫy phát âm kinh điển: Chữ 'g' là âm câm! Đọc là /ˈpærədaɪm/ (vần với 'time'), KHÔNG đọc là 'para-dig-m'. Cụm nổi tiếng nhất: 'a paradigm shift' (bước ngoặt thay đổi hệ tư duy).",
    family: ['paradigmatic (adj)', 'model / framework (syn)'],
    toeicChunk: 'a paradigm shift in retail banking',
    toeicVi: 'bước chuyển dịch mô hình trong ngành ngân hàng bán lẻ',
    toeicSentence:
      'Mobile payment apps have triggered a paradigm shift in retail banking and consumer behavior.',
    toeicSentenceVi:
      'Các ứng dụng thanh toán di động đã tạo ra một bước chuyển dịch mô hình trong ngành ngân hàng bán lẻ và hành vi tiêu dùng.',
    ieltsChunk: 'challenge the traditional educational paradigm',
    ieltsVi: 'thách thức mô hình giáo dục truyền thống',
    ieltsSentence:
      'Artificial intelligence is beginning to challenge the traditional educational paradigm of rote memorization.',
    ieltsSentenceVi:
      'Trí tuệ nhân tạo đang bắt đầu thách thức mô hình giáo dục truyền thống vốn dựa vào học vẹt.',
    workChunk: 'adopt a cloud-native development paradigm',
    workVi: 'áp dụng mô hình phát triển phần mềm gốc đám mây',
    workSentence:
      'Migrating to microservices requires our team to adopt a cloud-native development paradigm.',
    workSentenceVi:
      'Việc chuyển sang kiến trúc microservices đòi hỏi đội ngũ của chúng ta áp dụng mô hình phát triển gốc đám mây.',
    dailyChunk: 'a new paradigm for healthy living',
    dailyVi: 'một lối tư duy mới về sống khỏe',
    dailySentence:
      'Focusing on mental wellness alongside exercise has become a new paradigm for healthy living.',
    dailySentenceVi:
      'Chú trọng sức khỏe tinh thần song hành với tập luyện đã trở thành một chuẩn mực mới cho lối sống lành mạnh.',
  },
  {
    id: 'prerequisite',
    word: 'prerequisite',
    ipaUk: '/ˌpriːˈrekwəzɪt/',
    ipaUs: '/ˌpriːˈrekwəzɪt/',
    audioUk:
      'https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/p/pre/prere/prerequisite__gb_1.mp3',
    audioUs:
      'https://www.oxfordlearnersdictionaries.com/media/english/us_pron/p/pre/prere/prerequisite__us_1.mp3',
    pos: 'Noun',
    cefr: 'C1',
    srsStatus: 'review',
    meaningVi: 'Điều kiện tiên quyết (điều bắt buộc phải có trước khi làm việc khác).',
    meaningEn:
      'Something that must exist or happen before something else can happen or be done (Oxford 5000).',
    trapTip:
      "Đi với giới từ 'FOR' hoặc 'TO': 'a prerequisite FOR/TO admission / success'.",
    family: ['precondition / requirement (syn)'],
    toeicChunk: 'a prerequisite for managerial promotion',
    toeicVi: 'điều kiện tiên quyết để được thăng chức quản lý',
    toeicSentence:
      'Demonstrated leadership experience is a prerequisite for managerial promotion at our firm.',
    toeicSentenceVi:
      'Kinh nghiệm lãnh đạo thực tế là điều kiện tiên quyết để được thăng chức lên vị trí quản lý tại công ty chúng tôi.',
    ieltsChunk: 'political stability is a prerequisite for economic growth',
    ieltsVi: 'ổn định chính trị là điều kiện tiên quyết cho tăng trưởng kinh tế',
    ieltsSentence:
      'Historians and economists agree that political stability is a vital prerequisite for sustained economic growth.',
    ieltsSentenceVi:
      'Các nhà sử học và kinh tế học đồng ý rằng sự ổn định chính trị là điều kiện tiên quyết sống còn cho tăng trưởng kinh tế bền vững.',
    workChunk: 'complete security training as a prerequisite for access',
    workVi: 'hoàn thành khóa đào tạo bảo mật như điều kiện tiên quyết để được cấp quyền truy cập',
    workSentence:
      'All contractors must complete security training as a prerequisite for production database access.',
    workSentenceVi:
      'Tất cả đối tác bên ngoài phải hoàn thành khóa đào tạo bảo mật như điều kiện tiên quyết để được cấp quyền truy cập cơ sở dữ liệu.',
    dailyChunk: 'basic grammar is a prerequisite for writing well',
    dailyVi: 'ngữ pháp cơ bản là điều kiện cần trước khi viết tốt',
    dailySentence:
      'Knowing core collocations is a prerequisite for speaking English naturally and confidently.',
    dailySentenceVi:
      'Nắm vững các cụm từ cố định là điều kiện tiên quyết để nói tiếng Anh tự nhiên và tự tin.',
  },
  {
    id: 'scrutinize',
    word: 'scrutinize',
    ipaUk: '/ˈskruːtənaɪz/',
    ipaUs: '/ˈskruːtənaɪz/',
    audioUk:
      'https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/s/scr/scrut/scrutinize__gb_3.mp3',
    audioUs:
      'https://www.oxfordlearnersdictionaries.com/media/english/us_pron/s/scr/scrut/scrutinize__us_1.mp3',
    pos: 'Verb',
    cefr: 'C1',
    srsStatus: 'learning',
    meaningVi: 'Xem xét kỹ lưỡng, săm soi, rà soát từng chi tiết nhỏ.',
    meaningEn:
      'To look at or examine somebody/something carefully and thoroughly (Oxford 5000).',
    trapTip:
      "Danh từ là 'scrutiny' (come under close scrutiny = bị đưa vào tầm ngắm/kiểm tra gắt gao). Mạnh hơn 'check / examine' rất nhiều.",
    family: ['scrutiny (n)', 'inspect / examine closely (syn)'],
    toeicChunk: 'scrutinize financial statements for discrepancies',
    toeicVi: 'rà soát kỹ báo cáo tài chính để tìm điểm sai lệch',
    toeicSentence:
      'External auditors will scrutinize the annual financial statements for any accounting discrepancies.',
    toeicSentenceVi:
      'Các kiểm toán viên độc lập sẽ rà soát kỹ lưỡng báo cáo tài chính thường niên để tìm bất kỳ điểm sai lệch kế toán nào.',
    ieltsChunk: 'scrutinize the validity of scientific claims',
    ieltsVi: 'kiểm chứng kỹ lưỡng tính xác thực của các tuyên bố khoa học',
    ieltsSentence:
      'Peer reviewers carefully scrutinize the validity of scientific claims before publication.',
    ieltsSentenceVi:
      'Hội đồng phản biện chuyên môn kiểm tra kỹ lưỡng tính xác thực của các tuyên bố khoa học trước khi xuất bản.',
    workChunk: 'scrutinize every clause in the vendor contract',
    workVi: 'rà soát kỹ từng điều khoản trong hợp đồng nhà cung cấp',
    workSentence:
      'Our legal counsel needs to scrutinize every clause in the vendor contract before we sign.',
    workSentenceVi:
      'Bộ phận pháp chế của chúng ta cần rà soát kỹ từng điều khoản trong hợp đồng nhà cung cấp trước khi ký kết.',
    dailyChunk: 'scrutinize the food label for allergens',
    dailyVi: 'đọc kỹ nhãn thực phẩm để kiểm tra chất gây dị ứng',
    dailySentence:
      'She always takes a moment to scrutinize the ingredient label when buying snacks for her kids.',
    dailySentenceVi:
      'Cô ấy luôn dành chút thời gian đọc thật kỹ nhãn thành phần khi mua đồ ăn vặt cho các con.',
  },
  {
    id: 'sustainable',
    word: 'sustainable',
    ipaUk: '/səˈsteɪnəbl/',
    ipaUs: '/səˈsteɪnəbl/',
    audioUk:
      'https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/s/sus/susta/sustainable__gb_1.mp3',
    audioUs:
      'https://www.oxfordlearnersdictionaries.com/media/english/us_pron/s/sus/susta/sustainable__us_1.mp3',
    pos: 'Adjective',
    cefr: 'B2',
    srsStatus: 'mastered',
    meaningVi: 'Bền vững (thân thiện môi trường hoặc có thể duy trì lâu dài không kiệt sức).',
    meaningEn:
      'Involving the use of natural products and energy in a way that does not harm the environment; or able to continue over a period of time (Oxford 3000).',
    trapTip:
      "Ngoài nghĩa 'phát triển bền vững về môi trường' (sustainable development), trong công sở từ này còn mang nghĩa 'tốc độ làm việc có thể duy trì lâu dài' (a sustainable work pace).",
    family: ['sustainability (n)', 'sustain (v)', 'eco-friendly / viable (syn)'],
    toeicChunk: 'adopt sustainable packaging materials',
    toeicVi: 'áp dụng vật liệu đóng gói bền vững thân thiện môi trường',
    toeicSentence:
      'Major e-commerce retailers are pledging to adopt 100% sustainable packaging materials by 2028.',
    toeicSentenceVi:
      'Các nhà bán lẻ thương mại điện tử lớn đang cam kết áp dụng 100% vật liệu đóng gói bền vững vào năm 2028.',
    ieltsChunk: 'achieve sustainable urban development',
    ieltsVi: 'đạt được sự phát triển đô thị bền vững',
    ieltsSentence:
      'Expanding public transit networks is essential to achieve sustainable urban development.',
    ieltsSentenceVi:
      'Mở rộng mạng lưới giao thông công cộng là điều cốt yếu để đạt được sự phát triển đô thị bền vững.',
    workChunk: 'maintain a sustainable pace for the engineering team',
    workVi: 'duy trì nhịp độ làm việc bền vững cho đội ngũ kỹ thuật',
    workSentence:
      'To prevent burnout, we must plan realistic sprints and maintain a sustainable pace for the team.',
    workSentenceVi:
      'Để tránh kiệt sức, chúng ta phải lên kế hoạch sprint thực tế và duy trì nhịp độ làm việc bền vững cho cả nhóm.',
    dailyChunk: 'build a sustainable study routine',
    dailyVi: 'xây dựng thói quen học tập có thể duy trì lâu dài',
    dailySentence:
      'Studying 15 minutes every day is much more sustainable than cramming for five hours on Sunday.',
    dailySentenceVi:
      'Học 15 phút mỗi ngày bền vững và hiệu quả hơn nhiều so với việc nhồi nhét 5 tiếng vào ngày Chủ nhật.',
  },
];

export const OXFORD_EXTRA_WORDS: VocabItem[] = SEEDS.map((s) => ({
  id: s.id,
  word: s.word,
  ipaUk: s.ipaUk,
  ipaUs: s.ipaUs,
  audioUk: s.audioUk,
  audioUs: s.audioUs,
  oxfordUrl: `https://www.oxfordlearnersdictionaries.com/definition/english/${s.id}`,
  pos: s.pos,
  cefr: s.cefr,
  srsStatus: s.srsStatus,
  ef: 2.5,
  intervalText: s.srsStatus === 'mastered' ? '7 ngày' : s.srsStatus === 'learning' ? '2 ngày' : 'Hôm nay',
  meaningVi: s.meaningVi,
  meaningEn: s.meaningEn,
  trapTip: s.trapTip,
  family: s.family,
  contexts: {
    toeic: {
      label: 'TOEIC Thương mại',
      badgeColor: 'indigo',
      chunk: s.toeicChunk,
      chunkVi: s.toeicVi,
      register: 'Thương mại · Oxford 3000/5000',
      sentence: s.toeicSentence,
      sentenceVi: s.toeicSentenceVi,
      note: `Cụm Collocation trọng tâm của "${s.word}" trong đề thi TOEIC Part 5/7.`,
    },
    ielts: {
      label: 'IELTS Academic (Band 7.5+)',
      badgeColor: 'violet',
      chunk: s.ieltsChunk,
      chunkVi: s.ieltsVi,
      register: 'Học thuật · Oxford Academic',
      sentence: s.ieltsSentence,
      sentenceVi: s.ieltsSentenceVi,
      note: `Giúp nâng điểm Lexical Resource trong IELTS Writing Task 2 với từ "${s.word}".`,
    },
    workplace: {
      label: 'Giao tiếp Công sở',
      badgeColor: 'emerald',
      chunk: s.workChunk,
      chunkVi: s.workVi,
      register: 'Chuyên nghiệp · Email & Họp',
      sentence: s.workSentence,
      sentenceVi: s.workSentenceVi,
      note: `Mẫu câu thực chiến dùng ngay trong email và họp dự án hàng ngày.`,
    },
    daily: {
      label: 'Giao tiếp Đời thường',
      badgeColor: 'amber',
      chunk: s.dailyChunk,
      chunkVi: s.dailyVi,
      register: 'Tự nhiên · Đời sống hàng ngày',
      sentence: s.dailySentence,
      sentenceVi: s.dailySentenceVi,
      note: `Ứng dụng tự nhiên của từ "${s.word}" trong hội thoại và thói quen hàng ngày.`,
    },
  },
  quiz: {
    question: s.toeicSentence.replace(new RegExp(s.word, 'i'), '__________'),
    options: [s.word, 'accommodate', 'mitigate', 'expedite'].filter(
      (v, i, a) => a.indexOf(v) === i
    ).slice(0, 4),
    answer: s.word,
    explanation: `Cụm Collocation chuẩn Oxford: "${s.toeicChunk}" (${s.toeicVi}).`,
  },
  chunkPuzzle: {
    targetChunk: s.workChunk,
    meaningVi: s.workVi,
    distractors: ['into', 'at'],
  },
  sentenceStarter: `In our upcoming project, we plan to ${s.workChunk} so that `,
}));
