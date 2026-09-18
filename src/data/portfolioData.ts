export interface ProjectItem {
  id: string;
  title: string;
  category: 'Full-Stack' | 'Data & AI' | 'Game & STEM';
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  features: string[];
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  credentialUrl?: string;
  image: string;
  skills: string[];
}

export interface TechSkill {
  name: string;
  level: number; // 0 - 100
  iconName: string;
  category: 'Programming Languages' | 'Web Development' | 'Data & Analytics' | 'Tools & Platforms';
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  achievements: string[];
  techUsed: string[];
}

export interface EducationItem {
  period: string;
  degree: string;
  institution: string;
  location: string;
  score?: string;
  description: string;
  highlights: string[];
}

export interface StatItem {
  label: string;
  value: number;
  suffix: string;
  description: string;
}

export const personalData = {
  name: "Adzka Arroya",
  typingTitles: [
    "Information Systems Student",
    "Full-Stack Web Developer",
    "Data Science Enthusiast",
    "Roblox Studio Mentor",
    "Business Intelligence Explorer"
  ],
  status: "Tersedia untuk Proyek & Peluang Baru",
  location: "Kabupaten Bekasi, Jawa Barat, Indonesia",
  bio: "Mahasiswa Sistem Informasi yang berfokus pada Full-Stack Web Development, Data Science, dan Business Intelligence. Berpengalaman membangun platform web skalabel dengan Laravel & Docker, analisis data tingkat lanjut, serta mentoring bidang STEM/IT.",
  aboutDetailed: [
    "Halo! Saya Adzka Arroya, mahasiswa Sistem Informasi di Telkom University dengan keahlian mendalam di bidang Full-Stack Web Development, Data Science, dan Business Intelligence.",
    "Saya memiliki rekam jejak teruji dalam merancang dan mengembangkan platform web skalabel menggunakan arsitektur Laravel, Livewire, Docker Sail, dan MySQL, termasuk sistem layanan publik yang melayani lebih dari 4.500 warga di Desa Denanyar.",
    "Selain rekayasa perangkat lunak, saya aktif berkontribusi dalam riset algoritma Machine Learning di PUI-PT AICOMS Telkom University, serta mengajar pemrograman game 3D & computational thinking berbasis Lua di Ruangguru (Roblox Scholarship Program). Saya juga seorang Hafidz 30 Juz Al-Qur'an dari Pondok Tahfidz Sulaimaniyah."
  ],
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  resumeUrl: "#",
  email: "yakokapa@gmail.com",
  phone: "+62 819-0660-2421",
  whatsappUrl: "https://wa.me/6281906602421",
  socials: {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/in/adzka-arroya-2789212a1",
    instagram: "https://instagram.com/",
    discord: "https://discord.com/",
    twitter: "https://twitter.com/"
  }
};

export const statsData: StatItem[] = [
  {
    label: "Warga Terlayani",
    value: 4500,
    suffix: "+",
    description: "Pengguna sistem layanan publik & surat menyurat Desa Denanyar"
  },
  {
    label: "Hafalan Al-Qur'an",
    value: 30,
    suffix: " Juz",
    description: "Hafidz 30 Juz dari Pondok Tahfidz Sulaimaniyah"
  },
  {
    label: "Sertifikasi Resmi",
    value: 5,
    suffix: "+",
    description: "Kredensial dari Google, DQLab, Coursera & Dicoding"
  },
  {
    label: "Peran Profesional",
    value: 6,
    suffix: "+",
    description: "Ruangguru Mentor, Researcher AICOMS, Web Specialist, dll."
  }
];

