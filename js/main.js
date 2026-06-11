const STORAGE_KEY = "susumateMeetingData";

// 作戦会議のステップと入力項目をまとめて管理します。
const steps = [
  {
    title: "なかまを知る",
    description:
      "まずは、お互いのことを少し知る時間です。話しやすいところから共有してみましょう。",
    hint: "得意なことだけでなく、苦手なことや不安も見えると、助け合いやすくなります。",
    fields: [
      {
        id: "name",
        label: "呼ばれたい名前",
        type: "input",
        placeholder: "例：ひより、ながともさん",
      },
      {
        id: "strengths",
        label: "得意なこと",
        type: "textarea",
        placeholder: "例：資料づくり、アイデア出し、細かい確認",
      },
      {
        id: "weaknesses",
        label: "苦手なこと",
        type: "textarea",
        placeholder: "例：初対面でたくさん話すこと、急な予定変更",
      },
      {
        id: "availableTime",
        label: "作業できる時間帯",
        type: "input",
        placeholder: "例：平日20時以降、土曜の午後",
      },
      {
        id: "excitedAbout",
        label: "このプロジェクトで楽しみなこと",
        type: "textarea",
        placeholder: "例：みんなで形にしていくところ",
      },
      {
        id: "concerns",
        label: "不安なこと",
        type: "textarea",
        placeholder: "例：役割をうまく決められるか少し心配",
      },
    ],
  },
  {
    title: "目的地を決める",
    description:
      "このプロジェクトがどこへ向かうのか、今の言葉でそろえておきます。",
    hint: "完璧な企画名でなくても大丈夫です。あとで変わってもいい前提で置いてみましょう。",
    fields: [
      {
        id: "projectName",
        label: "プロジェクト名",
        type: "input",
        placeholder: "例：キャンパス案内マップ制作",
      },
      {
        id: "projectAbout",
        label: "何を作る / 何をするプロジェクトか",
        type: "textarea",
        placeholder: "例：新入生向けに、大学生活の始め方がわかるWebページを作る",
      },
      {
        id: "projectGoal",
        label: "このプロジェクトで達成したいこと",
        type: "textarea",
        placeholder: "例：初めて来る人が迷わず必要な情報にたどり着けるようにする",
      },
    ],
  },
  {
    title: "届けたい相手を考える",
    description:
      "誰のための冒険なのかを考えると、作るものの方向が見えやすくなります。",
    hint: "年齢や立場だけでなく、その人が困っていそうな場面も一緒に考えると話しやすいです。",
    fields: [
      {
        id: "targetPerson",
        label: "誰に届けたいか",
        type: "textarea",
        placeholder: "例：初めて学生プロジェクトに参加する1年生",
      },
      {
        id: "targetChange",
        label: "その人にどうなってほしいか",
        type: "textarea",
        placeholder: "例：次に何をすればいいかがわかって、少し安心できる",
      },
    ],
  },
  {
    title: "パーティ編成",
    description:
      "必要そうな役割と、今いるなかまでできそうなことを並べてみます。",
    hint: "役割は固定しすぎず、まずは仮で置くくらいがちょうどいいです。",
    fields: [
      {
        id: "neededRoles",
        label: "必要そうな役割",
        type: "textarea",
        placeholder: "例：進行、記録、デザイン、調査、発表準備",
      },
      {
        id: "possibleRoles",
        label: "自分ができそうな役割",
        type: "textarea",
        placeholder: "例：記録ならできそう。デザインも少し挑戦したい",
      },
      {
        id: "missingRoles",
        label: "まだ足りない役割",
        type: "textarea",
        placeholder: "例：技術面に詳しい人、全体進行を見る人",
      },
    ],
  },
  {
    title: "次のクエスト",
    description:
      "会議のあとに迷わないよう、次回までに進める小さな行動を決めます。",
    hint: "大きな作業よりも、次に集まったとき話が進むくらいの小さなクエストがおすすめです。",
    fields: [
      {
        id: "nextQuest",
        label: "次回までにやること",
        type: "textarea",
        placeholder: "例：参考になりそうなWebサイトを3つ集める",
      },
      {
        id: "owner",
        label: "担当者",
        type: "input",
        placeholder: "例：ひより、全員、デザインチーム",
      },
      {
        id: "deadline",
        label: "期限",
        type: "input",
        placeholder: "例：次回会議の前日まで",
      },
      {
        id: "sharePlace",
        label: "共有場所",
        type: "input",
        placeholder: "例：Google Drive、Slack、LINEのノート",
      },
    ],
  },
  {
    title: "冒険のしおり",
    description:
      "ここまで話したことを、あとから見返せる形にまとめます。",
    hint: "コピーしてチャットや資料に貼ると、次の作戦会議につなげやすくなります。",
    fields: [],
  },
];

