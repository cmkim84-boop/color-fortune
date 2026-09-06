/* ===================== 데이터 ===================== */

const COLORS = [
  { name: "레드",       hex: "#E63946", keyword: "열정과 추진력" },
  { name: "코럴",       hex: "#F4845F", keyword: "활력과 사교성" },
  { name: "옐로우",     hex: "#FFC845", keyword: "긍정과 아이디어" },
  { name: "라임",       hex: "#A8DF65", keyword: "새로운 시작" },
  { name: "그린",       hex: "#2A9D8F", keyword: "안정과 균형" },
  { name: "민트",       hex: "#4ECDC4", keyword: "회복과 치유" },
  { name: "스카이블루", hex: "#4FA8E0", keyword: "소통과 유연함" },
  { name: "블루",       hex: "#3A6EA5", keyword: "집중과 신뢰" },
  { name: "인디고",     hex: "#5B5F97", keyword: "직관과 통찰" },
  { name: "퍼플",       hex: "#9C6ADE", keyword: "영감과 감성" },
  { name: "핑크",       hex: "#F0679B", keyword: "인연과 매력" },
  { name: "그레이",     hex: "#8D99AE", keyword: "휴식과 정리" },
];

// {color} = 색상명 그대로 / {color_ga} = "이름+이" 또는 "이름+가" / {color_neun} = "이름+은" 또는 "이름+는"
// (받침 유무에 따라 조사가 자동으로 붙어요 — buildFortuneText 참고)
const FORTUNE_TEMPLATES = [
  "오늘은 {color} 에너지가 강하게 흐르는 날이에요. 평소보다 마음이 차분해지고, 미뤄뒀던 일을 정리하기 좋은 타이밍이에요.",
  "{color}의 기운이 감도는 하루예요. 작은 우연이 생각보다 큰 힌트가 될 수 있으니 주변을 조금 더 눈여겨보세요.",
  "오늘 당신을 감싸는 색은 {color}. 조급하게 서두르기보다 한 박자 쉬어가면 더 좋은 결과로 이어질 거예요.",
  "{color_ga} 알려주는 오늘의 흐름은 '균형'이에요. 일과 휴식, 말과 침묵 사이의 적당한 지점을 찾아보세요.",
  "오늘은 {color}처럼 또렷한 존재감을 드러내기 좋은 날이에요. 하고 싶은 말이 있다면 미루지 말고 표현해보세요.",
  "{color}의 기운 속에서는 사람 사이의 온도가 중요해요. 오랜만에 연락이 뜸했던 사람에게 안부를 물어보세요.",
  "오늘의 색 {color_neun} 재정비를 뜻해요. 계획을 세우거나 책상 위를 정리하는 것만으로도 마음이 한결 가벼워질 거예요.",
  "{color_ga} 강해지는 날에는 직감이 유독 잘 맞아요. 애매할 땐 첫 느낌을 믿어보는 것도 방법이에요.",
  "오늘은 {color} 특유의 부드러움이 필요한 하루예요. 스스로에게도, 곁에 있는 사람에게도 조금 너그러워지세요.",
  "{color}의 흐름을 탄 오늘은 새로운 시도가 잘 통하는 날이에요. 작게라도 한 번 도전해보는 걸 추천해요.",
  "오늘의 컬러 {color_neun} 관찰력을 상징해요. 평소 지나쳤던 디테일 속에 뜻밖의 기회가 숨어 있을 수 있어요.",
  "{color_ga} 은은하게 감도는 하루, 무리한 욕심보다는 지금 가진 것에 집중하면 만족스러운 하루가 될 거예요.",
];

const ACTION_TIPS = [
  "중요한 결정은 오후로 미뤄보세요. 여유를 갖고 판단하면 더 좋은 선택을 할 수 있어요.",
  "물을 평소보다 한 잔 더 마셔보세요. 컨디션이 한결 가벼워질 거예요.",
  "가장 먼저 처리하고 싶었던 일 하나만 골라 오전 중에 끝내보세요.",
  "오늘은 답장을 미루지 말고 바로바로 확인해보세요. 타이밍이 중요한 하루예요.",
  "짧게라도 산책을 하며 생각을 정리할 시간을 가져보세요.",
  "예산이나 일정처럼 숫자로 된 것들을 한 번 점검해보세요.",
  "고마웠던 사람에게 짧은 인사를 전해보세요. 관계에 좋은 영향을 줘요.",
  "새로운 것보다는 이미 시작한 일을 마무리하는 데 집중해보세요.",
  "낯선 제안이 들어온다면 바로 거절하지 말고 하루 정도 생각해보세요.",
  "책상이나 가방 속처럼 눈에 잘 안 띄는 곳을 정리해보세요.",
  "평소보다 조금 일찍 하루를 마무리하고 휴식을 챙겨보세요.",
  "오늘 떠오른 아이디어는 잊기 전에 메모로 남겨두세요.",
];

