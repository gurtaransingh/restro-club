-- ============================================================================
-- RESTRO CLUB - PRODUCTION INITIAL SEED SCRIPT
-- ============================================================================

-- 1. LOCATIONS
INSERT INTO locations (id, code, name, region, address, hours, contact_email, contact_phone, is_active) VALUES
('loc-1', 'RC-MOHALI', 'Restro Club Banur-Mohali Highway', 'Banur / Mohali Region, Punjab', 'National Highway 205A, Banur-Mohali Highway, Punjab 140601', 'Club: 6:00 AM - 11:00 PM | Dining: 12:00 PM - 11:00 PM', 'concierge@restroclub.com', '+91 (800) 555-0199', TRUE),
('loc-2', 'RC-CHD', 'Restro Club Sector 17 Sanctuary', 'Chandigarh City Center', 'Club Road, Sector 17, Chandigarh 160017', 'Club: 7:00 AM - 11:00 PM | Dining: 12:00 PM - 11:30 PM', 'chandigarh@restroclub.com', '+91 (800) 555-0220', TRUE),
('loc-3', 'RC-GURUGRAM', 'Restro Club Golf Course Extension', 'Gurugram, NCR', 'Golf Course Extension Road, Sector 65, Gurugram 122018', '24/7 Resort Operations | Dining: 11:00 AM - 12:00 AM', 'gurugram@restroclub.com', '+91 (800) 555-0330', TRUE)
ON CONFLICT (id) DO NOTHING;

-- 2. DEPARTMENTS
INSERT INTO departments (id, name, description, location_id) VALUES
('dept-1', 'Culinary & Dining', 'Restaurant, Cafe, Bar & Kitchen Operations', 'loc-1'),
('dept-2', 'Sports & Athletics', 'Indoor courts, Box Cricket, Swimming Pool & Racket Sports', 'loc-1'),
('dept-3', 'Stays & Hospitality', 'Luxury Suites, 1BHK/2BHK Stays & Housekeeping', 'loc-1'),
('dept-4', 'Events & Concierge', 'Private Functions, Weddings & Member Relations', 'loc-1'),
('dept-5', 'HR & Administration', 'Staff Payroll, Attendance & Procurement', 'loc-1')
ON CONFLICT (id) DO NOTHING;

-- 3. ROLES
INSERT INTO roles (id, name, permissions, description) VALUES
('role-superadmin', 'Super Admin', '["ALL_PERMISSIONS", "MASTER_TABLES_CRUD", "FINANCE_ACCESS", "STAFF_MANAGEMENT"]'::jsonb, 'Complete system control over all locations & master tables'),
('role-gm', 'General Manager', '["VIEW_ANALYTICS", "STAFF_MANAGEMENT", "APPROVE_VIP", "INVENTORY_VIEW"]'::jsonb, 'High-level operational control'),
('role-chef', 'Super Chef / Kitchen Manager', '["KITCHEN_BOARD", "MENU_MANAGEMENT", "INVENTORY_RESTOCK"]'::jsonb, 'Kitchen board, menu toggles & raw inventory'),
('role-staff', 'Floor Staff / Waiter', '["QR_ORDERING_STAFF", "TABLE_STATUS"]'::jsonb, 'Table order management'),
('role-customer', 'Member / Customer', '["PLACE_ORDERS", "BOOK_SPORTS", "RESERVE_STAY", "SUBMIT_REVIEWS"]'::jsonb, 'Public platform user')
ON CONFLICT (id) DO NOTHING;

-- 4. MEMBERSHIP TIERS
INSERT INTO membership_tiers (id, name, annual_fee, discount_percentage, perks, priority_access, color_badge) VALUES
('tier-club', 'Club', 2500.00, 5.00, '["Access to Main Dining Room", "Monthly Member Mixers", "Basic Concierge Service"]'::jsonb, FALSE, '#735c00'),
('tier-gold', 'Gold', 5000.00, 10.00, '["Priority Restaurant Booking", "Access to Private Lounges", "Complimentary Valet", "Invitations to Tasting Events"]'::jsonb, TRUE, '#e9c349'),
('tier-elite', 'Elite / Platinum', 12000.00, 15.00, '["Dedicated 24/7 Concierge", "Unlimited Spa & Wellness Access", "Guaranteed Tables Anytime", "Global Reciprocal Club Access"]'::jsonb, TRUE, '#4b5320')
ON CONFLICT (id) DO NOTHING;

