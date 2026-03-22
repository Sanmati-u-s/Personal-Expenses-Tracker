const fs = require('fs');
const path = require('path');

const dir = 'c:\\WEB DEV PROJECTS\\MY PROJECTS\\expenses tracker\\src';

function searchInFile(filePath, query) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const lines = content.split('\n');
        lines.forEach((line, index) => {
            if (line.toLowerCase().includes(query.toLowerCase())) {
                console.log(`[FOUND] ${path.basename(filePath)}:${index + 1}: ${line.trim()}`);
            }
        });
    } catch (e) {
        console.error(`Error reading ${filePath}:`, e.message);
    }
}

function walkDir(currentDir, query) {
    const files = fs.readdirSync(currentDir);
    files.forEach(file => {
        const fullPath = path.join(currentDir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath, query);
        } else if (file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.html')) {
            searchInFile(fullPath, query);
        }
    });
}

const query = 'left';
console.log(`Searching for "${query}" in ${dir}...`);
walkDir(dir, query);

const query2 = 'budget';
console.log(`\nSearching for "${query2}" in ${dir}...`);
walkDir(dir, query2);
