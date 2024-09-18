import { navLinks } from "@/Data/Data";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineMenuAlt4, HiX } from "react-icons/hi";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    console.log("showMenu:", showMenu);
  }, [showMenu]);

  const menuVariants = {
    hidden: {
      scale: 0,
    },
    visible: {
      scale: 40,
      transition: {
        type: "tween",
        duration: 0.5,
      },
    },
  };

  const navLinkVariants = {
    hidden: {
      display: "none",
      opacity: 0,
    },
    initial: {
      opacity: 0,
      y: 0,
    },
    visible: {
      opacity: 1,
      y: -30,
      transition: {
        delay: 0.7,
      },
    },
  };

  const isActive = (path: string) =>
    pathname === path ? "text-Red" : "text-Black";
  return (
    <header className="fixed w-full top-0 left-0 z-20">
      <nav
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${
          showMenu ? "hidden" : ""
        }`}
      >
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-3xl text-black">
            Maverick
            <span className="text-Red text-[48px]">.</span>
          </Link>
          <div className="hidden md:flex items-center justify-center space-x-6">
            {navLinks.map((navLink) => (
              <Link
                key={navLink.path}
                href={navLink.path}
                className={`text-sm uppercase font-medium ${isActive(
                  navLink.path
                )}`}
              >
                {navLink.label}
              </Link>
            ))}
          </div>
          <div className="flex md:hidden items-center">
            <HiOutlineMenuAlt4
              className="text-Black cursor-pointer w-6 h-6"
              onClick={() => setShowMenu(!showMenu)}
            />
          </div>
        </div>
      </nav>
      <motion.div
        variants={menuVariants}
        initial="hidden"
        animate={showMenu ? "visible" : "hidden"}
        className="bg-WhiteGray fixed top-0 right-0 w-16 h-16 rounded-full"
      ></motion.div>

      <motion.nav
        variants={navLinkVariants}
        initial="initial"
        animate={showMenu ? "visible" : "hidden"}
        className="h-screen md:hidden flex flex-col justify-center"
      >
        {navLinks.map((navLink) => (
          <Link
            key={navLink.path}
            href={navLink.path}
            onClick={(prev) => setShowMenu(!prev)}
            className={`px-3 py-2 flex justify-center text-2xl font-medium ${isActive(
              navLink.path
            )}`}
          >
            {navLink.label}
          </Link>
        ))}
        <HiX
          className="absolute text-Black top-11 right-5 w-6 h-6 cursor-pointer"
          onClick={(prev) => setShowMenu(!prev)}
        />
      </motion.nav>
    </header>
  );
};

export default Navbar;
