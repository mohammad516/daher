const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

// The translations from LanguageContext.tsx
const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      testimonials: "Testimonials",
      contact: "Contact",
      getQuote: "Get a Quote",
    },
    hero: {
      badge: "Renewable Energy Solutions",
      slides: [
        { headline: "Expert Installation,", highlight: "Every Time.", sub: "Our certified engineers handle every installation with precision, safety, and care — from planning to commissioning." },
        { headline: "Powering Homes", highlight: "Across Lebanon.", sub: "Premium residential solar solutions tailored to your family's energy needs — from rooftop panels to full smart home systems." },
        { headline: "Industrial Solar", highlight: "At Scale.", sub: "We deliver large-scale renewable energy systems for factories and commercial buildings with maximum efficiency." },
      ],
      stats: [
        { value: "500+", label: "Projects" },
        { value: "20+", label: "Years Exp." },
        { value: "3h", label: "SLA" },
        { value: "24/7", label: "Support" },
      ],
      discoverServices: "Discover Our Services",
      location: "Tripoli, Lebanon — North Governate",
    },
    about: {
      title: "About Mustapha Daher Center",
      p1: "Electricity is not a luxury, it's a life necessity! We help our community focus on their daily challenges by taking away the headache of their homes, offices and Factories \"ENERGY\". We take care of all your energy challenges from scoping your needs, supply and install to operating and maintaining your energy systems.",
      p2: "Mustapha Daher Center is a service customer centric organization backed up by a passionate Technical Service Team having more than 30 years of service experience across the Middle East. Mustapha Daher Center stakeholders brings abundance of business experience of working in worldwide, proficient condition to our local market and customers.",
      p3: "Headquartered in Tripoli, Lebanon, Mustapha Daher Center has established operation across the whole Northern and Central region having our resident engineers and technicians spread in strategic location in order to make sure we commit to our Service Level Agreements SLA.",
      p4: "Mustapha Daher Center has solid spotlight on consistent effectiveness enhancement and decrease in Watt consumption through Automation systems and vertical solution combination. With our insight into the photovoltaic space, we can avail worldwide technology of excellence to your needs.",
      readMore: "Read More",
      readLess: "Read Less",
      yearsLabel: "Years of",
      excellenceLabel: "Excellence",
    },
    services: {
      title: "Our Services",
      subtitle: "What We Offer",
      viewMore: "View More",
      viewLess: "View Less",
      ourProjects: "Our Projects",
      items: [
        { title: "Maintenance Contracts", desc: "Our maintenance contracts are like your insurance policy contracts for your Renewable Energy system. We differentiate ourselves with our Service Level Agreements (SLA) that guarantees the electrical system troubleshooting and fixing within less than 3 hours. Having that said, we have devised three contract schemes that can fit any budget and guarantee your renewable energy service availability within less than 3 hours. Our service levels and contract service coverage are listed on the table below.", features: ["Platinum Plan — 100% FREE system repair & replace", "Gold Plan — 100% FREE repair, 75% replace", "Silver Plan — 100% FREE repair, 50% replace"] },
        { title: "Professional Supply and Install Services", desc: "We enjoy a high rank business relation with the best Product Manufacturers which enables us not only to source best economical prices for our clients but equally to give them the option to choose from three different Manufacturers depending on their needs and budget. We are a customer centric organization aiming for Success and Satisfaction with our clients. This lead our actions that each client's requirement is unique, hence we don't follow a template solution (One size fits all). Our methodology is to make sure first we study your regular daily consumption, scan and assess your house appliances, advice on critical changes and set proper expectation for system usage.", features: ["Choice from 3 manufacturers", "Daily consumption study", "Unique solution per client"] },
        { title: "Technical Consultancy Contracts", desc: "Your journey starts here, planning is everything. We help in assessing the client's home appliances considering the future requirements for the next 5 years. Then we release a comprehensive report which includes a BOQ that the client can immediately give to his/her preferred supplier/s for pricing and later for comparison. We study the proposal/s received and issue an advice to the client on best proposal and assist in getting best prices. After purchase is done, we supervise the delivery and installation process to make sure the contractor is following our safety and efficiency guidelines.", features: ["5-year appliance assessment", "Comprehensive BOQ report", "Proposal comparison & advice"] },
        { title: "Home Automation Systems", desc: "Regardless if your house is equipped to accept smart automation systems or not, our professional engineers are fully capable to transform your home to a smart home enabling you to control all your appliances, lighting systems, Air Condition systems or any other electrical machinery via your mobile application using Siri or Alexa or any other AI system available.", features: ["Full smart home transformation", "Siri / Alexa / AI integration", "Mobile control for all appliances"] },
        { title: "Audit Reports", desc: "Our engineers review your system installation from all aspects, Technical, Safety, performance and efficiency, life expectation and depreciation, and provide a detailed report on risks and defects that needs to be fixed. The report will give the user a step by step process about what is needed to be done and where to start. Once the client start the fixing process, we will be supervising the whole process with the technicians to make sure that our guidelines are being followed. An audit review certificate will be issued by end of the process.", features: ["Technical & safety review", "Performance & efficiency audit", "Life expectation analysis"] },
        { title: "Grounding System Installation", desc: "Grounding is necessary for any home, office or factory whether renewable energy system exist or not. Having that said, the renewable energy system including inverter, Lithium batteries, wind turbine, hydraulics turbine and Solar panels must be grounded. This is a basic safety rule if disregarded may cause electrical malfunction, ultimately leading to serious damage for electrical appliances.", features: ["Full renewable system grounding", "Inverter, battery & panel grounding", "Malfunction prevention"] },
        { title: "Repair Workshop", desc: "With volatile warranty structure and limited specialized workshops, end users are under the threat of losing their investments. Our specialized repair workshop can guarantee to repair your system as per manufacturer standards.", features: ["Manufacturer-standard repairs", "Investment protection", "Specialized workshop facility"] },
      ],
    },
    projects: {
      title: "Our Projects",
      subtitle: "A showcase of our renewable energy installations across Lebanon",
      backToHome: "← Back to Home",
      categories: { all: "All", residential: "Residential", commercial: "Commercial", industrial: "Industrial" },
      items: [
        { title: "Residential Solar Installation – Tripoli", category: "residential", desc: "Complete 10kWp rooftop solar system with lithium storage for a family home." },
        { title: "Commercial Building – North Lebanon", category: "commercial", desc: "30kWp grid-tied system for a 4-floor commercial building reducing energy costs by 70%." },
        { title: "Industrial Factory – Koura", category: "industrial", desc: "150kWp industrial-scale solar array powering a full manufacturing facility." },
        { title: "Smart Home System – Zgharta", category: "residential", desc: "Home automation + solar integration with full Alexa voice control." },
        { title: "Hotel Solar Project – Batroun", category: "commercial", desc: "50kWp system providing clean energy to a boutique seaside hotel." },
        { title: "Factory Grounding & Solar – Tripoli", category: "industrial", desc: "Full grounding system installation alongside a 200kWp solar grid for a steel factory." },
        { title: "Apartment Complex – Mina", category: "residential", desc: "Shared solar system serving 12 apartments with smart metering per unit." },
        { title: "Office Building – Tripoli", category: "commercial", desc: "25kWp rooftop system covering 100% of daily office energy consumption." },
        { title: "Agricultural Solar – Akkar", category: "industrial", desc: "Solar-powered irrigation and operations for a large agricultural estate." },
      ],
    },
    testimonials: {
      title: "Testimonials",
      items: [
        { quote: "The Mustapha Daher Center Team were quick, courteous and very helpful. They helped me resolve my Solar System problem completely after two months of suffering with other electricians. I signed with them a yearly Gold Maintenance Contract and they included this service at NO CHARGE!", name: "Satisfied Client", role: "Homeowner" },
        { quote: "We were experiencing trouble with our existing electrical setup. Then we found Mustapha Daher Center, they quickly understood our needs and set proper expectations. They helped us scope, buy, monitored supply and install, and we now have a Platinum Maintenance agreement. Highly recommended!", name: "Dr. Zaher Jundi", role: "Business Owner" },
        { quote: "When I realized all market suppliers only sell their product without understanding my need, I needed a real consultant. Mustapha Daher Center assessed my house power consumption, gave a comprehensive report, helped compare specs and prices, and supervised installation. I highly recommend them.", name: "Satisfied Client", role: "Technical Consultancy Client" },
        { quote: "The transparency quality that Mustapha Daher Center team processes is OUTSTANDING! I never expected to find someone who works at such a transparent and professional level. My Solar System issues are their issues now — they've taken away a major life frustration.", name: "Impressed Client", role: "Maintenance & Service Client" },
      ],
    },
    clients: { title: "Our Clients" },
    partners: { title: "Our Partners" },
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
    maintenancePlans: {
      title: "Our Maintenance and Insurance Plans",
      items: [
        { title: "Platinum Agreement Plan", features: ["100% FREE system repair", "100% FREE system replace", "6 FREE scheduled visit/year", "6 FREE emergency visit/year", "FREE 4 batteries temporary replacement for 72 hrs", "FREE 4 panels temporary replacement for 72 hrs", "Inclusive Solar Panels cleaning.", "Free Repair Manpower", "Agreement extendable for 4 years."] },
        { title: "Gold Agreement Plan", features: ["100% FREE system repair", "75% FREE system replace", "4 FREE scheduled visit/year", "3 FREE emergency visit/year", "FREE 4 batteries temporary replacement for 48hrs", "FREE 4 panels temporary replacement for 48hrs", "Inclusive Solar Panels cleaning.", "50% Discount on Repair Manpower cost", "Agreement extendable for 4 years."] },
        { title: "Silver Agreement Plan", features: ["100% FREE system repair", "50% FREE system replace", "3 FREE scheduled visit/year", "FREE 4 batteries temporary replacement for 48 hrs", "FREE 4 panels temporary replacement for 48 hrs", "Agreement extendable for 4 years."] }
      ]
    },
    contact: {
      badge: "Get in Touch",
      title: "Ready to go",
      titleHighlight: "Solar?",
      subtitle: "We put Customer Satisfaction First. Call us for any inquiry — we'll be glad to help you take control of your energy.",
      emergencyLine: "Emergency Line",
      needHelp: "Need Help? Call Us Today",
      contactInfo: "Contact Information",
      cards: [
        { label: "Call Us", value: "+961 6 610061" },
        { label: "Email Us", value: "support@mustaphadahercenter.com" },
        { label: "Visit Us", value: "Tripoli, Regency 520 Bldg., 2nd Floor, Lebanon" },
        { label: "Support Hours", value: "24/7 — We're always here for you" },
      ],
      form: {
        fullName: "Full Name", email: "Email", phone: "Phone Number", message: "Message",
        namePlaceholder: "Your full name", emailPlaceholder: "you@example.com", phonePlaceholder: "+961 ...", messagePlaceholder: "Tell us about your energy needs...",
        send: "Send Message", thankYou: "Thank You!", received: "We've received your message and will get back to you within 24 hours.",
      },
    },
    footer: {
      privacy: "Privacy Policy",
      accessibility: "Accessibility Statement",
      copyright: "by Mustapha Daher Center. Powered and created by",
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      services: "خدماتنا",
      testimonials: "آراء العملاء",
      contact: "اتصل بنا",
      getQuote: "احصل على عرض",
    },
    hero: {
      badge: "حلول الطاقة المتجددة",
      slides: [
        { headline: "تركيب احترافي،", highlight: "في كل مرة.", sub: "يتعامل مهندسونا المعتمدون مع كل تركيب بدقة وأمان واهتمام — من التخطيط حتى التشغيل." },
        { headline: "نضيء المنازل", highlight: "في كل لبنان.", sub: "حلول طاقة شمسية سكنية متميزة مصممة خصيصاً لاحتياجات عائلتك — من الألواح الشمسية حتى أنظمة المنزل الذكي." },
        { headline: "الطاقة الشمسية الصناعية", highlight: "على نطاق واسع.", sub: "نقدم أنظمة طاقة متجددة كبيرة الحجم للمصانع والمباني التجارية بأعلى كفاءة ممكنة." },
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
    services: {
      title: "خدماتنا",
      subtitle: "ما نقدمه",
      viewMore: "عرض المزيد",
      viewLess: "عرض أقل",
      ourProjects: "مشاريعنا",
      items: [
        { title: "عقود الصيانة", desc: "عقود صيانتنا هي بمثابة عقود بوليصة تأمين لنظام الطاقة المتجددة الخاص بك. نتميز عن غيرنا باتفاقيات مستوى الخدمة (SLA) التي تضمن معالجة المشاكل وإصلاح النظام الكهربائي في أقل من 3 ساعات. وقد صممنا ثلاثة مخططات للعقود تناسب أي ميزانية وتضمن توافر خدمة الطاقة المتجددة لديك في أقل من 3 ساعات. مستويات خدمتنا وتغطية عقود الخدمة مدرجة في الجدول أدناه.", features: ["خطة بلاتينيوم — إصلاح واستبدال النظام مجاناً بنسبة 100%", "خطة ذهبية — إصلاح مجاني 100%، استبدال 75%", "خطة فضية — إصلاح مجاني 100%، استبدال 50%"] },
        { title: "خدمات التوريد والتركيب الاحترافية", desc: "نتمتع بعلاقة تجارية رفيعة المستوى مع أفضل الشركات المصنّعة للمنتجات، مما يتيح لنا ليس فقط الحصول على أفضل الأسعار الاقتصادية لعملائنا، بل أيضاً منحهم خيار الاختيار من بين ثلاثة مصنّعين مختلفين حسب احتياجاتهم وميزانيتهم. نحن منظمة تضع العميل في مركز اهتمامها وتسعى إلى النجاح والرضا. ينعكس ذلك في أسلوب عملنا، حيث نؤمن بأن متطلبات كل عميل فريدة من نوعها، لذا لا نتبع حلاً نمطياً واحداً للجميع. منهجيتنا تقوم على دراسة استهلاكك اليومي المعتاد، وفحص أجهزتك المنزلية وتقييمها، وتقديم المشورة بشأن التغييرات الجوهرية، ووضع توقعات واقعية لاستخدام النظام.", features: ["الاختيار من 3 مصنّعين", "دراسة الاستهلاك اليومي", "حل فريد لكل عميل"] },
        { title: "عقود الاستشارة التقنية", desc: "رحلتك تبدأ هنا، فالتخطيط هو كل شيء. نساعدك في تقييم أجهزة منزلك مع مراعاة المتطلبات المستقبلية للسنوات الخمس القادمة. ثم نُصدر تقريراً شاملاً يتضمن قائمة المستلزمات (BOQ) التي يمكن للعميل تقديمها فوراً إلى موردّيه المفضلين للحصول على عروض الأسعار وإجراء المقارنات لاحقاً. ندرس العروض الواردة ونقدم المشورة للعميل حول أفضل عرض ونساعده في الحصول على أفضل الأسعار. وبعد الشراء، نشرف على عملية التسليم والتركيب للتأكد من التزام المقاول بإرشاداتنا المتعلقة بالسلامة والكفاءة.", features: ["تقييم الأجهزة لـ 5 سنوات", "تقرير BOQ شامل", "مقارنة العروض والمشورة"] },
        { title: "أنظمة المنزل الذكي", desc: "بصرف النظر عمّا إذا كان منزلك مجهزاً لقبول أنظمة الأتمتة الذكية أم لا، يمتلك مهندسونا المحترفون الكفاءة الكاملة لتحويل منزلك إلى منزل ذكي يتيح لك التحكم في جميع أجهزتك، وأنظمة الإضاءة، وأجهزة التكييف، أو أي آلة كهربائية أخرى عبر تطبيق هاتفك المحمول باستخدام سيري أو أليكسا أو أي نظام ذكاء اصطناعي متاح.", features: ["تحويل كامل إلى منزل ذكي", "تكامل مع سيري / أليكسا / الذكاء الاصطناعي", "تحكم بالجوال لجميع الأجهزة"] },
        { title: "تقارير التدقيق", desc: "يراجع مهندسونا تركيب نظامك من جميع الجوانب؛ التقنية والسلامة والأداء والكفاءة والعمر الافتراضي والاستهلاك، ويقدمون تقريراً تفصيلياً عن المخاطر والعيوب التي تحتاج إلى إصلاح. يزود التقرير المستخدم بخطوات تفصيلية خطوة بخطوة حول ما يجب فعله ومن أين يبدأ. وبمجرد أن يبدأ العميل عملية الإصلاح، سنشرف على العملية بأكملها مع الفنيين للتأكد من اتباع إرشاداتنا. ويُصدر شهادة مراجعة التدقيق في نهاية العملية.", features: ["مراجعة تقنية وسلامة", "تدقيق الأداء والكفاءة", "تحليل العمر الافتراضي"] },
        { title: "تركيب أنظمة التأريض", desc: "التأريض ضروري لأي منزل أو مكتب أو مصنع سواء كان نظام الطاقة المتجددة موجوداً أم لا. وبالإضافة إلى ذلك، يجب تأريض نظام الطاقة المتجددة بما يشمل العاكس والبطاريات الليثيومية وتوربين الرياح والتوربين الهيدروليكي والألواح الشمسية. يُعدّ هذا قاعدة سلامة أساسية، وإذا أُهملت قد تُسبب أعطالاً كهربائية، مما قد يؤدي في نهاية المطاف إلى أضرار جسيمة للأجهزة الكهربائية.", features: ["تأريض كامل لنظام الطاقة المتجددة", "تأريض العاكس والبطارية والألواح", "منع الأعطال"] },
        { title: "ورشة الإصلاح", desc: "في ظل هياكل الضمان غير المستقرة وشُح ورش العمل المتخصصة، يواجه المستخدمون النهائيون خطر خسارة استثماراتهم. تستطيع ورشتنا المتخصصة للإصلاح ضمان إصلاح نظامك وفق معايير الشركة المصنّعة.", features: ["إصلاحات وفق معايير الشركة المصنّعة", "حماية الاستثمار", "منشأة ورشة متخصصة"] },
      ],
    },
    projects: {
      title: "مشاريعنا",
      subtitle: "عرض لتركيبات الطاقة المتجددة في جميع أنحاء لبنان",
      backToHome: "← العودة إلى الرئيسية",
      categories: { all: "الكل", residential: "سكني", commercial: "تجاري", industrial: "صناعي" },
      items: [
        { title: "تركيب طاقة شمسية سكنية – طرابلس", category: "residential", desc: "نظام طاقة شمسية سطحي بقدرة 10 كيلوواط مع تخزين ليثيوم لمنزل عائلي." },
        { title: "مبنى تجاري – شمال لبنان", category: "commercial", desc: "نظام متصل بالشبكة بقدرة 30 كيلوواط لمبنى تجاري من 4 طوابق يوفر 70% من تكاليف الطاقة." },
        { title: "مصنع صناعي – الكورة", category: "industrial", desc: "مصفوفة شمسية صناعية بقدرة 150 كيلوواط تغذي منشأة تصنيع كاملة." },
        { title: "نظام منزل ذكي – زغرتا", category: "residential", desc: "تكامل أتمتة المنزل مع الطاقة الشمسية والتحكم الصوتي الكامل عبر أليكسا." },
        { title: "مشروع طاقة شمسية لفندق – البترون", category: "commercial", desc: "نظام بقدرة 50 كيلوواط يوفر طاقة نظيفة لفندق ساحلي." },
        { title: "تأريض ومنظومة شمسية – طرابلس", category: "industrial", desc: "تركيب نظام تأريض كامل مع شبكة شمسية بقدرة 200 كيلوواط لمصنع حديد." },
        { title: "مجمع شقق – الميناء", category: "residential", desc: "نظام طاقة شمسية مشترك لـ 12 شقة مع عدادات ذكية لكل وحدة." },
        { title: "مبنى مكاتب – طرابلس", category: "commercial", desc: "نظام سطحي بقدرة 25 كيلوواط يغطي 100% من استهلاك مكتب يومي." },
        { title: "طاقة شمسية زراعية – عكار", category: "industrial", desc: "ري يعمل بالطاقة الشمسية وعمليات لمزرعة زراعية كبيرة." },
      ],
    },
    testimonials: {
      title: "آراء العملاء",
      items: [
        { quote: "كان فريق مركز مصطفى ظاهر سريع الاستجابة ومؤدباً وبالغ المساعدة. لقد ساعدوني في حل مشكلة نظامي الشمسي بالكامل بعد شهرين من المعاناة مع كهربائيين آخرين. وقّعتُ معهم عقد صيانة سنوياً ذهبياً وقد أدرجوا هذه الخدمة دون أي تكلفة إضافية!", name: "عميل راضٍ", role: "صاحب منزل" },
        { quote: "كنا نعاني من مشاكل في نظامنا الكهربائي الحالي. ثم وجدنا مركز مصطفى ظاهر، فاستوعبوا احتياجاتنا بسرعة ووضعوا توقعات واضحة. ساعدونا في تحديد النطاق والشراء ومراقبة التوريد والتركيب، ولدينا الآن اتفاقية صيانة بلاتينيوم. أنصح بهم بشدة!", name: "د. زاهر جندي", role: "صاحب عمل" },
        { quote: "حين أدركتُ أن جميع موردي السوق يبيعون منتجاتهم فقط دون فهم احتياجاتي، كنت بحاجة إلى مستشار حقيقي. قيّمت مركز مصطفى ظاهر استهلاك الطاقة في منزلي، وأعدّت تقريراً شاملاً، وساعدت في مقارنة المواصفات والأسعار، وأشرفت على التركيب. أنصح بهم بشدة.", name: "عميل راضٍ", role: "عميل استشارة تقنية" },
        { quote: "جودة الشفافية التي يتمتع بها فريق مركز مصطفى ظاهر رائعة! لم أكن أتوقع يوماً أن أجد من يعمل بهذا المستوى العالي من الشفافية والمهنية. أصبحت مشاكل نظامي الشمسي مشاكلهم الآن — لقد أزالوا عني إحباطاً حياتياً كبيراً.", name: "عميل معجب", role: "عميل صيانة وخدمة" },
      ],
    },
    clients: { title: "عملاؤنا" },
    partners: { title: "شركاؤنا" },
    founder: {
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
    maintenancePlans: {
      title: "خطط الصيانة والتأمين لدينا",
      items: [
        { title: "خطة الاتفاقية البلاتينية", features: ["إصلاح النظام مجاناً بنسبة 100%", "استبدال النظام مجاناً بنسبة 100%", "6 زيارات مجدولة مجانية سنوياً", "6 زيارات طوارئ مجانية سنوياً", "استبدال مؤقت لـ 4 بطاريات مجاناً لمدة 72 ساعة", "استبدال مؤقت لـ 4 ألواح مجاناً لمدة 72 ساعة", "تنظيف الألواح الشمسية مشمول", "أيدي عاملة للإصلاح مجانية", "الاتفاقية قابلة للتمديد لمدة 4 سنوات"] },
        { title: "خطة الاتفاقية الذهبية", features: ["إصلاح النظام مجاناً بنسبة 100%", "استبدال النظام مجاناً بنسبة 75%", "4 زيارات مجدولة مجانية سنوياً", "3 زيارات طوارئ مجانية سنوياً", "استبدال مؤقت لـ 4 بطاريات مجاناً لمدة 48 ساعة", "استبدال مؤقت لـ 4 ألواح مجاناً لمدة 48 ساعة", "تنظيف الألواح الشمسية مشمول", "خصم 50% على تكلفة الأيدي العاملة للإصلاح", "الاتفاقية قابلة للتمديد لمدة 4 سنوات"] },
        { title: "خطة الاتفاقية الفضية", features: ["إصلاح النظام مجاناً بنسبة 100%", "استبدال النظام مجاناً بنسبة 50%", "3 زيارات مجدولة مجانية سنوياً", "استبدال مؤقت لـ 4 بطاريات مجاناً لمدة 48 ساعة", "استبدال مؤقت لـ 4 ألواح مجاناً لمدة 48 ساعة", "الاتفاقية قابلة للتمديد لمدة 4 سنوات"] }
      ]
    },
    contact: {
      badge: "تواصل معنا",
      title: "مستعد للتحول إلى",
      titleHighlight: "الطاقة الشمسية؟",
      subtitle: "رضا العملاء أولويتنا. اتصل بنا لأي استفسار — يسعدنا مساعدتك في التحكم بطاقتك.",
      emergencyLine: "خط الطوارئ",
      needHelp: "تحتاج مساعدة؟ اتصل بنا اليوم",
      contactInfo: "معلومات التواصل",
      cards: [
        { label: "اتصل بنا", value: "+961 6 610061" },
        { label: "راسلنا", value: "support@mustaphadahercenter.com" },
        { label: "زورونا", value: "طرابلس، مبنى ريجنسي 520، الطابق الثاني، لبنان" },
        { label: "ساعات الدعم", value: "24/7 — نحن دائماً هنا من أجلك" },
      ],
      form: {
        fullName: "الاسم الكامل", email: "البريد الإلكتروني", phone: "رقم الهاتف", message: "الرسالة",
        namePlaceholder: "اسمك الكامل", emailPlaceholder: "you@example.com", phonePlaceholder: "+961 ...", messagePlaceholder: "أخبرنا عن احتياجاتك في مجال الطاقة...",
        send: "إرسال الرسالة", thankYou: "شكراً لك!", received: "لقد تلقينا رسالتك وسنرد عليك خلال 24 ساعة.",
      },
    },
    footer: {
      privacy: "سياسة الخصوصية",
      accessibility: "بيان إمكانية الوصول",
      copyright: "بواسطة مركز مصطفى ظاهر. مدعوم ومنشأ بواسطة",
    },
  },
};

const map = [];

function traverse(enObj, arObj) {
  for (const key in enObj) {
    if (typeof enObj[key] === 'string' && typeof arObj[key] === 'string') {
      map.push({ en: enObj[key], ar: arObj[key] });
    } else if (Array.isArray(enObj[key]) && Array.isArray(arObj[key])) {
      enObj[key].forEach((item, index) => {
        if (typeof item === 'string' && typeof arObj[key][index] === 'string') {
          map.push({ en: item, ar: arObj[key][index] });
        } else if (typeof item === 'object') {
          traverse(item, arObj[key][index]);
        }
      });
    } else if (typeof enObj[key] === 'object' && typeof arObj[key] === 'object') {
      traverse(enObj[key], arObj[key]);
    }
  }
}

async function main() {
  traverse(translations.en, translations.ar);

  // also add some full string replacements
  map.push({ en: "Electricity is not a luxury, it's a life necessity! We help our community focus on their daily challenges by taking away the headache of their homes, offices and Factories \"ENERGY\". We take care of all your energy challenges from scoping your needs, supply and install to operating and maintaining your energy systems.", ar: translations.ar.about.p1 });
  map.push({ en: translations.en.about.p2, ar: translations.ar.about.p2 });
  map.push({ en: translations.en.about.p3, ar: translations.ar.about.p3 });
  map.push({ en: translations.en.about.p4, ar: translations.ar.about.p4 });
  map.push({ en: "SLA", ar: "اتفاقية مستوى الخدمة" });
  map.push({ en: "3h", ar: "3 س" });
  map.push({ en: "3h SLA", ar: "استجابة 3 ساعات" });
  map.push({ en: "Years Exp.", ar: "سنة خبرة" });
  map.push({ en: "Main", ar: "الرئيسية" });

  try {
    let updatedCount = 0;
    for (const pair of map) {
      // Find where original text exactly matches 'en'
      const records = await prisma.translationCache.findMany({
        where: { original: pair.en }
      });

      for (const r of records) {
        if (r.ar !== pair.ar) {
          await prisma.translationCache.update({
            where: { id: r.id },
            data: { ar: pair.ar }
          });
          console.log(`Updated translation for "${pair.en}" => "${pair.ar}"`);
          updatedCount++;
        }
      }
    }
    console.log(`Finished updating ${updatedCount} translations from LanguageContext.`);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
