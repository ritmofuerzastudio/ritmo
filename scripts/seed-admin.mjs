import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

function loadEnvFile(fileName) {
  const filePath = path.join(process.cwd(), fileName);

  if (!fs.existsSync(filePath)) {
    return;
  }

  const content = fs.readFileSync(filePath, "utf8");

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, "");

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(".env");
loadEnvFile(".env.local");

const requiredEnvVars = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "SUPABASE_SECRET_KEY",
  "SEED_ADMIN_EMAIL",
  "SEED_ADMIN_PASSWORD",
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Missing environment variable: ${envVar}`);
    process.exit(1);
  }
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

const adminName = process.env.SEED_ADMIN_NAME || "Administrador";
const adminEmail = process.env.SEED_ADMIN_EMAIL;
const adminPassword = process.env.SEED_ADMIN_PASSWORD;
const secretKey = process.env.SUPABASE_SECRET_KEY;

if (!secretKey.startsWith("sb_secret_")) {
  console.error(
    "SUPABASE_SECRET_KEY must be a Supabase secret key starting with sb_secret_. Do not use the publishable key here."
  );
  process.exit(1);
}

if (
  adminPassword.length < 8 ||
  !/[A-Z]/.test(adminPassword) ||
  !/[a-z]/.test(adminPassword) ||
  !/[0-9]/.test(adminPassword)
) {
  console.error(
    "SEED_ADMIN_PASSWORD must be at least 8 chars and include uppercase, lowercase and number."
  );
  process.exit(1);
}

async function findUserByEmail(email) {
  let page = 1;

  while (true) {
    const { data, error } = await supabase.auth.admin.listUsers({
      page,
      perPage: 200,
    });

    if (error) {
      throw error;
    }

    const user = data.users.find((entry) => entry.email === email);

    if (user) {
      return user;
    }

    if (data.users.length < 200) {
      return null;
    }

    page += 1;
  }
}

async function main() {
  const existingUser = await findUserByEmail(adminEmail);

  let userId = existingUser?.id;

  if (!existingUser) {
    const { data, error } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: {
        name: adminName,
        role: "admin",
      },
    });

    if (error || !data.user) {
      throw error ?? new Error("Could not create admin user.");
    }

    userId = data.user.id;
    console.log(`Created auth user: ${adminEmail}`);
  } else {
    const { error } = await supabase.auth.admin.updateUserById(existingUser.id, {
      password: adminPassword,
      user_metadata: {
        ...(existingUser.user_metadata ?? {}),
        name: adminName,
        role: "admin",
      },
      email_confirm: true,
      ban_duration: "none",
    });

    if (error) {
      throw error;
    }

    console.log(`Updated existing auth user: ${adminEmail}`);
  }

  const { error: profileError } = await supabase.from("profiles").upsert(
    {
      id: userId,
      email: adminEmail,
      name: adminName,
      role: "admin",
      is_active: true,
    },
    {
      onConflict: "id",
    }
  );

  if (profileError) {
    throw profileError;
  }

  console.log(`Seeded admin profile: ${adminEmail}`);
}

main().catch((error) => {
  if (error?.code === "no_authorization") {
    console.error(
      "Supabase rejected the admin request. Verify that SUPABASE_SECRET_KEY is the project's secret key from Settings > API Keys, not the publishable key."
    );
    process.exit(1);
  }

  console.error(error);
  process.exit(1);
});
