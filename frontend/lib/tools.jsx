import { Lock, Search, Globe, Brain, Keyboard, Archive, FileText, KeyRound, ScrollText } from "lucide-react"

// Tool data with detailed information for subpages
const tools = [
  {
    id: "encrypt",
    slug: "encrypt-integrity",
    title: "Encrypt and check integrity",
    description: "Secure your data with encryption and verify its integrity",
    color: "from-cyan-500/20 to-blue-500/20",
    gradientColor: "from-cyan-500/30 to-blue-500/30",
    icon: <Lock className="h-10 w-10 text-cyan-400" />,
    fullDescription:
      "Narzędzie do szyfrowania i weryfikacji integralności danych pozwala na bezpieczne zabezpieczenie informacji przed nieautoryzowanym dostępem. Wykorzystuje zaawansowane algorytmy kryptograficzne do szyfrowania plików i wiadomości, a także umożliwia weryfikację, czy dane nie zostały zmodyfikowane podczas przesyłania lub przechowywania.",
    features: [
      "Szyfrowanie symetryczne i asymetryczne",
      "Generowanie i zarządzanie kluczami",
      "Tworzenie i weryfikacja sum kontrolnych",
      "Wsparcie dla popularnych algorytmów (AES, RSA, SHA)",
      "Szyfrowanie plików i tekstu",
    ],
    useCases: [
      "Zabezpieczanie poufnych dokumentów",
      "Bezpieczne przesyłanie danych przez niezabezpieczone kanały",
      "Weryfikacja integralności pobranych plików",
      "Ochrona danych osobowych i wrażliwych informacji",
    ],
    isDownloadOnly: false,
  },
  {
    id: "hash",
    slug: "hash-compare",
    title: "Hash and compare",
    description: "Generate and compare hash values for files and text",
    color: "from-violet-500/20 to-purple-500/20",
    gradientColor: "from-violet-500/30 to-purple-500/30",
    icon: <Search className="h-10 w-10 text-violet-400" />,
    fullDescription:
      "Narzędzie do generowania i porównywania wartości skrótów (hash) umożliwia tworzenie unikalnych cyfrowych odcisków palców dla plików i tekstu. Pozwala na szybką weryfikację, czy dwa pliki są identyczne lub czy dane nie zostały zmienione, bez konieczności porównywania całej zawartości.",
    features: [
      "Obsługa popularnych algorytmów haszujących (MD5, SHA-1, SHA-256, SHA-512)",
      "Generowanie skrótów dla plików dowolnej wielkości",
      "Porównywanie skrótów z wartościami referencyjnymi",
      "Wykrywanie nawet najmniejszych zmian w danych",
      "Wsadowe przetwarzanie wielu plików",
    ],
    useCases: [
      "Weryfikacja integralności pobranych plików",
      "Wykrywanie duplikatów plików",
      "Bezpieczne przechowywanie haseł w bazach danych",
      "Tworzenie cyfrowych podpisów",
    ],
    isDownloadOnly: false,
  },
  {
    id: "port-scanner",
    slug: "port-scanner",
    title: "Port Scanner",
    description: "Scan network ports to identify open services and potential vulnerabilities",
    color: "from-blue-500/20 to-indigo-500/20",
    gradientColor: "from-blue-500/30 to-indigo-500/30",
    icon: <Globe className="h-10 w-10 text-blue-400" />,
    fullDescription:
      "Skaner portów to narzędzie sieciowe służące do analizy otwartych portów na serwerach i urządzeniach sieciowych. Pozwala na identyfikację działających usług, potencjalnych luk w zabezpieczeniach oraz pomaga w audycie bezpieczeństwa sieci poprzez mapowanie dostępnych punktów wejścia do systemu.",
    features: [
      "Skanowanie pojedynczych hostów lub całych zakresów IP",
      "Wykrywanie otwartych, zamkniętych i filtrowanych portów",
      "Identyfikacja usług działających na portach",
      "Różne metody skanowania (SYN, TCP, UDP)",
      "Wykrywanie wersji usług i systemów operacyjnych",
    ],
    useCases: [
      "Audyt bezpieczeństwa sieci",
      "Wykrywanie nieautoryzowanych usług w sieci",
      "Testowanie konfiguracji firewalla",
      "Inwentaryzacja zasobów sieciowych",
    ],
    isDownloadOnly: false,
  },
  {
    id: "classic-encryption",
    slug: "classic-encryption",
    title: "Classic Encryption",
    description: "Implement traditional encryption algorithms like Caesar cipher and Vigenère",
    color: "from-fuchsia-500/20 to-purple-500/20",
    gradientColor: "from-fuchsia-500/30 to-purple-500/30",
    icon: <Brain className="h-10 w-10 text-fuchsia-400" />,
    fullDescription:
      "Narzędzie do klasycznego szyfrowania implementuje historyczne i tradycyjne algorytmy kryptograficzne, które stanowiły podstawę rozwoju nowoczesnej kryptografii. Choć nie są one wystarczająco bezpieczne dla krytycznych zastosowań współczesnych, stanowią doskonałe wprowadzenie do zasad szyfrowania i są wartościowe z edukacyjnego punktu widzenia.",
    features: [
      "Szyfr Cezara z regulowanym przesunięciem",
      "Szyfr Vigenère'a z kluczem tekstowym",
      "Szyfr podstawieniowy (substytucyjny)",
      "Szyfr przestawieniowy (transpozycyjny)",
      "Wizualizacja procesu szyfrowania",
    ],
    useCases: [
      "Edukacja w zakresie podstaw kryptografii",
      "Proste zabezpieczanie wiadomości przed przypadkowym odczytem",
      "Tworzenie zagadek i łamigłówek",
      "Zrozumienie historycznego rozwoju szyfrowania",
    ],
    isDownloadOnly: false,
  },
  {
    id: "keylogger",
    slug: "keylogger-demo",
    title: "Keylogger (demo)",
    description: "Educational demonstration of keylogging techniques for security awareness",
    color: "from-purple-500/20 to-violet-500/20",
    gradientColor: "from-purple-500/30 to-violet-500/30",
    icon: <Keyboard className="h-10 w-10 text-purple-400" />,
    fullDescription:
      "Demonstracyjny keylogger to narzędzie edukacyjne pokazujące, jak działają programy rejestrujące naciśnięcia klawiszy. Służy wyłącznie do celów edukacyjnych i zwiększania świadomości na temat zagrożeń bezpieczeństwa. Pozwala zrozumieć, jak złośliwe oprogramowanie może przechwytywać dane wprowadzane przez użytkownika, co pomaga w opracowywaniu skutecznych metod ochrony.",
    features: [
      "Rejestracja naciśnięć klawiszy w czasie rzeczywistym",
      "Zapisywanie zarejestrowanych danych do pliku",
      "Demonstracja technik ukrywania działania",
      "Wyświetlanie statystyk wprowadzanych danych",
      "Opcje konfiguracyjne do celów edukacyjnych",
    ],
    useCases: [
      "Edukacja w zakresie bezpieczeństwa komputerowego",
      "Demonstracja zagrożeń związanych z złośliwym oprogramowaniem",
      "Szkolenia świadomości bezpieczeństwa dla pracowników",
      "Testowanie skuteczności rozwiązań antywirusowych",
    ],
    isDownloadOnly: true,
  },
  {
    id: "brute-force",
    slug: "brute-force-zip",
    title: "Brute-force ZIP",
    description: "Recover passwords from protected ZIP archives using brute force methods",
    color: "from-indigo-500/20 to-blue-500/20",
    gradientColor: "from-indigo-500/30 to-blue-500/30",
    icon: <Archive className="h-10 w-10 text-indigo-400" />,
    fullDescription:
      "Narzędzie do odzyskiwania haseł archiwów ZIP metodą brute-force umożliwia odzyskanie dostępu do zabezpieczonych archiwów, których hasło zostało zapomniane. Wykorzystuje różne techniki, w tym ataki słownikowe i próby wszystkich możliwych kombinacji znaków, aby odnaleźć prawidłowe hasło zabezpieczające archiwum.",
    features: [
      "Ataki słownikowe z wykorzystaniem popularnych list haseł",
      "Brute-force z konfigurowalnymi zestawami znaków",
      "Optymalizacja wydajności poprzez wykorzystanie wielu wątków",
      "Możliwość wznowienia przerwanego procesu odzyskiwania",
      "Wsparcie dla różnych formatów archiwów (ZIP, RAR, 7z)",
    ],
    useCases: [
      "Odzyskiwanie dostępu do własnych, zapomnianych archiwów",
      "Testowanie siły haseł używanych do zabezpieczania danych",
      "Audyt bezpieczeństwa procedur archiwizacji w organizacji",
      "Edukacja w zakresie bezpieczeństwa haseł",
    ],
    isDownloadOnly: false,
  },
  {
    id: "http-header",
    slug: "http-header-analyzer",
    title: "HTTP Header Analyzer",
    description: "Analyze HTTP headers to identify security issues and misconfigurations",
    color: "from-blue-500/20 to-cyan-500/20",
    gradientColor: "from-blue-500/30 to-cyan-500/30",
    icon: <FileText className="h-10 w-10 text-blue-400" />,
    fullDescription:
      "Analizator nagłówków HTTP to narzędzie do badania i oceny nagłówków odpowiedzi serwerów internetowych. Pozwala na identyfikację potencjalnych problemów z bezpieczeństwem, błędnych konfiguracji oraz brakujących zabezpieczeń. Narzędzie pomaga webmasterom i specjalistom ds. bezpieczeństwa w poprawie konfiguracji serwerów i aplikacji webowych.",
    features: [
      "Analiza nagłówków bezpieczeństwa (HSTS, CSP, X-XSS-Protection)",
      "Wykrywanie ujawniania informacji o serwerze i technologiach",
      "Sprawdzanie poprawności implementacji nagłówków CORS",
      "Sugestie poprawy konfiguracji bezpieczeństwa",
      "Porównywanie z najlepszymi praktykami branżowymi",
    ],
    useCases: [
      "Audyt bezpieczeństwa aplikacji webowych",
      "Identyfikacja luk w konfiguracji serwerów",
      "Weryfikacja zgodności z politykami bezpieczeństwa",
      "Optymalizacja wydajności poprzez analizę nagłówków cache",
    ],
    isDownloadOnly: false,
  },
  {
    id: "password-generator",
    slug: "password-generator",
    title: "Password Generator & Evaluation",
    description: "Create strong passwords and evaluate password strength",
    color: "from-violet-500/20 to-fuchsia-500/20",
    gradientColor: "from-violet-500/30 to-fuchsia-500/30",
    icon: <KeyRound className="h-10 w-10 text-violet-400" />,
    fullDescription:
      "Generator i ewaluator haseł to narzędzie do tworzenia silnych, unikalnych haseł oraz oceny bezpieczeństwa istniejących haseł. Pomaga użytkownikom w tworzeniu trudnych do złamania kombinacji znaków, a także w zrozumieniu, dlaczego niektóre hasła są bezpieczniejsze od innych poprzez szczegółową analizę ich siły.",
    features: [
      "Generowanie losowych haseł o konfigurowalnej długości i złożoności",
      "Ocena siły hasła w czasie rzeczywistym",
      "Wykrywanie popularnych wzorców i słabości w hasłach",
      "Sugestie poprawy bezpieczeństwa istniejących haseł",
      "Tworzenie łatwych do zapamiętania, ale bezpiecznych fraz hasłowych",
    ],
    useCases: [
      "Tworzenie bezpiecznych haseł do kont online",
      "Edukacja użytkowników w zakresie bezpieczeństwa haseł",
      "Weryfikacja zgodności haseł z politykami bezpieczeństwa",
      "Audyt bezpieczeństwa istniejących haseł",
    ],
    isDownloadOnly: false,
  },
  {
    id: "tool-logs",
    slug: "tool-logs",
    title: "Tool Logs",
    description: "View logs and activity history from all security tools",
    color: "from-cyan-500/20 to-indigo-500/20",
    gradientColor: "from-cyan-500/30 to-indigo-500/30",
    icon: <ScrollText className="h-10 w-10 text-cyan-400" />,
    fullDescription:
      "Narzędzie do przeglądania logów i historii aktywności zbiera, analizuje i prezentuje dane z wszystkich narzędzi bezpieczeństwa w jednym miejscu. Umożliwia śledzenie działań, wykrywanie anomalii oraz prowadzenie dochodzeń w przypadku incydentów bezpieczeństwa poprzez scentralizowany system zarządzania logami.",
    features: [
      "Centralne gromadzenie logów ze wszystkich narzędzi",
      "Zaawansowane filtrowanie i wyszukiwanie w logach",
      "Wizualizacja aktywności i trendów",
      "Alerty o nietypowych wzorcach i potencjalnych zagrożeniach",
      "Eksport danych do różnych formatów (CSV, JSON, PDF)",
    ],
    useCases: [
      "Monitorowanie aktywności w systemach bezpieczeństwa",
      "Dochodzenia po incydentach bezpieczeństwa",
      "Audyt zgodności z politykami bezpieczeństwa",
      "Analiza trendów i wzorców w danych bezpieczeństwa",
    ],
    isDownloadOnly: false,
  },
]

// Get all tool slugs for static generation
export function getAllToolSlugs() {
  return tools.map((tool) => tool.slug)
}

// Get tool data by slug
export function getToolBySlug(slug) {
  return tools.find((tool) => tool.slug === slug)
}

// Get all tools for the main page
export function getAllTools() {
  return tools.map(({ id, title, description, color, icon }) => ({
    id,
    title,
    description,
    color,
    icon,
    slug: tools.find((t) => t.id === id).slug,
  }))
}
