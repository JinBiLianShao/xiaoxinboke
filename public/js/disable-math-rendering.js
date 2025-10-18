// 阻止数学公式的客户端重复渲染
(function() {
    'use strict';

    // 阻止 KaTeX 自动渲染
    window.katex = undefined;
    window.renderMathInElement = undefined;

    // 移除任何数学相关的数据属性
    document.addEventListener('DOMContentLoaded', function() {
        const mathElements = document.querySelectorAll('[data-katex], [data-math]');
        mathElements.forEach(el => {
            el.removeAttribute('data-katex');
            el.removeAttribute('data-math');
        });
    });
})();