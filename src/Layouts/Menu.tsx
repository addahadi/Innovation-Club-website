import StaggeredMenu from "../Components/Ui/StaggeredMenu";

function Menu({
  menuItems,
  socialItems,
}: {
  menuItems: { label: string; link: string }[];
  socialItems: { label: string; link: string }[];
}) {
  return (
    <div className=" fixed top-0 right-0  h-screen w-[300px] max-md:w-full z-50 pointer-events-none">
      <StaggeredMenu
        position="right"
        items={menuItems as never}
        socialItems={socialItems as never}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#fff"
        openMenuButtonColor="#fff"
        changeMenuColorOnOpen={true}
        colors={["#2cff29", "#2cff29"]}
        accentColor="#2cff29"
        onMenuOpen={() => console.log("Menu opened")}
        onMenuClose={() => console.log("Menu closed")}
      />
    </div>
  );
}

export default Menu;
