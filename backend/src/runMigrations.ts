import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';
import { dbConfig } from './config';

// Configuração do pool de conexões
const pool = new Pool({
    ...dbConfig,
    ssl: {
        rejectUnauthorized: false,
    },
});

// Testando a conexão
pool.connect()
    .then(client => {
        console.log('Conexão com o banco de dados bem-sucedida');
        client.release();
    })
    .catch(err => {
        console.error('Erro ao conectar com o banco de dados:', err.stack);
    });

async function createMigrationsTable() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS migrations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            run_on TIMESTAMP NOT NULL DEFAULT NOW()
        );
    `;
    await pool.query(createTableQuery);
}

async function hasMigrationRun(fileName: string): Promise<boolean> {
    const result = await pool.query(
        'SELECT 1 FROM migrations WHERE name = $1',
        [fileName]
    );
    return result.rows.length > 0;
}

async function recordMigration(fileName: string) {
    await pool.query(
        'INSERT INTO migrations (name) VALUES ($1)',
        [fileName]
    );
}

async function runMigrations() {
    try {
        // Cria a tabela de controle de migrations, se não existir
        await createMigrationsTable();

        const migrationsDir = path.join(__dirname, '../migrations');
        const files = fs.readdirSync(migrationsDir).filter((file) => file.endsWith('.sql')).sort();

        for (const file of files) {
            const filePath = path.join(migrationsDir, file);
            
            // Verifica se a migration já foi executada
            const alreadyRun = await hasMigrationRun(file);
            if (alreadyRun) {
                console.log(`Migration ${file} já foi executada, pulando...`);
                continue;
            }

            // Lê e executa a migration SQL
            const sql = fs.readFileSync(filePath, 'utf-8');
            console.log(`Executando migration: ${file}`);
            await pool.query(sql);
            console.log(`Migration ${file} executada com sucesso.`);

            // Registra a migration na tabela de controle
            await recordMigration(file);
        }

        console.log('Todas as migrations foram executadas com sucesso.');
    } catch (error) {
        console.error('Erro ao executar migrations:', error);
    } finally {
        await pool.end();
    }
}

runMigrations().catch((err) => console.error('Erro fatal ao rodar as migrations:', err));
