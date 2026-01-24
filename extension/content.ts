console.log("Quiz solver content script loaded");

async function analyzeQuiz() {
  console.log("analyze quiz triggered");
  const questionEl = document.querySelector("[data-question]");
  const answerEls = Array.from(
    document.querySelectorAll("[data-answer]")
  ) as HTMLElement[];

  if (!questionEl || answerEls.length === 0) return;

  const question = questionEl.textContent!.trim();
  const answers = answerEls.map((a) => a.textContent!.trim());

  const res = await fetch("http://localhost:8000/solve", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question, answers }),
  });

  const { answerIndex, confidence } = await res.json();

  if (
    typeof answerIndex !== "number" ||
    answerIndex < 0 ||
    answerIndex >= answerEls.length
  ) {
    console.warn("Invalid answerIndex:", answerIndex);
    return;
  }

  if (confidence < 0.7) {
    console.warn("Low confidence:", confidence);
    return;
  }

  answerEls[answerIndex].style.outline = "4px solid #23bbd3";

  answerEls[answerIndex].click();
}

analyzeQuiz();

const observer = new MutationObserver(analyzeQuiz);

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
