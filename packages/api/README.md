# dbgate-api

Allows run DbGate data-manipulation scripts.

## Installation

    yarn add dbgate-api

## Usage

This example exports table Customer info CSV file.

```javascript

const dbgateApi = require('dbgate-api');
async function run() {
  const reader = await dbgateApi.tableReader({
    connection: { server: 'localhost', engine: 'mssql', user: 'sa', password: 'xxxx', database: 'Chinook' },
    schemaName: 'dbo',
    pureName: 'Customer',
  });
  const writer = await dbgateApi.csvWriter({ fileName: 'Customer.csv' });
  await dbgateApi.copyStream(reader, writer);

  console.log('Finished job script');
}
dbgateApi.runScript(run);

```

Silly example, runs without any dependencies. Copy [fakeObjectReader](https://github.com/dbshell/dbgate/blob/master/packages/api/src/shell/fakeObjectReader.js) to [consoleObjectWriter](https://github.com/dbshell/dbgate/blob/master/packages/api/src/shell/consoleObjectWriter.js) .

```javascript

const dbgateApi = require('dbgate-api');
async function run() {
  const reader = await dbgateApi.fakeObjectReader();
  const writer = await dbgateApi.consoleObjectWriter();
  await dbgateApi.copyStream(reader, writer);
  console.log('Finished job script');
}
dbgateApi.runScript(run);

```

## dbgateApi functions

### dbgateApi.copyStream
Copies data from reader into writer. Reader and writer should be created from functions listed below.
```js
  await dbgateApi.copyStream(reader, writer);
```

### dbgateApi.tableReader
Reads table or view.
```js
  const reader = await dbgateApi.tableReader({
    connection: { server: 'localhost', engine: 'mssql' | 'postgres' | 'mysql', user: 'root', password: 'xxxx', database: 'DB_NAME' },
    schemaName: 'dbo',
    pureName: 'Customer',
  });
```

### dbgateApi.queryReader
Executes query and reads its result.
```js
  const reader = await dbgateApi.tableReader({
    connection: { server: 'localhost', engine: 'mssql' | 'postgres' | 'mysql', user: 'root', password: 'xxxx', database: 'DB_NAME' },
    sql: 'SELECT * FROM Album',
  });
```

### dbgateApi.tableWriter
Imports data into table. Options are optional, default values are false.
- dropIfExists - if table already exists, it is dropped before import
- truncate - delete table content before import
- createIfNotExists - create table, if not exists
```js
  const reader = await dbgateApi.tableWriter({
    connection: { server: 'localhost', engine: 'mssql' | 'postgres' | 'mysql', user: 'root', password: 'xxxx', database: 'DB_NAME' },
    schemaName: 'dbo',
    pureName: 'Customer',
    options: {
      dropIfExists: false,
      truncate: false,
      createIfNotExists: false,
    }
  });
```

### dbgateApi.csvReader
Reads CSV file
```js
  const reader = await dbgateApi.csvReader({
    fileName: '/home/root/test.csv',
    encoding: 'utf-8',
    header: true,
    delimiter: ',',
    quoted: false,
    limitRows: null
  });
```

### dbgateApi.csvWriter
Writes CSV file
```js
  const reader = await dbgateApi.csvWriter({
    fileName: '/home/root/test.csv',
    encoding: 'utf-8',
    header: true,
    delimiter: ',',
    quoted: false
  });
```

### dbgateApi.jsonLinesReader
Reads JSON lines data file. On first line could be structure. Every line contains one row as JSON serialized object.
```js
  const reader = await dbgateApi.jsonLinesReader({
    fileName: '/home/root/test.jsonl',
    encoding: 'utf-8',
    header: true,
    limitRows: null
  });
```

### dbgateApi.jsonLinesWriter
Writes JSON lines data file. On first line could be structure. Every line contains one row as JSON serialized object.
```js
  const reader = await dbgateApi.jsonLinesWriter({
    fileName: '/home/root/test.jsonl',
    encoding: 'utf-8',
    header: true
  });
```

### dbgateApi.excelSheetReader
Reads tabular data from one sheet in MS Excel file.
```js
  const reader = await dbgateApi.excelSheetReader({
    fileName: '/home/root/test.xlsx',
    sheetName: 'Album',
    limitRows: null
  });
```