/* ---- 카테고리별 운세 (애정 / 재물 / 건강 / 업무) ---- */

const LOVE_FORTUNES = [
  "혼자만의 생각에 갇히기보다 마음을 조금 더 표현하면 관계가 한결 부드러워지는 날이에요.",
  "오래된 인연에게서 반가운 연락이 올 수 있어요. 먼저 안부를 물어도 좋아요.",
  "말보다 작은 행동 하나가 더 큰 진심으로 전해지는 하루예요.",
  "혹시 오해가 쌓인 사이라면, 먼저 다가가기 좋은 타이밍이에요.",
  "새로운 인연보다는 곁에 있는 사람에게 마음을 쏟아보세요.",
  "감정 기복이 있을 수 있는 날이에요. 서두르지 말고 천천히 대화해보세요.",
  "솔직한 한마디가 관계를 더 단단하게 만들어줄 거예요.",
  "혼자만의 시간도 필요한 날, 무리해서 약속을 잡지 않아도 괜찮아요.",
  "작은 배려가 크게 기억되는 하루예요. 먼저 챙겨보세요.",
  "설레는 일이 생길 수 있으니 평소보다 조금 더 마음을 열어보세요.",
];

const MONEY_FORTUNES = [
  "충동적인 지출보다 계획된 소비가 잘 맞는 날이에요.",
  "생각지 못한 지출이 생길 수 있으니 큰 결제는 한 번 더 확인해보세요.",
  "저축이나 정리해둔 계획을 다시 점검하기 좋은 타이밍이에요.",
  "작은 절약이 나중에 뿌듯함으로 돌아오는 하루예요.",
  "투자나 계약처럼 중요한 문제는 서두르지 말고 신중하게 접근하세요.",
  "누군가에게 베푼 것이 돌아올 수 있는 흐름이에요.",
  "가계부나 지출 내역을 한 번 훑어보면 도움이 될 거예요.",
  "무리한 대출이나 큰 결정은 오늘만큼은 미뤄두는 게 좋아요.",
  "예상치 못한 작은 수입이나 기회가 생길 수 있어요.",
  "물건보다 경험에 쓰는 소비가 더 만족스러운 하루예요.",
];

const HEALTH_FORTUNES = [
  "무리하지 않는 선에서 몸을 움직이면 컨디션이 좋아지는 날이에요.",
  "평소보다 피로가 빨리 올 수 있으니 충분히 쉬어주세요.",
  "가벼운 스트레칭이나 산책이 큰 도움이 되는 하루예요.",
  "식사 시간을 거르지 않는 것만으로도 컨디션이 달라질 거예요.",
  "수면의 질에 신경 쓰면 다음 날이 훨씬 가벼워질 거예요.",
  "긴장이나 스트레스가 몸으로 나타날 수 있으니 마음을 편히 가지세요.",
  "눈이나 목처럼 평소 잘 안 쓰던 부위를 챙겨보세요.",
  "카페인이나 야식은 평소보다 조금 줄여보는 게 좋아요.",
  "몸이 보내는 작은 신호를 무시하지 말고 챙겨주세요.",
  "햇볕을 잠깐이라도 쬐면 기분 전환에 도움이 될 거예요.",
];

const WORK_FORTUNES = [
  "미뤄뒀던 일을 처리하기에 좋은 흐름이 흐르는 날이에요.",
  "새로운 아이디어가 잘 떠오르는 날, 회의나 기획에 좋은 타이밍이에요.",
  "혼자 끙끙대기보다 주변에 의견을 구하면 실마리가 보일 거예요.",
  "세부적인 부분을 놓치기 쉬우니 마무리 전에 한 번 더 확인해보세요.",
  "협업이 특히 잘 풀리는 날이니 함께 하는 일을 앞당겨보세요.",
  "예상보다 일정이 빠듯할 수 있어요. 우선순위를 먼저 정해보세요.",
  "새로운 제안이나 역할이 들어올 수 있는 흐름이에요.",
  "완벽하게 끝내려 하기보다 우선 진행해보는 게 도움이 되는 날이에요.",
  "평소 미뤄뒀던 정리나 문서 작업을 해두면 나중이 편해질 거예요.",
  "작은 실수가 생길 수 있으니 중요한 부분은 두 번 확인해보세요.",
];

