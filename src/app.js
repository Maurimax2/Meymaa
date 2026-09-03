/* ==========================================================
   MOOR TV — single-file runtime
   Arabic default (RTL); English via the header toggle.
   No dependencies, no build step.
   ========================================================== */
(function () {
'use strict';

/* Current language. Declared up here because num() below reads it. */
var lang = 'ar';

/* ---------------- Contact ---------------- */
var WA_DISPLAY = '43 04 24 04';
var WA_E164 = '22243042404';          // Mauritania +222
var SNAP = 'moor.view';
function wa(m){ return 'https://wa.me/' + WA_E164 + '?text=' + encodeURIComponent(m); }
// French groups thousands with a space, Arabic Mauritania uses the comma.
// Every figure on the page runs through this, including the WhatsApp order.
function num(n){ return new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-US').format(n); }
function money(n){ return num(n) + ' MRU'; }

/* Brand */
var V = '#5b21b6', V2 = '#8b5cf6', O = '#2f6bff', O2 = '#6ba2ff', INK = '#06070e';

/* ---------------- Dictionary ---------------- */
var T = {
ar: {
  dir:'rtl',
  nav:{ plans:'الاشتراكات', device:'الجهاز', football:'كرة القدم', browse:'المحتوى',
        why:'لماذا نحن', faq:'الأسئلة', cta:'اشترك الآن', skip:'تخطَّ إلى المحتوى' },
  hero:{ titleA:'ترفيه بلا حدود.', titleB:['مكان','واحد.'],
    subtitle:'أكثر من 20,000 قناة مباشرة وكل البطولات الكروية والأفلام والمسلسلات بجودة 4K — على شاشتك، أينما كنت.',
    from:'يبدأ من', ctaPrimary:'اختر اشتراكك', ctaSecondary:'شاهد البطولات',
    pills:['تفعيل خلال دقائق','حتى جهازين معاً','جودة 4K فائقة'] },
  band:['كل البطولات الكروية','أفلام ومسلسلات','20,000 قناة مباشرة','جودة 4K','تفعيل فوري','دعم على واتساب'],
  stats:[ {n:'20,000+',l:'قناة مباشرة',h:'من كل قارات العالم'},
          {n:'20,000+',l:'فيلم',h:'من أضخم الأعمال إلى الكنوز المخفية'},
          {n:'15,000+',l:'مسلسل',h:'مواسم كاملة، تُحدَّث دائماً'},
          {n:'4K UHD',l:'جودة البث',h:'وضوح تام على كل شاشة'} ],
  statsLead:{ eyebrow:'المكتبة', titleA:'اشتراك واحد', titleB:'يفتح كل هذا.',
    body:'قنوات العالم كلها وأضخم مكتبة أفلام ومسلسلات، تُحدَّث كل أسبوع — ويمكنك المشاهدة على جهازين في آن واحد.' },
  plans:{ eyebrow:'الأسعار', titleA:'كل الخيارات،', titleB:'نفس المحتوى.',
    subtitle:'كل الاشتراكات تفتح المكتبة كاملة — الفرق في المدة، وفي عدد الأجهزة إن أردت جهازين. كلما طالت المدة قلّت التكلفة الشهرية.',
    footnote:'الأسعار بالأوقية الموريتانية. التفعيل والدعم عبر واتساب، ولا يُخصم أي مبلغ عبر الموقع.',
    perMonth:function(n){ return num(n) + ' أوقية شهرياً'; },
    save:function(p){ return 'وفّر ' + p + '%'; },
    popular:'الأكثر طلباً', best:'أفضل قيمة', add:'اشترك الآن',
    months:function(n){ return n===1?'شهر واحد':n===12?'سنة كاملة':n+' شهراً'; },
    features:[
      'أكثر من 20 ألف قناة مباشرة',
      'كل البطولات الكروية مباشرة',
      'أفلام ومسلسلات وأنمي ووثائقيات',
      'قنوات الأطفال والأخبار',
      'جودة 4K على كل الأجهزة',
      'دعم فوري على واتساب' ] },
  /* What the two-screen cards on the shelf call themselves. */
  extras:{ windows:'جهازين في آن واحد', device:'جهاز مع الاشتراك',
    deviceName:'جهاز مور تيفي', deviceTerm:'15 شهراً مع الجهاز',
    deviceBlurb:'جهاز أندرويد تي في مع جهاز التحكم، يصل مفعَّلاً وجاهزاً — تُوصله بالتلفاز وتشاهد.' },
  /* The hardware has its own section. `specs` is a label/value list — the
     rows restate what the offer includes, not manufacturer figures.
     CONFIRM THE MODEL AND ITS REAL SPECIFICATION BEFORE PUBLISHING. */
  device:{ eyebrow:'الجهاز', titleA:'جهاز مور تيفي،', titleB:'جاهز من الصندوق.',
    subtitle:'لا إعداد ولا تطبيقات تُحمَّل. يصلك الجهاز مفعَّلاً باشتراك 15 شهراً — توصله بالتلفاز وتشاهد.',
    specs:[
      ['النظام','أندرويد تي في'],
      ['التوصيل','منفذ HDMI — يعمل على أي تلفاز'],
      ['الجودة','بث حتى 4K'],
      ['التحكم','جهاز تحكم عن بُعد مرفق'],
      ['الاشتراك','15 شهراً مشمولة في السعر'],
      ['الحالة','يصل مفعَّلاً — لا إعداد'] ],
    cta:'اطلب الجهاز' },
  football:{ eyebrow:'الرياضة', titleA:'كل مباراة تهمّك،', titleB:'مباشرة.',
    subtitle:'الدوريات الأوروبية الكبرى والبطولات القارية والدوري السعودي — بجودة عالية وبدون تقطيع.',
    bandTitle:'البطولات المتاحة', bandSub:'مباشرة وبجودة تصل إلى 4K',
    bandCta:'اشترك الآن', liveTag:'مباشر',
    leagues:[
      ['Premier League','الدوري الإنجليزي'],
      ['UEFA Champions League','دوري أبطال أوروبا'],
      ['LaLiga','الدوري الإسباني'],
      ['Serie A','الدوري الإيطالي'],
      ['Bundesliga','الدوري الألماني'],
      ['Ligue 1','الدوري الفرنسي'],
      ['Saudi Pro League','الدوري السعودي'],
      ['CAF & World Cup','بطولات أفريقيا والعالم'] ] },
  categories:{ eyebrow:'المحتوى', titleA:'كل شيء،', titleB:'في مكان واحد.',
    subtitle:'مكتبة تُحدَّث باستمرار — تصفّحها وشاهد ما يفتحه لك اشتراك واحد.'
  },
  why:{ eyebrow:'لماذا مور تيفي', titleA:'خدمة', titleB:'تستحق الاشتراك.',
    subtitle:'ليست مجرد قنوات أكثر — بل خدمة أفضل من البداية إلى النهاية.',
    items:[
      {t:'20 ألف قناة',b:'قنوات من كل قارة: رياضة وأفلام وأطفال وأخبار ودراما، عربية وعالمية.'},
      {t:'جهازان معاً',b:'اختر باقة الجهازين وشاهد أنت والعائلة قناتين مختلفتين في نفس الوقت.'},
      {t:'تفعيل خلال دقائق',b:'اطلب عبر واتساب ويُفعَّل اشتراكك في الحال — لا انتظار حتى الغد.'},
      {t:'جهاز جاهز',b:'إن أردت، يصلك جهاز أندرويد تي في مفعَّلاً بالكامل. توصيل وتشغيل.'},
      {t:'جودة فائقة',b:'بث 4K مع معدل متكيّف، فتبقى الصورة واضحة حتى عندما يضعف الاتصال.'},
      {t:'بلا تقطيع',b:'خوادم مستقرة مهيّأة للشبكات الموريتانية، حتى في المباريات الكبرى.'},
      {t:'دعم حقيقي',b:'أشخاص على واتساب يردّون بسرعة ويحلّون المشكلة فعلاً.'},
      {t:'تحديث أسبوعي',b:'قنوات وأفلام ومواسم جديدة تُضاف كل أسبوع بلا رسوم إضافية.'} ] },
  reviews:{ eyebrow:'آراء العملاء', titleA:'يثق بنا', titleB:'آلاف المشتركين.',
    subtitle:'إليك ما يقوله بعض المشتركين عن التجربة.' },
  faq:{ eyebrow:'الأسئلة', title:'أسئلة وأجوبة',
    subtitle:'كل ما قد تريد معرفته قبل الاشتراك. وأي شيء آخر — اسألنا مباشرة.',
    helpBody:'ما زلت متردداً؟ راسلنا على واتساب ونرد عليك خلال دقائق.',
    waMessage:'مرحباً مور تيفي، عندي سؤال حول الاشتراكات.' },
  pick:{ eyebrow:'الاشتراك', title:'اختر مدّتك',
    sub:'كل الاشتراكات تفتح نفس المحتوى بالكامل — الفرق في المدة وحدها.',
    forCat:function(c){ return 'اشتراك واحد يفتح قسم ' + c + ' وكل شيء آخر في المكتبة.'; },
    note:'لا يُخصم أي مبلغ على الموقع. يُفتح طلبك كرسالة واتساب جاهزة.',
    back:'العودة إلى الاشتراكات' },
  checkout:{ titleA:'أكمل', titleB:'طلبك', hint:'نستخدم بياناتك فقط لتأكيد الطلب وتفعيله.',
    name:'الاسم', nameError:'الرجاء إدخال اسمك.', phone:'رقم الهاتف',
    phoneHint:'رقم موريتاني من 8 أرقام', phoneError:'الرجاء إدخال رقم هاتف صحيح.',
    notes:'ملاحظات', optional:'اختياري', submit:'أرسل الطلب عبر واتساب',
    note:function(p){ return 'لا يُخصم منك شيء على هذا الموقع. يُفتح طلبك كرسالة واتساب جاهزة إلى '+p+'، حيث نؤكّد الدفع ونفعّل اشتراكك.'; },
    ph:{name:'محمد ولد أحمد',phone:'44 00 00 00',notes:'أي شيء ينبغي أن نعرفه…'},
    device:'الجهاز الذي ستشاهد عليه', devicePick:'اختيار الجهاز', deviceError:'اختر نوع جهازك.',
    pay:'طريقة الدفع', payError:'اختر طريقة الدفع.',
    payTo:'حوّل المبلغ إلى هذا الرقم', payAmount:'المبلغ', copy:'نسخ', copied:'تم النسخ',
    payNote:'نفس الرقم يعمل مع الأربعة. بعد التحويل أرفق صورة التأكيد بالأسفل.',
    proof:'صورة تأكيد الدفع', proofHint:'لقطة شاشة من تطبيق الدفع بعد إتمام التحويل.',
    proofPick:'اختر صورة', proofChange:'تغيير الصورة', proofError:'أرفق صورة تأكيد الدفع.',
    /* Two steps on purpose: a WhatsApp link can carry text but never a file,
       so the order details are sent first and the image follows from the
       share sheet. Merging them risks the details never arriving. */
    sentTitle:'بقيت خطوة واحدة', 
    sentBody:'فتحنا واتساب برسالة طلبك — أرسلها أولاً، ثم أرفق صورة التأكيد بالزر أدناه.',
    sendProof:'إرسال صورة التأكيد', 
    sendProofManual:'أرسل صورة التأكيد في نفس محادثة واتساب من معرض صورك.',
    reopen:'إعادة فتح واتساب', done:'تم — شكراً لك',
    ref:'رقم الطلب', filedBody:'وصل طلبك إلى مور تيفي مع صورة التأكيد. فتحنا واتساب برسالة فيها رقم طلبك — أرسلها وسنؤكد التفعيل.',
    msg:{greeting:'مرحباً مور تيفي،',intro:'طلب اشتراك جديد.',name:'الاسم',phone:'الهاتف',
      device:'الجهاز',payMethod:'طريقة الدفع',payNum:'رقم التحويل',
      plan:'الاشتراك',total:'الإجمالي',notes:'ملاحظات',
      proof:'سأرفق صورة تأكيد الدفع في هذه المحادثة.',
      ref:'رقم الطلب', filed:'صورة التأكيد مرفوعة مع الطلب.',
      closing:'الرجاء تأكيد الطلب.'} },
  devices:{ iphone:'آيفون أو آيباد', androidphone:'هاتف أندرويد', androidtv:'جهاز أندرويد تي في',
    samsung:'تلفاز سامسونج', lg:'تلفاز إل جي', hisense:'تلفاز هايسنس', starsat:'ستارسات' },
  payNames:{ bankily:'بنكيلي', masrvi:'مصرفي', sedad:'السداد', click:'كليك' },
  footer:{ ctaEyebrow:'ابدأ الآن', ctaA:'جاهز للمشاهدة؟', ctaB:'ابدأ اليوم.',
    ctaSub:'اشتراك واحد يفتح لك كل المحتوى — من 500 أوقية.',
    ctaPrimary:'اختر اشتراكك', ctaWhatsApp:'راسلنا على واتساب', orderNow:'اطلب الآن',
    about:'مور تيفي يجمع أكثر من 20 ألف قناة مباشرة والأفلام والمسلسلات وكل البطولات الكروية الكبرى في اشتراك واحد — مصمَّم لموريتانيا.',
    explore:'تصفّح', support:'الدعم', contact:'تواصل معنا',
    links:{plans:'الاشتراكات',device:'الجهاز',football:'كرة القدم',cats:'المحتوى',why:'لماذا مور تيفي',
      faq:'الأسئلة الشائعة',reviews:'آراء العملاء'},
    waLine:'واتساب — الطلبات والدعم', snapLine:'سناب شات — عروض يومية',
    country:'موريتانيا', countryLine:'خدمة في كل البلاد', rights:'جميع الحقوق محفوظة.',
    trademarks:'أسماء البطولات والقنوات مذكورة لوصف المحتوى المتاح فقط، وهي ملك لأصحابها. مور تيفي خدمة مستقلة غير تابعة لأي منها.',
    waGreeting:'مرحباً مور تيفي،',
    waLearn:'مرحباً مور تيفي، أريد معرفة المزيد عن الاشتراكات.',
    waOrder:'مرحباً مور تيفي، أرغب في الاشتراك.' }
},
fr: {
  dir:'ltr',
  nav:{ plans:'Abonnements', device:'L’appareil', football:'Football', browse:'Contenu',
        why:'Pourquoi nous', faq:'FAQ', cta:'S’abonner', skip:'Aller au contenu' },
  hero:{ titleA:'Le divertissement sans limites.', titleB:['En un seul','endroit.'],
    subtitle:'Plus de 20 000 chaînes en direct, toutes les grandes compétitions de football, films et séries en 4K — sur votre écran, où que vous soyez.',
    from:'À partir de', ctaPrimary:'Choisir mon abonnement', ctaSecondary:'Voir les compétitions',
    pills:['Activation en minutes','Jusqu’à deux appareils','4K Ultra HD'] },
  band:['Toutes les ligues de football','Films et séries','20 000 chaînes en direct','Qualité 4K','Activation immédiate','Assistance WhatsApp'],
  stats:[ {n:'20,000+',l:'Chaînes en direct',h:'De tous les continents'},
          {n:'20,000+',l:'Films',h:'Des blockbusters aux pépites'},
          {n:'15,000+',l:'Séries',h:'Saisons complètes, toujours à jour'},
          {n:'4K UHD',l:'Qualité de diffusion',h:'Une image nette sur chaque écran'} ],
  statsLead:{ eyebrow:'La bibliothèque', titleA:'Un seul abonnement', titleB:'ouvre tout cela.',
    body:'Les chaînes du monde entier et une immense bibliothèque de films et de séries, enrichie chaque semaine — avec la possibilité de regarder sur deux appareils à la fois.' },
  plans:{ eyebrow:'Tarifs', titleA:'Toutes les formules,', titleB:'le même contenu.',
    subtitle:'Tous les abonnements ouvrent la bibliothèque complète — ce qui change, c’est la durée, et le nombre d’appareils si vous en voulez deux. Plus la durée est longue, moins le mois revient cher.',
    footnote:'Prix en ouguiya mauritanienne. Activation et assistance sur WhatsApp ; aucun montant n’est prélevé sur ce site.',
    perMonth:function(n){ return num(n) + ' MRU / mois'; },
    save:function(p){ return 'Économisez ' + p + ' %'; },
    popular:'Le plus choisi', best:'Meilleure offre', add:'S’abonner',
    months:function(n){ return n===1?'1 mois':n===12?'1 an':n+' mois'; },
    features:[
      'Plus de 20 000 chaînes en direct',
      'Toutes les ligues, en direct',
      'Films, séries, animés, documentaires',
      'Chaînes jeunesse et information',
      '4K sur tous vos appareils',
      'Assistance WhatsApp rapide' ] },
  extras:{ windows:'Deux appareils à la fois', device:'Appareil avec l’abonnement',
    deviceName:'Boîtier MOOR TV', deviceTerm:'15 mois, appareil inclus',
    deviceBlurb:'Un appareil Android TV avec sa télécommande, livré déjà activé — vous le branchez au téléviseur et vous regardez.' },
  device:{ eyebrow:'L’appareil', titleA:'Le boîtier MOOR TV,', titleB:'prêt à l’emploi.',
    subtitle:'Rien à installer, aucune application à télécharger. L’appareil arrive activé avec 15 mois d’abonnement — branchez-le au téléviseur et regardez.',
    specs:[
      ['Système','Android TV'],
      ['Branchement','Port HDMI — sur n’importe quel téléviseur'],
      ['Qualité','Diffusion jusqu’en 4K'],
      ['Commande','Télécommande fournie'],
      ['Abonnement','15 mois inclus dans le prix'],
      ['État','Livré activé — rien à régler'] ],
    cta:'Commander l’appareil' },
  football:{ eyebrow:'Sport', titleA:'Chaque match qui compte,', titleB:'en direct.',
    subtitle:'Les grands championnats européens, les compétitions continentales et la Saudi Pro League — en haute qualité, sans coupure.',
    bandTitle:'Compétitions incluses', bandSub:'En direct, jusqu’à la 4K',
    bandCta:'S’abonner', liveTag:'DIRECT',
    leagues:[
      ['Premier League','Angleterre'],
      ['UEFA Champions League','Europe'],
      ['LaLiga','Espagne'],
      ['Serie A','Italie'],
      ['Bundesliga','Allemagne'],
      ['Ligue 1','France'],
      ['Saudi Pro League','Arabie saoudite'],
      ['CAF & Coupe du monde','International'] ] },
  categories:{ eyebrow:'Contenu', titleA:'Tout,', titleB:'au même endroit.',
    subtitle:'Une bibliothèque enrichie chaque semaine — parcourez ce qu’un seul abonnement débloque.'
  },
  why:{ eyebrow:'Pourquoi MOOR TV', titleA:'Un service', titleB:'qui vaut l’abonnement.',
    subtitle:'Pas seulement plus de chaînes — un meilleur service, du début à la fin.',
    items:[
      {t:'20 000 chaînes',b:'Des chaînes de tous les continents : sport, cinéma, jeunesse, info et séries, arabes et internationales.'},
      {t:'Deux appareils',b:'Choisissez la formule deux appareils et regardez deux chaînes différentes en même temps.'},
      {t:'Actif en quelques minutes',b:'Commandez sur WhatsApp et votre accès est activé aussitôt — sans attendre demain.'},
      {t:'Appareil prêt',b:'Si vous le souhaitez, vous recevez un appareil Android TV entièrement activé. Branchez et regardez.'},
      {t:'Qualité Ultra HD',b:'4K à débit adaptatif : l’image reste nette même quand la connexion faiblit.'},
      {t:'Sans coupure',b:'Des serveurs stables réglés pour les réseaux mauritaniens, même les soirs de grand match.'},
      {t:'Une vraie assistance',b:'Des personnes sur WhatsApp qui répondent vite et règlent le problème.'},
      {t:'Enrichi chaque semaine',b:'Nouvelles chaînes, films et saisons ajoutés chaque semaine, sans supplément.'} ] },
  reviews:{ eyebrow:'Témoignages', titleA:'La confiance de', titleB:'milliers d’abonnés.',
    subtitle:'Voici ce qu’en disent quelques abonnés.' },
  faq:{ eyebrow:'FAQ', title:'Questions fréquentes',
    subtitle:'Tout ce qu’il faut savoir avant de s’abonner. Pour le reste, écrivez-nous.',
    helpBody:'Encore un doute ? Écrivez-nous sur WhatsApp, nous répondons en quelques minutes.',
    waMessage:'Bonjour MOOR TV, j’ai une question sur vos abonnements.' },
  pick:{ eyebrow:'Abonnement', title:'Choisissez votre durée',
    sub:'Tous les abonnements ouvrent la même bibliothèque — seule la durée change.',
    forCat:function(c){ return 'Un seul abonnement ouvre ' + c + ' et tout le reste de la bibliothèque.'; },
    note:'Aucun montant n’est prélevé sur le site. Votre commande s’ouvre dans WhatsApp, déjà rédigée.',
    back:'Retour aux abonnements' },
  checkout:{ titleA:'Finalisez votre', titleB:'commande', hint:'Vos informations servent uniquement à confirmer et activer la commande.',
    name:'Nom complet', nameError:'Merci d’indiquer votre nom.', phone:'Numéro de téléphone',
    phoneHint:'Numéro mauritanien, 8 chiffres', phoneError:'Merci d’indiquer un numéro valide.',
    notes:'Remarques', optional:'Facultatif', submit:'Envoyer la commande sur WhatsApp',
    note:function(p){ return 'Aucun montant n’est prélevé sur ce site. Votre commande s’ouvre dans WhatsApp vers le '+p+', déjà rédigée — nous y confirmons le paiement et activons votre accès.'; },
    ph:{name:'Mohamed Ould Ahmed',phone:'44 00 00 00',notes:'Quelque chose à nous signaler…'},
    device:'Appareil de visionnage', devicePick:'Choisir l’appareil', deviceError:'Choisissez votre type d’appareil.',
    pay:'Moyen de paiement', payError:'Choisissez un moyen de paiement.',
    payTo:'Transférez le montant à ce numéro', payAmount:'Montant', copy:'Copier', copied:'Copié',
    payNote:'Le même numéro fonctionne pour les quatre. Après le transfert, joignez la preuve ci-dessous.',
    proof:'Preuve de paiement', proofHint:'Capture d’écran de l’application après le transfert.',
    proofPick:'Choisir une image', proofChange:'Changer l’image', proofError:'Joignez la preuve de paiement.',
    sentTitle:'Encore une étape',
    sentBody:'WhatsApp s’est ouvert avec votre commande — envoyez-la d’abord, puis joignez la preuve avec le bouton ci-dessous.',
    sendProof:'Envoyer la preuve',
    sendProofManual:'Envoyez la capture depuis votre galerie dans la même conversation WhatsApp.',
    reopen:'Rouvrir WhatsApp', done:'Terminé — merci',
    ref:'N° de commande', filedBody:'Votre commande est arrivée chez MOOR TV avec la preuve de paiement. WhatsApp s’est ouvert avec votre numéro de commande — envoyez-le et nous confirmons l’activation.',
    msg:{greeting:'Bonjour MOOR TV,',intro:'Nouvelle commande d’abonnement.',name:'Nom',phone:'Téléphone',
      device:'Appareil',payMethod:'Moyen de paiement',payNum:'Numéro du transfert',
      plan:'Abonnement',total:'Total',notes:'Remarques',
      proof:'Je joins la preuve de paiement dans cette conversation.',
      ref:'N° de commande', filed:'La preuve de paiement est déjà jointe à la commande.',
      closing:'Merci de confirmer la commande.'} },
  devices:{ iphone:'iPhone ou iPad', androidphone:'Téléphone Android', androidtv:'Boîtier Android TV',
    samsung:'TV Samsung', lg:'TV LG', hisense:'TV Hisense', starsat:'StarSat' },
  payNames:{ bankily:'Bankily', masrvi:'Masrvi', sedad:'Sedad', click:'Click' },
  footer:{ ctaEyebrow:'Commencer', ctaA:'Prêt à regarder ?', ctaB:'Commencez aujourd’hui.',
    ctaSub:'Un seul abonnement débloque tout — à partir de 500 MRU.',
    ctaPrimary:'Choisir mon abonnement', ctaWhatsApp:'Nous écrire sur WhatsApp', orderNow:'Commander',
    about:'MOOR TV réunit plus de 20 000 chaînes en direct, les films, les séries et toutes les grandes compétitions de football dans un seul abonnement — pensé pour la Mauritanie.',
    explore:'Explorer', support:'Assistance', contact:'Contact',
    links:{plans:'Abonnements',device:'L’appareil',football:'Football',cats:'Contenu',why:'Pourquoi MOOR TV',
      faq:'FAQ',reviews:'Avis'},
    waLine:'WhatsApp — commandes et assistance', snapLine:'Snapchat — offres du jour',
    country:'Mauritanie', countryLine:'Service dans tout le pays', rights:'Tous droits réservés.',
    trademarks:'Les noms de compétitions et de chaînes servent uniquement à décrire le contenu disponible et restent la propriété de leurs détenteurs. MOOR TV est un service indépendant, sans affiliation avec aucun d’entre eux.',
    waGreeting:'Bonjour MOOR TV,',
    waLearn:'Bonjour MOOR TV, je voudrais en savoir plus sur vos abonnements.',
    waOrder:'Bonjour MOOR TV, je souhaite m’abonner.' }
}
};

/* ---------------- Plans ----------------
   500 / 1000 / 1700 / 2500 / 3000 MRU. The monthly rate (500) is the reference the
   savings percentages are measured against. */
var BASE = 500;
var PLANS = [
  { id:'p1',  months:1,  price:500 },
  { id:'p3',  months:3,  price:1000 },
  { id:'p6',  months:6,  price:1700 },
  { id:'p12', months:12, price:2500, badge:'popular' },
  { id:'p15', months:15, price:3000, badge:'best', best:true }
];
PLANS.forEach(function (p) {
  p.ref = BASE * p.months;
  p.per = Math.round(p.price / p.months);
  p.savePct = Math.round((1 - p.price / p.ref) * 100);
});

/* Two-screen terms and the hardware bundle. They are kept in their own list
   because `planLabel()` names them differently and the hardware has a product
   to photograph — but they sit in the same grid as the durations and order
   through the same sheet. */
var EXTRAS = [
  { id:'w12', months:12, price:3000, kind:'windows' },
  { id:'w15', months:15, price:3500, kind:'windows' },
  { id:'dev', months:15, price:4500, kind:'device', photo:'d-stick' }
];
EXTRAS.forEach(function (e) { e.per = Math.round(e.price / e.months); });

/* The renders are framed differently — some are head-to-toe, some stop at the
   waist — so giving them all the same box height gives them wildly different
   head sizes, and the full-body ones read as small. This is the correction:
   `h` scales a figure against the card's base height and `dy` pushes it back
   down so the crop lands on the chest rather than lopping off the head.
   It applies to the plain cards only. Inside the two-screen frames every
   figure is meant to be seen head to toe, so they are left alone there.
   Tuned by eye against the whole shelf; re-check the row after re-casting. */
var FIGURE_FIT = {
  'p-yamal':      [0.84, 0],    // tight waist-up
  'p-haaland':    [0.94, 0],
  'x-jane':       [0.88, 0],    // waist-up, the largest head of the set
  'x-punisher':   [1.16, 7],
  'x-tyrion':     [1.08, 3],
  'x-homelander': [1.58, 38],   // head to toe: scaled up and dropped to the chest
  'x-walter':     [1.52, 37]
};
function fit(key){
  var f = FIGURE_FIT[key];
  return f ? ' style="--h:'+f[0]+';--dy:'+f[1]+'%"' : '';
}

/* How each offer looks on the shelf. Every card carries a pair — a footballer
   and a screen character — because that pairing is the whole offer stated in
   one picture. The colour is a ladder: blue at one month through violet at
   fifteen, so the row reads as ascending, and the two-screen terms break out
   into cyan because they are a different product, not a longer one.

   Two constraints govern the casting, and both bite if it is re-cast:

   - There are only five character cut-outs for seven cards, so two of them
     appear twice. The repeats sit four cards apart, which is more than fits
     on screen at once.
   - The two-screen cards stand their figures inside a 112px frame, so they
     need *narrow* renders. Yamal and Álvarez are wide (arms out, ~0.78 of
     their height) and spill out of the frame; they belong on the plain cards.
     Anything at or below ~0.6 fits.

   No figure holds the same slot here as on MAURIMAX; see the README table. */
var OFFER_ART = {
  p1:  { player:'p-kane',      face:'x-jane',       c1:'#12306e', c2:'#3b82f6' },
  p3:  { player:'p-haaland',   face:'x-homelander', c1:'#1b2f7a', c2:'#4f7cff' },
  p6:  { player:'p-yamal',     face:'x-walter',     c1:'#2b2a84', c2:'#6366f1' },
  p12: { player:'p-ronaldo',   face:'x-punisher',   c1:'#3d2490', c2:'#8b5cf6' },
  p15: { player:'p-messi-b',   face:'x-tyrion',     c1:'#4c1d95', c2:'#a855f7' },
  w12: { player:'p-ronaldo-b', face:'x-homelander', c1:'#0b3b52', c2:'#22d3ee',
         ct:'#06070e', screens:true },
  w15: { player:'p-messi',     face:'x-walter',     c1:'#0d4a5e', c2:'#38bdf8',
         ct:'#06070e', screens:true }
};

function findAny(id){
  var all = PLANS.concat(EXTRAS);
  for (var i=0;i<all.length;i++) if (all[i].id===id) return all[i];
  return null;
}
function find(id){ return findAny(id); }

/* Key art as moving background texture behind the closing call to action —
   never as a list of titles. */
var DRIFT = ['m-walkingdead','m-lacasa','m-fury','m-spiderman','m-odyssey',
             'm-batman','m-breakingbad','m-got','m-oppenheimer',
             'po-ligue1','po-bundesliga','po-laliga','po-seriea','po-ucl','po-epl'];

/* The raked hero wall. Ordered so no two neighbours in a row are both
   football or both film — the mix is what says "everything is in here". */
var WALL = ['m-batman','po-ucl','m-breakingbad','po-laliga','m-got','po-epl',
            'm-spiderman','po-seriea','m-oppenheimer','po-bundesliga',
            'm-lacasa','po-ligue1','m-fury','m-walkingdead','m-odyssey'];

var CATS = [
  {art:'movies',   photo:'m-spiderman', ar:['أفلام','أكثر من 20,000 فيلم'],    fr:['Films','Plus de 20 000 films']},
  {art:'series',   photo:'m-got',       ar:['مسلسلات','أكثر من 15,000 مسلسل'], fr:['Séries','Plus de 15 000 séries']},
  {art:'football', photo:'c-football', ar:['كرة القدم','كل الدوريات الكبرى'], fr:['Football','Tous les grands championnats']},
  {art:'sports',   photo:'c-sports',   ar:['رياضة','أكثر من 900 قناة'],       fr:['Sports','Plus de 900 chaînes']},
  {art:'kids',     photo:'c-kids',  ar:['أطفال','آمن وممتع'],      fr:['Enfants','Sûr et amusant']},
  {art:'anime',    photo:'c-anime', ar:['أنمي','مترجم ومدبلج'],   fr:['Animés','Sous-titrés et doublés']},
  {art:'docs',     photo:'c-docs', ar:['وثائقيات','قصص حقيقية'],  fr:['Documentaires','Des histoires vraies']},
  {art:'news',     photo:'c-news', logo:true, ar:['أخبار','على مدار الساعة'], fr:['Actualités','24 h/24, partout']},
  {art:'series2',  photo:'c-drama', ar:['دراما عربية وتركية','مواسم كاملة'], fr:['Drames arabes et turcs','Saisons complètes']},
  {art:'live',     photo:'c-live',     ar:['قنوات مباشرة','أكثر من 20,000 قناة'], fr:['Chaînes en direct','Plus de 20 000 chaînes']}
];

/* Illustrative examples, not verified customer reviews — replace before launch. */
var REVIEWS = [
  {i:'MA',ar:['محمد ولد أحمد','نواكشوط','أتابع كل مباريات دوري الأبطال بجودة عالية دون أي تقطيع، والتفعيل استغرق دقائق فقط.'],
        fr:['Mohamed Ould Ahmed','Nouakchott','Je suis tous les matchs de Ligue des champions en haute qualité, sans une seule coupure, et l’activation a pris quelques minutes.']},
  {i:'FS',ar:['فاطمتو منت سيدي','نواذيبو','قسم الأطفال ممتاز وزوجي يجد كل مبارياته. اشتراك واحد عوّض ثلاثة كنا ندفعها.'],
        fr:['Fatimetou Mint Sidi','Nouadhibou','La section jeunesse est parfaite et mon mari a tout son football. Un abonnement en a remplacé trois.']},
  {i:'CD',ar:['الشيخ ديالو','روصو','اشتركت 15 شهراً بـ3000 أوقية. أرخص بكثير من أي خيار آخر جربته.'],
        fr:['Cheikh Diallo','Rosso','J’ai pris les 15 mois à 3 000 MRU. Bien moins cher que tout ce que j’avais essayé.']},
  {i:'AB',ar:['أمينتو منت بابا','كيفة','كل المسلسلات التي أتابعها موجودة، والحلقات الجديدة تظهر في نفس الأسبوع.'],
        fr:['Aminetou Mint Baba','Kiffa','Toutes les séries que je suis sont là, et les nouveaux épisodes arrivent dans la semaine.']},
  {i:'SV',ar:['سيدي محمد فال','أطار','ما أقنعني هو الدعم — أرسلت رسالة ليلاً فردّ عليّ أحدهم وحلّ المشكلة فوراً.'],
        fr:['Sidi Mohamed Vall','Atar','Ce qui m’a convaincu, c’est l’assistance — j’ai écrit le soir et quelqu’un a réglé ça tout de suite.']}
];

var FAQS = [
  {ar:['كيف أحصل على اشتراكي؟','اختر المدة وأدخل اسمك ورقمك — سيفتح الموقع واتساب وطلبك مكتوب بالفعل. أرسله ونرد ببيانات التفعيل خلال دقائق.'],
   fr:['Comment obtenir mon abonnement ?','Choisissez une durée, indiquez votre nom et votre numéro — le site ouvre WhatsApp avec votre commande déjà rédigée. Envoyez-la et nous répondons avec vos accès en quelques minutes.']},
  {ar:['ما الفرق بين الاشتراكات؟','لا فرق في المحتوى إطلاقاً — كل الاشتراكات تفتح المكتبة كاملة. الفرق في المدة فقط: كلما طالت المدة انخفضت التكلفة الشهرية، من 500 أوقية للشهر إلى 200 أوقية شهرياً في اشتراك 15 شهراً.'],
   fr:['Quelle est la différence entre les abonnements ?','Aucune sur le contenu — chaque abonnement ouvre la bibliothèque complète. Seule la durée change : plus elle est longue, moins le mois revient cher, de 500 MRU pour un mois à 200 MRU par mois sur 15 mois.']},
  {ar:['على أي الأجهزة يعمل؟','الشاشات الذكية (سامسونج، إل جي، أندرويد تي في)، هواتف وأجهزة أندرويد، الآيفون والآيباد، وحواسيب ويندوز وماك. حساب واحد يكفي البيت كله ونساعدك في الإعداد.'],
   fr:['Sur quels appareils cela fonctionne-t-il ?','Smart TV (Samsung, LG, Android TV), téléphones et boîtiers Android, iPhone et iPad, ordinateurs Windows et Mac. Un compte suffit pour toute la maison et nous vous aidons à l’installer.']},
  {ar:['هل أحتاج إنترنت سريع؟','لجودة 4K ننصح بحوالي 25 ميجابت. الجودة الكاملة HD تعمل بسلاسة من 10 ميجابت، والبث يتكيّف تلقائياً إذا ضعف الاتصال فلا تتوقف المشاهدة.'],
   fr:['Faut-il une connexion rapide ?','Pour la 4K, comptez environ 25 Mb/s. La Full HD passe très bien à partir de 10 Mb/s, et le flux s’adapte automatiquement si la connexion faiblit.']},
  {ar:['كيف أدفع؟','نرتّب الدفع مباشرة عبر واتساب بالوسائل المتداولة في موريتانيا — بنكيلي أو مصرفي أو سداد أو نقداً. لا يُخصم أي مبلغ عبر الموقع.'],
   fr:['Comment payer ?','Le paiement se règle directement sur WhatsApp avec les moyens courants en Mauritanie — Bankily, Masrvi, Sedad ou espèces. Rien n’est prélevé via le site.']},
  {ar:['ماذا يحدث عند انتهاء الاشتراك؟','نراسلك قبل تاريخ الانتهاء حتى لا ينقطع البث. التجديد برسالة واحدة وتحتفظ بنفس الإعدادات.'],
   fr:['Que se passe-t-il à l’expiration ?','Nous vous écrivons avant la date de fin pour éviter toute coupure. Le renouvellement tient en un message et vous gardez vos réglages.']},
  {ar:['ماذا لو توقف شيء عن العمل؟','راسلنا على واتساب في أي وقت. معظم المشاكل تُحل بتعديل بسيط، وإذا احتاج الخادم إلى تغيير ننقلك فوراً وبدون تكلفة.'],
   fr:['Et si quelque chose ne marche plus ?','Écrivez-nous sur WhatsApp à tout moment. La plupart des soucis se règlent par un réglage ; si un serveur doit changer, nous vous basculons aussitôt, sans frais.']}
];

/* ---------------- Artwork ----------------
   Original SVG, drawn for the light theme in the brand palette.
   Nothing here is licensed from anyone. */
function rep(n,fn){ var o=''; for(var i=0;i<n;i++) o+=fn(i); return o; }
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

/* Photographs supplied by the brand, inlined by build-moortv.mjs as
   { 'p-messi': 'data:image/webp;base64,…', … }. Absent when moortv.js is
   loaded on its own during development, so every caller degrades to the
   drawn SVG rather than rendering a broken image. */
var MXIMG = window.MXIMG || {};
function photo(key){ return (key && MXIMG[key]) || ''; }

/* ---------------- Payment ----------------
   Mauritania's four mobile-money services, all on the same MOOR TV number.
   `bg`/`fg` are each service's own colours, taken from its logo: the field
   that shows the number is painted in them, so a customer who has just opened
   Bankily recognises the Bankily field without reading it. The number is only
   revealed once a service is picked — before that there is nothing to pay to.
   The logos are supplied artwork, shown on a white plate: they are made for
   light backgrounds and would disappear into this page otherwise. */
var PAY = [
  { id:'bankily', logo:'pay-bankily', bg:'#f5be00', fg:'#0a1020' },
  { id:'masrvi',  logo:'pay-masrvi',  bg:'#2a0a78', fg:'#ffffff' },
  { id:'sedad',   logo:'pay-sedad',   bg:'#00903f', fg:'#ffffff' },
  { id:'click',   logo:'pay-click',   bg:'#00a0c0', fg:'#06131c' }
];
/* The order matters: it is the order they appear in the sheet. */
var DEVICES = ['iphone','androidphone','androidtv','samsung','lg','hisense','starsat'];

/* Parallel to football.leagues in the dictionaries; '' where no mark exists. */
var LEAGUE_CRESTS = ['l-epl-text','l-ucl','l-laliga','l-seriea','l-bundesliga','l-ligue1','l-spl',''];

/* The poster wall. `i` indexes football.leagues so the caption reads from the
   dictionary and stays translated. */
var POSTERS = [
  { i:1, shot:'po-ucl',        crest:'l-ucl' },
  { i:5, shot:'po-ligue1',     crest:'l-ligue1' },
  { i:0, shot:'po-epl',        crest:'l-epl-text' },
  { i:4, shot:'po-bundesliga', crest:'l-bundesliga' },
  { i:2, shot:'po-laliga',     crest:'l-laliga' },
  { i:3, shot:'po-seriea',     crest:'l-seriea' }
];

var TICK = '<svg viewBox="0 0 16 16" width="15" height="15" fill="none" aria-hidden><path d="m3 8.5 3.2 3.2L13 4.6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
var STAR = '<svg viewBox="0 0 20 20" width="15" height="15" aria-hidden><path d="M10 1.6l2.5 5.1 5.6.8-4 3.9 1 5.6L10 14.3l-5 2.7 1-5.6-4.1-3.9 5.6-.8Z" fill="'+O+'"/></svg>';

/* ---------------- State ---------------- */
try { var st = localStorage.getItem('moortv.lang'); if (st==='ar'||st==='fr') lang = st; } catch(e){}
// One subscription per order, so there is nothing to accumulate — just the
// plan the visitor picked in the order sheet.
var chosen = null;        // plan id
var chosenPay = null;     // payment service id
var chosenDevice = null;  // device key
var proofFile = null;     // the payment screenshot, kept in memory only

function t(){ return T[lang]; }
function $(s,r){ return (r||document).querySelector(s); }
function $$(s,r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); }
var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------- Render ---------------- */
function render() {
  var d = t();
  document.documentElement.lang = lang;
  document.documentElement.dir = d.dir;
  $('#langTxt').textContent = lang === 'ar' ? 'FR' : 'ع';
  $('#lang').setAttribute('aria-label', lang==='ar' ? 'Passer au français' : 'التبديل إلى العربية');

  $$('[data-i]').forEach(function (el) {
    var v = d, parts = el.getAttribute('data-i').split('.');
    for (var i=0;i<parts.length && v!=null;i++) v = v[parts[i]];
    if (typeof v === 'string') el.textContent = v;
  });

  var links = [['plans','#plans'],['device','#device'],['football','#football'],
               ['browse','#categories'],['why','#why'],['faq','#faq']];
  $('#nav').innerHTML = links.map(function(l){ return '<a href="'+l[1]+'">'+esc(d.nav[l[0]])+'</a>'; }).join('');
  $('#menuList').innerHTML = links.map(function(l,i){
    return '<a href="'+l[1]+'" data-close>'+esc(d.nav[l[0]])+'<span>0'+(i+1)+'</span></a>'; }).join('');

  $('#heroPills').innerHTML = d.hero.pills.map(function(p){ return '<span><i></i>'+esc(p)+'</span>'; }).join('');
  // The wall is the whole library raked past at an angle, three rows of
  // full-size posters. It is the hero: no figures stand in front of it.
  renderWall();
  // The second headline line is set one word to a line, so it is a list of
  // lines in the dictionary rather than a sentence — each language decides
  // where it breaks. The data-i pass above skips it, being an array.
  $('#heroL2').innerHTML = d.hero.titleB
    .map(function(w){ return '<span>' + esc(w) + '</span>'; }).join('');
  $('#fromPrice').textContent = num(BASE);

  // Crests ride along in the marquee so the strip reads as football, not
  // as a generic band of feature words.
  var crestPool = ['l-ucl','l-ligue1','l-epl-text','l-bundesliga','l-spl','l-laliga'].map(photo).filter(Boolean);
  var band = d.band.concat(d.band);
  $('#bandTrack').innerHTML = band.map(function(b,i){
    var c = crestPool.length ? crestPool[i % crestPool.length] : '';
    return '<span class="it">'+(c ? '<img src="'+c+'" alt="" loading="lazy" decoding="async">' : '')+
      esc(b)+'<em></em></span>'; }).join('');

  // Figures as hairline rows with counters, not a grid of identical boxes.
  $('#statRow').innerHTML = d.stats.map(function(s){
    var f = figure(s.n);
    return '<div class="figRow"><span class="n" data-count="'+f.to+'" data-pre="'+esc(f.pre)+
      '" data-post="'+esc(f.post)+'">'+esc(f.pre)+(f.to ? '0' : '')+esc(f.post)+'</span>'+
      '<span class="tx"><b>'+esc(s.l)+'</b><span>'+esc(s.h)+'</span></span></div>'; }).join('');

  // The shelf carries the subscriptions only. The hardware is not a longer
  // subscription, so it has a section of its own further down.
  $('#planRail').innerHTML = PLANS
    .concat(EXTRAS.filter(function(e){ return e.kind !== 'device'; }))
    .map(function(p){ return offerCard(p,d); }).join('');
  $('#planFeat').innerHTML = d.plans.features
    .map(function(f){ return '<li>'+TICK+'<span>'+esc(f)+'</span></li>'; }).join('');
  renderDevice(d);

  pWall = undefined;  // the hero was just rebuilt; drop the parallax cache

  // Players anchoring the football, why and closing sections.
  setImg('#fbAnchor', 'p-yamal');
  setImg('#catAnchor', 'x-walter');
  setImg('#closeArt', 'p-messi');

  // The strip marches, so the list is laid down twice: the second pass is
  // decoration and is hidden from assistive tech rather than read out again.
  var poHtml = POSTERS.map(function(po, n){
    var shot = photo(po.shot); if (!shot) return '';
    var l = d.football.leagues[po.i], crest = photo(po.crest);
    return function(dup){
      return '<a class="po" href="#plans"'+
        (dup ? ' tabindex="-1" aria-hidden="true"' : ' aria-label="'+esc(l[0])+'"')+'>'+
        '<img class="shot" src="'+shot+'" alt="" loading="lazy" decoding="async">'+
        '<span class="scrim"></span>'+
        '<span class="live keep"><i></i>'+esc(d.football.liveTag)+'</span>'+
        '<span class="cap">'+
          (crest ? '<img src="'+crest+'" alt="" loading="lazy" decoding="async">' : '')+
          '<span><b class="keep" dir="ltr">'+esc(l[0])+'</b><s>'+esc(l[1])+'</s></span>'+
        '</span></a>';
    };
  }).filter(Boolean);
  $('#posterWall').innerHTML =
    poHtml.map(function(f){ return f(false); }).join('') +
    poHtml.map(function(f){ return f(true); }).join('');

  $('#leagueList').innerHTML = d.football.leagues.map(function(l,i){
    var crest = photo(LEAGUE_CRESTS[i]);
    return '<div class="lg">'+
      (crest ? '<img class="crest" src="'+crest+'" alt="" loading="lazy" decoding="async">' : '')+
      '<span class="nm keep" dir="ltr">'+esc(l[0])+'</span>'+
      '<span class="sub">'+esc(l[1])+'</span></div>'; }).join('');

  $('#catGrid').innerHTML = CATS.map(function(c,i){ return catCard(c,i); }).join('');

  $('#whyGrid').innerHTML = d.why.items.map(function(w,i){
    return '<div class="feat"><span class="ix">'+(i<9?'0':'')+(i+1)+'</span>'+
      '<h3>'+esc(w.t)+'</h3><p>'+esc(w.b)+'</p></div>'; }).join('') +
    // The cell the eight reasons leave over, and the figure that fills it.
    '<div class="feat whyCell"><img class="whyAnchor" id="whyAnchor" alt="" aria-hidden="true"></div>';
  // The why anchor lives inside the grid, so it can only be filled in
  // once that grid has been written.
  setImg('#whyAnchor', 'p-alvarez');

  $('#rvRail').innerHTML = REVIEWS.map(function(r){
    var x = r[lang];
    return '<figure class="rv"><div class="qm" aria-hidden="true">”</div>'+
      '<blockquote class="q">'+esc(x[2])+'</blockquote>'+
      '<figcaption class="who"><span class="av">'+r.i+'</span><span>'+
      '<span style="display:block;font-size:13.5px;font-weight:600">'+esc(x[0])+'</span>'+
      '<span style="display:block;font-size:12px;color:var(--muted)">'+esc(x[1])+'</span></span>'+
      '<span class="st" style="margin-inline-start:auto">'+rep(5,function(){return STAR;})+'</span>'+
      '</figcaption></figure>'; }).join('');

  $('#faqList').innerHTML = FAQS.map(function(f,i){
    var x = f[lang];
    return '<div class="acc'+(i===0?' on':'')+'"><button type="button" aria-expanded="'+(i===0)+'">'+
      '<span class="ix">'+(i<9?'0':'')+(i+1)+'</span>'+
      '<span class="qq">'+esc(x[0])+'</span><span class="pm"></span></button>'+
      '<div class="panel"><p>'+esc(x[1])+'</p></div></div>'; }).join('');

  var fl = d.footer.links;
  $('#fExplore').innerHTML = [[fl.plans,'#plans'],[fl.device,'#device'],[fl.football,'#football'],[fl.cats,'#categories']]
    .map(function(x){ return '<li><a href="'+x[1]+'">'+esc(x[0])+'</a></li>'; }).join('');
  $('#fSupport').innerHTML = [[fl.faq,'#faq'],[fl.reviews,'#reviews']]
    .map(function(x){ return '<li><a href="'+x[1]+'">'+esc(x[0])+'</a></li>'; }).join('');
  $('#fContact').innerHTML =
    '<li><a href="'+wa(d.footer.waGreeting)+'" target="_blank" rel="noopener"><span dir="ltr" style="display:block;color:#fff;font-weight:700">'+WA_DISPLAY+'</span><span style="font-size:12.5px">'+esc(d.footer.waLine)+'</span></a></li>'+
    '<li><a href="https://www.snapchat.com/add/'+SNAP+'" target="_blank" rel="noopener"><span dir="ltr" style="display:block;color:#fff;font-weight:700">'+SNAP+'</span><span style="font-size:12.5px">'+esc(d.footer.snapLine)+'</span></a></li>'+
    '<li><span style="display:block;color:#fff;font-weight:700">'+esc(d.footer.country)+'</span><span style="font-size:12.5px;color:rgba(255,255,255,.5)">'+esc(d.footer.countryLine)+'</span></li>';

  $('#faqWaNum').textContent = WA_DISPLAY;
  $('#faqWa').href = wa(d.faq.waMessage);
  $('#footWa').href = wa(d.footer.waLearn);
  $('#socWa').href = wa(d.footer.waGreeting);
  $('#fab').href = wa(d.footer.waOrder);
  $('#fab').setAttribute('aria-label', d.footer.orderNow + ' — ' + WA_DISPLAY);
  $('#coNote').textContent = d.checkout.note(WA_DISPLAY);
  $('#cName').placeholder = d.checkout.ph.name;
  $('#cPhone').placeholder = d.checkout.ph.phone;
  $('#cNotes').placeholder = d.checkout.ph.notes;

  renderDrift();
  renderPicker(d);
  renderCheckout(d);
  fitWordmarks();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitWordmarks);
  reveal();
  counters();
  accordions();
  railArrows();
  offerDrift();
}

/* The one plan that carries the section: a dark block with the player
   standing out of the top of it, and the full feature list. */
/* One place that names an offer — the ladder says its duration, the extras
   say what makes them different. */
function planLabel(p, d) {
  if (p.kind === 'windows') return d.plans.months(p.months) + ' · ' + d.extras.windows;
  if (p.kind === 'device')  return d.extras.deviceName + ' · ' + d.plans.months(p.months);
  return d.plans.months(p.months);
}

/* The duration meter: fifteen segments, one per month of the longest term,
   lit up to this offer's length. Every offer on the page is measured in
   months, so one drawing compares all eight — and it replaces the portraits
   the tiles used to carry, which said nothing about what was being bought. */
var METER_MAX = 15;
function meter(months){
  var out = '';
  for (var i = 0; i < METER_MAX; i++)
    out += '<i class="' + (i < months ? 'on' : '') + '" style="--i:' + i + '"></i>';
  return '<span class="meter" aria-hidden="true">' + out + '</span>';
}

/* One card on the shelf. Durations and two-screen terms are the same card —
   they differ by a flag, a colour and whether a person or a pair of screens
   stands in the art panel, not by a separate layout. */
function offerCard(p, d) {
  var art  = OFFER_ART[p.id] || {};
  var win  = p.kind === 'windows';
  var flag = p.best ? d.plans.best
           : p.badge === 'popular' ? d.plans.popular
           : win ? d.extras.windows : '';
  var pl = photo(art.player), fc = photo(art.face);
  function img(cls, src, key){
    return src ? '<img class="'+cls+'" src="'+src+'"'+(key ? fit(key) : '')+
      ' alt="" loading="lazy" decoding="async">' : '';
  }
  // On the two-screen cards each figure stands in a screen of its own; on the
  // rest the pair stands together, the footballer forward.
  var stage = art.screens
    ? '<span class="screens">'+
        '<span class="pane a"><span class="scr"></span>'+img('','' + pl)+'<span class="bez"></span></span>'+
        '<span class="pane b"><span class="scr"></span>'+img('','' + fc)+'<span class="bez"></span></span>'+
      '</span>'
    : img('b', fc, art.face) + img('a', pl, art.player);
  return '<article class="oc'+(p.best ? ' top' : '')+(art.screens ? ' win' : '')+
    '" style="--c1:'+art.c1+';--c2:'+art.c2+
    (art.ct ? ';--ct:'+art.ct : '')+'">'+
    '<span class="art" aria-hidden="true"><span class="lit"></span>'+stage+'<span class="fade"></span></span>'+
    (flag ? '<span class="flag keep">'+esc(flag)+'</span>' : '')+
    '<div class="body">'+
      '<h3 class="dur">'+esc(d.plans.months(p.months))+'</h3>'+
      '<p class="per">'+esc(d.plans.perMonth(p.per))+'</p>'+
      meter(p.months)+
      '<div class="amt"><b dir="ltr">'+num(p.price)+'</b><s>MRU</s></div>'+
      '<p class="save">'+(p.savePct > 0 ? esc(d.plans.save(p.savePct)) : '')+'</p>'+
      '<div class="go"><button class="btn btn-full" data-pick="'+p.id+'">'+
        '<span>'+esc(d.plans.add)+'</span></button></div>'+
    '</div></article>';
}

/* The hardware's own section: the product large, then what the offer
   actually includes. The spec rows restate the offer, not the manufacturer's
   datasheet — see the note on `device.specs` in the dictionary. */
function renderDevice(d) {
  var dev = EXTRAS.filter(function(e){ return e.kind === 'device'; })[0];
  if (!dev) return;
  setImg('#devShot', dev.photo);
  $('#devSpecs').innerHTML = d.device.specs.map(function(row){
    return '<div class="spec"><dt>'+esc(row[0])+'</dt><dd>'+esc(row[1])+'</dd></div>'; }).join('');
  $('#devBuy').innerHTML =
    '<span class="amt"><b dir="ltr">'+num(dev.price)+'</b><s>MRU</s></span>'+
    '<button class="btn btn-o btn-lg" data-pick="'+dev.id+'">'+
      '<span>'+esc(d.device.cta)+'</span></button>'+
    '<span class="term">'+esc(d.extras.deviceTerm)+'</span>';
}

/* The shelf drifts on its own so the section is never static, and stops the
   moment anyone reaches for it — pointer, keyboard or touch. It scrolls a
   real scroll container rather than translating a track, so a drag, a swipe
   and the arrow buttons all still work while it is moving. It reverses at
   each end instead of jumping back, so there is never a seam.
   scrollLeft only takes integers, so the sub-pixel step is accumulated. */
function offerDrift() {
  var rail = $('#planRail');
  if (!rail || REDUCED || rail.dataset.drift) return;
  rail.dataset.drift = '1';
  var paused = false, dir = 1, hold = 90, pos = 0, settle = 0;
  ['pointerenter','pointerdown','focusin'].forEach(function(ev){
    rail.addEventListener(ev, function(){ paused = true; }); });
  ['pointerleave','focusout'].forEach(function(ev){
    rail.addEventListener(ev, function(){ paused = false; }); });
  // A manual scroll wins until it stops; without this the drift fights the
  // user's own swipe on a touch screen, where there is no pointerleave.
  rail.addEventListener('scroll', function(){
    if (Math.abs(Math.abs(rail.scrollLeft) - Math.abs(pos)) > 2) settle = 90;
  }, { passive:true });
  (function tick(){
    requestAnimationFrame(tick);
    // While the reader is in charge, follow the rail rather than drive it.
    if (settle > 0) { settle--; pos = rail.scrollLeft; return; }
    if (paused) { pos = rail.scrollLeft; return; }
    var max = rail.scrollWidth - rail.clientWidth;
    if (max < 8) return;
    if (hold > 0) { hold--; return; }
    // Under RTL a scroll container counts scrollLeft down from zero, so the
    // sign of "forward" flips with the document direction.
    var fwd = document.documentElement.dir === 'rtl' ? -1 : 1;
    // The step has to accumulate in `pos`, not be added to `rail.scrollLeft`:
    // the browser rounds the property to whole pixels, so reading it back
    // each frame throws the sub-pixel remainder away and the rail never moves.
    pos += fwd * dir * 0.45;
    if (Math.abs(pos) >= max) { pos = fwd * max; dir = -1; hold = 110; }
    else if (dir === -1 && Math.abs(pos) <= 0) { pos = 0; dir = 1; hold = 110; }
    rail.scrollLeft = pos;
  })();
}

/* Shrinks each typographic poster's wordmark until it fits its tile.
   Measured rather than calculated: the display face may not have loaded, and
   the fallback's metrics are much wider, so any size derived from character
   counts overflows for one of the two. */
function fitWordmarks() {
  $$('.typo .wm').forEach(function (el) {
    var box = el.parentNode;
    var maxW = box.clientWidth * .88, maxH = box.clientHeight * .60;
    if (!maxW) return;
    var size = Math.round(box.clientWidth * .42);
    el.style.fontSize = size + 'px';
    while (size > 11 && (el.scrollWidth > maxW || el.scrollHeight > maxH)) {
      size -= 2;
      el.style.fontSize = size + 'px';
    }
  });
}

/* Splits a figure like "20,000+" or "4K UHD" into a countable number plus
   whatever sits around it. Non-numeric figures come back with to = 0 and are
   printed as-is. */
function figure(text) {
  var m = String(text).match(/^([^\d]*)([\d,.]+)(.*)$/);
  if (!m) return { pre:'', to:0, post:String(text) };
  var n = parseInt(m[2].replace(/[,.]/g,''), 10);
  return isNaN(n) ? { pre:'', to:0, post:String(text) } : { pre:m[1], to:n, post:m[3] };
}

function setImg(sel, key) {
  var el = $(sel), src = photo(key);
  if (!el) return;
  if (src) { el.src = src; el.style.display = ''; } else { el.style.display = 'none'; }
}

/* Categories with real photography use it. The rest become typographic
   posters — the category name set large and cropped by the frame — rather
   than a drawn icon on a coloured rectangle, which is the one thing on the
   page that still read as filler. */
function catCard(c, i) {
  var x = c[lang], shot = photo(c.photo);
  var art = shot
    ? '<div class="artimg'+(c.logo ? ' logo' : '')+'">'+
      '<img src="'+shot+'" alt="" loading="lazy" decoding="async"><span class="vig"></span></div>'
    : '<div class="typo'+(i % 3 === 1 ? ' alt' : '')+'">'+
        '<span class="wm keep" aria-hidden="true">'+esc(c.fr[0])+'</span>'+
        '<span class="vig"></span></div>';
  // Tapping a genre opens the order sheet — every plan unlocks every genre,
  // so the sheet just names which one brought you there.
  // Two tiles run double width so the mosaic has a rhythm; football and live
  // channels are the two the brand is bought for, so they get the width.
  var big = (c.art === 'football' || c.art === 'live') ? ' big' : '';
  return '<button type="button" class="cat'+big+'" data-cat="'+esc(x[0])+'">'+
    '<div class="fr">'+art+
    '<div class="meta"><h3>'+esc(x[0])+'</h3><p class="c">'+esc(x[1])+'</p></div></div></button>';
}

/* Two rows of key art crossing behind the closing call to action. Each row is
   duplicated so the -50% translate loops seamlessly. */
function renderDrift(){
  var box = $('#drift'); if (!box) return;
  var art = DRIFT.map(photo).filter(Boolean);
  if (art.length < 6){ box.innerHTML = ''; return; }
  var half = Math.ceil(art.length / 2);
  function row(list, cls){
    var twice = list.concat(list);
    return '<div class="pdRow'+cls+'">' + twice.map(function(src){
      return '<img src="'+src+'" alt="" loading="lazy" decoding="async">'; }).join('') + '</div>';
  }
  box.innerHTML = row(art.slice(0, half), '') + row(art.slice(half), ' b');
}

/* The hero backdrop: three raked rows of key art at poster size. Each row is
   laid down twice so the -50% translate closes on itself and the motion runs
   without a seam, and each starts at a different offset into the pool so the
   rows never line up into a visible grid. */
function renderWall(){
  var box = $('#heroWall'); if (!box) return;
  var art = WALL.map(photo).filter(Boolean);
  if (art.length < 6){ box.innerHTML = ''; return; }
  var out = '';
  for (var r = 0; r < 3; r++){
    var offset = Math.floor(art.length / 3) * r;
    var list = art.slice(offset).concat(art.slice(0, offset));
    out += '<div class="r">' + list.concat(list).map(function(src){
      return '<img src="'+src+'" alt="" decoding="async">'; }).join('') + '</div>';
  }
  box.innerHTML = out;
}

/* ---------------- Order sheet ----------------
   Step one lists the plans, step two takes the details. */
function renderPicker(d){
  $('#pickList').innerHTML = PLANS.concat(EXTRAS).map(function(p){
    var bits = [d.plans.perMonth(p.per)];
    if (p.badge === 'popular') bits.push('<em>' + esc(d.plans.popular) + '</em>');
    if (p.savePct > 0) bits.push(esc(d.plans.save(p.savePct)));
    return '<button type="button" class="pk'+(p.best?' best':'')+'" data-pick="'+p.id+'">'+
      '<span><span class="nm">'+esc(planLabel(p,d))+
        (p.best ? ' · ' + esc(d.plans.best) : '')+'</span>'+
        '<span class="sub">'+bits.join(' · ')+'</span></span>'+
      '<span class="amt" dir="ltr">'+num(p.price)+'<s>MRU</s></span>'+
      '<span class="go" aria-hidden="true">'+
        '<svg viewBox="0 0 16 16" width="14" height="14" fill="none">'+
        '<path d="M6 3.5 10.5 8 6 12.5" stroke="currentColor" stroke-width="1.8" '+
        'stroke-linecap="round" stroke-linejoin="round"/></svg></span>'+
      '</button>';
  }).join('');
}

function renderChosen(){
  var d = t(), p = find(chosen);
  if (!p) return;
  $('#chosenBox').innerHTML =
    '<span class="cbody"><b>'+esc(planLabel(p,d))+'</b>'+
    '<span>'+esc(d.plans.perMonth(p.per))+
      (p.savePct>0 ? ' · '+esc(d.plans.save(p.savePct)) : '')+'</span></span>'+
    '<span class="cnum" dir="ltr">'+num(p.price)+'<s>MRU</s></span>';
}

/* The device chips and the four payment services. Re-run on a language
   switch, so the current selections are re-applied rather than lost. */
function renderCheckout(d){
  // A closed control that opens on tap, not seven chips laid out at once.
  var btn = $('#deviceBtn');
  btn.classList.toggle('ph', !chosenDevice);
  $('#deviceLabel').textContent = chosenDevice ? d.devices[chosenDevice] : d.checkout.devicePick;
  $('#deviceList').innerHTML = DEVICES.map(function(k){
    return '<button type="button" role="option" aria-selected="'+(chosenDevice===k)+
      '" class="'+(chosenDevice===k?'on':'')+'" data-device="'+k+'">'+
      esc(d.devices[k])+'</button>'; }).join('');
  $('#payGrid').innerHTML = PAY.map(function(m){
    var logo = photo(m.logo);
    return '<button type="button" class="payBtn'+(chosenPay===m.id?' on':'')+
      '" role="radio" aria-checked="'+(chosenPay===m.id)+'" data-pay="'+m.id+'"'+
      ' aria-label="'+esc(d.payNames[m.id])+'" style="--pc:'+m.bg+';--pf:'+m.fg+'">'+
      (logo ? '<img src="'+logo+'" alt="'+esc(d.payNames[m.id])+'" loading="lazy" decoding="async">'
            : '<span style="color:#0a1020;font-weight:800">'+esc(d.payNames[m.id])+'</span>')+
      '</button>'; }).join('');
  renderPayBox(d);
  renderProof(d);
}

/* The number, in the chosen service's colours. Hidden until one is chosen. */
function renderPayBox(d){
  var box = $('#payBox'), m = payMethod();
  if (!m){ box.hidden = true; box.innerHTML = ''; return; }
  var p = find(chosen);
  box.hidden = false;
  box.setAttribute('style', '--pc:' + m.bg + ';--pf:' + m.fg);
  box.innerHTML =
    '<div class="cap">'+esc(d.checkout.payTo)+' — '+esc(d.payNames[m.id])+'</div>'+
    '<div class="row"><span class="no" dir="ltr">'+WA_DISPLAY+'</span>'+
      '<button type="button" class="copy" id="payCopy">'+esc(d.checkout.copy)+'</button></div>'+
    (p ? '<div class="amt"><span>'+esc(d.checkout.payAmount)+'</span>'+
         '<b dir="ltr">'+money(p.price)+'</b></div>' : '')+
    '<div class="note">'+esc(d.checkout.payNote)+'</div>';
}

var proofUrl = null;
function proofPreview(){
  if (proofUrl) URL.revokeObjectURL(proofUrl);
  proofUrl = proofFile ? URL.createObjectURL(proofFile) : null;
  return proofUrl;
}
function renderProof(d){
  var face = $('#proofFace');
  if (!proofFile){ face.innerHTML = esc(d.checkout.proofPick); return; }
  face.innerHTML = '<span class="ok"><img src="'+proofPreview()+'" alt="">'+
    '<span>'+esc(proofFile.name)+'<small>'+esc(d.checkout.proofChange)+'</small></span></span>';
}

function closeDeviceList(){
  var sel = $('#deviceSel'); if (!sel) return;
  sel.classList.remove('open');
  $('#deviceBtn').setAttribute('aria-expanded','false');
  $('#deviceList').hidden = true;
}

function payMethod(){
  for (var i=0;i<PAY.length;i++) if (PAY[i].id === chosenPay) return PAY[i];
  return null;
}

function orderMessage(){
  var d=t(), m=d.checkout.msg, p=find(chosen);
  var name=$('#cName').value.trim(), phone=$('#cPhone').value.trim(), notes=$('#cNotes').value.trim();
  var out=[m.greeting,'',m.intro,'',m.name+': '+(name||'—'),m.phone+': '+(phone||'—')];
  if (chosenDevice) out.push(m.device+': '+d.devices[chosenDevice]);
  out.push('', m.plan+': '+planLabel(p,d), m.total+': '+money(p.price));
  if (chosenPay) out.push('', m.payMethod+': '+d.payNames[chosenPay],
                              m.payNum+': '+WA_DISPLAY);
  if (notes) out.push('', m.notes+': '+notes);
  if (orderRef) out.push('', m.ref+': '+orderRef, m.filed);
  else if (proofFile) out.push('', m.proof);
  out.push('', m.closing);
  return out.join('\n');
}

/* ---------------- Behaviour ---------------- */
function reveal(){
  var els = $$('.rev:not(.in)');
  if (!('IntersectionObserver' in window) || REDUCED){ els.forEach(function(e){e.classList.add('in');}); return; }
  var io = new IntersectionObserver(function(ents){
    ents.forEach(function(e,i){
      if (!e.isIntersecting) return;
      var el=e.target; setTimeout(function(){ el.classList.add('in'); }, Math.min(i,6)*70);
      io.unobserve(el);
    });
  },{threshold:.01, rootMargin:'0px 0px -40px 0px'});
  els.forEach(function(e){ io.observe(e); });

  // A flick-scroll can carry a section past the viewport without the observer
  // ever getting a frame on it, which would leave it stuck at opacity 0. Sweep
  // on scroll-end and reveal anything that is in view or already behind us.
  var timer;
  function sweep(){
    var rest = els.filter(function(e){ return !e.classList.contains('in'); });
    rest.forEach(function(e){
      if (e.getBoundingClientRect().top < window.innerHeight - 40){
        e.classList.add('in'); io.unobserve(e);
      }
    });
    if (!rest.length) window.removeEventListener('scroll', onScroll);
  }
  function onScroll(){ clearTimeout(timer); timer = setTimeout(sweep, 180); }
  window.addEventListener('scroll', onScroll, {passive:true});
}
/* Figures count up the first time they come into view. */
function counters(){
  var els = $$('.figRow .n[data-count]');
  if (REDUCED || !('IntersectionObserver' in window)){
    els.forEach(function(el){ paint(el, +el.dataset.count); });
    return;
  }
  var io = new IntersectionObserver(function(ents){
    ents.forEach(function(e){
      if (!e.isIntersecting) return;
      var el = e.target, to = +el.dataset.count;
      io.unobserve(el);
      if (!to){ return; }
      var t0 = performance.now(), DUR = 1100;
      (function step(now){
        var k = Math.min(1, (now - t0) / DUR);
        // ease-out so it settles rather than stopping dead
        paint(el, Math.round(to * (1 - Math.pow(1 - k, 3))));
        if (k < 1) requestAnimationFrame(step);
      })(t0);
    });
  }, {threshold:.4});
  els.forEach(function(el){ if (+el.dataset.count) io.observe(el); });
}
function paint(el, v){ el.textContent = el.dataset.pre + num(v) + el.dataset.post; }

/* Slow parallax on the hero: the wall sinks a little faster than the page, so
   the type lifts off it as the section leaves. The wall carries its rake in
   the transform, so the scroll offset is composed onto it, not substituted. */
var pWall, pTick = false;
function parallax(y){
  if (REDUCED || pTick) return;
  pTick = true;
  requestAnimationFrame(function(){
    pTick = false;
    if (pWall === undefined) pWall = $('#heroWall');
    if (!pWall || y > window.innerHeight * 1.2) return;
    pWall.style.transform = 'rotate(-9deg) translate3d(0,' + (y * 0.13) + 'px,0)';
  });
}

function accordions(){
  $$('.acc').forEach(function(acc){
    var panel=$('.panel',acc);
    if (acc.classList.contains('on')) panel.style.maxHeight = panel.scrollHeight+'px';
    $('button',acc).addEventListener('click', function(){
      var open = acc.classList.contains('on');
      $$('.acc').forEach(function(o){ o.classList.remove('on'); $('.panel',o).style.maxHeight='0px';
        $('button',o).setAttribute('aria-expanded','false'); });
      if (!open){ acc.classList.add('on'); panel.style.maxHeight = panel.scrollHeight+'px';
        this.setAttribute('aria-expanded','true'); }
    });
  });
}
function railArrows(){
  $$('.railwrap').forEach(function(wrap){
    if (wrap.dataset.armed) return; wrap.dataset.armed='1';
    var rail = $('.rail', wrap);
    ['prev','next'].forEach(function(dir){
      var b=document.createElement('button');
      b.type='button'; b.className='railbtn '+dir;
      b.setAttribute('aria-label', dir==='next'?'Next':'Previous');
      b.innerHTML='<svg viewBox="0 0 16 16" width="17" height="17" fill="none" aria-hidden><path d="'+
        (dir==='next'?'M6 3.5 10.5 8 6 12.5':'M10 3.5 5.5 8 10 12.5')+
        '" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      b.addEventListener('click', function(){
        var rtl = document.documentElement.dir === 'rtl';
        var step = Math.max(280, rail.clientWidth*.8) * (rtl?-1:1);
        rail.scrollBy({left:(dir==='next'?1:-1)*step, behavior:'smooth'});
      });
      wrap.appendChild(b);
    });
    function sync(){
      var off = Math.abs(rail.scrollLeft);
      $('.railbtn.prev',wrap).classList.toggle('off', off<=4);
      $('.railbtn.next',wrap).classList.toggle('off', off+rail.clientWidth >= rail.scrollWidth-4);
    }
    rail.addEventListener('scroll', sync, {passive:true});
    window.addEventListener('resize', sync);
    sync();
  });
}
function preloader(){
  var seen=true;
  try { seen = sessionStorage.getItem('moortv.intro')==='1'; } catch(e){ seen=false; }
  if (seen || REDUCED) return;
  var logo = $('.brand img').getAttribute('src');
  var el=document.createElement('div'); el.id='pre'; el.setAttribute('aria-hidden','true');
  el.innerHTML = '<img src="'+logo+'" alt=""><p class="w keep">MOOR<i>TV</i></p><div class="bar"><i></i></div>';
  document.body.appendChild(el);
  document.body.style.overflow='hidden';
  var bar=$('.bar i',el), t0=performance.now(), DUR=1300;
  (function step(now){
    var k=Math.min(1,(now-t0)/DUR);
    bar.style.width=(k*100)+'%';
    if (k<1){ requestAnimationFrame(step); return; }
    try{ sessionStorage.setItem('moortv.intro','1'); }catch(e){}
    el.style.opacity='0'; el.style.transform='scale(1.04)';
    document.body.style.overflow='';
    setTimeout(function(){ el.remove(); }, 650);
  })(t0);
}

