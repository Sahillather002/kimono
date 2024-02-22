type props = {
  title: string;
};

const TitlePrimary = ({ title }: props) => {
  return <h3 className="font-semibold text-[28px] text-primary">{title}</h3>;
};

export default TitlePrimary;
