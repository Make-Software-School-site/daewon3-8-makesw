const ATPT_OFCDC_SC_CODE = "D10";
const SD_SCHUL_CODE = "7240216";
const API_KEY = "8e64777e23d64d1a8ff60b52917eab6d";

const BOOKMARK_STORAGE_KEY = "mesoActivityBookmarksV1";
const MISSION_STORAGE_KEY = "mesoDailyMissionV1";
const STREAK_STORAGE_KEY = "mesoMissionStreakV1";
const TIMETABLE_STORAGE_KEY = "mesoPersonalTimetableV1";
const GRADE_STORAGE_KEY = "mesoSubjectGradeV1";
const BINARY_BEST_KEY = "mesoBinaryBestV1";

const siteConfig = window.MESO_CONFIG || {};
const GOOGLE_SHEET_ID = (siteConfig.googleSheetId || "").trim();
const SHEET_NAMES = {
  notices: siteConfig.sheets?.notices || "공지사항",
  events: siteConfig.sheets?.events || "일정",
  schoolInfo: siteConfig.sheets?.schoolInfo || "학교정보"
};

const fallbackNotices = [
  {
    title: "개인 시간표를 먼저 설정해 주세요",
    content: "내 시간표를 설정 후 시간표를 저장해주세요",
    date: "2026-07-11",
    important: true,
    link: ""
  },
  {
    title: "공지사항 google sheet랑 연결해서 나오게 할거 ",
    content: "학교 공지나 그런거 받으면 여기에 올라오게 구글 시트로 연결해서 내용 보이게 할거야 아직은 연결 안했어",
    date: "2026-07-09",
    important: false,
    link: ""
  }
];

const fallbackEvents = [
  { name: "2027학년도 대학수학능력시험", date: "2026-11-19", type: "수능" },
  { name: "9월 모의평가", date: "2026-09-02", type: "모의고사" },
  { name: "여름방학식", date: "2026-07-21", type: "학교 일정" }
];

const fallbackSchoolInfo = [
  {
    category: "공식 안내",
    title: "대원고등학교 공식 홈페이지",
    content: "학교 공지, 학사 일정과 공식 교육 정보를 확인할 수 있습니다",
    link: "https://daewon.dge.hs.kr",
    linkText: "공식 홈페이지 열기 ↗"
  },
  {
    category: "내 시간표",
    title: "나만의 선택과목 시간표",
    content: "선택과목과 공강을 직접 입력하면 매일 첫 화면에 오늘 수업이 표시됩니다",
    link: "#home",
    linkText: "첫 화면에서 설정하기 ↑"
  },
  {
    category: "학생 활동",
    title: "디지털 관련 카드뉴스",
    content: "AI, 컴퓨터, 게임과 카드뉴스 활동을 둘러보세요",
    link: "#activities",
    linkText: "활동 탐색하기 →"
  }
];

const SCHOOL_GRADES = ["1", "2", "3"];
const SCHOOL_DAYS = [
  { key: "mon", label: "월요일" },
  { key: "tue", label: "화요일" },
  { key: "wed", label: "수요일" },
  { key: "thu", label: "목요일" },
  { key: "fri", label: "금요일" }
];
const PERIOD_COUNT = 7;
const preparingSlides = [
  {
    title: "준비중",
    body: "준비중"
  }
];

const activities = [
  {
    id: "ai-answer",
    type: "cardnews",
    typeLabel: "카드뉴스",
    topic: "AI 원리",
    duration: "5분",
    title: "생성형 AI는 어떻게 대답을 만들까?",
    description: "Ai가ㅏ 문장을 만드는 방식과 좋은 어떤 질문을 해야 좋은 결과를 얻을지 알아봅니다",
    thumb: "thumb-ai",
    thumbCode: "AI/01",
    slides: preparingSlides
  },
  {
    id: "binary-signal",
    type: "game",
    typeLabel: "게임",
    topic: "컴퓨터 원리",
    duration: "1분",
    title: "0과 1의 해독",
    description: "이진수를 십진수로 빠르게 바꾸며 컴퓨터가 숫자를 표현하는 방식을 익힙니다",
    thumb: "thumb-binary",
    thumbCode: "0101",
    slides: preparingSlides
  },
  {
    id: "web-anatomy",
    type: "project",
    typeLabel: "프로젝트",
    topic: "웹 개발",
    duration: "7분",
    title: "웹사이트는 어떤 뼈대로 만들어질까?",
    description: "HTML, CSS, JavaScript가 각각 맡는 역할을 이 MESO(MakE SOftware) 화면으로 살펴봅니다.",
    thumb: "thumb-web",
    thumbCode: "WEB/3",
    slides: preparingSlides
  }
];

