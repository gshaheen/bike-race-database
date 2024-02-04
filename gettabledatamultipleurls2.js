const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

async function fetchPageData(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const pageTitle = $('title').text().trim();
        const tables = [];

        $('table').each((index, element) => {
            const tableData = [];
            $(element).find('tr').each((i, row) => {
                const rowData = [];
                $(row).find('th, td').each((j, cell) => {
                    rowData.push($(cell).text().trim());
                });
                tableData.push(rowData);
            });
            tables.push(tableData);
        });

        return { pageTitle, tables };
    } catch (error) {
        console.error(`Error fetching data for ${url}:`, error);
        return null;
    }
}

async function main() {
    const inputFile = 'urls.txt';
    const urls = fs.readFileSync(inputFile, 'utf8').split('\n').map(url => url.trim()).filter(url => url);

    if (urls.length === 0) {
        console.error('No URLs found in the input file.');
        return;
    }

    const tableData = [];
    for (const url of urls) {
        const pageData = await fetchPageData(url);
        if (pageData) {
            for (const table of pageData.tables) {
                for (const row of table) {
                    tableData.push({
                        pageTitle: pageData.pageTitle,
                        ...row
                    });
                }
            }
        }
    }

    const csvWriter = createCsvWriter({
        path: 'table_data.csv',
        header: tableData.length > 0 ? [
            { id: 'pageTitle', title: 'Page Title' },
            ...Object.keys(tableData[0]).slice(1).map((_, index) => ({ id: index.toString(), title: `Column ${index + 1}` }))
        ] : []
    });

    try {
        await csvWriter.writeRecords(tableData);
        console.log('Table data pulled successfully and saved to table_data.csv');
    } catch (error) {
        console.error('Error writing table data to CSV file:', error);
    }
}

main();
