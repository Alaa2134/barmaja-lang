/**
 * مترجم لغة بَرمَجة (Barmaja Transpiler)
 * يحول كود بَرمَجة العربي إلى JavaScript قياسي.
 * حقوق الصانع: علاء صابر
 */

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
    'اطبع': 'console.log' // إضافة دالة طباعة سهلة
};

function transpile(code) {
    let transpiledCode = code;

    // استبدال الكلمات المفتاحية
    // نستخدم تعبيرات منتظمة لضمان استبدال الكلمات الكاملة فقط
    for (const [arabic, english] of Object.entries(keywordsMap)) {
        // نستخدم تعبيرات منتظمة تدعم اليونيكود لضمان استبدال الكلمات العربية الكاملة فقط
        // بما أن \b لا تعمل بشكل جيد مع العربية، سنستخدم حدوداً مخصصة
        const regex = new RegExp(`(?<=^|[^\\p{L}\\p{N}_])${arabic}(?=[^\\p{L}\\p{N}_]|$)`, 'gu');
        transpiledCode = transpiledCode.replace(regex, english);
    }

    return transpiledCode;
}

module.exports = { transpile };
