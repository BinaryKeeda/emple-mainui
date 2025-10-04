import { Fullscreen } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { DARK_STRONG } from "../utils/colors";

const Header = () => {
    return <>
        <header className='h-[71px] relative mx-3'>
            <nav className={`fixed shadow-sm dark:bg-[${DARK_STRONG}] items-center bg-white mt-4 justify-between px-2 z-40 bg-transparent  flex  h-[55px] w-[calc(100vw-24px)] rounded-full`}>
                <Link to={"/"}>
                    <img src='/assets/logo/A37A874D-8E55-4BCC-BDF4-EBFA65B2F790_1_201_a.jpeg' className='h-10 rounded-full' alt='' />
                </Link>
                <div className='flex items-center' >
                    <IconButton>
                    </IconButton>
                    <IconButton>
                        <Fullscreen />
                    </IconButton>
                </div>
            </nav>
        </header>
    </>
}

export default Header;