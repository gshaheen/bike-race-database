const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function fetchLinks(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const links = [];

        $('a').each((index, element) => {
            const href = $(element).attr('href');
            if (href) {
                links.push(href);
            }
        });

        return links;
    } catch (error) {
        console.error('Error fetching links:', error);
        return [];
    }
}

async function main() {
    const url = process.argv[2];
    if (!url) {
        console.error('Usage: node fetchLinks.js <URL>');
        return;
    }

    const links = await fetchLinks(url);
    const outputFile = 'links.txt';

    try {
        fs.writeFileSync(outputFile, links.join('\n'));
        console.log(`Links fetched successfully and saved to ${outputFile}`);
    } catch (error) {
        console.error('Error writing links to file:', error);
    }
}

main();
