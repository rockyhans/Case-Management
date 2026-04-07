const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border">{children}</div>
  );
};

export default Card;
