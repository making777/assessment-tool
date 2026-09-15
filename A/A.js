/* =========================================================
   A.M.D.S.
   Ability & Magic Diagnostic System

   Adelheid Kreuz Institute
   ========================================================= */


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
   共通テキスト表示
--------------------------------------------------------- */

function setText(id, value) {

    const element =
        document.getElementById(id);

    if (element) {

        element.textContent =
            value !== undefined &&
            value !== null &&
            value !== ""
                ? value
                : "—";

    }

}


/* ---------------------------------------------------------
   解析ID生成
---------------------------------------------------------

   現在は正式仕様未確定のため、
   「入力情報から同じIDを再現する」
   ための暫定方式。

   ※ Date.now() は使用しない。
--------------------------------------------------------- */

function generateAnalysisId(data) {

    const source =
        [
            data.birthYear,
            data.birthMonth,
            data.birthDay,
            data.hand,
            data.zodiac,
            data.family,
            data.blood,
            data.origin,
            data.phonetic,
            data.nameNumber,
            data.time,
            data.lineage
        ].join("|");


    let hash = 0;


    for (let i = 0; i < source.length; i++) {

        hash =
            ((hash << 5) - hash) +
            source.charCodeAt(i);

        hash |= 0;

    }


    hash =
        Math.abs(hash);


    const number =
        String(hash % 1000000)
            .padStart(6, "0");


    return "AMDS-" + number;

}


/* ---------------------------------------------------------
   解析担当者
---------------------------------------------------------

   出生月によって担当者を決定。

   1・2月 → グレタ・ウェーバー
   3・4月 → 鈴木明
   5・6月 → ジェルマン・モレル
   7・8月 → アドニス・ランベール
   9・10月 → 李昕玥リー・シンユエLi Xīnyuè
   11・12月 → オリバー・スミス
--------------------------------------------------------- */

function getResearcherName(birthMonth) {

    const month =
        Number(birthMonth);


    const researchers = {

        A: "Greta・Weber",
        B: "Mei Suzuki",
        C: "Germain・Morel",
        D: "Lambert・Lambert",
        E: "Li Xīnyuè",
        F: "Oliver・Smith"

    };


    if (month === 1 || month === 2) {

        return researchers.A;

    }

    if (month === 3 || month === 4) {

        return researchers.B;

    }

    if (month === 5 || month === 6) {

        return researchers.C;

    }

    if (month === 7 || month === 8) {

        return researchers.D;

    }

    if (month === 9 || month === 10) {

        return researchers.E;

    }

    if (month === 11 || month === 12) {

        return researchers.F;

    }


    return "未割当";

}


/* ---------------------------------------------------------
   A1 : INPUT FORM
--------------------------------------------------------- */

const diagnosisForm =
    document.getElementById("diagnosisForm");


if (diagnosisForm) {

    diagnosisForm.addEventListener(
        "submit",
        function (event) {

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
            --------------------------------------------- */

            const birthYear =
                document.getElementById(
                    "birthYear"
                )?.value || "";


            const birthMonth =
                document.getElementById(
                    "birthMonth"
                )?.value || "";


            const birthDay =
                document.getElementById(
                    "birthDay"
                )?.value || "";


            /* ---------------------------------------------
               星座
            --------------------------------------------- */

            const zodiac =
                document.getElementById(
                    "zodiac"
                )?.value || "";


            /* ---------------------------------------------
               入力データ
            --------------------------------------------- */

            const data = {

                birthYear:
                    birthYear,

                birthMonth:
                    birthMonth,

                birthDay:
                    birthDay,

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

                phonetic:
                    document.getElementById(
                        "phonetic"
                    )?.value || "",

                nameNumber:
                    document.getElementById(
                        "nameNumber"
                    )?.value || "",

                time:
                    time,

                lineage:
                    lineage

            };


            /* ---------------------------------------------
               入力データ保存
            --------------------------------------------- */

            sessionStorage.setItem(
                "A_diagnosis",
                JSON.stringify(data)
            );


            /* ---------------------------------------------
               A2へ移動
            --------------------------------------------- */

            window.location.href =
                "A2.html";

        }
    );

}