export const educationData: EducationItem[] = [
  {
    period: "2025 - Sekarang",
    degree: "Bachelor of Science in Information Systems (S1 Sistem Informasi)",
    institution: "Telkom University",
    location: "Bandung, Jawa Barat, Indonesia",
    score: "Active Student",
    description: "Mendalami arsitektur sistem informasi enterprise, basis data, rekayasa perangkat lunak, business intelligence, dan penerapan data science untuk pengambilan keputusan strategis.",
    highlights: [
      "Research Assistant di PUI-PT AICOMS (Pusat Unggulan IPTEKS Advanced Intelligent Communications)",
      "Fokus riset pada integrasi algoritma Machine Learning dan teknologi telekomunikasi cerdas",
      "Aktif dalam pengembangan proyek perangkat lunak berbasis tim dan riset akademik"
    ]
  },
  {
    period: "Lulus 2019",
    degree: "Secondary Education / Al-Qur'an Memorization Program (Hafidz 30 Juz)",
    institution: "Pondok Tahfidz Sulaimaniyah",
    location: "Indonesia",
    score: "Hafidz 30 Juz Mutqin",
    description: "Menyelesaikan program intensif tahfidz Al-Qur'an 30 Juz dengan kedisiplinan tinggi, ketekunan mental, daya ingat analitis yang kuat, dan pembentukan integritas karakter.",
    highlights: [
      "Menghafal 30 Juz Al-Qur'an secara sempurna (Hafidz 30 Juz)",
      "Melatih disiplin waktu, fokus mendalam, dan ketahanan dalam pemecahan masalah kompleks"
    ]
  }
];

export const experienceData: ExperienceItem[] = [
  {
    period: "Agustus 2026 - Sekarang",
    role: "Roblox Studio Master Teacher & Mentor",
    company: "Ruangguru",
    location: "Indonesia",
    description: "Membimbing siswa dalam program beasiswa Roblox Scholarship Program untuk memahami konsep fundamental pemrograman dan kreasi dunia virtual 3D.",
    achievements: [
      "Mengajarkan konsep fundamental algoritma, Lua scripting, dan pengembangan game 3D interaktif.",
      "Merancang dan mengimplementasikan aktivitas pembelajaran interaktif untuk menumbuhkan literasi STEM dan computational thinking siswa."
    ],
    techUsed: ["Lua", "Roblox Studio", "Game Development", "Computational Thinking", "STEM"]
  },
  {
    period: "Juli 2026 - Agustus 2026",
    role: "Full Stack Developer (Contract)",
    company: "Pemerintah Desa Denanyar",
    location: "Jawa Timur, Indonesia",
    description: "Merancang arsitektur dan membangun platform layanan publik desa berbasis web komprehensif yang melayani lebih dari 4.500 warga desa.",
    achievements: [
      "Mengembangkan arsitektur web skalabel menggunakan Laravel, Docker Sail, Livewire, Tailwind CSS, dan MySQL.",
      "Mengimplementasikan sistem administrasi permohonan online (Surat Menyurat Online) yang memangkas waktu birokrasi dan meningkatkan efisiensi operasional.",
      "Membangun dashboard administrator dinamis untuk visualisasi data demografi penduduk secara real-time, penerbitan berita desa, dan tata kelola program warga."
    ],
    techUsed: ["Laravel", "Livewire", "Tailwind CSS", "Docker Sail", "MySQL", "RESTful APIs"]
  },
  {
    period: "Juli 2026 - Sekarang",
    role: "Research Assistant",
    company: "PUI-PT AICOMS, Telkom University",
    location: "Bandung, Indonesia",
    description: "Berkontribusi dalam proyek riset akademik di Pusat Unggulan IPTEKS Advanced Intelligent Communications Telkom University.",
    achievements: [
      "Melakukan riset dan implementasi algoritma Machine Learning untuk optimasi sistem.",
      "Berkolaborasi dalam integrasi teknologi cerdas pada proyek penelitian pusat unggulan kampus."
    ],
    techUsed: ["Python", "Machine Learning", "Data Modeling", "Algorithm Analysis", "Research"]
  },
  {
    period: "Juli 2026 - Sekarang",
    role: "IT Teacher",
    company: "Sekolah Hamidah Sampurna",
    location: "Indonesia",
    description: "Mengembangkan kurikulum dan mengajar bidang Teknologi Informasi untuk meningkatkan literasi digital dan keterampilan teknis siswa.",
    achievements: [
      "Menyusun dan menyampaikan kurikulum teknologi informasi terstruktur untuk siswa.",
      "Meningkatkan literasi digital serta kemampuan teknis koding dasar bagi generasi muda."
    ],
    techUsed: ["IT Curriculum", "Digital Literacy", "Computer Fundamentals", "Teaching"]
  },
  {
    period: "Juli 2026 - Sekarang",
    role: "Web Maintenance Specialist",
    company: "Hamidah Group",
    location: "Indonesia",
    description: "Bertanggung jawab atas kelancaran operasional, keamanan, dan performa tinggi platform web perusahaan.",
    achievements: [
      "Memantau operasi harian, performa sistem, dan protokol keamanan di seluruh platform web perusahaan.",
      "Menjamin uptime dan reliabilitas sistem secara berkelanjutan bebas dari downtime."
    ],
    techUsed: ["System Monitoring", "Web Security", "Server Performance", "Uptime Optimization"]
  },
  {
    period: "Januari 2023 - Juni 2023",
    role: "Social Media Team & Barista",
    company: "Rudy Project Indonesia",
    location: "Indonesia",
    description: "Mengelola strategi konten media sosial untuk mendongkrak interaksi audiens dan menganalisis performa kampanye digital.",
    achievements: [
      "Menganalisis metrik performa untuk mengoptimalkan jangkauan digital dan brand engagement.",
      "Mengombinasikan komunikasi kreatif dengan evaluasi data interaksi media sosial."
    ],
    techUsed: ["Social Media Strategy", "Data Analytics", "Audience Engagement", "Content Planning"]
  }
];

