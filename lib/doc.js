import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'docs');

export function getDocuments() {
    // console.log('getDocuments', postsDirectory);
    const fileNames = fs.readdirSync(postsDirectory);
    // console.log('fileNames', fileNames);
    const allDocuments = fileNames.map((fileName) => {
        // Remove ".md" from file name to get id
        const id = fileName.replace('.md', '');
        // console.log('id', id);
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);
        // console.log('matterResult', matterResult);
        return {
            id,
            ...matterResult.data,
        }
    });
    return allDocuments.sort((a, b) => {
        if (a.order < b.order) {
            return -1;
        } else if (a.order > b.order) {
            return 1;
        } else {
            return 0;
        }
    });
    // console.log('allDocuments', allDocuments);
}