/* ---- 행운의 아이템 / 숫자 ---- */

const LUCKY_ITEMS = [
  "우산", "손목시계", "노트", "향초", "무선 이어폰", "머그컵",
  "책갈피", "안경", "가디건", "만년필", "무선 충전기", "스카프",
  "카메라", "지갑", "손거울", "텀블러", "담요", "식물 화분",
];

/* ---- 시간대별 조언 (오전 / 오후 / 저녁) ---- */

const TIME_ADVICE = {
  morning: [
    "오늘 가장 중요한 일 하나를 오전에 먼저 처리해보세요.",
    "가볍게 몸을 깨우는 스트레칭으로 하루를 시작해보세요.",
    "메일이나 메시지함부터 정리하면 하루가 한결 가벼워져요.",
    "오전엔 집중이 잘 되는 시간이니 어려운 일부터 시작해보세요.",
    "따뜻한 물 한 잔으로 여유롭게 하루를 열어보세요.",
    "오늘의 할 일을 짧게라도 메모해두면 도움이 돼요.",
    "서두르지 말고 평소보다 여유 있게 준비해보세요.",
    "가장 먼저 떠오른 생각을 적어두면 나중에 쓸모가 있을 거예요.",
  ],
  afternoon: [
    "잠깐의 휴식이 오후의 능률을 크게 바꿔줄 거예요.",
    "미뤄뒀던 연락이 있다면 이 시간에 해보세요.",
    "집중이 흐트러지기 쉬운 시간, 짧게 산책하고 오면 좋아요.",
    "새로운 제안이나 의견은 이 시간대에 잘 통해요.",
    "당 떨어지는 시간이니 가벼운 간식을 챙겨보세요.",
    "오전에 못다 한 일은 우선순위를 다시 정해보세요.",
    "사람들과의 대화가 특히 잘 풀리는 시간이에요.",
    "잠깐 자리에서 일어나 스트레칭을 해보세요.",
  ],
  evening: [
    "하루를 마무리하며 오늘 잘한 일 한 가지를 떠올려보세요.",
    "가벼운 정리만으로도 내일이 훨씬 수월해질 거예요.",
    "너무 늦지 않게 하루를 마무리하는 게 좋아요.",
    "스마트폰은 조금 내려두고 여유로운 시간을 가져보세요.",
    "따뜻한 차 한 잔과 함께 오늘 하루를 정리해보세요.",
    "내일 할 일을 미리 한 줄만 적어두면 마음이 편해져요.",
    "가까운 사람과 짧게라도 이야기를 나눠보세요.",
    "충분한 수면이 내일의 컨디션을 좌우해요.",
  ],
};

/* ---- 오늘의 한마디 ---- */

const QUOTES = [
  "완벽하지 않아도 오늘 하루는 충분히 잘 해내고 있어요.",
  "작은 진전도 진전이에요.",
  "서두르지 않아도 방향만 맞으면 늦지 않아요.",
  "오늘의 나에게 조금 더 너그러워져도 괜찮아요.",
  "쉬어가는 것도 앞으로 나아가는 방법 중 하나예요.",
  "지금 가진 것에 눈을 돌리면 하루가 달라 보여요.",
  "작은 선택들이 모여 오늘 하루를 만들어가요.",
  "무리하지 않는 만큼 오래갈 수 있어요.",
  "오늘 못한 일은 내일의 몫으로 남겨둬도 괜찮아요.",
  "당신의 속도로 걸어가도 충분해요.",
  "결과보다 오늘 보낸 시간 자체에 의미가 있어요.",
  "잘하고 있다는 말, 스스로에게도 해주세요.",
];

const HISTORY_KEY = "cf_history";
const BIRTHDATE_KEY = "cf_birthdate";
const MAX_HISTORY = 14;

/* ===================== 유틸 ===================== */