-- 5. USERS
INSERT INTO users (id, name, email, phone, role_id, location_id, membership_tier_id, status, avatar, loyalty_points, member_since_year) VALUES
('usr-1', 'Alexander Pierce', 'alexander.p@restroclub.com', '+91 98765 43210', 'role-customer', 'loc-1', 'tier-elite', 'ACTIVE', 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0J-NYpqTYPhp8S1bvqo1eiGpCwsp8nv2eA54uSwcDrN7Yf1C8jXvzBOeQwl-YkD2JMwQKjRqRnD6NiVNSFXe5RFMyMLFRchN2Ow-MwfJqiChUHYE7Cb40Ow-S7SzvlUohq9yRKPMGPGVZIKRJQi7UDIucLX290MGQvmvMjFyV1TsPAnQ7ZGsfwvuJp5cDBkqrNJ7HWtlCb0LAysDKAjU1ZXMdkH8GHUsOBp5gDDPeCBCrRNsDqugv8A', 42500, 2021),
('usr-admin', 'Super Admin Command', 'admin@restroclub.com', '+91 98000 00000', 'role-superadmin', 'loc-1', 'tier-elite', 'ACTIVE', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDN89UsCcebqpcNV3WmPU6OkOBQ4UBHXaEazIcy9iYEaNxbZ6HDO4pqSIkf-ZzHwUTc3Gc3khWZc7nxAMfJSGtXhzW6LS2IhrRHCVer2HIIecVRQH-OW59AZaf66OMNsRUbToTGHDqa2ogL2ncBgzufiCacUErUOjtZdvwQC1_7pPjr6VQgfvz5fREEymjARKfli6RLPgzCPpVqWX_8Lxf3tfBwjo-Y5KiPWh5J6r-iUBECQE0ze0j-VA', 100000, 2020)
ON CONFLICT (id) DO NOTHING;

-- 6. FACILITIES
INSERT INTO facilities (id, name, category, location_id, court_details, slot_duration_minutes, capacity, member_price, guest_price, peak_price, status, rules, image) VALUES
('fac-1', 'Pickleball Courts', 'Racket Sports', 'loc-1', 'Courts 1-4', 60, 16, 0.00, 800.00, 1200.00, 'AVAILABLE', 'Non-marking sports shoes mandatory. Equipment available at concierge.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQUImvrsgSihwYS_3a783KlVZ7QQfmbzVpvmEzEvbCvWfu911NaLgY-6OQukyC_6XxYd7FENuRjp9QQ-Lcw4PIbWSY5QLVrI8d21crbVUReLFly166SjyWB-JEK06hmHBz4OsSn1KQxDdV8giX2garatThDmNnEFvub8KStfMbwwXF0E4EYDVLr9unswLPecTdLgVTf503QZttgNGK49FFT-QheY9D-05AexGnwvy5H4aW4bxXxU0XOQ'),
('fac-2', 'Box Cricket Arena', 'Indoor Games', 'loc-1', 'Indoor Turf Arena', 60, 12, 1500.00, 2200.00, 2500.00, 'BUSY', 'Soft ball cricket only. Professional turf boots strictly prohibited.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDychXh77Uc9TX24ibVQOJgISiswsfNDrw5R1-DwYCWPru5ENoSwDOz_-QLfkiA-5DPDXF0SSw3qcqsBWCMaZgLXntxT0tGH00-gLF6qdgASX31r99Mnys13OLr7i7XtAxvUrYIJ8gIM_Uso2eDzEFsN9QWZJ-s0IGzC-HTM0fqkudIIOhYusBCyNxquSaKcbABsmJZxRAJnxK14sCNV-MM_wLPkjknOjP2DDXf4Bi7SXw3HFJmu0H3gg'),
('fac-3', 'Swimming Pool', 'Water Sports', 'loc-1', 'Main Olympic Lap Pool & Lounge', 120, 40, 0.00, 1000.00, 1500.00, 'OPEN', 'Proper swimwear required. Lifeguard on duty from 6:00 AM to 10:00 PM.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoXWDSThGlvVhvUCnA6BNvkgMbfcnIkVgQ1Rotp-D2NgsRbSabK3zTV2CG6hoRN8oa9hUFKBer0ydmG-5yV6-HfDn_frOTptn3UJo1B8vs7gMlsDTtDeZwdBryKYnu3mO4ksCtyIaDoOovnHG4xy2IbR2kKU0tAjlU8sPLFg9GOD0spYgOJHSmcPQxvT8HR-nLoMTYKomd9H9hb9Im0yHmyRSnJ9OF7NWVzh41dIDTUG0JvFGik4WqpQ'),
('fac-4', 'Badminton Courts', 'Racket Sports', 'loc-1', 'Courts A & B (BWF Standard Synthetic)', 60, 8, 0.00, 600.00, 1000.00, 'AVAILABLE', 'YONEX feather shuttles provided for tournament play.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTWnZ5RCt5TK555zmIWDmtr6Hh1V1IdCf1IW_2mFd8VGR5AOTbOnLmpV8KgLsR4-CJi98Trj5-Gcny4XAVgIXICXZfc16loDRcwGxqXSZfac3M-R2UqTP3tr4pr0l_WxussyHdA0jc__Q0xvoDsfs7lwbiGBMm5mTHGvt_jwI5FiiRv4dUieuRaqovxjOjFiDsRDyHmFGij92cYHadeDEmtSgq_QMf9qJCyjH5wistCwkdQ15Z4uhYmw')
ON CONFLICT (id) DO NOTHING;

-- 7. MENU CATEGORIES
INSERT INTO menu_categories (id, name, display_order, description) VALUES
('cat-sig', 'Signature Dishes', 1, 'Michelin-inspired royal creations'),
('cat-app', 'Appetizers', 2, 'Artisanal small plates & starters'),
('cat-main', 'Mains', 3, 'Seared meats, pastas & artisanal curries'),
('cat-bev', 'Beverages & Cellar', 4, 'Craft cocktails, aged whiskies & fine wines')
ON CONFLICT (id) DO NOTHING;

-- 8. MENU ITEMS
INSERT INTO menu_items (id, name, category_id, price, making_cost, description, image, prep_time_minutes, calories, allergens, dietary_type, is_signature, in_stock, stock_count) VALUES
('item-1', 'Signature Scallops', 'cat-sig', 4500.00, 1400.00, 'Pan-seared to perfection, finished with brown butter, Oscietra caviar and a hint of white truffle.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQ0autCWUNc1m9QoCUB2naO_Ms8PyzFZejWLR3QPrXK8qBEoUCihMeCCMSmW6RTWHvDuxar8KCIySIKZ7vUD-2Vcqu_Mkvm3hiokA3a5qve15LBbWAXm3HpkbDbSbXLZGQc5B1OnVHrrDUnuswJfQe9NyHU_aUKiCFShIsc5e6nhhZWnoJR60Jc5ZU22XgTjP27VtJXuaO6pDLs04FoonrFa3Ga6cQgNTjtdNQsWAf3DjeRaV4WGxeZA', 20, 420, '["Shellfish", "Dairy"]'::jsonb, 'NON_VEGETARIAN', TRUE, TRUE, 30),
('item-2', 'Wagyu Truffle Reserve', 'cat-sig', 6500.00, 2200.00, 'A5 grade Wagyu striploin, seared to perfection, served with black truffle pomme purée and bone marrow demi-glace.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAclV0UV5EzTDU-GLQxG6hqLBSc1y-fV_sBPFLKWGI5Bl05tF244Tnb08wa81sACTWBAZcjs9d3uFkvMXua2fWMeHW9Vrqnzn19X2rnz38pVRKlXhyNVd_03OyQSJ4troS9hAWLFMlPI_hy7gqON09Fukp5peFuvtb08AWta-wyYcFBhCpJb5VknOcpM5h0udA29P_MEJsUWC69ZnqoM0PbYGAooFe7vSERYPUuZGuCiLLEqLAfOHyLew', 25, 780, '["Dairy"]'::jsonb, 'NON_VEGETARIAN', TRUE, TRUE, 15),
('item-3', 'Saffron Scallop Risotto', 'cat-sig', 3200.00, 950.00, 'Hokkaido scallops, aged carnaroli rice, saffron infusion, finished with Oscietra caviar and edible gold.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuD32ZFaEKIW2fwUYV0zW7CmK1k_PMkafssjwuqi3KFCrh-DrTZv_QQ2rxUy8OwBG5_d-_l94IBGeqLUSWX6tLPm7NwzNwSv4fmXKq9AhAcKy49gWzORuGT8gIClErSvzYS8LX84TV7a1KrtE60GnXzsy_A0KHNjaOxrmA7Ektghhx5PQFj2Je0Vk9MdQHnHmFTebMXBDOB4hg3-zclhmTSzmqqhGwHJYoiIoLSDjEgLk5XJ_wNbvLMy8g', 18, 510, '["Shellfish", "Dairy"]'::jsonb, 'NON_VEGETARIAN', TRUE, TRUE, 25),
('item-4', 'Truffle Risotto', 'cat-main', 2800.00, 800.00, 'Wild mushroom reduction, black winter truffle shaving, Parmigiano-Reggiano cream.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGTHTSxQTycgVR3qXqFsCPGjHnpnaSgTjyqX93G-hQtR8SVP4eQdltS-egYo5rA8hpTeACzN3GJQVLkpwz_yxNYhsy28NGQxXtKXPjwfmU9HoF_KGlXBnVLeDhEX25Ns6pC8d7BHjfwpSV-wo2ncTuu3v7R2EOSEMY5Etd3Bf56a5GIis3sOaCetcUfqzrQuz25dKZd6fCs3vdttnlbl5-3EtT8-J-ocCYLUvWbLsEul5PwZW9FLrehQ', 20, 480, '["Dairy", "Mushrooms"]'::jsonb, 'VEGETARIAN', FALSE, TRUE, 40),
('item-5', 'Artisan Cheese Board', 'cat-app', 1800.00, 550.00, 'Selection of imported European cheeses, truffle honey, candied walnuts and warm lavash.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxi51bhApOWpxjGsSKDE9-gCNrrnN-OODOyubSf4SgUJX7JrE815m_sTozcx8h79ZySps_rabNZwrbR8ZYKwJB2ZsGD3nl2Nd5jHCjVwXIaZehrsFTQHyDdMDhtxmhQqlEyY41ApCzgxO0u5OWuUFYacYZU-2SfIbJ8ppiLDh0us31DohUtdnY2oOrrsXrtcmA7jKOoyK_7p60i-0FkiM2B8mFmEbKnbzJpn7m03Ps5A0WGYSFDGI0gw', 10, 620, '["Dairy", "Nuts", "Gluten"]'::jsonb, 'VEGETARIAN', FALSE, TRUE, 50)
ON CONFLICT (id) DO NOTHING;

-- 9. DINING TABLES
INSERT INTO dining_tables (id, table_number, area_zone, capacity, qr_code_token, status, location_id) VALUES
('tbl-1', '12', 'Main Dining', 4, 'RC-TBL-12', 'OCCUPIED', 'loc-1'),
('tbl-2', '01', 'VIP Lounge', 6, 'RC-TBL-01', 'OCCUPIED', 'loc-1'),
('tbl-3', 'BAR-02', 'Bar Area', 2, 'RC-TBL-BAR02', 'OCCUPIED', 'loc-1'),
('tbl-4', '24', 'Main Dining', 4, 'RC-TBL-24', 'VACANT', 'loc-1'),
('tbl-5', 'CABANA-1', 'Poolside Cabana', 8, 'RC-TBL-CAB1', 'RESERVED', 'loc-1')
ON CONFLICT (id) DO NOTHING;

-- 10. ACCOMMODATION ROOMS
INSERT INTO accommodation_rooms (id, room_number, name, category, price_per_night, amenities, floor, capacity, status, image, description) VALUES
('room-1', '101', 'The Luxury Suite', 'The Luxury Suite', 35000.00, '["High-Speed WiFi", "Climate Control", "Private Pool Access", "24/7 Dining"]'::jsonb, '1st Floor', 2, 'AVAILABLE', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUy0Lq6lYiQ0TxYS2GhxYqxynf8CnUt1aaP1ZQ--i8uiZnZhwh2IFjDpc3j6n5YsSxxvM6_j9gjZTVy7B9mDvdPxSz1S2JD9aw1mx4Tc4dmmTI5fH8F3KKiAhjxf-etrxsoOIxBMu025bsputQzPeQUBIW4H5blty0DCc9HJZ-r1AfYR6X451LEehhMk2fTcRfunzHNCCagN9EHysfZenlmOLyIzAgw5v4AFWIwZcoLpdb1OthWM0KGg', 'Expansive living quarters overlooking the primary courts. Designed for absolute comfort and privacy.'),
('room-2', '202', 'Boutique 1BHK', 'Boutique 1BHK', 22000.00, '["High-Speed WiFi", "Climate Control", "Gym Access"]'::jsonb, '2nd Floor', 2, 'AVAILABLE', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDXn49nkE6aolZhizwFMeO23of2rCUisesYVA-Cbffssvn69YF3rGOcE7VmpPssk78UBsXAPTxw92Uq4m-YwK0kGkEsXB9W9AzJsOi48-SYiK5_GQmxVza2v_wWKEPXSp6CL-g9HcWkbjiW7Lxkil6J2tCPAsFrSHxgB7hrBocpaMG0rWZX0JmdnDCBto6o2eOISS_ZVSuw3EWwJYY0l1ZK-3ySTDMatbCs7Cva32BjABOh8gDLbm1Bg', 'Intimate and refined. The perfect retreat after an active day, featuring bespoke furnishings.'),
('room-3', 'PH-01', 'Penthouse Suite', 'Penthouse Suite', 45000.00, '["Private Jacuzzi", "Personal Butler", "High-Speed WiFi", "Helipad Access"]'::jsonb, 'Top Floor', 4, 'RESERVED', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBh17Z2SW204W83Pcaq7oiyRXgYM6We-wlUfa4fjD7X7RUAD0AQ6u7jLebkTnxacLIaAfP4L6xHerBSHUlncYj4HuxSesROSgcvTtDSIcdlPkKDasu5jj6RxMCVtHgoEA6BHyJceG3Er4A8xvWKnErNFZjFAgPfSXmvcGayu0C7tnL8XhdlnJV9relvfMuCfSEr-qQ7Wmy-XZFXPOMckEX-9nZPy0-oJX5w8baIXUsPlBItvQdF7Qhv0g', 'Top floor sanctuary with floor-to-ceiling panoramic views of the resort grounds.')
ON CONFLICT (id) DO NOTHING;

-- 11. EMPLOYEES
INSERT INTO employees (id, employee_code, name, department_id, designation, salary_monthly, joining_date, phone, status, location_id) VALUES
('emp-1', 'EMP-001', 'Julian Vance', 'dept-1', 'Executive Chef', 185000.00, '2021-04-15', '+91 98111 22233', 'ACTIVE', 'loc-1'),
('emp-2', 'EMP-002', 'Rohan Sharma', 'dept-2', 'Sports Operations Lead', 95000.00, '2022-01-10', '+91 98222 33344', 'ACTIVE', 'loc-1'),
('emp-3', 'EMP-003', 'Priya Nair', 'dept-3', 'Front Desk Manager', 85000.00, '2022-06-01', '+91 98333 44455', 'ACTIVE', 'loc-1'),
('emp-4', 'EMP-004', 'Manpreet Singh', 'dept-5', 'HR & Payroll Head', 110000.00, '2020-09-15', '+91 98444 55566', 'ACTIVE', 'loc-1')
ON CONFLICT (id) DO NOTHING;

-- 12. INVENTORY
INSERT INTO inventory (id, item_code, name, category, unit, current_stock, min_stock_threshold, unit_cost, supplier_name, location_id) VALUES
('inv-1', 'INV-ALC-01', 'Macallan 25 Sherry Oak Single Malt', 'Spirits & Beverages', 'bottles', 3.00, 10.00, 145000.00, 'Highland Importers Ltd', 'loc-1'),
('inv-2', 'INV-ALC-02', 'Johnnie Walker Blue Label 750ml', 'Spirits & Beverages', 'bottles', 5.00, 15.00, 22000.00, 'Diageo Luxury Sales', 'loc-1'),
('inv-3', 'INV-FOOD-01', 'A5 Japanese Wagyu Striploin', 'Raw Ingredients', 'kg', 18.00, 5.00, 16000.00, 'Tokyo Gourmet Meats', 'loc-1'),
('inv-4', 'INV-FOOD-02', 'White Winter Truffles (Alba)', 'Raw Ingredients', 'kg', 2.00, 1.00, 280000.00, 'Piedmont Fine Foods', 'loc-1')
ON CONFLICT (id) DO NOTHING;

-- 13. ORDERS
INSERT INTO orders (id, order_number, location_id, table_id, table_name, guest_name, guest_count, items, subtotal, tax, discount, total, status, is_vip, has_allergy, allergy_notes, wait_minutes) VALUES
('ord-842', '842', 'loc-1', 'tbl-1', 'Table 12', 'Eleanor Vance', 4, '[{"itemId": "item-4", "itemName": "Truffle Risotto", "quantity": 2, "allergyNotice": "No Mushrooms"}, {"itemId": "item-2", "itemName": "Wagyu Ribeye", "quantity": 1, "notes": "Medium Rare, extra jus"}]'::jsonb, 12100.00, 1210.00, 1210.00, 12100.00, 'PREPARING', TRUE, TRUE, 'No Mushrooms', 25),
('ord-844', '844', 'loc-1', 'tbl-2', 'VIP Table 01', 'James Davenport', 2, '[{"itemId": "item-1", "itemName": "Seared Scallops", "quantity": 3}]'::jsonb, 13500.00, 1350.00, 1350.00, 13500.00, 'PREPARING', TRUE, FALSE, NULL, 12),
('ord-845', '845', 'loc-1', 'tbl-3', 'Bar Area', 'Walk-In Guest', 2, '[{"itemId": "item-5", "itemName": "Artisan Cheese Board", "quantity": 1}]'::jsonb, 1800.00, 180.00, 0.00, 1980.00, 'RECEIVED', FALSE, FALSE, NULL, 2)
ON CONFLICT (id) DO NOTHING;

-- 14. BOOKINGS
INSERT INTO bookings (id, booking_ref, location_id, type, title, target_id, guest_name, guest_email, date, time_slot, guests_count, total_amount, payment_status, status, notes) VALUES
('bk-1', 'RC-BK-8891', 'loc-1', 'DINING', 'The Chef''s Table', 'tbl-1', 'Alexander Pierce', 'alexander.p@restroclub.com', '2026-08-13', '20:00', 2, 8500.00, 'PAID', 'CONFIRMED', 'Anniversary table preference near window'),
('bk-2', 'RC-BK-9022', 'loc-1', 'STAY', 'Penthouse Suite Stay', 'room-3', 'Alexander Pierce', 'alexander.p@restroclub.com', '2026-10-12 to 2026-10-15', 'Check-in 14:00', 2, 135000.00, 'PAID', 'CONFIRMED', NULL),
('bk-3', 'RC-BK-7712', 'loc-1', 'SPORTS', 'Pickleball Court 1', 'fac-1', 'Alexander Pierce', 'alexander.p@restroclub.com', '2026-08-14', '08:00 AM', 4, 0.00, 'PAID', 'CONFIRMED', NULL)
ON CONFLICT (id) DO NOTHING;

-- 15. REVIEWS
INSERT INTO reviews (id, author_name, author_role, rating, date_ago, category, comment, sentiment, avatar, management_reply, replied_at) VALUES
('rev-1', 'Eleanor Vance', 'Member', 5, '2 days ago', 'Dining', 'The tasting menu at the Oak Room was extraordinary. Chef Julian''s attention to seasonal ingredients is unparalleled.', 'EXCEPTIONAL', 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5MrKU2czynxxrNylxnq5gT-WR5J0B1wJoR2fC4VDb4EycAW2dOJgHCu6hIYU2sTh-2h23Hi0EoDiAKXnIjKdGLRG0mJQbRK8QyzhRhhLhNMlm_CwOQBmdEzxKt8NqXm-59_zTiryBFfJqHp0FpccEQXb66DM274wDHvHBSBEQsj4fTUCtVj7Aymo9ueJFZjY3x_9CAkYxM74r6qiQQPIYb9R1E1sBqwqnKFcOFr8_m2fGddPWnmb1TQ', NULL, NULL),
('rev-2', 'James Davenport', 'Sports Member', 3, '3 days ago', 'Sports Club', 'The tennis courts are in great condition as always, but the booking system remains a frustration.', 'NEEDS_ATTENTION', NULL, 'Mr. Davenport, apologies for the friction. We are rolling out an update to the booking engine next week with dedicated priority slots for Gold & Elite members.', '2 days ago')
ON CONFLICT (id) DO NOTHING;
