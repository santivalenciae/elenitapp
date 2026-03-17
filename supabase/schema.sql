-- ============================================
-- Limonaria — Supabase Schema
-- ============================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================
-- TABLES
-- ============================================

-- Profiles (extends auth.users)
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  username text not null unique,
  team_id text check (team_id in ('cat', 'dog', 'squirrel', 'bear')),
  level integer not null default 1,
  xp integer not null default 0,
  fruitcoins integer not null default 0,
  active_pet_id uuid,
  created_at timestamptz default now()
);

-- Questions bank
create table if not exists public.questions (
  id uuid primary key default uuid_generate_v4(),
  subject text not null check (subject in ('math', 'reading', 'science', 'speed')),
  difficulty integer not null check (difficulty between 1 and 5),
  question_text text not null,
  options jsonb not null,           -- array of 4 strings
  correct_index integer not null check (correct_index between 0 and 3),
  xp_reward integer not null default 10,
  created_at timestamptz default now()
);

-- User progress per subject
create table if not exists public.user_progress (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  subject text not null,
  questions_answered integer not null default 0,
  questions_correct integer not null default 0,
  total_xp_earned integer not null default 0,
  updated_at timestamptz default now(),
  unique (user_id, subject)
);

-- Pets catalog
create table if not exists public.pets (
  id uuid primary key default uuid_generate_v4(),
  name text not null unique,
  sprite_url text,
  rarity text not null check (rarity in ('common', 'rare', 'epic', 'legendary')),
  created_at timestamptz default now()
);

-- User-owned pets
create table if not exists public.user_pets (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  pet_id uuid references public.pets(id) on delete cascade not null,
  obtained_at timestamptz default now(),
  unique (user_id, pet_id)
);

-- Cosmetics catalog
create table if not exists public.cosmetics (
  id uuid primary key default uuid_generate_v4(),
  name text not null unique,
  type text not null,               -- 'avatar_frame', 'background', 'badge', etc.
  preview_url text,
  fruitcoin_price integer not null default 50,
  created_at timestamptz default now()
);

-- User-owned cosmetics
create table if not exists public.user_cosmetics (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  cosmetic_id uuid references public.cosmetics(id) on delete cascade not null,
  obtained_at timestamptz default now(),
  unique (user_id, cosmetic_id)
);

-- Transaction log
create table if not exists public.transactions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  type text not null,               -- 'level_up', 'purchase', 'egg_duplicate'
  fruitcoins_delta integer not null default 0,
  metadata jsonb default '{}',
  created_at timestamptz default now()
);

-- ============================================
-- RPC FUNCTIONS
-- ============================================

create or replace function public.add_fruitcoins(uid uuid, amount integer)
returns void language plpgsql security definer as $$
begin
  update public.profiles set fruitcoins = fruitcoins + amount where id = uid;
end;
$$;

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

alter table public.profiles enable row level security;
alter table public.user_progress enable row level security;
alter table public.user_pets enable row level security;
alter table public.user_cosmetics enable row level security;
alter table public.transactions enable row level security;
alter table public.questions enable row level security;
alter table public.pets enable row level security;
alter table public.cosmetics enable row level security;

-- Profiles: users can read/update their own
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);

-- User progress
create policy "progress_select_own" on public.user_progress for select using (auth.uid() = user_id);
create policy "progress_insert_own" on public.user_progress for insert with check (auth.uid() = user_id);
create policy "progress_update_own" on public.user_progress for update using (auth.uid() = user_id);

-- User pets
create policy "user_pets_select_own" on public.user_pets for select using (auth.uid() = user_id);
create policy "user_pets_insert_own" on public.user_pets for insert with check (auth.uid() = user_id);

-- User cosmetics
create policy "user_cosmetics_select_own" on public.user_cosmetics for select using (auth.uid() = user_id);
create policy "user_cosmetics_insert_own" on public.user_cosmetics for insert with check (auth.uid() = user_id);

-- Transactions
create policy "transactions_select_own" on public.transactions for select using (auth.uid() = user_id);
create policy "transactions_insert_own" on public.transactions for insert with check (auth.uid() = user_id);

-- Public read for catalog tables
create policy "questions_public_read" on public.questions for select using (true);
create policy "pets_public_read" on public.pets for select using (true);
create policy "cosmetics_public_read" on public.cosmetics for select using (true);

-- ============================================
-- SEED DATA — Questions (5 per subject)
-- ============================================