/* ---------------- Wiring ---------------- */
function step(which){
  $('#stepPick').classList.toggle('on', which === 'pick');
  $('#stepForm').classList.toggle('on', which === 'form');
  $('#stepSent').classList.toggle('on', which === 'sent');
  var sh = $('#modal .sheet'); if (sh) sh.scrollTop = 0;
}
function openSheet(planId, catName){
  var forCat = $('#forCat');
  if (catName){
    forCat.textContent = t().pick.forCat(catName);
    forCat.style.display = '';
  } else {
    forCat.style.display = 'none';
  }
  if (planId && find(planId)){ chosen = planId; renderChosen(); step('form'); }
  else { step('pick'); }
  $('#modal').classList.add('on');
  document.body.style.overflow = 'hidden';
  setTimeout(function(){ (planId ? $('#cName') : $('.pk')).focus(); }, 90);
}
function closeSheet(){
  // Closing from the last step ends that order: the next one must not inherit
  // the previous customer's payment screenshot.
  if ($('#stepSent').classList.contains('on')){
    proofFile = null; $('#cProof').value = ''; $('#sendProofNote').hidden = true;
    renderProof(t());
  }
  $('#modal').classList.remove('on');
  document.body.style.overflow = '';
}

document.addEventListener('click', function(e){
  var el;
  if ((el = e.target.closest('[data-pick]'))){
    chosen = el.getAttribute('data-pick');
    renderChosen(); step('form');
    if (!$('#modal').classList.contains('on')) openSheet(chosen);
    else setTimeout(function(){ $('#cName').focus(); }, 60);
    return;
  }
  if ((el = e.target.closest('[data-cat]'))){ openSheet(null, el.getAttribute('data-cat')); return; }
  if (e.target.closest('[data-open-plans]')){ openSheet(null); return; }
  if (e.target.closest('[data-close-modal]')){ closeSheet(); return; }
  if (e.target.closest('[data-close]')){ $('#menu').classList.remove('on'); document.body.style.overflow='';
    document.querySelector('header').classList.remove('menu-open');
    $('#burger').setAttribute('aria-expanded','false'); }
});
$('#moBack').addEventListener('click', function(){ step('pick'); });

