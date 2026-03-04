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
    'اطبع': 'console.log',
    'وإلا إذا': 'else if',
    'يمتد': 'extends',
    'فائق': 'super',
    // مكتبة الرياضيات
    'الرياضيات': 'Math',
    'عشوائي': 'random',
    'جذر': 'sqrt',
    'قوة': 'pow',
    'تقريب': 'round',
    'أرضية': 'floor',
    'سقف': 'ceil',
    'مطلق': 'abs',
    'أقصى': 'max',
    'أدنى': 'min',
    'جيب': 'sin',
    'جيب_تمام': 'cos',
    'ظل': 'tan',
    // مكتبة التاريخ
    'التاريخ': 'Date',
    'الآن': 'now',
    'احصل_على_السنة': 'getFullYear',
    'احصل_على_الشهر': 'getMonth',
    'احصل_على_اليوم': 'getDate',
    // مكتبة النصوص
    'طول': 'length',
    'إلى_نص': 'toString',
    'إلى_كبير': 'toUpperCase',
    'إلى_صغير': 'toLowerCase',
    'تضمن': 'includes',
    'استبدل': 'replace',
    'قسم': 'split',
    'قص': 'slice',
    // مكتبة DOM
    'المستند': 'document',
    'النافذة': 'window',
    'احصل_على_عنصر_بواسطة_المعرف': 'getElementById',
    'استعلام_عن_عنصر': 'querySelector',
    'استعلام_عن_عناصر': 'querySelectorAll',
    'محتوى_نصي': 'textContent',
    'محتوى_داخلي': 'innerHTML',
    'عند_النقر': 'onclick',
    'أضف_مستمع_حدث': 'addEventListener'
};

function transpile(code) {
    let transpiledCode = code;
    
    // ترتيب المعاملات من الأطول إلى الأقصر لتجنب التضارب
    const sortedKeywords = Object.entries(keywordsMap).sort((a, b) => b[0].length - a[0].length);
    
    for (const [arabic, english] of sortedKeywords) {
        const regex = new RegExp(`(?<=^|[^\\p{L}\\p{N}_])${arabic}(?=[^\\p{L}\\p{N}_]|$)`, 'gu');
        transpiledCode = transpiledCode.replace(regex, english);
    }
    
    return transpiledCode;
}

module.exports = { transpile, keywordsMap };