const dailyMissions = [
  {
    category: "AI 기초",
    question: "생성형 AI에게 더 정확한 답을 받기 위한 질문으로 가장 적절한 것은?",
    options: [
      "인공지능 설명해 줘",
      "인공지능이 뭐야? 길게",
      "고등학생에게 생성형 AI의 원리를 예시 2개와 함께 5문장으로 설명해 줘",
      "알아서 가장 좋은 답을 만들어 줘"
    ],
    answer: 2,
    explanation: "대상, 주제, 형식과 분량을 구체적으로 제시하면 AI가 원하는 방향을 더 정확히 이해할 수 있습니다."
  },
  {
    category: "데이터 이해",
    question: "두 반의 만족도 차이를 비교하는 그래프에서 가장 먼저 확인할 것은?",
    options: ["그래프 색상", "세로축의 시작값과 단위", "제목의 글자 크기", "막대의 간격"],
    answer: 1,
    explanation: "세로축이 0이 아닌 값에서 시작하면 실제보다 차이가 훨씬 크게 보일 수 있습니다."
  },
  {
    category: "웹 기초",
    question: "웹페이지에서 버튼을 눌렀을 때 내용이 바뀌게 하는 역할과 가장 가까운 것은?",
    options: ["HTML", "CSS", "JavaScript", "이미지 파일"],
    answer: 2,
    explanation: "HTML은 구조, CSS는 표현, JavaScript는 사용자 입력에 따른 동작을 주로 담당합니다."
  },
  {
    category: "디지털 윤리",
    question: "출처가 불분명한 충격적인 AI 합성 영상을 발견했을 때 가장 먼저 할 행동은?",
    options: ["친구에게 바로 공유한다", "댓글로 사실이라고 알린다", "원본과 공식 출처를 확인한다", "화질을 높여 다시 올린다"],
    answer: 2,
    explanation: "감정을 자극하는 콘텐츠일수록 공유 전에 원본과 신뢰할 수 있는 공식 출처를 먼저 확인해야 합니다."
  },
  {
    category: "컴퓨터 원리",
    question: "이진수 1010을 십진수로 바꾸면 얼마일까요?",
    options: ["8", "10", "12", "14"],
    answer: 1,
    explanation: "1010은 8 + 0 + 2 + 0이므로 십진수 10입니다."
  }
];

const subjectSuggestionsByGrade = { 1: [], 2: [], 3: [] };
let currentFilter = "all";
let currentActivity = null;
let currentSlideIndex = 0;
let toastTimer;
let timetableInitialized = false;
let subjectSuggestionsLoaded = false;
let binaryTimer;
let binaryScore = 0;
let binaryAnswer = 0;

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch (error) {
    console.error(error);
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

function showToast(message) {
  const toast = document.getElementById("toast");
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

function getDateString(dateObject, compact = false) {
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const date = String(dateObject.getDate()).padStart(2, "0");
  return compact ? `${year}${month}${date}` : `${year}-${month}-${date}`;
}

function getKoreanDateText(dateObject) {
  const dayNames = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  return `${dateObject.getFullYear()}년 ${dateObject.getMonth() + 1}월 ${dateObject.getDate()}일 ${dayNames[dateObject.getDay()]}`;
}

function initializeDate() {
  document.getElementById("todayDate").textContent = getKoreanDateText(new Date());
}

function parseCsv(csvText) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < csvText.length; index += 1) {
    const character = csvText[index];
    const nextCharacter = csvText[index + 1];

    if (character === '"' && quoted && nextCharacter === '"') {
      field += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === "," && !quoted) {
      row.push(field);
      field = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && nextCharacter === "\n") index += 1;
      row.push(field);
      if (row.some(value => value.trim() !== "")) rows.push(row);
      row = [];
      field = "";
    } else {
      field += character;
    }
  }

  row.push(field);
  if (row.some(value => value.trim() !== "")) rows.push(row);
  if (rows.length === 0) return [];

  const headers = rows[0].map(header => header.replace(/^\uFEFF/, "").trim());
  return rows.slice(1).map(values => Object.fromEntries(
    headers.map((header, index) => [header, (values[index] || "").trim()])
  ));
}

function pickValue(row, ...keys) {
  for (const key of keys) {
    if (row[key] !== undefined && row[key] !== "") return row[key];
  }
  return "";
}

function isPublicRow(value) {
  const normalized = String(value || "").trim().toLowerCase();
  return !["비공개", "숨김", "false", "n", "no", "0"].includes(normalized);
}

function isImportantValue(value) {
  return ["중요", "true", "y", "yes", "1"].includes(String(value || "").trim().toLowerCase());
}

