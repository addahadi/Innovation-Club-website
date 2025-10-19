import StaggeredMenu from "./StaggeredMenu";

const menuItems = [
  { label: "Home", ariaLabel: "Go to home page", link: "/" },
  { label: "About us", ariaLabel: "Learn about us", link: "/about" },
  { label: "Events", ariaLabel: "View our events", link: "/events" },
  { label: "Contact Us", ariaLabel: "Get in touch", link: "/contact" },
];

const socialItems = [
  { label: "Twitter", link: "https://twitter.com" },
  { label: "GitHub", link: "https://github.com" },
  { label: "LinkedIn", link: "https://linkedin.com" },
];


function Menu() {
  return (
    <div className=" fixed top-0 right-0  h-screen w-[300px] z-50">
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
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

export default Menu