const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
async function run() {
  const { data, error } = await supabase.from('banners').select('id, image')
  console.log('Banners Images:', data)
}
run()
