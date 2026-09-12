/* =========================================
   SEIYOMI RESEARCH INSTITUTE
   A / COMMON JAVASCRIPT
========================================= */


document.addEventListener("DOMContentLoaded", () => {

  /*
   * ================================
   * A1.html
   * 入力処理
   * ================================
   */

  const form =
    document.getElementById("diagnosisForm");


  if (form) {

    const error =
      document.getElementById("error");


    form.addEventListener("submit", (event) => {

      event.preventDefault();


      const hand =
        document.querySelector(
          'input[name="hand"]:checked'
        );


      const data = {

        date:
          document.getElementById("date").value,

        hand:
          hand ? hand.value : "",

        zodiac:
          document.getElementById("zodiac").value,

        family:
          document.getElementById("family").value,

        blood:
          document.getElementById("blood").value,

        origin:
          document.getElementById("origin").value,

        phonetic:
          document.getElementById("phonetic").value,

        nameNumber:
          document.getElementById("nameNumber").value,

        time:
          document.getElementById("time").value,

        lineage:
          document.getElementById("lineage").value

      };


      /*
       * 未入力チェック
       */

      const values = Object.values(data);


      if (
        values.some(
          value => !value
        )
      ) {

        error.textContent =
          "未入力の項目があります。すべて入力してください。";

        return;
      }


      error.textContent = "";


      /*
       * A2・A3へデータを渡す
       */

      sessionStorage.setItem(
        "A_diagnosis",
        JSON.stringify(data)
      );


      /*
       * A2へ移動
       */

      window.location.href =
        "A2.html";

    });


    /*
     * リセット
     */

    const resetButton =
      document.getElementById(
        "resetButton"
      );


    if (resetButton) {

      resetButton.addEventListener(
        "click",
        () => {

          form.reset();

          error.textContent = "";

        }
      );

    }

  }


  /*
   * ================================
   * A2.html
   * 結果表示
   * ================================
   */


  const gradeElement =
    document.getElementById("grade");


  if (gradeElement) {

    const raw =
      sessionStorage.getItem(
        "A_diagnosis"
      );


    /*
     * データがない場合
     */

    if (!raw) {

      window.location.href =
        "A1.html";

      return;

    }


    const data =
      JSON.parse(raw);


    /*
     * 現在の暫定計算式
     *
     * ※正式な診断式ではありません。
     * ※仕様変更時にここを変更します。
     */

    let score = 70;


    score +=
      Number(data.phonetic) % 15;


    score +=
      Number(data.nameNumber) % 10;


    if (score > 99) {

      score = 99;

    }


    /*
     * ランク
     */

    let grade = "C";


    if (score >= 90) {

      grade = "S";

    }
    else if (score >= 80) {

      grade = "A";

    }
    else if (score >= 70) {

      grade = "B";

    }


    /*
     * レポートID
     */

    const reportId =
      document.getElementById(
        "reportId"
      );


    if (reportId) {

      reportId.textContent =
        "AMDS-" +
        Date.now()
          .toString()
          .slice(-6);

    }


    /*
     * ランク表示
     */

    gradeElement.textContent =
      grade;


    /*
     * タイプ表示
     */

    const type =
      document.getElementById(
        "type"
      );


    if (type) {

      type.textContent =
        data.blood + "型系統";

    }


    /*
     * メッセージ
     */

    const message =
      document.getElementById(
        "message"
      );


    if (message) {

      message.textContent =
        "現在の入力条件から算出された暫定適性ランクです。";

    }


    /*
     * 結果一覧
     */

    const zodiac =
      document.getElementById(
        "rZodiac"
      );


    if (zodiac) {

      zodiac.textContent =
        data.zodiac;

    }


    const blood =
      document.getElementById(
        "rBlood"
      );


    if (blood) {

      blood.textContent =
        data.blood + "型";

    }


    const lineage =
      document.getElementById(
        "rLineage"
      );


    if (lineage) {

      lineage.textContent =
        data.lineage;

    }


    const origin =
      document.getElementById(
        "rOrigin"
      );


    if (origin) {

      origin.textContent =
        data.origin;

    }

  }


  /*
   * ================================
   * A3.html
   * 詳細情報表示
   * ================================
   */


  const detailDate =
    document.getElementById("date");


  const detailHand =
    document.getElementById("hand");


  const detailZodiac =
    document.getElementById("zodiac");


  const detailFamily =
    document.getElementById("family");


  const detailBlood =
    document.getElementById("blood");


  /*
   * A3に必要な要素がある場合
   */

  if (
    detailDate &&
    detailHand &&
    detailZodiac &&
    detailFamily &&
    detailBlood
  ) {

    const raw =
      sessionStorage.getItem(
        "A_diagnosis"
      );


    /*
     * データがない場合
     */

    if (!raw) {

      window.location.href =
        "A1.html";

      return;

    }


    const data =
      JSON.parse(raw);


    detailDate.textContent =
      data.date;


    detailHand.textContent =
      data.hand;


    detailZodiac.textContent =
      data.zodiac;


    detailFamily.textContent =
      data.family;


    detailBlood.textContent =
      data.blood + "型";


    const origin =
      document.getElementById(
        "origin"
      );


    if (origin) {

      origin.textContent =
        data.origin;

    }


    const phonetic =
      document.getElementById(
        "phonetic"
      );


    if (phonetic) {

      phonetic.textContent =
        data.phonetic;

    }


    const nameNumber =
      document.getElementById(
        "nameNumber"
      );


    if (nameNumber) {

      nameNumber.textContent =
        data.nameNumber;

    }


    const time =
      document.getElementById(
        "time"
      );


    if (time) {

      time.textContent =
        data.time;

    }


    const lineage =
      document.getElementById(
        "lineage"
      );


    if (lineage) {

      lineage.textContent =
        data.lineage;

    }

  }

});
