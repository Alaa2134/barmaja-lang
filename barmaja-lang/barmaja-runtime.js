/**
 * محرك تشغيل لغة بَرمَجة (Barmaja Runtime)
 * يسمح بتشغيل كود بَرمَجة مباشرة في المتصفح.
 * حقوق الصانع: علاء صابر
 */

(function() {
    const keywordsMap = {
        'متغير': 'var',
        'دع': 'let',
        'ثابت': 'const',
        'دالة': 'function',
        'إذا': 'if',
        'وإلا': 'else',
        'لكل': 'for',
        'طالما': 'while',
        'أرجع': 'return',
        'صنف': 'class',
        'هذا': 'this',
        'جديد': 'new',
        'استورد': 'import',
        'صدر': 'export',
        'صحيح': 'true',
        'خطأ': 'false',
        'فارغ': 'null',
        'غير_معرف': 'undefined',
        'اطبع': 'console.log'
    };

    function transpile(code) {
        let transpiledCode = code;
        for (const [arabic, english] of Object.entries(keywordsMap)) {
            const regex = new RegExp(`(?<=^|[^\\p{L}\\p{N}_])${arabic}(?=[^\\p{L}\\p{N}_]|$)`, 'gu');
            transpiledCode = transpiledCode.replace(regex, english);
        }
        return transpiledCode;
    }

    function runBarmaja() {
        // البحث عن جميع وسوم script التي نوعها text/barmaja
        const scripts = document.querySelectorAll('script[type="text/barmaja"]');
        
        scripts.forEach(script => {
            const code = script.textContent;
            const jsCode = transpile(code);
            
            // إنشاء وسم script جديد لتنفيذ الكود المترجم
            const newScript = document.createElement('script');
            newScript.textContent = jsCode;
            document.body.appendChild(newScript);
        });
    }

    // تشغيل الكود عند تحميل الصفحة
    if (document.readyState === 'complete') {
        runBarmaja();
    } else {
        window.addEventListener('load', runBarmaja);
    }

    // تصدير الوظيفة للاستخدام اليدوي إذا لزم الأمر
    window.Barmaja = {
        transpile: transpile,
        run: runBarmaja
    };
})();