export const projectsData: ProjectItem[] = [
  {
    id: "desa-denanyar",
    title: "Platform Layanan Publik Desa Denanyar",
    category: "Full-Stack",
    description: "Platform web terpadu layanan publik dan administrasi surat menyurat online melayani 4.500+ warga dengan visualisasi demografi real-time.",
    longDescription: "Sistem informasi pelayanan administrasi publik Desa Denanyar yang dirancang untuk mendigitalisasi birokrasi perdesaan. Dibangun menggunakan Laravel dan Docker Sail dengan dukungan Livewire & Tailwind CSS. Dilengkapi modul permohonan surat menyurat online otomatis, verifikasi berkas oleh perangkat desa, serta dashboard eksekutif visualisasi demografi penduduk.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80",
    tags: ["Laravel", "Livewire", "Tailwind CSS", "Docker Sail", "MySQL"],
    demoUrl: "https://example.com/demo-denanyar",
    githubUrl: "https://github.com/example/desa-denanyar-platform",
    featured: true,
    features: [
      "Pelayanan surat menyurat online untuk 4.500+ warga desa",
      "Dashboard visualisasi data kependudukan & demografi real-time",
      "Arsitektur containerized dengan Docker Sail untuk deployment stabil",
      "Sistem otentikasi peran (Admin Desa, Petugas, dan Warga)"
    ]
  },
  {
    id: "credit-risk-analytics",
    title: "Credit Risk Analysis & Financial Modeling",
    category: "Data & AI",
    description: "Sistem analisis risiko kredit perbankan berbasis Machine Learning untuk memprediksi probabilitas gagal bayar nasabah.",
    longDescription: "Proyek analisis data finansial mendalam yang menguji kelayakan kredit debitur perbankan. Menggunakan R dan Python untuk data preprocessing, exploratory data analysis (EDA), penanganan data tidak seimbang (SMOTE), dan pemodelan klasifikasi risiko dengan akurasi prediksi tinggi.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
    tags: ["R Language", "Python", "Credit Risk Analysis", "Data Modeling", "DQLab"],
    demoUrl: "https://example.com/demo-credit-risk",
    githubUrl: "https://github.com/example/credit-risk-modeling",
    featured: true,
    features: [
      "Model klasifikasi nasabah berisiko gagal bayar (Bad vs Good Customer)",
      "Analisis korelasi variabel finansial terhadap probabilitas default",
      "Visualisasi kurva ROC-AUC dan matriks performa klasifikasi",
      "Rekomendasi limit kredit berdasarkan credit scoring"
    ]
  },
  {
    id: "roblox-stem-curriculum",
    title: "Ruangguru Roblox STEM 3D Learning Space",
    category: "Game & STEM",
    description: "Modul interaktif pemrograman game 3D dan computational thinking menggunakan bahasa pemrograman Lua pada ekosistem Roblox.",
    longDescription: "Program pembelajaran interaktif yang dikembangkan untuk Roblox Scholarship Program Ruangguru. Berisi dunia simulasi fisika 3D, gameplay interaktif, dan materi pembelajaran scripting Lua yang melatih logika pemrograman serta computational thinking siswa.",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1000&q=80",
    tags: ["Lua Scripting", "Roblox Studio", "Computational Thinking", "Game Design"],
    demoUrl: "https://example.com/demo-roblox-stem",
    githubUrl: "https://github.com/example/roblox-stem-scholarship",
    featured: true,
    features: [
      "Dunia simulasi fisika 3D interaktif dengan mekanik kustom",
      "Sistem scoring dan quest berorientasi pemecahan masalah algoritma",
      "Scripting berbasis Lua dengan optimasi rendering objek",
      "Kurikulum terstruktur untuk peserta beasiswa STEM"
    ]
  },
  {
    id: "aicoms-ml-research",
    title: "AICOMS Machine Learning Algorithm Pipeline",
    category: "Data & AI",
    description: "Pipeline eksperimen Machine Learning untuk optimasi sistem telekomunikasi dan pengolahan pola data di PUI-PT AICOMS Telkom University.",
    longDescription: "Proyek riset akademik di Pusat Unggulan IPTEKS AICOMS Telkom University yang mengkaji algoritma Machine Learning dan Deep Learning untuk pemrosesan pola sinyal telekomunikasi, analisis anomali, serta integrasi model cerdas pada arsitektur sistem.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80",
    tags: ["Python", "Machine Learning", "Data Modeling", "Scikit-Learn", "Docker"],
    demoUrl: "https://example.com/demo-aicoms",
    githubUrl: "https://github.com/example/aicoms-ml-research",
    featured: false,
    features: [
      "Pipeline data preprocessing otomatis untuk dataset telemetri riset",
      "Perbandingan performa model Random Forest, SVM, dan Neural Networks",
      "Evaluasi akurasi, presisi, recall, dan F1-score model",
      "Dokumentasi eksperimen dan reproducibility codebase"
    ]
  },
  {
    id: "bi-executive-dashboard",
    title: "Google Business Intelligence Executive Dashboard",
    category: "Data & AI",
    description: "Dashboard analitik interaktif yang mengintegrasikan data SQL dan pemodelan BI untuk visualisasi KPI bisnis strategis.",
    longDescription: "Dashboard Business Intelligence komprehensif yang dirancang berdasarkan standar Google BI Professional. Mengubah data mentah relasional menjadi wawasan visual yang siap ditindaklanjuti oleh stakeholder melalui visualisasi interaktif.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
    tags: ["SQL", "Google Data Studio", "Business Intelligence", "Data Modeling"],
    demoUrl: "https://example.com/demo-bi-dashboard",
    githubUrl: "https://github.com/example/bi-executive-dashboard",
    featured: false,
    features: [
      "Query SQL optimal untuk agregasi data berskala besar",
      "Dashboard dinamis dengan filter tanggal, wilayah, dan kategori produk",
      "Visualisasi tren KPI penjualan, churn rate, dan profitabilitas",
      "Penerapan prinsip-prinsip data governance dan etika data"
    ]
  },
  {
    id: "web-security-monitor",
    title: "Hamidah Web Platform Monitor & Security Shield",
    category: "Full-Stack",
    description: "Sistem monitoring kesehatan server, pelacak uptime otomatis, dan audit keamanan protokol web platform.",
    longDescription: "Tool internal yang dibangun untuk memonitor uptime, latensi respon API, dan anomali traffic pada sistem web Hamidah Group. Mencegah downtime tak terduga serta memastikan protokol keamanan web tetap terjaga 24/7.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80",
    tags: ["PHP", "JavaScript", "MySQL", "Web Security", "Server Monitoring"],
    demoUrl: "https://example.com/demo-web-monitor",
    githubUrl: "https://github.com/example/web-security-monitor",
    featured: false,
    features: [
      "Pemeriksaan status HTTP dan respon server berkala",
      "Notifikasi instan saat terdeteksi lonjakan latency atau down",
      "Logging error otomatis dan rekam jejak insiden sistem",
      "Audit berkala sertifikat SSL dan kepatuhan header keamanan"
    ]
  }
];

