import css from "./privacy.module.css";
const NonDisc = () => {
  const longText = `Cleanerino Company

Non-Discrimination Policy

At Cleanerino, we are dedicated to fostering an inclusive and welcoming environment for all vendors, customers, anyone using our platform. We firmly oppose discriminatory practices and behaviors based on any protected attributes to ensure a positive and respectful experience for everyone involved.

Protected Attributes:

Cleanerino prohibits discrimination based on any protected attributes, including but not limited to:

· Race
· Color
· Ethnicity
· National origin
· Religion
· Gender
· Gender identity
· Sexual orientation
· Disability
· Immigration status
· Age
· Marital status
· Pregnancy or parenthood status
· Veteran status
· Socioeconomic status

Examples of Prohibited Behavior:
· Refusal of Service: Vendors are not permitted to refuse service or discriminate against customers based on any protected attribute.
· Shop Policies: Shop policies, including shipping, returns, and customer interactions, must not discriminate against individuals based on protected attributes.
· Content and Language: All content, including listings, shop announcements, and communication, must be free from discriminatory language or content.
· Reviews and Feedback: Reviews and feedback should focus on product or service experiences and must not contain discriminatory remarks or references.
· Exclusionary Practices: Practices that exclude or limit opportunities for individuals based on protected attributes are strictly prohibited.
· Hate Speech: Hate speech, including language or content that promotes violence or hatred towards individuals or groups based on protected attributes, is not tolerated on Cleanerino.
Reporting and Enforcement

Cleanerino encourages users to report any instances of discrimination or hateful behavior encountered on the platform. Reports can be submitted through our Help Center for prompt investigation and appropriate action, including the removal of offensive content, suspension or termination of accounts, and legal measures if necessary.

By using Cleanerino, all users agree to uphold our Non-Discrimination Policy and contribute to creating a respectful and inclusive community for everyone.

`;
  return (
    <div className={css.wrapBlockFaq}>
      {longText.split("\n").map((paragraph, index) => (
        <p key={index} className={index === 0 ? css.pInParaMain : css.pInPara}>
          {paragraph}
        </p>
      ))}
    </div>
  );
};
export default NonDisc;
