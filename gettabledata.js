const axios = require('axios');
const cheerio = require('cheerio');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

async function fetchTableData(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
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

        return tables;
    } catch (error) {
        console.error('Error fetching table data:', error);
        return [];
    }
}

async function main() {
    const urls = process.argv.slice(2);
    if (urls.length === 0) {
        console.error('Usage: node pullTableData.js <URL1> <URL2> ...');
        return;
    }

    const tableData = [];
    for (const url of urls) {
        const tables = await fetchTableData(url);
        tableData.push(...tables);
    }

    const csvWriter = createCsvWriter({
        path: 'table_data.csv',
        header: tableData.length > 0 ? Object.keys(tableData[0]).map((_, index) => ({ id: index.toString(), title: `Column ${index + 1}` })) : []
    });

    try {
        await csvWriter.writeRecords(tableData.flat());
        console.log('Table data pulled successfully and saved to table_data.csv');
    } catch (error) {
        console.error('Error writing table data to CSV file:', error);
    }
}

main();
