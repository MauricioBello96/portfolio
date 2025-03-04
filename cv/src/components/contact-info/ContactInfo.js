import './ContactInfo.css';

export const ContactInfo = ({icon, text}) => {
  return (
    <div className="icon-text">
        {icon}
        <p>{text}</p>
    </div>
  );
};
