import * as React from 'react';
import * as Icon from 'react-feather';

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const BurgerMenu = (props: Props) => {
  const [hidden, setHidden] = React.useState(true);

  const onToggle = () => {
    if (hidden) {
      setHidden(false);
    }
    props.onToggle();
  };

  return (
    <>
      {/* toggle */}
      <div
        id="menu-icon"
        className="justify-self-end flex justify-end text-brandLight"
      >
        <Icon.Menu size={32} onClick={onToggle} className="cursor-pointer" />
      </div>
      {/* menu */}
      <div
        className={`fixed ${
          hidden ? 'hidden' : ''
        } animate__animated animate__faster ${
          props.isOpen ? 'animate__slideInRight' : 'animate__slideOutRight'
        } top-0 left-0 h-screen bg-brand text-brandLight w-screen flex-col justify-start items-center`}
      >
        <div className="flex flex-row justify-end items-end w-full">
          <div
            id="menu-icon"
            className="justify-self-end flex-1 flex justify-end mt-4 mr-10"
          >
            <Icon.Menu
              size={32}
              onClick={onToggle}
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className="flex flex-col justify-start items-center w-full gap-4">
          {props.children}
        </div>
      </div>
    </>
  );
};

export default BurgerMenu;