function parseManagedDate(value) {
  const numbers = String(value || "").match(/\d+/g);
  if (!numbers || numbers.length < 3) return null;
  const [year, month, day] = numbers.map(Number);
  const date = new Date(year, month - 1, day);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatManagedDate(value) {
  const date = parseManagedDate(value);
  if (!date) return value || "날짜 미정";
  return `${date.getMonth() + 1}.${String(date.getDate()).padStart(2, "0")}`;
}

function sanitizeManagedLink(value) {
  const link = String(value || "").trim();
  return link.startsWith("https://") || link.startsWith("http://") || link.startsWith("#")
    ? link
    : "";
}

let sheetRequestId = 0;

function fetchSheetRows(sheetName) {
  return new Promise((resolve, reject) => {
    sheetRequestId += 1;
    const callbackName = `mesoSheetCallback${sheetRequestId}`;
    const script = document.createElement("script");
    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error(`${sheetName} 시트 요청 시간이 초과되었습니다.`));
    }, 10000);

    function cleanup() {
      clearTimeout(timeout);
      script.remove();
      delete window[callbackName];
    }

    window[callbackName] = response => {
      if (response.status !== "ok" || !response.table) {
        cleanup();
        reject(new Error(`${sheetName} 시트 응답을 읽지 못했습니다.`));
        return;
      }

      let headers = response.table.cols.map(column => (column.label || "").trim());
      let tableRows = response.table.rows;

      // Google Sheets may return the first row as data when every column is text.
      if (headers.every(header => !header) && tableRows.length > 0) {
        headers = tableRows[0].c.map(cell => String(cell?.f ?? cell?.v ?? "").trim());
        tableRows = tableRows.slice(1);
      }

      const rows = tableRows.map(tableRow => Object.fromEntries(
        headers.map((header, index) => {
          const cell = tableRow.c?.[index];
          return [header, String(cell?.f ?? cell?.v ?? "").trim()];
        })
      ));
      cleanup();
      resolve(rows);
    };

    script.onerror = () => {
      cleanup();
      reject(new Error(`${sheetName} 시트 스크립트를 불러오지 못했습니다.`));
    };

    const params = new URLSearchParams({
      tqx: `out:json;responseHandler:${callbackName}`,
      sheet: sheetName
    });
    script.src = `https://docs.google.com/spreadsheets/d/${encodeURIComponent(GOOGLE_SHEET_ID)}/gviz/tq?${params}`;
    document.head.appendChild(script);
  });
}

function mapNoticeRows(rows) {
  return rows
    .filter(row => isPublicRow(pickValue(row, "공개", "공개 여부", "visible")))
    .map(row => ({
      title: pickValue(row, "제목", "title"),
      content: pickValue(row, "내용", "content"),
      date: pickValue(row, "등록일", "날짜", "date"),
      important: isImportantValue(pickValue(row, "중요", "중요 여부", "important")),
      link: sanitizeManagedLink(pickValue(row, "링크", "link"))
    }))
    .filter(notice => notice.title);
}

function mapEventRows(rows) {
  return rows
    .filter(row => isPublicRow(pickValue(row, "공개", "공개 여부", "visible")))
    .map(row => ({
      name: pickValue(row, "일정명", "제목", "name"),
      date: pickValue(row, "날짜", "date"),
      type: pickValue(row, "종류", "type") || "학교 일정"
    }))
    .filter(event => event.name && parseManagedDate(event.date));
}

function mapSchoolInfoRows(rows) {
  return rows
    .filter(row => isPublicRow(pickValue(row, "공개", "공개 여부", "visible")))
    .map(row => ({
      category: pickValue(row, "항목", "분류", "category") || "학교 정보",
      title: pickValue(row, "제목", "title"),
      content: pickValue(row, "내용", "content"),
      link: sanitizeManagedLink(pickValue(row, "링크", "link")),
      linkText: pickValue(row, "링크 문구", "링크문구", "linkText") || "자세히 보기 →"
    }))
    .filter(info => info.title);
}

function renderDdays(events) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const preparedEvents = events
    .map(event => {
      const date = parseManagedDate(event.date);
      const difference = Math.round((date - today) / 86400000);
      return { ...event, dateObject: date, difference };
    })
    .filter(event => event.difference >= -30)
    .sort((a, b) => {
      if (a.difference >= 0 && b.difference < 0) return -1;
      if (a.difference < 0 && b.difference >= 0) return 1;
      return a.difference >= 0 ? a.difference - b.difference : b.difference - a.difference;
    })
    .slice(0, 3);
  const list = document.getElementById("ddayList");

  if (preparedEvents.length === 0) {
    list.innerHTML = '<div class="dday-item loading-card"><span>등록된 주요 일정이 없습니다.</span></div>';
    return;
  }

  list.replaceChildren(...preparedEvents.map(event => {
    const item = document.createElement("div");
    item.className = `dday-item${event.difference < 0 ? " past" : ""}`;
    const label = document.createElement("span");
    label.textContent = event.name;
    const countdown = document.createElement("strong");
    countdown.textContent = event.difference === 0
      ? "D-DAY"
      : event.difference > 0 ? `D-${event.difference}` : `D+${Math.abs(event.difference)}`;
    const meta = document.createElement("small");
    meta.textContent = `${event.type} · ${event.dateObject.getMonth() + 1}월 ${event.dateObject.getDate()}일`;
    item.append(label, countdown, meta);
    return item;
  }));
}

function renderNotices(notices) {
  const sortedNotices = [...notices]
    .sort((a, b) => Number(b.important) - Number(a.important)
      || (parseManagedDate(b.date)?.getTime() || 0) - (parseManagedDate(a.date)?.getTime() || 0))
    .slice(0, 4);
  const list = document.getElementById("noticeList");

  if (sortedNotices.length === 0) {
    list.innerHTML = '<p class="notice-empty">현재 공개된 공지사항이 없습니다.</p>';
    return;
  }

  list.replaceChildren(...sortedNotices.map(notice => {
    const item = document.createElement("article");
    item.className = `notice-item${notice.important ? " important" : ""}`;
    const date = document.createElement("time");
    date.textContent = formatManagedDate(notice.date);
    const title = document.createElement("strong");
    title.textContent = notice.title;
    const content = document.createElement("p");
    content.textContent = notice.content;

    if (notice.link) {
      const link = document.createElement("a");
      link.href = notice.link;
      if (notice.link.startsWith("http")) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
      link.append(title);
      item.append(date, link, content);
    } else {
      item.append(date, title, content);
    }
    return item;
  }));
}

