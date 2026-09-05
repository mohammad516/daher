"use client";

import React, { createContext, useContext, useState } from "react";

export type Lang = "en" | "ar";

export const translations = {
  en: {
    // Navbar
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      products: "Products",
      testimonials: "Testimonials",
      contact: "Contact",
      projects: "Projects",
      getQuote: "Request a Quote",
    },
    // Hero
    hero: {
      badge: "Water Technologies Experts",
      slides: [
        {
          headline: "Drilling &",
          highlight: "Equipping Water Wells",
          sub: "From site assessment to full well completion — we deliver reliable, high-quality water well drilling and equipping solutions for all needs.",
        },
        {
          headline: "Solar Power Systems",
          highlight: "for Water Pumps",
          sub: "Clean, efficient, and cost-effective solar-powered pump installations — harnessing the sun to bring water where it's needed most.",
        },
        {
          headline: "Hydrogeological",
          highlight: "Research & Studies",
          sub: "Expert hydrogeological surveys, studies, and general maintenance — from assessment and design through implementation, testing, and delivery.",
        },
      ],
      stats: [
        { value: "500+", label: "Projects" },
        { value: "20+", label: "Years Exp." },
        { value: "3h", label: "SLA" },
        { value: "24/7", label: "Support" },
      ],
      discoverServices: "Discover Our Services",
      location: "Ghazieh, South Lebanon",
    },
    // About
    about: {
      title: "About Moustapha Daher Center",
      p1: "Moustapha Daher Center was founded in 1998 by Moustapha Daher, a resilient entrepreneur who started his career as a field technician. He gradually acquired and compiled a solid work experience that turned him into one of the most renowned innovators and experts of water technologies.",
      p2: "Since established, Moustapha Daher Center has been steadily expanding its expertise, increasing its market share, and enhancing its well-earned reputation.",
      p3: "",
      p4: "",
      readMore: "Read More",
      readLess: "Read Less",
      yearsLabel: "Years of",
      excellenceLabel: "Excellence",
    },
    // Services
    services: {
      title: "Our Services",
      subtitle: "What We Offer",
      viewMore: "View More",
      viewLess: "View Less",
      ourProjects: "Our Projects",
      items: [
        {
          title: "Drilling and Equipping Water Wells",
          desc: "",
          features: [],
        },
        {
          title: "Installing Solar Power Systems for Pumps",
          desc: "",
          features: [],
        },
        {
          title: "General Maintenance",
          desc: "",
          features: [],
        },
        {
          title: "Conducting Hydrogeological Research and Studies",
          desc: "",
          features: [],
        },
      ],
    },
    // Projects page
    projects: {
      title: "Our Projects",
      subtitle: "A showcase of our renewable energy installations across Lebanon",
      backToHome: "← Back to Home",
      categories: {
        all: "All",
        residential: "Residential",
        commercial: "Commercial",
        industrial: "Industrial",
      },
      items: [
        { title: "Residential Solar Installation – Tripoli", category: "residential", image: "/image1.png", images: ["/image1.png", "/image2.png", "/image5.png"], desc: "Complete 10kWp rooftop solar system with lithium storage for a family home." },
        { title: "Commercial Building – North Lebanon", category: "commercial", image: "/image2.png", images: ["/image2.png", "/image3.png", "/imag4.png"], desc: "30kWp grid-tied system for a 4-floor commercial building reducing energy costs by 70%." },
        { title: "Industrial Factory – Koura", category: "industrial", image: "/image3.png", images: ["/image3.png", "/image4.png", "/Hero1.png"], desc: "150kWp industrial-scale solar array powering a full manufacturing facility." },
        { title: "Smart Home System – Zgharta", category: "residential", image: "/image4.png", images: ["/image4.png", "/image1.png"], desc: "Home automation + solar integration with full Alexa voice control." },
        { title: "Hotel Solar Project – Batroun", category: "commercial", image: "/image5.png", images: ["/image5.png", "/image3.png", "/image2.png"], desc: "50kWp system providing clean energy to a boutique seaside hotel." },
        { title: "Factory Grounding & Solar – Tripoli", category: "industrial", image: "/image1.png", images: ["/image1.png", "/Hero.png"], desc: "Full grounding system installation alongside a 200kWp solar grid for a steel factory." },
        { title: "Apartment Complex – Mina", category: "residential", image: "/image2.png", images: ["/image2.png", "/image5.png", "/image4.png"], desc: "Shared solar system serving 12 apartments with smart metering per unit." },
        { title: "Office Building – Tripoli", category: "commercial", image: "/image3.png", images: ["/image3.png", "/image1.png"], desc: "25kWp rooftop system covering 100% of daily office energy consumption." },
        { title: "Agricultural Solar – Akkar", category: "industrial", image: "/image4.png", images: ["/image4.png", "/image2.png", "/imag4.png"], desc: "Solar-powered irrigation and operations for a large agricultural estate." },
      ],
    },
    // Testimonials
    testimonials: {
      title: "Testimonials",
      items: [
        {
          quote: "Moustapha Daher Center drilled and equipped our water well with incredible professionalism. The team assessed the site, handled every technical detail, and delivered exactly on time. We now have a reliable water source that has transformed our daily life. Highly recommended!",
          name: "Satisfied Client",
          role: "Homeowner",
        },
        {
          quote: "We needed a solar-powered pump system for our agricultural land and Moustapha Daher Center delivered beyond expectations. From the initial assessment to final delivery, every step was handled with expertise. Our irrigation costs have dropped dramatically.",
          name: "Ahmad K.",
          role: "Agricultural Business Owner",
        },
        {
          quote: "The hydrogeological study conducted by Moustapha Daher Center was thorough and detailed. Their team identified the best drilling location on our property, saving us both time and money. The execution process — from assessment to delivery — was smooth and fully transparent.",
          name: "Satisfied Client",
          role: "Research & Consultancy Client",
        },
        {
          quote: "What sets Moustapha Daher Center apart is their commitment to quality at every stage. The general maintenance they provide for our water system is prompt, professional, and reliable. They treat our water infrastructure as their own responsibility.",
          name: "Impressed Client",
          role: "Maintenance & Service Client",
        },
      ],
    },
    // Clients
    clients: {
      title: "Our Clients",
    },
    // Partners
    partners: {
      title: "Our Partners",
    },
    // Founder
    founder: {
      title: "Meet the Founder",
      p1a: "Electricity has been my passion for over ",
      p1b: "20 years.",
      p1c: " Growing up in Lebanon, I witnessed first-hand the devastating impact of power outages on families and businesses — and I knew I had to do something about it.",
      p2a: "I founded Mustapha Daher Center with a single mission:",
      p2b: " to make clean, reliable, and affordable energy accessible to every Lebanese home and business",
      p2c: " — backed by a technical team with more than 30 years of Middle-East experience.",
      p3a: "My promise is simple: ",
      p3b: "we treat every client's energy challenge as our own,",
      p3c: " from the initial assessment all the way through to ongoing maintenance — because your peace of mind is our success.",
      founderName: "Mustapha Daher Center Founder",
      founderRole: "Founder & CEO, Mustapha Daher Center",
    },
    // Maintenance Plans
    maintenancePlans: {
      title: "Our Maintenance and Insurance Plans",
      items: [
        {
          title: "Platinum Agreement Plan",
          features: [
            "100% FREE system repair",
            "100% FREE system replace",
            "6 FREE scheduled visit/year",
            "6 FREE emergency visit/year",
            "FREE 4 batteries temporary replacement for 72 hrs",
            "FREE 4 panels temporary replacement for 72 hrs",
            "Inclusive Solar Panels cleaning.",
            "Free Repair Manpower",
            "Agreement extendable for 4 years."
          ]
        },
        {
          title: "Gold Agreement Plan",
          features: [
            "100% FREE system repair",
            "75% FREE system replace",
            "4 FREE scheduled visit/year",
            "3 FREE emergency visit/year",
            "FREE 4 batteries temporary replacement for 48hrs",
            "FREE 4 panels temporary replacement for 48hrs",
            "Inclusive Solar Panels cleaning.",
            "50% Discount on Repair Manpower cost",
            "Agreement extendable for 4 years."
          ]
        },
        {
          title: "Silver Agreement Plan",
          features: [
            "100% FREE system repair",
            "50% FREE system replace",
            "3 FREE scheduled visit/year",
            "FREE 4 batteries temporary replacement for 48 hrs",
            "FREE 4 panels temporary replacement for 48 hrs",
            "Agreement extendable for 4 years."
          ]
        }
      ]
    },
    // Contact
    contact: {
      badge: "Get in Touch",
      title: "Ready to Access",
      titleHighlight: "Clean Water?",
      subtitle: "We put Customer Satisfaction First. Contact us for any inquiry — we'll be glad to help you with your water needs.",
      emergencyLine: "Emergency Line",
      needHelp: "Need Help? Call Us Today",
      contactInfo: "Contact Information",

      cards: [
        { label: "Mobile", value: "+961 3 581 180  /  +961 70 581 180" },
        { label: "Tel.", value: "+961 7 220 181" },
        { label: "Email", value: "dahercenter@gmail.com" },
        { label: "Website", value: "www.dahercenter.com.lb" },
        { label: "Address", value: "Daher Bldg., Régie area, behind the WHITE petrol station, Ghazieh, South Lebanon" },
      ],
      form: {
        fullName: "Full Name",
        email: "Email",
        phone: "Phone Number",
        message: "Message",
        namePlaceholder: "Your full name",
        emailPlaceholder: "you@example.com",
        phonePlaceholder: "+961 ...",
        messagePlaceholder: "Tell us about your water needs...",
        send: "Send Message",
        thankYou: "Thank You!",
        received: "We've received your message and will get back to you within 24 hours.",
      },
    },
    // Footer
    footer: {
      privacy: "Privacy Policy",
      accessibility: "Accessibility Statement",
      copyright: "by Mustapha Daher Center. Powered and created by",
    },
  },

  ar: {
    // Navbar
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      services: "خدماتنا",
      products: "منتجاتنا",
      testimonials: "آراء العملاء",
      contact: "اتصل بنا",
      projects: "مشاريعنا",
      getQuote: "طلب عرض سعر",
    },
    // Hero
    hero: {
      badge: "حلول الطاقة المتجددة",
      slides: [
        {
          headline: "تركيب احترافي،",
          highlight: "في كل مرة.",
          sub: "يتعامل مهندسونا المعتمدون مع كل تركيب بدقة وأمان واهتمام — من التخطيط حتى التشغيل.",
        },
        {
          headline: "نضيء المنازل",
          highlight: "في كل لبنان.",
          sub: "حلول طاقة شمسية سكنية متميزة مصممة خصيصاً لاحتياجات عائلتك — من الألواح الشمسية حتى أنظمة المنزل الذكي.",
        },
        {
          headline: "الطاقة الشمسية الصناعية",
          highlight: "على نطاق واسع.",
          sub: "نقدم أنظمة طاقة متجددة كبيرة الحجم للمصانع والمباني التجارية بأعلى كفاءة ممكنة.",
        },
      ],
      stats: [
        { value: "+500", label: "مشروع" },
        { value: "+20", label: "سنة خبرة" },
        { value: "3 ساعات", label: "اتفاقية الخدمة" },
        { value: "24/7", label: "دعم مستمر" },
      ],
      discoverServices: "اكتشف خدماتنا",
      location: "طرابلس، لبنان — محافظة الشمال",
    },
    // About
    about: {
      title: "عن مركز مصطفى ظاهر",
      p1: "الكهرباء ليست رفاهية، إنها ضرورة حياتية! نحن نساعد مجتمعنا على التركيز على تحديات حياتهم اليومية من خلال رفع عبء الطاقة عن منازلهم ومكاتبهم ومصانعهم. نعتني بكل تحدياتك في مجال الطاقة، بدءاً من تحديد احتياجاتك، وتوريد وتركيب الأنظمة، وصولاً إلى تشغيل أنظمة الطاقة وصيانتها.",
      p2: "مركز مصطفى ظاهر منظمة تضع العميل في صميم اهتمامها، ويدعمها فريق خدمة تقنية متحمس يمتلك أكثر من 30 عاماً من الخبرة في الخدمة في منطقة الشرق الأوسط. يجلب أصحاب المصلحة في مركز مصطفى ظاهر ثروة وافرة من الخبرة التجارية في العمل في بيئات عالمية متقنة إلى سوقنا المحلية وعملائنا.",
      p3: "تتخذ مركز مصطفى ظاهر من طرابلس، لبنان مقراً لها، وقد أسست عملياتها في جميع أنحاء المنطقة الشمالية والوسطى بأكملها، مع انتشار مهندسيها وفنييها المقيمين في مواقع استراتيجية لضمان الالتزام باتفاقيات مستوى الخدمة.",
      p4: "تركّز مركز مصطفى ظاهر بشكل راسخ على التحسين المستمر للكفاءة وتقليل استهلاك الواط من خلال أنظمة الأتمتة ومزيج الحلول الشاملة. ومن خلال معرفتنا بمجال الطاقة الشمسية الكهروضوئية، يمكننا إتاحة تكنولوجيا التميز العالمية لتلبية احتياجاتك.",
      readMore: "اقرأ المزيد",
      readLess: "اقرأ أقل",
      yearsLabel: "سنوات من",
      excellenceLabel: "التميز",
    },
    // Services
    services: {
      title: "خدماتنا",
      subtitle: "ما نقدمه",
      viewMore: "عرض المزيد",
      viewLess: "عرض أقل",
      ourProjects: "مشاريعنا",
      items: [
        {
          title: "عقود الصيانة",
          desc: "عقود صيانتنا هي بمثابة عقود بوليصة تأمين لنظام الطاقة المتجددة الخاص بك. نتميز عن غيرنا باتفاقيات مستوى الخدمة (SLA) التي تضمن معالجة المشاكل وإصلاح النظام الكهربائي في أقل من 3 ساعات. وقد صممنا ثلاثة مخططات للعقود تناسب أي ميزانية وتضمن توافر خدمة الطاقة المتجددة لديك في أقل من 3 ساعات. مستويات خدمتنا وتغطية عقود الخدمة مدرجة في الجدول أدناه.",
          features: [
            "خطة بلاتينيوم — إصلاح واستبدال النظام مجاناً بنسبة 100%",
            "خطة ذهبية — إصلاح مجاني 100%، استبدال 75%",
            "خطة فضية — إصلاح مجاني 100%، استبدال 50%",
          ],
        },
        {
          title: "خدمات التوريد والتركيب الاحترافية",
          desc: "نتمتع بعلاقة تجارية رفيعة المستوى مع أفضل الشركات المصنّعة للمنتجات، مما يتيح لنا ليس فقط الحصول على أفضل الأسعار الاقتصادية لعملائنا، بل أيضاً منحهم خيار الاختيار من بين ثلاثة مصنّعين مختلفين حسب احتياجاتهم وميزانيتهم. نحن منظمة تضع العميل في مركز اهتمامها وتسعى إلى النجاح والرضا. ينعكس ذلك في أسلوب عملنا، حيث نؤمن بأن متطلبات كل عميل فريدة من نوعها، لذا لا نتبع حلاً نمطياً واحداً للجميع. منهجيتنا تقوم على دراسة استهلاكك اليومي المعتاد، وفحص أجهزتك المنزلية وتقييمها، وتقديم المشورة بشأن التغييرات الجوهرية، ووضع توقعات واقعية لاستخدام النظام.",
          features: ["الاختيار من 3 مصنّعين", "دراسة الاستهلاك اليومي", "حل فريد لكل عميل"],
        },
        {
          title: "عقود الاستشارة التقنية",
          desc: "رحلتك تبدأ هنا، فالتخطيط هو كل شيء. نساعدك في تقييم أجهزة منزلك مع مراعاة المتطلبات المستقبلية للسنوات الخمس القادمة. ثم نُصدر تقريراً شاملاً يتضمن قائمة المستلزمات (BOQ) التي يمكن للعميل تقديمها فوراً إلى موردّيه المفضلين للحصول على عروض الأسعار وإجراء المقارنات لاحقاً. ندرس العروض الواردة ونقدم المشورة للعميل حول أفضل عرض ونساعده في الحصول على أفضل الأسعار. وبعد الشراء، نشرف على عملية التسليم والتركيب للتأكد من التزام المقاول بإرشاداتنا المتعلقة بالسلامة والكفاءة.",
          features: ["تقييم الأجهزة لـ 5 سنوات", "تقرير BOQ شامل", "مقارنة العروض والمشورة"],
        },
        {
          title: "أنظمة المنزل الذكي",
          desc: "بصرف النظر عمّا إذا كان منزلك مجهزاً لقبول أنظمة الأتمتة الذكية أم لا، يمتلك مهندسونا المحترفون الكفاءة الكاملة لتحويل منزلك إلى منزل ذكي يتيح لك التحكم في جميع أجهزتك، وأنظمة الإضاءة، وأجهزة التكييف، أو أي آلة كهربائية أخرى عبر تطبيق هاتفك المحمول باستخدام سيري أو أليكسا أو أي نظام ذكاء اصطناعي متاح.",
          features: ["تحويل كامل إلى منزل ذكي", "تكامل مع سيري / أليكسا / الذكاء الاصطناعي", "تحكم بالجوال لجميع الأجهزة"],
        },
        {
          title: "تقارير التدقيق",
          desc: "يراجع مهندسونا تركيب نظامك من جميع الجوانب؛ التقنية والسلامة والأداء والكفاءة والعمر الافتراضي والاستهلاك، ويقدمون تقريراً تفصيلياً عن المخاطر والعيوب التي تحتاج إلى إصلاح. يزود التقرير المستخدم بخطوات تفصيلية خطوة بخطوة حول ما يجب فعله ومن أين يبدأ. وبمجرد أن يبدأ العميل عملية الإصلاح، سنشرف على العملية بأكملها مع الفنيين للتأكد من اتباع إرشاداتنا. ويُصدر شهادة مراجعة التدقيق في نهاية العملية.",
          features: ["مراجعة تقنية وسلامة", "تدقيق الأداء والكفاءة", "تحليل العمر الافتراضي"],
        },
        {
          title: "تركيب أنظمة التأريض",
          desc: "التأريض ضروري لأي منزل أو مكتب أو مصنع سواء كان نظام الطاقة المتجددة موجوداً أم لا. وبالإضافة إلى ذلك، يجب تأريض نظام الطاقة المتجددة بما يشمل العاكس والبطاريات الليثيومية وتوربين الرياح والتوربين الهيدروليكي والألواح الشمسية. يُعدّ هذا قاعدة سلامة أساسية، وإذا أُهملت قد تُسبب أعطالاً كهربائية، مما قد يؤدي في نهاية المطاف إلى أضرار جسيمة للأجهزة الكهربائية.",
          features: ["تأريض كامل لنظام الطاقة المتجددة", "تأريض العاكس والبطارية والألواح", "منع الأعطال"],
        },
        {
          title: "ورشة الإصلاح",
          desc: "في ظل هياكل الضمان غير المستقرة وشُح ورش العمل المتخصصة، يواجه المستخدمون النهائيون خطر خسارة استثماراتهم. تستطيع ورشتنا المتخصصة للإصلاح ضمان إصلاح نظامك وفق معايير الشركة المصنّعة.",
          features: ["إصلاحات وفق معايير الشركة المصنّعة", "حماية الاستثمار", "منشأة ورشة متخصصة"],
        },
      ],
    },
    // Projects page
    projects: {
      title: "مشاريعنا",
      subtitle: "عرض لتركيبات الطاقة المتجددة في جميع أنحاء لبنان",
      backToHome: "← العودة إلى الرئيسية",
      categories: {
        all: "الكل",
        residential: "سكني",
        commercial: "تجاري",
        industrial: "صناعي",
      },
      items: [
        { title: "تركيب طاقة شمسية سكنية – طرابلس", category: "residential", image: "/image1.png", images: ["/image1.png", "/image2.png", "/image5.png"], desc: "نظام طاقة شمسية سطحي بقدرة 10 كيلوواط مع تخزين ليثيوم لمنزل عائلي." },
        { title: "مبنى تجاري – شمال لبنان", category: "commercial", image: "/image2.png", images: ["/image2.png", "/image3.png", "/imag4.png"], desc: "نظام متصل بالشبكة بقدرة 30 كيلوواط لمبنى تجاري من 4 طوابق يوفر 70% من تكاليف الطاقة." },
        { title: "مصنع صناعي – الكورة", category: "industrial", image: "/image3.png", images: ["/image3.png", "/image4.png", "/Hero1.png"], desc: "مصفوفة شمسية صناعية بقدرة 150 كيلوواط تغذي منشأة تصنيع كاملة." },
        { title: "نظام منزل ذكي – زغرتا", category: "residential", image: "/image4.png", images: ["/image4.png", "/image1.png"], desc: "تكامل أتمتة المنزل مع الطاقة الشمسية والتحكم الصوتي الكامل عبر أليكسا." },
        { title: "مشروع طاقة شمسية لفندق – البترون", category: "commercial", image: "/image5.png", images: ["/image5.png", "/image3.png", "/image2.png"], desc: "نظام بقدرة 50 كيلوواط يوفر طاقة نظيفة لفندق ساحلي." },
        { title: "تأريض ومنظومة شمسية – طرابلس", category: "industrial", image: "/image1.png", images: ["/image1.png", "/Hero.png"], desc: "تركيب نظام تأريض كامل مع شبكة شمسية بقدرة 200 كيلوواط لمصنع حديد." },
        { title: "مجمع شقق – الميناء", category: "residential", image: "/image2.png", images: ["/image2.png", "/image5.png", "/image4.png"], desc: "نظام طاقة شمسية مشترك لـ 12 شقة مع عدادات ذكية لكل وحدة." },
        { title: "مبنى مكاتب – طرابلس", category: "commercial", image: "/image3.png", images: ["/image3.png", "/image1.png"], desc: "نظام سطحي بقدرة 25 كيلوواط يغطي 100% من استهلاك مكتب يومي." },
        { title: "طاقة شمسية زراعية – عكار", category: "industrial", image: "/image4.png", images: ["/image4.png", "/image2.png", "/imag4.png"], desc: "ري يعمل بالطاقة الشمسية وعمليات لمزرعة زراعية كبيرة." },
      ],
    },
    // Testimonials
    testimonials: {
      title: "آراء العملاء",
      items: [
        {
          quote: "كان فريق مركز مصطفى ظاهر سريع الاستجابة ومؤدباً وبالغ المساعدة. لقد ساعدوني في حل مشكلة نظامي الشمسي بالكامل بعد شهرين من المعاناة مع كهربائيين آخرين. وقّعتُ معهم عقد صيانة سنوياً ذهبياً وقد أدرجوا هذه الخدمة دون أي تكلفة إضافية!",
          name: "عميل راضٍ",
          role: "صاحب منزل",
        },
        {
          quote: "كنا نعاني من مشاكل في نظامنا الكهربائي الحالي. ثم وجدنا مركز مصطفى ظاهر، فاستوعبوا احتياجاتنا بسرعة ووضعوا توقعات واضحة. ساعدونا في تحديد النطاق والشراء ومراقبة التوريد والتركيب، ولدينا الآن اتفاقية صيانة بلاتينيوم. أنصح بهم بشدة!",
          name: "د. زاهر جندي",
          role: "صاحب عمل",
        },
        {
          quote: "حين أدركتُ أن جميع موردي السوق يبيعون منتجاتهم فقط دون فهم احتياجاتي، كنت بحاجة إلى مستشار حقيقي. قيّمت مركز مصطفى ظاهر استهلاك الطاقة في منزلي، وأعدّت تقريراً شاملاً، وساعدت في مقارنة المواصفات والأسعار، وأشرفت على التركيب. أنصح بهم بشدة.",
          name: "عميل راضٍ",
          role: "عميل استشارة تقنية",
        },
        {
          quote: "جودة الشفافية التي يتمتع بها فريق مركز مصطفى ظاهر رائعة! لم أكن أتوقع يوماً أن أجد من يعمل بهذا المستوى العالي من الشفافية والمهنية. أصبحت مشاكل نظامي الشمسي مشاكلهم الآن — لقد أزالوا عني إحباطاً حياتياً كبيراً.",
          name: "عميل معجب",
          role: "عميل صيانة وخدمة",
        },
      ],
    },
    // Clients
    clients: {
      title: "عملاؤنا",
    },
    // Partners
    partners: {
      title: "شركاؤنا",
    },
    // Founder
    founder: {
      badge: "تعرّف على المؤسس",
      title: "تعرّف على المؤسس",
      p1a: "الكهرباء شغفي منذ أكثر من ",
      p1b: "20 عاماً.",
      p1c: " نشأتُ في لبنان وشهدتُ عن كثب الأثر المدمّر لانقطاع التيار الكهربائي على الأسر والأعمال — وعلمتُ أنني يجب أن أفعل شيئاً حيال ذلك.",
      p2a: "أسستُ مركز مصطفى ظاهر برسالة واحدة:",
      p2b: " جعل الطاقة النظيفة والموثوقة والميسورة في متناول كل منزل وعمل في لبنان",
      p2c: " — مدعومةً بفريق تقني يمتلك أكثر من 30 عاماً من الخبرة في الشرق الأوسط.",
      p3a: "وعدي بسيط: ",
      p3b: "نتعامل مع تحديات الطاقة لكل عميل كأنها تحدياتنا الخاصة،",
      p3c: " من التقييم الأولي وحتى الصيانة المستمرة — لأن راحة بالك هي نجاحنا.",
      founderName: "مؤسس مركز مصطفى ظاهر",
      founderRole: "المؤسس والرئيس التنفيذي، مركز مصطفى ظاهر",
    },
    // Maintenance Plans
    maintenancePlans: {
      title: "خطط الصيانة والتأمين لدينا",
      items: [
        {
          title: "خطة الاتفاقية البلاتينية",
          features: [
            "إصلاح النظام مجاناً بنسبة 100%",
            "استبدال النظام مجاناً بنسبة 100%",
            "6 زيارات مجدولة مجانية سنوياً",
            "6 زيارات طوارئ مجانية سنوياً",
            "استبدال مؤقت لـ 4 بطاريات مجاناً لمدة 72 ساعة",
            "استبدال مؤقت لـ 4 ألواح مجاناً لمدة 72 ساعة",
            "تنظيف الألواح الشمسية مشمول",
            "أيدي عاملة للإصلاح مجانية",
            "الاتفاقية قابلة للتمديد لمدة 4 سنوات"
          ]
        },
        {
          title: "خطة الاتفاقية الذهبية",
          features: [
            "إصلاح النظام مجاناً بنسبة 100%",
            "استبدال النظام مجاناً بنسبة 75%",
            "4 زيارات مجدولة مجانية سنوياً",
            "3 زيارات طوارئ مجانية سنوياً",
            "استبدال مؤقت لـ 4 بطاريات مجاناً لمدة 48 ساعة",
            "استبدال مؤقت لـ 4 ألواح مجاناً لمدة 48 ساعة",
            "تنظيف الألواح الشمسية مشمول",
            "خصم 50% على تكلفة الأيدي العاملة للإصلاح",
            "الاتفاقية قابلة للتمديد لمدة 4 سنوات"
          ]
        },
        {
          title: "خطة الاتفاقية الفضية",
          features: [
            "إصلاح النظام مجاناً بنسبة 100%",
            "استبدال النظام مجاناً بنسبة 50%",
            "3 زيارات مجدولة مجانية سنوياً",
            "استبدال مؤقت لـ 4 بطاريات مجاناً لمدة 48 ساعة",
            "استبدال مؤقت لـ 4 ألواح مجاناً لمدة 48 ساعة",
            "الاتفاقية قابلة للتمديد لمدة 4 سنوات"
          ]
        }
      ]
    },
    // Contact
    contact: {
      badge: "تواصل معنا",
      title: "مستعد للتحول إلى",
      titleHighlight: "الطاقة الشمسية؟",
      subtitle: "رضا العملاء أولويتنا. اتصل بنا لأي استفسار — يسعدنا مساعدتك في التحكم بطاقتك.",
      emergencyLine: "خط الطوارئ",
      needHelp: "تحتاج مساعدة؟ اتصل بنا اليوم",
      contactInfo: "معلومات التواصل",

      cards: [
        { label: "موبايل", value: "+961 3 581 180  /  +961 70 581 180" },
        { label: "هاتف", value: "+961 7 220 181" },
        { label: "البريد الإلكتروني", value: "dahercenter@gmail.com" },
        { label: "الموقع الإلكتروني", value: "www.dahercenter.com.lb" },
        { label: "العنوان", value: "مبنى ظاهر، منطقة الريجي، خلف محطة WHITE، غازية، جنوب لبنان" },
      ],
      form: {
        fullName: "الاسم الكامل",
        email: "البريد الإلكتروني",
        phone: "رقم الهاتف",
        message: "الرسالة",
        namePlaceholder: "اسمك الكامل",
        emailPlaceholder: "you@example.com",
        phonePlaceholder: "+961 ...",
        messagePlaceholder: "أخبرنا عن احتياجاتك في مجال الطاقة...",
        send: "إرسال الرسالة",
        thankYou: "شكراً لك!",
        received: "لقد تلقينا رسالتك وسنرد عليك خلال 24 ساعة.",
      },
    },
    // Footer
    footer: {
      privacy: "سياسة الخصوصية",
      accessibility: "بيان إمكانية الوصول",
      copyright: "بواسطة مركز مصطفى ظاهر. مدعوم ومنشأ بواسطة",
    },
  },
};

type Translations = typeof translations.en;

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
  isAr: boolean;
  dbContent: Record<string, string>;
  dbContentAr: Record<string, string>;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => { },
  t: translations.en,
  isAr: false,
  dbContent: {},
  dbContentAr: {},
});

export function LanguageProvider({
  children,
  dbContent = {},
  dbContentAr = {},
}: {
  children: React.ReactNode;
  dbContent?: Record<string, string>;
  dbContentAr?: Record<string, string>;
}) {
  const [lang, setLang] = useState<Lang>("en");
  const t = translations[lang] as Translations;
  const isAr = lang === "ar";

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isAr, dbContent, dbContentAr }}>
      <div dir={isAr ? "rtl" : "ltr"} className={isAr ? "font-arabic" : ""}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