const meetingForm = document.querySelector("#meetingForm");
const stepList = document.querySelector("#stepList");
const stepCount = document.querySelector("#stepCount");
const stepTitle = document.querySelector("#stepTitle");
const stepDescription = document.querySelector("#stepDescription");
const stepHint = document.querySelector("#stepHint");
const prevButton = document.querySelector("#prevButton");
const nextButton = document.querySelector("#nextButton");
const copyButton = document.querySelector("#copyButton");
const resetButton = document.querySelector("#resetButton");
const bookmark = document.querySelector("#bookmark");
const bookmarkContent = document.querySelector("#bookmarkContent");
const statusMessage = document.querySelector("#statusMessage");

let currentStep = 0;
let meetingData = loadSavedData();

function loadSavedData() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(meetingData));
  } catch {
    statusMessage.textContent =
      "このブラウザでは途中メモの保存が使いにくいようです。画面上の入力はそのまま続けられます。";
  }
}

function renderStepList() {
  stepList.innerHTML = steps
    .map(
      (step, index) => `
        <li>
          <button type="button" data-step="${index}" ${
            index === currentStep ? 'aria-current="step"' : ""
          }>
            <span class="step-number">${index + 1}</span>
            <span>${step.title}</span>
          </button>
        </li>
      `,
    )
    .join("");
}

function renderFields(step) {
  meetingForm.innerHTML = step.fields
    .map((field) => {
      const value = meetingData[field.id] || "";
      const fieldId = `field-${field.id}`;
      const input =
        field.type === "textarea"
          ? `<textarea id="${fieldId}" name="${field.id}" placeholder="${field.placeholder}">${escapeHtml(value)}</textarea>`
          : `<input id="${fieldId}" name="${field.id}" type="text" value="${escapeAttribute(value)}" placeholder="${field.placeholder}" />`;

      return `
        <div class="field">
          <label for="${fieldId}">${field.label}</label>
          ${input}
          <small>ここは空欄でも大丈夫です。話せる範囲で残しておきましょう。</small>
        </div>
      `;
    })
    .join("");
}

function renderBookmark() {
  bookmarkContent.innerHTML = steps
    .slice(0, 5)
    .map((step) => {
      const items = step.fields
        .map((field) => {
          const value = meetingData[field.id]?.trim() || "あとで考える";
          return `
            <div>
              <dt>${field.label}</dt>
              <dd>${escapeHtml(value)}</dd>
            </div>
          `;
        })
        .join("");

      return `
        <article class="summary-section">
          <h4>${step.title}</h4>
          <dl class="summary-list">${items}</dl>
        </article>
      `;
    })
    .join("");
}

function renderStep() {
  const step = steps[currentStep];
  const isBookmarkStep = currentStep === steps.length - 1;

  stepCount.textContent = `Step ${currentStep + 1} / ${steps.length}`;
  stepTitle.textContent = step.title;
  stepDescription.textContent = step.description;
  stepHint.textContent = step.hint;
  prevButton.disabled = currentStep === 0;
  nextButton.hidden = isBookmarkStep;
  copyButton.hidden = !isBookmarkStep;
  resetButton.hidden = !isBookmarkStep;
  meetingForm.hidden = isBookmarkStep;
  bookmark.hidden = !isBookmarkStep;
  statusMessage.textContent = "";

  renderStepList();

  if (isBookmarkStep) {
    renderBookmark();
  } else {
    renderFields(step);
  }
}

// 入力のたびにメモを残して、リロードしても途中から戻りやすくします。
function updateFieldValue(event) {
  const field = event.target;
  if (!field.name) return;

  meetingData[field.name] = field.value;
  saveData();
}

function createPlainTextBookmark() {
  return steps
    .slice(0, 5)
    .map((step) => {
      const lines = step.fields.map((field) => {
        const value = meetingData[field.id]?.trim() || "あとで考える";
        return `- ${field.label}: ${value}`;
      });

      return `【${step.title}】\n${lines.join("\n")}`;
    })
    .join("\n\n");
}

async function copyBookmark() {
  const text = createPlainTextBookmark();

  try {
    await navigator.clipboard.writeText(text);
    statusMessage.textContent = "しおりをコピーしました。共有場所に貼って使えます。";
  } catch {
    statusMessage.textContent =
      "コピーがうまくいきませんでした。ブラウザの設定を見直してみましょう。";
  }
}

function resetMeeting() {
  const ok = window.confirm(
    "ここまでのメモを消して、はじめから見直します。進めても大丈夫ですか？",
  );

  if (!ok) return;

  meetingData = {};
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    statusMessage.textContent =
      "途中メモのリセットがうまくいきませんでした。もう一度見直してみましょう。";
  }
  currentStep = 0;
  renderStep();
  document.querySelector("#meeting").scrollIntoView({ behavior: "smooth" });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("\n", " ");
}

meetingForm.addEventListener("input", updateFieldValue);

stepList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-step]");
  if (!button) return;

  currentStep = Number(button.dataset.step);
  renderStep();
});

prevButton.addEventListener("click", () => {
  if (currentStep === 0) return;
  currentStep -= 1;
  renderStep();
});

nextButton.addEventListener("click", () => {
  if (currentStep >= steps.length - 1) return;
  currentStep += 1;
  renderStep();
});

copyButton.addEventListener("click", copyBookmark);
resetButton.addEventListener("click", resetMeeting);

renderStep();
