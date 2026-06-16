from dotenv import load_dotenv
load_dotenv()
import os, psycopg2
from psycopg2.extras import RealDictCursor

conn = psycopg2.connect(os.getenv('DATABASE_URL').strip(), cursor_factory=RealDictCursor)
cur = conn.cursor()
cur.execute("""
CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id bigserial primary key,
  user_id text references users(id) on delete cascade,
  token text unique not null,
  expires_at timestamptz not null,
  used boolean default false,
  created_at timestamptz default now()
)
""")
conn.commit()
cur.close()
conn.close()
print('Done - password_reset_tokens table created')