function renderSchoolInfo(items) {
  const grid = document.getElementById("schoolInfoGrid");
  const visibleItems = items.slice(0, 3);
  if (visibleItems.length === 0) {
    grid.innerHTML = '<article class="school-info-card"><span>학교 정보</span><h3>등록된 학교 정보가 없습니다.</h3></article>';
    return;
  }

  grid.replaceChildren(...visibleItems.map(info => {
    const card = document.createElement("article");
    card.className = "school-info-card";
    const category = document.createElement("span");
    category.textContent = info.category.toUpperCase();
    const title = document.createElement("h3");
    title.textContent = info.title;
    const content = document.createElement("p");
    content.textContent = info.content;
    card.append(category, title, content);
    if (info.link) {
      const link = document.createElement("a");
      link.href = info.link;
      link.textContent = info.linkText;
      if (info.link.startsWith("http")) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
      card.appendChild(link);
    }
    return card;
  }));
}

async function loadManagedContent() {
  const sourceStatus = document.getElementById("dataSourceStatus");
  if (!GOOGLE_SHEET_ID) {
    renderNotices(fallbackNotices);
    renderDdays(fallbackEvents);
    renderSchoolInfo(fallbackSchoolInfo);
    sourceStatus.textContent = "샘플 데이터";
    return;
  }

  const results = await Promise.allSettled([
    fetchSheetRows(SHEET_NAMES.notices),
    fetchSheetRows(SHEET_NAMES.events),
    fetchSheetRows(SHEET_NAMES.schoolInfo)
  ]);
  const failed = results.some(result => result.status === "rejected");

  if (results[0].status === "fulfilled") renderNotices(mapNoticeRows(results[0].value));
  else renderNotices(fallbackNotices);
  if (results[1].status === "fulfilled") renderDdays(mapEventRows(results[1].value));
  else renderDdays(fallbackEvents);
  if (results[2].status === "fulfilled") renderSchoolInfo(mapSchoolInfoRows(results[2].value));
  else renderSchoolInfo(fallbackSchoolInfo);

  results.forEach(result => {
    if (result.status === "rejected") console.error(result.reason);
  });
  sourceStatus.textContent = failed ? "일부 기본 데이터" : "Google Sheets 연동";
}

function getBookmarks() {
  return new Set(readStorage(BOOKMARK_STORAGE_KEY, []));
}

function typeClass(type) {
  return `type-${type}`;
}

function createActivityCard(activity, bookmarks) {
  const article = document.createElement("article");
  const isSaved = bookmarks.has(activity.id);
  article.className = "activity-card";
  article.dataset.type = activity.type;
  article.dataset.id = activity.id;
  article.innerHTML = `
    <div class="activity-thumb ${activity.thumb}" aria-hidden="true">
      <span class="thumb-code">${activity.thumbCode}</span>
    </div>
    <div class="activity-card-body">
      <div class="activity-meta">
        <span class="type-badge ${typeClass(activity.type)}">${activity.typeLabel}</span>
        <span>${activity.topic}</span>
        <span>${activity.duration}</span>
      </div>
      <h3>${activity.title}</h3>
      <p class="activity-card-description">${activity.description}</p>
      <div class="activity-card-footer">
        <button class="activity-open" type="button" data-open-activity="${activity.id}">활동 열기 →</button>
        <button class="card-bookmark${isSaved ? " saved" : ""}" type="button" data-bookmark="${activity.id}" aria-label="${activity.title} ${isSaved ? "보관 해제" : "보관"}">${isSaved ? "✓" : "+"}</button>
      </div>
    </div>
  `;
  return article;
}

function renderActivities() {
  const grid = document.getElementById("activityGrid");
  const bookmarks = getBookmarks();
  const fragment = document.createDocumentFragment();

  activities.forEach(activity => fragment.appendChild(createActivityCard(activity, bookmarks)));
  grid.replaceChildren(fragment);
  document.getElementById("activityCount").textContent = String(activities.length).padStart(2, "0");
  updateBookmarkUI();
  applyActivityFilter();
}

function applyActivityFilter() {
  const bookmarks = getBookmarks();
  let visibleCount = 0;

  document.querySelectorAll(".activity-card").forEach(card => {
    const visible = currentFilter === "all"
      || card.dataset.type === currentFilter
      || (currentFilter === "saved" && bookmarks.has(card.dataset.id));
    card.hidden = !visible;
    if (visible) visibleCount += 1;
  });

  document.getElementById("emptyActivities").hidden = visibleCount !== 0;
}

