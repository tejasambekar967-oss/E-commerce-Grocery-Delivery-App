# FreshMart Backend

FastAPI backend for the FreshMart grocery store application.

## Requirements

- Python 3.10+
- pip
- Supabase account ([supabase.com](https://supabase.com))

## Setup

1. **Create Supabase tables and seed data:**
   - Go to your Supabase project → SQL Editor
   - Run the contents of `supabase_schema.sql`

2. **Configure environment variables in `.env`:**
   ```env
   FRONTEND_ORIGIN=http://localhost:5173
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_KEY=your_anon_public_key
   ```
   Get these from Supabase dashboard → Project Settings → API.

3. **Install dependencies:**
   ```bash
   pip install -r requirement.txt
   ```

4. **Start the server:**
   ```bash
   python -m uvicorn main:app --reload --port 8000
   ```

API will be available at `http://localhost:8000`  
Interactive docs at `http://localhost:8000/docs`

## Project Structure

```
backend/
├── main.py                    # FastAPI app entry point, CORS, router registration
├── requirement.txt            # Python dependencies
├── .env                       # Environment variables (Supabase credentials)
├── supabase_schema.sql        # Table definitions + seed data — run in Supabase SQL Editor
├── config/
│   ├── settings.py            # Loads env vars, initializes Supabase client
│   └── data.py                # Pydantic models (Product, Category)
├── controller/
│   ├── product_controller.py  # Product queries via Supabase
│   └── order_controller.py    # Order insert into Supabase (orders + order_items)
└── router/
    ├── products.py            # /api/products routes
    ├── categories.py          # /api/categories routes
    └── orders.py              # /api/orders routes
```

## Supabase Tables

| Table | Description |
|-------|-------------|
| `categories` | 5 product categories |
| `products` | 20 grocery products linked to categories |
| `orders` | Customer orders with delivery + pricing info |
| `order_items` | Individual line items linked to each order |

## API Endpoints

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List all products |
| GET | `/api/products?category={id}` | Filter by category |
| GET | `/api/products?sort=price-low` | Sort by price ascending |
| GET | `/api/products?sort=price-high` | Sort by price descending |
| GET | `/api/products?sort=name` | Sort alphabetically (default) |
| GET | `/api/products/{id}` | Get single product by ID |

**Product response fields:** `id`, `name`, `category`, `price`, `image`, `unit`, `description`, `inStock`

### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | List all categories |

**Category response fields:** `id`, `name`, `image`, `icon`

**Available categories:** `vegetables`, `fruits`, `bakery`, `dairy`, `meat`

### Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Place a new order |

**Request body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "555-1234",
  "address": "123 Main St",
  "city": "Springfield",
  "state": "IL",
  "zip": "62701",
  "deliveryMethod": "standard",
  "items": [
    { "id": "1", "name": "Organic Broccoli", "price": 2.99, "quantity": 2, "unit": "per head" }
  ],
  "subtotal": 5.98,
  "tax": 0.48,
  "deliveryFee": 5.99,
  "total": 12.45
}
```

**Response:**
```json
{
  "orderId": "A1B2C3D4",
  "message": "Order placed successfully"
}
```

## Notes

- Data is stored **in-memory**. All products and orders reset on server restart.
- CORS is configured to allow requests only from `FRONTEND_ORIGIN` (default: `http://localhost:5173`).