// KST(한국 표준시) 기준 오늘 날짜를 'YYYY-MM-DD'로 반환
function getKSTDateString(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

// 한글 음절의 받침 유무 판별 (은/는, 이/가 조사 자동 선택용)
function hasBatchim(word) {
  const lastChar = word[word.length - 1];
  const code = lastChar.charCodeAt(0) - 0xac00;
  if (code < 0 || code > 11171) return false; // 한글 음절이 아니면 받침 없는 것으로 처리
  return code % 28 !== 0;
}

function withEunNeun(word) {
  return word + (hasBatchim(word) ? "은" : "는");
}

function withIGa(word) {
  return word + (hasBatchim(word) ? "이" : "가");
}

// djb2 기반 간단한 문자열 해시
function hashString(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function seededIndex(birthdate, dateStr, salt, length) {
  return hashString(`${birthdate}_${dateStr}_${salt}`) % length;
}

// 메인 색상과 겹치지 않는 다른 색상 하나를 시드 기반으로 고르기
function pickOtherColor(birthdate, dateStr, salt, excludeIdxs) {
  let idx = seededIndex(birthdate, dateStr, salt, COLORS.length);
  let guard = 0;
  while (excludeIdxs.includes(idx) && guard < COLORS.length) {
    idx = (idx + 1) % COLORS.length;
    guard++;
  }
  return COLORS[idx];
}

// 생년월일 + 날짜 -> 오늘의 결과 계산 (같은 입력이면 항상 같은 결과)
function computeFortune(birthdate, dateStr) {
  const colorIdx = seededIndex(birthdate, dateStr, "color", COLORS.length);
  const fortuneIdx = seededIndex(birthdate, dateStr, "fortune", FORTUNE_TEMPLATES.length);
  const actionIdx = seededIndex(birthdate, dateStr, "action", ACTION_TIPS.length);

  const color = COLORS[colorIdx];
  const fortuneText = FORTUNE_TEMPLATES[fortuneIdx]
    .replaceAll("{color_ga}", withIGa(color.name))
    .replaceAll("{color_neun}", withEunNeun(color.name))
    .replaceAll("{color}", color.name);
  const actionText = ACTION_TIPS[actionIdx];

  const loveText = LOVE_FORTUNES[seededIndex(birthdate, dateStr, "love", LOVE_FORTUNES.length)];
  const moneyText = MONEY_FORTUNES[seededIndex(birthdate, dateStr, "money", MONEY_FORTUNES.length)];
  const healthText = HEALTH_FORTUNES[seededIndex(birthdate, dateStr, "health", HEALTH_FORTUNES.length)];
  const workText = WORK_FORTUNES[seededIndex(birthdate, dateStr, "work", WORK_FORTUNES.length)];

  const luckyItem = LUCKY_ITEMS[seededIndex(birthdate, dateStr, "item", LUCKY_ITEMS.length)];
  const luckyNumber = seededIndex(birthdate, dateStr, "number", 9) + 1;

  const matchColor = pickOtherColor(birthdate, dateStr, "match", [colorIdx]);
  const matchColorIdx = COLORS.indexOf(matchColor);
  const avoidColor = pickOtherColor(birthdate, dateStr, "avoid", [colorIdx, matchColorIdx]);

  const morningText = TIME_ADVICE.morning[seededIndex(birthdate, dateStr, "morning", TIME_ADVICE.morning.length)];
  const afternoonText = TIME_ADVICE.afternoon[seededIndex(birthdate, dateStr, "afternoon", TIME_ADVICE.afternoon.length)];
  const eveningText = TIME_ADVICE.evening[seededIndex(birthdate, dateStr, "evening", TIME_ADVICE.evening.length)];

  const quoteText = QUOTES[seededIndex(birthdate, dateStr, "quote", QUOTES.length)];

  return {
    color,
    fortuneText,
    actionText,
    categories: { love: loveText, money: moneyText, health: healthText, work: workText },
    luckyItem,
    luckyNumber,
    matchColor,
    avoidColor,
    timeAdvice: { morning: morningText, afternoon: afternoonText, evening: eveningText },
    quoteText,
  };
}

function hexToRgba(hex, alpha) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function formatDisplayDate(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const weekday = ["일", "월", "화", "수", "목", "금", "토"][
    new Date(Date.UTC(y, m - 1, d)).getUTCDay()
  ];
  return `${y}년 ${m}월 ${d}일 (${weekday})`;
}

/* ===================== 저장소 ===================== */

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
  } catch {
    return [];
  }
}