function updateBookmarkUI() {
  const bookmarks = getBookmarks();
  document.getElementById("savedCount").textContent = bookmarks.size;

  document.querySelectorAll("[data-bookmark]").forEach(button => {
    const saved = bookmarks.has(button.dataset.bookmark);
    button.classList.toggle("saved", saved);
    if (button.classList.contains("card-bookmark")) {
      button.textContent = saved ? "✓" : "+";
      button.setAttribute("aria-label", `${saved ? "보관 해제" : "보관"}`);
    } else {
      button.innerHTML = `<span aria-hidden="true">${saved ? "✓" : "＋"}</span> ${saved ? "보관됨" : "보관하기"}`;
    }
  });
}

function toggleBookmark(activityId) {
  const bookmarks = getBookmarks();
  const activity = activities.find(item => item.id === activityId);

  if (bookmarks.has(activityId)) {
    bookmarks.delete(activityId);
    showToast("보관함에서 삭제했습니다.");
  } else {
    bookmarks.add(activityId);
    showToast(`‘${activity?.title || "활동"}’을 보관했습니다.`);
  }

  writeStorage(BOOKMARK_STORAGE_KEY, [...bookmarks]);
  updateBookmarkUI();
  if (currentFilter === "saved") applyActivityFilter();
}

function renderActivitySlide() {
  const slide = currentActivity.slides[currentSlideIndex];
  const slideBox = document.getElementById("cardnewsSlide");
  slideBox.replaceChildren();

  const number = document.createElement("span");
  number.className = "slide-number";
  number.textContent = `${currentActivity.typeLabel.toUpperCase()} · ${String(currentSlideIndex + 1).padStart(2, "0")}`;
  const title = document.createElement("h3");
  title.textContent = slide.title;
  const body = document.createElement("p");
  body.textContent = slide.body;
  slideBox.append(number, title, body);

  document.getElementById("slideProgress").textContent = `${currentSlideIndex + 1} / ${currentActivity.slides.length}`;
  document.getElementById("previousSlide").disabled = currentSlideIndex === 0;
  document.getElementById("nextSlide").disabled = currentSlideIndex === currentActivity.slides.length - 1;
}

function openActivity(activityId) {
  currentActivity = activities.find(activity => activity.id === activityId);
  if (!currentActivity) return;

  currentSlideIndex = 0;
  document.getElementById("dialogActivityMeta").innerHTML = `
    <span class="type-badge ${typeClass(currentActivity.type)}">${currentActivity.typeLabel}</span>
    <span>${currentActivity.topic}</span>
    <span>${currentActivity.duration}</span>
  `;
  document.getElementById("dialogActivityTitle").textContent = currentActivity.title;
  document.getElementById("dialogActivitySummary").textContent = currentActivity.description;
  renderActivitySlide();
  document.getElementById("activityDialog").showModal();
}

function connectActivityControls() {
  document.getElementById("activityGrid").addEventListener("click", event => {
    const openButton = event.target.closest("[data-open-activity]");
    const bookmarkButton = event.target.closest("[data-bookmark]");
    if (openButton) openActivity(openButton.dataset.openActivity);
    if (bookmarkButton) toggleBookmark(bookmarkButton.dataset.bookmark);
  });

  document.querySelectorAll("[data-open-activity]").forEach(button => {
    if (!button.closest("#activityGrid")) {
      button.addEventListener("click", () => openActivity(button.dataset.openActivity));
    }
  });

  document.querySelectorAll("[data-bookmark]").forEach(button => {
    if (!button.closest("#activityGrid")) {
      button.addEventListener("click", () => toggleBookmark(button.dataset.bookmark));
    }
  });

  document.querySelectorAll(".filter-button").forEach(button => {
    button.addEventListener("click", () => {
      currentFilter = button.dataset.filter;
      document.querySelectorAll(".filter-button").forEach(filterButton => {
        const active = filterButton === button;
        filterButton.classList.toggle("active", active);
        filterButton.setAttribute("aria-pressed", String(active));
      });
      applyActivityFilter();
    });
  });

  document.querySelector("[data-close-dialog]").addEventListener("click", () => {
    document.getElementById("activityDialog").close();
  });
  document.getElementById("previousSlide").addEventListener("click", () => {
    if (currentSlideIndex > 0) {
      currentSlideIndex -= 1;
      renderActivitySlide();
    }
  });
  document.getElementById("nextSlide").addEventListener("click", () => {
    if (currentSlideIndex < currentActivity.slides.length - 1) {
      currentSlideIndex += 1;
      renderActivitySlide();
    }
  });
}

function getDayIndex(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date - start) / 86400000);
}

function getTodayMission() {
  return dailyMissions[getDayIndex() % dailyMissions.length];
}

function getStreak() {
  return readStorage(STREAK_STORAGE_KEY, { count: 0, lastDate: "" });
}

function updateStreakDisplay() {
  const streak = getStreak();
  document.getElementById("streakCount").textContent = streak.count;
  document.getElementById("heroStreak").textContent = String(streak.count).padStart(2, "0");
}

function recordMissionParticipation() {
  const today = getDateString(new Date());
  const streak = getStreak();
  if (streak.lastDate === today) return;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  streak.count = streak.lastDate === getDateString(yesterday) ? streak.count + 1 : 1;
  streak.lastDate = today;
  writeStorage(STREAK_STORAGE_KEY, streak);
  updateStreakDisplay();
}