export const certificatesData: CertificateItem[] = [
  {
    id: "cert-google-bi",
    title: "Google Business Intelligence Professional Certificate",
    issuer: "Google / Coursera",
    date: "Juli 2026",
    credentialId: "COURSERA-GOOGLE-BI-2026",
    credentialUrl: "https://coursera.org/verify/professional-cert/GOOGLE-BI-2026",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    skills: ["Business Intelligence", "Data Modeling", "SQL Querying", "Google Data Studio / Looker", "ETL Processes", "Executive Reporting"]
  },
  {
    id: "cert-dqlab-credit-risk",
    title: "Data Science in Finance: Credit Risk Analysis",
    issuer: "DQLab",
    date: "Juli 2026",
    credentialId: "DQLAB-CR-RISK-2026",
    credentialUrl: "https://academy.dqlab.id/certificate/check/DQLAB-CR-RISK-2026",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    skills: ["Credit Risk Analysis", "Financial Modeling", "Probability of Default", "Statistical Analysis", "Data Cleaning"]
  },
  {
    id: "cert-dqlab-r",
    title: "R Fundamental for Data Science",
    issuer: "DQLab",
    date: "Juli 2026",
    credentialId: "DQLAB-R-FUND-2026",
    credentialUrl: "https://academy.dqlab.id/certificate/check/DQLAB-R-FUND-2026",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
    skills: ["R Programming", "Data Manipulation", "ggplot2", "Data Wrangling", "Exploratory Data Analysis"]
  },
  {
    id: "cert-google-ai",
    title: "Google AI Professional Certificate & AI for Data Analysis",
    issuer: "Google / Coursera",
    date: "Juni 2026",
    credentialId: "COURSERA-GOOGLE-AI-2026",
    credentialUrl: "https://coursera.org/verify/professional-cert/GOOGLE-AI-2026",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    skills: ["Artificial Intelligence", "AI for Data Analysis", "Prompt Engineering", "Predictive Analytics", "GenAI Workflows"]
  },
  {
    id: "cert-dicoding-ml",
    title: "Machine Learning Course",
    issuer: "Dicoding Indonesia",
    date: "2023",
    credentialId: "DICODING-ML-2023-ARROYA",
    credentialUrl: "https://www.dicoding.com/certificates/DICODING-ML-2023-ARROYA",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80",
    skills: ["Supervised Learning", "Unsupervised Learning", "Scikit-Learn", "Model Optimization", "Data Evaluation"]
  }
];