insert into public.questions (subject, difficulty, question_text, options, correct_index, xp_reward) values
-- Math
('math', 1, '¿Cuánto es 5 + 3?', '["6","8","9","7"]', 1, 10),
('math', 1, '¿Cuánto es 10 - 4?', '["5","7","6","8"]', 2, 10),
('math', 2, '¿Cuánto es 6 × 7?', '["40","42","45","36"]', 1, 15),
('math', 2, '¿Cuánto es 48 ÷ 6?', '["7","6","9","8"]', 3, 15),
('math', 3, '¿Cuánto es 15 × 4?', '["55","65","60","70"]', 2, 20),
('math', 1, '¿Cuántos lados tiene un triángulo?', '["2","4","3","5"]', 2, 10),
('math', 2, '¿Cuánto es 25% de 80?', '["15","20","25","30"]', 1, 15),
('math', 3, '¿Cuánto es 12²?', '["132","144","124","148"]', 1, 20),
('math', 1, '¿Cuánto es 100 - 37?', '["73","63","53","67"]', 1, 10),
('math', 2, '¿Cuánto es 3 × 9?', '["24","27","30","21"]', 1, 15),
-- Reading
('reading', 1, '¿Cuál es sinónimo de "feliz"?', '["triste","contento","enojado","aburrido"]', 1, 10),
('reading', 1, '¿Qué tipo de texto cuenta una historia imaginada?', '["artículo","cuento","receta","carta"]', 1, 10),
('reading', 2, '¿Qué significa la palabra "amistad"?', '["enemistad","relación de compañerismo","competencia","rivalidad"]', 1, 15),
('reading', 2, '¿Cuál es el antónimo de "rápido"?', '["veloz","ágil","lento","fuerte"]', 2, 15),
('reading', 3, '¿Qué es una metáfora?', '["comparación directa","descripción literal","comparación sin usar como","pregunta retórica"]', 2, 20),
('reading', 1, '¿Cuántas sílabas tiene "mariposa"?', '["3","4","5","2"]', 1, 10),
('reading', 2, '¿Qué es el protagonista de una historia?', '["El lugar","El personaje principal","El problema","El final"]', 1, 15),
('reading', 1, '¿Cuál de estas palabras es un sustantivo?', '["correr","bonito","casa","rápido"]', 2, 10),
('reading', 2, '¿Qué signos se usan para indicar una pregunta en español?', '["!! y !","¿? y ?","() y ()","— y —"]', 1, 15),
('reading', 3, '¿Qué es el desenlace de un cuento?', '["El inicio de la historia","Donde ocurre el problema","La solución y final","La descripción del lugar"]', 2, 20),
-- Science
('science', 1, '¿Qué hace la fotosíntesis?', '["Respirar","Hacer comida con luz solar","Moverse","Reproducirse"]', 1, 10),
('science', 1, '¿Cuántos planetas hay en el Sistema Solar?', '["7","9","8","10"]', 2, 10),
('science', 2, '¿Cuál es el gas que respiramos?', '["Dióxido de carbono","Hidrógeno","Oxígeno","Nitrógeno"]', 2, 15),
('science', 2, '¿Qué animal es un mamífero?', '["Cocodrilo","Ballena","Serpiente","Tortuga"]', 1, 15),
('science', 3, '¿Qué tipo de energía tiene una pelota en movimiento?', '["Potencial","Térmica","Cinética","Química"]', 2, 20),
('science', 1, '¿Qué planeta es el más grande del Sistema Solar?', '["Saturno","Tierra","Júpiter","Neptuno"]', 2, 10),
('science', 2, '¿Cuántas fases tiene el ciclo del agua?', '["2","4","3","5"]', 2, 15),
('science', 1, '¿Qué órgano bombea la sangre?', '["Pulmón","Riñón","Hígado","Corazón"]', 3, 10),
('science', 2, '¿De qué está hecha una célula vegetal que no tiene la animal?', '["Membrana","Pared celular","Núcleo","Citoplasma"]', 1, 15),
('science', 3, '¿Qué es la gravedad?', '["Una fuerza de repulsión","Una fuerza de atracción entre masas","Un tipo de energía","Un estado de la materia"]', 1, 20)
on conflict do nothing;

-- ============================================
-- SEED DATA — Pets
-- ============================================

insert into public.pets (name, rarity) values
('Limoncito', 'common'),
('Naranjo', 'common'),
('Mandarina', 'common'),
('Toronja Rosa', 'common'),
('Kiwi Verde', 'common'),
('Fresa Brillante', 'rare'),
('Mango Dorado', 'rare'),
('Uva Morada', 'rare'),
('Piña Solar', 'epic'),
('Dragón Frutal', 'epic'),
('Limonix Jr.', 'legendary')
on conflict do nothing;

-- ============================================
-- SEED DATA — Cosmetics
-- ============================================

insert into public.cosmetics (name, type, fruitcoin_price) values
('Marco Dorado', 'avatar_frame', 30),
('Marco Naranja', 'avatar_frame', 20),
('Fondo Limón', 'background', 25),
('Fondo Arcoíris', 'background', 50),
('Insignia Estrella', 'badge', 15),
('Sombrero de Explorador', 'hat', 40)
on conflict do nothing;