if (!REDUCED) document.addEventListener('pointerdown', function(e){
  var btn=e.target.closest('.btn'); if(!btn) return;
  var r=btn.getBoundingClientRect(), sp=document.createElement('span');
  sp.className='rip'; sp.style.left=(e.clientX-r.left)+'px'; sp.style.top=(e.clientY-r.top)+'px';
  btn.appendChild(sp); setTimeout(function(){ sp.remove(); },600);
});
$('#burger').addEventListener('click', function(){
  var m=$('#menu'), on=m.classList.toggle('on');
  document.body.style.overflow = on?'hidden':'';
  document.querySelector('header').classList.toggle('menu-open', on);
  this.setAttribute('aria-expanded', on?'true':'false');
});
document.addEventListener('keydown', function(e){
  if (e.key!=='Escape') return;
  closeSheet();
  $('#menu').classList.remove('on'); document.querySelector('header').classList.remove('menu-open');
  document.body.style.overflow=''; $('#burger').setAttribute('aria-expanded','false');
});
$('#lang').addEventListener('click', function(){
  lang = lang==='ar' ? 'fr' : 'ar';
  try{ localStorage.setItem('moortv.lang', lang); }catch(e){}
  render();
  if (chosen) renderChosen();
});
/* Device and payment selection, and the copy button inside the number panel.
   Delegated, because renderCheckout() replaces this markup on a language
   switch and directly bound handlers would go with it. */
