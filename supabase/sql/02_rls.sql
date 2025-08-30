-- Enable RLS
alter table users enable row level security;
alter table pens enable row level security;
alter table daily_logs enable row level security;
alter table feed_inventory enable row level security;
alter table expenses enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table partners enable row level security;
alter table reports enable row level security;
alter table notifications enable row level security;

-- Helper: is_role(role)
create or replace function is_role(expected text)
returns boolean language sql stable as $$
  select (auth.jwt() ->> 'role') = expected
$$;

-- Policies
-- Users: self read, farmer manage
create policy users_self_read on users for select
  using (auth.uid() = id or is_role('farmer'));
create policy users_farmer_all on users for all
  using (is_role('farmer')) with check (is_role('farmer'));

-- Pens: farmer full, others read
create policy pens_read on pens for select using (true);
create policy pens_farmer_all on pens for all using (is_role('farmer')) with check (is_role('farmer'));

-- Daily logs: farmer write, all read
create policy daily_logs_read on daily_logs for select using (true);
create policy daily_logs_farmer_write on daily_logs for insert with check (is_role('farmer'));
create policy daily_logs_farmer_update on daily_logs for update using (is_role('farmer'));

-- Feed inventory & expenses: farmer only
create policy feed_inv_farmer_all on feed_inventory for all using (is_role('farmer')) with check (is_role('farmer'));
create policy expenses_farmer_all on expenses for all using (is_role('farmer')) with check (is_role('farmer'));

-- Products: read all, farmer manage
create policy products_read on products for select using (true);
create policy products_farmer_all on products for all using (is_role('farmer')) with check (is_role('farmer'));

-- Orders: buyers can insert/select own; farmer manage
create policy orders_buyer_insert on orders for insert with check (auth.uid() = buyer_id or is_role('farmer'));
create policy orders_buyer_read on orders for select using (auth.uid() = buyer_id or is_role('farmer'));
create policy orders_farmer_update on orders for update using (is_role('farmer'));

-- Order items: tie to order visibility
create policy order_items_read on order_items for select using (
  exists(select 1 from orders o where o.id = order_id and (auth.uid() = o.buyer_id or is_role('farmer')))
);
create policy order_items_insert on order_items for insert with check (
  exists(select 1 from orders o where o.id = order_id and (auth.uid() = o.buyer_id or is_role('farmer')))
);

-- Partners: partner can read own, farmer manage
create policy partners_read on partners for select using (
  exists(select 1 from users u where u.id = user_id and (auth.uid() = u.id and u.role = 'partner')) or is_role('farmer')
);
create policy partners_farmer_all on partners for all using (is_role('farmer')) with check (is_role('farmer'));

-- Reports: partner can read own, farmer manage
create policy reports_read on reports for select using (
  exists(select 1 from partners p where p.id = partner_id and (
    is_role('farmer') or exists(select 1 from users u where u.id = p.user_id and auth.uid() = u.id)
  ))
);
create policy reports_farmer_all on reports for all using (is_role('farmer')) with check (is_role('farmer'));

-- Notifications: farmer manage, users read own
create policy notifications_read on notifications for select using (
  auth.uid() = user_id or is_role('farmer')
);
create policy notifications_farmer_all on notifications for all using (is_role('farmer')) with check (is_role('farmer'));
