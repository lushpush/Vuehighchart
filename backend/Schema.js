  const sqlite3 = require('sqlite3').verbose();
  
  const db = new sqlite3.Database('./mydatabase.db', (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Connected to the database.');
    });


db.serialize(() => {
      // Create table
      db.run(
        `CREATE TABLE tree_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    parent_id INTEGER,
    name TEXT,
    type TEXT CHECK(type IN ('folder', 'file')),
    value INTEGER
);
`,
        (err) => {
          if (err) {
            console.error(err.message);
          }
          console.log('Table created successfully');
        }
      );

      // Insert data
      db.run(
        `

-- Insert folders and files under the root
WITH RECURSIVE generate_data AS (
    SELECT 1 AS level, 1 AS id, 1 AS parent_id, 'Folder 1' AS name, 'folder' AS type, 0 AS value
    UNION ALL
    SELECT level + 1, id + 1, 
           CASE WHEN level % 3 = 0 THEN parent_id + 1 ELSE parent_id END,
           CASE WHEN level % 3 = 0 THEN 'Folder ' || (id + 1) ELSE 'File ' || (id + 1) END,
           CASE WHEN level % 3 = 0 THEN 'folder' ELSE 'file' END,
           CASE WHEN level % 3 = 0 THEN 0 ELSE (RANDOM() % 100) + 1 END
    FROM generate_data
    WHERE level < 100
)
INSERT INTO tree_data (parent_id, name, type, value)
SELECT parent_id, name, type, value FROM generate_data;`,
        
        function (err) {
          if (err) {
            return console.log(err.message);
          }
          // get the last insert id
          console.log(`A row has been inserted with row ID ${this.lastID}`);
        }
      );

      // Query data
      db.each(`Select * from tree_data;`, (err, row) => {
        if (err) {
          console.error(err.message);
        }
        console.log(row);
      });
    });