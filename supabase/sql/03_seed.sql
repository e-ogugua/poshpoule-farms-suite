-- Seed data for PoshPOULE (Naira)
-- Users
insert into users (id, email, phone, name, role) values
  ('00000000-0000-0000-0000-000000000001','farmer@poshpoule.com','08030000001','Chief Farmer','farmer')
  on conflict (id) do nothing;

insert into users (id, email, phone, name, role) values
  ('00000000-0000-0000-0000-000000000002','partner.alpha@poshpoule.com','08030000002','Partner Alpha','partner'),
  ('00000000-0000-0000-0000-000000000003','joe.trader@example.com','08030000003','Joe Trader','buyer')
  on conflict (id) do nothing;

-- Pens
insert into pens (name, capacity, breed, notes) values
  ('Pen A', 200, 'Isa Brown', null),
  ('Pen B', 150, 'Bovans Brown', null)
  on conflict do nothing;

-- Products
insert into products (sku, name, category, price_naira, unit, stock_qty, description, image_url) values
  ('EGG-TRAY-30','Organic Free-Range Eggs','eggs',1500,'tray',250,'Tray of 30 free-range eggs','https://picsum.photos/seed/eggs/1200/900'),
  ('CHK-BIRD','Farm-Ready Chicken','poultry',3800,'bird',120,'Live bird ready for pickup','https://picsum.photos/seed/chicken/1200/900'),
  ('COMP-25KG','Organic Compost 25kg','fertilizer',2500,'bag',75,'Compost for organic farming','https://picsum.photos/seed/compost/1200/900'),
  ('FEED-50KG','Layer Feed 50kg','feed',18000,'sack',40,'High-quality layer feed','https://picsum.photos/seed/feed/1200/900'),
  ('CHICKS-20','Starter Chicks (20)','poultry',12000,'pack',200,'Pack of 20 healthy starter chicks','https://picsum.photos/seed/chicks/1200/900')
  on conflict do nothing;

-- Daily logs examples
insert into daily_logs (pen_id, date, egg_count, feed_used_kg, mortality, temperature, notes, images)
select p.id, date '2025-07-01', 180, 25, 1, null, 'temp slightly lower', '[]'::jsonb from pens p where p.name='Pen A';
insert into daily_logs (pen_id, date, egg_count, feed_used_kg, mortality, temperature, notes, images)
select p.id, date '2025-07-02', 175, 24, 0, null, null, '[]'::jsonb from pens p where p.name='Pen A';

-- Example partner
insert into partners (user_id, company, invested_amount_naira, share_percent)
values ('00000000-0000-0000-0000-000000000002', 'Partner Alpha', 500000, 10)
on conflict do nothing;

-- Example order PO-001 (id auto)
-- Find Joe Trader id
with joe as (
  select id from users where email='joe.trader@example.com'
), eggs as (
  select id, price_naira from products where sku='EGG-TRAY-30'
)
insert into orders (buyer_id, total_naira, status, delivery_date, payment_status)
select joe.id, 7500, 'confirmed', date '2025-07-05', 'paid' from joe
on conflict do nothing;

-- Order items (5 trays)
with o as (
  select id from orders order by created_at desc limit 1
), eggs as (
  select id, price_naira from products where sku='EGG-TRAY-30'
)
insert into order_items (order_id, product_id, qty, unit_price_naira, subtotal_naira)
select o.id, eggs.id, 5, eggs.price_naira, eggs.price_naira*5 from o, eggs;
