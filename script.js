(() => {
  'use strict';

  /* ---------- footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- header: solid background after scroll ---------- */
  const header = document.getElementById('siteHeader');
  let ticking = false;
  const updateHeader = () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 10);
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });
  updateHeader();

  /* ---------- mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  const closeNav = () => {
    document.body.classList.remove('nav-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  };

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = document.body.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeNav);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeNav();
    });
  }

  /* ---------- icebreak gacha ---------- */
  const icebreakDrawButton = document.getElementById('icebreakDrawButton');
  const icebreakQuestion = document.getElementById('icebreakQuestion');
  const icebreakCategory = document.getElementById('icebreakCategory');

  if (icebreakDrawButton && icebreakQuestion && icebreakCategory) {
    const icebreakQuestions = [
      { category: '軽い話題', question: '最近ちょっと嬉しかったことは？' },
      { category: '軽い話題', question: '今、少し楽しみにしていることは？' },
      { category: '軽い話題', question: '最近よく見たり聞いたりしているものは？' },
      { category: '軽い話題', question: '好きな食べ物か飲み物を一つ教えてください。' },
      { category: '軽い話題', question: '休み時間によくしていることは？' },
      { category: '軽い話題', question: '今の気分を天気に例えると？' },
      { category: '好き・得意', question: '最近「面白い」と思ったことは？' },
      { category: '好き・得意', question: 'やってみたいけれど、まだできていないことは？' },
      { category: '好き・得意', question: '人に教えられそうなことは？' },
      { category: '好き・得意', question: 'アイデアを考えることと、形にすることのどちらが好き？' },
      { category: '好き・得意', question: 'チームで任されたら少し嬉しい役割は？' },
      { category: '好き・得意', question: '自分が集中しやすい時間帯は？' },
      { category: 'プロジェクト', question: '今回の活動で少し楽しみなことは？' },
      { category: 'プロジェクト', question: '今回、挑戦してみたいことは？' },
      { category: 'プロジェクト', question: 'チームで大事にしたい雰囲気は？' },
      { category: 'プロジェクト', question: '困ったとき、どんなふうに声をかけてもらえると助かる？' },
      { category: 'プロジェクト', question: '自分が手伝えそうだと思うことは？' },
      { category: 'プロジェクト', question: '今日の会議が終わるとき、どうなっていたら嬉しい？' },
    ];
    let previousIcebreakQuestion = null;

    icebreakDrawButton.addEventListener('click', () => {
      let questionIndex = Math.floor(Math.random() * icebreakQuestions.length);

      if (icebreakQuestions.length > 1 && icebreakQuestions[questionIndex].question === previousIcebreakQuestion) {
        questionIndex = (questionIndex + 1 + Math.floor(Math.random() * (icebreakQuestions.length - 1))) % icebreakQuestions.length;
      }

      const selectedQuestion = icebreakQuestions[questionIndex];
      previousIcebreakQuestion = selectedQuestion.question;
      icebreakCategory.textContent = selectedQuestion.category;
      icebreakQuestion.textContent = selectedQuestion.question;
      icebreakDrawButton.textContent = 'もう一度引く';
    });
  }

  /* ---------- prefers-reduced-motion ---------- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- generic scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- roadmap: lighting up the route as you travel ---------- */
  const waypoints = document.querySelectorAll('.waypoint');
  const fill = document.getElementById('roadmapFill');

  if (waypoints.length) {
    if ('IntersectionObserver' in window && !prefersReducedMotion) {
      const total = waypoints.length;
      const activated = new Set();

      const roadmapObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-active');
            activated.add(entry.target);
          }
        });

        if (fill) {
          // 進んだ通過点の割合に応じて、星のラインを伸ばす
          let highestIndex = -1;
          waypoints.forEach((wp, i) => {
            if (activated.has(wp)) highestIndex = i;
          });
          const progress = highestIndex < 0 ? 0 : ((highestIndex + 1) / total) * 100;
          fill.style.height = progress + '%';
        }
      }, { threshold: 0.5, rootMargin: '0px 0px -10% 0px' });

      waypoints.forEach((wp) => roadmapObserver.observe(wp));
    } else {
      // 動きを減らす設定、または非対応ブラウザでは最初から全て表示
      waypoints.forEach((wp) => wp.classList.add('is-active'));
      if (fill) fill.style.height = '100%';
    }
  }
})();
