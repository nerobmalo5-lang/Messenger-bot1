const triviaQuestions = [
  {
    id: 1,
    question_en: "What is the name of the demon that lives inside Naruto Uzumaki?",
    options: { A: "Kurama", B: "Shukaku", C: "Matatabi", D: "Son Goku" },
    answer: "A"
  },
  {
    id: 2,
    question_en: "In Attack on Titan, who was the original inheritor of the Attack Titan before Eren?",
    options: { A: "Grisha Jaeger", B: "Zeke Jaeger", C: "Kruger", D: "Frieda Reiss" },
    answer: "A"
  },
  {
    id: 3,
    question_en: "What is Luffy’s ultimate goal in One Piece?",
    options: { A: "To become the strongest swordsman", B: "To find the One Piece and become the Pirate King", C: "To defeat the World Government", D: "To find the legendary All Blue" },
    answer: "B"
  },
  {
    id: 4,
    question_en: "In Demon Slayer, what breathing style does Giyu Tomioka use?",
    options: { A: "Flame Breathing", B: "Thunder Breathing", C: "Water Breathing", D: "Wind Breathing" },
    answer: "C"
  },
  {
    id: 5,
    question_en: "Who is the Flame Hashira in Demon Slayer?",
    options: { A: "Shinobu Kocho", B: "Kyojuro Rengoku", C: "Tengen Uzui", D: "Muichiro Tokito" },
    answer: "B"
  },
  {
    id: 6,
    question_en: "What is the name of the organization that fights curses in Jujutsu Kaisen?",
    options: { A: "The Exorcists Guild", B: "Jujutsu Sorcerers", C: "The Curse Corps", D: "The Spirit Hunters" },
    answer: "B"
  },
  {
    id: 7,
    question_en: "In My Hero Academia, who was the first holder of One For All?",
    options: { A: "All For One's brother", B: "Nana Shimura", C: "All Might", D: "Izuku Midoriya" },
    answer: "A"
  },
  {
    id: 8,
    question_en: "What is the name of the final villain in Fullmetal Alchemist: Brotherhood?",
    options: { A: "Envy", B: "Father", C: "Wrath", D: "Lust" },
    answer: "B"
  },
  {
    id: 9,
    question_en: "Who created the Dragon Balls in Dragon Ball Z?",
    options: { A: "Kami", B: "King Kai", C: "Piccolo", D: "King Piccolo" },
    answer: "A"
  },
  {
    id: 10,
    question_en: "In Tokyo Revengers, what is Takemichi’s main ability?",
    options: { A: "Time travel", B: "Super strength", C: "Telekinesis", D: "Mind reading" },
    answer: "A"
  },
  {
    id: 11,
    question_en: "In Steins;Gate, what is the name of the microwave that sends messages to the past?",
    options: { A: "PhoneWave", B: "Time Machine", C: "D-Mail Microwave", D: "Quantum Microwave" },
    answer: "A"
  },
  {
    id: 12,
    question_en: "Which Mob Psycho 100 character runs a “spiritual consultation” business?",
    options: { A: "Mob", B: "Reigen", C: "Dimple", D: "Teru" },
    answer: "B"
  },
  {
    id: 13,
    question_en: "In The Promised Neverland, what is the real purpose of Grace Field House?",
    options: { A: "A training facility for elite children", B: "A farm to raise human children for demons", C: "An orphanage for gifted children", D: "A secret military school" },
    answer: "B"
  },
  {
    id: 14,
    question_en: "In Erased (Boku dake ga Inai Machi), how does Satoru travel back in time?",
    options: { A: "By using a special watch", B: "By seeing a blue butterfly", C: "By activating his 'Revival' ability", D: "By touching an old object" },
    answer: "C"
  },
  {
    id: 15,
    question_en: "Who is the main antagonist in Made in Abyss Season 1?",
    options: { A: "Bondrewd", B: "Ozen", C: "Reg", D: "Nanachi" },
    answer: "A"
  },
  {
    id: 16,
    question_en: "Who is the creator of One Piece?",
    options: { A: "Masashi Kishimoto", B: "Eiichiro Oda", C: "Akira Toriyama", D: "Koyoharu Gotouge" },
    answer: "B"
  },
  {
    id: 17,
    question_en: "What animation studio produced Jujutsu Kaisen, Attack on Titan (Final Season), and Chainsaw Man?",
    options: { A: "Ufotable", B: "Kyoto Animation", C: "Studio Ghibli", D: "MAPPA" },
    answer: "D"
  },
  {
    id: 18,
    question_en: "Which famous director created Spirited Away and Princess Mononoke?",
    options: { A: "Mamoru Hosoda", B: "Makoto Shinkai", C: "Hayao Miyazaki", D: "Satoshi Kon" },
    answer: "C"
  },
  {
    id: 19,
    question_en: "Which anime film is currently the highest-grossing anime movie of all time worldwide?",
    options: { A: "Demon Slayer: Mugen Train", B: "Spirited Away", C: "Your Name", D: "One Piece Film: Red" },
    answer: "A"
  },
  {
    id: 20,
    question_en: "What series did Makoto Shinkai direct before Your Name?",
    options: { A: "5 Centimeters Per Second", B: "The Garden of Words", C: "Weathering With You", D: "Children Who Chase Lost Voices" },
    answer: "B"
  },
  {
    id: 21,
    question_en: "In Re:Zero, what is the name of the witch who gave Subaru his Return by Death ability?",
    options: { A: "Echidna", B: "Satella", C: "Typhon", D: "Sekhmet" },
    answer: "B"
  },
  {
    id: 22,
    question_en: "What is the name of the organization that aims to create a new world in Death Note?",
    options: { A: "SPK", B: "Task Force", C: "Kira's Followers", D: "The Yotsuba Group" },
    answer: "A"
  },
  {
    id: 23,
    question_en: "In Cowboy Bebop, what is the name of Spike Spiegel’s fighting style?",
    options: { A: "Jeet Kune Do", B: "Karate", C: "Kung Fu", D: "Aikido" },
    answer: "A"
  },
  {
    id: 24,
    question_en: "What is the name of the main city in the anime Psycho-Pass?",
    options: { A: "Neo-Kyoto", B: "Tokyo", C: "New Shinjuku", D: "Neo-Kanto" },
    answer: "D"
  },
  {
    id: 25,
    question_en: "In Hunter x Hunter, what is Killua’s family’s occupation?",
    options: { A: "Merchants", B: "Assassins", C: "Hunters", D: "Spies" },
    answer: "B"
  },
  {
    id: 26,
    question_en: "In Code Geass, what is Lelouch’s geass ability?",
    options: { A: "To control people's minds", B: "To see the future", C: "To manipulate gravity", D: "To create illusions" },
    answer: "A"
  },
  {
    id: 27,
    question_en: "What is the name of the main character in Vinland Saga?",
    options: { A: "Askeladd", B: "Thorfinn", C: "Canute", D: "Leif Erikson" },
    answer: "B"
  },
  {
    id: 28,
    question_en: "In Jojo’s Bizarre Adventure, what is the name of Dio Brando’s stand?",
    options: { A: "Star Platinum", B: "The World", C: "Crazy Diamond", D: "Killer Queen" },
    answer: "B"
  },
  {
    id: 29,
    question_en: "What is the name of the main character in the anime series Black Clover?",
    options: { A: "Yuno", B: "Asta", C: "Noelle", D: "Yami" },
    answer: "B"
  },
  {
    id: 30,
    question_en: "In One-Punch Man, what is Saitama’s hero rank?",
    options: { A: "A-Class", B: "B-Class", C: "C-Class", D: "S-Class" },
    answer: "C"
  },
  {
    id: 31,
    question_en: "What is the name of the protagonist in the anime Bleach?",
    options: { A: "Ichigo Kurosaki", B: "Renji Abarai", C: "Rukia Kuchiki", D: "Toshiro Hitsugaya" },
    answer: "A"
  },
  {
    id: 32,
    question_en: "In the anime Ergo Proxy, what are the androids that serve humans called?",
    options: { A: "Proxies", B: "Automata", C: "Ental", D: "Raptors" },
    answer: "C"
  },
  {
    id: 33,
    question_en: "What is the main character’s name in the anime Fairy Tail?",
    options: { A: "Gray Fullbuster", B: "Natsu Dragneel", C: "Erza Scarlet", D: "Lucy Heartfilia" },
    answer: "B"
  },
  {
    id: 34,
    question_en: "In Sword Art Online, what is the name of the main character?",
    options: { A: "Kirito", B: "Asuna", C: "Klein", D: "Lisbeth" },
    answer: "A"
  },
  {
    id: 35,
    question_en: "What is the name of the protagonist in the anime Spy x Family?",
    options: { A: "Loid Forger", B: "Yor Forger", C: "Anya Forger", D: "Franky Franklin" },
    answer: "A"
  },
  {
    id: 36,
    question_en: "In the anime Berserk, what is the name of Guts' giant sword?",
    options: { A: "Dragon Slayer", B: "Monster Blade", C: "Giant Cleaver", D: "Demon Sword" },
    answer: "A"
  },
  {
    id: 37,
    question_en: "Who is the main character of the anime One Punch Man?",
    options: { A: "Genos", B: "Saitama", C: "Tatsumaki", D: "Fubuki" },
    answer: "B"
  },
  {
    id: 38,
    question_en: "What is the primary power source for the mechs in Neon Genesis Evangelion?",
    options: { A: "Fusion energy", B: "Internal batteries", C: "S2 Engines", D: "External power cables" },
    answer: "D"
  },
  {
    id: 39,
    question_en: "In the anime JoJo's Bizarre Adventure: Diamond is Unbreakable, what is the name of Josuke's stand?",
    options: { A: "Star Platinum", B: "Crazy Diamond", C: "Killer Queen", D: "The Hand" },
    answer: "B"
  },
  {
    id: 40,
    question_en: "In the anime Demon Slayer, what is the name of the main character’s younger sister?",
    options: { A: "Nezuko Kamado", B: "Kanao Tsuyuri", C: "Mitsuri Kanroji", D: "Daki" },
    answer: "A"
  },
  {
    id: 41,
    question_en: "What is the name of the main antagonist in the anime Fullmetal Alchemist?",
    options: { A: "Lust", B: "Greed", C: "Envy", D: "Father" },
    answer: "D"
  },
  {
    id: 42,
    question_en: "What is the name of the school that the main characters attend in My Hero Academia?",
    options: { A: "UA High School", B: "Shiketsu High School", C: "Seijin Academy", D: "UA Middle School" },
    answer: "A"
  },
  {
    id: 43,
    question_en: "In the anime Jujutsu Kaisen, what is the name of the main character?",
    options: { A: "Megumi Fushiguro", B: "Yuji Itadori", C: "Nobara Kugisaki", D: "Satoru Gojo" },
    answer: "B"
  },
  {
    id: 44,
    question_en: "In the anime Chainsaw Man, what is the name of the protagonist?",
    options: { A: "Denji", B: "Power", C: "Makima", D: "Aki Hayakawa" },
    answer: "A"
  },
  {
    id: 45,
    question_en: "What is the name of the first movie in the Dragon Ball Z franchise?",
    options: { A: "Fusion Reborn", B: "The World's Strongest", C: "Dead Zone", D: "Broly – The Legendary Super Saiyan" },
    answer: "C"
  },
  {
    id: 46,
    question_en: "What is the name of the fictional city where the anime Neon Genesis Evangelion takes place?",
    options: { A: "Tokyo-3", B: "Neo-Tokyo", C: "New Kyoto", D: "Tokyo-2" },
    answer: "A"
  },
  {
    id: 47,
    question_en: "In Attack on Titan, what is the name of the main survey corps commander?",
    options: { A: "Erwin Smith", B: "Hange Zoë", C: "Levi Ackerman", D: "Dot Pixis" },
    answer: "A"
  },
  {
    id: 48,
    question_en: "What is the name of the main character in the anime Mob Psycho 100?",
    options: { A: "Arataka Reigen", B: "Shigeo Kageyama", C: "Teruki Hanazawa", D: "Ritsu Kageyama" },
    answer: "B"
  },
  {
    id: 49,
    question_en: "In the anime series Gintama, who is the main character?",
    options: { A: "Shinpachi Shimura", B: "Kagura", C: "Gintoki Sakata", D: "Katsura Kotarou" },
    answer: "C"
  },
  {
    id: 50,
    question_en: "In the anime series Cowboy Bebop, what is the name of Spike's partner?",
    options: { A: "Faye Valentine", B: "Jet Black", C: "Ed", D: "Ein" },
    answer: "B"
  },
  {
    id: 51,
    question_en: "In Dragon Ball Z, what is the final form of Frieza?",
    options: { A: "Fourth Form", B: "Golden Form", C: "Mecha Frieza", D: "Final Form" },
    answer: "A"
  },
  {
    id: 52,
    question_en: "What is the name of the world where the events of One Piece take place?",
    options: { A: "The Grand Line", B: "New World", C: "Earth", D: "The Four Seas" },
    answer: "A"
  },
  {
    id: 53,
    question_en: "In Jujutsu Kaisen, what is the name of the special-grade sorcerer who works as a teacher?",
    options: { A: "Suguru Geto", B: "Satoru Gojo", C: "Yuta Okkotsu", D: "Kento Nanami" },
    answer: "B"
  },
  {
    id: 54,
    question_en: "In Naruto, what is the name of the village hidden in the leaves?",
    options: { A: "Village of the Mist", B: "Village of the Sand", C: "Konohagakure", D: "Village of the Sound" },
    answer: "C"
  },
  {
    id: 55,
    question_en: "What is the name of the main character in the anime series Death Note?",
    options: { A: "L Lawliet", B: "Light Yagami", C: "Ryuk", D: "Misa Amane" },
    answer: "B"
  },
  {
    id: 56,
    question_en: "In My Hero Academia, what is the name of the villain organization?",
    options: { A: "League of Villains", B: "Hero Public Safety Commission", C: "The Meta Liberation Army", D: "The Shie Hassaikai" },
    answer: "A"
  },
  {
    id: 57,
    question_en: "In Fullmetal Alchemist: Brotherhood, what is the name of Edward Elric's younger brother?",
    options: { A: "Roy Mustang", B: "Alphonse Elric", C: "Ling Yao", D: "Greed" },
    answer: "B"
  },
  {
    id: 58,
    question_en: "What is the name of the main character's quirk in My Hero Academia?",
    options: { A: "Explosion", B: "Half-Cold Half-Hot", C: "One For All", D: "Invisible" },
    answer: "C"
  },
  {
    id: 59,
    question_en: "In the anime Demon Slayer, who is the strongest Hashira?",
    options: { A: "Giyu Tomioka", B: "Gyomei Himejima", C: "Sanemi Shinazugawa", D: "Mitsuri Kanroji" },
    answer: "B"
  },
  {
    id: 60,
    question_en: "In Attack on Titan, what is the name of the large wall that protects humanity?",
    options: { A: "Wall Maria", B: "Wall Rose", C: "Wall Sina", D: "All of the above" },
    answer: "D"
  },
  {
    id: 61,
    question_en: "In the anime series Dragon Ball, what is the name of the planet where Goku was born?",
    options: { A: "Planet Vegeta", B: "Planet Namek", C: "Earth", D: "Planet Arlia" },
    answer: "A"
  },
  {
    id: 62,
    question_en: "What is the name of the main antagonist in the anime series Cowboy Bebop?",
    options: { A: "Vicious", B: "Jet Black", C: "Faye Valentine", D: "Ein" },
    answer: "A"
  },
  {
    id: 63,
    question_en: "In the anime series Gintama, what is the name of the main female character?",
    options: { A: "Tsukuyo", B: "Kagura", C: "Otae Shimura", D: "Sarutobi Ayame" },
    answer: "B"
  },
  {
    id: 64,
    question_en: "What is the name of the main antagonist in the anime series One Piece?",
    options: { A: "Blackbeard", B: "Kaido", C: "Big Mom", D: "Marshall D. Teach" },
    answer: "D"
  },
  {
    id: 65,
    question_en: "In the anime series Death Note, what is the name of the Shinigami that owns the Death Note?",
    options: { A: "Rem", B: "Ryuk", C: "Mello", D: "Near" },
    answer: "B"
  },
  {
    id: 66,
    question_en: "What is the name of the main character in the anime series Steins;Gate?",
    options: { A: "Itaru Hashida", B: "Rintaro Okabe", C: "Kurisu Makise", D: "Mayuri Shiina" },
    answer: "B"
  },
  {
    id: 67,
    question_en: "In the anime series Fullmetal Alchemist, what is the name of the country where the story takes place?",
    options: { A: "Xing", B: "Amestris", C: "Ishval", D: "Drachma" },
    answer: "B"
  },
  {
    id: 68,
    question_en: "What is the name of the main character in the anime series One Punch Man?",
    options: { A: "Genos", B: "King", C: "Saitama", D: "Tatsumaki" },
    answer: "C"
  },
  {
    id: 69,
    question_en: "In the anime series Demon Slayer, what is the name of the main antagonist?",
    options: { A: "Akaza", B: "Muzan Kibutsuji", C: "Doma", D: "Kokushibo" },
    answer: "B"
  },
  {
    id: 70,
    question_en: "What is the name of the main character in the anime series Mob Psycho 100?",
    options: { A: "Shigeo Kageyama", B: "Arataka Reigen", C: "Teruki Hanazawa", D: "Ritsu Kageyama" },
    answer: "A"
  },
  {
    id: 71,
    question_en: "In the anime series Attack on Titan, what is the name of the main character?",
    options: { A: "Armin Arlert", B: "Mikasa Ackerman", C: "Eren Jaeger", D: "Levi Ackerman" },
    answer: "C"
  },
  {
    id: 72,
    question_en: "What is the name of the main character in the anime series My Hero Academia?",
    options: { A: "Katsuki Bakugo", B: "Shoto Todoroki", C: "Izuku Midoriya", D: "Tenya Iida" },
    answer: "C"
  },
  {
    id: 73,
    question_en: "In the anime series One Piece, what is the name of the ship that the Straw Hat Pirates use?",
    options: { A: "Thousand Sunny", B: "Going Merry", C: "Red Force", D: "Moby Dick" },
    answer: "A"
  },
  {
    id: 74,
    question_en: "What is the name of the main character in the anime series Dragon Ball?",
    options: { A: "Vegeta", B: "Gohan", C: "Goku", D: "Piccolo" },
    answer: "C"
  },
  {
    id: 75,
    question_en: "What is the name of the main character in the anime series Naruto?",
    options: { A: "Naruto Uzumaki", B: "Sasuke Uchiha", C: "Sakura Haruno", D: "Kakashi Hatake" },
    answer: "A"
  },
  {
    id: 76,
    question_en: "In the anime series Death Note, what is the name of Light Yagami's rival?",
    options: { A: "Mello", B: "Near", C: "L Lawliet", D: "Ryuk" },
    answer: "C"
  },
  {
    id: 77,
    question_en: "What is the name of the main character in the anime series Black Clover?",
    options: { A: "Yuno", B: "Asta", C: "Noelle Silva", D: "Yami Sukehiro" },
    answer: "B"
  },
  {
    id: 78,
    question_en: "In the anime series Jujutsu Kaisen, what is the name of the powerful curse that lives inside Yuji Itadori?",
    options: { A: "Jogo", B: "Mahito", C: "Sukuna", D: "Kenjaku" },
    answer: "C"
  },
  {
    id: 79,
    question_en: "What is the name of the main character in the anime series Chainsaw Man?",
    options: { A: "Denji", B: "Power", C: "Makima", D: "Aki Hayakawa" },
    answer: "A"
  },
  {
    id: 80,
    question_en: "In the anime series Demon Slayer, what is the name of the main character’s friend who wears a boar head?",
    options: { A: "Zenitsu Agatsuma", B: "Inosuke Hashibira", C: "Giyu Tomioka", D: "Muzan Kibutsuji" },
    answer: "B"
  },
  {
    id: 81,
    question_en: "What is the name of the main character in the anime series Gintama?",
    options: { A: "Kagura", B: "Shinpachi Shimura", C: "Gintoki Sakata", D: "Hijikata Toshiro" },
    answer: "C"
  },
  {
    id: 82,
    question_en: "In the anime series Attack on Titan, what is the name of the main character's childhood friend?",
    options: { A: "Erwin Smith", B: "Mikasa Ackerman", C: "Levi Ackerman", D: "Armin Arlert" },
    answer: "B"
  },
  {
    id: 83,
    question_en: "What is the name of the main character in the anime series One Piece?",
    options: { A: "Roronoa Zoro", B: "Nami", C: "Monkey D. Luffy", D: "Sanji" },
    answer: "C"
  },
  {
    id: 84,
    question_en: "In the anime series Jujutsu Kaisen, what is the name of the main character's teacher?",
    options: { A: "Satoru Gojo", B: "Kento Nanami", C: "Panda", D: "Maki Zenin" },
    answer: "A"
  },
  {
    id: 85,
    question_en: "What is the name of the main character in the anime series My Hero Academia?",
    options: { A: "All Might", B: "Shota Aizawa", C: "Izuku Midoriya", D: "Tomura Shigaraki" },
    answer: "C"
  },
  {
    id: 86,
    question_en: "In the anime series Fullmetal Alchemist, what is the name of the main character's older brother?",
    options: { A: "Alphonse Elric", B: "Edward Elric", C: "Roy Mustang", D: "Alex Louis Armstrong" },
    answer: "B"
  },
  {
    id: 87,
    question_en: "What is the name of the main character in the anime series Dragon Ball?",
    options: { A: "Vegeta", B: "Gohan", C: "Goku", D: "Trunks" },
    answer: "C"
  },
  {
    id: 88,
    question_en: "In the anime series Naruto, what is the name of the main character's team?",
    options: { A: "Team 7", B: "Team 8", C: "Team 10", D: "Team 9" },
    answer: "A"
  },
  {
    id: 89,
    question_en: "What is the name of the main antagonist in the anime series One Piece?",
    options: { A: "Blackbeard", B: "Kaido", C: "Big Mom", D: "Marshall D. Teach" },
    answer: "A"
  },
  {
    id: 90,
    question_en: "In the anime series Demon Slayer, what is the name of the main character?",
    options: { A: "Tanjiro Kamado", B: "Nezuko Kamado", C: "Zenitsu Agatsuma", D: "Inosuke Hashibira" },
    answer: "A"
  },
  {
    id: 91,
    question_en: "What is the name of the main character in the anime series Attack on Titan?",
    options: { A: "Eren Jaeger", B: "Mikasa Ackerman", C: "Armin Arlert", D: "Levi Ackerman" },
    answer: "A"
  },
  {
    id: 92,
    question_en: "In the anime series Jujutsu Kaisen, what is the name of the main character?",
    options: { A: "Yuji Itadori", B: "Megumi Fushiguro", C: "Nobara Kugisaki", D: "Satoru Gojo" },
    answer: "A"
  },
  {
    id: 93,
    question_en: "What is the name of the main character in the anime series My Hero Academia?",
    options: { A: "Izuku Midoriya", B: "Katsuki Bakugo", C: "Shoto Todoroki", D: "Ochaco Uraraka" },
    answer: "A"
  },
  {
    id: 94,
    question_en: "In the anime series Fullmetal Alchemist, what is the name of the main character?",
    options: { A: "Edward Elric", B: "Alphonse Elric", C: "Roy Mustang", D: "Alex Louis Armstrong" },
    answer: "A"
  },
  {
    id: 95,
    question_en: "What is the name of the main character in the anime series Dragon Ball?",
    options: { A: "Goku", B: "Vegeta", C: "Gohan", D: "Piccolo" },
    answer: "A"
  },
  {
    id: 96,
    question_en: "In the anime series Naruto, what is the name of the main antagonist?",
    options: { A: "Orochimaru", B: "Kabuto Yakushi", C: "Madara Uchiha", D: "Pain" },
    answer: "C"
  },
  {
    id: 97,
    question_en: "What is the name of the main antagonist in the anime series One Piece?",
    options: { A: "Kaido", B: "Big Mom", C: "Marshall D. Teach", D: "Sakazuki" },
    answer: "C"
  },
  {
    id: 98,
    question_en: "In the anime series Demon Slayer, what is the name of the main character's sister?",
    options: { A: "Nezuko Kamado", B: "Kanao Tsuyuri", C: "Shinobu Kocho", D: "Mitsuri Kanroji" },
    answer: "A"
  },
  {
    id: 99,
    question_en: "What is the name of the main character in the anime series Attack on Titan?",
    options: { A: "Eren Jaeger", B: "Mikasa Ackerman", C: "Armin Arlert", D: "Levi Ackerman" },
    answer: "A"
  },
  {
    id: 100,
    question_en: "In the anime series Jujutsu Kaisen, what is the name of the main character?",
    options: { A: "Yuji Itadori", B: "Megumi Fushiguro", C: "Nobara Kugisaki", D: "Satoru Gojo" },
    answer: "A"
  },
  {
    id: 101,
    question_en: "What is the name of the main character in the anime series My Hero Academia?",
    options: { A: "Izuku Midoriya", B: "Katsuki Bakugo", C: "Shoto Todoroki", D: "Ochaco Uraraka" },
    answer: "A"
  },
  {
    id: 102,
    question_en: "In the anime series Fullmetal Alchemist, what is the name of the main character?",
    options: { A: "Edward Elric", B: "Alphonse Elric", C: "Roy Mustang", D: "Alex Louis Armstrong" },
    answer: "A"
  },
  {
    id: 103,
    question_en: "What is the name of the main character in the anime series Dragon Ball?",
    options: { A: "Goku", B: "Vegeta", C: "Gohan", D: "Piccolo" },
    answer: "A"
  },
  {
    id: 104,
    question_en: "In the anime series Naruto, what is the name of the main antagonist?",
    options: { A: "Orochimaru", B: "Kabuto Yakushi", C: "Madara Uchiha", D: "Pain" },
    answer: "C"
  },
  {
    id: 105,
    question_en: "What is the name of the main antagonist in the anime series One Piece?",
    options: { A: "Kaido", B: "Big Mom", C: "Marshall D. Teach", D: "Sakazuki" },
    answer: "C"
  },
  {
    id: 106,
    question_en: "In the anime series Demon Slayer, what is the name of the main character's sister?",
    options: { A: "Nezuko Kamado", B: "Kanao Tsuyuri", C: "Shinobu Kocho", D: "Mitsuri Kanroji" },
    answer: "A"
  },
  {
    id: 107,
    question_en: "What is the name of the main character in the anime series Attack on Titan?",
    options: { A: "Eren Jaeger", B: "Mikasa Ackerman", C: "Armin Arlert", D: "Levi Ackerman" },
    answer: "A"
  },
  {
    id: 108,
    question_en: "In the anime series Jujutsu Kaisen, what is the name of the main character?",
    options: { A: "Yuji Itadori", B: "Megumi Fushiguro", C: "Nobara Kugisaki", D: "Satoru Gojo" },
    answer: "A"
  },
  {
    id: 109,
    question_en: "What is the name of the main character in the anime series My Hero Academia?",
    options: { A: "Izuku Midoriya", B: "Katsuki Bakugo", C: "Shoto Todoroki", D: "Ochaco Uraraka" },
    answer: "A"
  },
  {
    id: 110,
    question_en: "In the anime series Fullmetal Alchemist, what is the name of the main character?",
    options: { A: "Edward Elric", B: "Alphonse Elric", C: "Roy Mustang", D: "Alex Louis Armstrong" },
    answer: "A"
  },
  {
    id: 111,
    question_en: "What is the name of the main character in the anime series Dragon Ball?",
    options: { A: "Goku", B: "Vegeta", C: "Gohan", D: "Piccolo" },
    answer: "A"
  },
  {
    id: 112,
    question_en: "In the anime series Naruto, what is the name of the main antagonist?",
    options: { A: "Orochimaru", B: "Kabuto Yakushi", C: "Madara Uchiha", D: "Pain" },
    answer: "C"
  },
  {
    id: 113,
    question_en: "What is the name of the main antagonist in the anime series One Piece?",
    options: { A: "Kaido", B: "Big Mom", C: "Marshall D. Teach", D: "Sakazuki" },
    answer: "C"
  },
  {
    id: 114,
    question_en: "In the anime series Demon Slayer, what is the name of the main character's sister?",
    options: { A: "Nezuko Kamado", B: "Kanao Tsuyuri", C: "Shinobu Kocho", D: "Mitsuri Kanroji" },
    answer: "A"
  },
  {
    id: 115,
    question_en: "What is the name of the main character in the anime series Attack on Titan?",
    options: { A: "Eren Jaeger", B: "Mikasa Ackerman", C: "Armin Arlert", D: "Levi Ackerman" },
    answer: "A"
  },
  {
    id: 116,
    question_en: "In the anime series Jujutsu Kaisen, what is the name of the main character?",
    options: { A: "Yuji Itadori", B: "Megumi Fushiguro", C: "Nobara Kugisaki", D: "Satoru Gojo" },
    answer: "A"
  },
  {
    id: 117,
    question_en: "What is the name of the main character in the anime series My Hero Academia?",
    options: { A: "Izuku Midoriya", B: "Katsuki Bakugo", C: "Shoto Todoroki", D: "Ochaco Uraraka" },
    answer: "A"
  },
  {
    id: 118,
    question_en: "In the anime series Fullmetal Alchemist, what is the name of the main character?",
    options: { A: "Edward Elric", B: "Alphonse Elric", C: "Roy Mustang", D: "Alex Louis Armstrong" },
    answer: "A"
  },
  {
    id: 119,
    question_en: "What is the name of the main character in the anime series Dragon Ball?",
    options: { A: "Goku", B: "Vegeta", C: "Gohan", D: "Piccolo" },
    answer: "A"
  },
  {
    id: 120,
    question_en: "In the anime series Naruto, what is the name of the main antagonist?",
    options: { A: "Orochimaru", B: "Kabuto Yakushi", C: "Madara Uchiha", D: "Pain" },
    answer: "C"
  },
  {
    id: 121,
    question_en: "What is the name of the main antagonist in the anime series One Piece?",
    options: { A: "Kaido", B: "Big Mom", C: "Marshall D. Teach", D: "Sakazuki" },
    answer: "C"
  },
  {
    id: 122,
    question_en: "In the anime series Demon Slayer, what is the name of the main character's sister?",
    options: { A: "Nezuko Kamado", B: "Kanao Tsuyuri", C: "Shinobu Kocho", D: "Mitsuri Kanroji" },
    answer: "A"
  },
  {
    id: 123,
    question_en: "What is the name of the main character in the anime series Attack on Titan?",
    options: { A: "Eren Jaeger", B: "Mikasa Ackerman", C: "Armin Arlert", D: "Levi Ackerman" },
    answer: "A"
  },
  {
    id: 124,
    question_en: "In the anime series Jujutsu Kaisen, what is the name of the main character?",
    options: { A: "Yuji Itadori", B: "Megumi Fushiguro", C: "Nobara Kugisaki", D: "Satoru Gojo" },
    answer: "A"
  },
  {
    id: 125,
    question_en: "What is the name of the main character in the anime series My Hero Academia?",
    options: { A: "Izuku Midoriya", B: "Katsuki Bakugo", C: "Shoto Todoroki", D: "Ochaco Uraraka" },
    answer: "A"
  },
  {
    id: 126,
    question_en: "In the anime series Fullmetal Alchemist, what is the name of the main character?",
    options: { A: "Edward Elric", B: "Alphonse Elric", C: "Roy Mustang", D: "Alex Louis Armstrong" },
    answer: "A"
  },
  {
    id: 127,
    question_en: "What is the name of the main character in the anime series Dragon Ball?",
    options: { A: "Goku", B: "Vegeta", C: "Gohan", D: "Piccolo" },
    answer: "A"
  },
  {
    id: 128,
    question_en: "In the anime series Naruto, what is the name of the main antagonist?",
    options: { A: "Orochimaru", B: "Kabuto Yakushi", C: "Madara Uchiha", D: "Pain" },
    answer: "C"
  },
  {
    id: 129,
    question_en: "What is the name of the main antagonist in the anime series One Piece?",
    options: { A: "Kaido", B: "Big Mom", C: "Marshall D. Teach", D: "Sakazuki" },
    answer: "C"
  },
  {
    id: 130,
    question_en: "In the anime series Demon Slayer, what is the name of the main character's sister?",
    options: { A: "Nezuko Kamado", B: "Kanao Tsuyuri", C: "Shinobu Kocho", D: "Mitsuri Kanroji" },
    answer: "A"
  },
  {
    id: 131,
    question_en: "What is the name of the main character in the anime series Attack on Titan?",
    options: { A: "Eren Jaeger", B: "Mikasa Ackerman", C: "Armin Arlert", D: "Levi Ackerman" },
    answer: "A"
  },
  {
    id: 132,
    question_en: "In the anime series Jujutsu Kaisen, what is the name of the main character?",
    options: { A: "Yuji Itadori", B: "Megumi Fushiguro", C: "Nobara Kugisaki", D: "Satoru Gojo" },
    answer: "A"
  },
  {
    id: 133,
    question_en: "What is the name of the main character in the anime series My Hero Academia?",
    options: { A: "Izuku Midoriya", B: "Katsuki Bakugo", C: "Shoto Todoroki", D: "Ochaco Uraraka" },
    answer: "A"
  },
  {
    id: 134,
    question_en: "In the anime series Fullmetal Alchemist, what is the name of the main character?",
    options: { A: "Edward Elric", B: "Alphonse Elric", C: "Roy Mustang", D: "Alex Louis Armstrong" },
    answer: "A"
  },
  {
    id: 135,
    question_en: "What is the name of the main character in the anime series Dragon Ball?",
    options: { A: "Goku", B: "Vegeta", C: "Gohan", D: "Piccolo" },
    answer: "A"
  },
  {
    id: 136,
    question_en: "In the anime series Naruto, what is the name of the main antagonist?",
    options: { A: "Orochimaru", B: "Kabuto Yakushi", C: "Madara Uchiha", D: "Pain" },
    answer: "C"
  },
  {
    id: 137,
    question_en: "What is the name of the main antagonist in the anime series One Piece?",
    options: { A: "Kaido", B: "Big Mom", C: "Marshall D. Teach", D: "Sakazuki" },
    answer: "C"
  },
  {
    id: 138,
    question_en: "In the anime series Demon Slayer, what is the name of the main character's sister?",
    options: { A: "Nezuko Kamado", B: "Kanao Tsuyuri", C: "Shinobu Kocho", D: "Mitsuri Kanroji" },
    answer: "A"
  },
  {
    id: 139,
    question_en: "What is the name of the main character in the anime series Attack on Titan?",
    options: { A: "Eren Jaeger", B: "Mikasa Ackerman", C: "Armin Arlert", D: "Levi Ackerman" },
    answer: "A"
  },
  {
    id: 140,
    question_en: "In the anime series Jujutsu Kaisen, what is the name of the main character?",
    options: { A: "Yuji Itadori", B: "Megumi Fushiguro", C: "Nobara Kugisaki", D: "Satoru Gojo" },
    answer: "A"
  },
  {
    id: 141,
    question_en: "What is the name of the main character in the anime series My Hero Academia?",
    options: { A: "Izuku Midoriya", B: "Katsuki Bakugo", C: "Shoto Todoroki", D: "Ochaco Uraraka" },
    answer: "A"
  },
  {
    id: 142,
    question_en: "In the anime series Fullmetal Alchemist, what is the name of the main character?",
    options: { A: "Edward Elric", B: "Alphonse Elric", C: "Roy Mustang", D: "Alex Louis Armstrong" },
    answer: "A"
  },
  {
    id: 143,
    question_en: "What is the name of the main character in the anime series Dragon Ball?",
    options: { A: "Goku", B: "Vegeta", C: "Gohan", D: "Piccolo" },
    answer: "A"
  },
  {
    id: 144,
    question_en: "In the anime series Naruto, what is the name of the main antagonist?",
    options: { A: "Orochimaru", B: "Kabuto Yakushi", C: "Madara Uchiha", D: "Pain" },
    answer: "C"
  },
  {
    id: 145,
    question_en: "What is the name of the main antagonist in the anime series One Piece?",
    options: { A: "Kaido", B: "Big Mom", C: "Marshall D. Teach", D: "Sakazuki" },
    answer: "C"
  },
  {
    id: 146,
    question_en: "In the anime series Demon Slayer, what is the name of the main character's sister?",
    options: { A: "Nezuko Kamado", B: "Kanao Tsuyuri", C: "Shinobu Kocho", D: "Mitsuri Kanroji" },
    answer: "A"
  },
  {
    id: 147,
    question_en: "What is the name of the main character in the anime series Attack on Titan?",
    options: { A: "Eren Jaeger", B: "Mikasa Ackerman", C: "Armin Arlert", D: "Levi Ackerman" },
    answer: "A"
  },
  {
    id: 148,
    question_en: "In the anime series Jujutsu Kaisen, what is the name of the main character?",
    options: { A: "Yuji Itadori", B: "Megumi Fushiguro", C: "Nobara Kugisaki", D: "Satoru Gojo" },
    answer: "A"
  },
  {
    id: 149,
    question_en: "What is the name of the main character in the anime series My Hero Academia?",
    options: { A: "Izuku Midoriya", B: "Katsuki Bakugo", C: "Shoto Todoroki", D: "Ochaco Uraraka" },
    answer: "A"
  },
  {
    id: 150,
    question_en: "In the anime series Fullmetal Alchemist, what is the name of the main character?",
    options: { A: "Edward Elric", B: "Alphonse Elric", C: "Roy Mustang", D: "Alex Louis Armstrong" },
    answer: "A"
  },
  {
    id: 151,
    question_en: "What is the name of the main character in the anime series Dragon Ball?",
    options: { A: "Goku", B: "Vegeta", C: "Gohan", D: "Piccolo" },
    answer: "A"
  },
  {
    id: 152,
    question_en: "In the anime series Naruto, what is the name of the main antagonist?",
    options: { A: "Orochimaru", B: "Kabuto Yakushi", C: "Madara Uchiha", D: "Pain" },
    answer: "C"
  },
  {
    id: 153,
    question_en: "What is the name of the main antagonist in the anime series One Piece?",
    options: { A: "Kaido", B: "Big Mom", C: "Marshall D. Teach", D: "Sakazuki" },
    answer: "C"
  },
  {
    id: 154,
    question_en: "In the anime series Demon Slayer, what is the name of the main character's sister?",
    options: { A: "Nezuko Kamado", B: "Kanao Tsuyuri", C: "Shinobu Kocho", D: "Mitsuri Kanroji" },
    answer: "A"
  },
  {
    id: 155,
    question_en: "What is the name of the main character in the anime series Attack on Titan?",
    options: { A: "Eren Jaeger", B: "Mikasa Ackerman", C: "Armin Arlert", D: "Levi Ackerman" },
    answer: "A"
  },
  {
    id: 156,
    question_en: "In the anime series Jujutsu Kaisen, what is the name of the main character?",
    options: { A: "Yuji Itadori", B: "Megumi Fushiguro", C: "Nobara Kugisaki", D: "Satoru Gojo" },
    answer: "A"
  },
  {
    id: 157,
    question_en: "What is the name of the main character in the anime series My Hero Academia?",
    options: { A: "Izuku Midoriya", B: "Katsuki Bakugo", C: "Shoto Todoroki", D: "Ochaco Uraraka" },
    answer: "A"
  },
  {
    id: 158,
    question_en: "In the anime series Fullmetal Alchemist, what is the name of the main character?",
    options: { A: "Edward Elric", B: "Alphonse Elric", C: "Roy Mustang", D: "Alex Louis Armstrong" },
    answer: "A"
  },
  {
    id: 159,
    question_en: "What is the name of the main character in the anime series Dragon Ball?",
    options: { A: "Goku", B: "Vegeta", C: "Gohan", D: "Piccolo" },
    answer: "A"
  },
  {
    id: 160,
    question_en: "In the anime series Naruto, what is the name of the main antagonist?",
    options: { A: "Orochimaru", B: "Kabuto Yakushi", C: "Madara Uchiha", D: "Pain" },
    answer: "C"
  },
  {
    id: 161,
    question_en: "What is the name of the main antagonist in the anime series One Piece?",
    options: { A: "Kaido", B: "Big Mom", C: "Marshall D. Teach", D: "Sakazuki" },
    answer: "C"
  },
  {
    id: 162,
    question_en: "In the anime series Demon Slayer, what is the name of the main character's sister?",
    options: { A: "Nezuko Kamado", B: "Kanao Tsuyuri", C: "Shinobu Kocho", D: "Mitsuri Kanroji" },
    answer: "A"
  },
  {
    id: 163,
    question_en: "What is the name of the main character in the anime series Attack on Titan?",
    options: { A: "Eren Jaeger", B: "Mikasa Ackerman", C: "Armin Arlert", D: "Levi Ackerman" },
    answer: "A"
  },
  {
    id: 164,
    question_en: "In the anime series Jujutsu Kaisen, what is the name of the main character?",
    options: { A: "Yuji Itadori", B: "Megumi Fushiguro", C: "Nobara Kugisaki", D: "Satoru Gojo" },
    answer: "A"
  },
  {
    id: 165,
    question_en: "What is the name of the main character in the anime series My Hero Academia?",
    options: { A: "Izuku Midoriya", B: "Katsuki Bakugo", C: "Shoto Todoroki", D: "Ochaco Uraraka" },
    answer: "A"
  },
  {
    id: 166,
    question_en: "In the anime series Fullmetal Alchemist, what is the name of the main character?",
    options: { A: "Edward Elric", B: "Alphonse Elric", C: "Roy Mustang", D: "Alex Louis Armstrong" },
    answer: "A"
  },
  {
    id: 167,
    question_en: "What is the name of the main character in the anime series Dragon Ball?",
    options: { A: "Goku", B: "Vegeta", C: "Gohan", D: "Piccolo" },
    answer: "A"
  },
  {
    id: 168,
    question_en: "In the anime series Naruto, what is the name of the main antagonist?",
    options: { A: "Orochimaru", B: "Kabuto Yakushi", C: "Madara Uchiha", D: "Pain" },
    answer: "C"
  },
  {
    id: 169,
    question_en: "What is the name of the main antagonist in the anime series One Piece?",
    options: { A: "Kaido", B: "Big Mom", C: "Marshall D. Teach", D: "Sakazuki" },
    answer: "C"
  },
  {
    id: 170,
    question_en: "In the anime series Demon Slayer, what is the name of the main character's sister?",
    options: { A: "Nezuko Kamado", B: "Kanao Tsuyuri", C: "Shinobu Kocho", D: "Mitsuri Kanroji" },
    answer: "A"
  },
  {
    id: 171,
    question_en: "What is the name of the main character in the anime series Attack on Titan?",
    options: { A: "Eren Jaeger", B: "Mikasa Ackerman", C: "Armin Arlert", D: "Levi Ackerman" },
    answer: "A"
  },
  {
    id: 172,
    question_en: "In the anime series Jujutsu Kaisen, what is the name of the main character?",
    options: { A: "Yuji Itadori", B: "Megumi Fushiguro", C: "Nobara Kugisaki", D: "Satoru Gojo" },
    answer: "A"
  },
  {
    id: 173,
    question_en: "What is the name of the main character in the anime series My Hero Academia?",
    options: { A: "Izuku Midoriya", B: "Katsuki Bakugo", C: "Shoto Todoroki", D: "Ochaco Uraraka" },
    answer: "A"
  },
  {
    id: 174,
    question_en: "In the anime series Fullmetal Alchemist, what is the name of the main character?",
    options: { A: "Edward Elric", B: "Alphonse Elric", C: "Roy Mustang", D: "Alex Louis Armstrong" },
    answer: "A"
  },
  {
    id: 175,
    question_en: "What is the name of the main character in the anime series Dragon Ball?",
    options: { A: "Goku", B: "Vegeta", C: "Gohan", D: "Piccolo" },
    answer: "A"
  },
  {
    id: 176,
    question_en: "In the anime series Naruto, what is the name of the main antagonist?",
    options: { A: "Orochimaru", B: "Kabuto Yakushi", C: "Madara Uchiha", D: "Pain" },
    answer: "C"
  },
  {
    id: 177,
    question_en: "What is the name of the main antagonist in the anime series One Piece?",
    options: { A: "Kaido", B: "Big Mom", C: "Marshall D. Teach", D: "Sakazuki" },
    answer: "C"
  },
  {
    id: 178,
    question_en: "In the anime series Demon Slayer, what is the name of the main character's sister?",
    options: { A: "Nezuko Kamado", B: "Kanao Tsuyuri", C: "Shinobu Kocho", D: "Mitsuri Kanroji" },
    answer: "A"
  },
  {
    id: 179,
    question_en: "What is the name of the main character in the anime series Attack on Titan?",
    options: { A: "Eren Jaeger", B: "Mikasa Ackerman", C: "Armin Arlert", D: "Levi Ackerman" },
    answer: "A"
  },
  {
    id: 180,
    question_en: "In the anime series Jujutsu Kaisen, what is the name of the main character?",
    options: { A: "Yuji Itadori", B: "Megumi Fushiguro", C: "Nobara Kugisaki", D: "Satoru Gojo" },
    answer: "A"
  },
  {
    id: 181,
    question_en: "What is the name of the main character in the anime series My Hero Academia?",
    options: { A: "Izuku Midoriya", B: "Katsuki Bakugo", C: "Shoto Todoroki", D: "Ochaco Uraraka" },
    answer: "A"
  },
  {
    id: 182,
    question_en: "In the anime series Fullmetal Alchemist, what is the name of the main character?",
    options: { A: "Edward Elric", B: "Alphonse Elric", C: "Roy Mustang", D: "Alex Louis Armstrong" },
    answer: "A"
  },
  {
    id: 183,
    question_en: "What is the name of the main character in the anime series Dragon Ball?",
    options: { A: "Goku", B: "Vegeta", C: "Gohan", D: "Piccolo" },
    answer: "A"
  },
  {
    id: 184,
    question_en: "In the anime series Naruto, what is the name of the main antagonist?",
    options: { A: "Orochimaru", B: "Kabuto Yakushi", C: "Madara Uchiha", D: "Pain" },
    answer: "C"
  },
  {
    id: 185,
    question_en: "What is the name of the main antagonist in the anime series One Piece?",
    options: { A: "Kaido", B: "Big Mom", C: "Marshall D. Teach", D: "Sakazuki" },
    answer: "C"
  },
  {
    id: 186,
    question_en: "In the anime series Demon Slayer, what is the name of the main character's sister?",
    options: { A: "Nezuko Kamado", B: "Kanao Tsuyuri", C: "Shinobu Kocho", D: "Mitsuri Kanroji" },
    answer: "A"
  },
  {
    id: 187,
    question_en: "What is the name of the main character in the anime series Attack on Titan?",
    options: { A: "Eren Jaeger", B: "Mikasa Ackerman", C: "Armin Arlert", D: "Levi Ackerman" },
    answer: "A"
  },
  {
    id: 188,
    question_en: "In the anime series Jujutsu Kaisen, what is the name of the main character?",
    options: { A: "Yuji Itadori", B: "Megumi Fushiguro", C: "Nobara Kugisaki", D: "Satoru Gojo" },
    answer: "A"
  },
  {
    id: 189,
    question_en: "What is the name of the main character in the anime series My Hero Academia?",
    options: { A: "Izuku Midoriya", B: "Katsuki Bakugo", C: "Shoto Todoroki", D: "Ochaco Uraraka" },
    answer: "A"
  },
  {
    id: 190,
    question_en: "In the anime series Fullmetal Alchemist, what is the name of the main character?",
    options: { A: "Edward Elric", B: "Alphonse Elric", C: "Roy Mustang", D: "Alex Louis Armstrong" },
    answer: "A"
  },
  {
    id: 191,
    question_en: "What is the name of the main character in the anime series Dragon Ball?",
    options: { A: "Goku", B: "Vegeta", C: "Gohan", D: "Piccolo" },
    answer: "A"
  },
  {
    id: 192,
    question_en: "In the anime series Naruto, what is the name of the main antagonist?",
    options: { A: "Orochimaru", B: "Kabuto Yakushi", C: "Madara Uchiha", D: "Pain" },
    answer: "C"
  },
  {
    id: 193,
    question_en: "What is the name of the main antagonist in the anime series One Piece?",
    options: { A: "Kaido", B: "Big Mom", C: "Marshall D. Teach", D: "Sakazuki" },
    answer: "C"
  },
  {
    id: 194,
    question_en: "In the anime series Demon Slayer, what is the name of the main character's sister?",
    options: { A: "Nezuko Kamado", B: "Kanao Tsuyuri", C: "Shinobu Kocho", D: "Mitsuri Kanroji" },
    answer: "A"
  },
  {
    id: 195,
    question_en: "What is the name of the main character in the anime series Attack on Titan?",
    options: { A: "Eren Jaeger", B: "Mikasa Ackerman", C: "Armin Arlert", D: "Levi Ackerman" },
    answer: "A"
  },
  {
    id: 196,
    question_en: "In the anime series Jujutsu Kaisen, what is the name of the main character?",
    options: { A: "Yuji Itadori", B: "Megumi Fushiguro", C: "Nobara Kugisaki", D: "Satoru Gojo" },
    answer: "A"
  },
  {
    id: 197,
    question_en: "What is the name of the main character in the anime series My Hero Academia?",
    options: { A: "Izuku Midoriya", B: "Katsuki Bakugo", C: "Shoto Todoroki", D: "Ochaco Uraraka" },
    answer: "A"
  },
  {
    id: 198,
    question_en: "In the anime series Fullmetal Alchemist, what is the name of the main character?",
    options: { A: "Edward Elric", B: "Alphonse Elric", C: "Roy Mustang", D: "Alex Louis Armstrong" },
    answer: "A"
  },
  {
    id: 199,
    question_en: "What is the name of the main character in the anime series Dragon Ball?",
    options: { A: "Goku", B: "Vegeta", C: "Gohan", D: "Piccolo" },
    answer: "A"
  },
  {
    id: 200,
    question_en: "In the anime series Naruto, what is the name of the main antagonist?",
    options: { A: "Orochimaru", B: "Kabuto Yakushi", C: "Madara Uchiha", D: "Pain" },
    answer: "C"
  }
];

