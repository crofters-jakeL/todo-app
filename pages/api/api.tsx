import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    "https://ddcfojcqrxojfcoupqxa.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMTExODcyOSwiZXhwIjoxOTQ2Njk0NzI5fQ.S1s0lCLkvI2HrXUZLDLBk4HuIkC4BaIY7DEZjkVEsuo",
);