import React from "react";
import { ReactComponent as RdLogo } from "../../assets/rd-logo.svg";
function Header() {
  return (
		<header className="flex items-center justify-center w-full h-24 bg-white">
			<RdLogo className="w-40" />
		</header>
	)
}

export default Header;