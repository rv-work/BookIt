import dotenv from "dotenv";
import Experience from "../models/Experience.js";
import PromoCode from "../models/PromoCode.js";
import { connectDB } from "../DB/ConnectDB.js";

dotenv.config();

connectDB();

const seedExperiences = async () => {
  try {
    await Experience.deleteMany({});
    console.log("Cleared existing experiences");

    const timeSlots = [
      "06:00 am",
      "08:00 am",
      "10:00 am",
      "12:00 pm",
      "02:00 pm",
      "04:00 pm",
    ];

    const generateSlots = () => {
      const today = new Date();

      return Array.from({ length: 6 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        return {
          date,
          times: [...timeSlots],
          availableSpots: Math.floor(Math.random() * 20),
        };
      });
    };

    const experiences = [
      {
        title: "Kayaking Adventure",
        location: "Udupi",
        price: 999,
        image:
          "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=500&h=300&fit=crop",
        description:
          "Experience thrilling kayaking adventures through pristine waters with professional guides and safety equipment provided.",
        fullDescription:
          "Immerse yourself in nature as you kayak through beautiful mangroves, guided by certified professionals ensuring complete safety and unforgettable memories.",
        includes: [
          "Certified instructor",
          "Safety equipment",
          "Snacks",
          "Photo session",
        ],
        slots: generateSlots(),
      },

      {
        title: "Coorg Coffee Trail",
        location: "Coorg",
        price: 1499,
        image:
          "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=500&h=300&fit=crop",
        description:
          "Explore authentic coffee production from bean to brew in the lush plantations of beautiful Coorg region.",
        fullDescription:
          "A comprehensive learning tour inside sprawling coffee plantations with expert guides explaining the entire coffee making process from cultivation to brewing.",
        includes: [
          "Tasting session",
          "Snacks",
          "Local guide",
          "Transport inside plantation",
        ],
        slots: generateSlots(),
      },
      {
        title: "Boat Cruise Sunset Ride",
        location: "Bandipur",
        price: 999,
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
        description:
          "Enjoy a peaceful evening cruise with stunning sunset views and opportunities for wildlife spotting in nature.",
        fullDescription:
          "Experience serene boat cruising with spectacular sunset views, wildlife observation opportunities, refreshing drinks and gentle evening breeze for complete relaxation.",
        includes: ["Guide", "Refreshments", "Life jackets", "Binoculars"],
        slots: generateSlots(),
      },
      {
        title: "Bungee Jumping Experience",
        location: "Mysore",
        price: 1999,
        image:
          "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=300&fit=crop",
        description:
          "Feel the ultimate adrenaline rush with safe bungee jumping under international safety standards and professional supervision.",
        fullDescription:
          "Experience the thrill of bungee jumping with internationally certified safety equipment, professional trainers and comprehensive safety measures for maximum adventure.",
        includes: [
          "Video recording",
          "Certified trainer",
          "Safety harness",
          "First-aid support",
        ],
        slots: generateSlots(),
      },
      {
        title: "Scuba Diving",
        location: "Goa",
        price: 3999,
        image:
          "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=500&h=300&fit=crop",
        description:
          "Discover amazing underwater marine life and coral reefs with professional diving instructors and complete equipment.",
        fullDescription:
          "Professional scuba diving session designed for beginners with certified instructors, complete equipment and underwater photography to capture memorable marine experiences.",
        includes: ["Underwater photos", "Scuba gear", "Boat ride", "Snacks"],
        slots: generateSlots(),
      },
      {
        title: "Hot Air Balloon Ride",
        location: "Jaipur",
        price: 5999,
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=300&fit=crop",
        description:
          "Soar above majestic desert landscapes and historic palaces in a romantic hot air balloon adventure experience.",
        fullDescription:
          "Experience breathtaking aerial views of Rajasthan's desert landscapes and magnificent palaces during a romantic sunrise hot air balloon ride with refreshments.",
        includes: ["Pilot guide", "Safety equipment", "Tea & coffee"],
        slots: generateSlots(),
      },
      {
        title: "Camel Safari",
        location: "Jaisalmer",
        price: 1299,
        image:
          "https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?w=500&h=300&fit=crop",
        description:
          "Ride through golden sand dunes on authentic camels and experience traditional desert culture with local guides.",
        fullDescription:
          "Authentic desert camel safari experience through golden dunes with local guides, traditional cultural shows and stunning sunset views over Thar Desert.",
        includes: ["Guide", "Refreshments", "Camel ride", "Cultural show"],
        slots: generateSlots(),
      },
      {
        title: "River Rafting",
        location: "Rishikesh",
        price: 1599,
        image:
          "https://images.unsplash.com/photo-1520262494112-9fe481d36ec3?w=500&h=300&fit=crop",
        description:
          "Navigate thrilling white water rapids with certified instructors and complete safety equipment for ultimate adventure.",
        fullDescription:
          "Exhilarating white water rafting experience on Ganges river with certified professional instructors, complete safety equipment and guided navigation through exciting rapids.",
        includes: ["Raft gear", "Life jacket", "Helmet", "Guide"],
        slots: generateSlots(),
      },
      {
        title: "Skydiving",
        location: "Mysore",
        price: 24999,
        image:
          "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=500&h=300&fit=crop",
        description:
          "Experience the ultimate once in lifetime tandem skydiving adventure with professional crew and safety equipment.",
        fullDescription:
          "Ultimate tandem skydiving experience with internationally certified professional crew, complete safety equipment and high-definition video recording of your incredible freefall adventure.",
        includes: ["Freefall video", "Parachute gear", "Trainer"],
        slots: generateSlots(),
      },

      {
        title: "Cave Exploration",
        location: "Meghalaya",
        price: 1399,
        image:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop",
        description:
          "Explore mysterious hidden caves and underground formations with experienced guides and proper safety equipment provided.",
        fullDescription:
          "Adventure cave exploration through mysterious underground formations with experienced local guides, proper safety equipment and refreshing snacks during the expedition.",
        includes: ["Guide", "Helmet", "Snacks"],
        slots: generateSlots(),
      },
      {
        title: "Snow Trekking",
        location: "Manali",
        price: 2499,
        image:
          "https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&h=300&fit=crop",
        description:
          "Trek through pristine snow covered Himalayan trails with professional guides and complete trekking equipment provided.",
        fullDescription:
          "Experience thrilling Himalayan snow trekking through pristine mountain trails with professional guides, complete trekking equipment and nutritious meals throughout the expedition.",
        includes: ["Trekking gear", "Guide", "Meals"],
        slots: generateSlots(),
      },

      {
        title: "Dudhsagar Trek",
        location: "Goa",
        price: 1499,
        image:
          "https://images.unsplash.com/photo-1542372147193-a7aca54189cd?w=500&h=300&fit=crop",
        description:
          "Trek through dense forests to reach the spectacular Dudhsagar waterfall with experienced guides and refreshments.",
        fullDescription:
          "Scenic trekking trail through dense tropical forests leading to the magnificent Dudhsagar waterfall with experienced guides and refreshing snacks.",
        includes: ["Guide", "Snacks", "Permit"],
        slots: generateSlots(),
      },
      {
        title: "Scenic Cycling",
        location: "Pondicherry",
        price: 799,
        image:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop",
        description:
          "Cycle through charming French colonial streets and beautiful coastal roads with quality bikes and safety equipment.",
        fullDescription:
          "Morning cycling tours through picturesque French colonial architecture and stunning coastal roads with quality bicycles, safety equipment and delicious breakfast.",
        includes: ["Cycle", "Helmet", "Breakfast"],
        slots: generateSlots(),
      },
      {
        title: "Surfing Lessons",
        location: "Puducherry",
        price: 1599,
        image:
          "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=500&h=300&fit=crop",
        description:
          "Learn professional surfing techniques from certified instructors with quality surfboards and complete safety equipment provided.",
        fullDescription:
          "Professional surfing lessons for beginners with certified expert coaches, quality surfboards, complete safety equipment and technique guidance for safe wave riding.",
        includes: ["Surfboard", "Instructor", "Safety gear"],
        slots: generateSlots(),
      },
      {
        title: "ATV Adventure",
        location: "Ladakh",
        price: 2799,
        image:
          "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&h=300&fit=crop",
        description:
          "Ride powerful ATVs across rugged Ladakh terrain and stunning mountain landscapes with professional guides and equipment.",
        fullDescription:
          "High-adrenaline ATV riding adventure across breathtaking Ladakh landscapes and rugged mountain terrain with professional guides, safety equipment and powerful vehicles.",
        includes: ["ATV vehicle", "Guide", "Helmet"],
        slots: generateSlots(),
      },
    ];

    const createdExperiences = await Experience.insertMany(experiences);
    console.log(`✅ Created ${createdExperiences.length} experiences ✅`);
  } catch (error) {
    console.error("❌ Error seeding experiences:", error);
  }
};

