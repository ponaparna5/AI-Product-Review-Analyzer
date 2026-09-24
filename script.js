const reviewInput = document.getElementById("reviewInput");
const characterCount = document.getElementById("characterCount");
const analyzeButton = document.getElementById("analyzeButton");
const formHint = document.getElementById("formHint");

const sentimentResult = document.getElementById("sentimentResult");
const confidenceResult = document.getElementById("confidenceResult");
const confidenceBar = document.getElementById("confidenceBar");
const ratingResult = document.getElementById("ratingResult");
const categoryResult = document.getElementById("categoryResult");
const summaryResult = document.getElementById("summaryResult");
const markedReview = document.getElementById("markedReview");
const verdictCard = document.getElementById("verdictCard");
const needle = document.getElementById("needle");


/* Character counter */

function updateCount() {
    const length = reviewInput.value.length;

    characterCount.textContent =
        length + (length === 1 ? " character" : " characters");
}

reviewInput.addEventListener("input", function () {
    formHint.textContent = "";
    updateCount();
});


/* Sample review buttons */

document.querySelectorAll(".chip").forEach(function (chip) {

    chip.addEventListener("click", function () {

        reviewInput.value = chip.dataset.text;

        formHint.textContent = "";

        updateCount();

        reviewInput.focus();
    });

});


/* Escape HTML */

function escapeHTML(text) {

    return text.replace(/[&<>"']/g, function (c) {

        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[c];

    });

}


/* Highlight important words */

const POSITIVE = [
    "excellent",
    "great",
    "love",
    "amazing",
    "satisfied",
    "happy",
    "good",
    "fast",
    "value",
    "gorgeous",
    "perfect",
    "quality",
    "best"
];

const NEGATIVE = [
    "terrible",
    "awful",
    "bad",
    "broke",
    "cracked",
    "disappointing",
    "slow",
    "ignored",
    "worst",
    "poor",
    "refund",
    "stopped"
];


function markUp(review) {

    const words = POSITIVE.concat(NEGATIVE);

    const pattern =
        new RegExp("\\b(" + words.join("|") + ")\\w*", "gi");

    let n = 0;

    return escapeHTML(review).replace(
        pattern,
        function (match) {

            const type =
                POSITIVE.includes(match.toLowerCase())
                    ? "pos"
                    : "neg";

            return (
                '<mark class="' +
                type +
                '" style="animation-delay:' +
                (n++ * 0.1) +
                's">' +
                match +
                "</mark>"
            );

        }
    );

}


/* Show result */

function showResult(result, review) {

    const sentiment =
        result.sentiment.toString().toLowerCase();

    let tone = "neu";

    if (sentiment.includes("positive")) {
        tone = "pos";
    }
    else if (sentiment.includes("negative")) {
        tone = "neg";
    }

    /* Sentiment */

    sentimentResult.textContent =
        result.sentiment;


    /* Confidence */

    confidenceResult.textContent =
        result.confidence + "%";

    confidenceBar.style.width =
        result.confidence + "%";


    /* Rating */

    let rating = 3;

    if (sentiment.includes("positive")) {
        rating = 5;
    }
    else if (sentiment.includes("negative")) {
        rating = 2;
    }

    ratingResult.textContent =
        "★".repeat(rating) +
        "☆".repeat(5 - rating);


    /* Category */

    categoryResult.textContent =
        result.category || "Product Review";


    /* Summary */

    if (sentiment.includes("positive")) {

        summaryResult.textContent =
            "The customer has expressed a positive opinion about the product.";

    }
    else if (sentiment.includes("negative")) {

        summaryResult.textContent =
            "The customer has expressed a negative opinion about the product.";

    }
    else {

        summaryResult.textContent =
            "The customer has provided neutral feedback about the product.";

    }


    /* Sentiment spectrum */

    verdictCard.dataset.tone = tone;


    let position = 50;

    if (sentiment.includes("positive")) {
        position = 85;
    }
    else if (sentiment.includes("negative")) {
        position = 15;
    }

    needle.style.setProperty(
        "--at",
        position
    );


    /* Marked review */

    markedReview.classList.remove("done");

    markedReview.innerHTML =
        markUp(review);

    void markedReview.offsetWidth;

    markedReview.classList.add("done");

}


/* Analyze review */

analyzeButton.addEventListener("click", async function () {

    const review =
        reviewInput.value.trim();


    /* Empty review */

    if (review === "") {

        formHint.textContent =
            "Enter a review first, or pick a sample above.";

        reviewInput.focus();

        return;
    }


    /* Loading */

    analyzeButton.textContent =
        "Analyzing...";

    analyzeButton.disabled =
        true;

    formHint.textContent =
        "Connecting to AI model...";


    try {

        /* Send review to Flask */

        const response =
            await fetch(
                "https://ai-product-review-analyzer-rzyo.onrender.com/analyze",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        review: review
                    })
                }
            );


        /* Read response */

        const result =
            await response.json();


        /* Backend error */

        if (!response.ok) {

            throw new Error(
                result.error ||
                "Analysis failed."
            );

        }


        /* Display result */

        showResult(
            result,
            review
        );


        formHint.textContent =
            "Analysis completed successfully.";

        formHint.style.color =
            "#4be3ac";


        /* Scroll to results */

        document
            .getElementById("results")
            .scrollIntoView({
                behavior: "smooth"
            });


    }
    catch (error) {

        console.error(error);

        formHint.textContent =
            "Could not connect to the AI backend. Make sure Flask is running.";

        formHint.style.color =
            "#ff7a90";

    }


    /* Reset button */

    analyzeButton.textContent =
        "Analyze review";

    analyzeButton.disabled =
        false;

});