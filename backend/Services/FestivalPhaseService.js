const { query } = require("../Utils/db");
const { HttpError } = require("../Utils/http");

// on stocke la phase dans une table contenant une seule ligne id=1
async function ensureTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS festival_phase (
      id INT PRIMARY KEY,
      phase ENUM('phase1','phase2','phase3') NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);

  const rows = await query("SELECT * FROM festival_phase WHERE id = 1");
  if (rows.length === 0) {
    await query("INSERT INTO festival_phase (id, phase) VALUES (1,'phase1')");
  }
}

async function getCurrentPhase() {
  await ensureTable();
  const rows = await query("SELECT phase FROM festival_phase WHERE id = 1");
  if (rows.length === 0)
    throw new HttpError(500, "Phase du festival introuvable");
  return rows[0].phase;
}

async function setCurrentPhase(phase) {
  const allowed = ["phase1", "phase2", "phase3"];
  if (!allowed.includes(phase)) {
    throw new HttpError(400, "Phase invalide");
  }
  await ensureTable();
  await query(
    `INSERT INTO festival_phase (id, phase) VALUES (1, :phase)
     ON DUPLICATE KEY UPDATE phase = :phase`,
    { phase },
  );
  return getCurrentPhase();
}

module.exports = {
  getCurrentPhase,
  setCurrentPhase,
};
