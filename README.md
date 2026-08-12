# Edebî Atlas

Vercel'e ücretsiz yüklenebilecek, bağımlılıksız statik edebiyat sitesi.

## Özellikler

- Üyelik sistemi yoktur.
- Admin girişi vardır. Varsayılan demo şifresi: `admin123`.
- Konu başlığı ve gönderi ekleme yalnızca admin girişinden sonra görünür.
- Ziyaretçiler gönderilere isim-soyisim ve yorum metni ile yorum yapabilir.
- İçerikler tarayıcı `localStorage` alanına kaydedilir; aynı cihaz/tarayıcıda sayfa yenilense de korunur.

## Vercel'e ZIP ile yükleme

1. `edebiatlas-vercel-site.zip` dosyasını indirip açın.
2. Vercel'de yeni proje oluşturun.
3. ZIP içeriğini veya klasörü Vercel'e yükleyin.
4. Build command: `npm run build`
5. Output directory: `dist`

## Önemli not

Bu proje tamamen statiktir. Bu nedenle yorumlar ve adminin eklediği içerikler her ziyaretçinin kendi tarayıcısında saklanır. Herkese ortak, kalıcı yorum sistemi istenirse Vercel KV, Supabase, Firebase veya benzeri bir veritabanı bağlanmalıdır.
