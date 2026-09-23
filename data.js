/*
  ========================================
  ALKING PROJECTS
  ========================================

  أنواع الميديا المدعومة:

  1) صور متعددة:
     type: "images"
     images: [
       "assets/images/image1.png",
       "assets/images/image2.png"
     ]

  2) صورة واحدة:
     type: "image"
     image: "assets/images/project.png"

  3) فيديو محلي MP4:
     type: "mp4"
     video: "assets/videos/video.mp4"

  4) YouTube / YouTube Shorts:
     type: "youtube"
     video: "https://www.youtube.com/watch?v=VIDEO_ID"

  ========================================
*/

const projects = [

  // ========================================
  // DONUT SHOP
  // ========================================
  {
    title: "Donut Shop",
    category: "Custom Plugin",
    version: "Paper 1.21.x",

    type: "images",

    images: [
      "assets/images/2026-08-15_15.34.27.png",
      "assets/images/2026-08-15_15.34.29.png",
      "assets/images/2026-08-15_15.34.31.png"
    ],

    description:
      "سيف مخصص بنظام Enchantments وخصائص قابلة للتعديل، مصمم ليكون جزءاً من نظام Items مخصص.",

    features: [
      "Custom Item",
      "Enchantments",
      "Configurable",
      "Performance"
    ],

    download: "https://www.mediafire.com/file/vikmmf3vnlx5rqk/ALKing-ShopX.jar/file"
  },


  // ========================================
  // ALKING CHAT
  // ========================================
  {
    title: "AlKing Chat",
    category: "Plugins",
    version: "Paper 1.21.x",

    type: "youtube",

    video:
      "https://youtube.com/shorts/Sp8sXknqV2I?si=8LazhH7dnsgs9n0q",

    description:
      "تنظيم الشات وعمل شات احترافي.",

    features: [
      "Chat",
      "Color",
      "Formatting"
    ],

    download: "https://www.mediafire.com/file/ipkc0gslvnbrtii/AlKingChat.jar/file"
  },


  // ========================================
  // BOXPVP
  // ========================================
  {
    title: "BoxPvP Core",
    category: "Server System",
    version: "Paper 1.21.x",

    type: "image",

    image:
      "assets/images/project-placeholder.svg",

    description:
      "نظام أساس لـBoxPvP يركز على الـGameplay والاقتصاد والمكافآت وإدارة تجربة اللاعب.",

    features: [
      "PvP",
      "Economy",
      "Rewards",
      "GUI"
    ],

    download: "#"
  }

];
