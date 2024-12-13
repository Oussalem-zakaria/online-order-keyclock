import { useSelector } from "react-redux";

const HeadingGroup = ({ title }) => {
  const primaryColor = useSelector((state) => state.settings.primaryColor);

  return (
    <p
      className={`text-lg text-gray-700 border-b-2 border-${primaryColor}-500 font-semibold`}
    >
      {title}
    </p>
  );
};

export default HeadingGroup;