function answerMission(selectedIndex) {
  const mission = getTodayMission();
  const today = getDateString(new Date());
  const correct = selectedIndex === mission.answer;
  const state = { date: today, selectedIndex, correct };
  writeStorage(MISSION_STORAGE_KEY, state);
  recordMissionParticipation();
  renderMission();
  showToast(correct ? "정답입니다. 오늘의 기록을 완료했어요!" : "오늘의 도전을 기록했습니다.");
}

function renderMission() {
  const mission = getTodayMission();
  const today = getDateString(new Date());
  const state = readStorage(MISSION_STORAGE_KEY, null);
  const completed = state?.date === today;
  const optionsBox = document.getElementById("missionOptions");
  const fragment = document.createDocumentFragment();

  document.getElementById("missionNumber").textContent = `퀴즈 ${String((getDayIndex() % 999) + 1).padStart(3, "0")}`;
  document.getElementById("missionCategory").textContent = mission.category;
  document.getElementById("missionQuestion").textContent = mission.question;

  mission.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "mission-option";
    button.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
    button.disabled = completed;

    if (completed && index === mission.answer) button.classList.add("correct");
    if (completed && index === state.selectedIndex && !state.correct) button.classList.add("wrong");
    button.addEventListener("click", () => answerMission(index));
    fragment.appendChild(button);
  });

  optionsBox.replaceChildren(fragment);
  const result = document.getElementById("missionResult");
  if (completed) {
    result.innerHTML = `<strong>${state.correct ? "정답입니다." : "도전을 완료했습니다."}</strong> ${mission.explanation}`;
  } else {
    result.textContent = "답을 선택하면 해설과 오늘의 참여 기록이 저장됩니다.";
  }
  updateStreakDisplay();
}

async function loadMeal() {
  const headline = document.getElementById("mealHeadline");
  const preview = document.getElementById("mealPreview");
  const params = new URLSearchParams({
    KEY: API_KEY,
    Type: "json",
    ATPT_OFCDC_SC_CODE,
    SD_SCHUL_CODE,
    MLSV_YMD: getDateString(new Date(), true)
  });

  try {
    const response = await fetch(`https://open.neis.go.kr/hub/mealServiceDietInfo?${params}`);
    if (!response.ok) throw new Error(`급식 요청 실패: ${response.status}`);
    const data = await response.json();
    const meal = data.mealServiceDietInfo?.[1]?.row?.[0];
    if (!meal) {
      headline.textContent = "오늘은 등록된 급식이 없어요";
      preview.innerHTML = "<li>주말·휴일 또는 급식 정보가 없는 날입니다</li>";
      return;
    }

    const menus = (meal.DDISH_NM || "")
      .split(/<br\s*\/?\s*>/i)
      .map(menu => menu.replace(/\s*\([^)]*\)\s*/g, "").trim())
      .filter(Boolean);
    headline.textContent = menus.length > 1 ? `${menus[0]} 외 ${menus.length - 1}가지` : menus[0];
    preview.replaceChildren(...menus.map(menu => {
      const item = document.createElement("li");
      item.textContent = menu;
      return item;
    }));
  } catch (error) {
    console.error(error);
    headline.textContent = "급식 정보를 불러오지 못했어요";
    preview.innerHTML = "<li>잠시 후 페이지를 다시 확인해 주세요.</li>";
  }
}

function getTodayDayKey() {
  const day = new Date().getDay();
  return day >= 1 && day <= 5 ? SCHOOL_DAYS[day - 1] : null;
}

function renderTodaySchedule() {
  const day = getTodayDayKey();
  const savedTimetable = readStorage(TIMETABLE_STORAGE_KEY, {});
  const preview = document.getElementById("todaySchedulePreview");
  const headline = document.getElementById("scheduleHeadline");

  if (!day) {
    headline.textContent = "오늘은 수업이 없는 날이에요";
    preview.innerHTML = '<span class="empty-chip">주말에는 시간표가 없습니다</span>';
    return;
  }

  const subjects = [];
  for (let period = 1; period <= PERIOD_COUNT; period += 1) {
    const subject = savedTimetable[`${day.key}-${period}`];
    if (subject) subjects.push({ period, subject });
  }

  if (subjects.length === 0) {
    headline.textContent = "시간표를 설정해 주세요";
    preview.innerHTML = '<span class="empty-chip">아직 저장된 시간표가 없습니다.</span>';
    return;
  }

  headline.textContent = `${day.label} · ${subjects.length}개 일정`;
  preview.replaceChildren(...subjects.map(({ period, subject }) => {
    const chip = document.createElement("span");
    chip.className = `schedule-chip${subject === "공강" ? " free" : ""}`;
    chip.textContent = `${period} ${subject}`;
    return chip;
  }));
}

function getTimetableInput(dayKey, period) {
  return document.querySelector(`.timetable-input[data-day="${dayKey}"][data-period="${period}"]`);
}

function updateFreePeriodStyle(input) {
  input.classList.toggle("is-free-period", input.value.trim() === "공강");
}

function setTimetableStatus(message, state = "") {
  const status = document.getElementById("timetableSaveStatus");
  status.className = state;
  status.textContent = message;
}

