import css from "./privacy.module.css";

const FaqTe = () => {
  const longText = `FAQs

What is Cleanerino?

Cleanerino is a marketplace that connects consumers with producers of clean and sustainable personal, home, pet care products and cosmetics.
P.S. Have you seen Ratatouille? It means “Sparkling clean!”

How is Cleanerino different from other clean product platforms?

We carefully evaluate product ingredients, packaging sustainability, and brand practices to ensure only safe, clean, and sustainable products make it onto our platform. This includes banning harsh chemicals, promoting recyclable or compostable packaging, and partnering with brands committed to sustainable production. We do this to ensure the products you buy on Cleanerino will work for your unique needs.

How is Cleanerino different from other clean product stores?
We have a robust vetting process in places to ensure that only truly clean, safe, and sustainable products make it to the marketplace. We evaluate the following to determine whether a product is a good fit for our platform:
Product ingredients
No harsh chemicals, such as parabens, SLS, phthalates, ingredients linked to disease or otherwise harmful to the human body or the planet are permitted.
Packaging
We are working hard to ensure that products listed on Cleanerino are recyclable or compostable in most locations across the United States. In the nearest future, you will be able to choose to see only products that come in packaging that can be recycled in your zipcode.
Brand 
From small independent makers to large brands, we ensure that they adhere to sustainable production and sourcing practices and refrain from processes harmful to the environment. 

How to make the most of Cleanerino’s customization?
To ensure the products you see fit your skin needs, allergy profile, and personal preferences, use the filters on the website to customize your feed without registering or create a profile to save information about your allergies, ingredient preferences, etc. In that way, you will only see the products that fit your personal needs. You can also save search preferences to find the options you need faster next time.

How do I know what’s recyclable in my area?
Create a profile and add your zipcode to see products that come in packaging that can be recycled or composted in your area. Use the recycling instructions as a guidance, but consult local recycling programs for directions in case of doubt.

Can I pick up my purchase from the vendor directly if we live in the same city?
If a vendor offers order pick-up, you will be able to choose this option at check-out. The pick-up address will be listed on your order confirmation, and once the order is processed, the vendor will be in touch to agree on the pick-up day and time.

Do you offer free shipping?
As a marketplace, Cleanerino connects customers with vendors of clean products. Each vendor may have their own shipping policy. Please refer to individual vendor pages to check their shipping policy and free shipping requirements.
`;

  const boldText = [
    "FAQs",
    "What is Cleanerino?",
    "How is Cleanerino different from other clean product platforms?",
    "What are your evaluation criteria?",
    "Product ingredients",
    "Packaging",
    "Brand",
    "How do I know my order has been shipped?",
    "How to make the most of Cleanerino’s customization?",
    "How do I know what’s recyclable in my area?",
    "Can I pick up my purchase from the vendor directly if we live in the same city?",
    "Do you offer free shipping?",
  ];

  return (
    <div className={css.wrapBlockFaq}>
      {longText.split("\n").map((paragraph, index) => (
        <p
          key={index}
          className={
            boldText.includes(paragraph.trim()) ? css.pInParaMain : css.pInPara
          }
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
};

export default FaqTe;
