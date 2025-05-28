using Microsoft.AspNetCore.Mvc;
using OfferSuite.Model;

namespace OfferSuite.Controllers{

    [Route("customer")]
    public class CustomerController : Controller
    {

        public IActionResult Index(){

            return View("CustomerIndex");
        }

        [HttpGet("retrieve-inventory")]
        public IActionResult RetrieveVehicleInventory() {

            var inventory = new List<InventoryModel>();

            // Car 1: Volvo V60 (Newish Electric Hybrid)
            inventory.Add(new InventoryModel
            {
                Id = 1,
                Make = "Volvo",
                Model = "V60 Recharge",
                Year = 2023,
                Price = 529000M,
                MileageMil = 800, // 800 mil = 8000 km
                FuelType = "Laddhybrid",
                Transmission = "Automat",
                BodyType = "Kombi",
                Color = "Onyx Svart Metallic",
                Description = "Elegant och rymlig laddhybrid med låg bränsleförbrukning och imponerande prestanda. Fullutrustad med navigation och panoramaglastak.",
                ImageUrls = new List<string>
                {
                    "https://example.com/images/volvo-v60-1.jpg",
                    "https://example.com/images/volvo-v60-2.jpg",
                    "https://example.com/images/volvo-v60-int.jpg"
                },
                DateAdded = DateTime.UtcNow.AddDays(-10),
                Features = new List<string> { "Navigation", "Panoramaglastak", "Parkeringsassistans" }
            });

            // Car 2: Volkswagen Golf (Popular Hatchback)
            inventory.Add(new InventoryModel
            {
                Id = 2,
                Make = "Volkswagen",
                Model = "Golf 1.5 TSI",
                Year = 2021,
                Price = 215000M,
                MileageMil = 3400, // 3400 mil = 34000 km
                FuelType = "Bensin",
                Transmission = "Manuell",
                BodyType = "Halvkombi",
                Color = "Urano Grå",
                Description = "Bränslesnål och pålitlig Golf med adaptiv farthållare och App-Connect.",
                ImageUrls = new List<string>
                {
                    "https://example.com/images/vw-golf-1.jpg",
                    "https://example.com/images/vw-golf-2.jpg"
                },
                DateAdded = DateTime.UtcNow.AddDays(-5),
                Features = new List<string> { "Adaptiv farthållare", "Apple CarPlay", "Sätesvärme" }
            });

            // Car 3: Audi Q5 (Premium SUV)
            inventory.Add(new InventoryModel
            {
                Id = 3,
                Make = "Audi",
                Model = "Q5 40 TDI Quattro",
                Year = 2020,
                Price = 389000M,
                MileageMil = 6200, // 6200 mil = 62000 km
                FuelType = "Diesel",
                Transmission = "Automat",
                BodyType = "SUV",
                Color = "Mytsvart Metallic",
                Description = "Fyrhjulsdriven SUV med hög komfort och avancerad teknik. Perfekt för familjen och längre resor.",
                ImageUrls = new List<string>
                {
                    "https://example.com/images/audi-q5-1.jpg",
                    "https://example.com/images/audi-q5-int.jpg",
                    "https://example.com/images/audi-q5-3.jpg"
                },
                DateAdded = DateTime.UtcNow.AddDays(-15),
                Features = new List<string> { "Fyrhjulsdrift", "Dragkrok", "Parkeringssensorer fram/bak" }
            });

            // Car 4: Toyota Yaris (Compact Hybrid)
            inventory.Add(new InventoryModel
            {
                Id = 4,
                Make = "Toyota",
                Model = "Yaris 1.5 Hybrid",
                Year = 2022,
                Price = 199000M,
                MileageMil = 1500, // 1500 mil = 15000 km
                FuelType = "Hybrid",
                Transmission = "Automat",
                BodyType = "Halvkombi",
                Color = "Pärlvit",
                Description = "Extremt bränslesnål och smidig hybrid för stadskörning. Låg skatt och pålitlig teknik.",
                ImageUrls = new List<string>
                {
                    "https://example.com/images/toyota-yaris-1.jpg",
                    "https://example.com/images/toyota-yaris-2.jpg"
                },
                DateAdded = DateTime.UtcNow.AddDays(-2),
                Features = new List<string> { "Klimatanläggning", "Backkamera", "Filbytesvarnare" }
            });

            // Car 5: BMW 320d (Sporty Sedan)
            inventory.Add(new InventoryModel
            {
                Id = 5,
                Make = "BMW",
                Model = "320d",
                Year = 2019,
                Price = 245000M,
                MileageMil = 8900, // 8900 mil = 89000 km
                FuelType = "Diesel",
                Transmission = "Automat",
                BodyType = "Sedan",
                Color = "Mineralgrå Metallic",
                Description = "Sportig och ekonomisk sedan med utmärkt körkänsla. Nyservad och redo för omgående leverans.",
                ImageUrls = new List<string>
                {
                    "https://example.com/images/bmw-320d-1.jpg",
                    "https://example.com/images/bmw-320d-int.jpg"
                },
                DateAdded = DateTime.UtcNow.AddDays(-8),
                Features = new List<string> { "Sportstolar", "Parkeringssensorer", "LED-strålkastare" }
            });

            // Car 6: Skoda Octavia (Practical Wagon)
            inventory.Add(new InventoryModel
            {
                Id = 6,
                Make = "Skoda",
                Model = "Octavia Kombi 1.0 TSI",
                Year = 2021,
                Price = 185000M,
                MileageMil = 4100, // 4100 mil = 41000 km
                FuelType = "Bensin",
                Transmission = "Manuell",
                BodyType = "Kombi",
                Color = "Magic Svart Metallic",
                Description = "Rymlig och praktisk kombi med låg bränsleförbrukning. Perfekt som familjebil.",
                ImageUrls = new List<string>
                {
                    "https://example.com/images/skoda-octavia-1.jpg",
                    "https://example.com/images/skoda-octavia-2.jpg"
                },
                DateAdded = DateTime.UtcNow.AddDays(-3),
                Features = new List<string> { "Lastgaller", "Klimatanläggning", "Farthållare" }
            });

            // Car 7: Tesla Model 3 (Electric Performance)
            inventory.Add(new InventoryModel
            {
                Id = 7,
                Make = "Tesla",
                Model = "Model 3 Long Range",
                Year = 2022,
                Price = 469000M,
                MileageMil = 2200, // 2200 mil = 22000 km
                FuelType = "El",
                Transmission = "Automat",
                BodyType = "Sedan",
                Color = "Midnattssilver Metallic",
                Description = "Långräckvidds elbil med blixtsnabb acceleration och Teslas fulla teknikpaket.",
                ImageUrls = new List<string>
                {
                    "https://example.com/images/tesla-m3-1.jpg",
                    "https://example.com/images/tesla-m3-int.jpg"
                },
                DateAdded = DateTime.UtcNow.AddDays(-7),
                Features = new List<string> { "Autopilot", "Panorama glastak", "Eluppvärmd ratt" }
            });

            // Car 8: Renault Clio (Small City Car)
            inventory.Add(new InventoryModel
            {
                Id = 8,
                Make = "Renault",
                Model = "Clio TCe 100",
                Year = 2020,
                Price = 135000M,
                MileageMil = 5800, // 5800 mil = 58000 km
                FuelType = "Bensin",
                Transmission = "Manuell",
                BodyType = "Halvkombi",
                Color = "Flamröd Metallic",
                Description = "Kompakt och smidig för stadstrafik, med modern infotainment och låga driftskostnader.",
                ImageUrls = new List<string>
                {
                    "https://example.com/images/renault-clio-1.jpg"
                },
                DateAdded = DateTime.UtcNow.AddDays(-12),
                Features = new List<string> { "Touchskärm", "Parkeringssensorer bak", "LED Pure Vision" }
            });

            // Car 9: Mercedes-Benz C 220 d (Luxury Diesel)
            inventory.Add(new InventoryModel
            {
                Id = 9,
                Make = "Mercedes-Benz",
                Model = "C 220 d Kombi",
                Year = 2018,
                Price = 289000M,
                MileageMil = 9500, // 9500 mil = 95000 km
                FuelType = "Diesel",
                Transmission = "Automat",
                BodyType = "Kombi",
                Color = "Obsidiansvart Metallic",
                Description = "Lyxig och bekväm kombi med kraftfull dieselmotor. Perfekt för långpendling.",
                ImageUrls = new List<string>
                {
                    "https://example.com/images/merc-cclass-1.jpg",
                    "https://example.com/images/merc-cclass-int.jpg"
                },
                DateAdded = DateTime.UtcNow.AddDays(-18),
                Features = new List<string> { "AMG Line interiör", "Burmester ljudsystem", "Dragkrok" }
            });

            // Car 10: Hyundai Kona Electric (Full Electric SUV)
            inventory.Add(new InventoryModel
            {
                Id = 10,
                Make = "Hyundai",
                Model = "Kona Electric 64 kWh",
                Year = 2021,
                Price = 349000M,
                MileageMil = 2800, // 2800 mil = 28000 km
                FuelType = "El",
                Transmission = "Automat",
                BodyType = "SUV",
                Color = "Ceramic Blue",
                Description = "Komplett elbil med lång räckvidd och bekväm SUV-känsla. Nyservad.",
                ImageUrls = new List<string>
                {
                    "https://example.com/images/hyundai-kona-1.jpg",
                    "https://example.com/images/hyundai-kona-2.jpg"
                },
                DateAdded = DateTime.UtcNow.AddDays(-6),
                Features = new List<string> { "Värmepump", "Trådlös laddning", "Adaptiv farthållare" }
            });

         // Car 8: Renault Clio (Small City Car)
            inventory.Add(new InventoryModel
            {
                Id = 8,
                Make = "Renault",
                Model = "Clio TCe 100",
                Year = 2020,
                Price = 135000M,
                MileageMil = 5800, // 5800 mil = 58000 km
                FuelType = "Bensin",
                Transmission = "Manuell",
                BodyType = "Halvkombi",
                Color = "Flamröd Metallic",
                Description = "Kompakt och smidig för stadstrafik, med modern infotainment och låga driftskostnader.",
                ImageUrls = new List<string>
                {
                    "https://example.com/images/renault-clio-1.jpg"
                },
                DateAdded = DateTime.UtcNow.AddDays(-12),
                Features = new List<string> { "Touchskärm", "Parkeringssensorer bak", "LED Pure Vision" }
            });

            // Car 9: Mercedes-Benz C 220 d (Luxury Diesel)
            inventory.Add(new InventoryModel
            {
                Id = 9,
                Make = "Mercedes-Benz",
                Model = "C 220 d Kombi",
                Year = 2018,
                Price = 289000M,
                MileageMil = 9500, // 9500 mil = 95000 km
                FuelType = "Diesel",
                Transmission = "Automat",
                BodyType = "Kombi",
                Color = "Obsidiansvart Metallic",
                Description = "Lyxig och bekväm kombi med kraftfull dieselmotor. Perfekt för långpendling.",
                ImageUrls = new List<string>
                {
                    "https://example.com/images/merc-cclass-1.jpg",
                    "https://example.com/images/merc-cclass-int.jpg"
                },
                DateAdded = DateTime.UtcNow.AddDays(-18),
                Features = new List<string> { "AMG Line interiör", "Burmester ljudsystem", "Dragkrok" }
            });

            // Car 10: Hyundai Kona Electric (Full Electric SUV)
            inventory.Add(new InventoryModel
            {
                Id = 10,
                Make = "Hyundai",
                Model = "Kona Electric 64 kWh",
                Year = 2021,
                Price = 349000M,
                MileageMil = 2800, // 2800 mil = 28000 km
                FuelType = "El",
                Transmission = "Automat",
                BodyType = "SUV",
                Color = "Ceramic Blue",
                Description = "Komplett elbil med lång räckvidd och bekväm SUV-känsla. Nyservad.",
                ImageUrls = new List<string>
                {
                    "https://example.com/images/hyundai-kona-1.jpg",
                    "https://example.com/images/hyundai-kona-2.jpg"
                },
                DateAdded = DateTime.UtcNow.AddDays(-6),
                Features = new List<string> { "Värmepump", "Trådlös laddning", "Adaptiv farthållare" }
            });


         // Car 8: Renault Clio (Small City Car)
            inventory.Add(new InventoryModel
            {
                Id = 8,
                Make = "Renault",
                Model = "Clio TCe 100",
                Year = 2020,
                Price = 135000M,
                MileageMil = 5800, // 5800 mil = 58000 km
                FuelType = "Bensin",
                Transmission = "Manuell",
                BodyType = "Halvkombi",
                Color = "Flamröd Metallic",
                Description = "Kompakt och smidig för stadstrafik, med modern infotainment och låga driftskostnader.",
                ImageUrls = new List<string>
                {
                    "https://example.com/images/renault-clio-1.jpg"
                },
                DateAdded = DateTime.UtcNow.AddDays(-12),
                Features = new List<string> { "Touchskärm", "Parkeringssensorer bak", "LED Pure Vision" }
            });

            // Car 9: Mercedes-Benz C 220 d (Luxury Diesel)
            inventory.Add(new InventoryModel
            {
                Id = 9,
                Make = "Mercedes-Benz",
                Model = "C 220 d Kombi",
                Year = 2018,
                Price = 289000M,
                MileageMil = 9500, // 9500 mil = 95000 km
                FuelType = "Diesel",
                Transmission = "Automat",
                BodyType = "Kombi",
                Color = "Obsidiansvart Metallic",
                Description = "Lyxig och bekväm kombi med kraftfull dieselmotor. Perfekt för långpendling.",
                ImageUrls = new List<string>
                {
                    "https://example.com/images/merc-cclass-1.jpg",
                    "https://example.com/images/merc-cclass-int.jpg"
                },
                DateAdded = DateTime.UtcNow.AddDays(-18),
                Features = new List<string> { "AMG Line interiör", "Burmester ljudsystem", "Dragkrok" }
            });

            // Car 10: Hyundai Kona Electric (Full Electric SUV)
            inventory.Add(new InventoryModel
            {
                Id = 10,
                Make = "Hyundai",
                Model = "Kona Electric 64 kWh",
                Year = 2021,
                Price = 349000M,
                MileageMil = 2800, // 2800 mil = 28000 km
                FuelType = "El",
                Transmission = "Automat",
                BodyType = "SUV",
                Color = "Ceramic Blue",
                Description = "Komplett elbil med lång räckvidd och bekväm SUV-känsla. Nyservad.",
                ImageUrls = new List<string>
                {
                    "https://example.com/images/hyundai-kona-1.jpg",
                    "https://example.com/images/hyundai-kona-2.jpg"
                },
                DateAdded = DateTime.UtcNow.AddDays(-6),
                Features = new List<string> { "Värmepump", "Trådlös laddning", "Adaptiv farthållare" }
            });

            return Ok(inventory);
        }


    }

}