function markTimetableUnsaved() {
  setTimetableStatus("변경사항이 있습니다. 저장 버튼을 눌러주세요.", "unsaved");
}

function createTimetableEditor() {
  const body = document.getElementById("timetableBody");
  const fragment = document.createDocumentFragment();

  for (let period = 1; period <= PERIOD_COUNT; period += 1) {
    const row = document.createElement("tr");
    const heading = document.createElement("th");
    heading.scope = "row";
    heading.textContent = `${period}교시`;
    row.appendChild(heading);

    SCHOOL_DAYS.forEach(day => {
      const cell = document.createElement("td");
      const input = document.createElement("input");
      input.type = "text";
      input.className = "timetable-input";
      input.dataset.day = day.key;
      input.dataset.period = period;
      input.setAttribute("list", "subjectSuggestions");
      input.setAttribute("maxlength", "30");
      input.setAttribute("placeholder", "과목/공강");
      input.setAttribute("aria-label", `${day.label} ${period}교시`);
      input.addEventListener("input", () => {
        updateFreePeriodStyle(input);
        markTimetableUnsaved();
      });
      cell.appendChild(input);
      row.appendChild(cell);
    });
    fragment.appendChild(row);
  }
  body.replaceChildren(fragment);
}

function loadSavedTimetable() {
  const timetable = readStorage(TIMETABLE_STORAGE_KEY, {});
  SCHOOL_DAYS.forEach(day => {
    for (let period = 1; period <= PERIOD_COUNT; period += 1) {
      const input = getTimetableInput(day.key, period);
      input.value = timetable[`${day.key}-${period}`] || "";
      updateFreePeriodStyle(input);
    }
  });
}

function saveTimetable() {
  const timetable = {};
  SCHOOL_DAYS.forEach(day => {
    for (let period = 1; period <= PERIOD_COUNT; period += 1) {
      const value = getTimetableInput(day.key, period).value.trim();
      if (value) timetable[`${day.key}-${period}`] = value;
    }
  });

  if (writeStorage(TIMETABLE_STORAGE_KEY, timetable)) {
    setTimetableStatus("저장 완료! 홈의 오늘 시간표에도 반영했습니다.", "success");
    renderTodaySchedule();
    showToast("시간표를 이 브라우저에 저장했습니다.");
  } else {
    setTimetableStatus("브라우저 저장소를 사용할 수 없어 저장하지 못했습니다.", "error");
  }
}

function resetTimetable() {
  if (!confirm("입력한 시간표를 모두 지울까요?")) return;
  if (!writeStorage(TIMETABLE_STORAGE_KEY, {})) {
    setTimetableStatus("시간표를 초기화하지 못했습니다.", "error");
    return;
  }
  document.querySelectorAll(".timetable-input").forEach(input => {
    input.value = "";
    updateFreePeriodStyle(input);
  });
  setTimetableStatus("입력한 시간표를 모두 초기화했습니다.");
  renderTodaySchedule();
}

function getMondayOfThisWeek(baseDate) {
  const date = new Date(baseDate);
  const day = date.getDay();
  date.setDate(date.getDate() + (day === 0 ? -6 : 1 - day));
  return date;
}

function normalizeSubjectName(subjectName) {
  return subjectName.replace(/^\[[^\]]+\]\s*/, "").trim();
}

async function fetchSubjectsByGrade(grade) {
  const endDate = getMondayOfThisWeek(new Date());
  endDate.setDate(endDate.getDate() + 4);
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 18);
  const params = new URLSearchParams({
    KEY: API_KEY,
    Type: "json",
    pIndex: "1",
    pSize: "1000",
    ATPT_OFCDC_SC_CODE,
    SD_SCHUL_CODE,
    TI_FROM_YMD: getDateString(startDate, true),
    TI_TO_YMD: getDateString(endDate, true),
    GRADE: grade
  });
  const response = await fetch(`https://open.neis.go.kr/hub/hisTimetable?${params}`);
  if (!response.ok) throw new Error(`NEIS 시간표 요청 실패: ${response.status}`);
  const data = await response.json();
  const rows = data.hisTimetable?.[1]?.row || [];
  const subjects = rows
    .filter(row => Number(row.CLASS_NM) >= 1 && Number(row.CLASS_NM) <= 8)
    .map(row => normalizeSubjectName(row.ITRT_CNTNT || ""))
    .filter(subject => subject && !subject.endsWith("휴업일"));
  return [...new Set(subjects)].sort((a, b) => a.localeCompare(b, "ko"));
}

function renderSubjectSuggestions() {
  const grade = document.getElementById("subjectGrade").value;
  const suggestions = [...new Set(["공강", "자습", ...(subjectSuggestionsByGrade[grade] || [])])];
  const list = document.getElementById("subjectSuggestions");
  list.replaceChildren(...suggestions.map(subject => {
    const option = document.createElement("option");
    option.value = subject;
    return option;
  }));

  if (subjectSuggestionsLoaded) {
    const count = (subjectSuggestionsByGrade[grade] || []).length;
    document.getElementById("subjectSourceStatus").textContent = count
      ? `${grade}학년 1~8반 기준 과목 ${count}개를 준비했습니다.`
      : "최근 NEIS 과목이 없습니다. 과목명은 직접 입력할 수 있습니다.";
  }
}

