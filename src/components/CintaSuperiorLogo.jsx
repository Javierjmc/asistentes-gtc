import logo from "../assets/logo.png";

export const CintaSuperiorLogo = () => {
  return (
    <div className="col-span-2 bg-linear-to-r from-cyan-700 to-blue-700 py-4 shadow">
      <img
        src={logo}
        alt="logo de Global Talent Connections"
        className="w-62 mx-auto"
      />
    </div>
  );
};