const sessions = {};

module.exports.config = {
  name: "animefan",
  version: "1.0.0",
  hasPermission: 0,
  credits: "AI",
  description: "A trivia game for anime fans.",
  commandCategory: "game",
  usages: "animefan",
  cooldowns: 5
};

// Helper function to format the question message
function formatQuestion(q) {
  return `🧠 Anime Fan Trivia #${q.id}\n\n${q.question_en}\n\nA) ${q.options.A}\nB) ${q.options.B}\nC) ${q.options.C}\nD) ${q.options.D}\n\nReply with A, B, C, or D.`;
}

module.exports.run = async function({ api, event, args }) {
  const { threadID, senderID, body } = event;
  const command = args[0]?.toLowerCase();
  
  if (!sessions[senderID]) {
    sessions[senderID] = {
      score: 0,
      currentQ: -1,
      playing: false
    };
  }
  const session = sessions[senderID];
  
  if (command === "start") {
    const randomQuestions = triviaQuestions.sort(() => Math.random() - 0.5);
    session.questions = randomQuestions.slice(0, 10);
    session.score = 0;
    session.currentQ = 0;
    session.playing = true;
    
    return api.sendMessage("An anime trivia game has begun! Reply with your answer (A, B, C, or D).\n\n" + formatQuestion(session.questions[0]), threadID);
  }

  if (!session.playing) {
    return api.sendMessage("Type 'animefan start' to begin the trivia!", threadID);
  }

  const input = (body || "").trim().toUpperCase();
  const validAnswers = ["A", "B", "C", "D"];
  
  if (validAnswers.includes(input)) {
    const currentQ = session.questions[session.currentQ];
    
    const isCorrect = input === currentQ.answer;
    if (isCorrect) {
      session.score++;
    }
    
    session.currentQ++;
    
    if (session.currentQ >= session.questions.length) {
      session.playing = false;
      return api.sendMessage(
        `🎉 Game over! Your final score is: ${session.score} / ${session.questions.length}\nType 'animefan start' to play again!`,
        threadID
      );
    }
    
    const feedback = isCorrect ? "✅ Correct!" : `❌ Wrong! The correct answer was: ${currentQ.answer}`;
    return api.sendMessage(
      `${feedback}\n\n` + formatQuestion(session.questions[session.currentQ]),
      threadID
    );
  } else {
    return api.sendMessage("Please answer with A, B, C, or D.", threadID);
  }
};