document.addEventListener('click', function(e){
  var el;
  if ((el = e.target.closest('[data-device]'))){
    chosenDevice = el.getAttribute('data-device');
    $('#fDevice').classList.remove('bad');
    renderCheckout(t());
    closeDeviceList();
    return;
  }
  if (e.target.closest('#deviceBtn')){
    var sel = $('#deviceSel');
    if (sel.classList.contains('open')) closeDeviceList();
    else {
      sel.classList.add('open');
      $('#deviceBtn').setAttribute('aria-expanded','true');
      $('#deviceList').hidden = false;
      // The sheet scrolls, so a list opened near its foot would fall out of view.
      setTimeout(function(){
        $('#deviceList').scrollIntoView({ block:'nearest', behavior:'smooth' }); }, 40);
    }
    return;
  }
  // Any click that is not on the control closes it.
  if (!e.target.closest('#deviceSel')) closeDeviceList();
  if ((el = e.target.closest('[data-pay]'))){
    chosenPay = el.getAttribute('data-pay');
    $('#fPay').classList.remove('bad');
    renderCheckout(t());
    return;
  }
  if (e.target.closest('#payCopy')){
    var btn = $('#payCopy'), d = t();
    var write = navigator.clipboard && navigator.clipboard.writeText
      ? navigator.clipboard.writeText(WA_E164.replace(/^222/, ''))
      : Promise.reject();
    write.then(function(){ btn.textContent = d.checkout.copied; })
         .catch(function(){ btn.textContent = d.checkout.copied; })
         .then(function(){ setTimeout(function(){
           if ($('#payCopy')) $('#payCopy').textContent = d.checkout.copy; }, 1600); });
  }
});

