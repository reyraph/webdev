/* ============================================================
   TYPOGRAPHY & FUNCTIONS – Interactive demos
   ============================================================ */
(function () {
    'use strict';

    /* ── Section 4E: Theme switcher ────────────────────────────── */
    var themeBtns = document.querySelectorAll('.ty-theme-btn');
    var themePreview = document.getElementById('ty-theme-preview');

    themeBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var color = btn.getAttribute('data-color');
            themePreview.style.setProperty('--ty-theme', color);
        });
    });

    /* ── Section 5C: calc() playground ─────────────────────────── */
    var calcBase = document.getElementById('ty-calc-base');
    var calcVw = document.getElementById('ty-calc-vw');
    var calcBaseOut = document.getElementById('ty-calc-base-out');
    var calcVwOut = document.getElementById('ty-calc-vw-out');
    var calcFormula = document.getElementById('ty-calc-formula');
    var calcPreview = document.getElementById('ty-calc-preview');

    function updateCalc() {
        var base = calcBase.value;
        var vw = calcVw.value;
        calcBaseOut.textContent = base;
        calcVwOut.textContent = vw;
        calcFormula.textContent = 'font-size: calc(' + base + 'px + ' + vw + 'vw)';
        calcPreview.style.fontSize = 'calc(' + base + 'px + ' + vw + 'vw)';
    }

    calcBase.addEventListener('input', updateCalc);
    calcVw.addEventListener('input', updateCalc);

    /* ── Section 6C: clamp() builder ──────────────────────────── */
    var clampMin = document.getElementById('ty-clamp-min');
    var clampPref = document.getElementById('ty-clamp-pref');
    var clampMax = document.getElementById('ty-clamp-max');
    var clampMinOut = document.getElementById('ty-clamp-min-out');
    var clampPrefOut = document.getElementById('ty-clamp-pref-out');
    var clampMaxOut = document.getElementById('ty-clamp-max-out');
    var clampCode = document.getElementById('ty-clamp-code');
    var clampPreview = document.getElementById('ty-clamp-preview');

    function updateClamp() {
        var min = clampMin.value;
        var pref = clampPref.value;
        var max = clampMax.value;
        clampMinOut.textContent = min;
        clampPrefOut.textContent = pref;
        clampMaxOut.textContent = max;
        var formula = 'font-size: clamp(' + min + 'rem, ' + pref + 'vw, ' + max + 'rem);';
        clampCode.textContent = formula;
        clampPreview.style.fontSize = 'clamp(' + min + 'rem, ' + pref + 'vw, ' + max + 'rem)';
    }

    clampMin.addEventListener('input', updateClamp);
    clampPref.addEventListener('input', updateClamp);
    clampMax.addEventListener('input', updateClamp);

    /* ── Section 7: Typography playground ─────────────────────── */
    var pgTextColor = document.getElementById('ty-pg-text-color');
    var pgBgColor = document.getElementById('ty-pg-bg-color');
    var pgBase = document.getElementById('ty-pg-base');
    var pgRatio = document.getElementById('ty-pg-ratio');
    var pgLh = document.getElementById('ty-pg-lh');
    var pgLs = document.getElementById('ty-pg-ls');
    var pgFont = document.getElementById('ty-pg-font');
    var pgBaseOut = document.getElementById('ty-pg-base-out');
    var pgRatioOut = document.getElementById('ty-pg-ratio-out');
    var pgLhOut = document.getElementById('ty-pg-lh-out');
    var pgLsOut = document.getElementById('ty-pg-ls-out');
    var pgPreview = document.getElementById('ty-pg-preview');
    var pgCode = document.getElementById('ty-pg-code');
    var pgCopy = document.getElementById('ty-pg-copy');

    function updatePlayground() {
        var textColor = pgTextColor.value;
        var bgColor = pgBgColor.value;
        var base = pgBase.value;
        var ratio = pgRatio.value;
        var lh = pgLh.value;
        var ls = pgLs.value;
        var font = pgFont.value;

        /* Update output displays */
        pgBaseOut.textContent = base;
        pgRatioOut.textContent = ratio;
        pgLhOut.textContent = lh;
        pgLsOut.textContent = ls;

        /* Apply to preview */
        pgPreview.style.setProperty('--ty-pg-text', textColor);
        pgPreview.style.setProperty('--ty-pg-bg', bgColor);
        pgPreview.style.setProperty('--ty-pg-base', base + 'px');
        pgPreview.style.setProperty('--ty-pg-ratio', ratio);
        pgPreview.style.setProperty('--ty-pg-lh', lh);
        pgPreview.style.setProperty('--ty-pg-ls', ls + 'em');
        pgPreview.style.setProperty('--ty-pg-font', font);

        /* Update generated code */
        var headingSize = Math.round(base * ratio * 100) / 100;
        pgCode.textContent =
            ':root {\n' +
            '    --text-color: ' + textColor + ';\n' +
            '    --bg-color: ' + bgColor + ';\n' +
            '    --base-size: ' + base + 'px;\n' +
            '    --scale-ratio: ' + ratio + ';\n' +
            '    --line-height: ' + lh + ';\n' +
            '    --letter-spacing: ' + ls + 'em;\n' +
            '    --font-family: ' + font + ';\n' +
            '    --heading-size: calc(var(--base-size) * var(--scale-ratio));\n' +
            '    /* computed heading: ' + headingSize + 'px */\n' +
            '}';
    }

    pgTextColor.addEventListener('input', updatePlayground);
    pgBgColor.addEventListener('input', updatePlayground);
    pgBase.addEventListener('input', updatePlayground);
    pgRatio.addEventListener('input', updatePlayground);
    pgLh.addEventListener('input', updatePlayground);
    pgLs.addEventListener('input', updatePlayground);
    pgFont.addEventListener('change', updatePlayground);

    /* Copy to clipboard */
    pgCopy.addEventListener('click', function () {
        navigator.clipboard.writeText(pgCode.textContent).then(function () {
            var original = pgCopy.textContent;
            pgCopy.textContent = 'Copied!';
            setTimeout(function () { pgCopy.textContent = original; }, 1500);
        });
    });

    /* Initial render */
    updatePlayground();

})();
