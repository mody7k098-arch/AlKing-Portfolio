# AlKing Portfolio

موقع Portfolio احترافي لـ AlKing، جاهز للنشر على GitHub Pages.

## تشغيله محلياً
افتح `index.html` مباشرة في المتصفح.

## إضافة Plugin / مشروع
افتح `data.js` وستجد مصفوفة `projects`.

مثال:
```js
{
  title: "My Plugin",
  category: "Custom Plugin",
  version: "Paper 1.21.11",
  image: "assets/images/my-plugin.png",
  description: "وصف المشروع.",
  features: ["GUI", "Config", "Performance"],
  download: "https://example.com/download"
}
```

ضع الصورة داخل:
`assets/images/`

## تعديل Discord و Email
افتح `script.js` وعدّل:
```js
const settings = {
  discord: "https://discord.gg/YOUR_SERVER",
  email: "YOUR_EMAIL@example.com"
};
```

## نشره على GitHub Pages
1. أنشئ Repository جديد على GitHub.
2. ارفع كل ملفات المجلد كما هي.
3. Settings → Pages.
4. اختر Deploy from a branch.
5. اختر `main` و `/ (root)`.
6. Save.

الموقع لا يحتاج Backend أو قاعدة بيانات.


## Project Media

Edit `data.js` to choose the media for each project.

### Multiple images
```js
type: "images",
images: [
  "assets/images/one.png",
  "assets/images/two.png",
  "assets/images/three.png"
]
```

### One image
```js
type: "image",
image: "assets/images/project.png"
```

### YouTube / Shorts
```js
type: "youtube",
video: "https://youtube.com/shorts/VIDEO_ID"
```

You can also use normal YouTube links or `youtu.be` links.

### Local MP4
Put the video inside `assets/videos/`, then:
```js
type: "mp4",
video: "assets/videos/my-video.mp4"
```

The project cards show an image/YouTube thumbnail, while opening a project shows the full image gallery or playable video.