function saveTodayToHistory(dateStr, color) {
  const history = loadHistory();
  if (history.length && history[history.length - 1].date === dateStr) {
    return history; // 오늘 기록 이미 있음
  }
  history.push({ date: dateStr, name: color.name, hex: color.hex });
  while (history.length > MAX_HISTORY) history.shift();
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  return history;
}

/* ===================== 렌더링 ===================== */

const screenInput = document.getElementById("screen-input");
const screenResult = document.getElementById("screen-result");
const birthForm = document.getElementById("birth-form");
const birthdateInput = document.getElementById("birthdate");
const btnReset = document.getElementById("btn-reset");

function showInputScreen(prefillDate) {
  screenResult.classList.add("hidden");
  screenInput.classList.remove("hidden");
  if (prefillDate) birthdateInput.value = prefillDate;
}

function showResultScreen(birthdate) {
  const todayStr = getKSTDateString();
  const result = computeFortune(birthdate, todayStr);
  const { color, fortuneText, actionText, categories, luckyItem, luckyNumber, matchColor, avoidColor, timeAdvice, quoteText } = result;
  const history = saveTodayToHistory(todayStr, color);

  document.documentElement.style.setProperty("--accent", color.hex);
  document.documentElement.style.setProperty("--accent-soft", hexToRgba(color.hex, 0.18));

  document.getElementById("today-date-label").textContent = formatDisplayDate(todayStr);
  document.getElementById("greeting-label").textContent = "오늘의 컬러가 도착했어요";
  document.getElementById("color-orb").style.background = color.hex;
  document.getElementById("color-name").textContent = color.name;
  document.getElementById("color-hex").textContent = color.hex.toUpperCase();
  document.getElementById("color-keyword").textContent = color.keyword;
  document.getElementById("fortune-text").textContent = fortuneText;
  document.getElementById("action-text").textContent = actionText;

  document.getElementById("love-text").textContent = categories.love;
  document.getElementById("money-text").textContent = categories.money;
  document.getElementById("health-text").textContent = categories.health;
  document.getElementById("work-text").textContent = categories.work;

  document.getElementById("lucky-item-value").textContent = luckyItem;
  document.getElementById("lucky-number-value").textContent = luckyNumber;

  const matchSwatch = document.getElementById("match-color-swatch");
  matchSwatch.style.background = matchColor.hex;
  document.getElementById("match-color-value").textContent = matchColor.name;

  const avoidSwatch = document.getElementById("avoid-color-swatch");
  avoidSwatch.style.background = avoidColor.hex;
  document.getElementById("avoid-color-value").textContent = avoidColor.name;

  document.getElementById("morning-text").textContent = timeAdvice.morning;
  document.getElementById("afternoon-text").textContent = timeAdvice.afternoon;
  document.getElementById("evening-text").textContent = timeAdvice.evening;

  document.getElementById("quote-text").textContent = `“${quoteText}”`;

  renderHistory(history);

  screenInput.classList.add("hidden");
  screenResult.classList.remove("hidden");
}

function renderHistory(history) {
  const container = document.getElementById("history-list");
  container.innerHTML = "";

  if (!history.length) {
    container.innerHTML = '<p class="history-empty">기록이 여기 쌓여요.</p>';
    return;
  }

  // 최신 기록이 왼쪽에 오도록
  [...history].reverse().forEach((item) => {
    const wrap = document.createElement("div");
    wrap.className = "history-item";

    const swatch = document.createElement("div");
    swatch.className = "history-swatch";
    swatch.style.background = item.hex;

    const label = document.createElement("span");
    const [, m, d] = item.date.split("-");
    label.textContent = `${m}/${d}`;

    wrap.appendChild(swatch);
    wrap.appendChild(label);
    container.appendChild(wrap);
  });
}

/* ===================== 이벤트 ===================== */

birthForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = birthdateInput.value;
  if (!value) return;
  localStorage.setItem(BIRTHDATE_KEY, value);
  showResultScreen(value);
});

btnReset.addEventListener("click", () => {
  const saved = localStorage.getItem(BIRTHDATE_KEY);
  showInputScreen(saved);
});

/* ===================== 초기 진입 ===================== */

(function init() {
  const savedBirthdate = localStorage.getItem(BIRTHDATE_KEY);
  if (savedBirthdate) {
    showResultScreen(savedBirthdate);
  } else {
    showInputScreen();
  }
})();
