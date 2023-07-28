interface IDrawerProps {
   contentPage: React.ReactNode;
   menu: React.ReactNode;
}

const Drawer = ({ contentPage: children, menu }: IDrawerProps) => {
   return (
      <div className='drawer drawer-open'>
         <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
         <div className='drawer-content flex flex-col items-center justify-center'>
            {children}
            <label
               htmlFor='my-drawer-2'
               className='btn btn-primary drawer-button lg:hidden'
            >
               Open drawer
            </label>
         </div>
         <div className='drawer-side'>
            <label htmlFor='my-drawer-2' className='drawer-overlay'></label>
            {menu}
         </div>
      </div>
   );
};

export default Drawer;
