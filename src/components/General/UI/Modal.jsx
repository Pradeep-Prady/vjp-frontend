const Modal = ({ isOpen, onClick, children, bgOpacity = false, className }) => {
  return (
    <>
      {isOpen && (
        <div
          className={` ${className} fixed top-0 left-0 w-full h-full flex justify-center items-center
          ${
            bgOpacity ? "bg-black bg-opacity-50" : "bg-black/[0.14]"
          } modal-overlay ${isOpen ? "z-[99]" : "hidden"}`}
          onClick={onClick}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default Modal;
