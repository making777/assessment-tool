/* =========================================================
   A.M.D.S.
   Ability & Magic Diagnostic System

   Adelheid Kreuz Institute
   ========================================================= */


/* ---------------------------------------------------------
   A1 : INPUT FORM
   --------------------------------------------------------- */

const diagnosisForm =
    document.getElementById("diagnosisForm");


if (diagnosisForm) {

    diagnosisForm.addEventListener("submit", function (event) {

        event.preventDefault();


        /* ---------------------------------------------
           選択式データ
        --------------------------------------------- */

        const hand =
            document.querySelector(
                'input[name="hand"]:checked'
            )?.value || "";


        const family =
            document.querySelector(
                'input[name="family"]:checked'
            )?.value || "";


        const blood =
            document.querySelector(
                'input[name="blood"]:checked'
            )?.value || "";


        const origin =
            document.querySelector(
                'input[name="origin"]:checked'
            )?.value || "";


        const time =
            document.querySelector(
                'input[name="time"]:checked'
            )?.value || "";


        const lineage =
            document.querySelector(
                'input[name="lineage"]:checked'
            )?.value || "";


        /* ---------------------------------------------
           生年月日
           
           年・月・日を別々に保存
        --------------------------------------------- */

        const birthYear =
            document.getElementById("birthYear")?.value || "";


        const birthMonth =
            document.getElementById("birthMonth")?.value || "";


        const birthDay =
            document.getElementById("birthDay")?.value || "";


        /* ---------------------------------------------
           星座
        --------------------------------------------- */

        const zodiac =
            document.getElementById("zodiac")?.value || "";


        /* ---------------------------------------------
           入力データ
        --------------------------------------------- */

        const data = {

            /* 生年月日 */
            birthYear:
                birthYear,

            birthMonth:
                birthMonth,

            birthDay:
                birthDay,


            /* その他の基本情報 */
            hand:
                hand,

            zodiac:
                zodiac,

            family:
                family,

            blood:
                blood,

            origin:
                origin,


            /* 数値入力 */
            phonetic:
                document.getElementById("phonetic")?.value || "",

            nameNumber:
                document.getElementById("nameNumber")?.value || "",


            /* その他 */
            time:
                time,

            lineage:
                lineage

        };


        /* ---------------------------------------------
           入力データを一時保存
        --------------------------------------------- */

        sessionStorage.setItem(
            "A_diagnosis",
            JSON.stringify(data)
        );


        /* ---------------------------------------------
           A2へ移動
        --------------------------------------------- */

        window.location.href = "A2.html";

    });

}


/* ---------------------------------------------------------
   共通データ取得
   --------------------------------------------------------- */

function getDiagnosisData() {

    const saved =
        sessionStorage.getItem("A_diagnosis");


    if (!saved) {
        return null;
    }


    try {

        return JSON.parse(saved);

    } catch (error) {

        return null;

    }

}


/* ---------------------------------------------------------
   A2 : ANALYSIS REPORT
   --------------------------------------------------------- */

const gradeElement =
    document.getElementById("grade");


if (gradeElement) {

    const data =
        getDiagnosisData();


    if (!data) {

        window.location.href = "A1.html";

    } else {

        /* ---------------------------------------------
           参考仕様で提示されていた暫定スコア
        --------------------------------------------- */

        let score = 70;


        score +=
            Number(data.phonetic) % 15;


        score +=
            Number(data.nameNumber) % 10;


        if (score > 99) {
            score = 99;
        }


        /* ---------------------------------------------
           ランク
        --------------------------------------------- */

        let grade;


        if (score >= 90) {

            grade = "S";

        } else if (score >= 80) {

            grade = "A";

        } else if (score >= 70) {

            grade = "B";

        } else {

            grade = "C";

        }


        /* ---------------------------------------------
           レポートID
        --------------------------------------------- */

        const reportId =
            "AMDS-" +
            Date.now().toString().slice(-6);


        /* ---------------------------------------------
           結果を保存
        --------------------------------------------- */

        const result = {

            score:
                score,

            grade:
                grade,

            reportId:
                reportId

        };


        sessionStorage.setItem(
            "A_result",
            JSON.stringify(result)
        );


        /* ---------------------------------------------
           A2へ表示
        --------------------------------------------- */

        const reportIdElement =
            document.getElementById("reportId");


        if (reportIdElement) {

            reportIdElement.textContent =
                reportId;

        }


        const bloodElement =
            document.getElementById("blood");


        if (bloodElement) {

            bloodElement.textContent =
                data.blood;

        }


        const zodiacElement =
            document.getElementById("zodiac");


        if (zodiacElement) {

            zodiacElement.textContent =
                data.zodiac;

        }


        const lineageElement =
            document.getElementById("lineage");


        if (lineageElement) {

            lineageElement.textContent =
                data.lineage;

        }


        const originElement =
            document.getElementById("origin");


        if (originElement) {

            originElement.textContent =
                data.origin;

        }


        const typeElement =
            document.getElementById("type");


        if (typeElement) {

            typeElement.textContent =
                data.blood + "型";

        }

    }

}


/* ---------------------------------------------------------
   A3 : DETAILED ANALYSIS
   --------------------------------------------------------- */

const detailGrade =
    document.getElementById("detailGrade");


if (detailGrade) {

    const data =
        getDiagnosisData();


    const savedResult =
        sessionStorage.getItem("A_result");


    if (!data || !savedResult) {

        window.location.href = "A1.html";

    } else {

        let result;


        try {

            result =
                JSON.parse(savedResult);

        } catch (error) {

            window.location.href = "A1.html";

        }


        if (result) {

            /* -----------------------------------------
               ランク
            ----------------------------------------- */

            detailGrade.textContent =
                result.grade;


            /* -----------------------------------------
               レポートID
            ----------------------------------------- */

            const reportId =
                document.getElementById(
                    "detailReportId"
                );


            if (reportId) {

                reportId.textContent =
                    result.reportId;

            }


            /* -----------------------------------------
               生年月日
               
               保存は別々。
               表示するときだけ結合。
            ----------------------------------------- */

            setText(
                "detailDate",

                data.birthYear +
                "年" +
                data.birthMonth +
                "月" +
                data.birthDay +
                "日"
            );


            /* -----------------------------------------
               その他の基本情報
            ----------------------------------------- */

            setText(
                "detailHand",
                data.hand
            );


            setText(
                "detailZodiac",
                data.zodiac
            );


            setText(
                "detailFamily",
                data.family
            );


            setText(
                "detailBlood",
                data.blood
            );


            setText(
                "detailOrigin",
                data.origin
            );


            /* -----------------------------------------
               数値入力
            ----------------------------------------- */

            setText(
                "detailPhonetic",
                data.phonetic + " 音"
            );


            setText(
                "detailNameNumber",
                data.nameNumber
            );


            /* -----------------------------------------
               その他
            ----------------------------------------- */

            setText(
                "detailTime",
                data.time
            );


            setText(
                "detailLineage",
                data.lineage
            );

        }

    }

}


/* ---------------------------------------------------------
   テキスト表示用
   --------------------------------------------------------- */

function setText(id, value) {

    const element =
        document.getElementById(id);


    if (element) {

        element.textContent =
            value || "—";

    }

}
