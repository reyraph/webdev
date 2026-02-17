/* ============================================================
   SELECTORS – Specificity calculator
   Used by: selectors.html (Section 6 – Specificity)
   ============================================================ */

(function () {

    /* ── References ──────────────────────────────── */
    var input       = document.getElementById('sel-calc-input');
    var scoreEl     = document.getElementById('sel-calc-score');
    var breakdownEl = document.getElementById('sel-calc-breakdown');
    var examples    = document.querySelectorAll('.sel-calc__example');

    /* ── Specificity calculation ─────────────────── */
    function calculateSpecificity(selector) {
        var ids      = 0;
        var classes  = 0;
        var elements = 0;
        var tokens   = [];

        /* Work on a copy */
        var s = selector;

        /* 1. Remove content inside :not() but count its arguments */
        s = s.replace(/:not\(([^)]*)\)/g, function (match, inner) {
            var innerResult = calculateSpecificity(inner);
            ids      += innerResult.ids;
            classes  += innerResult.classes;
            elements += innerResult.elements;
            tokens = tokens.concat(innerResult.tokens);
            return '';
        });

        /* 2. Count and remove #id selectors */
        s = s.replace(/#[a-zA-Z_][\w-]*/g, function (match) {
            ids++;
            tokens.push({ token: match, type: 'id' });
            return '';
        });

        /* 3. Count and remove ::pseudo-elements (double colon) */
        s = s.replace(/::[a-zA-Z][\w-]*/g, function (match) {
            elements++;
            tokens.push({ token: match, type: 'element' });
            return '';
        });

        /* 4. Count and remove .classes */
        s = s.replace(/\.[a-zA-Z_][\w-]*/g, function (match) {
            classes++;
            tokens.push({ token: match, type: 'class' });
            return '';
        });

        /* 5. Count and remove [attribute] selectors */
        s = s.replace(/\[[^\]]*\]/g, function (match) {
            classes++;
            tokens.push({ token: match, type: 'class' });
            return '';
        });

        /* 6. Count and remove :pseudo-classes (single colon, not ::) */
        s = s.replace(/:[a-zA-Z][\w-]*(\([^)]*\))?/g, function (match) {
            classes++;
            tokens.push({ token: match, type: 'class' });
            return '';
        });

        /* 7. Remove combinators and universal selector */
        s = s.replace(/[>+~*]/g, ' ');

        /* 8. Count remaining element/type selectors */
        var remaining = s.trim().split(/\s+/);
        remaining.forEach(function (part) {
            part = part.trim();
            if (part && /^[a-zA-Z][\w-]*$/.test(part)) {
                elements++;
                tokens.push({ token: part, type: 'element' });
            }
        });

        return { ids: ids, classes: classes, elements: elements, tokens: tokens };
    }

    /* ── Update display ──────────────────────────── */
    function update() {
        var selector = input.value.trim();

        if (!selector) {
            scoreEl.textContent = '0, 0, 0, 0';
            breakdownEl.textContent = '';
            return;
        }

        var result = calculateSpecificity(selector);
        scoreEl.textContent = '0, ' + result.ids + ', ' + result.classes + ', ' + result.elements;

        /* Build breakdown text */
        if (result.tokens.length === 0) {
            breakdownEl.textContent = 'No scorable tokens found.';
            return;
        }

        var parts = result.tokens.map(function (t) {
            var label = '';
            if (t.type === 'id')      label = 'ID';
            if (t.type === 'class')   label = 'Class/Attr/Pseudo';
            if (t.type === 'element') label = 'Element/Pseudo-el';
            return t.token + ' \u2192 ' + label;
        });

        breakdownEl.textContent = parts.join('  |  ');
    }

    /* ── Event binding ───────────────────────────── */
    input.addEventListener('input', update);

    examples.forEach(function (btn) {
        btn.addEventListener('click', function () {
            input.value = btn.getAttribute('data-selector');
            update();
        });
    });

    /* ── Initial render ──────────────────────────── */
    update();

})();