export const techStackData: TechSkill[] = [
  // Programming Languages
  { name: "PHP", level: 90, iconName: "Server", category: "Programming Languages" },
  { name: "Python", level: 88, iconName: "Terminal", category: "Programming Languages" },
  { name: "JavaScript", level: 88, iconName: "Zap", category: "Programming Languages" },
  { name: "SQL", level: 92, iconName: "Database", category: "Programming Languages" },
  { name: "R", level: 82, iconName: "FileCode2", category: "Programming Languages" },
  { name: "Lua", level: 85, iconName: "Code2", category: "Programming Languages" },
  { name: "Java", level: 78, iconName: "Cpu", category: "Programming Languages" },
  { name: "C#", level: 75, iconName: "Code2", category: "Programming Languages" },

  // Web Development
  { name: "Laravel", level: 92, iconName: "Flame", category: "Web Development" },
  { name: "Livewire", level: 88, iconName: "Zap", category: "Web Development" },
  { name: "Tailwind CSS", level: 95, iconName: "Palette", category: "Web Development" },
  { name: "RESTful APIs", level: 90, iconName: "Network", category: "Web Development" },
  { name: "HTML / CSS", level: 95, iconName: "Layout", category: "Web Development" },
  { name: "Object-Oriented (OOP)", level: 90, iconName: "Layers", category: "Web Development" },

  // Data & Analytics
  { name: "Machine Learning", level: 86, iconName: "Cpu", category: "Data & Analytics" },
  { name: "Credit Risk Analysis", level: 85, iconName: "FileCode2", category: "Data & Analytics" },
  { name: "Data Modeling", level: 88, iconName: "Database", category: "Data & Analytics" },
  { name: "Data Visualization", level: 90, iconName: "Layout", category: "Data & Analytics" },
  { name: "Business Intelligence", level: 88, iconName: "Sparkles", category: "Data & Analytics" },
  { name: "Google Data Studio", level: 88, iconName: "Layout", category: "Data & Analytics" },

  // Tools & Platforms
  { name: "Docker & Docker Sail", level: 88, iconName: "Box", category: "Tools & Platforms" },
  { name: "MySQL", level: 90, iconName: "Database", category: "Tools & Platforms" },
  { name: "Git & GitHub", level: 92, iconName: "GitBranch", category: "Tools & Platforms" },
  { name: "Roblox Studio", level: 90, iconName: "Laptop", category: "Tools & Platforms" },
  { name: "BI Tools", level: 86, iconName: "HardDrive", category: "Tools & Platforms" },
];