async function loadSubjectSuggestions() {
  if (subjectSuggestionsLoaded) return;
  const status = document.getElementById("subjectSourceStatus");
  status.classList.remove("error");
  status.textContent = "1~3학년 NEIS 과목 목록을 불러오는 중...";
  const results = await Promise.allSettled(SCHOOL_GRADES.map(fetchSubjectsByGrade));
  let failed = false;
  results.forEach((result, index) => {
    const grade = SCHOOL_GRADES[index];
    if (result.status === "fulfilled") {
      subjectSuggestionsByGrade[grade] = result.value;
    } else {
      failed = true;
      console.error(result.reason);
    }
  });
  subjectSuggestionsLoaded = true;
  status.classList.toggle("error", failed);
  renderSubjectSuggestions();
}

function initializeTimetableEditor() {
  if (timetableInitialized) return;
  createTimetableEditor();
  loadSavedTimetable();

  const gradeSelect = document.getElementById("subjectGrade");
  const savedGrade = String(readStorage(GRADE_STORAGE_KEY, "3"));
  gradeSelect.value = SCHOOL_GRADES.includes(savedGrade) ? savedGrade : "3";
  gradeSelect.addEventListener("change", () => {
    writeStorage(GRADE_STORAGE_KEY, gradeSelect.value);
    renderSubjectSuggestions();
  });
  document.getElementById("saveTimetableBtn").addEventListener("click", saveTimetable);
  document.getElementById("resetTimetableBtn").addEventListener("click", resetTimetable);
  timetableInitialized = true;
}

function openTimetable() {
  initializeTimetableEditor();
  const dialog = document.getElementById("timetableDialog");
  if (!dialog.open) dialog.showModal();
  loadSubjectSuggestions();
}

function connectTimetableControls() {
  document.querySelectorAll("[data-open-timetable]").forEach(button => {
    button.addEventListener("click", openTimetable);
  });
  document.querySelector("[data-close-timetable]").addEventListener("click", () => {
    document.getElementById("timetableDialog").close();
  });
}

function newBinaryQuestion() {
  binaryAnswer = Math.floor(Math.random() * 31) + 1;
  document.getElementById("binaryQuestion").textContent = binaryAnswer.toString(2).padStart(5, "0");
  document.getElementById("binaryAnswer").value = "";
  document.getElementById("binaryAnswer").focus();
}

function endBinaryGame() {
  clearInterval(binaryTimer);
  binaryTimer = null;
  const input = document.getElementById("binaryAnswer");
  const submit = document.querySelector("#binaryForm button");
  input.disabled = true;
  submit.disabled = true;
  const previousBest = readStorage(BINARY_BEST_KEY, 0);
  const best = Math.max(previousBest, binaryScore);
  writeStorage(BINARY_BEST_KEY, best);
  document.getElementById("binaryPrompt").textContent = `게임 종료 · ${binaryScore}점 · 최고 기록 ${best}점`;
  document.getElementById("startBinaryGame").textContent = "다시 시작";
}

function startBinaryGame() {
  clearInterval(binaryTimer);
  binaryScore = 0;
  let remaining = 30;
  document.getElementById("binaryScore").textContent = binaryScore;
  document.getElementById("binaryTime").textContent = remaining;
  document.getElementById("binaryPrompt").textContent = "이진수를 십진수로 바꿔 입력하세요.";
  document.getElementById("binaryAnswer").disabled = false;
  document.querySelector("#binaryForm button").disabled = false;
  document.getElementById("startBinaryGame").textContent = "게임 진행 중";
  newBinaryQuestion();

  binaryTimer = setInterval(() => {
    remaining -= 1;
    document.getElementById("binaryTime").textContent = remaining;
    if (remaining <= 0) endBinaryGame();
  }, 1000);
}

function connectBinaryGame() {
  document.getElementById("startBinaryGame").addEventListener("click", startBinaryGame);
  document.getElementById("binaryForm").addEventListener("submit", event => {
    event.preventDefault();
    if (!binaryTimer) return;
    const input = document.getElementById("binaryAnswer");
    if (Number(input.value) === binaryAnswer) {
      binaryScore += 1;
      document.getElementById("binaryScore").textContent = binaryScore;
      document.getElementById("binaryPrompt").textContent = "정답! 다음 신호를 해독하세요.";
      newBinaryQuestion();
    } else {
      document.getElementById("binaryPrompt").textContent = "다시 계산해 보세요.";
      input.select();
    }
  });
}

function connectDialogBackdrops() {
  document.querySelectorAll("dialog").forEach(dialog => {
    dialog.addEventListener("click", event => {
      if (event.target === dialog) dialog.close();
    });
  });
}

function initializeRevealAnimations() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".reveal").forEach(element => element.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
}

function initialize() {
  initializeDate();
  loadManagedContent();
  renderActivities();
  connectActivityControls();
  renderMission();
  loadMeal();
  renderTodaySchedule();
  connectTimetableControls();
  connectBinaryGame();
  connectDialogBackdrops();
  initializeRevealAnimations();
}

initialize();
