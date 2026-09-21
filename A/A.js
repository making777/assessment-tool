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


            const zodiac =
                document.getElementById(
                    "zodiac"
                )?.value || "";


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


            sessionStorage.setItem(
                "A_diagnosis",
                JSON.stringify(data)
            );


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


        /*
         * 将来的に正式な解析処理が決定した場合は、
         * ここへ解析結果を追加できる。
         *
         * 例：
         *
         * attributeType:
         * "放出型"
         *
         * primaryMagicAttribute:
         * "炎"
         *
         * forbiddenMagicAttribute:
         * "水"
         *
         * など。
         *
         * 現時点では正式判定式未確定のため、
         * 勝手に計算しない。
         */


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
           危険度
           
           正式な判定結果が存在する場合のみ表示。
           75以上の場合はCSSクラスを付与。
           正式判定値がない場合は「未判定」。
        --------------------------------------------- */

        setText(
            "dangerLevel",
            data.dangerLevel ||
            "未判定"
        );


        setText(
            "dangerDescription",
            data.dangerDescription ||
            "異能力・魔法が周囲へ及ぼす危険性を解析します。"
        );


        setText(
            "rampageRate",
            data.rampageRate ||
            "未判定"
        );


        const dangerCard =
            document.querySelector(
                ".classification-card.danger-card"
            );


        if (dangerCard) {

            dangerCard.classList.remove(
                "is-high-risk"
            );


            const dangerValue =
                Number(data.dangerLevel);


            if (
                Number.isFinite(dangerValue) &&
                dangerValue >= 75
            ) {

                dangerCard.classList.add(
                    "is-high-risk"
                );

            }

        }


        /* ---------------------------------------------
           属性適性
           
           正式な判定結果が存在する場合のみ表示。
           それ以外は「未判定」。
        --------------------------------------------- */

        setText(
            "magicAttribute",
            data.attributeType ||
            "未判定"
        );


        /* ---------------------------------------------
           魔法属性
        --------------------------------------------- */

        setText(
            "primaryMagicAttribute",
            data.primaryMagicAttribute ||
            "未判定"
        );


        setText(
            "forbiddenMagicAttribute",
            data.forbiddenMagicAttribute ||
            "未判定"
        );


        setText(
            "magicAttributeDetails",
            data.magicAttributeDetails ||
            "魔法属性に関する詳細情報は未判定です。"
        );


        /* ---------------------------------------------
           固有能力
        --------------------------------------------- */

        setText(
            "uniqueAbilityName",
            data.uniqueAbilityName ||
            "未判定"
        );


        setText(
            "uniqueAbilityDescription",
            data.uniqueAbilityDescription ||
            "固有能力の詳細は解析後に表示されます。"
        );


        setText(
            "activationMethod",
            data.activationMethod ||
            "未判定"
        );


        setText(
            "abilityDanger",
            data.abilityDanger ||
            "未判定"
        );


        setText(
            "abilityStability",
            data.abilityStability ||
            "未判定"
        );


        setText(
            "abilityDetails",
            data.abilityDetails ||
            "固有能力に関する詳細情報は未判定です。"
        );


        /* ---------------------------------------------
           8つの本質
        --------------------------------------------- */

        const essences = [
            data.essence1,
            data.essence2,
            data.essence3,
            data.essence4,
            data.essence5,
            data.essence6,
            data.essence7,
            data.essence8
        ];


        essences.forEach(
            function (value, index) {

                setText(
                    "essence" + (index + 1),
                    value || "未判定"
                );

            }
        );


        /* ---------------------------------------------
           総合所見
        --------------------------------------------- */

        setText(
            "overallComment",
            data.overallComment ||
            "総合所見は解析後に表示されます。"
        );


        /* ---------------------------------------------
           推奨事項
        --------------------------------------------- */

        const recommendationList =
            document.getElementById(
                "recommendationList"
            );


        if (
            recommendationList &&
            Array.isArray(data.recommendations)
        ) {

            recommendationList.innerHTML = "";


            data.recommendations.forEach(
                function (recommendation) {

                    const li =
                        document.createElement("li");

                    li.textContent =
                        recommendation;

                    recommendationList.appendChild(li);

                }
            );

        }


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
   A2 : 能力値サマリー
