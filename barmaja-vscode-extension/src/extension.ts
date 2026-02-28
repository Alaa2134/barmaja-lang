import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

const keywordsMap: { [key: string]: string } = {
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

function transpile(code: string): string {
    let transpiledCode = code;

    for (const [arabic, english] of Object.entries(keywordsMap)) {
        const regex = new RegExp(`(?<=^|[^\\p{L}\\p{N}_])${arabic}(?=[^\\p{L}\\p{N}_]|$)`, 'gu');
        transpiledCode = transpiledCode.replace(regex, english);
    }

    return transpiledCode;
}

export function activate(context: vscode.ExtensionContext) {
    console.log('Barmaja Language Extension activated!');

    // أمر لتحويل الكود
    let transpileCommand = vscode.commands.registerCommand('barmaja.transpile', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor');
            return;
        }

        const document = editor.document;
        const code = document.getText();
        const transpiledCode = transpile(code);

        // إنشاء ملف جديد بالكود المترجم
        const newFileName = document.fileName.replace(/\.(brm|برم)$/, '.js');
        const newUri = vscode.Uri.file(newFileName);

        vscode.workspace.fs.writeFile(newUri, Buffer.from(transpiledCode, 'utf8')).then(() => {
            vscode.window.showInformationMessage(`Transpiled to: ${newFileName}`);
        });
    });

    // أمر لتشغيل الكود
    let runCommand = vscode.commands.registerCommand('barmaja.run', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor');
            return;
        }

        const document = editor.document;
        const code = document.getText();
        const transpiledCode = transpile(code);

        // إنشاء ملف مؤقت وتشغيله
        const tempFile = path.join(vscode.workspace.rootPath || '', '.barmaja_temp.js');
        fs.writeFileSync(tempFile, transpiledCode);

        const terminal = vscode.window.createTerminal('Barmaja');
        terminal.sendText(`node "${tempFile}"`);
        terminal.show();
    });

    context.subscriptions.push(transpileCommand, runCommand);

    // توفير الإكمال التلقائي
    const completionProvider = vscode.languages.registerCompletionItemProvider('barmaja', {
        provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
            const completionItems: vscode.CompletionItem[] = [];

            for (const [arabic, english] of Object.entries(keywordsMap)) {
                const item = new vscode.CompletionItem(arabic, vscode.CompletionItemKind.Keyword);
                item.detail = `JavaScript: ${english}`;
                item.documentation = new vscode.MarkdownString(`**${arabic}** → \`${english}\``);
                completionItems.push(item);
            }

            return completionItems;
        }
    });

    context.subscriptions.push(completionProvider);
}

export function deactivate() {}
