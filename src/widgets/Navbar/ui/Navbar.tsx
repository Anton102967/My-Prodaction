import {classNames} from "shared/lib/classNames";
import cls from "./Navbar.module.scss"
import {AppLinkTheme} from "shared/ui/AppLink/ui/AppLink";
import {AppLink} from "shared/ui";

interface  NavbarProps {
  className?: string,

}
export const Navbar = ({className}: NavbarProps) => {
  return (
    <div className={classNames(cls.Navbar, {}, [className])}>

      <div className={cls.links}>

        <AppLink to = {"/about"} className={cls.mainLinks} theme={AppLinkTheme.SECONDARY}>
          О сайте
        </AppLink>

        <AppLink theme={AppLinkTheme.PRIMARY} to = {"/"}>
          Главная
        </AppLink>

      </div>
    </div>
  );
};

export default Navbar;
