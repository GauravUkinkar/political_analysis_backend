import { pool } from "../database/db.js";

const candidate = `CREATE TABLE IF NOT EXISTS candidate (
id INT AUTO_INCREMENT PRIMARY KEY,
year 
name VARCHAR(255) NOT NULL,
party VARCHAR(255)
)`;

const candidateCounting = `CREATE TABLE IF NOT EXISTS candidate_counting(
id INT AUTO_INCREMENT PRIMARY KEY,
year INT NOT NULL,
cid INT NOT NULL,
booth_number INT,
counting INT,
FOREIGN KEY (cid) REFERENCES candidate(id)

)`;

const boothData = `CREATE TABLE IF NOT EXISTS booth_data(
id INT AUTO_INCREMENT PRIMARY KEY,
year INT NOT NULL,
booth_number INT NOT NULL,
name VARCHAR(255),
zp VARCHAR(255),
village VARCHAR(255),
counting INT,
totalCount INT,
maleVotes INT,
femaleVotes INT
)`;

const createTable = async (table, query) => {
  try {
    await pool.query(query);

    console.log(`${table} table created`);
  } catch (error) {}
};

const createAllTabels = async () => {
  try {
    await createTable("candidate", candidate);
    await createTable("candidateCounting", candidateCounting);
    await createTable("booth_data", boothData);
  } catch (error) {
    console.log(error);
  }
};

export default createAllTabels;