--------------------------------------------------------- */

function updateAbilitySummary() {

    const abilityDefinitions = [

        {
            code: "POW",
            id: "powValue"
        },

        {
            code: "MAG",
            id: "magValue"
        },

        {
            code: "CON",
            id: "conValue"
        },

        {
            code: "SPD",
            id: "spdValue"
        },

        {
            code: "RGE",
            id: "rgeValue"
        },

        {
            code: "DUR",
            id: "durValue"
        },

        {
            code: "RES",
            id: "resValue"
        },

        {
            code: "SEN",
            id: "senValue"
        },

        {
            code: "STA",
            id: "staValue"
        },

        {
            code: "SYN",
            id: "synValue"
        }

    ];


    const values = [];


    abilityDefinitions.forEach(
        function (ability) {

            const element =
                document.getElementById(
                    ability.id
                );


            if (!element) {
                return;
            }


            const rawValue =
                element.textContent
                    .trim()
                    .replace(
                        /,/g,
                        ""
                    );


            if (
                rawValue === "" ||
                rawValue === "—" ||
                rawValue === "--"
            ) {
                return;
            }


            const value =
                Number(rawValue);


            if (!Number.isFinite(value)) {
                return;
            }


            values.push({

                code:
                    ability.code,

                value:
                    value

            });

        }
    );


    const averageElement =
        document.getElementById(
            "abilityAverage"
        );


    const maximumElement =
        document.getElementById(
            "abilityMaximum"
        );


    const minimumElement =
        document.getElementById(
            "abilityMinimum"
        );


    if (
        !averageElement ||
        !maximumElement ||
        !minimumElement
    ) {
        return;
    }


    if (values.length === 0) {

        averageElement.textContent = "—";
        maximumElement.textContent = "—";
        minimumElement.textContent = "—";

        return;

    }


    /* ---------------------------------------------
       平均値
    --------------------------------------------- */

    const total =
        values.reduce(
            function (sum, item) {

                return sum + item.value;

            },
            0
        );


    const average =
        total / values.length;


    averageElement.textContent =
        average.toFixed(1);


    /* ---------------------------------------------
       最高値
    --------------------------------------------- */

    const maximumValue =
        Math.max(
            ...values.map(
                function (item) {
                    return item.value;
                }
            )
        );


    const maximumAbilities =
        values
            .filter(
                function (item) {

                    return item.value ===
                        maximumValue;

                }
            )
            .map(
                function (item) {

                    return item.code;

                }
            );


    maximumElement.textContent =
        maximumAbilities.join(" / ") +
        " " +
        maximumValue;


    /* ---------------------------------------------
       最低値
    --------------------------------------------- */

    const minimumValue =
        Math.min(
            ...values.map(
                function (item) {
                    return item.value;
                }
            )
        );


    const minimumAbilities =
        values
            .filter(
                function (item) {

                    return item.value ===
                        minimumValue;

                }
            )
            .map(
                function (item) {

                    return item.code;

                }
            );


    minimumElement.textContent =
        minimumAbilities.join(" / ") +
        " " +
        minimumValue;

}


/* ---------------------------------------------------------
   能力値変更監視
--------------------------------------------------------- */

if (
    document.getElementById("abilityAverage") ||
    document.getElementById("abilityMaximum") ||
    document.getElementById("abilityMinimum")
) {

    const abilityValueIds = [

        "powValue",
        "magValue",
        "conValue",
        "spdValue",
        "rgeValue",
        "durValue",
        "resValue",
        "senValue",
        "staValue",
        "synValue"

    ];


    updateAbilitySummary();


    const abilityObservers = [];


    abilityValueIds.forEach(
        function (id) {

            const element =
                document.getElementById(id);


            if (!element) {
                return;
            }


            const observer =
                new MutationObserver(
                    function () {

                        updateAbilitySummary();

                    }
                );


            observer.observe(
                element,
                {
                    childList: true,
                    characterData: true,
                    subtree: true
                }
            );


            abilityObservers.push(
                observer
            );

        }
    );

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