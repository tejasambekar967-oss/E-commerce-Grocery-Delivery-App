from dotenv import load_dotenv
load_dotenv()
import os, psycopg2
from psycopg2.extras import RealDictCursor

conn = psycopg2.connect(os.getenv('DATABASE_URL').strip(), cursor_factory=RealDictCursor)
cur = conn.cursor()

updates = [
    ('49.00',  'per head',   '1'),
    ('59.00',  'per 500g',   '2'),
    ('39.00',  'per bag',    '3'),
    ('29.00',  'per bunch',  '4'),
    ('149.00', 'per kg',     '5'),
    ('99.00',  'per punnet', '6'),
    ('49.00',  'per dozen',  '7'),
    ('199.00', 'per punnet', '8'),
    ('89.00',  'per loaf',   '9'),
    ('129.00', 'pack of 6',  '10'),
    ('55.00',  'per loaf',   '11'),
    ('79.00',  'pack of 12', '12'),
    ('65.00',  'per litre',  '13'),
    ('119.00', 'per 400g',   '14'),
    ('249.00', 'per 200g',   '15'),
    ('89.00',  'dozen',      '16'),
    ('299.00', 'per kg',     '17'),
    ('349.00', 'per kg',     '18'),
    ('599.00', 'per kg',     '19'),
    ('399.00', 'per kg',     '20'),
]

for price, unit, pid in updates:
    cur.execute('UPDATE products SET price = %s, unit = %s WHERE id = %s', (price, unit, pid))

conn.commit()
cur.close()
conn.close()
print('Done - all prices updated to INR')