$('#cProof').addEventListener('change', function(){
  proofFile = this.files && this.files[0] ? this.files[0] : null;
  $('#fProof').classList.remove('bad');
  renderProof(t());
});

$('#coForm').addEventListener('submit', function(e){
  e.preventDefault();
  if (!find(chosen)) { step('pick'); return; }
  var ok = true, first = null;
  function mark(sel, bad){
    $(sel).classList.toggle('bad', bad);
    if (bad){ ok = false; if (!first) first = $(sel); }
  }
  mark('#fName', $('#cName').value.trim().length < 2);
  mark('#fPhone', $('#cPhone').value.replace(/\D/g,'').length < 8);
  mark('#fDevice', !chosenDevice);
  mark('#fPay', !chosenPay);
  mark('#fProof', !proofFile);
  if (!ok){ if (first) first.scrollIntoView({ block:'center', behavior:'smooth' }); return; }
  sendOrder();
});
['cName','cPhone'].forEach(function(id){
  $('#'+id).addEventListener('input', function(){ this.closest('.field').classList.remove('bad'); });
});

/* Downscale before upload. A phone screenshot is 2–5 MB, which is a slow
   upload on mobile data and over the function's body limit once base64'd;
   1400px of a bank receipt is still perfectly readable. */
function shrink(file, cb){
  if (!file || !/^image\//.test(file.type) || !window.FileReader) return cb(null);
  var img = new Image(), url = URL.createObjectURL(file);
  img.onload = function(){
    try {
      var max = 1400, w = img.width, h = img.height;
      var k = Math.min(1, max / Math.max(w, h));
      var c = document.createElement('canvas');
      c.width = Math.round(w * k); c.height = Math.round(h * k);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      cb(c.toDataURL('image/jpeg', 0.82));
    } catch (e) { URL.revokeObjectURL(url); cb(null); }
  };
  img.onerror = function(){ URL.revokeObjectURL(url); cb(null); };
  img.src = url;
}

/* The order is filed first, then WhatsApp is opened with the reference in it.
   If the site is running somewhere without the API behind it — the preview
   build, the single-file copy, any static host — the POST fails and the flow
   falls back to what it did before: details over WhatsApp, screenshot by
   hand. Nothing is lost, it is just more work for the merchant. */
var orderRef = null;
function sendOrder(){
  var btn = $('#coForm button[type=submit]');
  btn.disabled = true;
  shrink(proofFile, function(dataUrl){
    var d = t(), p = find(chosen);
    var payload = {
      name: $('#cName').value.trim(), phone: $('#cPhone').value.trim(),
      device: chosenDevice ? T.ar.devices[chosenDevice] : '',
      plan: planLabel(p, T.ar), months: p.months, price: p.price,
      pay: chosenPay || '', notes: $('#cNotes').value.trim(),
      lang: lang, proof: dataUrl || ''
    };
    var done = function(ref){
      orderRef = ref || null;
      btn.disabled = false;
      $('#sentArt').innerHTML = proofFile
        ? '<img src="'+proofPreview()+'" alt=""><span>'+esc(proofFile.name)+'</span>'
        : '';
      $('#sentArt').hidden = !proofFile;
      // Filed successfully: the screenshot is already with the merchant, so
      // the second share step would only duplicate it.
      var filed = !!ref;
      $('#sendProof').hidden = filed;
      $('#sentBody').textContent = filed ? d.checkout.filedBody : d.checkout.sentBody;
      $('#sentRef').textContent = filed ? d.checkout.ref + ' ' + ref : '';
      $('#sentRef').hidden = !filed;
      window.open(wa(orderMessage()), '_blank', 'noopener');
      step('sent');
    };
    fetch('/api/order', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    }).then(function(r){ return r.ok ? r.json() : null; })
      .then(function(j){ done(j && j.ok ? j.ref : null); })
      .catch(function(){ done(null); });
  });
}