/* ---------------------------------------------------------
   A2 : ANALYSIS REPORT
--------------------------------------------------------- */

if (
    document.getElementById("analysisId") ||
    document.getElementById("analysisSubjectId")
) {

    const data =
        getDiagnosisData();


    if (!data) {

        window.location.href =
            "A1.html";

    } else {

        /* ---------------------------------------------
           解析ID
        --------------------------------------------- */

        const analysisId =
            generateAnalysisId(data);


        /* ---------------------------------------------
           暫定スコア
           
           ※能力値の正式計算式が未確定のため、
             現在の暫定処理を維持。
        --------------------------------------------- */

        let score = 70;


        score +=
            Number(data.phonetic || 0) % 15;


        score +=
            Number(data.nameNumber || 0) % 10;


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
           結果保存
        --------------------------------------------- */

        const result = {

            score:
                score,

            grade:
                grade,

            reportId:
                analysisId

        };


        sessionStorage.setItem(
            "A_result",
            JSON.stringify(result)
        );


        /* ---------------------------------------------
           解析ID
        --------------------------------------------- */

        setText(
            "analysisId",
            analysisId
        );


        setText(
            "analysisSubjectId",
            analysisId
        );


        setText(
            "barcodeText",
            analysisId
        );


        /* ---------------------------------------------
           総合評価
        --------------------------------------------- */

        setText(
            "overallRank",
            grade
        );


        setText(
            "overallScore",
            score
        );


        /* ---------------------------------------------
           基本情報
        --------------------------------------------- */

        setText(
            "birthDate",

            data.birthYear +
            "年" +
            data.birthMonth +
            "月" +
            data.birthDay +
            "日"
        );


        setText(
            "bloodType",
            data.blood
        );


        setText(
            "originType",
            data.origin
        );


        setText(
            "zodiac",
            data.zodiac
        );


        setText(
            "familyType",
            data.family
        );


        setText(
            "handedness",
            data.hand
        );


        setText(
            "birthTime",
            data.time
        );


        /* ---------------------------------------------
           解析担当者
        --------------------------------------------- */

        const researcher =
            getResearcherName(
                data.birthMonth
            );


        setText(
            "researcherSignature",
            researcher
        );


        /* ---------------------------------------------
           暫定解析信頼度
           
           入力情報が不足している場合は
           信頼度を下げる。

           ※正式な信頼度計算式は未確定。
        --------------------------------------------- */

        let reliability = 100;


        const requiredValues = [

            data.birthYear,
            data.birthMonth,
            data.birthDay,
            data.hand,
            data.zodiac,
            data.family,
            data.blood,
            data.origin,
            data.phonetic,
            data.nameNumber,
            data.time,
            data.lineage

        ];


        const missingCount =
            requiredValues.filter(
                value =>
                    value === undefined ||
                    value === null ||
                    value === ""
            ).length;


        reliability =
            Math.max(
                0,
                100 - missingCount * 5
            );


        setText(
            "analysisReliability",
            reliability + "%"
        );


        /* ---------------------------------------------
           暫定説明
        --------------------------------------------- */

        setText(
            "overallDescription",
            "入力された基礎情報をもとに暫定解析を実施しています。"
        );

    }

}


/* ---------------------------------------------------------
   A3 : DETAILED ANALYSIS
--------------------------------------------------------- */

const detailGrade =
    document.getElementById(
        "detailGrade"
    );


if (detailGrade) {

    const data =
        getDiagnosisData();


    const savedResult =
        sessionStorage.getItem(
            "A_result"
        );


    if (!data || !savedResult) {

        window.location.href =
            "A1.html";

    } else {

        let result;


        try {

            result =
                JSON.parse(savedResult);

        } catch (error) {

            window.location.href =
                "A1.html";

            result = null;

        }


        if (result) {

            /* -----------------------------------------
               ランク
            ----------------------------------------- */

            setText(
                "detailGrade",
                result.grade
            );


            /* -----------------------------------------
               解析ID
            ----------------------------------------- */

            setText(
                "detailReportId",
                result.reportId
            );


            /* -----------------------------------------
               生年月日
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
                data.phonetic
                    ? data.phonetic + " 音"
                    : "—"
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
