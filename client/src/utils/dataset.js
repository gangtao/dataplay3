export function convertDataset(payload) {
    const convertedDataset = {};
    if (payload) {
        let dataSource = [];
        let columns = [];

        // update source and columns based on dataset model
        if (payload.rows) {
            const {cols,rows} = payload;
            dataSource = rows.map(row => {
                const rowObj = {};
                for (let i = 0; i < cols.length; i += 1) {
                    rowObj[cols[i]] = row[i];
                }
                return rowObj;
            });
            columns = cols.map(col => {
                return {
                    title: col,
                    dataIndex: col,
                    key: col,
                };
            });
        }

        convertedDataset.dataSource = dataSource;
        convertedDataset.columns = columns;
    }
    return convertedDataset;
}