const seedPromoCodes = async () => {
  try {
    await PromoCode.deleteMany({});
    console.log("Cleared existing promo codes");

    const promoCodes = [
      {
        code: "SAVE10",
        discount: 10,
        type: "percentage",
        isActive: true,
        validFrom: new Date(),
        validUntil: new Date("2025-12-31"),
        usageLimit: 100,
        usageCount: 0,
      },
      {
        code: "FLAT100",
        discount: 100,
        type: "fixed",
        isActive: true,
        validFrom: new Date(),
        validUntil: new Date("2025-12-31"),
        usageLimit: 50,
        usageCount: 0,
      },
      {
        code: "WELCOME20",
        discount: 20,
        type: "percentage",
        isActive: true,
        validFrom: new Date(),
        validUntil: new Date("2025-12-31"),
        usageLimit: 200,
        usageCount: 0,
      },
    ];

    const createdPromoCodes = await PromoCode.insertMany(promoCodes);
    console.log(`Created ${createdPromoCodes.length} promo codes`);
  } catch (error) {
    console.error("Error seeding promo codes:", error);
  }
};

const seedDatabase = async () => {
  await connectDB();
  await seedExperiences();
  await seedPromoCodes();

  console.log("Database seeded successfully!");
  process.exit(0);
};

seedDatabase();