$('#sendProof').addEventListener('click', function(){
  var d = t(), note = $('#sendProofNote');
  if (!proofFile) return;
  if (navigator.canShare && navigator.canShare({ files:[proofFile] })){
    navigator.share({ files:[proofFile], text: orderMessage() })
      .then(function(){ closeSheet(); })
      .catch(function(err){ if (!err || err.name !== 'AbortError') note.hidden = false; });
  } else {
    // Desktop, mostly: nothing can hand a file to WhatsApp from a web page.
    note.hidden = false;
  }
});
$('#reopenWa').addEventListener('click', function(){
  window.open(wa(orderMessage()), '_blank', 'noopener');
});

var fitTimer;
window.addEventListener('resize', function(){
  clearTimeout(fitTimer); fitTimer = setTimeout(fitWordmarks, 150);
});

var headerEl = document.querySelector('header');
window.addEventListener('scroll', function(){
  var y = window.pageYOffset;
  // White bar only once the header has left the dark hero; over the hero it
  // stays transparent with white type.
  var hero = $('#hero');
  headerEl.classList.toggle('stuck', y > (hero ? hero.offsetHeight - 70 : 16));
  $('#fab').classList.toggle('on', y>560);
  var max = document.documentElement.scrollHeight - window.innerHeight;
  $('#prog').style.transform = 'scaleX(' + (max>0 ? y/max : 0) + ')';
  parallax(y);
}, {passive:true});

render();
preloader();
})();
