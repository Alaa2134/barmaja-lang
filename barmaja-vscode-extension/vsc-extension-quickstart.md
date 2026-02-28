# دليل نشر إضافة لغة بَرمَجة على VS Code Marketplace

هذا الدليل مخصص لـ **علاء صابر** لنشر الإضافة على متجر VS Code.

## الخطوات الأساسية للنشر

### 1. تثبيت أداة `vsce`
يجب تثبيت أداة Visual Studio Code Extension Manager (vsce) عالمياً:
```bash
npm install -g vsce
```

### 2. إنشاء حساب ناشر (Publisher)
- اذهب إلى [Azure DevOps](https://dev.azure.com/) وأنشئ حساباً.
- أنشئ "Personal Access Token" (PAT) مع صلاحية "All accessible organizations" و "Marketplace (Publish)".
- اذهب إلى [Visual Studio Marketplace](https://marketplace.visualstudio.com/manage) وأنشئ ناشراً باسم `alaa-saber`.

### 3. تسجيل الدخول عبر `vsce`
استخدم الـ PAT الذي أنشأته لتسجيل الدخول:
```bash
vsce login alaa-saber
```

### 4. حزم الإضافة (Packaging)
لإنشاء ملف `.vsix` الجاهز للنشر:
```bash
vsce package
```

### 5. النشر (Publishing)
لنشر الإضافة مباشرة إلى المتجر:
```bash
vsce publish
```

## نصائح للنشر الناجح
- تأكد من تحديث رقم الإصدار في `package.json` قبل كل نشر.
- أضف أيقونة جذابة للإضافة (128x128 بكسل).
- تأكد من أن ملف `README.md` يحتوي على صور أو فيديوهات توضيحية.
- اختبر الإضافة محلياً قبل النشر باستخدام `F5` في VS Code.

---

**المطور**: علاء صابر  
**الإصدار**: 1.0.0  
**آخر تحديث**: 2026
