-- PoshPOULE Farms schema
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  phone text,
  name text,
  role text check (role in ('farmer','partner','buyer')) not null default 'buyer',
  created_at timestamptz default now()
);

create table if not exists pens (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  capacity int not null,
  breed text not null,
  notes text,
  created_at timestamptz default now()
);

create table if not exists daily_logs (
  id uuid primary key default gen_random_uuid(),
  pen_id uuid references pens(id) on delete cascade,
  date date not null,
  egg_count int not null,
  feed_used_kg numeric not null,
  mortality int not null default 0,
  temperature numeric,
  notes text,
  images jsonb default '[]'::jsonb,
  created_at timestamptz default now()
);

create index if not exists idx_daily_logs_date on daily_logs(date);

create table if not exists feed_inventory (
  id uuid primary key default gen_random_uuid(),
  item_name text not null,
  supplier text,
  qty_kg numeric not null,
  unit_price_naira int not null,
  total_cost_naira int not null,
  received_at date not null
);

create table if not exists expenses (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  amount_naira int not null,
  description text,
  receipt_url text,
  date date not null
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  sku text unique not null,
  name text not null,
  category text not null,
  price_naira int not null,
  unit text not null,
  stock_qty int not null default 0,
  description text,
  image_url text
);
create index if not exists idx_products_sku on products(sku);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid references users(id),
  total_naira int not null,
  status text not null check (status in ('pending','confirmed','ready','completed')) default 'pending',
  delivery_date date,
  payment_status text,
  payment_proof_url text,
  created_at timestamptz default now()
);
create index if not exists idx_orders_status on orders(status);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id),
  qty int not null,
  unit_price_naira int not null,
  subtotal_naira int not null
);

create table if not exists partners (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  company text,
  invested_amount_naira int not null,
  share_percent numeric not null,
  created_at timestamptz default now()
);

create table if not exists reports (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid references partners(id) on delete cascade,
  report_url text,
  created_at timestamptz default now()
);

create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  type text not null,
  payload jsonb not null,
  sent_at timestamptz
);
