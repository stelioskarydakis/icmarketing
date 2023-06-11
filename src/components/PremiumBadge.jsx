import Badge from "react-bootstrap/Badge";

const PremiumBadge = ({ custom }) => {
  return (
    <Badge bg="warning" text="dark" className={custom}>
      PREMIUM
    </Badge>
  );
};
export default PremiumBadge;
