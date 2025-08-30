-- Decrement stock safely
create or replace function decrement_stock(p_product_id uuid, p_qty int)
returns void language plpgsql as $$
begin
  update products set stock_qty = stock_qty - p_qty where id = p_product_id and stock_qty >= p_qty;
end; $$;
