// imageLibrary.js
const imageLibrary = {
    men: [
      { image: require("../assets/images/men clothes/Little_Astrid-.png.webp"), name: "Warm Coat" },
      { image: require("../assets/images/men clothes/kstyle-mens.png"), name: "Jeans" },
      { image: require("../assets/images/men clothes/AdobeStock_1058477803_Preview.jpeg"), name: "Black winter boots" },
    ],
    women: [
      { image: require("../assets/images/women clothes/AdobeStock_769309653_Preview.jpeg"), name: "Floral dress" },
      { image: require("../assets/images/women clothes/AdobeStock_876891815_Preview.jpeg"), name: "Casual dress" },
      { image: require("../assets/images/women clothes/AdobeStock_927409790_Preview.jpeg"), name: "Sun hat" },
    ],
    babyBoy: [
      { image: require("../assets/images/baby boy clothes/AdobeStock_890049269_Preview.jpeg"), name: "Winter Coat" },
      { image: require("../assets/images/baby boy clothes/AdobeStock_996561091_Preview.jpeg"), name: "Pants" },
      { image: require("../assets/images/baby boy clothes/AdobeStock_387449407_Preview.jpeg"), name: "mittens" },
      { image: require("../assets/images/baby boy clothes/AdobeStock_646534350_Preview.jpeg"), name: "sweater " },
      { image: require("../assets/images/baby boy clothes/AdobeStock_773698075_Preview.jpeg"), name: "hood" },
      { image: require("../assets/images/baby boy clothes/AdobeStock_852582581_Preview.png"), name: "knitted hat" },
      { image: require("../assets/images/baby boy clothes/AdobeStock_890049269_Preview.jpeg"), name: "winter jacket" },
      { image: require("../assets/images/baby boy clothes/AdobeStock_996561091_Preview.jpeg"), name: "jogger" },
      { image: require("../assets/images/baby boy clothes/AdobeStock_997137286_Preview.jpeg"), name: "hoodie" },
      { image: require("../assets/images/baby boy clothes/AdobeStock_1002650902_Preview.jpeg"), name: "puffer jacket" },
      { image: require("../assets/images/baby boy clothes/AdobeStock_1070536341_Preview.jpeg"), name: "pom-pom hats" },
      { image: require("../assets/images/baby boy clothes/AdobeStock_1084473083_Preview.jpeg"), name: "knit sweater" },

    
    ],
    babyGirl: [
      { image: require("../assets/images/baby Girl clothes/AdobeStock_646534350_Preview.jpeg"), name: "Cute Dress" },
      { image: require("../assets/images/baby Girl clothes/AdobeStock_1084473083_Preview.jpeg"), name: "Sweater" },
    ],
  };
  
  /**
   * Function to recommend clothes based on category and temperature.
   * @param {string} category - The category of clothing (e.g., "men", "women", "babyBoy", "babyGirl").
   * @param {number} temperature - The current temperature in Celsius.
   * @returns {Array} - A filtered list of clothing items for the given category and temperature.
   */
  export const recommendClothes = (category, temperature) => {
    const clothesByCategory = imageLibrary[category] || [];
  
    if (temperature <= 5) {
      return clothesByCategory.filter((item) =>
        ["Warm Coat", "Black winter boots", "Winter Coat"].includes(item.name)
      );
    } else if (temperature > 5 && temperature <= 15) {
      return clothesByCategory.filter((item) =>
        ["Jeans", "Sweater", "Pants"].includes(item.name)
      );
    } else {
      return clothesByCategory.filter((item) =>
        ["Floral dress", "Sun hat", "Cute Dress"].includes(item.name)
      );
    }
  };
  
  export default imageLibrary;
  