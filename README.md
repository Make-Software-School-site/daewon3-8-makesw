# Make-Software-SIte-html




<script>
  const ATPT_OFCDC_SC_CODE = "D10";     // 대구광역시교육청 코드
  const SD_SCHUL_CODE = "7240216";     // 대원고등학교 코드

  function getToday() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const date = String(today.getDate()).padStart(2, "0");

    return `${year}${month}${date}`;
  }

  async function loadMeal() {
    const mealList = document.getElementById("mealList");
    const today = getToday();

    const url =
      `https://open.neis.go.kr/hub/mealServiceDietInfo?` +
      `Type=json` +
      `&ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}` +
      `&SD_SCHUL_CODE=${SD_SCHUL_CODE}` +
      `&MLSV_YMD=${today}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      mealList.innerHTML = "";

      if (!data.mealServiceDietInfo) {
        mealList.innerHTML = "<li>오늘 등록된 급식 정보가 없습니다.</li>";
        return;
      }

      const mealData = data.mealServiceDietInfo[1].row[0];

      const menuText = mealData.DDISH_NM;

      const menus = menuText
        .replaceAll("<br/>", "\n")
        .split("\n")
        .map(menu => menu.replace(/\([^)]*\)/g, "").trim())
        .filter(menu => menu !== "");

      menus.forEach(menu => {
        const li = document.createElement("li");
        li.textContent = menu;
        mealList.appendChild(li);
      });

    } catch (error) {
      console.error(error);
      mealList.innerHTML = "<li>급식 정보를 불러오지 못했습니다.</li>";
    }
  }

  loadMeal();
</script>
