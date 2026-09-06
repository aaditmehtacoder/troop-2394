/**
 * ============================================================================
 * THE TROOP BLOG
 * ============================================================================
 * Two kinds of posts, all real:
 *
 *   1. 2025 onward: outing write-ups the Scouts send to the troop mailing list
 *      after every trip. Reproduced from those emails, lightly cleaned for
 *      typos, with mailing-list footers and links stripped.
 *   2. 2015 to 2020: posts recovered from the troop's old DokuWiki
 *      (troop-394.org, archived) and the troop's KindredPix group.
 *
 * On names: the Scouts who wrote these are children. Only first names are
 * carried over, for authors and for anyone mentioned. Adult leaders are named
 * as they sign their emails.
 *
 * Once Supabase is connected, the `posts` table takes over and these become
 * the fallback. `node scripts/seed.mjs` pushes them into the database.
 * ==========================================================================*/

export type BlogPost = {
  slug: string;
  title: string;
  /** ISO date of the trip itself, not the posting date. */
  date: string;
  author: string;
  kind: "Trip report" | "Service" | "Summer camp" | "Milestone";
  location: string;
  excerpt: string;
  /** Paragraphs. Written by Scouts, lightly cleaned for typos only. */
  body: string[];
  source: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "new-youth-leadership-and-fall-2026-schedule",
    title: "New Youth Leadership and the Fall Schedule",
    date: "2026-08-25",
    author: "Siddharth",
    kind: "Milestone",
    location: "Sunnyvale Elks Lodge",
    excerpt:
      "The PLC met on August 25 to seat the new youth leaders and lay out the September and October meetings and outings.",
    body: [
      "Here is a summary of what we discussed at our PLC meeting on August 25th, along with our upcoming schedule for September and October. Everyone who was receiving a leadership position was there.",
      "New troop leadership positions: Senior Patrol Leaders Akhil and Jacqueline; Assistant Senior Patrol Leader Sreshta; Troop Guides Zachary and Akalya; Patrol Leaders Vihaan S., Siddharth, Shivansh, Sahasra, Saanvi, and Harshika; Quartermasters Shravya and Shripranav; Historian Vihaan M.; Scribe Anvay; Librarians Jonah and Aran.",
      "Upcoming weekly meetings (Tuesdays). September 1: Communication Merit Badge, an Eagle-required merit badge that Vihaan M. will lead, and a fun troop game hosted by Zachary. September 8: continuing our work on the merit badge, and Zach will host the game again. September 15: PLC meeting, with no regular troop meeting activities. September 22: outing prep and meal planning for the Sunset Beach trip, patrols meeting to design and create their patrol flags, and a game hosted by Zach. September 29: Court of Honor.",
      "Upcoming outings and trips: September 26–27 (Saturday–Sunday), the annual Sunset Beach outing; October 17–18 (Saturday–Sunday), kayaking and camping at Laguna Seca; and in November (dates TBD, probably the 15th and 16th), camping at Pinnacles National Park.",
      "If you have any ideas or suggestions for future outings this year, please reach out and share them with the PLC.",
    ],
    source: "Troop 394 mailing list, September 2026",
  },
  {
    slug: "spl-elections-2026-akhil-and-jacqueline",
    title: "Akhil and Jacqueline Take Over as Senior Patrol Leaders",
    date: "2026-08-18",
    author: "Akhil",
    kind: "Milestone",
    location: "Sunnyvale Elks Lodge",
    excerpt:
      "SPL elections were held at the August 18 troop meeting; Akhil and Jacqueline now serve as the troop's Senior Patrol Leaders.",
    body: [
      "SPL elections were held during the August 18 troop meeting. To run for SPL, you had to be First Class rank or higher and be prepared to give a 1–2 minute speech explaining why you would be a good candidate for the position. Everyone was encouraged to participate in the election process.",
      "My name is Akhil, and I will be serving as one of the SPLs beginning today along with Jacqueline.",
      "Next week, we will be electing the new PLC for the upcoming year. If you are interested in a leadership role, please email Jacqueline and me with the role you are interested in, a brief explanation of why you would like to serve in that position, and what makes you a good candidate. If you are interested in a leadership role but are unsure which position to choose, there is a document outlining each role, including its description and responsibilities.",
      "I look forward to hearing from you and working with everyone this year, and remember, if you have any questions please do not hesitate to email me.",
    ],
    source: "Troop 394 mailing list, August 2026",
  },
  {
    slug: "eagle-court-of-honor-adriana-chapa",
    title: "Eagle Court of Honor for Adriana",
    date: "2026-08-07",
    author: "David Scharberg",
    kind: "Milestone",
    location: "Sunnyvale Elks Lodge",
    excerpt:
      "The troop gathered on Friday, August 7 to celebrate Adriana achieving the rank of Eagle Scout.",
    body: [
      "It’s an Eagle Court of Honor! We are holding a Court of Honor to celebrate Adriana achieving the rank of Eagle Scout, and I would like all Scouts and their families to come and help us celebrate.",
      "See what you have to look forward to as a Scout when you make Eagle, and parents, what it means for your Scout to be recognized for their accomplishment.",
      "Where: Sunnyvale Elks Lodge (indoors), where we normally meet. When: Friday 7 August 2026. Scouts should arrive by 6:30 PM; the Court of Honor will begin at 7 PM and finish by 8 PM. Attire: Scouts should wear their Class A uniform.",
      "Why should you go? Because it is fun and important to celebrate these important achievements as a Troop.",
    ],
    source: "Troop 394 mailing list, August 2026",
  },
  {
    slug: "summer-camp-2026-camp-hi-sierra",
    title: "What a Summer Camp!",
    date: "2026-07-19",
    author: "David Scharberg",
    kind: "Summer camp",
    location: "Camp Hi-Sierra",
    excerpt:
      "Second place in the campwide games, new Legends in the Saga of Camp Hi-Sierra, and a skit that went off the rails: the Scoutmaster's recap of the 2026 week at camp.",
    body: [
      "Well, it took almost a week for me to recover! What a great summer camp we had! Sreshta was a great SPL! We all really enjoyed our friends who joined us for camp: Harshith, Connor, Claire, Scott, and Dan. Special call out to Claire - thank you so much for giving us a skit! More importantly - thanks for saving it when it went off the rails!",
      "The troop took second place in Campwide games. Alex got his second black bead! (Great job, kiddo.) We have two new legends in the Saga of Camp Hi-Sierra - Jonah and Michelle - and we have a new Great Legend - Jeff Grose.",
      "I really want to thank all of the Scouts and all of the leaders. I really missed going to camp last year, and it was extra special for me to be with you all this year.",
      "Oh yeah... I will have the beads and the Saga binder at the next few meetings - at a minimum, everyone is up for a Crescent Moon (yellow bead) for winning second place in the Campwide games!",
    ],
    source: "Troop 394 mailing list, July 2026",
  },
  {
    slug: "elks-lodge-campout-july-2026",
    title: "Elks Lodge Camping Outing, July 17-18",
    date: "2026-07-17",
    author: "Harshika",
    kind: "Trip report",
    location: "Elks Lodge",
    excerpt:
      "About ten Scouts in two patrols set up camp at the Elks Lodge, cooked pasta and naan pizzas, and shared s'mores around the campfire.",
    body: [
      "We had a fantastic camping trip at the Elks Lodge the other day! We had about 10 Scouts join us, working in two patrols to manage campsite setup and outdoor cooking.",
      "We arrived around 5:30 PM to set up our tents, and by 7:30 PM, the patrols were hard at work on dinner. One group made pasta with marinara sauce, while the other patrol worked together to make naan pizzas. After dinner, a few Scouts gathered firewood to set up a campfire. Everyone enjoyed s'mores, relaxed, and caught up around the fire before turning in for the night.",
      "The next morning, we were up early, preparing breakfast. One patrol enjoyed bagels with cream cheese, while the other made pancakes with whipped cream. We then worked together to clean and pack up camp.",
      "It was a very successful trip, and we can't wait for our next adventure!",
    ],
    source: "Troop 394 mailing list, August 2026",
  },
  {
    slug: "mini-golf-outing-2026",
    title: "Mini Golf Outing at Golfland",
    date: "2026-07-07",
    author: "Harshika",
    kind: "Trip report",
    location: "Golfland USA, Sunnyvale",
    excerpt:
      "Three rival factions, eighteen holes, scores climbing into the stratosphere, and rumors of creative scorekeeping.",
    body: [
      "Troop 394 headed to Golfland USA for an unforgettable day of mini-golf. We met up around 11:00 AM, and the fun began immediately.",
      "The troop split into three rival factions: the adults, the 11:00 AM group, and the 12:00 PM group. Together, we tackled all 18 holes, which took about two hours - though honestly, the course itself wasn't prepared for a troop of our caliber. Our golf balls flew into places they had absolutely never seen before and took way more hits than they ever should have. In fact, as the scores began to climb into the stratosphere, rumors of a little \"creative scorekeeping\" started to circulate, though nothing could ever be officially proven.",
      "It was an incredibly fun outing, and I can say with confidence we will definitely be back for a rematch soon!",
    ],
    source: "Troop 394 mailing list, July 2026",
  },
  {
    slug: "horseback-riding-garrod-farms-group-1",
    title: "Horseback Riding at Garrod Farms (Group 1)",
    date: "2026-06-27",
    author: "Aran",
    kind: "Trip report",
    location: "Garrod Farms, Saratoga",
    excerpt:
      "A two-minute steering lesson, horses that followed the alpha, and an hour on the trail that felt like ten minutes.",
    body: [
      "Horseback riding was very fun as most of us had never done it before. As we arrived there we submitted the forms. After that we got our safety gear on, like helmets. We then got assigned our horses and we got a 2 minute steering lesson.",
      "After that we got on the trail and we kinda didn't have to do anything because our horses followed the alpha. Sometimes the guide would speed up and the horses would run. The experience was so fun that it felt like 10 minutes even though it was 1 hr. Other than the sore backs it was really fun.",
    ],
    source: "Troop 394 mailing list, July 2026",
  },
  {
    slug: "horseback-riding-garrod-farms-group-2",
    title: "Horseback Riding at Garrod Farms (Group 2)",
    date: "2026-06-27",
    author: "Siddharth",
    kind: "Trip report",
    location: "Garrod Farms, Saratoga",
    excerpt:
      "The afternoon session climbed the hillside through shaded forest to panoramic views of the Bay Area and San Jose.",
    body: [
      "Our afternoon at Garrod Farms started when Session 2 began at 2:30 PM. Once our group gathered, the guides quickly stepped in to match everyone up and get us assigned to our horses. Before going on the open trails, we spent some time covering the core safety basics. We learned the fundamental commands needed to steer and handle our animals.",
      "With the quick training out of the way and everyone feeling confident in the saddle, our group headed out and started to go up the hillside. The trail led us into a quiet, shaded forest area. As the horses maintained a steady walking pace through the trees, the tree line began to clear, opening up to reveal very cool, panoramic views of the entire Bay Area and San Jose directly below.",
      "After this, we turned around and began making our way back down the trail toward the stables. By the time we got off, it wrapped up a very fun, memorable one-hour ride that turned out to be the perfect way to spend the afternoon.",
    ],
    source: "Troop 394 mailing list, June 2026",
  },
  {
    slug: "adopt-a-campsite-2026",
    title: "Adopt a Campsite at Camp Hi-Sierra",
    date: "2026-05-23",
    author: "Harshika",
    kind: "Service",
    location: "Camp Hi-Sierra",
    excerpt:
      "Two Scouts and Mr. Scharberg spent a weekend lifting plywood, pitching tents, and earning about ten splinters to get camp ready for summer.",
    body: [
      "This year's Adopt a Campsite event was a huge success! Every year, volunteers head up to Camp Hi-Sierra to help get the grounds ready for the summer camp season. This year, two of our Scouts and Mr. Scharberg made their way up to lend a hand.",
      "Our day began early Saturday at 6:00 AM in the Chili's parking lot. After loading up the gear, we hit the road for the three-hour drive, making a quick stop at McDonald's for breakfast to fuel up for the day ahead.",
      "As soon as we arrived, we were put to work. Our primary role was lifting plywood and pitching tents. We powered through our first shift from 9:30 AM to 12:30 PM, took a quick break for a camp-provided lunch, and then jumped right into shift two from 1:00 PM to 6:15 PM. By the end of the day, we had tied more knots than ever before, earned about 10 splinters, and were covered in dirt, but the camp looked great!",
      "After dinner, we shifted focus to advancement. The Scouts worked on Tenderfoot and Second Class requirements, focusing on tool safety and citizenship. Afterward, we headed over to the rifle range for some target practice, where everyone shot incredibly well.",
      "To wrap up an intense day, the camp treated us to ice cream sundaes and opened up the observatory. It was amazing to look through the telescope and see stars from galaxies that are being absorbed by our own. Even cooler was seeing the Big Dipper completely clear in the mountain sky! Exhausted from a hard day's work, we finally turned in for some well-deserved sleep.",
      "On Sunday, we woke up at 7:00 AM, packed up camp, and ate breakfast before starting Round 2 of work. We spent another three hours helping to finish up two more campsites. We officially hit the road home at 11:00 AM, stopping for Taco Bell along the way, and made it back to the Chili's parking lot by 3:00 PM.",
      "It was a tiring weekend, but a highly rewarding one. We knocked out a ton of rank requirements and helped ensure Camp Hi-Sierra is ready for a fantastic summer!",
    ],
    source: "Troop 394 mailing list, May 2026",
  },
  {
    slug: "mural-eagle-project-wilcox-high-school",
    title: "Eagle Project: Painting a Mural at Wilcox High School",
    date: "2026-05-17",
    author: "Amrita",
    kind: "Service",
    location: "Wilcox High School, Santa Clara",
    excerpt:
      "Amrita's Eagle project is a mural on her school wall representing the practical and fine arts of the buildings around it, and the troop was invited to help paint.",
    body: [
      "For my Eagle project, I’m going to be painting a mural on my school wall that represents the practical and fine arts of the buildings around it. A few people in the troop were interested in helping out with displaying this on the wall. Well, now is that time! This doesn’t have to be Scouts only; it can be adults and friends, too.",
      "I’m going to start working on my Eagle project this Sunday, May 17th, from 2 to 4:30 pm at Wilcox High School. We will start painting the interiors of the objects on the mural. Please come help if you can.",
      "Bring a snack and water since it will be a hot day; you will get hungry! Attire: long pants and sleeves so you don’t get paint on you. Gloves and hairnets will be provided.",
    ],
    source: "Troop 394 mailing list, May 2026",
  },
  {
    slug: "scout-o-rama-2026",
    title: "Volunteering at Scout-O-Rama",
    date: "2026-05-09",
    author: "Akhil",
    kind: "Service",
    location: "Scout-O-Rama, San Jose",
    excerpt:
      "Troop 394 Scouts worked shifts at the council's Scout-O-Rama on May 9, sorting and donating Scouting gear before exploring the fair.",
    body: [
      "Scout-O-Rama is a community event hosted by BSA where Scouts can showcase many cool projects and hands-on activities such as stomp rockets, art and craft, obstacle courses, and many other fun activities. We were looking for Scouts willing to assist at the event; the Scout volunteers would organize the bins, help retrieve uniforms, and assist with filling orders.",
      "Scout-O-Rama was a volunteer-based event held on Saturday, May 9. During the first shift from 10:00 to 12:00, we helped sort and organize bins of Scouting gear to make items easier to find and access. During the second and third shifts, which lasted from 12:00 to 2:00 and 2:00 to 4:00, respectively, we had time to explore the fair, buy food, and visit booths hosted by other Scout troops.",
      "The fair featured a variety of food trucks offering different cuisines, as well as several Scout-run stations with obstacle courses and games that were thoughtfully designed and built. My personal favorite was the IRL Angry Birds game, which was especially fun and creative. At 4:00, the fair ended, and we helped clean up before heading home.",
      "All in all, the troop was successful in donating Scouting gear, and we all had a great time.",
    ],
    source: "Troop 394 mailing list, May 2026",
  },
  {
    slug: "white-water-rafting-2026",
    title: "White Water Rafting Outing",
    date: "2026-04-25",
    author: "Sahasra",
    kind: "Trip report",
    location: "Camp Lotus",
    excerpt:
      "An overnight at the campsite, wetsuits on in the morning, and a cold, windy, rainy run down the river that was still a lot of fun.",
    body: [
      "We departed from the parking lot at 1:00 p.m. and drove for three hours to the campsite, where we unpacked our gear and began setting up the tents. Shortly afterward, we made dinner and attempted to start a campfire, though it only lasted about ten minutes. After spending some time relaxing and hanging out, we went to bed for the night.",
      "The next morning, we packed up all of our belongings and loaded them into the truck before making breakfast and putting on our wetsuits. After driving upstream and attending a quick safety briefing, we got into our rafts. The rafting itself was a lot of fun, although the weather was cold, windy, and rainy. Once we finished rafting, we ate lunch and then headed home.",
    ],
    source: "Troop 394 mailing list, May 2026",
  },
  {
    slug: "camporee-2026",
    title: "Camporee: A Fun Yet Wet Campout",
    date: "2026-04-10",
    author: "Aran",
    kind: "Trip report",
    location: "Camp Chesebrough",
    excerpt:
      "Constant rain, a five-minute campfire, BB gun and archery champions, third place for campsite cleanliness, and an early trip home.",
    body: [
      "Camporee was a fun yet wet campout. Even though it rained constantly, we had a lot of fun. On Friday, we arrived at camp and started setting up our tents and then we had dinner. After that Aran and Vaazhli tried to get a campfire going despite the rain and were able to get it going for 5 to 10 minutes. Then everybody headed to sleep in moist clothes.",
      "On Saturday we all woke up and headed down to flags and we went through an orientation to what was expected throughout the day, and the staff gave us some safety rules. Our first stop was BB gun shooting, in which Vedant was our champion with Vaazhli in second and Aran and Advay tied for 3rd. Vedant got a score of 15 in a target as big as your palm. Then we went to Archery and this time Avi was our champion and he did a very good job. After that was lunch.",
      "After that the news hit us. Camporee was ending a day early. Everybody was happy (by the way, because of their wet clothes). We headed down to the award ceremony and we got 3rd for campsite cleanliness. Then we hurriedly packed our bags and got out of there, and all we were thinking about was a nice warm shower.",
    ],
    source: "Troop 394 mailing list, May 2026",
  },
  {
    slug: "bear-paw-outing-2026",
    title: "Bear Paw Outing at Hi-Sierra",
    date: "2026-01-31",
    author: "Akhil",
    kind: "Trip report",
    location: "Camp Hi-Sierra",
    excerpt:
      "Snowball fights, a snowman, and a lot of Blackjack on the troop's overnight snow trip to Hi-Sierra.",
    body: [
      "During the last weekend of January, we traveled to Hi-Sierra for the Bear Paw Outing and stayed overnight. After arriving, we unloaded the car, unpacked our gear, and set up our tents, which took about one to two hours. We then ate lunch and spent the afternoon playing in the snow until around 5:00 p.m. We had a couple of snowball fights and built a snowman. Afterward, most of the troop went indoors to play board and card games before having dinner. The game we played the most was Blackjack, which we all enjoyed a lot. We continued playing for another two hours and went to sleep at around 10:30 p.m.",
      "The next morning, we woke up at approximately 7:30 a.m., ate breakfast, and packed up our tents and belongings. We departed Hi-Sierra between 11:00 and 11:30 a.m., stopped for lunch around 1:00-1:15 p.m., and left at about 1:45 p.m. Finally, we arrived back at the Chili's parking lot at around 2:45.",
    ],
    source: "Troop 394 mailing list, February 2026",
  },
  {
    slug: "eagle-court-of-honor-eamonn-skylar-josh",
    title: "An Eagle Court of Honor Trifecta: Eamonn, Skylar and Josh",
    date: "2025-12-20",
    author: "David Scharberg",
    kind: "Milestone",
    location: "Sunnyvale Elks Lodge",
    excerpt:
      "Three Troop 394 Eagle Scouts, Skylar, Josh and Eamonn, were honored together on Saturday, December 20.",
    body: [
      "It’s an Eagle Court of Honor Trifecta! We are holding a Court of Honor to celebrate three of our favorite Scouts who earned the rank of Eagle Scout, Skylar, Josh, and Eamonn, and I want all Scouts and their families to come and help us celebrate.",
      "See what you have to look forward to as a Scout when you make Eagle, and parents, what it means for your Scout to be recognized for their accomplishment.",
      "Where: Sunnyvale Elks Lodge (indoors), where we normally meet. When: Saturday 20 December 2025. Scouts should arrive by 12:15; the Court of Honor will begin at 1 PM and finish by 2 PM. Attire: Scouts should wear their Class A uniform.",
      "Why should you go? Because it is fun and important to celebrate these important achievements as a Troop.",
    ],
    source: "Troop 394 mailing list, December 2025",
  },
  {
    slug: "newest-eagle-scout-adriana-chapa",
    title: "Troop 394's Newest Eagle Scout: Adriana",
    date: "2025-12-16",
    author: "David Scharberg",
    kind: "Milestone",
    location: "Troop 394",
    excerpt:
      "Adriana earned the rank of Eagle Scout in December 2025, and the troop family lined up to congratulate her.",
    body: [
      "Please join Bruce and me in congratulating our newest Eagle Scout, Adriana, and her family on this wonderful achievement! Adriana, we are really proud of you!",
      "Congratulations to Adriana and family on this well deserved achievement! We appreciate the hard work and dedication this rank represents. (Susan and Dave Hess)",
      "I am so pleased that you achieved this goal in your life. I look forward to your Eagle Court of Honor. (Jeff)",
    ],
    source: "Troop 394 mailing list, December 2025",
  },
  {
    slug: "december-elks-lodge-campout-2025",
    title: "December Elks Lodge Overnight and Game Truck",
    date: "2025-12-06",
    author: "Akhil",
    kind: "Trip report",
    location: "Elks Lodge",
    excerpt:
      "Tents, a shared dinner, and two to three hours in the game truck at the troop's December overnight.",
    body: [
      "During the first week of December, our troop stayed overnight at the Elks Lodge. We began by setting up our tents and sharing dinner, which lasted about an hour and a half. At around 5:00 p.m., the game truck arrived, and we spent the next two to three hours playing a variety of games. After finishing up with the game truck, we settled in for the night and went to sleep. The following morning, we ate breakfast and helped clean up the campsite before heading home around 10:00 a.m.",
    ],
    source: "Troop 394 mailing list, January 2026",
  },
  {
    slug: "eagle-court-of-honor-sreeya-nair",
    title: "Eagle Court of Honor for Sreeya",
    date: "2025-11-22",
    author: "David Scharberg",
    kind: "Milestone",
    location: "Sunnyvale Elks Lodge",
    excerpt:
      "The troop celebrated Sreeya's Eagle rank with her own Court of Honor on Saturday, November 22.",
    body: [
      "One of the really great things that occurs after a Scout makes the rank of Eagle Scout is that we give them their own, very fun Court of Honor. We are giving a Court of Honor for Sreeya and I want all Scouts and their families to come and help us celebrate.",
      "Where: Sunnyvale Elks Lodge (indoors), where we normally meet. When: Saturday 22 November 2025. Scouts should arrive by 12:30; the Court of Honor will begin at 1 PM and finish by 2 PM. Attire: Scouts should wear their Class A uniform.",
      "For those of you who are wondering why you should go, Scouts and parents alike: this is important! Think of the biggest thing you ever accomplished. Well, for most 18 year olds, this is it! These things need to be celebrated, and they need to be celebrated by all of us.",
      "I 100% guarantee you that I will be at each and every one of our Scouts’ Eagle Courts of Honor; my wish is to have every one of my Scouts help me do so.",
    ],
    source: "Troop 394 mailing list, November 2025",
  },
  {
    slug: "del-valle-campout-2025",
    title: "Del Valle Campout",
    date: "2025-11-15",
    author: "Jacqueline",
    kind: "Trip report",
    location: "Del Valle Regional Park",
    excerpt:
      "Dutch oven pizza with pineapple and jalapeno, cinnamon rolls, and a 5.3-mile hike with views of the lake and autumn scenery.",
    body: [
      "Earlier this month, I attended the Del Valle campout. After arriving, we all set up our tents and then relaxed until dinner. We talked, enjoyed some snacks and drinks, played cards, and explored the creek behind our campsite before it started sprinkling.",
      "For dinner, we had Dutch oven pizza topped with pineapple and jalapeno, which was followed by cinnamon rolls for dessert. In the morning, we packed our tents and had pancakes, hashbrowns, and hot cocoa. After we left the campsite, we set off on our 5.3 mile hike where we had beautiful views of the lake and autumn scenery. All in all, I enjoyed this outing and look forward to the next troop outing.",
    ],
    source: "Troop 394 mailing list, November 2025",
  },
  {
    slug: "troop-394-superstars-elks-dinners",
    title: "Troop 394 Superstars: Serving the Elks",
    date: "2025-11-07",
    author: "Michelle Ray",
    kind: "Service",
    location: "Elks Lodges in Sunnyvale and San Jose",
    excerpt:
      "A shoutout to the Scouts who served at three Elks dinners in late October and early November, and why the troop gladly gives the Elks its service.",
    body: [
      "As David previously mentioned, the third point of the Scout Law is Helpful, and one of the three Duties expressed in the Scout Oath is to help other people at all times. The main service we perform is helping out at Elks dinners as servers.",
      "I want to personally send a shoutout to the following Scouts who were instrumental in making sure the Elks were taken care of during their dinners. Thank you Andrew, Avni, Jacqueline and Aadit for helping on Saturday, October 25th. Thank you Eamonn, Sreeya and Jacqueline for helping on Thursday, November 6th. Thank you Eamonn, Shravya and Sahasra for helping in San Jose, while Sripranav and Advay helped in Sunnyvale on Friday, November 7th.",
      "And a very special thank you to our fellow Scouters David Hertzberg and Kimberly Pantoja for joining us in San Jose on Friday night. We appreciate each of you and heard nothing but compliments about your service. Keep up the good work!",
      "Our Troop is very lucky. While we have no formal relationship with the Elks (they used to be our Charter Organization but are not anymore), the Santa Clara Elks Lodge gave us free access to the Lodge and the back area and patio for troop meetings, Courts of Honor, and camping. When they had the fire at the Lodge, the Sunnyvale Elks took us in and gave us the same free access to the facility and backyard area. Many units have to pay for the use of facilities, or at least janitorial fees. We pay nothing, nothing but service, and we do this gladly because it is fundamental to the Spirit of Scouting.",
    ],
    source: "Troop 394 mailing list, November 2025",
  },
  {
    slug: "parade-of-champions-flag-ceremony-2025",
    title: "Opening Flags at the Santa Clara Parade of Champions",
    date: "2025-10-04",
    author: "Mark Plummer, ASM",
    kind: "Service",
    location: "Franklin Square, Santa Clara",
    excerpt:
      "For the fourth consecutive year, the City of Santa Clara asked Troop 394 to lead the opening flag ceremony at the Parade of Champions.",
    body: [
      "Our Troop 394 has once again been requested to lead the opening flag ceremony at this year’s Santa Clara Parade of Champions. This will be the fourth consecutive year the City has honored us with this privilege. Let’s show our City that we appreciate their trust and recognition of our Troop.",
      "Who: at least four Scouts to hold flags and announce. When: Saturday, October 4, approximately 10:00 to noon. Where: Santa Clara Franklin Square. What: practice presenting flags and leading the pledge in front of the grandstand, wait for City dignitaries to show up, present the flags. Dress: full Class A.",
      "If you can spare just a couple hours for some simple civic engagement, let Bruce know.",
      "It was nice to see everyone at the Court of Honor last night and to see all the advancement that has been made. Part of advancement is volunteering for events. The City of Santa Clara has asked us to help with opening flags for the Parade, and we need help! (Bruce)",
    ],
    source: "Troop 394 mailing list, September 2025",
  },
  {
    slug: "sunset-beach-outing-2025",
    title: "Sunset Beach Outing",
    date: "2025-09-27",
    author: "Zachary",
    kind: "Trip report",
    location: "Sunset State Beach",
    excerpt:
      "A four-mile hike from the Los Gatos library, two deer on the trail, a cold and cloudy beach, and a cozy campfire.",
    body: [
      "During the September outing, we went to Sunset Beach. On Saturday morning, we left for the Los Gatos library, where we began the 4-mile hike. During the hike, we saw 2 deer - a male and a female. Many of the people on the trail were nice when we greeted them, which is always nice to experience when going on a hike. We had intended to do the entire hike up to the dam, but ran short on time, causing us to turn around sooner. When we got back to the library, we met with some other Scouts and had lunch. We also had some of Maureen's cookies, which were delicious like always. Following the agenda, we set out to the campsite/beach.",
      "When we arrived at the Sunset Beach camp parking lot, the sky was cloudy and the wind was cold, but it didn't stop us from going down to the beach. It was cold there, but we still managed to have fun. When night time came around, we had to decide on whether to have a campfire or play flashlight tag. Sadly, we didn't end up playing flashlight tag at night, but we still managed to have a cozy campfire, which lifted our spirits. Perhaps if we had more adult drivers, we could have had way more Scouts come along on this outing and had enough Scouts to play flashlight tag, which is always a highlight of this outing. Sunset Beach is always enjoyable and one of my favorite outings.",
    ],
    source: "Troop 394 mailing list, October 2025",
  },
  {
    slug: "pancake-breakfast-fundraiser-2025",
    title: "Pancake Breakfast at the Santa Clara Art and Wine Festival",
    date: "2025-09-13",
    author: "Avi",
    kind: "Service",
    location: "Central Park, Santa Clara",
    excerpt:
      "Troop 394's annual fundraiser: a pancake breakfast booth at the Santa Clara Art and Wine Festival, September 12–14, 2025.",
    body: [
      "Troop 394’s annual fundraiser occurs during the Santa Clara Art and Wine Festival on 13–14 September. The troop has a booth in the Pavilion on Saturday and Sunday morning.",
      "On September 12th through 14th, Troop 394 did a pancake breakfast at Central Park during the Art and Wine Festival, from 8:30 to 12:00. On Friday the adults were setting up the pancake breakfast booth. On Saturday and Sunday we had half of the troop do the pancake breakfast.",
      "We sold pancakes, sausages and strawberries, and even drinks such as coffee, tea and juice. Even the mayor, Lisa Gillmor, came to support our troop by ordering a pancake breakfast meal.",
      "Overall the pancake breakfast was a success and I think the troop enjoyed working together at this fundraiser.",
    ],
    source: "Troop 394 mailing list, September 2025",
  },
  {
    slug: "newest-eagle-scout-joshua-mechlin",
    title: "Troop 394's Newest Eagle Scout: Joshua",
    date: "2025-09-02",
    author: "David Scharberg",
    kind: "Milestone",
    location: "Troop 394",
    excerpt:
      "Josh earned Eagle in September 2025, joining his twin brother, his older brother and his father in the brotherhood of Eagle Scouts.",
    body: [
      "Please join Bruce and me as we congratulate Josh and his family on this great achievement. Josh joins his twin brother, Skylar; his older brother, Zach; and his father, Dane, in the brotherhood and sisterhood of Eagle Scouts!",
      "Josh, your father would be so proud of you, just as I am! Well done!",
      "Way to go Josh! Your accomplishment is a reflection of your hard work, perseverance, and commitment! Congratulations to all the whole family! ",
    ],
    source: "Troop 394 mailing list, September 2025",
  },
  {
    slug: "newest-eagle-scout-skylar-mechlin",
    title: "Troop 394's Newest Eagle Scout: Skylar",
    date: "2025-07-29",
    author: "David Scharberg",
    kind: "Milestone",
    location: "Troop 394",
    excerpt:
      "Skylar achieved the highest rank in Scouting in July 2025 after two years of hard work toward the goal.",
    body: [
      "Please join Bruce and me in congratulating Skylar and his family on achieving the highest rank in Scouting, Eagle Scout!",
      "Skylar has worked very hard these last two years to make this goal a reality. He has shown all of the qualities of an Eagle Scout, and I know that I speak for his dad when I say that we are very proud to have you join us as our brother Eagle Scout!",
      "Congratulations Skylar and family! We appreciate the hard work and dedication this achievement represents. (Susan and Dave Hess)",
    ],
    source: "Troop 394 mailing list, July 2025",
  },
  {
    slug: "camp-hi-sierra-2025",
    title: "Camp Hi-Sierra Write-Up",
    date: "2025-07-20",
    author: "Siddharth",
    kind: "Summer camp",
    location: "Camp Hi-Sierra",
    excerpt:
      "A first-timer expected bugs, dust, and no internet, and came home having panned for gold, fixed a trail, and made the whole camp laugh.",
    body: [
      "At first, when I was told about Camp Hi-Sierra, I thought it wouldn't be very fun as bugs, dust, and the thought of no internet for a week entered my mind. However, after going there, my opinion has definitely changed. The camp was way bigger than I expected. There were spots for everything, and they even had a full lake where we could go swimming during free time. All the Scouts, troops, and staff were really welcoming and easy to get along with. The staff were nice and they always helped us out too.",
      "I took some fun merit badge classes during the week, like swimming and first aid, and I actually learned a lot. Outside of class, we got to do gold panning, archery, rifle shooting, and open swim in the lake, which were all really fun. There was always something going on, so it never got boring. One of the biggest things we did was a two-day service project, where we helped fix up a trail that hadn't been used in a long time. It was hard work, but it felt good to be part of something important. We also had daily jobs, like cleaning up our campsite and setting up for meals. Also, the food was delicious, which is something I didn't expect from camp, but every meal was pretty tasty and filling.",
      "At night, we had campfire games, camp-wide competitions, and even put on a funny troop trivia skit that made the entire camp laugh. Summing it all up, Camp Hi-Sierra was very fun. I learned new things, made new friends, ate great food, and had a ton of fun. I'm glad I went, and I can't wait to go back next year.",
    ],
    source: "Troop 394 mailing list, August 2025",
  },
  {
    slug: "newest-eagle-scout-sreeya-nair",
    title: "Troop History: Sreeya Is Our First Girl to Earn Eagle",
    date: "2025-07-15",
    author: "David Scharberg",
    kind: "Milestone",
    location: "Troop 394",
    excerpt:
      "Sreeya became the first girl to earn the rank of Eagle Scout in Troop 394 in July 2025.",
    body: [
      "Please join Bruce and me as we congratulate Sreeya and her family on achieving the ultimate rank in Scouting, Eagle Scout. Sreeya is a wonderful Scout and a good youth leader, and sets good examples in service to her brother and sister Scouts.",
      "Also, fun fact: Sreeya is the first girl to become an Eagle Scout in Troop 394. All of the other girls that made this rank were in Troop 2394, but for this year we have been in a pilot combined-gender troop program, and Sreeya has set a little T394 history tonight. Congratulations.",
      "This milestone is earned by only about 6% of Scouts nationwide; it is a rare and distinguished achievement that reflects years of dedication, leadership, and service to others. I’m especially happy for Sreeya, who will always hold the historic honor of being the first young woman in Troop 394 to attain the rank of Eagle Scout. That distinction makes a bit of troop history and sets a powerful example for those who follow. (Andrew Ratermann, Executive Board Member, Silicon Valley Monterey Bay Council)",
    ],
    source: "Troop 394 mailing list, July 2025",
  },
  {
    slug: "eagle-court-of-honor-robert-ray-charaka-kudituwakku",
    title: "Eagle Court of Honor for Robert and Charaka",
    date: "2025-06-01",
    author: "David Scharberg",
    kind: "Milestone",
    location: "Sunnyvale Elks Lodge",
    excerpt:
      "Two Troop 394 Eagle Scouts, Robert and Charaka, were recognized at a Sunday Court of Honor at the Elks Lodge.",
    body: [
      "We are having an Eagle Court of Honor to recognize and celebrate Robert and Charaka having achieved the rank of Eagle Scout. I strongly encourage all Scouts and their parents to join us in this celebration. The Court of Honor will take about one hour.",
      "Where: Sunnyvale Elks Lodge, where we have troop meetings, but indoors this time. When: Sunday 1 June 2025. Scouts should be there by 11:15 to help set up and practice. The Court of Honor starts at noon, or when Mayor Gillmor arrives.",
      "Who should attend: Scouts and their family. What to wear: Class A uniform, Scouts and leaders.",
    ],
    source: "Troop 394 mailing list, May 2025",
  },
  {
    slug: "newest-eagle-scout-eamonn-donnelly",
    title: "Troop 394's Newest Eagle Scout: Eamonn",
    date: "2025-04-09",
    author: "David Scharberg",
    kind: "Milestone",
    location: "Troop 394",
    excerpt:
      "Eamonn, the troop's former Senior Patrol Leader and Order of the Arrow Representative, earned Eagle in April 2025.",
    body: [
      "Please join Bruce and me as we congratulate Eamonn and his parents upon his achievement of the highest rank in Scouting, Eagle Scout.",
      "Eamonn has been a model Scout and has served the troop and other Scouts well during his career. He has been our Order of the Arrow Representative, and his last troop position was Senior Patrol Leader, where he introduced some novel ideas for the PLC. Eamonn has worked on staff at Camp Hi-Sierra, and I am extremely proud of him.",
      "It has been a wonderful thing to witness the growth in this Scout. Continue on this path and I am sure you will achieve success in all that you do! (Jeff)",
    ],
    source: "Troop 394 mailing list, April 2025",
  },
  {
    slug: "egyptian-museum-elks-lodge-campout-2025",
    title: "Egyptian Museum and Elks Lodge Campout",
    date: "2025-02-15",
    author: "Sahasra",
    kind: "Trip report",
    location: "Rosicrucian Egyptian Museum, San Jose, and the Elks Lodge",
    excerpt:
      "Artifacts at the Egyptian Museum, a pesto pasta lesson learned the hard way, s'mores, and scary stories from Mr. Scharberg.",
    body: [
      "The troop went on an outing to the Egyptian Museum followed by a campout. We started the day at the Egyptian Museum, where we got to see several interesting artifacts and displays. After spending some time exploring, we headed out and regrouped at 5 p.m. at the Elks to set up our tents, which went pretty smoothly.",
      "Then came dinner. The plan was simple - pesto pasta. We decided to cook the premade sauce, which, in retrospect, was a bad decision. After some minor struggles, we still managed to pull together a decent meal. The boys handled cleanup, and then it was time for s'mores. As we sat around the campfire, Mr. Scharberg told some scary stories, making for a fun way to end the night. After cleaning up, we headed to our tents and went to sleep.",
      "The next morning, we made French toast for breakfast, packed up our tents, and left around 9 a.m. Overall, it was a great outing and I'm looking forward to the next one!",
    ],
    source: "Troop 394 mailing list, February 2025",
  },
  {
    slug: "bowling-outing-2025",
    title: "Bowling Outing",
    date: "2025-02-02",
    author: "Joshua",
    kind: "Trip report",
    location: "Homestead Bowl & X Bar",
    excerpt:
      "A Sunday morning at the lanes that proved the troop has some great bowlers.",
    body: [
      "I'm happy to share that our bowling outing went well. Everyone who attended seemed to have a great time, and I hope we can do it again. I also learned that I'm not the best bowler - but we definitely have some great bowlers in the troop! We went to Homestead Bowl & X Bar, which turned out to be a great bowling alley, though a bit tricky to find since it looks like a grocery store from the outside.",
    ],
    source: "Troop 394 mailing list, February 2025",
  },
  {
    slug: "summer-camp-camp-hi-sierra-2015",
    title: "Summer Camp at Camp Hi-Sierra",
    date: "2015-07-26",
    author: "Ryota",
    kind: "Summer camp",
    location: "Long Barn, Stanislaus National Forest",
    excerpt:
      "Six nights at the council camp, a week of merit badges, and first place in the camp-wide games, two years running.",
    body: [
      "What sounds like a battleground was actually the free shoot at Camp Hi-Sierra, the wonderful camp for Scouts to do rank advancements, merit badges, archery, rifle shooting, and tribe business. Our troop goes there every July for a week for summer camp.",
      "Camp Hi-Sierra is a memorable experience for Scouts and Scoutmasters of all ages and rank. We meet new people every year and we get to talk to them. We work hard on merit badges as easy as pulp and paper to those as hard as camping. It is run by Venture Scouts, high schoolers and college students.",
      "We arrived at the camp with 28 kids and some Scoutmasters and parents on Sunday. We got a warm welcome from the staffers, led by Bruce Lee. Our Scoutmaster, not the martial arts person. Sunday ended with a superb campfire set up by the staffers for us. We even had a melodrama.",
      "From Monday to Thursday we worked on merit badges in something that looks like a high school schedule with all of those periods. I had six merit badges to work on: cooking, camping, wilderness survival, nature, and weather. I have always made friends by doing classes with people.",
      "When we had free time, there was free shoot for archery and open shoot for rifles. I usually went to free shoot just to shoot some arrows at targets, which I like to pretend are the nine Nazgûl black riders or blobfishes.",
      "Every day we had campfires too. We always have a fire marshal and a host. I got to host and take care of the fire once, and it was embarrassing, I ended up burning a kind letter to my favourite staffer in front of everyone. Lesson: never let Ryota host a campfire, but let him be the fire marshal.",
      "The last full day of camp was what we were all prepared for: camp-wide games. We got first, the second year in a row. Troop 394 for the win! Then there was the closing campfire, where we got to make our own skits and act them out in front of the other troops. Finally, for those ranking up in the Tribe of Hi-Sierra, we had a night of silence.",
      "When we had to leave on Saturday, everyone was sad. If only we had a few more days.",
    ],
    source: "Troop 394 wiki, September 2015",
  },
  {
    slug: "wilderness-survival-campout-2015",
    title: "Annual Wilderness Survival Campout",
    date: "2015-09-26",
    author: "Mihir",
    kind: "Trip report",
    location: "Camp Pico Blanco, Monterey County",
    excerpt:
      "A tarp, some sticks, a few trash bags, and a fire-making contest won with a magnifying glass.",
    body: [
      "On Saturday, September 26th we drove up to Camp Pico Blanco in Carmel for our annual wilderness survival campout. After roughly a two hour drive we arrived at our campsites. After unpacking and a quick lunch, everybody got started on their shelters.",
      "We constructed our shelters with meagre supplies: sticks, a tarp and a few trash bags. Even without a lot of building materials, many people constructed cool shelters. Riley even made a hammock.",
      "After we were done with our shelters we decided to have a fire making contest. Eric and I set up individual fire making stations and made sure the new Scouts didn't hurt themselves. Angel won the competition by using his trusty magnifying glass to start a fire.",
      "After the fire making competition, some Scouts decided to explore the creek next to our campsites. We went all the way upriver until we hit the dam. When we got back to camp we were met by a large campfire that some of the Scouts had made. Everyone made themselves a “dinner” from their snacks and leftovers from lunch.",
      "After about two hours of sitting around the campfire and listening to Ryota's stories, most of the Scouts decided to head back to their shelters and try to get some sleep. The next morning we packed up, took a group picture and headed home. Overall it was a fun campout.",
    ],
    source: "Troop 394 wiki, October 2015",
  },
  {
    slug: "yosemite-october-2015",
    title: "The Wettest Campout Ever",
    date: "2015-10-17",
    author: "Brendan",
    kind: "Trip report",
    location: "Yosemite National Park",
    excerpt:
      "Rain from one in the morning until ten. People woke up to floating tents. Everyone had fun anyway.",
    body: [
      "On October 17 and 18, Scouts from Troop 394 were going to experience their wettest campout ever. The troop left early morning and stopped for breakfast. On the way there it was dark and cloudy. Driving through the areas which had been burned by fires seemed like driving through a dark gloomy forest of witchcraft.",
      "The troop got to Yosemite and it was not raining. On the way through the park we got to see a controlled burn. We parked in the parking lot and headed to the trailhead, and at the trailhead it started to pour.",
      "The hiking group continued the hike while the group exploring the valley got on the bus. The valley group explored the gift shop and museum in Yosemite Village; the hiking group kept going to Nevada Fall. The valley group enjoyed lunch indoors while praying the others were okay in the thunder. The hiking group had to eat lunch in a thunderstorm.",
      "The valley group went on to Yosemite Falls, and it stopped raining. Everyone arrived back at the parking lot around 2:30. At 3:00 we went and got our campsites. Everyone set up their tent and had dinner.",
      "The next morning at 1:00 it started raining. It never stopped until 10:00. So many people awoke to floating tents, the whole campsite was flooded. Everyone had fun though, even though when they got home everything was muddy.",
    ],
    source: "Troop 394 wiki, December 2015",
  },
  {
    slug: "sequoia-kings-canyon-2015",
    title: "Sequoia and Kings Canyon",
    date: "2015-06-17",
    author: "Ryota",
    kind: "Trip report",
    location: "Sequoia National Park",
    excerpt: "Crystal Cave with a ranger, the climb up Moro Rock, and the largest tree on earth.",
    body: [
      "Sequoia trees everywhere, and the relaxing view from Moro Rock. That is what our trip to Sequoia and Kings Canyon was like.",
      "We first went to Crystal Cave on a tour led by a ranger. She led us through all of the rooms carved out by years of water erosion. That was about to be the highlight, but that was only the beginning.",
      "The next day we set out on an even more intense experience: Moro Rock. It is a titanic dome of rock that protrudes from the mountain. And yes, there were a lot of scares and thrills, like seeing thousands of feet down.",
      "Then we visited the best part of the park: the General Sherman tree. It is the largest tree in the world and it is a few hundred feet tall.",
      "After all of this and that, our troop decided to go shopping for gifts and to leave the park. So that concludes the trip, from June 17 to the 19th.",
    ],
    source: "Troop 394 wiki, September 2015",
  },
  {
    slug: "elks-lodge-campout-game-night",
    title: "Elks Lodge Campout and Game Night",
    date: "2015-12-19",
    author: "Brendan",
    kind: "Trip report",
    location: "Santa Clara Elks Lodge",
    excerpt:
      "Firem'n Chit at 3:30, far too much pizza, ten flags retired, and a fire that ran to midnight.",
    body: [
      "On December 19 and 20th Troop 394 held its yearly game night campout. At 3:30 they started by doing Firem'n Chit. Many Scouts earned their Firem'n Chit, though one of us did have some trouble keeping it under control.",
      "At dinner everyone ate tons of pizza, but surprisingly we still had 23 boxes left over.",
      "That night we retired around ten flags. We had a great fire that lasted until midnight. In late morning everyone left.",
    ],
    source: "Troop 394 wiki, January 2016",
  },
  {
    slug: "family-camp-grant-ranch-2017",
    title: "Family Camp at Grant Ranch",
    date: "2017-08-26",
    author: "Thomas",
    kind: "Trip report",
    location: "Joseph D. Grant County Park",
    excerpt:
      "A five-mile hike in near 100-degree heat, cries of joy at a water spigot, and a new troop member named Tyrone.",
    body: [
      "On Saturday, August 26, Scouts and their families drove up to Grant Ranch for the annual family campout and hike. The first thing we did was the hike. It was only a five-miler, but in near 100 degree weather it was a challenge. Many Scouts had to share water, and were sweating buckets after a couple of hours.",
      "We ate lunch in a shaded creek bed and continued hiking. The Scouts were running out of water, so we decided to go pick up water at some campsites. There were cries of joy as the dusty, sweaty group saw the water spigot. Some of the wise adults who had decided not to join the hike drove to those campsites and picked up some of the more tired Scouts.",
      "The now very small group continued for less than half an hour before getting to the parking lot. We then drove up to our own campsites and had dinner. There was a large, loud campfire that lasted until quiet time. It seemed like you would be able to hear the Scouts singing from miles away.",
      "We also got a new member in our troop. Tyrone, a large triangular rock, was picked up during the hike and carried to the campsite. The next morning we packed up and left. It was a campout we all would remember.",
    ],
    source: "Troop 394 wiki, 2017",
  },
  {
    slug: "fishing-at-del-valle-2019",
    title: "Fishing at Del Valle",
    date: "2019-01-26",
    author: "Michael",
    kind: "Trip report",
    location: "Lake Del Valle",
    excerpt:
      "Two flat-bottomed boats, a lot of enthusiasm, and not one single fish.",
    body: [
      "This month's camping trip was to Del Valle. The Scouts took off early in the morning and got there about mid noon. Then they whipped out their gleaming fishing rods. The adults accompanying them gave them a quick lesson on how to put the line on, then the Scouts hit the water.",
      "They boarded two flat-bottomed boats, then set out to find the best fishing spots. They had a lot of fun, but sadly did not catch any fish. A couple of hours later they got back to shore and drove to their campsites.",
      "They spent a while hanging out, then got to cooking. Despite some difficulties and lack of resources, all of the patrols made their meals. Some of the cooking did not work out, but luckily one of our Scoutmasters had made a really good catfish dish along with some other good food, and he was kind enough to share it.",
      "The next day the Scouts made breakfast, cleaned up, packed up, and left. Overall it was a good campout, even though no one caught any fish.",
    ],
    source: "Troop 394 wiki and the troop's KindredPix group, February 2019",
  },
  {
    slug: "chs-work-weekend-2020",
    title: "Work Weekend at Camp Hi-Sierra",
    date: "2020-08-14",
    author: "A Scout of Troop 394",
    kind: "Service",
    location: "Camp Hi-Sierra",
    excerpt:
      "The first campout of the pandemic that wasn't virtual, masks, distance, and a lot of cleaning.",
    body: [
      "We arrived at Camp Hi-Sierra on Friday. Wow, who knew it was that big!",
      "It was the first campout that wasn't virtual, and the first campout where we had to social distance and wear masks. The purpose of the weekend was to clean up Camp Hi-Sierra. Everyone worked very hard.",
      "Throughout the weekend we were provided with delicious meals. Fortunately, no one had to perform first aid during the work weekend. I hope we can do this again.",
    ],
    source: "Troop 394 wiki, 2020",
  },
];

/** Newest first, what the blog index and the feed both want. */
export const blogPostsByDate = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));

export function findPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
