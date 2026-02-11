import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export type Worker = {
  id?: number;
  firstName: string;
  lastName: string;
  phone: string;
};

let pool: Pool | null = null;
function getPool() {
  if (pool) return pool;
  const connectionString = process.env.DATABASE_URL;
  pool = new Pool(
    connectionString
      ? { connectionString }
      : {
          host: process.env.PGHOST || "localhost",
          port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
          user: process.env.PGUSER || process.env.USER || "postgres",
          password: process.env.PGPASSWORD || undefined,
          database: process.env.PGDATABASE || "postgres",
        }
  );
  return pool;
}

type Filters = {
  district?: string;
  category?: string;
  gender?: string;
  ordering?: string;
  lang?: string;
};

export async function findWorkers(filters: Filters = {}): Promise<Worker[]> {
  const pool = getPool();

  const where: string[] = ["status = 'approved'"];
  const params: any[] = [];

  if (filters.district) {
    params.push(filters.district);
    where.push(`area = $${params.length}`);
  }

  if (filters.gender) {
    // Map simple digits to values if needed (caller may send '1'/'2')
    const g = filters.gender === "1" ? "male" : filters.gender === "2" ? "female" : filters.gender;
    params.push(g);
    where.push(`gender = $${params.length}`);
  }

  if (filters.category) {
    // Try to match category inside JSON `services` column when possible
    params.push(`%"${filters.category}"%`);
    where.push(`services::text ILIKE $${params.length}`);
  }

  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

  let orderBy = "created_at DESC";
  if (filters.ordering === "1") orderBy = "years_of_experience DESC";

  const sql = `SELECT id, first_name, last_name, phone FROM employees ${whereSql} ORDER BY ${orderBy} LIMIT 2`;

  try {
    const res = await pool.query(sql, params);
    return res.rows.map((r: any) => ({
      id: r.id,
      firstName: r.first_name,
      lastName: r.last_name,
      phone: r.phone,
    }));
  } catch (err) {
    console.error("Error querying workers:", err);
    return [];
  }
}
